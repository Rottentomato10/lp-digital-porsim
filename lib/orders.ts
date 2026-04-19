// ============================================
// Orders System — פורשים כנף
// Persistent storage via Upstash Redis
// ============================================

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const ORDERS_KEY = 'orders'

export interface Order {
  id: string             // e.g. "A38291"
  name: string
  email: string
  phone: string
  coupon: string         // coupon used (if any)
  affiliateId: string    // affiliate linked (if any)
  amount: number         // amount paid
  status: 'pending' | 'paid' | 'email_sent' | 'accessed' | 'refunded'
  createdAt: string
  paidAt: string
  notes: string
}

function generateOrderId(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
  const digits = String(Math.floor(10000 + Math.random() * 90000)) // 10000-99999
  return `${letter}${digits}`
}

async function loadOrders(): Promise<Order[]> {
  const data = await redis.get<Order[]>(ORDERS_KEY)
  return data || []
}

async function saveOrders(orders: Order[]): Promise<void> {
  await redis.set(ORDERS_KEY, orders)
}

export async function getAllOrders(): Promise<Order[]> {
  const all = await loadOrders()
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const all = await loadOrders()
  return all.find(o => o.id === id)
}

export async function createOrder(data: {
  name: string
  email: string
  phone: string
  coupon?: string
  affiliateId?: string
  amount: number
}): Promise<Order> {
  const all = await loadOrders()

  // Generate unique order ID
  const existingIds = new Set(all.map(o => o.id))
  let id: string
  do { id = generateOrderId() } while (existingIds.has(id))

  const order: Order = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    coupon: data.coupon || '',
    affiliateId: data.affiliateId || '',
    amount: data.amount,
    status: 'pending',
    createdAt: new Date().toISOString(),
    paidAt: '',
    notes: '',
  }

  all.push(order)
  await saveOrders(all)
  return order
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const all = await loadOrders()
  const idx = all.findIndex(o => o.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], ...updates, id }
  await saveOrders(all)
  return all[idx]
}

export async function searchOrders(query: string): Promise<Order[]> {
  const all = await loadOrders()
  const q = query.toLowerCase()
  return all.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.name.toLowerCase().includes(q) ||
    o.email.toLowerCase().includes(q) ||
    o.phone.includes(q)
  )
}
