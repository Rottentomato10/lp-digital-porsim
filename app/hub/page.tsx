'use client'

import { useEffect, useRef } from 'react'

interface Node {
  id: string
  label: string
  desc: string
  url?: string
  x: number
  y: number
  w: number
  h: number
  color: string
  size?: 'lg' | 'md' | 'sm'
}

interface Edge {
  from: string
  to: string
  label?: string
}

const NODES: Node[] = [
  // Center
  { id: 'pk', label: 'פורשים כנף', desc: 'הארגון המרכזי', url: 'https://www.porsimkanaf.com', x: 500, y: 60, w: 180, h: 60, color: '#F5A624', size: 'lg' },

  // Landing pages branch
  { id: 'lp1', label: 'דף נחיתה ראשי', desc: 'דף כהה — digital.porsimkanaf.com', url: 'https://digital.porsimkanaf.com', x: 280, y: 180, w: 170, h: 50, color: '#F5A624' },
  { id: 'lp2', label: 'דף נחיתה /join', desc: 'Navy+Gold — A/B testing', url: 'https://digital.porsimkanaf.com/join', x: 530, y: 180, w: 170, h: 50, color: '#F5A624' },
  { id: 'dash', label: 'דשבורד', desc: 'הזמנות, לידים, אפיליאטים, דיוור', url: 'https://digital.porsimkanaf.com/dashboard', x: 280, y: 280, w: 150, h: 45, color: '#8B5CF6' },
  { id: 'drip', label: 'דיוור אוטומטי', desc: '13 אימיילים + קופון אישי', x: 100, y: 280, w: 140, h: 45, color: '#8B5CF6' },

  // Course branch
  { id: 'course', label: 'פלטפורמת הקורס', desc: '58 שיעורים — course.porsimkanaf.com', url: 'https://course.porsimkanaf.com', x: 530, y: 320, w: 180, h: 50, color: '#10B981' },
  { id: 'app', label: 'אפליקציית תזרים', desc: 'app.porsimkanaf.com', url: 'https://app.porsimkanaf.com', x: 750, y: 320, w: 150, h: 45, color: '#10B981' },

  // Porsot branch (separate)
  { id: 'porsot', label: 'פורשות כנף', desc: 'סדנאות לנשים — Wix', url: 'https://www.porsimkanaf.com/start', x: 800, y: 140, w: 150, h: 50, color: '#F472B6' },

  // Services
  { id: 'cardcom', label: 'CardCom', desc: 'תשלומים + חשבוניות', url: 'https://secure.cardcom.solutions/Interface/BillGold498Login.aspx', x: 100, y: 420, w: 120, h: 40, color: '#00D4FF', size: 'sm' },
  { id: 'brevo', label: 'Brevo', desc: 'אימיילים', url: 'https://app.brevo.com', x: 250, y: 420, w: 100, h: 40, color: '#00D4FF', size: 'sm' },
  { id: 'upstash', label: 'Upstash Redis', desc: 'DB — הזמנות, דיוור', url: 'https://console.upstash.com', x: 380, y: 420, w: 130, h: 40, color: '#00D4FF', size: 'sm' },
  { id: 'supabase', label: 'Supabase', desc: 'DB + Auth קורס', url: 'https://supabase.com/dashboard', x: 530, y: 420, w: 120, h: 40, color: '#00D4FF', size: 'sm' },
  { id: 'vimeo', label: 'Vimeo', desc: 'סרטוני קורס', url: 'https://vimeo.com/manage/videos', x: 680, y: 420, w: 100, h: 40, color: '#00D4FF', size: 'sm' },
  { id: 'vercel', label: 'Vercel', desc: 'Hosting', url: 'https://vercel.com/deks-projects-11b160e2', x: 830, y: 420, w: 100, h: 40, color: '#00D4FF', size: 'sm' },

  // Analytics & Ads
  { id: 'meta', label: 'Meta Ads', desc: 'קמפיינים FB/IG', url: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765', x: 100, y: 510, w: 120, h: 40, color: '#60A5FA', size: 'sm' },
  { id: 'ga', label: 'Google Analytics', desc: 'אנליטיקס', url: 'https://analytics.google.com', x: 260, y: 510, w: 140, h: 40, color: '#60A5FA', size: 'sm' },
  { id: 'clarity', label: 'Clarity', desc: 'הקלטות + heatmaps', url: 'https://clarity.microsoft.com', x: 430, y: 510, w: 110, h: 40, color: '#60A5FA', size: 'sm' },
  { id: 'pixel', label: 'Facebook Pixel', desc: 'מעקב המרות', url: 'https://business.facebook.com/events_manager2', x: 580, y: 510, w: 130, h: 40, color: '#60A5FA', size: 'sm' },

  // GitHub
  { id: 'gh_lp', label: 'GitHub LP', desc: 'קוד דפי נחיתה', url: 'https://github.com/Rottentomato10/lp-digital-porsim', x: 750, y: 510, w: 110, h: 40, color: '#F472B6', size: 'sm' },
  { id: 'gh_course', label: 'GitHub Course', desc: 'קוד קורס', url: 'https://github.com/Rottentomato10/porsim-course', x: 880, y: 510, w: 120, h: 40, color: '#F472B6', size: 'sm' },
]

const EDGES: Edge[] = [
  { from: 'pk', to: 'lp1', label: 'דיגיטל' },
  { from: 'pk', to: 'lp2', label: 'דיגיטל' },
  { from: 'pk', to: 'porsot', label: 'נשים' },
  { from: 'lp1', to: 'dash' },
  { from: 'lp1', to: 'drip', label: 'דיוור' },
  { from: 'lp1', to: 'course', label: 'provision' },
  { from: 'lp2', to: 'course', label: 'provision' },
  { from: 'course', to: 'app' },
  { from: 'lp1', to: 'cardcom' },
  { from: 'course', to: 'cardcom' },
  { from: 'lp1', to: 'brevo' },
  { from: 'course', to: 'brevo' },
  { from: 'drip', to: 'brevo' },
  { from: 'lp1', to: 'upstash' },
  { from: 'course', to: 'supabase' },
  { from: 'course', to: 'vimeo' },
  { from: 'lp1', to: 'vercel' },
  { from: 'course', to: 'vercel' },
  { from: 'lp1', to: 'ga' },
  { from: 'lp1', to: 'clarity' },
  { from: 'lp1', to: 'pixel' },
  { from: 'lp1', to: 'meta' },
  { from: 'lp1', to: 'gh_lp' },
  { from: 'course', to: 'gh_course' },
]

function getCenter(n: Node) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

export default function Hub() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = 1020 * dpr
    canvas.height = 580 * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, 1020, 580)

    // Draw edges
    EDGES.forEach(edge => {
      const from = NODES.find(n => n.id === edge.from)
      const to = NODES.find(n => n.id === edge.to)
      if (!from || !to) return
      const a = getCenter(from)
      const b = getCenter(to)

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      ctx.stroke()
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-x-auto" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="px-5 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-white font-black text-2xl">פורשים כנף — מפת המערכת</h1>
            <p className="text-white/30 text-sm">לחץ על כל ריבוע כדי לעבור אליו</p>
          </div>
        </div>

        <div className="relative" style={{ width: '1020px', height: '580px', minWidth: '1020px' }}>
          {/* Lines canvas */}
          <canvas ref={canvasRef} className="absolute inset-0" style={{ width: '1020px', height: '580px' }} />

          {/* Nodes */}
          {NODES.map(node => (
            <a key={node.id} href={node.url} target="_blank" rel="noopener noreferrer"
              className="absolute group transition-all hover:scale-105 hover:z-10"
              style={{ left: node.x, top: node.y, width: node.w, height: node.h }}>
              <div className="w-full h-full rounded-xl border flex flex-col items-center justify-center text-center px-2 transition-all"
                style={{
                  background: `${node.color}10`,
                  borderColor: `${node.color}30`,
                  boxShadow: `0 0 0 0 ${node.color}00`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${node.color}25`; (e.currentTarget as HTMLElement).style.borderColor = `${node.color}60` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${node.color}00`; (e.currentTarget as HTMLElement).style.borderColor = `${node.color}30` }}
              >
                <p className={`font-bold text-white leading-tight ${node.size === 'lg' ? 'text-base' : node.size === 'sm' ? 'text-[10px]' : 'text-xs'}`}>{node.label}</p>
                <p className={`leading-tight mt-0.5 ${node.size === 'sm' ? 'text-[8px] text-white/25' : 'text-[10px] text-white/35'}`}>{node.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 flex-wrap">
          {[
            { color: '#F5A624', label: 'דפי נחיתה' },
            { color: '#10B981', label: 'מוצרים' },
            { color: '#8B5CF6', label: 'ניהול' },
            { color: '#00D4FF', label: 'שירותים' },
            { color: '#60A5FA', label: 'אנליטיקס' },
            { color: '#F472B6', label: 'קוד / אחר' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
              <span className="text-white/40 text-xs">{l.label}</span>
            </div>
          ))}
        </div>

        <p className="text-white/10 text-xs text-center mt-10">פורשים כנף © 2026 — עמוד פנימי</p>
      </div>
    </div>
  )
}
