'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { useContent, useCheckoutUrl } from '@/lib/content-context'

const WINDOW_MS = 72 * 60 * 60 * 1000
const DEADLINE_KEY = 'pk_offer_deadline'

function getOrCreateDeadline(): number {
  const stored = localStorage.getItem(DEADLINE_KEY)
  if (stored) { const d = parseInt(stored); if (d > Date.now()) return d }
  const d = Date.now() + WINDOW_MS
  localStorage.setItem(DEADLINE_KEY, String(d))
  return d
}

function useCountdown() {
  const [parts, setParts] = useState({ h: 0, m: 0, s: 0 })
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    const dl = getOrCreateDeadline()
    if (Date.now() >= dl) { setExpired(true); return }
    const tick = () => {
      const diff = dl - Date.now()
      if (diff <= 0) { setExpired(true); return }
      setParts({ h: Math.floor(diff / 3_600_000), m: Math.floor((diff % 3_600_000) / 60_000), s: Math.floor((diff % 60_000) / 1_000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return { parts, expired }
}

const VALUE_ITEMS = [
  { label: 'קורס פיננסים לצעירים — א׳ עד ת׳', value: 490, desc: null },
  { label: 'אפליקציית ניהול תזרים אישי', value: 200, desc: 'כדי שלא תצטרך לבנות אקסלים מסובכים בעצמך' },
  { label: 'תעודת סיום פורשים כנף', value: 150, desc: null },
  { label: 'גישה לקהילה הפרטית שלנו', value: 300, desc: 'כי הרבה יותר קל כשיש איפה לשאול שאלות בזמן אמת' },
]

export default function N4Pricing() {
  const contentD = useContent()
  const CHECKOUT_URL = useCheckoutUrl()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { parts, expired } = useCountdown()
  const currentPrice = expired ? contentD.pricing.price_original : contentD.pricing.price
  const totalValue = VALUE_ITEMS.reduce((s, i) => s + i.value, 0)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,36,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">הגיע הזמן להחליט</span>
          <h2 className="mt-4 font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            כל מה שאתה צריך לדעת —<br />במקום אחד.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-[#F5A624]/30 bg-[#0D0B00] overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(245,166,36,0.08)' }}>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

          {!expired && (
            <div className="bg-[#F5A624]/10 border-b border-[#F5A624]/15 px-5 py-4 flex items-center justify-between gap-3">
              <p className="text-[#F5A624] font-black text-sm md:text-base">המחיר עולה ל-₪{contentD.pricing.price_original} בעוד:</p>
              <div dir="ltr" className="font-mono font-black text-[#F5A624] text-lg md:text-xl">
                {pad(parts.h)}:{pad(parts.m)}:{pad(parts.s)}
              </div>
            </div>
          )}

          <div className="p-5 xs:p-8 md:p-12">

            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                {!expired && <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>}
                <span className="font-black" style={{
                  fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                  background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>₪{currentPrice}</span>
              </div>
              <p className="text-white/40 text-base">{contentD.pricing.price_note}</p>
            </div>

            {/* ROI line */}
            <p className="text-center text-white/40 text-base md:text-lg mb-8">
              תכלס? זה פחות ממה שטעות אחת בכסף יכולה לעלות לך.
            </p>

            {/* CTA */}
            <a href={CHECKOUT_URL}
              className="cta-glow block w-full text-center bg-[#F5A624] text-black font-black text-lg xs:text-xl py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
              אני מתחיל עכשיו
            </a>
            <p className="text-center text-white/25 text-sm mb-10">🔒 תשלום מאובטח</p>

            {/* Value stack with descriptions */}
            <div className="mb-10">
              <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-4">מה מקבלים</p>
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
                      <p className="text-white/30 text-sm mr-6 mt-1">{item.desc}</p>
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
                <span className="text-[#F5A624] text-base font-black">₪{currentPrice}</span>
              </div>
            </div>

            {/* Guarantee */}
            <div className="p-5 xs:p-6 md:p-8 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-[#F5A624] flex-shrink-0" />
                <p className="text-[#F5A624] text-lg font-black">אחריות מלאה — 7 ימים</p>
              </div>
              <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                <p>נסה את הקורס 7 ימים.
                  <br />אם לא הרגשת שזה שווה — תקבל החזר מלא.
                  <br />בלי שאלות.</p>
                <p className="text-white/70">
                  ואם נהיה רגע כנים:
                  <br />אם אחרי 3 שעות לא תבין כסף יותר טוב מרוב האנשים — אנחנו לא ראויים לכסף שלך.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
