import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const CSV_PATH = join(process.cwd(), 'data', 'leads.csv')
const CSV_HEADER = 'timestamp,name,email,phone\n'

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
    const { name, email, phone } = await req.json()
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await ensureFile()

    const timestamp = new Date().toISOString()
    const row = `${timestamp},"${name}","${email}","${phone || ''}"\n`

    const existing = await readFile(CSV_PATH, 'utf-8')
    await writeFile(CSV_PATH, existing + row, 'utf-8')

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
