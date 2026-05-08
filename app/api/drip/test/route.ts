import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, sendBrevoEmail, wrapInTemplate, generatePersonalCoupon, generateConfirmToken, updateSubscriber, getSubscriberByEmail, addSubscriber } from '@/lib/drip'
import { isAuthed } from '@/lib/auth'

// Send a test email to verify design and delivery
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { email, emailIndex } = await req.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const campaign = await getCampaign()
    if (!campaign || campaign.emails.length === 0) {
      return NextResponse.json({ error: 'No campaign or emails configured' }, { status: 400 })
    }

    const idx = emailIndex ?? 0
    const dripEmail = campaign.emails[idx]
    if (!dripEmail) return NextResponse.json({ error: 'Email index out of range' }, { status: 400 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'
    const unsubUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`

    // Generate real coupon for email_13 and save to Redis so it works in checkout
    let testCoupon = ''
    if (dripEmail.id === 'email_13') {
      testCoupon = generatePersonalCoupon()
      // Ensure subscriber exists in Redis (create temp one if needed)
      const existing = await getSubscriberByEmail(email)
      if (existing) {
        await updateSubscriber(email, {
          personalCoupon: testCoupon,
          personalCouponCreatedAt: new Date().toISOString(),
        })
      } else {
        await addSubscriber({ email, name: 'טסט', phone: '', enrolledAt: new Date().toISOString(), source: 'test', coupon: '' })
        await updateSubscriber(email, {
          personalCoupon: testCoupon,
          personalCouponCreatedAt: new Date().toISOString(),
        })
      }
    }

    const confirmToken = generateConfirmToken(email)
    const confirmUrl = `${baseUrl}/api/drip/confirm?email=${encodeURIComponent(email)}&token=${confirmToken}`

    const body = dripEmail.body
      .replace(/\{\{name\}\}/g, 'דקל')
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{coupon\}\}/g, testCoupon)
      .replace(/\{\{confirmUrl\}\}/g, confirmUrl)

    const html = wrapInTemplate(body, unsubUrl)
    const subject = dripEmail.subject.replace(/\{\{name\}\}/g, 'דקל')

    const ok = await sendBrevoEmail({ email, name: 'דקל' }, `[טסט] ${subject}`, html)

    return NextResponse.json({ ok, emailIndex: idx, sentTo: email })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
