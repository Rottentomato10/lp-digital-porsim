// ============================================
// Pricing & Coupon System — פורשים כנף
// ============================================

export const BASE_PRICE = 390
export const ORIGINAL_PRICE = 490

// Coupons are managed exclusively through the affiliate system.
// No static coupons exist — all discounts are tied to affiliates.

export function getPrice(): { price: number; originalPrice: number } {
  return { price: BASE_PRICE, originalPrice: ORIGINAL_PRICE }
}
