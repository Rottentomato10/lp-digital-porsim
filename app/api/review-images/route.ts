import { NextResponse } from 'next/server'
import { readdirSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const dir = join(process.cwd(), 'public', 'pic review')
    const files = readdirSync(dir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort()
      .map(f => `/pic review/${f}`)
    return NextResponse.json({ images: files })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
