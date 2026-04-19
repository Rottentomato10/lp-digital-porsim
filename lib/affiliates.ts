// ============================================
// Affiliate System — פורשים כנף
// Persistent storage via Upstash Redis
// ============================================

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const AFFILIATES_KEY = 'affiliates'
const EVENTS_KEY = 'affiliate_events'

export interface Affiliate {
  id: string
  affNumber: number     // unique 4-digit random number
  name: string
  email: string
  phone: string
  code: string
  coupon: string
  discountPercent: number
  commissionPercent: number
  bankName: string
  bankBranch: string
  bankAccount: string
  notes: string
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

// ── Helpers ──

async function loadAffiliates(): Promise<Affiliate[]> {
  const data = await redis.get<Affiliate[]>(AFFILIATES_KEY)
  return data || []
}

async function saveAffiliates(affiliates: Affiliate[]): Promise<void> {
  await redis.set(AFFILIATES_KEY, affiliates)
}

async function loadEvents(): Promise<AffiliateEvent[]> {
  const data = await redis.get<AffiliateEvent[]>(EVENTS_KEY)
  return data || []
}

async function saveEvents(events: AffiliateEvent[]): Promise<void> {
  await redis.set(EVENTS_KEY, events)
}

// ── CRUD ──

export async function getAllAffiliates(): Promise<Affiliate[]> {
  const all = await loadAffiliates()
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAffiliateById(id: string): Promise<Affiliate | undefined> {
  const all = await loadAffiliates()
  return all.find(a => a.id === id)
}

export async function getAffiliateByCode(code: string): Promise<Affiliate | undefined> {
  const all = await loadAffiliates()
  return all.find(a => a.code === code.toLowerCase())
}

export async function getAffiliateByCoupon(coupon: string): Promise<Affiliate | undefined> {
  const all = await loadAffiliates()
  return all.find(a => a.coupon === coupon.toUpperCase())
}

function generateUniqueNumber(existing: Affiliate[]): number {
  const usedNumbers = new Set(existing.map(a => a.affNumber).filter(Boolean))
  let num: number
  do {
    num = Math.floor(1000 + Math.random() * 9000) // 1000-9999
  } while (usedNumbers.has(num))
  return num
}

export async function createAffiliate(data: Omit<Affiliate, 'id' | 'affNumber' | 'active' | 'createdAt'>): Promise<Affiliate> {
  const all = await loadAffiliates()
  const id = `aff_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  const affNumber = generateUniqueNumber(all)
  const affiliate: Affiliate = {
    ...data,
    id,
    affNumber,
    code: data.code.toLowerCase(),
    coupon: data.coupon.toUpperCase(),
    active: true,
    createdAt: new Date().toISOString(),
  }
  all.push(affiliate)
  await saveAffiliates(all)
  return affiliate
}

export async function updateAffiliate(id: string, updates: Partial<Affiliate>): Promise<Affiliate | null> {
  const all = await loadAffiliates()
  const idx = all.findIndex(a => a.id === id)
  if (idx === -1) return null
  const updated = { ...all[idx], ...updates, id }
  if (updates.code) updated.code = updates.code.toLowerCase()
  if (updates.coupon) updated.coupon = updates.coupon.toUpperCase()
  all[idx] = updated
  await saveAffiliates(all)
  return updated
}

export async function deleteAffiliate(id: string): Promise<boolean> {
  const all = await loadAffiliates()
  const filtered = all.filter(a => a.id !== id)
  if (filtered.length === all.length) return false
  await saveAffiliates(filtered)
  return true
}

// ── Events ──

export async function trackEvent(event: AffiliateEvent): Promise<void> {
  const events = await loadEvents()
  events.push(event)
  await saveEvents(events)
}

export async function getStatsForAffiliate(affiliateId: string, basePrice: number): Promise<AffiliateStats> {
  const events = await loadEvents()
  const affiliate = await getAffiliateById(affiliateId)
  const affEvents = events.filter(e => e.affiliateId === affiliateId)

  const visits = affEvents.filter(e => e.type === 'visit').length
  const checkouts = affEvents.filter(e => e.type === 'checkout').length
  const purchases = affEvents.filter(e => e.type === 'purchase').length

  const discountedPrice = affiliate ? basePrice * (1 - affiliate.discountPercent / 100) : basePrice
  const revenue = purchases * discountedPrice
  const commission = affiliate ? revenue * (affiliate.commissionPercent / 100) : 0

  return { visits, checkouts, purchases, revenue: Math.round(revenue), commission: Math.round(commission) }
}
