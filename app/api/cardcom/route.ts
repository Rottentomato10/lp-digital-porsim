import { NextRequest, NextResponse } from 'next/server'
import { BASE_PRICE } from '@/lib/pricing'
import { getAffiliateByCoupon, trackEvent } from '@/lib/affiliates'
import { createOrder } from '@/lib/orders'

export async function POST(req: NextRequest) {
  const terminal = process.env.CARDCOM_TERMINAL
  const apiName = process.env.CARDCOM_API_NAME
  const apiPassword = process.env.CARDCOM_API_PASSWORD
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital.porsimkanaf.com'

  if (!terminal || !apiName || !apiPassword) {
    return NextResponse.json({ error: 'Missing CardCom credentials' }, { status: 500 })
  }

  let customerName = ''
  let customerEmail = ''
  let customerPhone = ''
  let couponCode = ''

  try {
    const body = await req.json()
    customerName = body.name || ''
    customerEmail = body.email || ''
    customerPhone = body.phone || ''
    couponCode = body.coupon || ''
  } catch {
    return NextResponse.json({ error: 'Missing customer details' }, { status: 400 })
  }

  if (!customerName || !customerEmail || !customerPhone) {
    return NextResponse.json({ error: 'נא למלא שם, אימייל וטלפון' }, { status: 400 })
  }

  // Calculate price
  let finalPrice = BASE_PRICE
  let couponLabel = ''
  let affiliateId = ''

  if (couponCode) {
    const affiliate = await getAffiliateByCoupon(couponCode)
    if (affiliate && affiliate.active) {
      const savings = Math.round(BASE_PRICE * affiliate.discountPercent / 100)
      finalPrice = BASE_PRICE - savings
      couponLabel = `הנחת ${affiliate.discountPercent}%`
      affiliateId = affiliate.id
      await trackEvent({ affiliateId: affiliate.id, type: 'purchase', timestamp: new Date().toISOString() })
    }
  }

  // Create order
  const order = await createOrder({
    name: customerName,
    email: customerEmail,
    phone: customerPhone,
    coupon: couponCode,
    affiliateId,
    amount: finalPrice,
  })

  try {
    const res = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        TerminalNumber: Number(terminal),
        ApiName: apiName,
        Amount: finalPrice,
        Language: 'he',
        ISOCoinId: 1,
        ReturnValue: order.id,
        SuccessRedirectUrl: `${baseUrl}/checkout/success?order=${order.id}`,
        FailedRedirectUrl: `${baseUrl}/checkout/failed?order=${order.id}`,
        WebHookUrl: `${baseUrl}/api/cardcom/webhook`,
        Operation: 'ChargeOnly',
        UIDefinition: {
          CardOwnerNameValue: customerName,
          CardOwnerPhoneValue: customerPhone,
          CardOwnerEmailValue: customerEmail,
          IsHideCardOwnerName: true,
          IsHideCardOwnerPhone: true,
          IsHideCardOwnerEmail: true,
          // CSS applied via CardCom admin panel (not API)
        },
        Document: {
          TypeToCreate: 'Auto',
          Name: customerName,
          Email: customerEmail,
          Phone: customerPhone,
          IsSendByEmail: true,
          Products: [
            {
              Description: couponLabel
                ? `קורס פיננסים לצעירים — פורשים כנף (${couponLabel})`
                : 'קורס פיננסים לצעירים — פורשים כנף',
              UnitCost: finalPrice,
            },
          ],
        },
      }),
    })

    const data = await res.json()

    if (data.ResponseCode !== 0) {
      return NextResponse.json(
        { error: data.Description || 'CardCom error', code: data.ResponseCode },
        { status: 400 }
      )
    }

    return NextResponse.json({ url: data.Url, price: finalPrice, orderId: order.id })
  } catch {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}
