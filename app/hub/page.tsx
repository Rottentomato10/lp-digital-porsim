'use client'
import { useEffect, useRef, useState } from 'react'

interface N { id:string;label:string;desc:string;url?:string;x:number;y:number;w:number;h:number;color:string;sm?:boolean }
interface E { from:string;to:string }

const C={brand:'#F5A624',sales:'#F97316',course:'#10B981',women:'#EC4899',manage:'#8B5CF6',infra:'#06B6D4',traffic:'#3B82F6',analytics:'#6366F1'}

// Layout 1: Radial (original)
const L1:Record<string,{x:number,y:number}>={
  pk:{x:440,y:295},lp1:{x:210,y:210},lp2:{x:430,y:195},course:{x:690,y:210},admin:{x:910,y:275},app:{x:910,y:360},
  dash:{x:170,y:395},os:{x:20,y:305},wix:{x:390,y:415},porsot:{x:580,y:420},
  brevo:{x:20,y:170},upstash:{x:15,y:430},cardcom:{x:20,y:510},supabase:{x:910,y:170},vimeo:{x:910,y:115},vercel:{x:910,y:445},wixp:{x:395,y:495},
  pixel:{x:280,y:565},ga:{x:460,y:565},clarity:{x:635,y:565},meta:{x:320,y:645},con:{x:540,y:645},
}

// Layout 2: Building (infra bottom → traffic → management → products → brand top)
const L2:Record<string,{x:number,y:number}>={
  // Floor 1 (top) — Brand + What we do
  pk:{x:420,y:30},os:{x:150,y:40},porsot:{x:720,y:40},wix:{x:900,y:40},
  // Floor 2 — Products (what users interact with)
  lp1:{x:150,y:150},lp2:{x:380,y:150},course:{x:620,y:150},app:{x:860,y:150},
  // Floor 3 — Management (dashboards)
  dash:{x:150,y:260},admin:{x:420,y:260},
  // Floor 4 — Traffic & Analytics
  meta:{x:120,y:370},con:{x:360,y:370},pixel:{x:580,y:370},ga:{x:770,y:370},clarity:{x:920,y:370},
  // Floor 5 (bottom) — Infrastructure
  cardcom:{x:60,y:490},brevo:{x:240,y:490},upstash:{x:420,y:490},supabase:{x:600,y:490},vimeo:{x:760,y:490},vercel:{x:380,y:580},wixp:{x:580,y:580},
}

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

const DETAILS:Record<string,string[]>={
  pk:['ארגון חינוך פיננסי','5+ שנים בשטח','15,000+ תלמידים','300+ כיתות','חלק מתוכניות גפ״ן — משרד החינוך','קורס דיגיטלי + סדנאות פרונטליות'],
  lp1:['דף מכירה כהה (Dark theme)','טופס תשלום inline — בלי עמוד checkout נפרד','סרטון שיווקי portrait','קרוסל ביקורות וואטסאפ','תוכנית לימודים מפורטת','שאלות ותשובות','מעקב: GA4, Pixel, Clarity','אפיליאטים + קופונים'],
  lp2:['דף מכירה Navy + Gold','A/B testing מול הדף הראשי','אותו backend בדיוק — תשלום, קופונים, דיוור','עיצוב שונה, אותו פאנל'],
  course:['58 שיעורי וידאו (Vimeo)','מערכת התחברות + סיסמאות','תעודת סיום','מחברת הערות אישית','מעקב התקדמות','קהילת וואטסאפ','NPS tracking','ניהול admin'],
  admin:['ניהול תלמידים ומשתמשים','ניהול תכנים ושיעורים','הרשאות וגישה','מעקב provision','סטטיסטיקות כניסות'],
  app:['ניהול תזרים אישי','הכנסות והוצאות','תקציב חודשי','גישה חינמית לתלמידי הקורס'],
  dash:['טאב הזמנות — כל מי ששילם + סטטוס אימייל','טאב לידים — מי שהשאיר פרטים ולא שילם','טאב אפיליאטים — שותפים, קופונים, עמלות, סטטיסטיקות','טאב סטטיסטיקות — ביצועי אפיליאטים','טאב דיוור — 13 אימיילים, מנויים, opt-in, שליחה ידנית','ייצוא CSV','שלח שוב אימייל welcome'],
  os:['ניהול סדנאות פרונטליות','מעקב מדריכים','ניהול לידים ועסקאות','מעקב פיננסי ורווחיות','ניהול תשלומים','ניהול בתי ספר ומוסדות','משימות ולוח שנה'],
  wix:['אתר החברה הראשי','מידע על פורשים כנף','טפסי יצירת קשר','דפי נחיתה לפורשות כנף'],
  porsot:['סדנאות פיננסיות לנשים','קבוצה אחת בחודש','12 משתתפות בקבוצה','2 מסלולים: פורשות (מתחילות) + כנף (מתקדמות)','3 מפגשים פרונטליים, שעתיים כל אחד','רישום דרך וואטסאפ'],
  brevo:['שליחת אימייל welcome עם סיסמה','דיוור אוטומטי (13 אימיילים)','שליחת טסט מהדשבורד','SPF + DKIM מוגדרים','280 אימיילים/יום (free)'],
  upstash:['Redis בענן','אחסון הזמנות','אחסון אפיליאטים ואירועים','אחסון מנויי דיוור','אחסון קמפיין דיוור'],
  cardcom:['שער תשלומים ישראלי','חשבוניות אוטומטיות','webhook לאישור תשלום','תמיכה בקופונים','iframe תשלום מאובטח'],
  supabase:['PostgreSQL בענן','מערכת Auth לתלמידים','טבלאות: profiles, enrollments, progress','RPC functions','Row Level Security'],
  vimeo:['אחסון כל סרטוני הקורס','Streaming איכותי','Player מותאם','API לניהול סרטונים'],
  vercel:['Hosting של LP + Course','Auto-deploy מ-GitHub','SSL אוטומטי','Cron jobs (דיוור יומי)','Edge network — מהיר'],
  wixp:['אחסון אתר החברה','דומיין porsimkanaf.com','עורך ויזואלי','טפסים ודפי נחיתה'],
  pixel:['מעקב המרות מפרסום','בניית קהלים דומים (Lookalike)','רימרקטינג למבקרים','מותקן ב-LP + אתר החברה'],
  ga:['מעקב תנועה לדפי נחיתה','ניתוח המרות','התנהגות משתמשים','דוחות מפורטים','GA4 — G-3JL82KJZXN'],
  clarity:['הקלטות סשנים של משתמשים','מפות חום (Heatmaps)','ניתוח UX','חינמי ללא הגבלה'],
  meta:['ניהול קמפיינים Facebook + Instagram','הגדרת קהלי יעד','ניהול תקציב','מעקב ביצועים','חשבון: act_2847776732229765'],
  con:['דשבורד ניתוח קמפיינים','AI לניתוח ביצועים (Claude)','סנכרון נתונים מ-Meta','המלצות אופטימיזציה'],
}

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
  const [selected,setSelected]=useState<string|null>(null)
  const [layout,setLayout]=useState<'radial'|'building'>('radial')
  const layouts={radial:L1,building:L2}
  const pos=layouts[layout]

  // Apply layout positions
  const nodes=NN.map(n=>({...n,x:pos[n.id]?.x??n.x,y:pos[n.id]?.y??n.y}))

  useEffect(()=>{
    const cv=cvRef.current;if(!cv)return;const ctx=cv.getContext('2d');if(!ctx)return
    const d=window.devicePixelRatio||1;cv.width=1100*d;cv.height=740*d;ctx.scale(d,d);ctx.clearRect(0,0,1100,740)
    const c=h?getConn(h):null
    EE.forEach(e=>{
      const f=nodes.find(n=>n.id===e.from),t=nodes.find(n=>n.id===e.to);if(!f||!t)return
      const fc=ctr(f),tc=ctr(t)
      const a=edgePoint(f,tc.x,tc.y),b=edgePoint(t,fc.x,fc.y)
      const act=c&&c.has(e.from)&&c.has(e.to),dim=c&&!act
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.shadowBlur=0
      if(act){ctx.strokeStyle=t.color+'BB';ctx.lineWidth=3;ctx.shadowColor=t.color;ctx.shadowBlur=10}
      else if(dim){ctx.strokeStyle='rgba(255,255,255,0.02)';ctx.lineWidth=1}
      else{ctx.strokeStyle=t.color+'25';ctx.lineWidth=1.5}
      ctx.stroke();ctx.shadowBlur=0
    })
  },[h,layout]) // eslint-disable-line react-hooks/exhaustive-deps

  const c=h?getConn(h):null

  return(
    <div className="min-h-screen bg-[#0A0C12] text-white overflow-auto" dir="rtl" style={{fontFamily:"'Heebo',sans-serif"}}>
      <div className="px-5 py-6">
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <h1 className="text-white font-black text-xl">מפת המערכת — פורשים כנף</h1>
            </div>
            <button onClick={()=>setLayout(l=>l==='radial'?'building':'radial')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/60 text-sm font-bold hover:bg-white/10 hover:text-white transition-all">
              {layout==='radial'?'🏢 תצוגת בניין':'🌐 תצוגה רדיאלית'}
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4 flex-wrap p-3 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-white/50 text-sm font-bold ml-2">מקרא:</span>
            {[{c:C.brand,l:'פורשים כנף'},{c:C.sales,l:'דפי מכירה'},{c:C.course,l:'קורס ומוצרים'},{c:C.women,l:'פורשות כנף'},{c:C.manage,l:'ניהול'},{c:C.traffic,l:'טראפיק'},{c:C.analytics,l:'אנליטיקס'},{c:C.infra,l:'תשתית'}].map(l=>(
              <div key={l.l} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{background:l.c}}/>
                <span className="text-white/60 text-sm">{l.l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* ===== MOBILE: Card list ===== */}
        <div className="md:hidden space-y-3 mb-10">
          {[
            {title:'פורשים כנף',ids:['pk','wix']},
            {title:'דפי מכירה',ids:['lp1','lp2']},
            {title:'קורס ומוצרים',ids:['course','admin','app']},
            {title:'פורשות כנף',ids:['porsot']},
            {title:'ניהול',ids:['dash','os']},
            {title:'טראפיק',ids:['meta','con']},
            {title:'אנליטיקס',ids:['pixel','ga','clarity']},
            {title:'תשתית',ids:['cardcom','brevo','upstash','supabase','vimeo','vercel','wixp']},
          ].map(group=>(
            <div key={group.title}>
              <p className="text-white/40 text-xs font-bold mb-2">{group.title}</p>
              <div className="grid grid-cols-2 gap-2">
                {group.ids.map(id=>{
                  const n=NN.find(x=>x.id===id);if(!n)return null
                  return(
                    <div key={id} onClick={()=>setSelected(id)}
                      className="p-3 rounded-xl border cursor-pointer active:scale-95 transition-all"
                      style={{background:`${n.color}20`,borderColor:`${n.color}50`}}>
                      <p className="font-bold text-sm" style={{color:n.color}}>{n.label}</p>
                      <p className="text-white/50 text-[10px] mt-0.5">{n.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ===== DESKTOP: Map ===== */}
        <div className="hidden md:flex justify-center">
          <div className="relative" style={{width:'1100px',height:'740px'}}>
            <canvas ref={cvRef} className="absolute inset-0" style={{width:'1100px',height:'740px'}}/>
            {nodes.map(n=>{
              const dim=c&&!c.has(n.id),isCtr=n.id==='pk'
              return(
                <div key={n.id} onClick={(e)=>{e.preventDefault();setSelected(n.id)}}
                  className="absolute transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer"
                  style={{left:n.x,top:n.y,width:n.w,height:n.h,opacity:dim?0.12:1,filter:dim?'grayscale(1) blur(1px)':'none'}}
                  onMouseEnter={()=>sH(n.id)} onMouseLeave={()=>sH(null)}>
                  <div className="w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center px-2 transition-all duration-300"
                    style={{background:isCtr?`${n.color}40`:`${n.color}30`,borderColor:h===n.id?`${n.color}FF`:`${n.color}70`,boxShadow:h===n.id?`0 0 35px ${n.color}45`:isCtr?`0 0 50px ${n.color}20`:'none'}}>
                    <p className={`font-bold leading-tight ${n.sm?'text-sm':'text-base'}`} style={{color:n.color}}>{n.label}</p>
                    <p className={`leading-tight mt-1 text-white/60 ${n.sm?'text-[10px]':'text-xs'}`}>{n.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* Detail Modal */}
        {selected && (()=>{
          const node = nodes.find(n=>n.id===selected)
          if(!node) return null
          const features = DETAILS[selected] || []
          const connected = Array.from(getConn(selected)).filter(id=>id!==selected).map(id=>nodes.find(n=>n.id===id)).filter(Boolean)
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-5" style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)'}} onClick={()=>setSelected(null)}>
              <div className="w-full max-w-md rounded-2xl border-2 overflow-hidden" style={{background:'#111318',borderColor:`${node.color}50`}} onClick={e=>e.stopPropagation()}>
                {/* Header */}
                <div className="p-5 border-b" style={{borderColor:`${node.color}20`,background:`${node.color}10`}}>
                  <div className="flex items-center justify-between">
                    <h2 className="font-black text-lg" style={{color:node.color}}>{node.label}</h2>
                    <button onClick={()=>setSelected(null)} className="text-white/30 hover:text-white text-xl leading-none">✕</button>
                  </div>
                  <p className="text-white/50 text-sm mt-1">{node.desc}</p>
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <div className="p-5 border-b border-white/5">
                    <p className="text-white/40 text-xs font-bold mb-3">מה יש כאן:</p>
                    <div className="space-y-2">
                      {features.map((f,i)=>(
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:node.color}}/>
                          <span className="text-white/70 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connected */}
                {connected.length > 0 && (
                  <div className="p-5 border-b border-white/5">
                    <p className="text-white/40 text-xs font-bold mb-3">מחובר ל:</p>
                    <div className="flex flex-wrap gap-2">
                      {connected.map((cn:any)=>(
                        <button key={cn.id} onClick={()=>setSelected(cn.id)}
                          className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                          style={{borderColor:`${cn.color}40`,color:cn.color,background:`${cn.color}10`}}>
                          {cn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action */}
                {node.url && (
                  <div className="p-5">
                    <a href={node.url} target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                      style={{background:`${node.color}25`,color:node.color,border:`1px solid ${node.color}40`}}>
                      עבור ל-{node.label} →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        <p className="text-white/10 text-xs text-center mt-40 pb-16">פורשים כנף © 2026</p>
      </div>
    </div>
  )
}
