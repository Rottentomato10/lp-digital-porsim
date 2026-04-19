import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })
const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

export async function POST(req: NextRequest) {
  if (req.cookies.get('dash_auth')?.value !== DASH_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Clear all test data
  await redis.set('affiliates', [])
  await redis.set('affiliate_events', [])
  await redis.set('orders', [])

  return NextResponse.json({ ok: true, message: 'All data cleared' })
}
