import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, updateOrder, searchOrders, deleteOrder } from '@/lib/orders'
import { isAuthed } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const search = req.nextUrl.searchParams.get('q')
  const type = req.nextUrl.searchParams.get('type') // 'leads' or 'orders'

  let all = search ? await searchOrders(search) : await getAllOrders()

  if (type === 'leads') {
    all = all.filter(o => o.status === 'pending' || o.status === 'browsing')
  } else if (type === 'orders') {
    all = all.filter(o => o.status !== 'pending' && o.status !== 'browsing')
  }

  return NextResponse.json({ orders: all })
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

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await deleteOrder(id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
