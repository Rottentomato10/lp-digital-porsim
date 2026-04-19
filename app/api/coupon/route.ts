import { NextRequest, NextResponse } from 'next/server'
import { validateCoupon } from '@/lib/pricing'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'נא להזין קוד קופון' }, { status: 400 })
    }

    const result = validateCoupon(code)

    if (!result.valid) {
      return NextResponse.json({ valid: false, error: 'קוד קופון לא תקין' })
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ valid: false, error: 'שגיאה' }, { status: 500 })
  }
}
