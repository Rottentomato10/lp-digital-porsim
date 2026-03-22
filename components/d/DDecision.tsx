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

const DEADLINE_KEY = 'pk_price_deadline'
const DURATION_MS  = 23 * 60 * 60 * 1000 + 47 * 60 * 1000 // ~23h 47m for realism

function useDeadline() {
  const [deadline, setDeadline] = useState<number | null>(null)
  useEffect(() => {
    const stored = localStorage.getItem(DEADLINE_KEY)
    if (stored) {
      const d = parseInt(stored)
      if (d > Date.now()) { setDeadline(d); return }
    }
    const d = Date.now() + DURATION_MS
    localStorage.setItem(DEADLINE_KEY, String(d))
    setDeadline(d)
  }, [])
  return deadline
}

function Countdown() {
  const deadline = useDeadline()
  const [parts, setParts] = useState({ h: 23, m: 47, s: 0 })

  useEffect(() => {
    if (!deadline) return
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now())
      setParts({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div dir="ltr" className="flex items-center gap-1 font-mono font-black text-[#F5A624]" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
      <span>{pad(parts.h)}</span>
      <span className="text-[#F5A624]/40 text-sm">:</span>
      <span>{pad(parts.m)}</span>
      <span className="text-[#F5A624]/40 text-sm">:</span>
      <span>{pad(parts.s)}</span>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-white/6 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-right gap-3 group">
        <span className="text-white/65 font-medium text-sm group-hover:text-white transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
          className="flex-shrink-0 text-[#F5A624]/50"><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-white/40 text-sm leading-relaxed pb-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DDecision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

          {/* RIGHT — Price card */}
          <div className="relative rounded-2xl border border-[#F5A624]/30 bg-[#0D0B00] overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(245,166,36,0.1)' }}>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

            {/* Countdown banner */}
            <div className="bg-[#F5A624]/10 border-b border-[#F5A624]/15 px-5 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[#F5A624] font-black text-xs tracking-wide uppercase leading-none mb-0.5">מחיר השקה</p>
                <p className="text-white/35 text-xs">המחיר זמין רק לעוד</p>
              </div>
              <Countdown />
            </div>

            <div className="p-7 md:p-8">

              {/* Promo badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-[#F5A624] text-black font-black text-xs px-3 py-1 rounded-full">
                  חסכת ₪{contentD.pricing.price_original - contentD.pricing.price}
                </span>
                <span className="text-white/25 text-xs">מהמחיר המלא</span>
              </div>

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

              {/* Price */}
              <div className="text-center mb-5">
                <p className="text-white/25 text-xs mb-1">{contentD.pricing.price_note}</p>
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-black" style={{
                      fontSize: 'clamp(3rem, 9vw, 4.5rem)',
                      background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>₪{contentD.pricing.price}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a href={CHECKOUT_URL}
                className="cta-glow block w-full text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
                {contentD.pricing.cta}
              </a>
              <p className="text-center text-white/25 text-xs mb-5">{contentD.pricing.cta_sub}</p>

              {/* Guarantee */}
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
                <ShieldCheck size={20} className="text-[#F5A624] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F5A624] text-xs font-black uppercase tracking-widest mb-1">אחריות מלאה 7 ימים</p>
                  <p className="text-white/60 text-sm leading-relaxed">{contentD.pricing.guarantee}</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mt-6">
          {[
            { target: 15000, suffix: '+', label: 'צעירים למדו' },
            { target: 3,     suffix: '+', label: 'שעות תוכן'   },
            { target: 7,     suffix: '',  label: 'ימי אחריות'  },
          ].map((s, i) => (
            <div key={i} className="text-center py-4 rounded-xl bg-[#101010] border border-white/6">
              <p className="font-black text-[#F5A624] text-lg">
                <CountUp target={s.target} suffix={s.suffix} />
              </p>
              <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
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
          <p className="mt-3 text-white/20 text-xs">{contentD.finalCta.sub}</p>
        </motion.div>

      </div>
    </section>
  )
}
