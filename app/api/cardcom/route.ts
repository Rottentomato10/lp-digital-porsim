import { NextRequest, NextResponse } from 'next/server'

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

  try {
    const body = await req.json()
    customerName = body.name || ''
    customerEmail = body.email || ''
    customerPhone = body.phone || ''
  } catch {
    return NextResponse.json({ error: 'Missing customer details' }, { status: 400 })
  }

  if (!customerName || !customerEmail || !customerPhone) {
    return NextResponse.json({ error: 'נא למלא שם, אימייל וטלפון' }, { status: 400 })
  }

  try {
    const res = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        TerminalNumber: Number(terminal),
        ApiName: apiName,
        Amount: 1, // TEST MODE — change back to 390 for production
        ReturnValue: `${Date.now()}|${customerEmail}|${customerPhone}`,
        SuccessRedirectUrl: `${baseUrl}/checkout/success`,
        FailedRedirectUrl: `${baseUrl}/checkout/failed`,
        WebHookUrl: `${baseUrl}/api/cardcom/webhook`,
        Operation: 'ChargeOnly',
        Document: {
          To: customerName,
          Email: customerEmail,
          Products: [
            {
              Description: 'קורס פיננסים לצעירים — פורשים כנף',
              UnitCost: 390,
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

    return NextResponse.json({ url: data.Url })
  } catch {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}
