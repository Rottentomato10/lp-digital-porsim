'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShieldCheck, Lock, Check, X, Loader2, Sparkles, User, Mail, Phone, Tag } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/9720537282727?text=היי, יש לי שאלה לגבי הקורס'
const BASE_PRICE = 390

export default function CheckoutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState<{ code: string; discount: number; finalPrice: number; label: string } | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [loading, setLoading] = useState(false)
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Track affiliate checkout (stats only, no coupon auto-apply)
  useEffect(() => {
    const viaCookie = document.cookie.split('; ').find(c => c.startsWith('aff_via='))
    const viaCode = viaCookie?.split('=')[1]
    if (viaCode) {
      fetch('/api/affiliate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: viaCode, type: 'checkout' }),
      }).catch(() => {})
    }
  }, [])

  const handleCouponCheck = async (code?: string) => {
    const checkCode = (code || coupon).trim()
    if (!checkCode) { setCouponError('נא להזין קוד'); return }

    setCouponLoading(true)
    setCouponError('')
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: checkCode }),
      })
      const data = await res.json()

      if (data.valid) {
        setCouponApplied({ code: data.code, discount: data.discount, finalPrice: data.finalPrice, label: data.label })
        setCouponError('')
      } else {
        setCouponError(data.error || 'קוד לא תקין')
        setCouponApplied(null)
      }
    } catch {
      setCouponError('שגיאה בבדיקת הקוד')
    }
    setCouponLoading(false)
  }

  const removeCoupon = () => {
    setCouponApplied(null)
    setCoupon('')
    setCouponError('')
  }

  const finalPrice = couponApplied ? couponApplied.finalPrice : BASE_PRICE

  const handlePay = async () => {
    if (!name.trim() || name.trim().length < 2) { setError('נא למלא שם מלא (לפחות 2 תווים)'); return }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email.trim() || !emailRegex.test(email.trim())) { setError('נא למלא כתובת אימייל תקינה (לדוגמה: you@example.com)'); return }

    const phoneClean = phone.trim().replace(/[-\s()]/g, '')
    if (!phoneClean || phoneClean.length < 9 || phoneClean.length > 15 || !/^\+?\d+$/.test(phoneClean)) { setError('נא למלא מספר טלפון תקין (לפחות 9 ספרות)'); return }

    setLoading(true)
    setError(null)

    // Facebook Pixel: InitiateCheckout
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', { value: finalPrice, currency: 'ILS' })
    }
    // GA4: begin_checkout
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', { value: finalPrice, currency: 'ILS' })
    }

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), coupon: couponApplied?.code || '' }),
    }).catch(() => {})

    try {
      const res = await fetch('/api/cardcom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          coupon: couponApplied?.code || '',
        }),
      })
      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'אירעה שגיאה, נסה שוב')
        setLoading(false)
        return
      }

      setIframeUrl(data.url)
      setLoading(false)
    } catch {
      setError('אירעה שגיאה בתקשורת, נסה שוב')
      setLoading(false)
    }
  }

  const closeModal = () => { setIframeUrl(null) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#080B16] to-[#0D1117]" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* CardCom Payment Modal */}
      {iframeUrl && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-6"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="relative w-full md:max-w-2xl bg-white md:rounded-2xl overflow-hidden shadow-2xl h-[100dvh] md:h-auto md:max-h-[92vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Lock size={13} className="text-green-500" />
                <span className="text-gray-500 text-sm">תשלום מאובטח</span>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <iframe src={iframeUrl} className="w-full border-0" style={{ height: 'calc(100dvh - 52px)', minHeight: '500px' }} allow="payment" />
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="פורשים כנף" width={36} height={36} className="w-8 h-8 object-contain" />
            <span className="font-bold text-white/80 text-sm">פורשים כנף</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Lock size={12} />
            <span>חיבור מאובטח</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
            <div className="inline-flex items-center gap-2 bg-[#F5A624]/10 border border-[#F5A624]/20 rounded-full px-4 py-1.5">
              <Sparkles size={14} className="text-[#F5A624]" />
              <span className="text-[#F5A624] text-sm font-semibold">גישה מיידית עם אישור התשלום</span>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full px-4 py-1.5 hover:bg-[#25D366]/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-[#25D366] text-sm font-semibold">יש שאלות? דברו איתנו</span>
            </a>
          </div>
          <h1 className="font-black text-white text-3xl md:text-4xl mb-3">השלמת רכישה</h1>
          <p className="text-white/50 text-base max-w-md mx-auto">
            מלא את הפרטים, שלם, ותקבל גישה מיידית לקורס ישירות למייל.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:items-stretch">

          {/* Main column */}
          <div className="md:col-span-3 order-2 md:order-1">

            {/* Customer details form */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6 mb-6">
              <h2 className="text-white font-bold text-base mb-5">פרטים לקבלת גישה</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/50 text-sm font-medium mb-1.5">שם מלא *</label>
                  <div className="relative">
                    <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ישראל ישראלי"
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all" />
                  </div>
                  <p className="text-white/25 text-xs mt-1.5">שנדע איך לפנות אליך</p>
                </div>

                <div>
                  <label className="block text-white/50 text-sm font-medium mb-1.5">אימייל *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" dir="ltr"
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left" />
                  </div>
                  <p className="text-white/25 text-xs mt-1.5">לכתובת הזו יישלח הלינק לקורס + חשבונית</p>
                </div>

                <div>
                  <label className="block text-white/50 text-sm font-medium mb-1.5">טלפון *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="050-0000000" dir="ltr"
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon code */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6 mb-6">
              <h2 className="text-white font-bold text-base mb-4">יש לך קוד קופון?</h2>

              {couponApplied ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                  <div className="flex items-center gap-2.5">
                    <Check size={16} className="text-[#10B981]" />
                    <div>
                      <p className="text-[#10B981] font-bold text-sm">{couponApplied.code} — {couponApplied.label}</p>
                      <p className="text-[#10B981]/60 text-xs">חיסכון של ₪{BASE_PRICE - couponApplied.finalPrice}</p>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleCouponCheck()}
                      placeholder="הזן קוד קופון"
                      dir="ltr"
                      className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-base placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left"
                    />
                  </div>
                  <button onClick={() => handleCouponCheck()} disabled={couponLoading}
                    className="px-5 py-3 rounded-xl bg-white/[0.08] border border-white/10 text-white/70 font-bold text-sm hover:bg-white/[0.12] transition-all disabled:opacity-50 flex-shrink-0">
                    {couponLoading ? <Loader2 size={16} className="animate-spin" /> : 'החל'}
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
            </div>

            {/* Pay button */}
            <div className="mb-8">
              <button onClick={handlePay} disabled={loading}
                className="cta-shine w-full py-5 rounded-2xl bg-[#F5A624] hover:brightness-110 disabled:opacity-60 text-black font-black text-xl transition-all flex items-center justify-center gap-3 mb-3">
                {loading ? (
                  <><Loader2 size={22} className="animate-spin" /><span>פותח טופס תשלום...</span></>
                ) : (
                  <span>המשך לתשלום — ₪{finalPrice}</span>
                )}
              </button>

              {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}

              <div className="flex items-center justify-center gap-5">
                {[
                  { icon: ShieldCheck, label: 'SSL מאובטח' },
                  { icon: Lock, label: 'הצפנה 256-bit' },
                  { icon: ShieldCheck, label: 'PCI DSS' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1 text-white/25 text-[11px]">
                    <b.icon size={11} />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After payment */}
            <div className="rounded-2xl p-5 md:p-6 border border-[#10B981]/15"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 100%)' }}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-[#10B981]" />
                </div>
                <p className="text-[#10B981] font-bold text-base">מה קורה אחרי התשלום?</p>
              </div>
              <div className="space-y-3 mr-10">
                {['מייל עם לינק גישה אישי — תוך דקות', 'גישה מיידית לכל 57 השיעורים', 'גישה לאפליקציה ולקהילה הפרטית'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]/50" />
                    <span className="text-white/50 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="md:col-span-2 order-1 md:order-2 flex flex-col">
            <div className="flex flex-col gap-4 flex-1">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6">
                <h2 className="text-white font-bold text-base mb-4">סיכום הזמנה</h2>

                <div className="flex items-start gap-3 pb-4 border-b border-white/6">
                  <div className="w-12 h-12 rounded-xl bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0">
                    <Image src="/logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">קורס פיננסים לצעירים</p>
                    <p className="text-white/30 text-xs">57 שיעורים · 3 שעות · לכל החיים</p>
                  </div>
                </div>

                <div className="py-4 border-b border-white/6">
                  <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-3">מה כלול</p>
                  <div className="space-y-2">
                    {['קורס מלא — א׳ עד ת׳', 'אפליקציית ניהול תזרים', 'תעודת סיום', 'קהילה פרטית + תמיכה', 'עדכונים עתידיים — חינם'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={12} className="text-[#10B981] flex-shrink-0" />
                        <span className="text-white/50 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">שווי כולל</span>
                    <span className="text-white/30 text-xs line-through">₪1,140</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs">הנחת השקה</span>
                    <span className="text-[#10B981] text-xs font-medium">−₪{1140 - BASE_PRICE}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5A624] text-xs font-medium">קופון {couponApplied.code}</span>
                      <span className="text-[#F5A624] text-xs font-medium">−₪{BASE_PRICE - couponApplied.finalPrice}</span>
                    </div>
                  )}
                  <div className="h-px bg-white/6 my-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">סה״כ</span>
                    <span className="text-[#F5A624] font-black text-2xl">₪{finalPrice}</span>
                  </div>
                  <p className="text-white/20 text-[10px] text-center pt-1">תשלום חד-פעמי · ללא מנוי · ללא חיובים נוספים</p>
                </div>
              </div>

              {/* Guarantee */}
              <div className="rounded-2xl p-5 md:p-6 border border-[#F5A624]/10 bg-[#F5A624]/[0.03] flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 mb-3">
                  <ShieldCheck size={20} className="text-[#F5A624] flex-shrink-0" />
                  <p className="text-[#F5A624] font-bold text-base">אחריות מלאה — 7 ימים</p>
                </div>
                <p className="text-white/45 text-base leading-relaxed mr-8">
                  לא הרגשת שזה שווה? החזר מלא, בלי שאלות. אנחנו כאן בשביל התוצאות שלך.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center text-white/15 text-xs space-y-1">
          <p>© 2026 פורשים כנף · כל הזכויות שמורות</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/course" className="hover:text-white/30 transition-colors">חזרה לאתר</a>
            <span>·</span>
            <button onClick={() => document.querySelector('[data-modal="privacy"]')?.dispatchEvent(new Event('click'))} className="hover:text-white/30 transition-colors">מדיניות פרטיות</button>
            <span>·</span>
            <button onClick={() => document.querySelector('[data-modal="terms"]')?.dispatchEvent(new Event('click'))} className="hover:text-white/30 transition-colors">תנאי שימוש</button>
            <span>·</span>
            <button onClick={() => document.querySelector('[data-modal="accessibility"]')?.dispatchEvent(new Event('click'))} className="hover:text-white/30 transition-colors">נגישות</button>
          </div>
        </div>
      </div>
    </div>
  )
}
