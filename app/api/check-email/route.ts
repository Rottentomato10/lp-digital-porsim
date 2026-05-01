import { NextRequest, NextResponse } from 'next/server'

// Rate limiting: max 5 checks per minute per IP
const rateLimits = new Map<string, number[]>()

function checkRate(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimits.get(ip) || []).filter(t => now - t < 60000)
  if (timestamps.length >= 5) return false
  timestamps.push(now)
  rateLimits.set(ip, timestamps)
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (!checkRate(ip)) {
      // Return same shape — don't reveal rate limiting vs real response
      return NextResponse.json({ exists: false })
    }

    const { email } = await req.json()
    if (!email) return NextResponse.json({ exists: false })

    const checkUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cmdhlnwavtotzbvjpkgw.supabase.co'
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceKey) {
      return NextResponse.json({ exists: false })
    }

    // Always make the DB call to prevent timing attacks
    const res = await fetch(
      `${checkUrl}/rest/v1/profiles?email=eq.${encodeURIComponent(email.trim().toLowerCase())}&select=id`,
      {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
      }
    )

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json({ exists: Array.isArray(data) && data.length > 0 })
    }

    return NextResponse.json({ exists: false })
  } catch {
    return NextResponse.json({ exists: false })
  }
}
