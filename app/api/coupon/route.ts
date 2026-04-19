import { NextRequest, NextResponse } from 'next/server'
import { validateCoupon, BASE_PRICE } from '@/lib/pricing'
import { getAffiliateByCoupon } from '@/lib/affiliates'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'נא להזין קוד קופון' }, { status: 400 })
    }

    // Check affiliate coupons first
    const affiliate = await getAffiliateByCoupon(code)
    if (affiliate && affiliate.active) {
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
    }

    // Then static coupons
    const result = validateCoupon(code)
    if (!result.valid) {
      return NextResponse.json({ valid: false, error: 'קוד קופון לא תקין' })
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ valid: false, error: 'שגיאה' }, { status: 500 })
  }
}
