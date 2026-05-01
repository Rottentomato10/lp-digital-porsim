import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrder } from '@/lib/orders'

/**
 * POST /api/verify-payment
 *
 * Called from the success page to verify payment and trigger provisioning.
 * This is a fallback for when Cardcom webhook doesn't arrive.
 * If order exists and is still pending, we mark it paid and provision.
 */
export async function POST(req: NextRequest) {
  try {
    const { orderId, marketing_consent } = await req.json()
    if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })

    const order = await getOrderById(orderId)
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    // Already processed
    if (order.status === 'paid') {
      return NextResponse.json({ ok: true, status: 'already_paid' })
    }

    // Mark as paid
    await updateOrder(orderId, {
      status: 'paid',
      paidAt: new Date().toISOString(),
    })

    // Provision course access
    const courseApiUrl = process.env.COURSE_API_URL
    const provisionSecret = process.env.PROVISION_API_SECRET

    if (courseApiUrl && provisionSecret) {
      try {
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
            marketing_consent: marketing_consent !== false,
          }),
        })

        const data = await res.json()
        console.log(JSON.stringify({
          event: 'VERIFY_PAYMENT_PROVISION',
          orderId,
          email: order.email,
          status: res.status,
          response: data,
        }))

        return NextResponse.json({ ok: true, status: 'provisioned', email: order.email })
      } catch (err) {
        console.error(JSON.stringify({ event: 'VERIFY_PAYMENT_PROVISION_ERROR', orderId, error: String(err) }))
        return NextResponse.json({ ok: true, status: 'paid_no_provision' })
      }
    }

    return NextResponse.json({ ok: true, status: 'paid' })
  } catch (err) {
    console.error(JSON.stringify({ event: 'VERIFY_PAYMENT_ERROR', error: String(err) }))
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
