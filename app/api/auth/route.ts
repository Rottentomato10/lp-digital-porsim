import { NextRequest, NextResponse } from 'next/server'
import { createAuthResponse, createLogoutResponse } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const correctPassword = process.env.DASHBOARD_PASSWORD

    if (!correctPassword) {
      return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 })
    }

    if (password === correctPassword) {
      return createAuthResponse()
    }

    return NextResponse.json({ ok: false, error: 'סיסמה שגויה' }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false, error: 'שגיאה' }, { status: 500 })
  }
}

// Logout — clears the httpOnly dash_auth cookie server-side.
export async function DELETE() {
  return createLogoutResponse()
}
