'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Users, Eye, ShoppingCart, DollarSign, Copy, Check, Trash2, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react'

interface AffiliateWithStats {
  id: string
  name: string
  email: string
  code: string
  coupon: string
  discountPercent: number
  commissionPercent: number
  active: boolean
  createdAt: string
  stats: { visits: number; checkouts: number; purchases: number; revenue: number; commission: number }
}

interface OverallStats {
  affiliateCount: number
  visits: number
  checkouts: number
  purchases: number
  revenue: number
  commission: number
}

const DOMAIN = 'https://digital.porsimkanaf.com'

export default function DashboardShell() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [affiliates, setAffiliates] = useState<AffiliateWithStats[]>([])
  const [overall, setOverall] = useState<OverallStats | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [copied, setCopied] = useState('')

  // New affiliate form
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formCode, setFormCode] = useState('')
  const [formCoupon, setFormCoupon] = useState('')
  const [formDiscount, setFormDiscount] = useState('10')
  const [formCommission, setFormCommission] = useState('15')
  const [formError, setFormError] = useState('')

  const handleLogin = () => {
    if (password === 'Freedom1992@') {
      document.cookie = `dash_auth=${password}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('סיסמה שגויה')
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/affiliate')
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      setAffiliates(data.affiliates || [])
      setOverall(data.overall || null)
    } catch {}
  }, [])

  useEffect(() => {
    // Check if already logged in
    if (document.cookie.includes('dash_auth=Freedom1992@')) {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  const handleCreate = async () => {
    setFormError('')
    if (!formName || !formEmail || !formCode || !formCoupon) {
      setFormError('נא למלא את כל השדות')
      return
    }

    const res = await fetch('/api/affiliate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formName,
        email: formEmail,
        code: formCode.toLowerCase(),
        coupon: formCoupon.toUpperCase(),
        discountPercent: Number(formDiscount),
        commissionPercent: Number(formCommission),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setFormError(data.error || 'שגיאה')
      return
    }

    setShowCreate(false)
    setFormName(''); setFormEmail(''); setFormCode(''); setFormCoupon('')
    setFormDiscount('10'); setFormCommission('15')
    fetchData()
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
  }

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-black text-center mb-8">פורשים כנף — דשבורד</h1>
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <label className="block text-white/50 text-sm mb-2">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="הזן סיסמה"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 mb-4"
            />
            {loginError && <p className="text-red-400 text-sm mb-3">{loginError}</p>}
            <button onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-[#F5A624] text-black font-bold text-base hover:brightness-110 transition-all">
              כניסה
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#0D1117] text-white" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* Top bar */}
      <div className="border-b border-white/5 bg-[#080B16]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">פורשים כנף — אפיליאייטים</h1>
          <button onClick={() => { document.cookie = 'dash_auth=; path=/; max-age=0'; setAuthed(false) }}
            className="text-white/30 text-sm hover:text-white/60 transition-colors">יציאה</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Overall Stats */}
        {overall && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { icon: Users, label: 'אפיליאייטים', value: overall.affiliateCount, color: '#F5A624' },
              { icon: Eye, label: 'כניסות', value: overall.visits, color: '#3B82F6' },
              { icon: ShoppingCart, label: 'צ׳קאווטים', value: overall.checkouts, color: '#8B5CF6' },
              { icon: DollarSign, label: 'רכישות', value: overall.purchases, color: '#10B981' },
              { icon: DollarSign, label: 'הכנסות', value: `₪${overall.revenue.toLocaleString()}`, color: '#10B981' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/6 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon size={16} style={{ color: s.color }} />
                  <span className="text-white/40 text-xs">{s.label}</span>
                </div>
                <p className="text-white font-black text-2xl">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">רשימת אפיליאייטים</h2>
          <button onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 bg-[#F5A624] text-black font-bold text-sm px-4 py-2 rounded-lg hover:brightness-110 transition-all">
            <Plus size={16} />
            אפיליאייט חדש
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="rounded-xl bg-white/[0.03] border border-[#F5A624]/20 p-5 mb-6">
            <h3 className="text-white font-bold mb-4">יצירת אפיליאייט חדש</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/40 text-xs mb-1">שם</label>
                <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="שם מלא"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">אימייל</label>
                <input value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="email@example.com" dir="ltr"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-left placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">קוד הפניה (ללינק)</label>
                <input value={formCode} onChange={e => setFormCode(e.target.value.toLowerCase())} placeholder="moshe" dir="ltr"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-left placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50" />
                <p className="text-white/20 text-[10px] mt-1 dir-ltr">{DOMAIN}/course?via={formCode || '...'}</p>
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">קוד קופון (ללקוחות)</label>
                <input value={formCoupon} onChange={e => setFormCoupon(e.target.value.toUpperCase())} placeholder="MOSHE20" dir="ltr"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm text-left placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">הנחה ללקוח (%)</label>
                <input type="number" value={formDiscount} onChange={e => setFormDiscount(e.target.value)} min="0" max="50"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F5A624]/50" />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">עמלה לאפיליאייט (%)</label>
                <input type="number" value={formCommission} onChange={e => setFormCommission(e.target.value)} min="0" max="50"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F5A624]/50" />
              </div>
            </div>
            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
            <div className="flex gap-3">
              <button onClick={handleCreate}
                className="bg-[#F5A624] text-black font-bold text-sm px-6 py-2 rounded-lg hover:brightness-110 transition-all">
                צור אפיליאייט
              </button>
              <button onClick={() => setShowCreate(false)}
                className="text-white/30 text-sm hover:text-white/60 transition-colors">
                ביטול
              </button>
            </div>
          </div>
        )}

        {/* Affiliates table */}
        {affiliates.length === 0 ? (
          <div className="text-center py-16 text-white/20">
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">אין אפיליאייטים עדיין</p>
            <p className="text-sm mt-1">לחץ "אפיליאייט חדש" כדי להתחיל</p>
          </div>
        ) : (
          <div className="space-y-3">
            {affiliates.map(aff => (
              <div key={aff.id} className="rounded-xl bg-white/[0.03] border border-white/6 p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-base">{aff.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${aff.active ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-white/5 text-white/30'}`}>
                        {aff.active ? 'פעיל' : 'מושבת'}
                      </span>
                    </div>
                    <p className="text-white/30 text-xs mb-3">{aff.email}</p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button onClick={() => copyToClipboard(`${DOMAIN}/course?via=${aff.code}`, `link-${aff.id}`)}
                        className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-1.5 transition-colors">
                        {copied === `link-${aff.id}` ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} className="text-white/30" />}
                        <span className="text-white/50">לינק: </span>
                        <span className="text-white/70 dir-ltr" dir="ltr">?via={aff.code}</span>
                      </button>
                      <button onClick={() => copyToClipboard(aff.coupon, `coupon-${aff.id}`)}
                        className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-1.5 transition-colors">
                        {copied === `coupon-${aff.id}` ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} className="text-white/30" />}
                        <span className="text-white/50">קופון: </span>
                        <span className="text-[#F5A624] font-bold">{aff.coupon}</span>
                      </button>
                      <span className="text-xs text-white/25 px-2 py-1.5">הנחה {aff.discountPercent}% · עמלה {aff.commissionPercent}%</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-center">
                      <p className="text-white/30 text-[10px]">כניסות</p>
                      <p className="text-white font-bold text-lg">{aff.stats?.visits || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/30 text-[10px]">צ׳קאווט</p>
                      <p className="text-white font-bold text-lg">{aff.stats?.checkouts || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/30 text-[10px]">רכישות</p>
                      <p className="text-[#10B981] font-bold text-lg">{aff.stats?.purchases || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/30 text-[10px]">הכנסות</p>
                      <p className="text-[#F5A624] font-bold text-lg">₪{aff.stats?.revenue || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
