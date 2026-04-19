import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })
const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

export async function POST(req: NextRequest) {
  if (req.cookies.get('dash_auth')?.value !== DASH_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const testOrders = [
    { id: 'A38291', name: 'יוסי כהן', email: 'yossi.k@gmail.com', phone: '050-1234567', coupon: 'YOSSI15', affiliateId: '', amount: 331, status: 'paid', createdAt: '2026-04-15T10:30:00Z', paidAt: '2026-04-15T10:32:00Z', notes: '' },
    { id: 'K52740', name: 'דנה לוי', email: 'dana.l@outlook.com', phone: '052-9876543', coupon: 'DANA20', affiliateId: '', amount: 312, status: 'email_sent', createdAt: '2026-04-16T14:20:00Z', paidAt: '2026-04-16T14:22:00Z', notes: '' },
    { id: 'M19384', name: 'אור שמש', email: 'or.shemesh@gmail.com', phone: '054-5551234', coupon: '', affiliateId: '', amount: 390, status: 'accessed', createdAt: '2026-04-17T09:15:00Z', paidAt: '2026-04-17T09:17:00Z', notes: '' },
    { id: 'R67123', name: 'מיכל אברהם', email: 'michal.a@walla.co.il', phone: '050-7778899', coupon: 'MICHAL25', affiliateId: '', amount: 292, status: 'paid', createdAt: '2026-04-18T16:45:00Z', paidAt: '2026-04-18T16:48:00Z', notes: '' },
    { id: 'B44590', name: 'עומר גולן', email: 'omer.g@yahoo.com', phone: '053-1112233', coupon: '', affiliateId: '', amount: 390, status: 'pending', createdAt: '2026-04-19T11:00:00Z', paidAt: '', notes: '' },
    { id: 'T83017', name: 'שירה לוי', email: 'shira.l@gmail.com', phone: '058-4445566', coupon: 'ORI10', affiliateId: '', amount: 351, status: 'paid', createdAt: '2026-04-19T08:30:00Z', paidAt: '2026-04-19T08:33:00Z', notes: '' },
    { id: 'F21456', name: 'נועם כץ', email: 'noam.k@hotmail.com', phone: '050-9990011', coupon: '', affiliateId: '', amount: 390, status: 'refunded', createdAt: '2026-04-14T12:00:00Z', paidAt: '2026-04-14T12:03:00Z', notes: 'ביקש החזר — לא מתאים לו' },
  ]

  await redis.set('orders', testOrders)
  return NextResponse.json({ ok: true, count: testOrders.length })
}
