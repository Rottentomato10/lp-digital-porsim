// ============================================
// Affiliate System — פורשים כנף
// ============================================

export interface Affiliate {
  id: string
  name: string
  email: string
  code: string          // unique referral code (used in ?via=CODE)
  coupon: string        // coupon code customers use at checkout
  discountPercent: number
  commissionPercent: number
  active: boolean
  createdAt: string
}

export interface AffiliateEvent {
  affiliateId: string
  type: 'visit' | 'checkout' | 'purchase'
  timestamp: string
  meta?: Record<string, string>
}

export interface AffiliateStats {
  visits: number
  checkouts: number
  purchases: number
  revenue: number
  commission: number
}

// In-memory store — persists per serverless instance
// For production, replace with Vercel KV or database
const affiliatesStore: Map<string, Affiliate> = new Map()
const eventsStore: AffiliateEvent[] = []

// ── Affiliate CRUD ──

export function getAllAffiliates(): Affiliate[] {
  return Array.from(affiliatesStore.values()).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getAffiliateById(id: string): Affiliate | undefined {
  return affiliatesStore.get(id)
}

export function getAffiliateByCode(code: string): Affiliate | undefined {
  return Array.from(affiliatesStore.values()).find(a => a.code === code.toLowerCase())
}

export function getAffiliateByCoupon(coupon: string): Affiliate | undefined {
  return Array.from(affiliatesStore.values()).find(a => a.coupon === coupon.toUpperCase())
}

export function createAffiliate(data: {
  name: string
  email: string
  code: string
  coupon: string
  discountPercent: number
  commissionPercent: number
}): Affiliate {
  const id = `aff_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  const affiliate: Affiliate = {
    id,
    name: data.name,
    email: data.email,
    code: data.code.toLowerCase(),
    coupon: data.coupon.toUpperCase(),
    discountPercent: data.discountPercent,
    commissionPercent: data.commissionPercent,
    active: true,
    createdAt: new Date().toISOString(),
  }
  affiliatesStore.set(id, affiliate)
  return affiliate
}

export function updateAffiliate(id: string, updates: Partial<Affiliate>): Affiliate | null {
  const existing = affiliatesStore.get(id)
  if (!existing) return null
  const updated = { ...existing, ...updates, id } // id can't change
  affiliatesStore.set(id, updated)
  return updated
}

export function deleteAffiliate(id: string): boolean {
  return affiliatesStore.delete(id)
}

// ── Events / Tracking ──

export function trackEvent(event: AffiliateEvent): void {
  eventsStore.push(event)
}

export function getEventsForAffiliate(affiliateId: string): AffiliateEvent[] {
  return eventsStore.filter(e => e.affiliateId === affiliateId)
}

export function getAllEvents(): AffiliateEvent[] {
  return [...eventsStore]
}

export function getStatsForAffiliate(affiliateId: string, basePrice: number): AffiliateStats {
  const events = getEventsForAffiliate(affiliateId)
  const affiliate = getAffiliateById(affiliateId)

  const visits = events.filter(e => e.type === 'visit').length
  const checkouts = events.filter(e => e.type === 'checkout').length
  const purchases = events.filter(e => e.type === 'purchase').length

  const discountedPrice = affiliate
    ? basePrice * (1 - affiliate.discountPercent / 100)
    : basePrice

  const revenue = purchases * discountedPrice
  const commission = affiliate
    ? revenue * (affiliate.commissionPercent / 100)
    : 0

  return { visits, checkouts, purchases, revenue, commission }
}

export function getOverallStats(basePrice: number): AffiliateStats & { affiliateCount: number } {
  const affiliates = getAllAffiliates()
  let totalVisits = 0, totalCheckouts = 0, totalPurchases = 0, totalRevenue = 0, totalCommission = 0

  for (const aff of affiliates) {
    const stats = getStatsForAffiliate(aff.id, basePrice)
    totalVisits += stats.visits
    totalCheckouts += stats.checkouts
    totalPurchases += stats.purchases
    totalRevenue += stats.revenue
    totalCommission += stats.commission
  }

  return {
    affiliateCount: affiliates.length,
    visits: totalVisits,
    checkouts: totalCheckouts,
    purchases: totalPurchases,
    revenue: totalRevenue,
    commission: totalCommission,
  }
}
