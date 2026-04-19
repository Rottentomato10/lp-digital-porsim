import { NextRequest, NextResponse } from 'next/server'
import { getAllAffiliates, createAffiliate, getAffiliateByCode, getAffiliateByCoupon, getOverallStats } from '@/lib/affiliates'
import { BASE_PRICE } from '@/lib/pricing'

const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

function isAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get('dash_auth')?.value
  return cookie === DASH_PASS
}

// GET — list all affiliates + stats
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const affiliates = getAllAffiliates()
  const overall = getOverallStats(BASE_PRICE)

  const withStats = affiliates.map(aff => {
    const { visits, checkouts, purchases, revenue, commission } = getOverallStats(BASE_PRICE)
    // get per-affiliate stats
    const events = require('@/lib/affiliates').getStatsForAffiliate(aff.id, BASE_PRICE)
    return { ...aff, stats: events }
  })

  return NextResponse.json({ affiliates: withStats, overall })
}

// POST — create new affiliate
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, email, code, coupon, discountPercent, commissionPercent } = body

    if (!name || !email || !code || !coupon) {
      return NextResponse.json({ error: 'נא למלא את כל השדות' }, { status: 400 })
    }

    // Check uniqueness
    if (getAffiliateByCode(code)) {
      return NextResponse.json({ error: 'קוד הפניה כבר קיים' }, { status: 400 })
    }
    if (getAffiliateByCoupon(coupon)) {
      return NextResponse.json({ error: 'קוד קופון כבר קיים' }, { status: 400 })
    }

    const affiliate = createAffiliate({
      name,
      email,
      code,
      coupon,
      discountPercent: Number(discountPercent) || 0,
      commissionPercent: Number(commissionPercent) || 0,
    })

    return NextResponse.json({ affiliate })
  } catch {
    return NextResponse.json({ error: 'שגיאה ביצירת אפיליאייט' }, { status: 500 })
  }
}
