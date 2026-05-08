'use client'

import { useEffect, useRef } from 'react'

interface Node {
  id: string
  label: string
  desc: string
  url?: string
  angle: number // degrees from center
  distance: number // px from center
  w: number
  h: number
  color: string
  size?: 'lg' | 'md' | 'sm'
}

interface Edge {
  from: string
  to: string
}

const CX = 500
const CY = 320

function posFromAngle(angle: number, dist: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + Math.cos(rad) * dist, y: CY + Math.sin(rad) * dist }
}

const NODES: Node[] = [
  // Center
  { id: 'pk', label: 'פורשים כנף', desc: 'הארגון המרכזי', url: 'https://www.porsimkanaf.com', angle: 0, distance: 0, w: 160, h: 60, color: '#F5A624', size: 'lg' },

  // Ring 1 — Main products (close)
  { id: 'lp1', label: 'דף נחיתה ראשי', desc: 'digital.porsimkanaf.com', url: 'https://digital.porsimkanaf.com', angle: 210, distance: 150, w: 150, h: 48, color: '#F5A624' },
  { id: 'lp2', label: 'דף /join', desc: 'A/B testing', url: 'https://digital.porsimkanaf.com/join', angle: 250, distance: 150, w: 120, h: 44, color: '#F5A624' },
  { id: 'course', label: 'הקורס', desc: 'course.porsimkanaf.com', url: 'https://course.porsimkanaf.com', angle: 330, distance: 150, w: 140, h: 48, color: '#10B981' },
  { id: 'porsot', label: 'פורשות כנף', desc: 'סדנאות לנשים', url: 'https://www.porsimkanaf.com/start', angle: 90, distance: 150, w: 130, h: 44, color: '#F472B6' },
  { id: 'wix', label: 'אתר Wix', desc: 'porsimkanaf.com', url: 'https://www.porsimkanaf.com', angle: 130, distance: 150, w: 110, h: 44, color: '#F5A624' },

  // Ring 2 — Management
  { id: 'dash', label: 'דשבורד', desc: 'הזמנות · לידים · דיוור', url: 'https://digital.porsimkanaf.com/dashboard', angle: 180, distance: 270, w: 130, h: 42, color: '#8B5CF6' },
  { id: 'drip', label: 'דיוור', desc: '13 אימיילים אוטומטי', angle: 220, distance: 280, w: 100, h: 38, color: '#8B5CF6' },
  { id: 'admin', label: 'Admin קורס', desc: 'ניהול תלמידים', url: 'https://course.porsimkanaf.com/admin', angle: 350, distance: 260, w: 120, h: 40, color: '#8B5CF6' },
  { id: 'app', label: 'אפליקציה', desc: 'ניהול תזרים', url: 'https://app.porsimkanaf.com', angle: 10, distance: 270, w: 110, h: 40, color: '#10B981' },

  // Ring 3 — Services
  { id: 'cardcom', label: 'CardCom', desc: 'תשלומים', url: 'https://secure.cardcom.solutions/Interface/BillGold498Login.aspx', angle: 260, distance: 380, w: 100, h: 36, color: '#00D4FF', size: 'sm' },
  { id: 'brevo', label: 'Brevo', desc: 'אימיילים', url: 'https://app.brevo.com', angle: 200, distance: 390, w: 90, h: 36, color: '#00D4FF', size: 'sm' },
  { id: 'upstash', label: 'Upstash', desc: 'Redis DB', url: 'https://console.upstash.com', angle: 170, distance: 380, w: 100, h: 36, color: '#00D4FF', size: 'sm' },
  { id: 'supabase', label: 'Supabase', desc: 'DB + Auth', url: 'https://supabase.com/dashboard', angle: 310, distance: 380, w: 100, h: 36, color: '#00D4FF', size: 'sm' },
  { id: 'vimeo', label: 'Vimeo', desc: 'סרטונים', url: 'https://vimeo.com/manage/videos', angle: 340, distance: 390, w: 90, h: 36, color: '#00D4FF', size: 'sm' },
  { id: 'vercel', label: 'Vercel', desc: 'Hosting', url: 'https://vercel.com/deks-projects-11b160e2', angle: 30, distance: 380, w: 90, h: 36, color: '#00D4FF', size: 'sm' },

  // Ring 3 — Analytics
  { id: 'meta', label: 'Meta Ads', desc: 'קמפיינים', url: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765', angle: 130, distance: 380, w: 100, h: 36, color: '#60A5FA', size: 'sm' },
  { id: 'ga', label: 'Analytics', desc: 'Google', url: 'https://analytics.google.com', angle: 100, distance: 380, w: 100, h: 36, color: '#60A5FA', size: 'sm' },
  { id: 'clarity', label: 'Clarity', desc: 'הקלטות', url: 'https://clarity.microsoft.com', angle: 70, distance: 380, w: 90, h: 36, color: '#60A5FA', size: 'sm' },
  { id: 'pixel', label: 'FB Pixel', desc: 'המרות', url: 'https://business.facebook.com/events_manager2', angle: 150, distance: 390, w: 90, h: 36, color: '#60A5FA', size: 'sm' },

  // GitHub
  { id: 'gh_lp', label: 'GitHub LP', desc: 'קוד', url: 'https://github.com/Rottentomato10/lp-digital-porsim', angle: 240, distance: 400, w: 95, h: 34, color: '#9CA3AF', size: 'sm' },
  { id: 'gh_course', label: 'GitHub Course', desc: 'קוד', url: 'https://github.com/Rottentomato10/porsim-course', angle: 290, distance: 400, w: 110, h: 34, color: '#9CA3AF', size: 'sm' },
]

const EDGES: Edge[] = [
  { from: 'pk', to: 'lp1' },
  { from: 'pk', to: 'lp2' },
  { from: 'pk', to: 'course' },
  { from: 'pk', to: 'porsot' },
  { from: 'pk', to: 'wix' },
  { from: 'lp1', to: 'dash' },
  { from: 'lp1', to: 'drip' },
  { from: 'lp1', to: 'course' },
  { from: 'lp2', to: 'course' },
  { from: 'course', to: 'admin' },
  { from: 'course', to: 'app' },
  { from: 'lp1', to: 'cardcom' },
  { from: 'course', to: 'cardcom' },
  { from: 'drip', to: 'brevo' },
  { from: 'course', to: 'brevo' },
  { from: 'lp1', to: 'upstash' },
  { from: 'course', to: 'supabase' },
  { from: 'course', to: 'vimeo' },
  { from: 'lp1', to: 'vercel' },
  { from: 'course', to: 'vercel' },
  { from: 'lp1', to: 'meta' },
  { from: 'lp1', to: 'ga' },
  { from: 'lp1', to: 'clarity' },
  { from: 'lp1', to: 'pixel' },
  { from: 'lp1', to: 'gh_lp' },
  { from: 'course', to: 'gh_course' },
]

function getNodePos(node: Node) {
  if (node.distance === 0) return { x: CX - node.w / 2, y: CY - node.h / 2 }
  const pos = posFromAngle(node.angle, node.distance)
  return { x: pos.x - node.w / 2, y: pos.y - node.h / 2 }
}

function getNodeCenter(node: Node) {
  const pos = getNodePos(node)
  return { x: pos.x + node.w / 2, y: pos.y + node.h / 2 }
}

export default function Hub() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W = 1000, H = 640
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)

    // Draw ring guides
    ;[150, 270, 390].forEach(r => {
      ctx.beginPath()
      ctx.arc(CX, CY, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw edges
    EDGES.forEach(edge => {
      const from = NODES.find(n => n.id === edge.from)
      const to = NODES.find(n => n.id === edge.to)
      if (!from || !to) return
      const a = getNodeCenter(from)
      const b = getNodeCenter(to)

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `${to.color}18`
      ctx.lineWidth = 1.5
      ctx.stroke()
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-auto" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="px-5 py-8">
        <div className="flex items-center gap-3 mb-6 max-w-4xl mx-auto">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-white font-black text-2xl">מפת המערכת</h1>
            <p className="text-white/30 text-sm">לחץ על כל ריבוע כדי לעבור אליו</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative" style={{ width: '1000px', height: '640px' }}>
            <canvas ref={canvasRef} className="absolute inset-0" style={{ width: '1000px', height: '640px' }} />

            {NODES.map(node => {
              const pos = getNodePos(node)
              return (
                <a key={node.id} href={node.url} target="_blank" rel="noopener noreferrer"
                  className="absolute group transition-all duration-300 hover:scale-110 hover:z-20"
                  style={{ left: pos.x, top: pos.y, width: node.w, height: node.h }}>
                  <div className="w-full h-full rounded-xl border flex flex-col items-center justify-center text-center px-2 transition-all duration-300 backdrop-blur-sm"
                    style={{
                      background: node.id === 'pk' ? `${node.color}25` : `${node.color}0A`,
                      borderColor: `${node.color}35`,
                      boxShadow: node.id === 'pk' ? `0 0 40px ${node.color}20` : 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${node.color}30`
                      e.currentTarget.style.borderColor = `${node.color}80`
                      e.currentTarget.style.background = `${node.color}18`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = node.id === 'pk' ? `0 0 40px ${node.color}20` : 'none'
                      e.currentTarget.style.borderColor = `${node.color}35`
                      e.currentTarget.style.background = node.id === 'pk' ? `${node.color}25` : `${node.color}0A`
                    }}>
                    <p className={`font-bold text-white leading-tight ${
                      node.size === 'lg' ? 'text-sm' : node.size === 'sm' ? 'text-[9px]' : 'text-[11px]'
                    }`}>{node.label}</p>
                    <p className={`leading-tight mt-0.5 ${
                      node.size === 'sm' ? 'text-[7px] text-white/20' : 'text-[9px] text-white/30'
                    }`}>{node.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
          {[
            { color: '#F5A624', label: 'דפי נחיתה' },
            { color: '#10B981', label: 'מוצרים' },
            { color: '#8B5CF6', label: 'ניהול' },
            { color: '#F472B6', label: 'נשים' },
            { color: '#00D4FF', label: 'שירותים' },
            { color: '#60A5FA', label: 'אנליטיקס' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-white/30 text-xs">{l.label}</span>
            </div>
          ))}
        </div>

        <p className="text-white/10 text-xs text-center mt-8">פורשים כנף © 2026</p>
      </div>
    </div>
  )
}
