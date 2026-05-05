import { NextRequest, NextResponse } from 'next/server'
import { updateOrder, getOrderById } from '@/lib/orders'

// 1x1 transparent PNG pixel
const PIXEL = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')

// GET /api/track/open?id=ORDER_ID
// Returns a 1x1 tracking pixel and records the open
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('id')

  if (orderId) {
    try {
      const order = await getOrderById(orderId)
      if (order && !order.emailOpenedAt) {
        await updateOrder(orderId, { emailOpenedAt: new Date().toISOString() })
      }
    } catch { /* non-blocking */ }
  }

  return new NextResponse(PIXEL, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Length': String(PIXEL.length),
    },
  })
}
