'use client'

import { useEffect, useRef } from 'react'

interface Node {
  id: string
  label: string
  desc: string
  url?: string
  angle: number
  distance: number
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

// Colors per category
const C = {
  brand: '#F5A624',    // פורשים כנף ראשי
  sales: '#F97316',    // דפי נחיתה ומכירות
  course: '#10B981',   // קורס ומוצרים דיגיטליים
  women: '#EC4899',    // פורשות כנף
  manage: '#8B5CF6',   // ניהול ודשבורד
  infra: '#06B6D4',    // שירותי תשתית
  traffic: '#3B82F6',  // טראפיק ופרסום
  analytics: '#6366F1', // אנליטיקס ומעקב
}

const NODES: Node[] = [
  // Center
  { id: 'pk', label: 'פורשים כנף', desc: 'חינוך פיננסי · הארגון המרכזי', url: 'https://www.porsimkanaf.com', angle: 0, distance: 0, w: 170, h: 65, color: C.brand, size: 'lg' },

  // Ring 1 — Products
  { id: 'lp1', label: 'דף נחיתה ראשי', desc: 'דף מכירה כהה · טופס תשלום · וידאו', url: 'https://digital.porsimkanaf.com', angle: 200, distance: 150, w: 160, h: 50, color: C.sales },
  { id: 'lp2', label: 'דף /join', desc: 'דף מכירה חלופי · Navy · A/B test', url: 'https://digital.porsimkanaf.com/join', angle: 245, distance: 155, w: 145, h: 48, color: C.sales },
  { id: 'course', label: 'פלטפורמת הקורס', desc: '58 שיעורים · וידאו · תעודות · התחברות', url: 'https://course.porsimkanaf.com', angle: 330, distance: 155, w: 170, h: 50, color: C.course },
  { id: 'porsot', label: 'פורשות כנף', desc: 'סדנאות פרונטליות לנשים · 12 משתתפות', url: 'https://www.porsimkanaf.com/start', angle: 90, distance: 150, w: 155, h: 48, color: C.women },
  { id: 'wix', label: 'אתר החברה', desc: 'אתר Wix ראשי · porsimkanaf.com', url: 'https://www.porsimkanaf.com', angle: 135, distance: 148, w: 130, h: 46, color: C.brand },

  // Ring 2 — Management & Tools
  { id: 'dash', label: 'דשבורד ניהול', desc: 'הזמנות · לידים · אפיליאטים · סטטיסטיקות', url: 'https://digital.porsimkanaf.com/dashboard', angle: 175, distance: 275, w: 145, h: 46, color: C.manage },
  { id: 'drip', label: 'מערכת דיוור', desc: '13 אימיילים אוטומטיים · קופון אישי · opt-in', angle: 220, distance: 285, w: 140, h: 44, color: C.manage },
  { id: 'admin', label: 'ניהול קורס', desc: 'תלמידים · תכנים · הרשאות · סטטוסים', url: 'https://course.porsimkanaf.com/admin', angle: 350, distance: 270, w: 130, h: 44, color: C.course },
  { id: 'app', label: 'אפליקציית תזרים', desc: 'כלי ניהול תזרים אישי לתלמידים', url: 'https://app.porsimkanaf.com', angle: 10, distance: 275, w: 140, h: 44, color: C.course },

  // Ring 3 — Infrastructure
  { id: 'cardcom', label: 'CardCom', desc: 'שער תשלומים · כרטיסי אשראי · חשבוניות', url: 'https://secure.cardcom.solutions/Interface/BillGold498Login.aspx', angle: 255, distance: 390, w: 115, h: 42, color: C.infra, size: 'sm' },
  { id: 'brevo', label: 'Brevo', desc: 'שליחת אימיילים · welcome · דיוור · סיסמאות', url: 'https://app.brevo.com', angle: 200, distance: 400, w: 110, h: 42, color: C.infra, size: 'sm' },
  { id: 'upstash', label: 'Upstash Redis', desc: 'מסד נתונים · הזמנות · אפיליאטים · דיוור', url: 'https://console.upstash.com', angle: 165, distance: 390, w: 125, h: 42, color: C.infra, size: 'sm' },
  { id: 'supabase', label: 'Supabase', desc: 'מסד נתונים + Auth · תלמידים · שיעורים', url: 'https://supabase.com/dashboard', angle: 315, distance: 390, w: 115, h: 42, color: C.infra, size: 'sm' },
  { id: 'vimeo', label: 'Vimeo', desc: 'אחסון סרטוני שיעורים · streaming', url: 'https://vimeo.com/manage/videos', angle: 345, distance: 395, w: 105, h: 40, color: C.infra, size: 'sm' },
  { id: 'vercel', label: 'Vercel', desc: 'Hosting · Deploy · SSL · דומיינים', url: 'https://vercel.com/deks-projects-11b160e2', angle: 25, distance: 390, w: 105, h: 40, color: C.infra, size: 'sm' },

  // Traffic — separate axis
  { id: 'meta', label: 'Meta Ads Manager', desc: 'קמפיינים · קהלים · תקציב · FB + IG', url: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765', angle: 55, distance: 280, w: 155, h: 48, color: C.traffic },

  // Analytics
  { id: 'ga', label: 'Google Analytics', desc: 'תנועה · המרות · התנהגות משתמשים', url: 'https://analytics.google.com', angle: 80, distance: 390, w: 130, h: 40, color: C.analytics, size: 'sm' },
  { id: 'clarity', label: 'Microsoft Clarity', desc: 'הקלטות סשנים · מפות חום · UX', url: 'https://clarity.microsoft.com', angle: 105, distance: 390, w: 135, h: 40, color: C.analytics, size: 'sm' },
  { id: 'pixel', label: 'Facebook Pixel', desc: 'מעקב המרות · רימרקטינג · קהלים דומים', url: 'https://business.facebook.com/events_manager2', angle: 140, distance: 395, w: 125, h: 40, color: C.analytics, size: 'sm' },
]

const EDGES: Edge[] = [
  { from: 'pk', to: 'lp1' }, { from: 'pk', to: 'lp2' }, { from: 'pk', to: 'course' },
  { from: 'pk', to: 'porsot' }, { from: 'pk', to: 'wix' }, { from: 'pk', to: 'meta' },
  { from: 'lp1', to: 'dash' }, { from: 'lp1', to: 'drip' },
  { from: 'lp1', to: 'course' }, { from: 'lp2', to: 'course' },
  { from: 'course', to: 'admin' }, { from: 'course', to: 'app' },
  { from: 'lp1', to: 'cardcom' }, { from: 'course', to: 'cardcom' },
  { from: 'drip', to: 'brevo' }, { from: 'course', to: 'brevo' },
  { from: 'lp1', to: 'upstash' },
  { from: 'course', to: 'supabase' }, { from: 'course', to: 'vimeo' },
  { from: 'lp1', to: 'vercel' }, { from: 'course', to: 'vercel' },
  { from: 'meta', to: 'lp1' }, { from: 'meta', to: 'lp2' },
  { from: 'lp1', to: 'ga' }, { from: 'lp1', to: 'clarity' }, { from: 'lp1', to: 'pixel' },
  { from: 'pixel', to: 'meta' },
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

    // Ring guides
    ;[150, 275, 390].forEach(r => {
      ctx.beginPath()
      ctx.arc(CX, CY, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.025)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Draw edges with color from target node
    EDGES.forEach(edge => {
      const from = NODES.find(n => n.id === edge.from)
      const to = NODES.find(n => n.id === edge.to)
      if (!from || !to) return
      const a = getNodeCenter(from)
      const b = getNodeCenter(to)

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = to.color + '45'
      ctx.lineWidth = 2
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
              const isCenter = node.id === 'pk'
              return (
                <a key={node.id} href={node.url} target="_blank" rel="noopener noreferrer"
                  className="absolute group transition-all duration-300 hover:scale-110 hover:z-20"
                  style={{ left: pos.x, top: pos.y, width: node.w, height: node.h }}>
                  <div className="w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center px-2 transition-all duration-300"
                    style={{
                      background: isCenter ? `${node.color}45` : `${node.color}35`,
                      borderColor: isCenter ? `${node.color}95` : `${node.color}80`,
                      boxShadow: isCenter ? `0 0 50px ${node.color}15` : 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 0 30px ${node.color}30`
                      e.currentTarget.style.borderColor = `${node.color}90`
                      e.currentTarget.style.background = `${node.color}50`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = isCenter ? `0 0 50px ${node.color}15` : 'none'
                      e.currentTarget.style.borderColor = isCenter ? `${node.color}95` : `${node.color}80`
                      e.currentTarget.style.background = isCenter ? `${node.color}45` : `${node.color}35`
                    }}>
                    <p className={`font-bold leading-tight ${
                      node.size === 'lg' ? 'text-lg' : node.size === 'sm' ? 'text-sm' : 'text-base'
                    }`} style={{ color: node.color }}>{node.label}</p>
                    <p className={`leading-tight mt-1 text-white/70 ${
                      node.size === 'sm' ? 'text-[10px]' : 'text-xs'
                    }`}>{node.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
          {[
            { color: C.brand, label: 'פורשים כנף' },
            { color: C.sales, label: 'דפי נחיתה' },
            { color: C.course, label: 'קורס ומוצרים' },
            { color: C.women, label: 'פורשות כנף' },
            { color: C.manage, label: 'ניהול' },
            { color: C.traffic, label: 'טראפיק' },
            { color: C.analytics, label: 'אנליטיקס' },
            { color: C.infra, label: 'תשתית' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: l.color }} />
              <span className="text-white/50 text-xs">{l.label}</span>
            </div>
          ))}
        </div>

        <p className="text-white/10 text-xs text-center mt-8">פורשים כנף © 2026</p>
      </div>
    </div>
  )
}
