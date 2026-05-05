import { NextRequest, NextResponse } from 'next/server'
import { BASE_PRICE } from '@/lib/pricing'
import { getAffiliateByCoupon } from '@/lib/affiliates'
import { validatePersonalCoupon } from '@/lib/drip'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'נא להזין קוד קופון' }, { status: 400 })
    }

    // Check personal drip coupons first (PK prefix, 24h expiry)
    if (code.trim().toUpperCase().startsWith('PK')) {
      const personal = await validatePersonalCoupon(code)
      if (personal.valid) {
        const savings = Math.round(BASE_PRICE * personal.discount / 100)
        return NextResponse.json({
          valid: true,
          code: code.trim().toUpperCase(),
          discount: personal.discount,
          label: 'הנחה אישית 20%',
          finalPrice: BASE_PRICE - savings,
          savings,
        })
      }
    }

    // Affiliate coupons
    const affiliate = await getAffiliateByCoupon(code)
    if (!affiliate || !affiliate.active) {
      return NextResponse.json({ valid: false, error: 'קוד קופון לא תקין או שפג תוקפו' })
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
