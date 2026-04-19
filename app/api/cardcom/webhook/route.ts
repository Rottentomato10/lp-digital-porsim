import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const data = Object.fromEntries(params.entries())

    console.log(JSON.stringify({
      event: 'cardcom_webhook',
      timestamp: new Date().toISOString(),
      dealResponse: data.DealResponse,
      returnValue: data.ReturnValue,
      invoiceResponseCode: data.InvoiceRespondCode,
      amount: data.SumToBill,
      cardOwnerName: data.CardOwnerName,
      cardOwnerEmail: data.CardOwnerEmail,
      cardOwnerPhone: data.CardOwnerPhone,
      last4: data.Last4Digits,
      allParams: data,
    }))

    return NextResponse.json({ ok: true })
  } catch {
    console.log(JSON.stringify({ event: 'cardcom_webhook_error', timestamp: new Date().toISOString() }))
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

// CardCom might send GET as well
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries())

  console.log(JSON.stringify({
    event: 'cardcom_webhook_get',
    timestamp: new Date().toISOString(),
    params,
  }))

  return NextResponse.json({ ok: true })
}
