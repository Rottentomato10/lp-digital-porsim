import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { addSubscriber } from '@/lib/drip'
import { saveBrowsingLead } from '@/lib/orders'

const CSV_PATH = join(process.cwd(), 'data', 'leads.csv')
const CSV_HEADER = 'timestamp,name,email,phone,source\n'

/**
 * Sanitize a string for CSV to prevent formula injection.
 * Strips leading characters that spreadsheet apps interpret as formulas.
 */
function sanitizeCsvField(value: string): string {
  // Remove control characters
  let clean = value.replace(/[\t\r\n]/g, ' ')
  // Strip leading formula-trigger characters
  clean = clean.replace(/^[=+\-@]+/, '')
  return clean
}

async function ensureFile() {
  try {
    await mkdir(join(process.cwd(), 'data'), { recursive: true })
    await readFile(CSV_PATH, 'utf-8')
  } catch {
    await writeFile(CSV_PATH, CSV_HEADER, 'utf-8')
  }
}

// POST — save a new lead
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, dripConsent, source, partial } = await req.json()
    if (!name && !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()

    // Auto-enroll in drip campaign for any lead with valid email
    if (email && email.includes('@')) {
      addSubscriber({
        email,
        name: name || '',
        phone: phone || '',
        enrolledAt: timestamp,
        source: source || '/',
        coupon: '',
        dripConfirmed: dripConsent || false,
      }).catch(err => console.error('Drip enroll failed:', err))
    }

    // Save browsing lead to Redis (so it appears in dashboard) — save ANY input
    try {
      await saveBrowsingLead({ name: name || '', email: email || '', phone: phone || '', source: source || '/' })
    } catch (err) {
      console.error('saveBrowsingLead failed:', err)
    }

    // Save to CSV (may fail on serverless — non-critical)
    try {
      await ensureFile()
      const safeName = sanitizeCsvField(name)
      const safeEmail = sanitizeCsvField(email)
      const safePhone = sanitizeCsvField(phone || '')
      const safeSource = sanitizeCsvField(source || '/')
      const row = `${timestamp},"${safeName}","${safeEmail}","${safePhone}","${safeSource}"\n`
      const existing = await readFile(CSV_PATH, 'utf-8')
      await writeFile(CSV_PATH, existing + row, 'utf-8')
    } catch { /* CSV storage is best-effort on serverless */ }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}

// GET — download the CSV (protected with a simple key)
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key !== process.env.LEADS_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await ensureFile()
    const csv = await readFile(CSV_PATH, 'utf-8')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leads.csv"',
      },
    })
  } catch {
    return NextResponse.json({ error: 'No data' }, { status: 404 })
  }
}
