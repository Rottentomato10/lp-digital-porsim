'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Check, ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, Lock, Loader2, X, VolumeX, Volume2, Sparkles, GraduationCap, Users, TrendingUp, Brain, Building, PiggyBank } from 'lucide-react'
import { LegalModal, type ModalType } from '@/components/d/DLegalModal'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'

const BASE_PRICE = 390
const ACCENT = "#D4A843" // Gold accent

function FadeSection({ children, className = '', id, delay = 0, style }: { children: React.ReactNode; className?: string; id?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section ref={ref} id={id} style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.section>
  )
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function LP2Page() {
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

  // Force dark mode on /join
  useEffect(() => {
    document.documentElement.classList.remove('light-mode')
    return () => { document.documentElement.classList.remove('light-mode') }
  }, [])

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
    try {
      const checkRes = await fetch('/api/check-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) })
      const checkData = await checkRes.json()
      if (checkData.exists) { setError('EMAIL_EXISTS'); setLoading(false); return }
    } catch {}
    if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'InitiateCheckout', { value: finalPrice, currency: 'ILS' })
    if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'begin_checkout', { value: finalPrice, currency: 'ILS' })
    fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), coupon: couponApplied?.code || '', source: '/join' }) }).catch(() => {})
    try {
      const res = await fetch('/api/cardcom', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() || '0500000000', coupon: couponApplied?.code || '', marketingConsent: true, source: '/join' }) })
      const data = await res.json()
      if (!res.ok || !data.url) { setError(data.error || 'אירעה שגיאה'); setLoading(false); return }
      setIframeUrl(data.url); setLoading(false)
    } catch { setError('שגיאה בתקשורת'); setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#071020] text-white overflow-x-hidden" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* CardCom Modal */}
      {iframeUrl && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-6" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="relative w-full md:max-w-2xl bg-[#071020] md:rounded-2xl overflow-hidden shadow-2xl h-[100dvh] md:h-auto md:max-h-[92vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#071020] sticky top-0 z-10">
              <div className="flex items-center gap-2"><Lock size={13} className="text-green-500" /><span className="text-white/80 text-sm">תשלום מאובטח</span></div>
              <button onClick={() => setIframeUrl(null)} className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center"><X size={18} className="text-white/70" /></button>
            </div>
            <iframe src={iframeUrl} className="w-full border-0" style={{ height: 'calc(100dvh - 52px)', minHeight: '500px' }} allow="payment" />
          </div>
        </div>
      )}
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden" style={{ background: "#0A1628" }}>
        {/* Animated gradient orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }} />
        <motion.div animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-30%] left-[-15%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #F5A624, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-5 pt-10 pb-16 md:pt-16 md:pb-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="flex justify-center mb-3">
            <Image src="/logo.png" alt="פורשים כנף" width={100} height={100} className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_40px_rgba(212,168,67,0.3)]" priority />
          </motion.div>

          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <p className="text-[#D4A843] text-base md:text-lg font-bold mb-8">
                הכנסנו חינוך פיננסי למערכת החינוך - ועכשיו אנחנו גם כאן בשבילך
              </p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              className="font-black text-white leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}>
              הקורס שמשנה את הדרך
              <br /><span className="relative">
                <span className="text-[#D4A843]">שבה צעירים מבינים כסף</span>
                <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[#D4A843]/20 rounded-full origin-right" />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              שינינו את זה שאין חינוך פיננסי במערכת החינוך.
              <br />עכשיו - יש חינוך פיננסי גם אונליין.
              <br />בסוף הקורס תבין כסף יותר טוב מרוב האנשים סביבך.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <p className="text-white/80 text-lg md:text-xl font-bold mb-5">שתי דקות שישנו לך את הראש - צפה עד הסוף ↓</p>
              <LP2Video />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }}>
              <a href="#checkout"
                className="inline-flex items-center gap-2 bg-[#10B981] text-white font-black text-lg px-10 py-4 rounded-full hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
                אני רוצה להתחיל
              </a>
            </motion.div>
            <p className="text-white/35 text-sm mt-4">* הטקסט כתוב בלשון זכר לנוחות אך מיועד לכל המינים</p>
          </div>
        </div>
      </section>

      {/* ═══════════ PROBLEM ═══════════ */}
      <FadeSection className="py-16 md:py-24 bg-[#071020]">
        <div className="max-w-3xl mx-auto px-5">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-black text-white text-2xl md:text-4xl leading-snug mb-8">
            אם הגעת לדף הזה...
          </motion.h2>
          <div className="space-y-5 text-white text-lg md:text-xl leading-relaxed">
            <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              אתה עובד, מרוויח - אולי אפילו חוסך קצת - אבל <strong className="text-white">עמוק בפנים אתה יודע שאתה לא באמת שולט</strong>.
            </motion.p>
            <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              כולם מסביבך מדברים על השקעות, פנסיה, מיסים - ואתה מנהן בראש כאילו אתה מבין, <strong className="text-white">אבל מרגיש שהולך לאיבוד.</strong>
            </motion.p>
            <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              אולי ניסית ללמוד מיוטיוב, אבל אחרי 20 סרטונים אתה עדיין באותו מקום.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="bg-[#D4A843]/5 border border-[#D4A843]/20 rounded-2xl p-8 md:p-10 my-8 text-center">
              <p className="text-[#D4A843] font-black mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>וזה לא אשמתך.</p>
              <p className="text-white/80 text-lg md:text-xl">12 שנה במערכת החינוך. אף שיעור אחד על כסף.<br />המערכת פשוט שכחה את הפרק הכי חשוב בחיים שלך.</p>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
              className="text-[#D4A843] font-bold text-lg md:text-xl text-center">
              זה לא עוד קורס באינטרנט. זה תיקון של מה שהמערכת הזניחה.
            </motion.p>
          </div>
        </div>
      </FadeSection>

      {/* ═══════════ WHO WE ARE ═══════════ */}
      <FadeSection className="py-16 md:py-24" style={{ background: "#112240" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <Image src="/logo.png" alt="" width={100} height={100} className="w-24 h-24 md:w-28 md:h-28 object-contain mx-auto mb-5 drop-shadow-[0_0_40px_rgba(212,168,67,0.25)]" />
            <h2 className="font-black text-white text-2xl md:text-4xl leading-snug">
              תיקנו את מה שהמערכת שכחה.
              <br />עכשיו אנחנו כאן בשביל <span className="text-[#D4A843]">כל מי שלא עבר את זה</span>.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-white text-lg leading-relaxed mb-4">
              כל מה שאותך לא לימדו - עכשיו קיים במאות בתי ספר, יחידות צבאיות ומכינות ברחבי הארץ. בין השאר - <strong className="text-white">בזכותנו</strong>.
            </p>
            <p className="text-white text-lg leading-relaxed mb-4">
              כחלק מ<strong className="text-white">תוכניות גפ״ן - תוכניות ההעשרה של משרד החינוך</strong>, העברנו את הסדנה ל-15,000 תלמידים ותלמידות. הפידבק היה מטורף. הבנו שאנחנו חייבים להפיץ את הבשורה ולהגיע לכולם - גם למי שלא עבר את זה דרך בית הספר.
            </p>
            <p className="text-white text-lg leading-relaxed font-medium">
              אז בנינו את הקורס הדיגיטלי. 58 שיעורים שמזקקים שנים של ניסיון בשטח לתוך 3 שעות.
            </p>
          </div>

          {/* Stats with animation */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-12">
            {[
              { num: 15000, suffix: '+', label: 'תלמידים' },
              { num: 50, suffix: '+', label: 'מוסדות חינוך' },
              { num: 5, suffix: '+', label: 'שנים בשטח' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                 className="text-center">
                <p className="text-white/70 font-black text-3xl md:text-4xl"><CountUp target={s.num} suffix={s.suffix} /></p>
                <p className="text-white/80 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-12">
            <a href="#pricing" className="cta-shine inline-flex items-center bg-[#D4A843] text-black font-black text-lg px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mt-6">
              אני רוצה להתחיל
            </a>
          </div>

          {/* Founders */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'דקל קאפח', role: 'מייסד שותף', image: '/dekel.jpg', bio: 'מתכנן פיננסי (CFP) שחי את עולם ההשקעות והניהול הכלכלי. מתרגם מושגים פיננסיים מורכבים לכלים פשוטים ליישום. מתמקד בשורה התחתונה ובתוצאות בשטח.' },
              { name: 'אביתר דנגור', role: 'מייסד שותף', image: '/evyatar.jpeg', bio: 'תואר בכלכלה וניסיון פדגוגי עשיר. הופך ידע כלכלי מורכב לתוכנית עבודה פשוטה. הוביל את הכנסת החינוך הפיננסי ב-50+ מוסדות חינוך ברחבי הארץ.' },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex gap-4 p-5 rounded-2xl border border-[#D4A843]/15 bg-[#071020] shadow-sm">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#D4A843]/20">
                  <Image src={p.image} alt={p.name} width={200} height={200} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">{p.name}</p>
                  <p className="text-white/70 text-sm font-medium mb-1">{p.role} · פורשים כנף</p>
                  <p className="text-white/70 text-sm leading-relaxed">{p.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════════ WHAT YOU GET ═══════════ */}
      <FadeSection className="py-16 md:py-24 bg-[#071020]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-black text-white text-2xl md:text-4xl mb-3">
              איך הפכנו חומר יבש ל<span className="text-white/70">מערכת הפעלה פשוטה</span>
            </h2>
            <p className="text-white/70 text-base max-w-xl mx-auto">לא עוד קורס תיאורטי. מערכת שלמה שנותנת לך שליטה אמיתית על הכסף שלך.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GraduationCap, title: '58 שיעורים מצולמים', desc: '3 שעות. קצר, ממוקד, בלי חפירות.' },
              { icon: TrendingUp, title: 'אפליקציית ניהול תזרים', desc: 'כלי מעשי - תדע בדיוק לאן הולך כל שקל.' },
              { icon: Users, title: 'קהילה + ליווי צמוד', desc: 'קבוצת וואטסאפ. שאלות, עדכונים, אנחנו זמינים.' },
              { icon: Sparkles, title: 'תעודת מנכ"ל פיננסי', desc: 'כי הידע הזה שווה הכרה.' },
              { icon: Brain, title: 'ידע לכל החיים', desc: 'מתלוש שכר ועד תיק השקעות. הכל.' },
              { icon: Lock, title: 'גישה לצמיתות', desc: 'תשלום אחד. בלי מנוי. כולל עדכונים.' },
            ].map((item, i) => (
              <motion.div key={i} 
                
                className="p-5 rounded-2xl border border-white/5 bg-[#112240] hover:border-[#D4A843]/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#D4A843]/10 flex items-center justify-center mb-3 group-hover:bg-[#D4A843]/20 transition-colors">
                  <item.icon size={20} className="text-[#D4A843]" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                <p className="text-white text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════════ CURRICULUM ═══════════ */}
      <FadeSection className="py-16 md:py-24" style={{ background: "linear-gradient(180deg, #0B0114, rgba(255,255,255,0.04))" }}>
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-[#D4A843] font-bold text-sm mb-3">תוכנית הלימודים</p>
            <h2 className="font-black text-white text-2xl md:text-4xl">3 שלבים. 58 שיעורים. <span className="text-white/70">שליטה מלאה.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'היסודות', subtitle: 'להבין את שפת הכסף', color: '#F5A624', icon: PiggyBank,
                lessons: ['מה זה כסף ולמה משלמים לך', 'כל זכויות העובד שלך', 'לאן נעלם הכסף בתלוש', 'איך הבנק מרוויח ממך', 'אינפלציה וריבית'],
                outcome: 'תדע לקרוא תלוש שכר, לעמוד מול הבנק, ולהבין לאן כל שקל הולך.' },
              { num: '2', title: 'הצמיחה', subtitle: 'עוברים להתקפה', color: '#D4A843', icon: TrendingUp,
                lessons: ['השקעות וריבית דריבית', 'מניות, מדדים, קרנות סל', 'איך משקיעים בפועל', 'נדל"ן ומשכנתא'],
                outcome: 'תדע להשקיע בעצמך - בלי צורך באף אחד ובלי לפחד.' },
              { num: '3', title: 'המנכ"לים', subtitle: 'בונים מערכת', color: '#8B5CF6', icon: Brain,
                lessons: ['ניהול תזרים ותקציב', 'פנסיה, קה"ש והטבות מס', 'מערכת הפעלה שנתית', 'פסיכולוגיה של כסף'],
                outcome: 'תצא עם תוכנית פעולה שנתית ומערכת שתרוץ לבד.' },
            ].map((stage, i) => (
              <motion.div key={i} 
                
                className="rounded-2xl border-2 bg-[#071020] overflow-hidden hover:shadow-lg transition-all flex flex-col"
                style={{ borderColor: `${stage.color}30` }}>
                <div className="p-5 text-center border-b" style={{ borderColor: `${stage.color}15`, background: `${stage.color}08` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: `${stage.color}15` }}>
                    <stage.icon size={24} style={{ color: stage.color }} />
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full text-white" style={{ background: stage.color }}>שלב {stage.num}</span>
                  <h3 className="font-black text-white text-lg mt-2">{stage.title}</h3>
                  <p className="text-white/80 text-sm">{stage.subtitle}</p>
                </div>
                <div className="p-5 space-y-3 flex flex-col flex-1">
                  {stage.lessons.map((l, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 mt-0.5" style={{ background: stage.color }}>{j+1}</span>
                      <span className="text-white text-sm leading-snug">{l}</span>
                    </div>
                  ))}
                  {/* Outcome — fixed at bottom */}
                  <div className="mt-auto pt-4 border-t" style={{ borderColor: `${stage.color}15` }}>
                    <p className="text-white/70 text-sm font-medium leading-relaxed">{stage.outcome}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════════ WHATSAPP REVIEWS ═══════════ */}
      <FadeSection className="py-16 md:py-24 bg-[#071020]">
        <div className="max-w-4xl mx-auto px-5">
          <WaCarouselLight />
        </div>
      </FadeSection>

      {/* ═══════════ NOT FOR EVERYONE ═══════════ */}
      <FadeSection className="py-16 md:py-24" style={{ background: "#0B0114" }}>
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-black text-white text-2xl md:text-3xl leading-snug mb-8 text-center">
            הקורס הזה <span className="text-[#EF4444]">לא</span> בשביל כולם
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-6 rounded-2xl border border-red-500/15 bg-red-500/5">
              <p className="font-bold text-red-500 text-sm mb-4">✗ לא בשבילך אם:</p>
              <ul className="space-y-3 text-white text-base">
                <li className="flex gap-2"><span className="text-red-400">•</span>אתה מחפש להתעשר מהר</li>
                <li className="flex gap-2"><span className="text-red-400">•</span>אתה לא מוכן להשקיע 3 שעות בעצמך</li>
                <li className="flex gap-2"><span className="text-red-400">•</span>אתה חושב שכסף זה עניין של מזל</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-6 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/5">
              <p className="font-bold text-[#D4A843] text-sm mb-4">✓ כן בשבילך אם:</p>
              <ul className="space-y-3 text-white text-base">
                <li className="flex gap-2"><span className="text-[#D4A843]">•</span>אתה רוצה להבין כסף באמת ולא לנחש</li>
                <li className="flex gap-2"><span className="text-[#D4A843]">•</span>אתה מוכן לקחת אחריות על העתיד שלך</li>
                <li className="flex gap-2"><span className="text-[#D4A843]">•</span>אתה מבין שלא לדעת עולה יותר מלדעת</li>
              </ul>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="text-center mt-10">
            <a href="#checkout"
              className="inline-flex items-center gap-2 bg-[#10B981] text-white font-black text-lg px-10 py-4 rounded-full hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
              זה בדיוק בשבילי
            </a>
          </motion.div>
        </div>
      </FadeSection>

      {/* ═══════════ CHECKOUT ═══════════ */}
      <FadeSection className="py-16 md:py-24 bg-[#071020]" id="checkout">
        <div className="max-w-xl mx-auto px-5">
          <div className="text-center mb-8">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#D4A843] font-bold text-sm mb-2">הצעד הבא שלך</motion.p>
            <h2 className="font-black text-white text-2xl md:text-3xl mb-2">מוכן להתחיל?</h2>
            <p className="text-white text-base">מלא את הפרטים ותקבל גישה מיידית לקורס.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#112240] p-6 md:p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-white/80 line-through text-xl">₪490</span>
              <span className="text-[#D4A843] font-black text-4xl mx-3">₪{finalPrice}</span>
              {couponApplied && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[#D4A843] text-sm font-bold">{couponApplied.code} - {couponApplied.label}</span>
                  <button onClick={() => { setCouponApplied(null); setCoupon('') }} className="text-white/70 hover:text-gray-600"><X size={14} /></button>
                </div>
              )}
              <p className="text-white/80 text-sm mt-1">תשלום חד-פעמי · גישה לצמיתות</p>
            </div>

            <div className="space-y-3 mb-4">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי"
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#071020] text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] focus:ring-2 focus:ring-[#00D4FF]/20 transition-all" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" dir="ltr"
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#071020] text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] focus:ring-2 focus:ring-[#00D4FF]/20 transition-all text-left" />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d\-\s+()]/g, ''))} placeholder="050-0000000" dir="ltr"
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-[#071020] text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] focus:ring-2 focus:ring-[#00D4FF]/20 transition-all text-left" />
              {!couponApplied && (
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleCouponCheck()} placeholder="קוד קופון" dir="ltr"
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-[#071020] text-sm placeholder:text-white/40 focus:outline-none focus:border-[#D4A843] transition-all text-left" />
                  <button onClick={() => handleCouponCheck()} disabled={couponLoading}
                    className="px-5 py-3 rounded-xl bg-[#D4A843]/10 border border-[#D4A843]/30 text-[#D4A843] font-bold text-sm hover:bg-[#D4A843]/20 transition-all">
                    {couponLoading ? <Loader2 size={16} className="animate-spin" /> : 'החל'}
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs">{couponError}</p>}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer mb-4">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-[#10B981]" />
              <span className="text-white/40 text-xs">אני מאשר/ת קבלת עדכונים ותכנים שיווקיים באימייל. ניתן לבטל בכל עת.</span>
            </label>

            <button onClick={handlePay} disabled={loading}
              className="w-full py-4 rounded-xl bg-[#10B981] text-white font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 shadow-[0_4px_20px_rgba(16,185,129,0.3)] mb-3">
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 size={20} className="animate-spin" />רגע...</span> : `לתשלום מאובטח - ₪${finalPrice}`}
            </button>

            <p className="text-center text-white/70 text-[10px] leading-relaxed mb-2">
              בלחיצה אני מאשר/ת את{' '}
              <button type="button" onClick={() => setLegalModal('terms')} className="underline hover:text-white/80">תנאי השימוש</button>
              {' '}ו<button type="button" onClick={() => setLegalModal('privacy')} className="underline hover:text-white/80">מדיניות הפרטיות</button> וקבלת עדכונים באימייל
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1 text-white/70 text-[11px]"><Lock size={11} /><span>SSL מאובטח</span></div>
              <div className="flex items-center gap-1 text-white/70 text-[11px]"><ShieldCheck size={11} /><span>PCI DSS</span></div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-3">
                {error === 'EMAIL_EXISTS' ? <p>האימייל כבר רשום. <a href="https://course.porsimkanaf.com" target="_blank" className="underline font-bold">היכנס לקורס</a></p> : <p>{error}</p>}
              </div>
            )}

            <div className="mt-6 p-4 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-[#D4A843]" />
                <span className="text-[#D4A843] font-bold text-sm">אחריות מלאה - 7 ימים</span>
              </div>
              <p className="text-white text-sm leading-relaxed">לא הרגשת ערך - החזר מלא. בלי שאלות. בלי אותיות קטנות.</p>
            </div>
          </motion.div>
        </div>
      </FadeSection>

      {/* ═══════════ FAQ ═══════════ */}
      <FadeSection className="py-16 md:py-24" style={{ background: "#0B0114" }}>
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-black text-white text-2xl md:text-3xl text-center mb-10">שאלות ותשובות</h2>
          <div className="space-y-3">
            {[
              { q: 'זה אמיתי?', a: 'אנחנו לא עוד פרסומת באינטרנט. אנחנו יזמים שבאו לתקן את מה שמערכת החינוך השאירה מאחור. עשינו את זה בשטח - 15,000 תלמידים ב-300 כיתות, כחלק מתוכניות משרד החינוך. עכשיו אנחנו מביאים את אותו הידע בדיוק גם למי שלא עבר את זה בבית הספר. אין פה קסמים - יש פה כלים אמיתיים לחיים האמיתיים.', open: true },
              { q: 'זה מרגיש לי יקר', a: 'טעות אחת בהלוואה, ריבית שלא בדקת, כסף שיושב בעו"ש ומאבד ערך - עולה אלפי שקלים בשנה. הקורס עולה פחות מארוחה זוגית ונשאר איתך לכל החיים.' },
              { q: 'למה לא ללמוד מיוטיוב?', a: 'ביוטיוב אתה מקבל חתיכות מפוזרות בלי סדר. כאן אתה מקבל מערכת שלמה - מא׳ עד ת׳ - שבנויה לתת לך תוצאות.' },
              { q: 'מה אם זה לא מתאים לי?', a: 'יש אחריות מלאה של 7 ימים. לא הרגשת ערך - החזר מלא. בלי שאלות. אין לך מה להפסיד.' },
              { q: 'אתם לא עוד קורס שמבטיח להתעשר?', a: 'ממש לא. ואם מישהו מבטיח לך את זה — אולי כדאי לברוח.\nאנחנו מלמדים אותך להבין איך כסף עובד. זה לא סקסי — אבל זה מה שבאמת גורם לך לחשוב אחרת.' },
              { q: 'אין לי הרבה כסף - זה רלוונטי?', a: 'דווקא בגלל זה. הרבה פעמים כשההכנסה גדלה, ההוצאות גדלות איתה — ואתה נשאר באותו מקום. הקורס מלמד אותך לנהל כסף נכון מלכתחילה, ככה שגם כשתרוויח יותר — תרגיש את ההבדל.' },
              { q: 'כמה זמן הקורס?', a: '3 שעות. 58 שיעורים קצרים. אפשר לסיים ביום אחד או בקצב שלך.' },
              { q: 'צריך רקע כלשהו?', a: 'אפס. מתחילים מ"מה זה כסף" ובונים משם. אם היה לך את הידע - לא היית צריך אותנו.' },
              { q: 'מה ההבדל בינכם ליועץ פיננסי?', a: 'יועץ אומר לך מה לעשות. אנחנו מלמדים אותך להבין למה. כשאתה מבין - אתה לא צריך לשלם למישהו שיגיד לך מה לעשות עם הכסף שלך.' },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} defaultOpen={(item as any).open} />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════════ FOOTER CTA ═══════════ */}
      <section className="py-16 md:py-24 bg-[#071020] text-center relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }} />
        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <h2 className="font-black text-white text-2xl md:text-4xl mb-4">קח אותי לשלב הבא</h2>
          <p className="text-white text-lg mb-8">3 שעות שיחסכו לך עשור של טעויות.</p>
          <a href="#checkout"
            className="inline-flex items-center gap-2 bg-[#10B981] text-white font-black text-xl px-12 py-5 rounded-full hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_25px_rgba(16,185,129,0.3)]">
            אני מתחיל עכשיו
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center bg-[#071020]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/logo.png" alt="" width={20} height={20} className="w-5 h-5 object-contain" />
          <span className="text-white/70 text-sm">פורשים כנף</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <button onClick={() => setLegalModal('terms')} className="text-white/70 text-xs hover:text-white/80">תנאי שימוש</button>
          <span className="text-gray-200">·</span>
          <button onClick={() => setLegalModal('privacy')} className="text-white/70 text-xs hover:text-white/80">מדיניות פרטיות</button>
          <span className="text-gray-200">·</span>
          <button onClick={() => setLegalModal('accessibility')} className="text-white/70 text-xs hover:text-white/80">נגישות</button>
        </div>
        <p className="text-white/40 text-xs">© 2026 כל הזכויות שמורות</p>
      </footer>

      <AccessibilityWidget />
      <LightCookieConsent />
    </div>
  )
}

// ═══════ VIDEO PLAYER ═══════
function LP2Video() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const v = videoRef.current; if (!v) return
    v.muted = true

    const markPlaying = () => setIsPlaying(true)
    const onTimeFirst = () => { markPlaying(); v.removeEventListener('timeupdate', onTimeFirst) }
    v.addEventListener('timeupdate', onTimeFirst)

    // Multiple play attempts for in-app browsers (Instagram/Facebook WebView)
    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    setTimeout(tryPlay, 500)
    setTimeout(tryPlay, 1500)

    // Tap anywhere to play (in-app browsers require user gesture)
    const playOnTouch = () => { tryPlay(); document.removeEventListener('touchstart', playOnTouch) }
    document.addEventListener('touchstart', playOnTouch, { once: true })

    // Fallback: hide cover after 3s
    const fallback = setTimeout(markPlaying, 3000)

    return () => { clearTimeout(fallback); v.removeEventListener('timeupdate', onTimeFirst); document.removeEventListener('touchstart', playOnTouch) }
  }, [])

  return (
    <div className="mx-auto mb-8" style={{ maxWidth: '280px' }}>
      <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '240/426', border: '2px solid rgba(212,168,67,0.25)' }}>
        <video ref={videoRef} playsInline loop muted autoPlay preload="metadata" className="absolute inset-0 w-full h-full object-cover" src="/video.mp4" poster="/video-poster.jpg" />

        {/* Cover until video starts — tap to play on in-app browsers */}
        {!isPlaying && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: 'radial-gradient(ellipse at center, #0A1628 0%, #071020 70%)' }}
            onClick={() => {
              const v = videoRef.current
              if (v) { v.muted = true; v.play().then(() => setIsPlaying(true)).catch(() => {}) }
            }}
          >
            <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#D4A843] text-2xl font-black">▶ צפה עכשיו</motion.span>
          </div>
        )}

        {/* Sound button */}
        <button onClick={() => { if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted) } }}
          className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2.5 min-h-[44px] border border-white/15 transition-all hover:bg-black/75 active:scale-95">
          {isMuted ? <VolumeX size={16} className="text-white/80" /> : <Volume2 size={16} className="text-[#D4A843]" />}
          <span className={`text-xs font-semibold ${isMuted ? 'text-white/80' : 'text-[#D4A843]'}`}>{isMuted ? 'לחץ לסאונד' : 'עם סאונד'}</span>
        </button>
      </div>
    </div>
  )
}

// ═══════ WHATSAPP CAROUSEL ═══════
function WaCarouselLight() {
  const [active, setActive] = useState(0)
  const imgs = ['/review1.jpg','/review2.jpg','/review3.jpg','/review4.jpg','/review5.jpg','/review6.jpg','/review7.jpg','/review8.jpg','/review9.jpg']
  const total = imgs.length
  const prev = () => setActive(a => (a - 1 + total) % total)
  const next = () => setActive(a => (a + 1) % total)
  const getPos = (i: number) => { const d = ((i-active)%total+total)%total; return d===0?0:d===1?1:d===total-1?-1:2 }
  return (
    <div dir="ltr" className="relative" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="relative flex items-center justify-center" style={{ height: '220px' }}>
        {imgs.map((src, i) => {
          const pos = getPos(i)
          return (
            <div key={i} className="absolute transition-all duration-500 ease-out cursor-pointer"
              onClick={() => { if (pos===-1) prev(); if (pos===1) next() }}
              style={{ width:'55%', transform:`translateX(${pos*75}%) scale(${pos===0?1:0.8})`, opacity:Math.abs(pos)>1?0:1,
                filter:pos===0?'none':'blur(3px) brightness(0.6)', zIndex:pos===0?10:1, pointerEvents:Math.abs(pos)>1?'none':'auto' }}>
              <div className={`rounded-2xl overflow-hidden border-2 ${pos===0?'border-[#D4A843]/40 shadow-lg':'border-white/10'}`}>
                <Image src={src} alt="ביקורת" width={600} height={300} className="w-full h-auto" priority />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4A843] hover:border-[#D4A843]/30 transition-all"><ChevronLeft size={18} /></button>
        <button onClick={next} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4A843] hover:border-[#D4A843]/30 transition-all"><ChevronRight size={18} /></button>
      </div>
    </div>
  )
}

// ═══════ COOKIE CONSENT (LIGHT) ═══════
function LightCookieConsent() {
  const [show, setShow] = useState(false)
  useEffect(() => { if (!localStorage.getItem('pk_cookie_consent')) setShow(true) }, [])
  if (!show) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:right-auto md:max-w-md z-[999]">
        <div className="rounded-2xl border border-white/10 p-5 bg-[#071020] shadow-xl">
          <p className="text-white text-sm font-bold mb-2">🍪 מדיניות עוגיות</p>
          <p className="text-white text-sm leading-relaxed mb-3">אתר זה משתמש בעוגיות לשיפור חוויית הגלישה, ניתוח תנועה ולצרכי שיווק.</p>
          <div className="flex items-center gap-2">
            <button onClick={() => { localStorage.setItem('pk_cookie_consent', 'all'); setShow(false) }} className="flex-1 bg-[#10B981] text-white font-black text-sm py-2.5 rounded-xl hover:brightness-110 transition-all">מאשר הכל ✓</button>
            <button onClick={() => { localStorage.setItem('pk_cookie_consent', 'essential'); setShow(false) }} className="text-white/70 text-xs hover:text-gray-600 px-3 py-2.5">הכרחיות בלבד</button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ═══════ FAQ ITEM ═══════
function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="rounded-xl border border-white/10 bg-[#071020] overflow-hidden hover:border-[#D4A843]/20 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-right gap-3">
        <span className="font-bold text-white text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={18} className="text-white/70" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="text-white text-base leading-relaxed px-5 pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

