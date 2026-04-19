import { NextRequest, NextResponse } from 'next/server'
import { updateOrder, getOrderById } from '@/lib/orders'

async function notifyPurchase(order: { id: string; name: string; email: string; phone: string; amount: number; coupon: string }) {
  // Send WhatsApp notification via WhatsApp API (wa.me link won't work server-side)
  // Instead, log for now — can connect to WhatsApp Business API later
  console.log(JSON.stringify({
    event: 'PURCHASE_NOTIFICATION',
    orderId: order.id,
    name: order.name,
    email: order.email,
    phone: order.phone,
    amount: order.amount,
    coupon: order.coupon || 'ללא',
    timestamp: new Date().toISOString(),
  }))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)
    const orderId = params.get('ReturnValue') || ''
    const dealResponse = params.get('DealResponse') || ''

    if (orderId && dealResponse === '0') {
      await updateOrder(orderId, {
        status: 'paid',
        paidAt: new Date().toISOString(),
      })

      // Notify on purchase
      const order = await getOrderById(orderId)
      if (order) await notifyPurchase(order)
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

    const order = await getOrderById(orderId)
    if (order) await notifyPurchase(order)
  }

  return NextResponse.json({ ok: true })
}
