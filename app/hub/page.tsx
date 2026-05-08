'use client'
import { useEffect, useRef, useState } from 'react'

interface N { id:string;label:string;desc:string;url?:string;x:number;y:number;w:number;h:number;color:string;sm?:boolean }
interface E { from:string;to:string }

const C={brand:'#F5A624',sales:'#F97316',course:'#10B981',women:'#EC4899',manage:'#8B5CF6',infra:'#06B6D4',traffic:'#3B82F6',analytics:'#6366F1'}

const NN:N[]=[
  {id:'pk',label:'פורשים כנף',desc:'חינוך פיננסי · הארגון המרכזי',url:'https://www.porsimkanaf.com',x:440,y:295,w:210,h:80,color:C.brand},
  {id:'lp1',label:'דף נחיתה ראשי',desc:'דף מכירה כהה · טופס · וידאו',url:'https://digital.porsimkanaf.com',x:210,y:210,w:195,h:60,color:C.sales},
  {id:'lp2',label:'דף /join',desc:'דף מכירה חלופי · A/B test',url:'https://digital.porsimkanaf.com/join',x:430,y:195,w:165,h:55,color:C.sales},
  {id:'course',label:'פלטפורמת הקורס',desc:'58 שיעורים · וידאו · תעודות',url:'https://course.porsimkanaf.com',x:690,y:210,w:200,h:60,color:C.course},
  {id:'admin',label:'ניהול קורס',desc:'תלמידים · תכנים · הרשאות',url:'https://course.porsimkanaf.com/admin',x:910,y:275,w:155,h:52,color:C.course},
  {id:'app',label:'אפליקציית תזרים',desc:'כלי ניהול תזרים לתלמידים',url:'https://app.porsimkanaf.com',x:910,y:360,w:170,h:52,color:C.course},
  {id:'dash',label:'דשבורד ניהול',desc:'הזמנות · לידים · אפיליאטים',url:'https://digital.porsimkanaf.com/dashboard',x:170,y:395,w:180,h:55,color:C.manage},
  {id:'os',label:'ניהול העסק (OS)',desc:'סדנאות · מדריכים · לידים',url:'https://mad.porsimkanaf.com',x:20,y:305,w:175,h:55,color:C.manage},
  {id:'wix',label:'אתר החברה',desc:'Wix · porsimkanaf.com',url:'https://www.wix.com/dashboard',x:390,y:415,w:155,h:52,color:C.brand},
  {id:'porsot',label:'פורשות כנף',desc:'סדנאות לנשים · 12 משתתפות',url:'https://porsot.porsimkanaf.com',x:580,y:420,w:180,h:58,color:C.women},
  {id:'brevo',label:'Brevo',desc:'אימיילים · welcome · דיוור',url:'https://app.brevo.com',x:20,y:170,w:145,h:48,color:C.infra,sm:true},
  {id:'upstash',label:'Upstash Redis',desc:'DB · הזמנות · אפיליאטים',url:'https://console.upstash.com',x:15,y:430,w:145,h:48,color:C.infra,sm:true},
  {id:'cardcom',label:'CardCom',desc:'תשלומים · חשבוניות',url:'https://secure.cardcom.solutions',x:20,y:510,w:140,h:46,color:C.infra,sm:true},
  {id:'supabase',label:'Supabase',desc:'DB + Auth · קורס',url:'https://supabase.com/dashboard',x:910,y:170,w:140,h:46,color:C.infra,sm:true},
  {id:'vimeo',label:'Vimeo',desc:'סרטוני שיעורים',url:'https://vimeo.com/manage/videos',x:910,y:115,w:125,h:42,color:C.infra,sm:true},
  {id:'vercel',label:'Vercel',desc:'Hosting · Deploy',url:'https://vercel.com/deks-projects-11b160e2',x:910,y:445,w:125,h:42,color:C.infra,sm:true},
  {id:'wixp',label:'Wix',desc:'אחסון אתר',url:'https://www.wix.com/dashboard',x:395,y:495,w:105,h:40,color:C.infra,sm:true},
  {id:'pixel',label:'Facebook Pixel',desc:'המרות · רימרקטינג',url:'https://business.facebook.com/events_manager2',x:280,y:565,w:155,h:48,color:C.analytics,sm:true},
  {id:'ga',label:'Google Analytics',desc:'תנועה · המרות',url:'https://analytics.google.com',x:460,y:565,w:150,h:48,color:C.analytics,sm:true},
  {id:'clarity',label:'Microsoft Clarity',desc:'הקלטות · heatmaps',url:'https://clarity.microsoft.com',x:635,y:565,w:155,h:48,color:C.analytics,sm:true},
  {id:'meta',label:'Meta Ads Manager',desc:'קמפיינים · FB + IG · תקציב',url:'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765',x:320,y:645,w:190,h:55,color:C.traffic},
  {id:'con',label:'ניהול קמפיינים',desc:'Meta דשבורד · AI · ניתוח',url:'https://con.porsimkanaf.com',x:540,y:645,w:170,h:52,color:C.traffic},
]

const EE:E[]=[
  {from:'pk',to:'lp1'},{from:'pk',to:'lp2'},{from:'pk',to:'course'},{from:'pk',to:'porsot'},{from:'pk',to:'wix'},{from:'pk',to:'os'},
  {from:'lp1',to:'course'},{from:'lp2',to:'course'},{from:'lp1',to:'dash'},
  {from:'course',to:'admin'},{from:'course',to:'app'},
  {from:'lp1',to:'cardcom'},{from:'course',to:'cardcom'},
  {from:'lp1',to:'brevo'},{from:'course',to:'brevo'},
  {from:'lp1',to:'upstash'},{from:'course',to:'supabase'},{from:'course',to:'vimeo'},
  {from:'lp1',to:'vercel'},{from:'course',to:'vercel'},
  {from:'wix',to:'wixp'},
  {from:'lp1',to:'pixel'},{from:'lp1',to:'ga'},{from:'lp1',to:'clarity'},{from:'wix',to:'pixel'},
  {from:'pixel',to:'meta'},{from:'meta',to:'con'},{from:'meta',to:'lp1'},{from:'meta',to:'lp2'},
]

function ctr(n:N){return{x:n.x+n.w/2,y:n.y+n.h/2}}

// Calculate point on rectangle edge where line from center toward target exits
function edgePoint(node:N, targetX:number, targetY:number):{x:number,y:number}{
  const cx=node.x+node.w/2, cy=node.y+node.h/2
  const dx=targetX-cx, dy=targetY-cy
  if(dx===0&&dy===0) return {x:cx,y:cy}
  const hw=node.w/2, hh=node.h/2
  const sx=dx!==0?hw/Math.abs(dx):Infinity
  const sy=dy!==0?hh/Math.abs(dy):Infinity
  const s=Math.min(sx,sy)
  return {x:cx+dx*s, y:cy+dy*s}
}
function getConn(id:string){const s=new Set([id]);EE.forEach(e=>{if(e.from===id)s.add(e.to);if(e.to===id)s.add(e.from)});return s}

export default function Hub(){
  const cvRef=useRef<HTMLCanvasElement>(null)
  const [h,sH]=useState<string|null>(null)

  useEffect(()=>{
    const cv=cvRef.current;if(!cv)return;const ctx=cv.getContext('2d');if(!ctx)return
    const d=window.devicePixelRatio||1;cv.width=1100*d;cv.height=740*d;ctx.scale(d,d);ctx.clearRect(0,0,1100,740)
    const c=h?getConn(h):null
    EE.forEach(e=>{
      const f=NN.find(n=>n.id===e.from),t=NN.find(n=>n.id===e.to);if(!f||!t)return
      const fc=ctr(f),tc=ctr(t)
      const a=edgePoint(f,tc.x,tc.y),b=edgePoint(t,fc.x,fc.y)
      const act=c&&c.has(e.from)&&c.has(e.to),dim=c&&!act
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.shadowBlur=0
      if(act){ctx.strokeStyle=t.color+'BB';ctx.lineWidth=3;ctx.shadowColor=t.color;ctx.shadowBlur=10}
      else if(dim){ctx.strokeStyle='rgba(255,255,255,0.02)';ctx.lineWidth=1}
      else{ctx.strokeStyle=t.color+'25';ctx.lineWidth=1.5}
      ctx.stroke();ctx.shadowBlur=0
    })
  },[h])

  const c=h?getConn(h):null

  return(
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-auto" dir="rtl" style={{fontFamily:"'Heebo',sans-serif"}}>
      <div className="px-5 py-6">
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <h1 className="text-white font-black text-xl">מפת המערכת — פורשים כנף</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap p-3 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-white/50 text-sm font-bold ml-2">מקרא:</span>
            {[{c:C.brand,l:'פורשים כנף'},{c:C.sales,l:'דפי מכירה'},{c:C.course,l:'קורס ומוצרים'},{c:C.women,l:'פורשות כנף'},{c:C.manage,l:'ניהול'},{c:C.traffic,l:'טראפיק'},{c:C.analytics,l:'אנליטיקס'},{c:C.infra,l:'תשתית'}].map(l=>(
              <div key={l.l} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{background:l.c}}/>
                <span className="text-white/60 text-sm">{l.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative" style={{width:'1100px',height:'740px'}}>
            <canvas ref={cvRef} className="absolute inset-0" style={{width:'1100px',height:'740px'}}/>
            {NN.map(n=>{
              const dim=c&&!c.has(n.id),isCtr=n.id==='pk'
              return(
                <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer"
                  className="absolute transition-all duration-300 hover:scale-105 hover:z-20"
                  style={{left:n.x,top:n.y,width:n.w,height:n.h,opacity:dim?0.12:1,filter:dim?'grayscale(1) blur(1px)':'none'}}
                  onMouseEnter={()=>sH(n.id)} onMouseLeave={()=>sH(null)}>
                  <div className="w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center px-2 transition-all duration-300"
                    style={{background:isCtr?`${n.color}40`:`${n.color}30`,borderColor:h===n.id?`${n.color}FF`:`${n.color}70`,boxShadow:h===n.id?`0 0 35px ${n.color}45`:isCtr?`0 0 50px ${n.color}20`:'none'}}>
                    <p className={`font-bold leading-tight ${n.sm?'text-sm':'text-base'}`} style={{color:n.color}}>{n.label}</p>
                    <p className={`leading-tight mt-1 text-white/60 ${n.sm?'text-[10px]':'text-xs'}`}>{n.desc}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
        <p className="text-white/10 text-xs text-center mt-40 pb-16">פורשים כנף © 2026</p>
      </div>
    </div>
  )
}
