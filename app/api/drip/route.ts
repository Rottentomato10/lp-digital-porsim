import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, saveCampaign, createDefaultCampaign, getAllSubscribers, getDripStats, getSendLogs, removeSubscriber, getSubscriberByEmail, sendBrevoEmail, wrapInTemplate, generateConfirmToken, addSendLog } from '@/lib/drip'
import { isAuthedOrBearer } from '@/lib/auth'

// GET — get campaign, subscribers, stats (also used server-to-server by the unified admin dashboard)
export async function GET(req: NextRequest) {
  if (!isAuthedOrBearer(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const what = req.nextUrl.searchParams.get('what') || 'all'

  if (what === 'campaign') {
    const campaign = await getCampaign() || await createDefaultCampaign()
    return NextResponse.json(campaign)
  }

  if (what === 'subscribers') {
    const subs = await getAllSubscribers()
    return NextResponse.json(subs)
  }

  if (what === 'stats') {
    const stats = await getDripStats()
    return NextResponse.json(stats)
  }

  if (what === 'logs') {
    const logs = await getSendLogs()
    return NextResponse.json(logs)
  }

  // Default: return everything
  const [campaign, subscribers, stats] = await Promise.all([
    getCampaign() || createDefaultCampaign(),
    getAllSubscribers(),
    getDripStats(),
  ])

  return NextResponse.json({ campaign, subscribers, stats })
}

// PUT — update campaign (emails, settings)
export async function PUT(req: NextRequest) {
  if (!isAuthedOrBearer(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const existing = await getCampaign() || await createDefaultCampaign()

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      createdAt: existing.createdAt,
    }

    await saveCampaign(updated)
    return NextResponse.json({ ok: true, campaign: updated })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}

// POST — manual resend (used by the unified admin dashboard's mail matrix)
export async function POST(req: NextRequest) {
  if (!isAuthedOrBearer(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    if (body.action !== 'resend') return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

    const { subscriberEmail, emailId } = body as { subscriberEmail?: string; emailId?: string }
    if (!subscriberEmail || !emailId) return NextResponse.json({ error: 'Missing subscriberEmail/emailId' }, { status: 400 })

    const [campaign, subscriber] = await Promise.all([
      getCampaign(),
      getSubscriberByEmail(subscriberEmail),
    ])
    if (!campaign) return NextResponse.json({ error: 'No campaign' }, { status: 404 })
    if (!subscriber) return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })
    const email = campaign.emails.find(e => e.id === emailId)
    if (!email) return NextResponse.json({ error: 'Email not found in campaign' }, { status: 404 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'
    const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`
    const confirmToken = generateConfirmToken(subscriber.email)
    const confirmUrl = `${baseUrl}/api/drip/confirm?email=${encodeURIComponent(subscriber.email)}&token=${confirmToken}`

    const htmlBody = email.body
      .replace(/\{\{name\}\}/g, subscriber.name || 'שם')
      .replace(/\{\{email\}\}/g, subscriber.email)
      .replace(/\{\{coupon\}\}/g, subscriber.personalCoupon || '')
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
      error: success ? undefined : 'Brevo send failed (resend)',
    })

    return NextResponse.json({ ok: success })
  } catch {
    return NextResponse.json({ error: 'Resend failed' }, { status: 500 })
  }
}

// DELETE — remove subscriber
export async function DELETE(req: NextRequest) {
  if (!isAuthedOrBearer(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    await removeSubscriber(email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
