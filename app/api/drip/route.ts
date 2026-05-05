import { NextRequest, NextResponse } from 'next/server'
import { getCampaign, saveCampaign, createDefaultCampaign, getAllSubscribers, getDripStats, getSendLogs } from '@/lib/drip'
import { isAuthed } from '@/lib/auth'

// GET — get campaign, subscribers, stats
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const what = req.nextUrl.searchParams.get('what') || 'all'

  if (what === 'campaign') {
    const campaign = await getCampaign() || await createDefaultCampaign()
    return NextResponse.json(campaign)
  }

  if (what === 'subscribers') {
    const subs = await getAllSubscribers()
    return NextResponse.json(subs)
  }

  if (what === 'stats') {
    const stats = await getDripStats()
    return NextResponse.json(stats)
  }

  if (what === 'logs') {
    const logs = await getSendLogs()
    return NextResponse.json(logs)
  }

  // Default: return everything
  const [campaign, subscribers, stats] = await Promise.all([
    getCampaign() || createDefaultCampaign(),
    getAllSubscribers(),
    getDripStats(),
  ])

  return NextResponse.json({ campaign, subscribers, stats })
}

// PUT — update campaign (emails, settings)
export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const existing = await getCampaign() || await createDefaultCampaign()

    const updated = {
      ...existing,
      ...body,
      id: existing.id,
      createdAt: existing.createdAt,
    }

    await saveCampaign(updated)
    return NextResponse.json({ ok: true, campaign: updated })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
