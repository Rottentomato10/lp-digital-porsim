import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const correctPassword = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

    if (password === correctPassword) {
      const res = NextResponse.json({ ok: true })
      res.cookies.set('dash_auth', correctPassword, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        httpOnly: true,
      })
      return res
    }

    return NextResponse.json({ ok: false, error: 'סיסמה שגויה' }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false, error: 'שגיאה' }, { status: 500 })
  }
}
