'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string; label: string; desc: string; url?: string
  angle: number; distance: number; w: number; h: number; color: string; size?: 'lg' | 'md' | 'sm'
}
interface Edge { from: string; to: string }

const CX = 550, CY = 350

function posFromAngle(a: number, d: number) {
  const r = (a * Math.PI) / 180
  return { x: CX + Math.cos(r) * d, y: CY + Math.sin(r) * d }
}

const C = { brand: '#F5A624', sales: '#F97316', course: '#10B981', women: '#EC4899', manage: '#8B5CF6', infra: '#06B6D4', traffic: '#3B82F6', analytics: '#6366F1' }

const NODES: Node[] = [
  { id:'pk', label:'פורשים כנף', desc:'חינוך פיננסי · הארגון המרכזי', url:'https://www.porsimkanaf.com', angle:0, distance:0, w:210, h:85, color:C.brand, size:'lg' },
  { id:'lp1', label:'דף נחיתה ראשי', desc:'דף מכירה כהה · טופס תשלום · וידאו', url:'https://digital.porsimkanaf.com', angle:200, distance:170, w:200, h:65, color:C.sales },
  { id:'lp2', label:'דף /join', desc:'דף מכירה חלופי · Navy · A/B test', url:'https://digital.porsimkanaf.com/join', angle:245, distance:175, w:175, h:62, color:C.sales },
  { id:'course', label:'פלטפורמת הקורס', desc:'58 שיעורים · וידאו · תעודות · התחברות', url:'https://course.porsimkanaf.com', angle:330, distance:175, w:210, h:68, color:C.course },
  { id:'porsot', label:'פורשות כנף', desc:'סדנאות פרונטליות לנשים · 12 משתתפות', url:'https://www.porsimkanaf.com/start', angle:90, distance:170, w:190, h:65, color:C.women },
  { id:'wix', label:'אתר החברה', desc:'אתר Wix ראשי · porsimkanaf.com', url:'https://www.porsimkanaf.com', angle:135, distance:168, w:165, h:60, color:C.brand },
  { id:'dash', label:'דשבורד ניהול', desc:'הזמנות · לידים · אפיליאטים · סטטיסטיקות', url:'https://digital.porsimkanaf.com/dashboard', angle:175, distance:310, w:185, h:62, color:C.manage },
  { id:'drip', label:'מערכת דיוור', desc:'13 אימיילים אוטומטיים · קופון אישי', angle:220, distance:320, w:180, h:60, color:C.manage },
  { id:'admin', label:'ניהול קורס', desc:'תלמידים · תכנים · הרשאות', url:'https://course.porsimkanaf.com/admin', angle:350, distance:305, w:170, h:60, color:C.course },
  { id:'app', label:'אפליקציית תזרים', desc:'כלי ניהול תזרים לתלמידים', url:'https://app.porsimkanaf.com', angle:10, distance:310, w:180, h:60, color:C.course },
  { id:"cardcom", label:"CardCom", desc:"תשלומים · חשבוניות", url:"https://secure.cardcom.solutions", angle:245, distance:420, w:155, h:56, color:C.infra, size:'sm' },
  { id:'brevo', label:'Brevo', desc:'אימיילים · welcome · דיוור', url:'https://app.brevo.com', angle:215, distance:430, w:150, h:56, color:C.infra, size:'sm' },
  { id:'upstash', label:'Upstash Redis', desc:'DB · הזמנות · אפיליאטים', url:'https://console.upstash.com', angle:168, distance:430, w:165, h:56, color:C.infra, size:'sm' },
  { id:'supabase', label:'Supabase', desc:'DB + Auth · קורס', url:'https://supabase.com/dashboard', angle:320, distance:415, w:155, h:56, color:C.infra, size:'sm' },
  { id:'vimeo', label:'Vimeo', desc:'סרטוני שיעורים', url:'https://vimeo.com/manage/videos', angle:340, distance:410, w:145, h:54, color:C.infra, size:'sm' },
  { id:'vercel', label:'Vercel', desc:'Hosting · Deploy', url:'https://vercel.com/deks-projects-11b160e2', angle:20, distance:420, w:145, h:54, color:C.infra, size:'sm' },
  { id:'meta', label:'Meta Ads Manager', desc:'קמפיינים · FB + IG · תקציב', url:'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765', angle:50, distance:285, w:195, h:64, color:C.traffic },
  { id:'ga', label:'Google Analytics', desc:'תנועה · המרות', url:'https://analytics.google.com', angle:75, distance:420, w:170, h:54, color:C.analytics, size:'sm' },
  { id:'clarity', label:'Microsoft Clarity', desc:'הקלטות · heatmaps', url:'https://clarity.microsoft.com', angle:95, distance:425, w:175, h:54, color:C.analytics, size:'sm' },
  { id:'pixel', label:'Facebook Pixel', desc:'המרות · רימרקטינג', url:'https://business.facebook.com/events_manager2', angle:118, distance:430, w:165, h:54, color:C.analytics, size:'sm' },
  { id:"os", label:"ניהול העסק (OS)", desc:"סדנאות · מדריכים · לידים · פיננסי", url:"https://mad.porsimkanaf.com", angle:190, distance:380, w:175, h:60, color:C.manage },
  { id:"con", label:"ניהול קמפיינים", desc:"Meta דשבורד · AI · ניתוח ביצועים", url:"https://con.porsimkanaf.com", angle:125, distance:435, w:170, h:54, color:C.traffic, size:"sm" },
]

const EDGES: Edge[] = [
  {from:'pk',to:'lp1'},{from:'pk',to:'lp2'},{from:'pk',to:'course'},{from:'pk',to:'porsot'},{from:'pk',to:'wix'},{from:'pk',to:'meta'},
  {from:'lp1',to:'dash'},{from:'lp1',to:'drip'},{from:'lp1',to:'course'},{from:'lp2',to:'course'},
  {from:'course',to:'admin'},{from:'course',to:'app'},
  {from:'lp1',to:'cardcom'},{from:'course',to:'cardcom'},{from:'drip',to:'brevo'},{from:'course',to:'brevo'},
  {from:'lp1',to:'upstash'},{from:'course',to:'supabase'},{from:'course',to:'vimeo'},
  {from:'lp1',to:'vercel'},{from:'course',to:'vercel'},
  {from:'meta',to:'lp1'},{from:'meta',to:'lp2'},
  {from:'lp1',to:'ga'},{from:'lp1',to:'clarity'},{from:'lp1',to:'pixel'},{from:'pixel',to:'meta'},
  {from:"wix",to:"wixplatform"},
  {from:"pk",to:"os"},
]

function getPos(n: Node) { if (!n.distance) return {x:CX-n.w/2,y:CY-n.h/2}; const p=posFromAngle(n.angle,n.distance); return {x:p.x-n.w/2,y:p.y-n.h/2} }
function getCtr(n: Node) { const p=getPos(n); return {x:p.x+n.w/2,y:p.y+n.h/2} }
function getConnected(id: string) { const s=new Set([id]); EDGES.forEach(e=>{if(e.from===id)s.add(e.to);if(e.to===id)s.add(e.from)}); return s }

export default function Hub() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hov, setHov] = useState<string|null>(null)

  useEffect(() => {
    const cv = canvasRef.current; if(!cv) return
    const ctx = cv.getContext('2d'); if(!ctx) return
    const dpr = window.devicePixelRatio||1
    cv.width=1100*dpr; cv.height=720*dpr; ctx.scale(dpr,dpr); ctx.clearRect(0,0,1100,720)

    ;[170,310,420].forEach(r=>{ctx.beginPath();ctx.arc(CX,CY,r,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.025)';ctx.lineWidth=1;ctx.stroke()})

    const conn = hov ? getConnected(hov) : null

    EDGES.forEach(e=>{
      const f=NODES.find(n=>n.id===e.from), t=NODES.find(n=>n.id===e.to)
      if(!f||!t) return
      const a=getCtr(f), b=getCtr(t)
      const active = conn && conn.has(e.from) && conn.has(e.to)
      const dimmed = conn && !active

      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
      ctx.shadowBlur = 0

      if (active) {
        ctx.strokeStyle = t.color + 'BB'
        ctx.lineWidth = 3.5
        ctx.shadowColor = t.color
        ctx.shadowBlur = 12
      } else if (dimmed) {
        ctx.strokeStyle = 'rgba(255,255,255,0.03)'
        ctx.lineWidth = 1
      } else {
        ctx.strokeStyle = t.color + '35'
        ctx.lineWidth = 1.5
      }
      ctx.stroke(); ctx.shadowBlur=0
    })
  }, [hov])

  const conn = hov ? getConnected(hov) : null

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-auto" dir="rtl" style={{fontFamily:"'Heebo',sans-serif"}}>
      <div className="px-5 py-8">

        {/* Top bar — title + legend */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <h1 className="text-white font-black text-2xl">מפת המערכת — פורשים כנף</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-white/50 text-sm font-bold ml-3">מקרא:</span>
            {[
              {c:C.brand,l:'פורשים כנף'},{c:C.sales,l:'דפי מכירה'},{c:C.course,l:'קורס ומוצרים'},
              {c:C.women,l:'פורשות כנף'},{c:C.manage,l:'ניהול'},{c:C.traffic,l:'טראפיק'},
              {c:C.analytics,l:'אנליטיקס'},{c:C.infra,l:'תשתית'},
            ].map(l=>(
              <div key={l.l} className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded" style={{background:l.c}} />
                <span className="text-white/70 text-sm">{l.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex justify-center">
          <div className="relative" style={{width:'1100px',height:'720px'}}>
            <canvas ref={canvasRef} className="absolute inset-0" style={{width:'1100px',height:'720px'}} />

            {NODES.map(node=>{
              const pos=getPos(node)
              const isCenter=node.id==='pk'
              const dimmed=conn && !conn.has(node.id)

              return (
                <a key={node.id} href={node.url} target="_blank" rel="noopener noreferrer"
                  className="absolute transition-all duration-300 hover:scale-110 hover:z-20"
                  style={{
                    left:pos.x, top:pos.y, width:node.w, height:node.h,
                    opacity: dimmed ? 0.15 : 1,
                    filter: dimmed ? 'grayscale(1) blur(1px)' : 'none',
                  }}
                  onMouseEnter={()=>setHov(node.id)}
                  onMouseLeave={()=>setHov(null)}>
                  <div className="w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center px-2 transition-all duration-300"
                    style={{
                      background: isCenter ? `${node.color}45` : `${node.color}35`,
                      borderColor: hov===node.id ? `${node.color}FF` : isCenter ? `${node.color}95` : `${node.color}80`,
                      boxShadow: hov===node.id ? `0 0 40px ${node.color}50` : isCenter ? `0 0 50px ${node.color}20` : 'none',
                    }}>
                    <p className={`font-bold leading-tight ${node.size==='lg'?'text-lg':node.size==='sm'?'text-sm':'text-base'}`}
                      style={{color:node.color}}>{node.label}</p>
                    <p className={`leading-tight mt-1 text-white/70 ${node.size==='sm'?'text-[10px]':'text-xs'}`}>{node.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <p className="text-white/10 text-xs text-center mt-28 pb-20">פורשים כנף © 2026</p>
      </div>
    </div>
  )
}
