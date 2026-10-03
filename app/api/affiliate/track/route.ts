import { NextRequest, NextResponse } from 'next/server'
import { getAffiliateByCode, trackEvent } from '@/lib/affiliates'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (!checkRateLimit(`affiliate-track:${ip}`, 30, 60000)) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const { code, type } = await req.json()

    if (!code || !type) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const affiliate = await getAffiliateByCode(code)
    if (!affiliate) {
      return NextResponse.json({ ok: false, error: 'Invalid affiliate' }, { status: 404 })
    }

    // Link tracking (visits/checkouts) always works — even if inactive
    await trackEvent({
      affiliateId: affiliate.id,
      type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      ok: true,
      // Coupon only returned if affiliate is active
      coupon: affiliate.active ? affiliate.coupon : null,
      discount: affiliate.active ? affiliate.discountPercent : 0,
      active: affiliate.active,
    })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
