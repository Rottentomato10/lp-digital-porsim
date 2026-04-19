import { NextRequest, NextResponse } from 'next/server'
import { getAffiliateByCode, trackEvent } from '@/lib/affiliates'

export async function POST(req: NextRequest) {
  try {
    const { code, type } = await req.json()

    if (!code || !type) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const affiliate = await getAffiliateByCode(code)
    if (!affiliate || !affiliate.active) {
      return NextResponse.json({ ok: false, error: 'Invalid affiliate' }, { status: 404 })
    }

    await trackEvent({
      affiliateId: affiliate.id,
      type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      ok: true,
      coupon: affiliate.coupon,
      discount: affiliate.discountPercent,
    })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
