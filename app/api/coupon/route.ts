import { NextRequest, NextResponse } from 'next/server'
import { BASE_PRICE } from '@/lib/pricing'
import { getAffiliateByCoupon } from '@/lib/affiliates'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'נא להזין קוד קופון' }, { status: 400 })
    }

    // Drip campaign coupon
    const normalized = code.trim().toUpperCase()
    if (normalized === 'DRIP20') {
      const savings = Math.round(BASE_PRICE * 20 / 100)
      return NextResponse.json({
        valid: true,
        code: 'DRIP20',
        discount: 20,
        label: 'הנחת דיוור 20%',
        finalPrice: BASE_PRICE - savings,
        savings,
      })
    }

    // Affiliate coupons
    const affiliate = await getAffiliateByCoupon(code)
    if (!affiliate || !affiliate.active) {
      return NextResponse.json({ valid: false, error: 'קוד קופון לא תקין' })
    }

    const savings = Math.round(BASE_PRICE * affiliate.discountPercent / 100)
    return NextResponse.json({
      valid: true,
      code: affiliate.coupon,
      discount: affiliate.discountPercent,
      label: `הנחת ${affiliate.discountPercent}%`,
      finalPrice: BASE_PRICE - savings,
      savings,
      affiliateId: affiliate.id,
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'שגיאה' }, { status: 500 })
  }
}
