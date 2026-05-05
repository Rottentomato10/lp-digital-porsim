import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrder } from '@/lib/orders'

/**
 * POST /api/verify-payment
 *
 * Called from the success page to verify payment and trigger provisioning.
 * This is a fallback for when Cardcom webhook doesn't arrive.
 * Requires both orderId and the email that was used to create the order (as proof of ownership).
 */
export async function POST(req: NextRequest) {
  try {
    const { orderId, email } = await req.json()
    if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const order = await getOrderById(orderId)
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    // Verify email matches the order (proof of ownership)
    if (order.email.toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Already processed
    if (order.status === 'paid') {
      return NextResponse.json({ ok: true, status: 'already_paid' })
    }

    // Only allow transitioning from pending
    if (order.status !== 'pending') {
      return NextResponse.json({ ok: true, status: order.status })
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
            marketing_consent: order.marketingConsent !== false,
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

        if (!res.ok) {
          try {
            await fetch(`${courseApiUrl}/api/admin/provision-failure`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${provisionSecret}` },
              body: JSON.stringify({ order_id: orderId, email: order.email, error: JSON.stringify(data), payload: { email: order.email, full_name: order.name, phone: order.phone, cardcom_transaction_id: order.id, amount_charged: order.amount } }),
            })
          } catch { /* */ }
        }

        return NextResponse.json({ ok: true, status: res.ok ? 'provisioned' : 'paid_no_provision', email: order.email })
      } catch (err) {
        try {
          await fetch(`${courseApiUrl}/api/admin/provision-failure`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${provisionSecret}` },
            body: JSON.stringify({ order_id: orderId, email: order.email, error: String(err), payload: { email: order.email, full_name: order.name, phone: order.phone, cardcom_transaction_id: order.id, amount_charged: order.amount } }),
          })
        } catch { /* */ }
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
