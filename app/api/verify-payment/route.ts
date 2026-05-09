import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrder, getAllOrders } from '@/lib/orders'
import { markAsPurchased } from '@/lib/drip'

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

    // Remove from drip campaign
    markAsPurchased(order.email).catch(() => {})

    // Send admin email notification
    const adminEmail = process.env.ADMIN_EMAIL
    const brevoKey = process.env.BREVO_API_KEY
    if (adminEmail && brevoKey) {
      try {
        const allOrders = await getAllOrders()
        const paidCount = allOrders.filter(o => o.status !== 'pending').length
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: { 'accept': 'application/json', 'content-type': 'application/json', 'api-key': brevoKey },
          body: JSON.stringify({
            sender: { name: 'פורשים כנף', email: 'noreply@porsimkanaf.com' },
            to: [{ email: adminEmail }],
            subject: `לקוח מס׳ ${paidCount} הצטרף לנבחרת!`,
            htmlContent: `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:24px">
              <div style="text-align:center;margin-bottom:20px">
                <p style="font-size:40px;margin:0">🎉</p>
                <h2 style="color:#F5A624;margin:8px 0 4px;font-size:22px">לקוח מס׳ ${paidCount} הצטרף לנבחרת!</h2>
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:15px;background:#f9f9f4;border-radius:12px;overflow:hidden">
                <tr><td style="padding:12px 16px;color:#888;border-bottom:1px solid #eee">שם</td><td style="padding:12px 16px;font-weight:bold;border-bottom:1px solid #eee">${order.name}</td></tr>
                <tr><td style="padding:12px 16px;color:#888;border-bottom:1px solid #eee">אימייל</td><td style="padding:12px 16px;border-bottom:1px solid #eee" dir="ltr">${order.email}</td></tr>
                <tr><td style="padding:12px 16px;color:#888;border-bottom:1px solid #eee">טלפון</td><td style="padding:12px 16px;border-bottom:1px solid #eee" dir="ltr">${order.phone}</td></tr>
                <tr><td style="padding:12px 16px;color:#888">סכום</td><td style="padding:12px 16px;color:#10B981;font-weight:bold;font-size:18px">₪${order.amount}</td></tr>
              </table>
            </div>`,
          }),
        })
      } catch { /* non-blocking */ }
    }

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

        if (res.ok) {
          await updateOrder(orderId, { emailSent: true, emailSentAt: new Date().toISOString(), status: 'email_sent' })
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
