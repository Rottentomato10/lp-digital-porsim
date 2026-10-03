import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber, getSubscriberByEmail, generateConfirmToken } from '@/lib/drip'
import { isAuthedOrBearer } from '@/lib/auth'

interface EnrollPerson {
  email: string
  name?: string
}

// Server-to-server enrollment (e.g. from the portal signup flow). Registers the
// person as a drip subscriber without sending anything, and returns a confirmUrl
// for each — the caller is responsible for embedding it wherever it asks for opt-in.
export async function POST(req: NextRequest) {
  if (!isAuthedOrBearer(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { people, segment } = (await req.json()) as { people?: EnrollPerson[]; segment?: string }
    if (!Array.isArray(people) || people.length === 0) {
      return NextResponse.json({ error: 'Missing people' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'
    const results: { email: string; confirmUrl: string }[] = []

    for (const person of people) {
      const email = (person.email || '').trim().toLowerCase()
      if (!email) continue
      const name = (person.name || '').trim()

      const existing = await getSubscriberByEmail(email)
      if (!existing) {
        await addSubscriber({
          email,
          name,
          phone: '',
          enrolledAt: new Date().toISOString(),
          source: segment || 'unknown',
          coupon: '',
        })
      }

      const confirmToken = generateConfirmToken(email)
      const confirmUrl = `${baseUrl}/api/drip/confirm?email=${encodeURIComponent(email)}&token=${confirmToken}`
      results.push({ email, confirmUrl })
    }

    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
