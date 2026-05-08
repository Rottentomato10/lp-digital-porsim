'use client'

import { useState } from 'react'

const SECTIONS = [
  {
    title: 'דפי נחיתה',
    color: '#F5A624',
    items: [
      { name: 'דף נחיתה ראשי', desc: 'העמוד הראשי — דף כהה עם וידאו, טופס תשלום ומערכת דיוור', url: 'https://digital.porsimkanaf.com', tag: 'LP1' },
      { name: 'דף נחיתה /join', desc: 'עמוד חלופי לA/B testing — navy+gold, סיפורי + טופס תשלום', url: 'https://digital.porsimkanaf.com/join', tag: 'LP2' },
      { name: 'אתר Wix הראשי', desc: 'אתר החברה הראשי בוויקס', url: 'https://www.porsimkanaf.com', tag: 'Wix' },
      { name: 'פורשות כנף', desc: 'סדנאות פיננסיות לנשים — דף HTML לוויקס', url: 'https://www.porsimkanaf.com/start', tag: 'נשים' },
    ],
  },
  {
    title: 'מוצרים',
    color: '#10B981',
    items: [
      { name: 'פלטפורמת הקורס', desc: 'LMS — סרטונים, שיעורים, תעודות, התחברות תלמידים', url: 'https://course.porsimkanaf.com', tag: 'Course' },
      { name: 'אפליקציית תזרים', desc: 'כלי ניהול תזרים אישי לתלמידים', url: 'https://app.porsimkanaf.com', tag: 'App' },
    ],
  },
  {
    title: 'ניהול',
    color: '#8B5CF6',
    items: [
      { name: 'דשבורד LP', desc: 'הזמנות, לידים, אפיליאטים, סטטיסטיקות, דיוור', url: 'https://digital.porsimkanaf.com/dashboard', tag: 'Dashboard' },
      { name: 'דשבורד קורס (Admin)', desc: 'ניהול תלמידים, תכנים, הרשאות', url: 'https://course.porsimkanaf.com/admin', tag: 'Admin' },
    ],
  },
  {
    title: 'שירותי צד שלישי',
    color: '#00D4FF',
    items: [
      { name: 'Vercel — LP', desc: 'Hosting + Deploy של דפי הנחיתה', url: 'https://vercel.com/deks-projects-11b160e2/lp-digital-porsim', tag: 'Hosting' },
      { name: 'Vercel — Course', desc: 'Hosting + Deploy של פלטפורמת הקורס', url: 'https://vercel.com/deks-projects-11b160e2/course', tag: 'Hosting' },
      { name: 'CardCom', desc: 'שער תשלומים — חשבוניות, כרטיסי אשראי', url: 'https://secure.cardcom.solutions/Interface/BillGold498Login.aspx', tag: 'תשלומים' },
      { name: 'Brevo', desc: 'שליחת אימיילים — welcome, דיוור, סיסמאות', url: 'https://app.brevo.com', tag: 'אימייל' },
      { name: 'Supabase — Course', desc: 'מסד נתונים + Auth של פלטפורמת הקורס', url: 'https://supabase.com/dashboard', tag: 'DB' },
      { name: 'Upstash Redis', desc: 'מסד נתונים של הזמנות, אפיליאטים, דיוור', url: 'https://console.upstash.com', tag: 'DB' },
      { name: 'Vimeo', desc: 'אחסון סרטוני הקורס', url: 'https://vimeo.com/manage/videos', tag: 'וידאו' },
      { name: 'Meta Ads Manager', desc: 'ניהול קמפיינים בפייסבוק ואינסטגרם', url: 'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=2847776732229765', tag: 'פרסום' },
      { name: 'Google Analytics', desc: 'אנליטיקס — תנועה, המרות, התנהגות', url: 'https://analytics.google.com', tag: 'אנליטיקס' },
      { name: 'Microsoft Clarity', desc: 'הקלטות משתמשים + מפות חום', url: 'https://clarity.microsoft.com', tag: 'אנליטיקס' },
      { name: 'Facebook Pixel', desc: 'מעקב המרות לפרסום', url: 'https://business.facebook.com/events_manager2', tag: 'מעקב' },
    ],
  },
  {
    title: 'קוד',
    color: '#F472B6',
    items: [
      { name: 'GitHub — LP', desc: 'קוד מקור דפי נחיתה + דשבורד + דיוור', url: 'https://github.com/Rottentomato10/lp-digital-porsim', tag: 'Repo' },
      { name: 'GitHub — Course', desc: 'קוד מקור פלטפורמת הקורס', url: 'https://github.com/Rottentomato10/porsim-course', tag: 'Repo' },
      { name: 'GitHub — OS', desc: 'מערכת ניהול עסקית (סדנאות, מדריכים)', url: 'https://github.com/Rottentomato10/porshim-kanaf-os', tag: 'Repo' },
      { name: 'GitHub — Meta Ads', desc: 'דשבורד פרסום + AI', url: 'https://github.com/Rottentomato10/meta-ads-dashboard', tag: 'Repo' },
    ],
  },
]

const CONNECTIONS = [
  { from: 'LP1', to: 'Course', label: 'provision API' },
  { from: 'LP2', to: 'Course', label: 'provision API' },
  { from: 'LP1', to: 'Dashboard', label: 'ניהול' },
  { from: 'LP1', to: 'CardCom', label: 'תשלומים' },
  { from: 'Course', to: 'CardCom', label: 'תשלומים' },
  { from: 'LP1', to: 'Brevo', label: 'דיוור' },
  { from: 'Course', to: 'Brevo', label: 'welcome email' },
  { from: 'Course', to: 'Vimeo', label: 'סרטונים' },
  { from: 'Course', to: 'Supabase', label: 'DB + Auth' },
  { from: 'LP1', to: 'Upstash', label: 'DB' },
  { from: 'LP1', to: 'Meta Ads', label: 'Pixel' },
]

export default function Hub() {
  const [search, setSearch] = useState('')

  const filtered = SECTIONS.map(s => ({
    ...s,
    items: s.items.filter(i =>
      !search || i.name.includes(search) || i.desc.includes(search) || i.tag.includes(search)
    ),
  })).filter(s => s.items.length > 0)

  return (
    <div className="min-h-screen bg-[#0A0C12] text-white" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#F5A624]/15 flex items-center justify-center">
            <span className="text-[#F5A624] text-2xl font-black">⚡</span>
          </div>
          <div>
            <h1 className="text-white font-black text-2xl">פורשים כנף — מרכז בקרה</h1>
            <p className="text-white/40 text-sm">כל המערכות, הכלים והשירותים במקום אחד</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="חיפוש..."
            className="w-full max-w-md px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50" />
        </div>

        {/* Connection map */}
        <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/8">
          <p className="text-white/40 text-sm font-bold mb-4">מפת חיבורים</p>
          <div className="flex flex-wrap gap-2">
            {CONNECTIONS.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                <span className="text-[#F5A624] font-bold">{c.from}</span>
                <span className="text-white/20">→</span>
                <span className="text-[#10B981] font-bold">{c.to}</span>
                <span className="text-white/25">({c.label})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Sections */}
        {filtered.map((section, si) => (
          <div key={si} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: section.color }} />
              <h2 className="text-white font-bold text-lg">{section.title}</h2>
              <span className="text-white/20 text-xs">{section.items.length}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group block p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-sm group-hover:text-[#F5A624] transition-colors">{item.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 flex-shrink-0" style={{ borderRight: `2px solid ${section.color}` }}>{item.tag}</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                  <p className="text-white/15 text-[10px] mt-2 truncate group-hover:text-white/30 transition-colors">{item.url}</p>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <p className="text-white/15 text-xs text-center mt-16">פורשים כנף © 2026 — עמוד פנימי</p>
      </div>
    </div>
  )
}
