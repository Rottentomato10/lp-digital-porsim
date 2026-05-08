import { NextRequest, NextResponse } from 'next/server'
import { verifyConfirmToken, confirmDripSubscription } from '@/lib/drip'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const token = req.nextUrl.searchParams.get('token')

  if (!email || !token) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  if (!verifyConfirmToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const confirmed = await confirmDripSubscription(email, ip)

  if (confirmed) {
    console.log(JSON.stringify({
      event: 'DRIP_CONFIRMED',
      email,
      ip,
      timestamp: new Date().toISOString(),
    }))
  }

  // Redirect to confirmation page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'
  return NextResponse.redirect(`${baseUrl}/drip/confirm?status=ok`)
}
