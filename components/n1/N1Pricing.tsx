'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { useContent, useCheckoutUrl } from '@/lib/content-context'

const WINDOW_MS = 72 * 60 * 60 * 1000
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

function useOfferDeadline() {
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    const dl = getOrCreateDeadline()
    if (Date.now() >= dl) { setExpired(true); return }
    const id = setInterval(() => { if (Date.now() >= dl) { setExpired(true); clearInterval(id) } }, 1000)
    return () => clearInterval(id)
  }, [])
  return { expired }
}

export default function N1Pricing() {
  const contentD = useContent()
  const CHECKOUT_URL = useCheckoutUrl()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { expired } = useOfferDeadline()
  const currentPrice = expired ? contentD.pricing.price_original : contentD.pricing.price
  const totalValue = contentD.pricing.value_stack.reduce((s, i) => s + i.value, 0)

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,36,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            הגיע הזמן להחליט
          </span>
          <h2 className="mt-4 font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            כל מה שאתה צריך לדעת —
            <br />במקום אחד.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-[#F5A624]/30 bg-[#0D0B00] overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(245,166,36,0.08)' }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

          <div className="p-8 md:p-12">

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                {!expired && (
                  <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>
                )}
                <span className="font-black" style={{
                  fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                  background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>₪{currentPrice}</span>
              </div>
              <p className="text-white/40 text-base">{contentD.pricing.price_note}</p>
            </div>

            {/* CTA */}
            <a href={CHECKOUT_URL}
              className="cta-glow block w-full text-center bg-[#F5A624] text-black font-black text-xl py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
              {contentD.pricing.cta}
            </a>
            <p className="text-center text-white/25 text-sm mb-10">{contentD.pricing.cta_sub}</p>

            {/* Value stack */}
            <div className="mb-10">
              <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-4">מה מקבלים</p>
              <div className="space-y-3">
                {contentD.pricing.value_stack.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-[#F5A624] flex-shrink-0" />
                      <span className="text-white/70 text-base">{item.label}</span>
                    </div>
                    <span className="text-white/30 text-sm flex-shrink-0">₪{item.value}</span>
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

            {/* Guarantee — expanded */}
            <div className="p-6 md:p-8 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-[#F5A624] flex-shrink-0" />
                <p className="text-[#F5A624] text-lg font-black">אחריות מלאה — 7 ימים</p>
              </div>
              <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                <p>
                  נסה את הקורס 7 ימים.
                  <br />אם לא הרגשת שזה שווה את זה — תקבל החזר מלא.
                  <br />בלי שאלות. בלי אותיות קטנות.
                </p>
                <p className="text-white/80 font-medium">
                  למה אנחנו מוכנים לתת את זה?
                </p>
                <p>
                  כי אנחנו כל כך בטוחים בתוכן שבנינו.
                  <br />ראינו אלפי אנשים שעברו את הקורס — ואנחנו יודעים מה הוא עושה.
                  <br />אם אחרי שבוע אתה לא מרגיש שהבנת דברים שלא ידעת קודם — אנחנו לא ראויים לכסף שלך.
                </p>
                <p className="text-[#F5A624] font-bold">
                  הסיכון היחיד הוא לא לנסות.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
