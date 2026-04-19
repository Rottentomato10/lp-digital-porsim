import { NextRequest, NextResponse } from 'next/server'
import { getAllAffiliates, createAffiliate, updateAffiliate, deleteAffiliate, getAffiliateByCode, getAffiliateByCoupon, getStatsForAffiliate } from '@/lib/affiliates'
import { BASE_PRICE } from '@/lib/pricing'

const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get('dash_auth')?.value === DASH_PASS
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const allAffs = await getAllAffiliates()
  const affiliates = await Promise.all(allAffs.map(async aff => ({
    ...aff,
    stats: await getStatsForAffiliate(aff.id, BASE_PRICE),
  })))

  const overall = {
    affiliateCount: affiliates.length,
    visits: affiliates.reduce((s, a) => s + a.stats.visits, 0),
    checkouts: affiliates.reduce((s, a) => s + a.stats.checkouts, 0),
    purchases: affiliates.reduce((s, a) => s + a.stats.purchases, 0),
    revenue: affiliates.reduce((s, a) => s + a.stats.revenue, 0),
    commission: affiliates.reduce((s, a) => s + a.stats.commission, 0),
  }

  return NextResponse.json({ affiliates, overall })
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { name, email, phone, code, coupon, discountPercent, commissionPercent, bankName, bankBranch, bankAccount, notes } = body

    if (!name || !email || !code || !coupon) {
      return NextResponse.json({ error: 'נא למלא שם, אימייל, קוד הפניה וקוד קופון' }, { status: 400 })
    }
    if (await getAffiliateByCode(code)) return NextResponse.json({ error: 'קוד הפניה כבר קיים' }, { status: 400 })
    if (await getAffiliateByCoupon(coupon)) return NextResponse.json({ error: 'קוד קופון כבר קיים' }, { status: 400 })

    const affiliate = await createAffiliate({
      name, email, phone: phone || '', code, coupon,
      discountPercent: Number(discountPercent) || 0,
      commissionPercent: Number(commissionPercent) || 0,
      bankName: bankName || '', bankBranch: bankBranch || '', bankAccount: bankAccount || '',
      notes: notes || '',
    })

    return NextResponse.json({ affiliate })
  } catch {
    return NextResponse.json({ error: 'שגיאה' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const updated = await updateAffiliate(id, updates)
    if (!updated) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 })

    return NextResponse.json({ affiliate: updated })
  } catch {
    return NextResponse.json({ error: 'שגיאה' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await deleteAffiliate(id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'שגיאה' }, { status: 500 })
  }
}
