'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ShieldCheck } from 'lucide-react'
import { contentD, CHECKOUT_URL } from '@/lib/content-d'

// Animated counter: counts from 0 to `target` over `duration` ms when in view
function CountUp({ target, suffix = '', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count >= 1000 ? count.toLocaleString('he-IL') : count}{suffix}
    </span>
  )
}

const WINDOW_MS = 72 * 60 * 60 * 1000 // 72 שעות מהביקור הראשון
const DEADLINE_KEY = 'pk_offer_deadline'

function getOrCreateDeadline(): number {
  const stored = localStorage.getItem(DEADLINE_KEY)
  if (stored) {
    const d = parseInt(stored)
    if (d > Date.now()) return d
  }
  const d = Date.now() + WINDOW_MS
  localStorage.setItem(DEADLINE_KEY, String(d))
  return d
}

function formatDeadlineDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getDate()}.${d.getMonth() + 1}`
}

function useOfferDeadline() {
  const [deadline, setDeadline] = useState<number | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const dl = getOrCreateDeadline()
    setDeadline(dl)
    if (Date.now() >= dl) { setExpired(true); return }
    const id = setInterval(() => { if (Date.now() >= dl) { setExpired(true); clearInterval(id) } }, 1000)
    return () => clearInterval(id)
  }, [])

  return { deadline, expired }
}

function Countdown({ deadline, expired }: { deadline: number | null; expired: boolean }) {
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    if (!deadline || expired) return
    const tick = () => {
      const diff = deadline - Date.now()
      if (diff <= 0) return
      setParts({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline, expired])

  const pad = (n: number) => String(n).padStart(2, '0')

  if (expired) return (
    <span className="text-[#F5A624] font-black text-sm">המחיר עלה ל-₪{contentD.pricing.price_original}</span>
  )
  if (!deadline) return null

  return (
    <div dir="ltr" className="flex items-center gap-1 font-mono font-black text-[#F5A624]" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
      {parts.d > 0 && <><span>{parts.d}</span><span className="text-[#F5A624]/40 text-xs mx-0.5">d</span></>}
      <span>{pad(parts.h)}</span>
      <span className="text-[#F5A624]/40 text-sm">:</span>
      <span>{pad(parts.m)}</span>
      <span className="text-[#F5A624]/40 text-sm">:</span>
      <span>{pad(parts.s)}</span>
    </div>
  )
}

function FaqItem({ q, a, highlight = false }: { q: string; a: string; highlight?: boolean }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={`border-b last:border-0 ${highlight ? 'border-[#F5A624]/20' : 'border-white/6'}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-right gap-3 group">
        <span className={`font-bold text-sm transition-colors leading-snug ${highlight ? 'text-[#F5A624] group-hover:text-[#FFCD6B]' : 'text-white group-hover:text-[#F5A624]'}`}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
          className={`flex-shrink-0 ${highlight ? 'text-[#F5A624]/70' : 'text-[#F5A624]/50'}`}><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-white/60 text-sm leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DDecision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { deadline, expired } = useOfferDeadline()
  const deadlineDisplay = deadline ? formatDeadlineDate(deadline) : ''
  const currentPrice = expired ? contentD.pricing.price_original : contentD.pricing.price
  const totalValue = contentD.pricing.value_stack.reduce((s, i) => s + i.value, 0)

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,36,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">הגיע הזמן להחליט</span>
          <h2 className="mt-4 font-black text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            כל מה שצריך לדעת — במקום אחד.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* LEFT — FAQ */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#101010] border border-white/7">
            <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-5">שאלות שאולי עולות</p>
            {[...contentD.objections.items, ...(contentD.pricing.faq ?? [])].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} highlight={!!(item as any).highlight} />
            ))}
          </div>

          {/* RIGHT — Price card */}
          <div className="relative rounded-2xl border border-[#F5A624]/30 bg-[#0D0B00] overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(245,166,36,0.1)' }}>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

            {/* Banner */}
            <div className="bg-[#F5A624]/10 border-b border-[#F5A624]/15 px-5 py-4 flex items-center justify-between gap-3">
              <p className="text-[#F5A624] font-black tracking-wide uppercase leading-none"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                {expired ? 'מחיר מעודכן' : 'מחיר מיוחד'}
              </p>
              <div dir="ltr" className="font-mono font-black text-[#F5A624]"
                style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
                {expired ? `עלה ב-${deadlineDisplay}` : 'ל-72 שעות'}
              </div>
            </div>

            <div className="p-7 md:p-8">

              {/* Price — moved up */}
              <div className="text-center mb-5">
                <div className="flex items-baseline justify-center gap-3 mb-1">
                  {!expired && (
                    <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>
                  )}
                  <span className="font-black" style={{
                    fontSize: 'clamp(3rem, 9vw, 4.5rem)',
                    background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>₪{currentPrice}</span>
                </div>
                <p className="text-white/30 text-xs">{contentD.pricing.price_note}</p>
                {!expired && (
                  <p className="text-white/20 text-xs mt-0.5">חסכת ₪{contentD.pricing.price_original - contentD.pricing.price} ממחיר המלא</p>
                )}
              </div>

              {/* CTA */}
              <a href={CHECKOUT_URL}
                className="cta-glow block w-full text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
                {contentD.pricing.cta}
              </a>
              <p className="text-center text-white/25 text-xs mb-6">{contentD.pricing.cta_sub}</p>

              {/* Value stack */}
              <div className="mb-6">
                <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-3">מה מקבלים</p>
                <div className="space-y-2">
                  {contentD.pricing.value_stack.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Check size={13} className="text-[#F5A624] flex-shrink-0" />
                        <span className="text-white/70 text-sm">{item.label}</span>
                      </div>
                      <span className="text-white/30 text-xs flex-shrink-0">₪{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-white/40 text-xs">שווי כולל</span>
                  <span className="text-white/40 text-sm font-semibold line-through">₪{totalValue}</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
                <ShieldCheck size={20} className="text-[#F5A624] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F5A624] text-xs font-black uppercase tracking-widest mb-1">אחריות מלאה</p>
                  <p className="text-white/60 text-sm leading-relaxed">{contentD.pricing.guarantee}</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Final close */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-center mt-14">
          <p className="font-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>
            <span className="text-white/30 block">{contentD.finalCta.line1}</span>
            {contentD.finalCta.line2}
          </p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            {contentD.finalCta.cta}
          </a>
        </motion.div>

      </div>
    </section>
  )
}
