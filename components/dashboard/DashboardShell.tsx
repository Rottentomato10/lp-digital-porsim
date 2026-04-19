'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Users, Eye, ShoppingCart, DollarSign, Copy, Check, Trash2, Pencil, X, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react'

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
          {initial?.affNumber ? `#${initial.affNumber}` : 'מספר ייווצר אוטומטית'}
        </span>
      </div>

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

      <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">פרטי תשלום (בנק)</p>
      <div className="grid md:grid-cols-3 gap-3 mb-5">
        <div><label className="block text-white/40 text-xs mb-1">שם בנק</label>
          <input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="לאומי / הפועלים..." className={inp} /></div>
        <div><label className="block text-white/40 text-xs mb-1">סניף</label>
          <input value={bankBranch} onChange={e => setBankBranch(e.target.value)} placeholder="מספר סניף" dir="ltr" className={inp + ' text-left'} /></div>
        <div><label className="block text-white/40 text-xs mb-1">מספר חשבון</label>
          <input value={bankAccount} onChange={e => setBankAccount(e.target.value)} placeholder="מספר חשבון" dir="ltr" className={inp + ' text-left'} /></div>
      </div>

      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1">הערות</label>
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="הערות חופשיות..." className={inp} />
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <div className="flex gap-3">
        <button onClick={handle} className="bg-[#F5A624] text-black font-bold text-sm px-6 py-2 rounded-lg hover:brightness-110 transition-all">{submitLabel}</button>
        <button onClick={onCancel} className="text-white/30 text-sm hover:text-white/60 transition-colors">ביטול</button>
      </div>
    </div>
  )
}

// ── Stats Table ──
type SortKey = 'name' | 'visits' | 'checkouts' | 'purchases' | 'revenue' | 'commission' | 'discountPercent' | 'commissionPercent' | 'efficiency'

function StatsTab({ affiliates }: { affiliates: Aff[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('revenue')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc') }
    else { setSortBy(key); setSortDir('desc') }
  }

  // ── Efficiency Score: multi-parameter normalized 0-1 ──
  // 5 sub-scores, each 0-100, then averaged and normalized to 0-1

  function calcScores(affs: Aff[]) {
    if (affs.length === 0) return new Map<string, { traffic: number; revenue: number; conversion: number; cost: number; profitPerVisit: number; total: number; normalized: number }>()

    // Calculate averages across all affiliates
    const avgVisits = affs.reduce((s, a) => s + a.stats.visits, 0) / affs.length || 1
    const avgRevenue = affs.reduce((s, a) => s + a.stats.revenue, 0) / affs.length || 1
    const convRates = affs.map(a => a.stats.visits > 0 ? a.stats.purchases / a.stats.visits : 0)
    const avgConv = convRates.reduce((s, c) => s + c, 0) / affs.length || 0.01
    const avgCommPct = affs.reduce((s, a) => s + a.commissionPercent, 0) / affs.length || 1
    const ppvs = affs.map(a => a.stats.visits > 0 ? (a.stats.revenue - a.stats.commission) / a.stats.visits : 0)
    const avgPpv = ppvs.reduce((s, p) => s + p, 0) / affs.length || 0.01

    const scores = new Map<string, any>()

    for (const aff of affs) {
      // Each score: 50 = average, 0-100 scale relative to group average
      // score = min(100, (value / average) * 50)

      // 1. Traffic — visits relative to group average
      const traffic = Math.min(100, Math.round((aff.stats.visits / avgVisits) * 50))

      // 2. Revenue — relative to group average
      const revenue = Math.min(100, Math.round((aff.stats.revenue / avgRevenue) * 50))

      // 3. Conversion — relative to group average
      const convRate = aff.stats.visits > 0 ? aff.stats.purchases / aff.stats.visits : 0
      const conversion = Math.min(100, Math.round((convRate / avgConv) * 50))

      // 4. Cost efficiency — inverted: lower commission % = higher score
      // If avg is 10% and he's 5%, he's more efficient → score > 50
      const cost = Math.min(100, Math.round((avgCommPct / Math.max(aff.commissionPercent, 0.1)) * 50))

      // 5. Net profit per visit — relative to group average
      const ppv = aff.stats.visits > 0 ? (aff.stats.revenue - aff.stats.commission) / aff.stats.visits : 0
      const profitPerVisit = Math.min(100, Math.round((ppv / avgPpv) * 50))

      // Average of 5 scores → 0-100, then normalize to 0-1
      const total = Math.round((traffic + revenue + conversion + cost + profitPerVisit) / 5)
      const normalized = Math.round(total) / 100

      scores.set(aff.id, { traffic, revenue, conversion, cost, profitPerVisit, total, normalized })
    }

    return scores
  }

  const effScores = calcScores(affiliates)

  function getEfficiency(aff: Aff): number {
    return effScores.get(aff.id)?.total || 0
  }

  const sorted = [...affiliates].sort((a, b) => {
    let va: number, vb: number
    if (sortBy === 'name') return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    if (sortBy === 'discountPercent') { va = a.discountPercent; vb = b.discountPercent }
    else if (sortBy === 'commissionPercent') { va = a.commissionPercent; vb = b.commissionPercent }
    else if (sortBy === 'efficiency') { va = getEfficiency(a); vb = getEfficiency(b) }
    else { va = (a.stats as any)[sortBy] || 0; vb = (b.stats as any)[sortBy] || 0 }
    return sortDir === 'asc' ? va - vb : vb - va
  })

  const totalVisits = affiliates.reduce((s, a) => s + a.stats.visits, 0)
  const totalCheckouts = affiliates.reduce((s, a) => s + a.stats.checkouts, 0)
  const totalPurchases = affiliates.reduce((s, a) => s + a.stats.purchases, 0)
  const totalRevenue = affiliates.reduce((s, a) => s + a.stats.revenue, 0)
  const totalCommission = affiliates.reduce((s, a) => s + a.stats.commission, 0)

  function SortHeader({ label, k }: { label: string; k: SortKey }) {
    const active = sortBy === k
    return (
      <th className="px-3 py-3 text-right cursor-pointer hover:text-white/60 transition-colors select-none" onClick={() => toggleSort(k)}>
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {active ? (sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />) : <ArrowUpDown size={10} className="opacity-30" />}
        </div>
      </th>
    )
  }

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'סה״כ כניסות', value: totalVisits.toLocaleString(), color: '#3B82F6' },
          { label: 'סה״כ צ׳קאווטים', value: totalCheckouts.toLocaleString(), color: '#8B5CF6' },
          { label: 'סה״כ רכישות', value: totalPurchases.toLocaleString(), color: '#10B981' },
          { label: 'סה״כ הכנסות', value: `₪${totalRevenue.toLocaleString()}`, color: '#10B981' },
          { label: 'סה״כ עמלות', value: `₪${totalCommission.toLocaleString()}`, color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white/[0.03] border border-white/6 p-3 text-center">
            <p className="text-white/30 text-[10px] mb-1">{s.label}</p>
            <p className="font-black text-xl" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.03] text-white/40 text-xs">
                <th className="px-3 py-3 text-right w-8">#</th>
                <SortHeader label="שם" k="name" />
                <th className="px-3 py-3 text-right">סטטוס</th>
                <SortHeader label="כניסות" k="visits" />
                <SortHeader label="צ׳קאווט" k="checkouts" />
                <SortHeader label="רכישות" k="purchases" />
                <th className="px-3 py-3 text-right">המרה</th>
                <SortHeader label="הכנסות" k="revenue" />
                <SortHeader label="הנחה %" k="discountPercent" />
                <SortHeader label="עמלה %" k="commissionPercent" />
                <SortHeader label="עמלה ₪" k="commission" />
                <th className="px-3 py-3 text-right">% עמלה/הכנסה</th>
                <SortHeader label="יעילות" k="efficiency" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((aff, i) => {
                const scores = effScores.get(aff.id)
                const eff = scores?.total || 0
                const norm = scores?.normalized || 0
                const effColor = eff >= 70 ? '#10B981' : eff >= 40 ? '#F5A624' : '#EF4444'
                const convRate = aff.stats.visits > 0 ? ((aff.stats.purchases / aff.stats.visits) * 100).toFixed(1) : '0'
                return (
                  <tr key={aff.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-3 text-white/20 font-mono text-xs">{i + 1}</td>
                    <td className="px-3 py-3">
                      <div>
                        <span className="text-white font-bold">{aff.name}</span>
                        <span className="text-white/20 text-xs mr-2">#{aff.affNumber || '—'}</span>
                      </div>
                      <p className="text-white/20 text-xs">{aff.coupon}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${aff.active ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-red-500/10 text-red-400'}`}>
                        {aff.active ? 'פעיל' : 'מושבת'}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-white/60">{aff.stats.visits.toLocaleString()}</td>
                    <td className="px-3 py-3 text-white/60">{aff.stats.checkouts.toLocaleString()}</td>
                    <td className="px-3 py-3 text-[#10B981] font-bold">{aff.stats.purchases.toLocaleString()}</td>
                    <td className="px-3 py-3 text-white/40">{convRate}%</td>
                    <td className="px-3 py-3 text-[#10B981] font-bold">₪{aff.stats.revenue.toLocaleString()}</td>
                    <td className="px-3 py-3 text-white/40">{aff.discountPercent}%</td>
                    <td className="px-3 py-3 text-white/40">{aff.commissionPercent}%</td>
                    <td className="px-3 py-3 text-[#F59E0B] font-bold">₪{aff.stats.commission.toLocaleString()}</td>
                    <td className="px-3 py-3 text-white/40">
                      {aff.stats.revenue > 0 ? `${((aff.stats.commission / aff.stats.revenue) * 100).toFixed(1)}%` : '—'}
                    </td>
                    <td className="px-3 py-3">
                      <div className="group relative">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-2.5 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${eff}%`, background: effColor }} />
                          </div>
                          <span className="font-black text-sm" style={{ color: effColor }}>{norm.toFixed(2)}</span>
                        </div>
                        {/* Tooltip with breakdown */}
                        {scores && (
                          <div className="hidden group-hover:block absolute z-20 bottom-full left-0 mb-2 p-3 rounded-lg bg-[#1a1f2e] border border-white/10 shadow-xl text-xs whitespace-nowrap">
                            <p className="text-white font-bold mb-2">פירוט ציון יעילות: {eff}/100 ({norm.toFixed(2)})</p>
                            <div className="space-y-1">
                              <p className="text-white/50">קהל (תנועה): <span className="text-white font-bold">{scores.traffic}</span>/100</p>
                              <p className="text-white/50">הכנסות: <span className="text-white font-bold">{scores.revenue}</span>/100</p>
                              <p className="text-white/50">המרה: <span className="text-white font-bold">{scores.conversion}</span>/100</p>
                              <p className="text-white/50">עלות (נמוך=טוב): <span className="text-white font-bold">{scores.cost}</span>/100</p>
                              <p className="text-white/50">רווח/כניסה: <span className="text-white font-bold">{scores.profitPerVisit}</span>/100</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-white/10 bg-white/[0.02]">
                <td className="px-3 py-3" colSpan={3}>
                  <span className="text-white font-bold text-sm">סה״כ</span>
                </td>
                <td className="px-3 py-3 text-white font-bold">{totalVisits.toLocaleString()}</td>
                <td className="px-3 py-3 text-white font-bold">{totalCheckouts.toLocaleString()}</td>
                <td className="px-3 py-3 text-[#10B981] font-bold">{totalPurchases.toLocaleString()}</td>
                <td className="px-3 py-3 text-white/40">{totalVisits > 0 ? ((totalPurchases / totalVisits) * 100).toFixed(1) : '0'}%</td>
                <td className="px-3 py-3 text-[#10B981] font-black">₪{totalRevenue.toLocaleString()}</td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3"></td>
                <td className="px-3 py-3 text-[#F59E0B] font-black">₪{totalCommission.toLocaleString()}</td>
                <td className="px-3 py-3 text-white/40">{totalRevenue > 0 ? `${((totalCommission / totalRevenue) * 100).toFixed(1)}%` : '—'}</td>
                <td className="px-3 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ──
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
  const [tab, setTab] = useState<'affiliates' | 'stats' | 'orders'>('affiliates')
  const [seeding, setSeeding] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [orderSearch, setOrderSearch] = useState('')

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

  const fetchOrders = useCallback(async (q?: string) => {
    try {
      const url = q ? `/api/orders?q=${encodeURIComponent(q)}` : '/api/orders'
      const res = await fetch(url)
      if (res.ok) { const data = await res.json(); setOrders(data.orders || []) }
    } catch {}
  }, [])

  useEffect(() => { if (document.cookie.includes('dash_auth=Freedom1992@')) setAuthed(true) }, [])
  useEffect(() => { if (authed) { fetchData(); fetchOrders() } }, [authed, fetchData, fetchOrders])

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
  const handleSeed = async () => {
    setSeeding(true)
    await fetch('/api/affiliate/seed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ force: true }) })
    await fetchData()
    setSeeding(false)
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
      {/* Top bar */}
      <div className="border-b border-white/5 bg-[#080B16]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">פורשים כנף — דשבורד</h1>
          <button onClick={() => { document.cookie = 'dash_auth=; path=/; max-age=0'; setAuthed(false) }} className="text-white/30 text-sm hover:text-white/60">יציאה</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          {[
            { key: 'affiliates' as const, label: 'אפיליאייטים', icon: Users },
            { key: 'orders' as const, label: 'הזמנות', icon: ShoppingCart },
            { key: 'stats' as const, label: 'סטטיסטיקות', icon: ArrowUpDown },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.key ? 'border-[#F5A624] text-[#F5A624]' : 'border-transparent text-white/30 hover:text-white/50'
              }`}>
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── Orders Tab ── */}
        {tab === 'orders' && (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="text-white font-bold text-lg flex-shrink-0">הזמנות</h2>
                {orders.length === 0 && (
                  <button onClick={async () => { await fetch('/api/orders/seed', { method: 'POST' }); fetchOrders() }}
                    className="text-white/30 text-xs border border-white/10 px-3 py-1 rounded-lg hover:text-white/50">
                    נתוני דוגמה
                  </button>
                )}
              </div>
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={orderSearch}
                  onChange={e => { setOrderSearch(e.target.value); fetchOrders(e.target.value || undefined) }}
                  placeholder="חיפוש לפי מס׳ הזמנה, שם, אימייל או טלפון..."
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-[#F5A624]/50"
                />
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 text-white/20">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg">{orderSearch ? 'לא נמצאו תוצאות' : 'אין הזמנות עדיין'}</p>
              </div>
            ) : (
              <div className="rounded-xl border border-white/6 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/[0.03] text-white/40 text-xs">
                        <th className="px-3 py-3 text-right">מס׳ הזמנה</th>
                        <th className="px-3 py-3 text-right">שם</th>
                        <th className="px-3 py-3 text-right">אימייל</th>
                        <th className="px-3 py-3 text-right">טלפון</th>
                        <th className="px-3 py-3 text-right">סכום</th>
                        <th className="px-3 py-3 text-right">קופון</th>
                        <th className="px-3 py-3 text-right">סטטוס</th>
                        <th className="px-3 py-3 text-right">תאריך</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o: any) => {
                        const statusColors: Record<string, string> = {
                          pending: 'bg-yellow-500/15 text-yellow-400',
                          paid: 'bg-[#10B981]/15 text-[#10B981]',
                          email_sent: 'bg-blue-500/15 text-blue-400',
                          accessed: 'bg-purple-500/15 text-purple-400',
                          refunded: 'bg-red-500/15 text-red-400',
                        }
                        const statusLabels: Record<string, string> = {
                          pending: 'ממתין לתשלום',
                          paid: 'שולם',
                          email_sent: 'נשלח מייל',
                          accessed: 'נכנס לקורס',
                          refunded: 'הוחזר',
                        }
                        return (
                          <tr key={o.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-3 py-3">
                              <span className="text-[#F5A624] font-mono font-bold">{o.id}</span>
                            </td>
                            <td className="px-3 py-3 text-white font-medium">{o.name}</td>
                            <td className="px-3 py-3 text-white/50 text-xs" dir="ltr">{o.email}</td>
                            <td className="px-3 py-3 text-white/50 text-xs" dir="ltr">{o.phone}</td>
                            <td className="px-3 py-3 text-[#10B981] font-bold">₪{o.amount}</td>
                            <td className="px-3 py-3 text-white/30 text-xs">{o.coupon || '—'}</td>
                            <td className="px-3 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.status] || 'bg-white/5 text-white/30'}`}>
                                {statusLabels[o.status] || o.status}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-white/30 text-xs">
                              {new Date(o.createdAt).toLocaleDateString('he-IL')}
                              <br />
                              <span className="text-white/15">{new Date(o.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Stats Tab ── */}
        {tab === 'stats' && (
          <>
            {affiliates.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/20 text-lg mb-4">אין נתונים עדיין</p>
                <button onClick={handleSeed} disabled={seeding}
                  className="bg-[#F5A624] text-black font-bold text-sm px-6 py-2 rounded-lg hover:brightness-110 disabled:opacity-50">
                  {seeding ? 'טוען נתוני דוגמה...' : 'טען נתוני דוגמה לבדיקה'}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-bold text-lg">טבלת סטטיסטיקות</h2>
                  <p className="text-white/20 text-xs">לחץ על כותרת עמודה למיון</p>
                </div>
                <StatsTab affiliates={affiliates} />
              </>
            )}
          </>
        )}

        {/* ── Affiliates Tab ── */}
        {tab === 'affiliates' && (
          <>
            {/* Overall Stats */}
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

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">רשימת אפיליאייטים</h2>
              <div className="flex gap-2">
                {affiliates.length === 0 && (
                  <button onClick={handleSeed} disabled={seeding}
                    className="text-white/30 text-sm border border-white/10 px-3 py-1.5 rounded-lg hover:text-white/50 disabled:opacity-50">
                    {seeding ? 'טוען...' : 'נתוני דוגמה'}
                  </button>
                )}
                <button onClick={() => { setShowCreate(true); setEditingId(null) }}
                  className="flex items-center gap-2 bg-[#F5A624] text-black font-bold text-sm px-4 py-2 rounded-lg hover:brightness-110">
                  <Plus size={16} /> אפיליאייט חדש
                </button>
              </div>
            </div>

            {showCreate && <AffForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} submitLabel="צור אפיליאייט" />}

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
                      <div className={`rounded-xl border p-4 md:p-5 ${aff.active ? 'bg-white/[0.03] border-white/6' : 'bg-red-500/[0.02] border-red-500/10'}`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-white/20 text-xs font-mono bg-white/5 px-2 py-0.5 rounded">#{aff.affNumber || '—'}</span>
                              <h3 className="text-white font-bold text-base">{aff.name}</h3>
                              <button onClick={() => handleToggle(aff)}
                                className={`text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors ${aff.active ? 'bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25' : 'bg-red-500/15 text-red-400 hover:bg-red-500/25'}`}>
                                {aff.active ? 'פעיל' : 'מושבת'}
                              </button>
                            </div>
                            <p className="text-white/30 text-xs mb-2">{aff.email}{aff.phone ? ` · ${aff.phone}` : ''}</p>

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

                          <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
                            <div className="text-center"><p className="text-white/25 text-[10px]">כניסות</p><p className="text-white font-bold text-lg">{aff.stats?.visits || 0}</p></div>
                            <div className="text-center"><p className="text-white/25 text-[10px]">צ׳קאווט</p><p className="text-white font-bold text-lg">{aff.stats?.checkouts || 0}</p></div>
                            <div className="text-center"><p className="text-white/25 text-[10px]">רכישות</p><p className="text-[#10B981] font-bold text-lg">{aff.stats?.purchases || 0}</p></div>
                            <div className="text-center"><p className="text-white/25 text-[10px]">הכנסות</p><p className="text-[#F5A624] font-bold text-lg">₪{aff.stats?.revenue || 0}</p></div>
                            <div className="text-center"><p className="text-white/25 text-[10px]">עמלה</p><p className="text-[#F59E0B] font-bold text-lg">₪{aff.stats?.commission || 0}</p></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
