import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateOrder, searchOrders } from '@/lib/orders'

const DASH_PASS = process.env.DASHBOARD_PASSWORD || 'Freedom1992@'

function isAuthed(req: NextRequest): boolean {
  return req.cookies.get('dash_auth')?.value === DASH_PASS
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const search = req.nextUrl.searchParams.get('q')

  if (search) {
    const results = await searchOrders(search)
    return NextResponse.json({ orders: results })
  }

  const orders = await getAllOrders()
  return NextResponse.json({ orders })
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, ...updates } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const updated = await updateOrder(id, updates)
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ order: updated })
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
