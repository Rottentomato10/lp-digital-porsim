import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const AUTH_SALT = 'porsim_dash_2024_salt'

/**
 * Create an HMAC token from the dashboard password.
 * This is stored in the cookie instead of the plaintext password.
 */
export function hashPassword(password: string): string {
  return createHmac('sha256', AUTH_SALT).update(password).digest('hex')
}

/**
 * Get the expected cookie value (hash of the current DASHBOARD_PASSWORD env var).
 * Returns null if DASHBOARD_PASSWORD is not set.
 */
export function getExpectedToken(): string | null {
  const password = process.env.DASHBOARD_PASSWORD
  if (!password) return null
  return hashPassword(password)
}

/**
 * Check if a request is authenticated via dash_auth cookie.
 * Returns true if the cookie contains the correct HMAC of the dashboard password.
 */
export function isAuthed(req: NextRequest): boolean {
  const token = getExpectedToken()
  if (!token) return false
  return req.cookies.get('dash_auth')?.value === token
}

/**
 * Check if a request is authenticated via cookie OR Bearer token (for API-to-API calls).
 */
export function isAuthedOrBearer(req: NextRequest): boolean {
  if (isAuthed(req)) return true
  const auth = req.headers.get('authorization')
  const secret = process.env.PROVISION_API_SECRET
  if (secret && auth === `Bearer ${secret}`) return true
  return false
}

/**
 * Check if a request is authenticated via cookie OR cron secret header.
 */
export function isAuthedOrCron(req: NextRequest): boolean {
  if (isAuthed(req)) return true
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true
  return false
}

/**
 * Create an authenticated response with the dash_auth cookie set.
 */
export function createAuthResponse(): NextResponse {
  const token = getExpectedToken()
  if (!token) throw new Error('DASHBOARD_PASSWORD not configured')

  const res = NextResponse.json({ ok: true })
  res.cookies.set('dash_auth', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
  })
  return res
}

/**
 * Clear the dash_auth cookie (logout). Required because the cookie is now
 * httpOnly and can no longer be removed from client-side JS.
 */
export function createLogoutResponse(): NextResponse {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('dash_auth', '', {
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
  })
  return res
}
