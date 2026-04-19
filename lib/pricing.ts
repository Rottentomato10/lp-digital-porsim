// ============================================
// Pricing & Coupon System — פורשים כנף
// ============================================

export const BASE_PRICE = 390
export const ORIGINAL_PRICE = 490

// Coupon definitions — add/remove coupons here
// discount is in percentage (e.g., 10 = 10% off)
const COUPONS: Record<string, { discount: number; label: string; active: boolean }> = {
  'LAUNCH10':   { discount: 10, label: 'הנחת השקה 10%',       active: true },
  'FRIENDS20':  { discount: 20, label: 'הנחת חברים 20%',      active: true },
  'STUDENT15':  { discount: 15, label: 'הנחת סטודנטים 15%',   active: true },
  'VIP30':      { discount: 30, label: 'הנחת VIP 30%',        active: false }, // inactive example
}

export interface CouponResult {
  valid: boolean
  code: string
  discount: number // percentage
  label: string
  finalPrice: number
  savings: number
}

export function validateCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase()
  const coupon = COUPONS[normalized]

  if (!coupon || !coupon.active) {
    return {
      valid: false,
      code: normalized,
      discount: 0,
      label: '',
      finalPrice: BASE_PRICE,
      savings: 0,
    }
  }

  const savings = Math.round(BASE_PRICE * coupon.discount / 100)
  const finalPrice = BASE_PRICE - savings

  return {
    valid: true,
    code: normalized,
    discount: coupon.discount,
    label: coupon.label,
    finalPrice,
    savings,
  }
}

export function getPrice(couponCode?: string): { price: number; originalPrice: number; savings: number; couponLabel: string } {
  if (!couponCode) {
    return { price: BASE_PRICE, originalPrice: ORIGINAL_PRICE, savings: 0, couponLabel: '' }
  }

  const result = validateCoupon(couponCode)
  return {
    price: result.finalPrice,
    originalPrice: BASE_PRICE, // show base as the "was" price when coupon applied
    savings: result.savings,
    couponLabel: result.label,
  }
}
