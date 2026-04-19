import { NextRequest, NextResponse } from 'next/server'
import { updateOrder } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)
    const orderId = params.get('ReturnValue') || ''
    const dealResponse = params.get('DealResponse') || ''

    if (orderId && dealResponse === '0') {
      // Payment successful — update order status
      await updateOrder(orderId, {
        status: 'paid',
        paidAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('ReturnValue') || ''
  const dealResponse = req.nextUrl.searchParams.get('DealResponse') || ''

  if (orderId && dealResponse === '0') {
    await updateOrder(orderId, {
      status: 'paid',
      paidAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({ ok: true })
}
