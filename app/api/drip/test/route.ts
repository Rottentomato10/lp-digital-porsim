import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, sendBrevoEmail, wrapInTemplate } from '@/lib/drip'

// Send a test email to verify design and delivery
export async function POST(req: NextRequest) {
  const dashCookie = req.cookies.get('dash_auth')?.value
  if (dashCookie !== process.env.DASHBOARD_PASSWORD) {
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

    const body = dripEmail.body
      .replace(/\{\{name\}\}/g, 'דקל')
      .replace(/\{\{email\}\}/g, email)

    const html = wrapInTemplate(body, unsubUrl)
    const subject = dripEmail.subject.replace(/\{\{name\}\}/g, 'דקל')

    const ok = await sendBrevoEmail({ email, name: 'דקל' }, `[טסט] ${subject}`, html)

    return NextResponse.json({ ok, emailIndex: idx, sentTo: email })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
