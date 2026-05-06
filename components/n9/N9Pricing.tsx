'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, ShieldCheck, Loader2, X, Tag, User, Mail, Phone, Lock } from 'lucide-react'
import Image from 'next/image'
import { useContent } from '@/lib/content-context'
import { LegalModal, type ModalType } from '@/components/d/DLegalModal'

const VALUE_ITEMS = [
  { label: 'קורס פיננסים לצעירים — א׳ עד ת׳', value: 490, desc: null },
  { label: 'אפליקציית ניהול תזרים אישי', value: 200, desc: 'כדי שלא תצטרך לבנות אקסלים מסובכים בעצמך' },
  { label: 'תעודת סיום פורשים כנף', value: 150, desc: null },
  { label: 'גישה לקהילה הפרטית שלנו', value: 300, desc: 'כי הרבה יותר קל כשיש איפה לשאול שאלות בזמן אמת' },
]

const BASE_PRICE = 390

export default function N9Pricing() {
  const contentD = useContent()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const totalValue = VALUE_ITEMS.reduce((s, i) => s + i.value, 0)

  // --- Form state (moved from CheckoutPage) ---
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
  const [legalModal, setLegalModal] = useState<ModalType>(null)

  // Auto-apply coupon from URL (?coupon=CODE)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlCoupon = params.get('coupon')?.trim()
    if (urlCoupon && !couponApplied) {
      setCoupon(urlCoupon)
      handleCouponCheck(urlCoupon)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Track affiliate checkout event when form is interacted with
  const trackCheckoutOnce = useRef(false)
  const trackCheckout = () => {
    if (trackCheckoutOnce.current) return
    trackCheckoutOnce.current = true
    const viaCookie = document.cookie.split('; ').find(c => c.startsWith('aff_via='))
    const viaCode = viaCookie?.split('=')[1]
    if (viaCode) {
      fetch('/api/affiliate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: viaCode, type: 'checkout' }),
      }).catch(() => {})
    }
  }

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
    if (!name.trim() || name.trim().length < 2) { setError('נא למלא שם מלא'); return }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email.trim() || !emailRegex.test(email.trim())) { setError('נא למלא כתובת אימייל תקינה'); return }

    // Phone is optional — but validate if provided
    const phoneClean = phone.trim().replace(/[-\s()]/g, '')
    if (phoneClean && (phoneClean.length < 9 || phoneClean.length > 15 || !/^\+?\d+$/.test(phoneClean))) {
      setError('מספר טלפון לא תקין'); return
    }

    setLoading(true)
    setError(null)

    // Check if email already registered
    try {
      const checkRes = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const checkData = await checkRes.json()
      if (checkData.exists) {
        setError('EMAIL_EXISTS')
        setLoading(false)
        return
      }
    } catch {
      // If check fails, continue with purchase
    }

    // Facebook Pixel: InitiateCheckout
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', { value: finalPrice, currency: 'ILS' })
    }
    // GA4: begin_checkout
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', { value: finalPrice, currency: 'ILS' })
    }

    // Save lead
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), coupon: couponApplied?.code || '' }),
    }).catch(() => {})

    // Create CardCom payment
    try {
      const res = await fetch('/api/cardcom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || '0500000000',
          coupon: couponApplied?.code || '',
          marketingConsent: true,
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

  return (
    <>
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
              <button onClick={() => setIframeUrl(null)} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <iframe src={iframeUrl} className="w-full border-0" style={{ height: 'calc(100dvh - 52px)', minHeight: '500px' }} allow="payment" />
          </div>
        </div>
      )}

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      <section ref={ref} className="relative py-20 md:py-28 bg-[#080808] overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,36,0.06) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-5">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-[#34D399] font-semibold text-sm tracking-widest uppercase">ההשקעה בעתיד שלך</span>
            <h2 className="mt-4 font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
              הכלים שיחסכו לך<br />עשור של טעויות.
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-[#F5A624]/30 bg-[#0C0C0C] overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(245,166,36,0.08)' }}>

            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

            <div className="bg-[#F5A624]/10 border-b border-[#F5A624]/15 px-5 py-3 text-center">
              <p className="text-[#F5A624] font-bold text-sm md:text-base">
                מחיר השקה מיוחד — ₪{contentD.pricing.price} במקום ₪{contentD.pricing.price_original}
              </p>
            </div>

            <div className="p-5 xs:p-8 md:p-12">

              <div id="pricing" />
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-3 mb-2">
                  <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>
                  <span className="font-black" style={{
                    fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                    background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>₪{finalPrice}</span>
                </div>
                <p className="text-white/40 text-base">{contentD.pricing.price_note}</p>
                {couponApplied && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[#10B981] text-sm font-bold">{couponApplied.code} — {couponApplied.label}</span>
                    <button onClick={removeCoupon} className="text-white/30 hover:text-white/60"><X size={14} /></button>
                  </div>
                )}
              </div>

              <p className="text-center text-white/40 text-base md:text-lg mb-4">
                תכלס? זה פחות ממה שטעות אחת בכסף יכולה לעלות לך.
              </p>

              <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-4 mb-8 text-sm md:text-base">
                <span className="text-white/30">✘ לא בשבילך אם אתה מחפש להתעשר מהר</span>
                <span className="text-[#F5A624]/60">✔ כן בשבילך אם אתה רוצה להבין כסף באמת</span>
              </div>

              {/* ====== INLINE CHECKOUT FORM ====== */}
              <div className="rounded-2xl border border-white/8 bg-[#111111] p-5 md:p-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <div className="relative">
                      <User size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                      <input type="text" value={name} onChange={(e) => { setName(e.target.value); trackCheckout() }} placeholder="ישראל ישראלי"
                        className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all" />
                    </div>
                    <p className="text-white/30 text-xs mt-1 mr-1">שנדע איך לפנות אליך</p>
                  </div>
                  <div>
                    <div className="relative">
                      <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" dir="ltr"
                        className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left" />
                    </div>
                    <p className="text-white/30 text-xs mt-1 mr-1">לכתובת הזו יישלח הלינק לקורס + חשבונית</p>
                  </div>
                  <div>
                    <div className="relative">
                      <Phone size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d\-\s+()]/g, ''))} placeholder="050-0000000" dir="ltr"
                        className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left" />
                    </div>
                  </div>

                  {/* Coupon */}
                  {!couponApplied && (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                        <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                          onKeyDown={e => e.key === 'Enter' && handleCouponCheck()}
                          placeholder="קוד קופון" dir="ltr"
                          className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#F5A624]/50 focus:ring-1 focus:ring-[#F5A624]/20 transition-all text-left" />
                      </div>
                      <button onClick={() => handleCouponCheck()} disabled={couponLoading}
                        className="px-4 py-3 rounded-xl bg-[#F5A624]/20 border border-[#F5A624]/40 text-[#F5A624] font-bold text-sm hover:bg-[#F5A624]/30 transition-all disabled:opacity-50 flex-shrink-0">
                        {couponLoading ? <Loader2 size={16} className="animate-spin" /> : 'החל'}
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-red-400 text-xs">{couponError}</p>}
                </div>
              </div>

              {/* CTA */}
              <button onClick={handlePay} disabled={loading}
                className="cta-shine block w-full text-center bg-[#F5A624] text-black font-black text-lg xs:text-xl py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-60 mb-3">
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 size={22} className="animate-spin" />פותח טופס תשלום...</span>
                ) : (
                  <span>לתשלום מאובטח — ₪{finalPrice}</span>
                )}
              </button>

              <p className="text-center text-white/25 text-[10px] mb-2 leading-relaxed">
                בלחיצה על הכפתור אני מאשר/ת את{' '}
                <button type="button" onClick={() => setLegalModal('terms')} className="underline hover:text-white/40">תנאי השימוש</button>
                {' '}ו<button type="button" onClick={() => setLegalModal('privacy')} className="underline hover:text-white/40">מדיניות הפרטיות</button>
                {' '}וקבלת עדכונים באימייל
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-white/40 text-[11px]"><Lock size={11} /><span>SSL מאובטח</span></div>
                <div className="flex items-center gap-1 text-white/40 text-[11px]"><ShieldCheck size={11} /><span>PCI DSS</span></div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center mb-4">
                  {error === 'EMAIL_EXISTS' ? (
                    <p>האימייל כבר רשום במערכת. ניתן להתחבר ישירות דרך{' '}
                      <a href="https://course.porsimkanaf.com" target="_blank" rel="noopener noreferrer"
                        className="underline font-bold hover:text-red-300">course.porsimkanaf.com</a>
                    </p>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              )}

              <p className="text-center text-white/45 text-sm mb-10">
                ברגע שתשלם — תקבל גישה מיידית.
                <br />אימייל עם סיסמה אישית יישלח אליך ותוכל להיכנס לקורס מיד.
                <br />תתחיל מהשיעור הראשון, 4 דקות שישנו איך אתה מסתכל על הכסף שלך.
              </p>

              <div className="mb-10">
                <p className="text-white/45 text-xs font-semibold tracking-widest uppercase mb-4">מה מקבלים</p>
                <div className="space-y-4">
                  {VALUE_ITEMS.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <Check size={14} className="text-[#F5A624] flex-shrink-0 mt-1" />
                          <span className="text-white/70 text-sm xs:text-base">{item.label}</span>
                        </div>
                        <span className="text-white/30 text-sm flex-shrink-0">₪{item.value}</span>
                      </div>
                      {item.desc && (
                        <p className="text-white/45 text-sm mr-6 mt-1">{item.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                  <span className="text-white/40 text-sm">שווי כולל</span>
                  <span className="text-white/40 text-base font-semibold line-through">₪{totalValue}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[#F5A624]/80 text-sm font-bold">אתה משלם עכשיו</span>
                  <span className="text-[#F5A624] text-base font-black">₪{finalPrice}</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="p-5 xs:p-6 md:p-8 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck size={24} className="text-[#F5A624] flex-shrink-0" />
                  <p className="text-[#F5A624] text-lg font-black">אחריות מלאה — 7 ימים</p>
                </div>
                <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                  <p>אם בתוך 3 שעות לא תרגיש שקיבלת את השליטה לידיים — האחריות עלינו.
                    <br />תקבל החזר מלא. בלי שאלות.</p>
                  <p className="text-white/70">
                    אנחנו לא כאן בשביל הכסף שלך.
                    <br />אנחנו כאן בשביל התוצאות שלך.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
