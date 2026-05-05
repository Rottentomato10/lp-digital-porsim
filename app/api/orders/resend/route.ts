import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrder } from '@/lib/orders'
import { isAuthed } from '@/lib/auth'

// POST — resend welcome email by re-triggering provision
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { orderId } = await req.json()
    if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })

    const order = await getOrderById(orderId)
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    if (order.status === 'pending') return NextResponse.json({ error: 'Order not paid yet' }, { status: 400 })

    const courseApiUrl = process.env.COURSE_API_URL
    const provisionSecret = process.env.PROVISION_API_SECRET

    if (!courseApiUrl || !provisionSecret) {
      return NextResponse.json({ error: 'Course API not configured' }, { status: 500 })
    }

    const res = await fetch(`${courseApiUrl}/api/provision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provisionSecret}`,
      },
      body: JSON.stringify({
        email: order.email,
        full_name: order.name,
        phone: order.phone,
        cardcom_transaction_id: order.id,
        amount_charged: order.amount,
        affiliate_code: order.coupon || undefined,
      }),
    })

    if (res.ok) {
      await updateOrder(orderId, { emailSent: true, emailSentAt: new Date().toISOString(), status: 'email_sent' })
      return NextResponse.json({ ok: true, message: 'Email resent' })
    } else {
      const data = await res.json().catch(() => ({}))
      return NextResponse.json({ ok: false, error: 'Provision failed', detail: data }, { status: 500 })
    }
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
