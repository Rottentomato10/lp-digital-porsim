import { NextRequest, NextResponse } from 'next/server'
import { validateCoupon, BASE_PRICE } from '@/lib/pricing'

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

  // Calculate price — apply coupon if provided
  let finalPrice = BASE_PRICE
  let couponLabel = ''

  if (couponCode) {
    const couponResult = validateCoupon(couponCode)
    if (couponResult.valid) {
      finalPrice = couponResult.finalPrice
      couponLabel = couponResult.label
    }
  }

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
        ReturnValue: `${Date.now()}|${customerEmail}|${customerPhone}|${couponCode || 'none'}`,
        SuccessRedirectUrl: `${baseUrl}/checkout/success`,
        FailedRedirectUrl: `${baseUrl}/checkout/failed`,
        WebHookUrl: `${baseUrl}/api/cardcom/webhook`,
        Operation: 'ChargeOnly',
        UIDefinition: {
          CardOwnerNameValue: customerName,
          CardOwnerPhoneValue: customerPhone,
          CardOwnerEmailValue: customerEmail,
          IsHideCardOwnerName: true,
          IsHideCardOwnerPhone: true,
          IsHideCardOwnerEmail: true,
          // CSSUrl: `${baseUrl}/cardcom-style.css`, // error 6322 — waiting for terminal approval
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

    return NextResponse.json({ url: data.Url, price: finalPrice })
  } catch {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}
