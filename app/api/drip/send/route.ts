import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, getSubscribersDueForEmail, updateSubscriber, addSendLog, sendBrevoEmail, wrapInTemplate } from '@/lib/drip'
import { getAllOrders } from '@/lib/orders'

// This endpoint is called by Vercel Cron (daily) or manually from dashboard
// It sends all pending drip emails

export async function GET(req: NextRequest) {
  // Auth: either cron secret or dashboard cookie
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const dashCookie = req.cookies.get('dash_auth')?.value
  const isAuthed = (cronSecret && authHeader === `Bearer ${cronSecret}`) ||
                   dashCookie === process.env.DASHBOARD_PASSWORD

  if (!isAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const campaign = await getCampaign()
  if (!campaign || !campaign.active) {
    return NextResponse.json({ message: 'Campaign not active', sent: 0 })
  }

  // Get all paid orders to check if subscriber has purchased
  const orders = await getAllOrders()
  const paidEmails = new Set(
    orders
      .filter(o => o.status !== 'pending')
      .map(o => o.email.toLowerCase())
  )

  const due = await getSubscribersDueForEmail(campaign)
  let sent = 0
  let skipped = 0
  const errors: string[] = []
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'

  for (const { subscriber, email } of due) {
    // Check if they purchased since enrolling
    if (paidEmails.has(subscriber.email.toLowerCase())) {
      await updateSubscriber(subscriber.email, { status: 'purchased' })
      skipped++
      continue
    }

    const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`

    // Replace placeholders in email body
    let htmlBody = email.body
      .replace(/\{\{name\}\}/g, subscriber.name || 'שם')
      .replace(/\{\{email\}\}/g, subscriber.email)

    const fullHtml = wrapInTemplate(htmlBody, unsubscribeUrl)

    const success = await sendBrevoEmail(
      { email: subscriber.email, name: subscriber.name },
      email.subject.replace(/\{\{name\}\}/g, subscriber.name || ''),
      fullHtml
    )

    await addSendLog({
      subscriberEmail: subscriber.email,
      emailId: email.id,
      sentAt: new Date().toISOString(),
      success,
      error: success ? undefined : 'Brevo send failed',
    })

    if (success) {
      await updateSubscriber(subscriber.email, {
        currentStep: subscriber.currentStep + 1,
        lastSentAt: new Date().toISOString(),
        sentEmails: [...subscriber.sentEmails, email.id],
      })
      sent++
    } else {
      errors.push(subscriber.email)
    }
  }

  return NextResponse.json({
    message: `Processed ${due.length} subscribers`,
    sent,
    skipped,
    errors: errors.length,
  })
}
