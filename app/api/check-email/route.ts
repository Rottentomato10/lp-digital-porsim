import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ exists: false })

    const courseApiUrl = process.env.COURSE_API_URL
    const supabaseUrl = courseApiUrl
      ? undefined
      : process.env.NEXT_PUBLIC_SUPABASE_URL

    // Check via Supabase directly if we have the URL
    const checkUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cmdhlnwavtotzbvjpkgw.supabase.co'
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceKey) {
      // If no service key, skip check
      return NextResponse.json({ exists: false })
    }

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
