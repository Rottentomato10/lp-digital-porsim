import { NextRequest, NextResponse } from 'next/server'
import { createAffiliate, trackEvent, getAllAffiliates } from '@/lib/affiliates'

const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

// POST — seed test data (only works when no real affiliates exist or force=true)
export async function POST(req: NextRequest) {
  if (req.cookies.get('dash_auth')?.value !== DASH_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await getAllAffiliates()
  const body = await req.json().catch(() => ({}))

  if (existing.length > 0 && !body.force) {
    return NextResponse.json({ error: 'Data already exists. Send force:true to override.' }, { status: 400 })
  }

  const testAffiliates = [
    { name: 'יוסי כהן', email: 'yossi@test.com', phone: '050-1111111', code: 'yossi', coupon: 'YOSSI15', discountPercent: 15, commissionPercent: 10, bankName: 'לאומי', bankBranch: '123', bankAccount: '456789', notes: 'בלוגר פיננסי' },
    { name: 'דנה לוי', email: 'dana@test.com', phone: '050-2222222', code: 'dana', coupon: 'DANA20', discountPercent: 20, commissionPercent: 12, bankName: 'הפועלים', bankBranch: '456', bankAccount: '123456', notes: 'אינסטגרם 50K' },
    { name: 'אורי שמש', email: 'ori@test.com', phone: '050-3333333', code: 'ori', coupon: 'ORI10', discountPercent: 10, commissionPercent: 8, bankName: 'דיסקונט', bankBranch: '789', bankAccount: '987654', notes: 'יוטיוב' },
    { name: 'מיכל אברהם', email: 'michal@test.com', phone: '050-4444444', code: 'michal', coupon: 'MICHAL25', discountPercent: 25, commissionPercent: 15, bankName: 'מזרחי', bankBranch: '321', bankAccount: '654321', notes: 'טיקטוק' },
    { name: 'עומר גולן', email: 'omer@test.com', phone: '050-5555555', code: 'omer', coupon: 'OMER10', discountPercent: 10, commissionPercent: 10, bankName: 'לאומי', bankBranch: '111', bankAccount: '222333', notes: 'מכינה קדם צבאית' },
  ]

  const created = []
  for (const data of testAffiliates) {
    const aff = await createAffiliate(data)
    created.push(aff)

    // Seed random events
    const visitCount = Math.floor(Math.random() * 200) + 20
    const checkoutCount = Math.floor(visitCount * (0.1 + Math.random() * 0.2))
    const purchaseCount = Math.floor(checkoutCount * (0.2 + Math.random() * 0.4))

    for (let i = 0; i < visitCount; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      await trackEvent({ affiliateId: aff.id, type: 'visit', timestamp: new Date(Date.now() - daysAgo * 86400000).toISOString() })
    }
    for (let i = 0; i < checkoutCount; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      await trackEvent({ affiliateId: aff.id, type: 'checkout', timestamp: new Date(Date.now() - daysAgo * 86400000).toISOString() })
    }
    for (let i = 0; i < purchaseCount; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      await trackEvent({ affiliateId: aff.id, type: 'purchase', timestamp: new Date(Date.now() - daysAgo * 86400000).toISOString() })
    }
  }

  return NextResponse.json({ ok: true, count: created.length })
}
