'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Check, ChevronDown, ShieldCheck, Lock, Loader2, User, Mail, Phone, Tag, X, Play } from 'lucide-react'
import { LegalModal, type ModalType } from '@/components/d/DLegalModal'

const BASE_PRICE = 390

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} id={id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.section>
  )
}

export default function LP2Page() {
  // --- Form state ---
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

  const finalPrice = couponApplied ? couponApplied.finalPrice : BASE_PRICE

  const handleCouponCheck = async (code?: string) => {
    const checkCode = (code || coupon).trim()
    if (!checkCode) return
    setCouponLoading(true); setCouponError('')
    try {
      const res = await fetch('/api/coupon', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: checkCode }) })
      const data = await res.json()
      if (data.valid) { setCouponApplied({ code: data.code, discount: data.discount, finalPrice: data.finalPrice, label: data.label }); setCouponError('') }
      else { setCouponError(data.error || 'קוד לא תקין'); setCouponApplied(null) }
    } catch { setCouponError('שגיאה') }
    setCouponLoading(false)
  }

  const handlePay = async () => {
    if (!name.trim() || name.trim().length < 2) { setError('נא למלא שם מלא'); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email.trim() || !emailRegex.test(email.trim())) { setError('נא למלא כתובת אימייל תקינה'); return }
    setLoading(true); setError(null)

    // Check duplicate email
    try {
      const checkRes = await fetch('/api/check-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) })
      const checkData = await checkRes.json()
      if (checkData.exists) { setError('EMAIL_EXISTS'); setLoading(false); return }
    } catch {}

    // Track events
    if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'InitiateCheckout', { value: finalPrice, currency: 'ILS' })
    if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'begin_checkout', { value: finalPrice, currency: 'ILS' })

    // Save lead
    fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), coupon: couponApplied?.code || '' }) }).catch(() => {})

    try {
      const res = await fetch('/api/cardcom', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || '0500000000', coupon: couponApplied?.code || '', marketingConsent: true }) })
      const data = await res.json()
      if (!res.ok || !data.url) { setError(data.error || 'אירעה שגיאה'); setLoading(false); return }
      setIframeUrl(data.url); setLoading(false)
    } catch { setError('שגיאה בתקשורת'); setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* CardCom Modal */}
      {iframeUrl && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-6" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="relative w-full md:max-w-2xl bg-white md:rounded-2xl overflow-hidden shadow-2xl h-[100dvh] md:h-auto md:max-h-[92vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2"><Lock size={13} className="text-green-500" /><span className="text-gray-500 text-sm">תשלום מאובטח</span></div>
              <button onClick={() => setIframeUrl(null)} className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center"><X size={18} className="text-gray-400" /></button>
            </div>
            <iframe src={iframeUrl} className="w-full border-0" style={{ height: 'calc(100dvh - 52px)', minHeight: '500px' }} allow="payment" />
          </div>
        </div>
      )}

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      {/* ========== HERO ========== */}
      <section className="bg-[#faf9f6] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="פורשים כנף" width={80} height={80} className="w-16 h-16 object-contain" priority />
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[#F5A624] font-bold text-sm tracking-wide mb-4">למעלה מ-15,000 צעירים כבר עברו את זה</p>
            <h1 className="font-black text-[#1a1a1a] leading-[1.1] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              הקורס שמלמד צעירים
              <br /><span className="text-[#F5A624]">להפסיק לנחש ולהתחיל לשלוט בכסף</span>
            </h1>
            <p className="text-[#4B5563] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              3 שעות. 58 שיעורים. מא׳ עד ת׳.
              <br />בסוף הקורס תבין כסף יותר טוב מ-97% מהאנשים סביבך — ותדע בדיוק מה לעשות עם כל שקל.
            </p>

            {/* Video */}
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg mb-8">
              <div className="relative" style={{ aspectRatio: '240/426', maxWidth: '300px', margin: '0 auto' }}>
                <video playsInline loop muted autoPlay preload="auto" className="w-full h-full object-cover" src="/video.mp4" poster="/video-poster.jpg" />
              </div>
            </div>

            <a href="#checkout"
              className="inline-flex items-center gap-2 bg-[#F5A624] text-white font-black text-lg px-10 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg">
              אני רוצה להתחיל
            </a>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM ========== */}
      <Section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl leading-snug mb-6">
            אם הגעת לדף הזה...
          </h2>
          <div className="space-y-4 text-[#4B5563] text-lg leading-relaxed">
            <p>אתה כנראה מרוויח כסף — אבל לא באמת יודע מה לעשות איתו.</p>
            <p>אתה שומע את כולם מסביבך מדברים על השקעות, פנסיה, מיסים — ומרגיש שאתה הולך לאיבוד.</p>
            <p>אולי ניסית ללמוד לבד מיוטיוב, אבל אחרי עשרים סרטונים אתה עדיין לא יודע מאיפה להתחיל.</p>
            <p className="text-[#1a1a1a] font-bold text-xl">וזה לא אשמתך.</p>
            <p>אף אחד לא לימד אותך את זה. לא בבית ספר, לא בצבא, לא באוניברסיטה. <strong>המערכת פשוט שכחה את הפרק הכי חשוב.</strong></p>
          </div>
        </div>
      </Section>

      {/* ========== FOUNDERS / AUTHORITY ========== */}
      <Section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex gap-4 justify-center">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-[#F5A624]/20">
                <Image src="/dekel.jpg" alt="דקל קאפח" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-[#F5A624]/20">
                <Image src="/evyatar.jpg" alt="אביתר דנגור" width={200} height={200} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p className="text-[#F5A624] font-bold text-sm mb-3">מי אנחנו</p>
              <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl leading-snug mb-4">
                אנחנו שינינו את הדרך שבה מערכת החינוך מלמדת כסף
              </h2>
              <p className="text-[#4B5563] text-base leading-relaxed mb-3">
                אנחנו דקל ואביתר, המייסדים של <strong>פורשים כנף</strong>. ב-5 השנים האחרונות העברנו סדנאות חינוך פיננסי ב-300+ כיתות ברחבי הארץ — <strong>כחלק מתוכניות גפ״ן של משרד החינוך</strong>.
              </p>
              <p className="text-[#4B5563] text-base leading-relaxed mb-3">
                ראינו מקרוב איך צעירים מבריקים יוצאים לעולם בלי הכלים הכי בסיסיים. אז בנינו את הקורס הדיגיטלי — כדי שכל אחד יוכל ללמוד, מכל מקום, בכל זמן.
              </p>
              <p className="text-[#4B5563] text-base leading-relaxed font-medium">
                למעלה מ-15,000 תלמידים ותלמידות כבר עברו את הדרך הזו. עכשיו התור שלך.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== WHAT YOU GET ========== */}
      <Section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-[#F5A624] font-bold text-sm mb-3">מה בפנים</p>
            <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl">
              לא סתם קורס — מערכת שלמה שנותנת לך שליטה
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: '58 שיעורים מצולמים', desc: '3 שעות מרוכזות. כל שיעור קצר וממוקד. בלי חפירות — רק מה שחשוב.' },
              { title: 'אפליקציית ניהול תזרים', desc: 'כלי מעשי שמלווה אותך אחרי הקורס. תדע בדיוק לאן הולך כל שקל.' },
              { title: 'קהילה פרטית + ליווי', desc: 'קבוצת וואטסאפ עם תלמידים ומנחים. שאלות, עדכונים ותמיכה — אנחנו זמינים.' },
              { title: 'תעודת סיום', desc: 'תעודת מנכ״ל פיננסי מפורשים כנף. כי הידע הזה שווה הכרה.' },
              { title: 'מא׳ עד ת׳', desc: 'מתלוש שכר ועד תיק השקעות. הכל מוסבר בשפה פשוטה עם דוגמאות מהחיים.' },
              { title: 'גישה לכל החיים', desc: 'תשלום אחד. גישה מלאה. כולל עדכונים עתידיים. בלי מנוי חודשי.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-[#faf9f6]">
                <div className="w-8 h-8 rounded-lg bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={16} className="text-[#F5A624]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-1">{item.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== NOT FOR EVERYONE ========== */}
      <Section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl leading-snug mb-6 text-center">
            הקורס הזה לא בשביל כולם
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-bold text-red-500 text-sm mb-3">✗ לא בשבילך אם:</p>
              <ul className="space-y-2 text-[#4B5563] text-base">
                <li>• אתה מחפש להתעשר מהר</li>
                <li>• אתה לא מוכן להשקיע 3 שעות בעצמך</li>
                <li>• אתה חושב שכסף זה עניין של מזל</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#10B981] text-sm mb-3">✓ כן בשבילך אם:</p>
              <ul className="space-y-2 text-[#4B5563] text-base">
                <li>• אתה רוצה להבין כסף באמת ולא לנחש</li>
                <li>• אתה מוכן לקחת אחריות על העתיד הפיננסי שלך</li>
                <li>• אתה מבין שידע שווה כסף — ואי-ידע עולה יותר</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <a href="#checkout"
              className="inline-flex items-center gap-2 bg-[#F5A624] text-white font-black text-lg px-10 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg">
              זה בדיוק בשבילי
            </a>
          </div>
        </div>
      </Section>

      {/* ========== CHECKOUT ========== */}
      <Section className="py-16 md:py-24 bg-white" id="checkout">
        <div className="max-w-xl mx-auto px-5">
          <div className="text-center mb-8">
            <p className="text-[#F5A624] font-bold text-sm mb-2">הצעד הבא שלך</p>
            <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl mb-2">מוכן להתחיל?</h2>
            <p className="text-[#4B5563] text-base">מלא את הפרטים ותקבל גישה מיידית לקורס.</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#faf9f6] p-6 md:p-8 shadow-sm">
            {/* Price */}
            <div className="text-center mb-6">
              <span className="text-[#9CA3AF] line-through text-xl">₪490</span>
              <span className="text-[#F5A624] font-black text-4xl mx-3">₪{finalPrice}</span>
              {couponApplied && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[#10B981] text-sm font-bold">{couponApplied.code} — {couponApplied.label}</span>
                  <button onClick={() => { setCouponApplied(null); setCoupon('') }} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                </div>
              )}
              <p className="text-[#9CA3AF] text-sm mt-1">תשלום חד-פעמי · גישה לכל החיים</p>
            </div>

            {/* Form */}
            <div className="space-y-3 mb-4">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] transition-all" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] transition-all text-left" />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d\-\s+()]/g, ''))} placeholder="050-0000000" dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] transition-all text-left" />

              {!couponApplied && (
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleCouponCheck()} placeholder="קוד קופון" dir="ltr"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1a1a1a] text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] transition-all text-left" />
                  <button onClick={() => handleCouponCheck()} disabled={couponLoading}
                    className="px-5 py-3 rounded-xl bg-[#F5A624]/10 border border-[#F5A624]/30 text-[#F5A624] font-bold text-sm hover:bg-[#F5A624]/20 transition-all">
                    {couponLoading ? <Loader2 size={16} className="animate-spin" /> : 'החל'}
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
            </div>

            <button onClick={handlePay} disabled={loading}
              className="w-full py-4 rounded-xl bg-[#F5A624] text-white font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 shadow-md mb-3">
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 size={20} className="animate-spin" />רגע...</span> : `לתשלום מאובטח — ₪${finalPrice}`}
            </button>

            <p className="text-center text-gray-400 text-[10px] leading-relaxed mb-2">
              בלחיצה אני מאשר/ת את{' '}
              <button type="button" onClick={() => setLegalModal('terms')} className="underline hover:text-gray-500">תנאי השימוש</button>
              {' '}ו<button type="button" onClick={() => setLegalModal('privacy')} className="underline hover:text-gray-500">מדיניות הפרטיות</button>
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1 text-gray-400 text-[11px]"><Lock size={11} /><span>SSL מאובטח</span></div>
              <div className="flex items-center gap-1 text-gray-400 text-[11px]"><ShieldCheck size={11} /><span>PCI DSS</span></div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-3">
                {error === 'EMAIL_EXISTS' ? (
                  <p>האימייל כבר רשום. <a href="https://course.porsimkanaf.com" target="_blank" className="underline font-bold">היכנס לקורס</a></p>
                ) : <p>{error}</p>}
              </div>
            )}

            {/* Guarantee */}
            <div className="mt-6 p-4 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-[#10B981]" />
                <span className="text-[#10B981] font-bold text-sm">אחריות מלאה — 7 ימים</span>
              </div>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                אם לא הרגשת שקיבלת ערך — החזר מלא. בלי שאלות. אין לך מה להפסיד.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== FAQ ========== */}
      <Section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl text-center mb-10">שאלות נפוצות</h2>
          <div className="space-y-3">
            {[
              { q: 'זה מרגיש לי יקר', a: 'טעות אחת בהלוואה או כסף שיושב בעו"ש ומאבד ערך — עולה אלפי שקלים בשנה. הקורס עולה פחות מארוחה זוגית ונשאר איתך לכל החיים.' },
              { q: 'למה לא ללמוד מיוטיוב?', a: 'ביוטיוב אתה מקבל חתיכות בלי סדר. כאן אתה מקבל מערכת שלמה — מא׳ עד ת׳ — שבנויה לתת לך תוצאות.' },
              { q: 'מה אם זה לא מתאים לי?', a: 'יש אחריות מלאה של 7 ימים. לא הרגשת ערך — החזר מלא, בלי שאלות.' },
              { q: 'כמה זמן זה לוקח?', a: '3 שעות. 58 שיעורים קצרים. אפשר לסיים ביום אחד או בקצב שלך.' },
              { q: 'צריך ידע מוקדם?', a: 'אפס. מתחילים מ"מה זה כסף" ובונים משם.' },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* ========== FOOTER CTA ========== */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-black text-[#1a1a1a] text-2xl md:text-3xl mb-4">קח אותי לשלב הבא</h2>
          <p className="text-[#4B5563] text-lg mb-8">3 שעות שיחסכו לך עשור של טעויות.</p>
          <a href="#checkout"
            className="inline-flex items-center gap-2 bg-[#F5A624] text-white font-black text-lg px-10 py-5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg">
            אני מתחיל עכשיו
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center bg-[#faf9f6]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/logo.png" alt="" width={20} height={20} className="w-5 h-5 object-contain" />
          <span className="text-gray-400 text-sm">פורשים כנף</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <button onClick={() => setLegalModal('terms')} className="text-gray-400 text-xs hover:text-gray-500">תנאי שימוש</button>
          <span className="text-gray-200">·</span>
          <button onClick={() => setLegalModal('privacy')} className="text-gray-400 text-xs hover:text-gray-500">מדיניות פרטיות</button>
          <span className="text-gray-200">·</span>
          <button onClick={() => setLegalModal('accessibility')} className="text-gray-400 text-xs hover:text-gray-500">נגישות</button>
        </div>
        <p className="text-gray-300 text-xs">© 2026 כל הזכויות שמורות</p>
      </footer>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-right gap-3">
        <span className="font-bold text-[#1a1a1a] text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} className="text-gray-400" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="text-[#4B5563] text-base leading-relaxed px-5 pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
