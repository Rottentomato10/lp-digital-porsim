import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, getSubscribersDueForEmail, updateSubscriber, addSendLog, sendBrevoEmail, wrapInTemplate, generatePersonalCoupon, generateConfirmToken } from '@/lib/drip'
import { getAllOrders } from '@/lib/orders'
import { isAuthedOrCron } from '@/lib/auth'

// This endpoint is called by Vercel Cron (daily) or manually from dashboard
// It sends all pending drip emails

export async function GET(req: NextRequest) {
  if (!isAuthedOrCron(req)) {
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

    // Emails 2+ require confirmed opt-in (double opt-in)
    if (email.id !== 'email_1' && !subscriber.dripConfirmed) {
      skipped++
      continue
    }

    const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`

    // Generate personal coupon for the last email (email_13)
    let personalCoupon = ''
    if (email.id === 'email_13') {
      personalCoupon = generatePersonalCoupon()
      await updateSubscriber(subscriber.email, {
        personalCoupon,
        personalCouponCreatedAt: new Date().toISOString(),
      })
    }

    // Generate confirm URL for email 1
    const confirmToken = generateConfirmToken(subscriber.email)
    const confirmUrl = `${baseUrl}/drip/confirm?email=${encodeURIComponent(subscriber.email)}&token=${confirmToken}`

    // Replace placeholders in email body
    let htmlBody = email.body
      .replace(/\{\{name\}\}/g, subscriber.name || 'שם')
      .replace(/\{\{email\}\}/g, subscriber.email)
      .replace(/\{\{coupon\}\}/g, personalCoupon)
      .replace(/\{\{confirmUrl\}\}/g, confirmUrl)

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
