'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ShieldCheck } from 'lucide-react'
import { content } from '@/lib/content'

/* ─── FAQ item ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-brand-border last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right gap-4 group"
      >
        <span className="font-semibold text-white group-hover:text-brand-orange transition-colors text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-brand-orange/60"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-white/50 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Decision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 md:py-36 bg-brand-bg overflow-hidden">

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,166,36,0.06) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-5">

        {/* Eyebrow + Headline */}
        <div className="text-center mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-orange font-semibold text-sm tracking-widest uppercase"
          >
            {content.decision.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            {content.decision.headline}
          </motion.h2>
        </div>

        {/* Price card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-brand-border bg-brand-card overflow-hidden mb-8 md:mb-12"
          style={{ boxShadow: '0 0 60px rgba(245,166,36,0.08)' }}
        >
          {/* Top bar glow */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Includes list */}
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-l border-brand-border">
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-6">
                מה מקבלים
              </p>
              <ul className="space-y-4">
                {content.decision.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={17} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price + CTA */}
            <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center gap-6">
              <div>
                <p className="text-white/35 text-sm mb-1">{content.decision.price_note}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
                      background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {content.decision.price}
                  </span>
                  <span className="text-brand-orange/70 font-bold text-2xl">₪</span>
                </div>
              </div>

              <button
                className="cta-glow w-full md:w-auto inline-flex items-center justify-center bg-brand-orange text-black font-black text-xl px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
              >
                {content.decision.cta}
              </button>

              {/* Guarantee */}
              <div className="flex items-start gap-2.5 text-right">
                <ShieldCheck size={20} className="text-brand-orange/60 flex-shrink-0 mt-0.5" />
                <p className="text-white/35 text-xs leading-relaxed">
                  {content.decision.guarantee}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-white/30 text-xs font-semibold tracking-widest uppercase text-center mb-6">
            שאלות נפוצות
          </p>
          {content.decision.faq.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
