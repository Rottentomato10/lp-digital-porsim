import { NextRequest, NextResponse } from 'next/server'
import { updateOrder, getOrderById } from '@/lib/orders'
import { markAsPurchased } from '@/lib/drip'
import { getAffiliateByCoupon, trackEvent } from '@/lib/affiliates'

/**
 * Verify the webhook secret token in the URL query parameter.
 * The webhook URL configured in CardCom should include ?secret=WEBHOOK_SECRET
 */
function verifyWebhookSecret(req: NextRequest): boolean {
  const secret = process.env.WEBHOOK_SECRET
  if (!secret) {
    // If no secret configured, allow (backward compat during migration)
    console.log(JSON.stringify({ event: 'WEBHOOK_NO_SECRET_CONFIGURED', warning: 'WEBHOOK_SECRET env var not set' }))
    return true
  }
  const provided = req.nextUrl.searchParams.get('secret')
  return provided === secret
}

async function notifyPurchase(order: { id: string; name: string; email: string; phone: string; amount: number; coupon: string }) {
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

/**
 * Provision course access after successful payment.
 * Calls the course platform API to create user + grant access.
 */
async function provisionCourseAccess(order: { id: string; name: string; email: string; phone: string; amount: number; coupon: string }): Promise<boolean> {
  const courseApiUrl = process.env.COURSE_API_URL
  const provisionSecret = process.env.PROVISION_API_SECRET

  if (!courseApiUrl || !provisionSecret) {
    console.log(JSON.stringify({
      event: 'PROVISION_SKIPPED',
      reason: 'Missing COURSE_API_URL or PROVISION_API_SECRET',
      orderId: order.id,
    }))
    return false
  }

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
      }),
    })

    const data = await res.json()

    console.log(JSON.stringify({
      event: 'PROVISION_RESULT',
      orderId: order.id,
      email: order.email,
      status: res.status,
      response: data,
      timestamp: new Date().toISOString(),
    }))
    return res.ok
  } catch (err) {
    console.error(JSON.stringify({
      event: 'PROVISION_ERROR',
      orderId: order.id,
      email: order.email,
      error: String(err),
      timestamp: new Date().toISOString(),
    }))
    return false
  }
}

async function handleWebhook(orderId: string, dealResponse: string) {
  console.log(JSON.stringify({
    event: 'WEBHOOK_RECEIVED',
    orderId,
    dealResponse,
    timestamp: new Date().toISOString(),
  }))

  // DealResponse 0 = success
  if (orderId && dealResponse === '0') {
    // Verify the order exists and is in pending status before marking as paid
    const order = await getOrderById(orderId)
    if (!order) {
      console.log(JSON.stringify({ event: 'WEBHOOK_ORDER_NOT_FOUND', orderId }))
      return
    }
    if (order.status !== 'pending') {
      console.log(JSON.stringify({ event: 'WEBHOOK_ORDER_ALREADY_PROCESSED', orderId, status: order.status }))
      return
    }

    const updated = await updateOrder(orderId, {
      status: 'paid',
      paidAt: new Date().toISOString(),
    })
    console.log(JSON.stringify({ event: 'ORDER_UPDATED', orderId, updated: !!updated }))

    await notifyPurchase(order)
    // Remove from drip campaign (non-blocking)
    markAsPurchased(order.email).catch(() => {})
    // Track affiliate purchase (only after confirmed payment)
    if (order.coupon) {
      try {
        const aff = await getAffiliateByCoupon(order.coupon)
        if (aff) {
          await trackEvent({ affiliateId: aff.id, type: 'purchase', timestamp: new Date().toISOString() })
        }
      } catch { /* non-blocking */ }
    }
    // Provision course access + track email status
    const emailSent = await provisionCourseAccess(order)
    if (emailSent) {
      await updateOrder(orderId, { emailSent: true, emailSentAt: new Date().toISOString(), status: 'email_sent' })
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!verifyWebhookSecret(req)) {
      console.log(JSON.stringify({ event: 'WEBHOOK_SECRET_MISMATCH', timestamp: new Date().toISOString() }))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const contentType = req.headers.get('content-type') || ''
    let orderId = ''
    let dealResponse = ''

    if (contentType.includes('application/json')) {
      // JSON format
      const json = await req.json()
      orderId = json.ReturnValue || json.returnValue || ''
      dealResponse = String(json.DealResponse ?? json.dealResponse ?? '')
      console.log(JSON.stringify({ event: 'WEBHOOK_JSON', data: json }))
    } else {
      // Form-urlencoded format
      const body = await req.text()
      const params = new URLSearchParams(body)
      orderId = params.get('ReturnValue') || ''
      dealResponse = params.get('DealResponse') || ''
      console.log(JSON.stringify({ event: 'WEBHOOK_FORM', body }))
    }

    await handleWebhook(orderId, dealResponse)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log(JSON.stringify({ event: 'WEBHOOK_ERROR', error: String(err) }))
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!verifyWebhookSecret(req)) {
      console.log(JSON.stringify({ event: 'WEBHOOK_GET_SECRET_MISMATCH', timestamp: new Date().toISOString() }))
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const orderId = req.nextUrl.searchParams.get('ReturnValue') || ''
    const dealResponse = req.nextUrl.searchParams.get('DealResponse') || ''
    console.log(JSON.stringify({ event: 'WEBHOOK_GET', params: Object.fromEntries(req.nextUrl.searchParams) }))

    await handleWebhook(orderId, dealResponse)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log(JSON.stringify({ event: 'WEBHOOK_GET_ERROR', error: String(err) }))
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
