'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Users, Eye, ShoppingCart, DollarSign, Copy, Check, Trash2, Pencil, X } from 'lucide-react'

const BASE_PRICE = 390
const DOMAIN = 'https://digital.porsimkanaf.com'

interface Stats { visits: number; checkouts: number; purchases: number; revenue: number; commission: number }
interface Aff {
  id: string; affNumber: number; name: string; email: string; phone: string; code: string; coupon: string
  discountPercent: number; commissionPercent: number
  bankName: string; bankBranch: string; bankAccount: string; notes: string
  active: boolean; createdAt: string; stats: Stats
}

function pctToAmount(pct: number) { return Math.round(BASE_PRICE * pct / 100) }
function amountToPct(amt: number) { return Math.round(amt / BASE_PRICE * 100 * 10) / 10 }

function DualField({ label, pct, onPctChange, color = '#F5A624' }: { label: string; pct: string; onPctChange: (v: string) => void; color?: string }) {
  const amount = pctToAmount(Number(pct) || 0)
  const inp = `w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-base font-bold text-center focus:outline-none focus:ring-1 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
  return (
    <div>
      {label && <label className="block text-white/40 text-xs mb-2">{label}</label>}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-white/40 text-[11px] font-semibold mb-1.5">אחוזים</label>
          <div className="flex items-center gap-2">
            <input type="number" value={pct} onChange={e => onPctChange(e.target.value)} min="0" max="50" step="1"
              className={inp} style={{ borderColor: `${color}30` }} />
            <span className="text-lg font-black flex-shrink-0" style={{ color }}>%</span>
          </div>
        </div>
        <div>
          <label className="block text-white/40 text-[11px] font-semibold mb-1.5">סכום (מתוך ₪{BASE_PRICE})</label>
          <div className="flex items-center gap-2">
            <input type="number" value={amount}
              onChange={e => onPctChange(String(amountToPct(Number(e.target.value) || 0)))}
              min="0" max={BASE_PRICE}
              className={inp} style={{ borderColor: `${color}30` }} />
            <span className="text-lg font-black flex-shrink-0" style={{ color }}>₪</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AffForm({ initial, onSubmit, onCancel, submitLabel }: {
  initial?: Partial<Aff>; onSubmit: (data: any) => void; onCancel: () => void; submitLabel: string
}) {
  const [name, setName] = useState(initial?.name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [phone, setPhone] = useState(initial?.phone || '')
  const [code, setCode] = useState(initial?.code || '')
  const [coupon, setCoupon] = useState(initial?.coupon || '')
  const [discount, setDiscount] = useState(String(initial?.discountPercent || 10))
  const [commission, setCommission] = useState(String(initial?.commissionPercent || 15))
  const [bankName, setBankName] = useState(initial?.bankName || '')
  const [bankBranch, setBankBranch] = useState(initial?.bankBranch || '')
  const [bankAccount, setBankAccount] = useState(initial?.bankAccount || '')
  const [notes, setNotes] = useState(initial?.notes || '')
  const [status, setStatus] = useState<string>(initial?.active === false ? 'inactive' : 'active')
  const [error, setError] = useState('')

  const handle = () => {
    if (!name || !email || !code || !coupon) { setError('נא למלא שם, אימייל, קוד הפניה וקוד קופון'); return }
    setError('')
    onSubmit({
      id: initial?.id, name, email, phone, code: code.toLowerCase(), coupon: coupon.toUpperCase(),
      discountPercent: Number(discount) || 0, commissionPercent: Number(commission) || 0,
      bankName, bankBranch, bankAccount, notes, active: status === 'active',
    })
  }

  const inp = "w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50"

  return (
    <div className="rounded-xl bg-white/[0.03] border border-[#F5A624]/20 p-5 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold text-lg">{initial?.id ? 'עריכת אפיליאייט' : 'יצירת אפיליאייט חדש'}</h3>
        <span className={`text-sm font-mono font-bold px-4 py-1.5 rounded-lg border ${
          initial?.affNumber
            ? 'text-[#F5A624] bg-[#F5A624]/10 border-[#F5A624]/25'
            : 'text-white/30 bg-white/5 border-white/10'
        }`}>
          {initial?.affNumber ? `מס׳ ${initial.affNumber}#` : 'מספר ייווצר אוטומטית'}
        </span>
      </div>

      {/* Basic info + Status */}
      <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">פרטים בסיסיים</p>
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1">שם *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="שם מלא" className={inp} />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">אימייל *</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" dir="ltr" className={inp + ' text-left'} />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">טלפון</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="050-0000000" dir="ltr" className={inp + ' text-left'} />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">סטטוס</label>
          <button type="button" onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}
            className={`w-full px-3 py-2 rounded-lg border text-sm font-bold transition-all ${
              status === 'active'
                ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]'
                : 'bg-red-500/10 border-red-500/25 text-red-400'
            }`}>
            {status === 'active' ? '✓ פעיל' : '✗ מושבת'}
          </button>
        </div>
      </div>

      {/* Codes */}
      <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">קודים</p>
      <div className="grid md:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1">קוד הפניה (ללינק) *</label>
          <input value={code} onChange={e => setCode(e.target.value.toLowerCase())} placeholder="moshe" dir="ltr" className={inp + ' text-left'} />
          <p className="text-white/20 text-[10px] mt-1" dir="ltr">{DOMAIN}/course?via={code || '...'}</p>
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">קוד קופון (ללקוחות) *</label>
          <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="MOSHE20" dir="ltr" className={inp + ' text-left'} />
        </div>
      </div>

      {/* Discount + Commission — separate framed sections */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl border-2 border-[#10B981]/25 bg-[#10B981]/[0.04] p-4">
          <p className="text-[#10B981] text-sm font-bold mb-3">💰 הנחה ללקוח</p>
          <DualField label="" pct={discount} onPctChange={setDiscount} color="#10B981" />
        </div>
        <div className="rounded-xl border-2 border-[#F5A624]/25 bg-[#F5A624]/[0.04] p-4">
          <p className="text-[#F5A624] text-sm font-bold mb-3">🤝 עמלה לאפיליאייט</p>
          <DualField label="" pct={commission} onPctChange={setCommission} color="#F5A624" />
        </div>
      </div>

      {/* Bank details */}
      <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">פרטי תשלום (בנק)</p>
      <div className="grid md:grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1">שם בנק</label>
          <input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="לאומי / הפועלים..." className={inp} />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">סניף</label>
          <input value={bankBranch} onChange={e => setBankBranch(e.target.value)} placeholder="מספר סניף" dir="ltr" className={inp + ' text-left'} />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1">מספר חשבון</label>
          <input value={bankAccount} onChange={e => setBankAccount(e.target.value)} placeholder="מספר חשבון" dir="ltr" className={inp + ' text-left'} />
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1">הערות</label>
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="הערות חופשיות..." className={inp} />
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <div className="flex gap-3">
        <button onClick={handle} className="bg-[#F5A624] text-black font-bold text-sm px-6 py-2 rounded-lg hover:brightness-110 transition-all">
          {submitLabel}
        </button>
        <button onClick={onCancel} className="text-white/30 text-sm hover:text-white/60 transition-colors">ביטול</button>
      </div>
    </div>
  )
}

export default function DashboardShell() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [affiliates, setAffiliates] = useState<Aff[]>([])
  const [overall, setOverall] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copied, setCopied] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const handleLogin = () => {
    if (password === 'Freedom1992@') {
      document.cookie = `dash_auth=${password}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
      setAuthed(true); setLoginError('')
    } else { setLoginError('סיסמה שגויה') }
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

  useEffect(() => { if (document.cookie.includes('dash_auth=Freedom1992@')) setAuthed(true) }, [])
  useEffect(() => { if (authed) fetchData() }, [authed, fetchData])

  const handleCreate = async (data: any) => {
    const res = await fetch('/api/affiliate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setShowCreate(false); fetchData() }
  }

  const handleEdit = async (data: any) => {
    const res = await fetch('/api/affiliate', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setEditingId(null); fetchData() }
  }

  const handleDelete = async (id: string) => {
    await fetch('/api/affiliate', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setConfirmDelete(null); fetchData()
  }

  const handleToggle = async (aff: Aff) => {
    await fetch('/api/affiliate', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: aff.id, active: !aff.active }) })
    fetchData()
  }

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(''), 2000) }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-sm">
          <h1 className="text-white text-2xl font-black text-center mb-8">פורשים כנף — דשבורד</h1>
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <label className="block text-white/50 text-sm mb-2">סיסמה</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="הזן סיסמה"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 mb-4" />
            {loginError && <p className="text-red-400 text-sm mb-3">{loginError}</p>}
            <button onClick={handleLogin} className="w-full py-3 rounded-xl bg-[#F5A624] text-black font-bold text-base hover:brightness-110 transition-all">כניסה</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="border-b border-white/5 bg-[#080B16]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">פורשים כנף — אפיליאייטים</h1>
          <button onClick={() => { document.cookie = 'dash_auth=; path=/; max-age=0'; setAuthed(false) }} className="text-white/30 text-sm hover:text-white/60">יציאה</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        {overall && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            {[
              { icon: Users, label: 'אפיליאייטים', value: overall.affiliateCount, color: '#F5A624' },
              { icon: Eye, label: 'כניסות', value: overall.visits, color: '#3B82F6' },
              { icon: ShoppingCart, label: 'צ׳קאווטים', value: overall.checkouts, color: '#8B5CF6' },
              { icon: DollarSign, label: 'רכישות', value: overall.purchases, color: '#10B981' },
              { icon: DollarSign, label: 'הכנסות', value: `₪${overall.revenue.toLocaleString()}`, color: '#10B981' },
              { icon: DollarSign, label: 'עמלות', value: `₪${overall.commission.toLocaleString()}`, color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/6 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon size={13} style={{ color: s.color }} />
                  <span className="text-white/35 text-[10px]">{s.label}</span>
                </div>
                <p className="text-white font-black text-xl">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">רשימת אפיליאייטים</h2>
          <button onClick={() => { setShowCreate(true); setEditingId(null) }}
            className="flex items-center gap-2 bg-[#F5A624] text-black font-bold text-sm px-4 py-2 rounded-lg hover:brightness-110">
            <Plus size={16} /> אפיליאייט חדש
          </button>
        </div>

        {/* Create form */}
        {showCreate && <AffForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} submitLabel="צור אפיליאייט" />}

        {/* List */}
        {affiliates.length === 0 && !showCreate ? (
          <div className="text-center py-16 text-white/20">
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">אין אפיליאייטים עדיין</p>
            <p className="text-sm mt-1">לחץ ״אפיליאייט חדש״ כדי להתחיל</p>
          </div>
        ) : (
          <div className="space-y-3">
            {affiliates.map(aff => (
              <div key={aff.id}>
                {editingId === aff.id ? (
                  <AffForm initial={aff} onSubmit={handleEdit} onCancel={() => setEditingId(null)} submitLabel="שמור שינויים" />
                ) : (
                  <div className="rounded-xl bg-white/[0.03] border border-white/6 p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white/20 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">#{aff.affNumber || '—'}</span>
                          <h3 className="text-white font-bold text-base">{aff.name}</h3>
                          <button onClick={() => handleToggle(aff)}
                            className={`text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors ${aff.active ? 'bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}>
                            {aff.active ? 'פעיל' : 'מושבת'}
                          </button>
                        </div>
                        <p className="text-white/30 text-xs mb-2">{aff.email}{aff.phone ? ` · ${aff.phone}` : ''}</p>

                        {/* Links + coupon */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          <button onClick={() => copy(`${DOMAIN}/course?via=${aff.code}`, `link-${aff.id}`)}
                            className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-1.5">
                            {copied === `link-${aff.id}` ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} className="text-white/30" />}
                            <span className="text-white/50">לינק:</span>
                            <span className="text-white/70" dir="ltr">?via={aff.code}</span>
                          </button>
                          <button onClick={() => copy(aff.coupon, `coupon-${aff.id}`)}
                            className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/8 rounded-lg px-3 py-1.5">
                            {copied === `coupon-${aff.id}` ? <Check size={12} className="text-[#10B981]" /> : <Copy size={12} className="text-white/30" />}
                            <span className="text-white/50">קופון:</span>
                            <span className="text-[#F5A624] font-bold">{aff.coupon}</span>
                          </button>
                          <span className="text-xs text-white/20 px-2 py-1.5">
                            הנחה {aff.discountPercent}% (₪{pctToAmount(aff.discountPercent)}) · עמלה {aff.commissionPercent}% (₪{pctToAmount(aff.commissionPercent)})
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setEditingId(aff.id); setShowCreate(false) }}
                            className="flex items-center gap-1 text-xs text-white/30 hover:text-[#F5A624] transition-colors">
                            <Pencil size={12} /> עריכה
                          </button>
                          {confirmDelete === aff.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-red-400 text-xs">למחוק?</span>
                              <button onClick={() => handleDelete(aff.id)} className="text-xs text-red-400 font-bold hover:text-red-300">כן</button>
                              <button onClick={() => setConfirmDelete(null)} className="text-xs text-white/30 hover:text-white/50">לא</button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDelete(aff.id)}
                              className="flex items-center gap-1 text-xs text-white/30 hover:text-red-400 transition-colors">
                              <Trash2 size={12} /> מחיקה
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
                        <div className="text-center">
                          <p className="text-white/25 text-[10px]">כניסות</p>
                          <p className="text-white font-bold text-lg">{aff.stats?.visits || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/25 text-[10px]">צ׳קאווט</p>
                          <p className="text-white font-bold text-lg">{aff.stats?.checkouts || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/25 text-[10px]">רכישות</p>
                          <p className="text-[#10B981] font-bold text-lg">{aff.stats?.purchases || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/25 text-[10px]">הכנסות</p>
                          <p className="text-[#F5A624] font-bold text-lg">₪{aff.stats?.revenue || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/25 text-[10px]">עמלה</p>
                          <p className="text-[#F59E0B] font-bold text-lg">₪{aff.stats?.commission || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
