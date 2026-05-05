import { NextRequest, NextResponse } from 'next/server'
import { unsubscribeEmail } from '@/lib/drip'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  await unsubscribeEmail(email)
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    await unsubscribeEmail(email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
