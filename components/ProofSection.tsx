'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { content } from '@/lib/content'

/* ─── Counter ─── */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString('he-IL')}
    </span>
  )
}

/* ─── Module Card ─── */
function ModuleCard({
  item,
  index,
}: {
  item: (typeof content.proof.modules)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-4 items-start p-5 md:p-6 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-orange/30 transition-colors duration-300"
    >
      <div className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</div>
      <div>
        <p className="font-bold text-white text-base mb-1">{item.title}</p>
        <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* ─── Testimonial card ─── */
function TestimonialCard({ t }: { t: (typeof content.proof.testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-brand-card border border-brand-border rounded-2xl p-5 mx-3">
      <p className="text-white/75 text-sm leading-relaxed mb-4">״{t.quote}״</p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold text-sm flex-shrink-0">
          {t.name[0]}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-white/35 text-xs">גיל {t.age}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProofSection() {
  const counterRef = useRef(null)
  const counterInView = useInView(counterRef, { once: true, margin: '-80px' })

  const doubled = [...content.proof.testimonials, ...content.proof.testimonials]

  return (
    <section className="relative py-24 md:py-32 bg-brand-bg-2 overflow-hidden">
      <div className="divider-glow absolute top-0 inset-x-0" />

      {/* Counter */}
      <div ref={counterRef} className="text-center mb-20 md:mb-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={counterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="font-black leading-none mb-3"
            style={{
              fontSize: 'clamp(4rem, 12vw, 8rem)',
              background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 50%, #F5A624 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Counter target={content.proof.counter_number} />+
          </div>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-lg mx-auto">
            {content.proof.counter_label}
          </p>
        </motion.div>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto px-5 mb-20 md:mb-28">
        <div className="text-center mb-12">
          <h2
            className="font-black text-white"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}
          >
            {content.proof.modules_headline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {content.proof.modules.map((m, i) => (
            <ModuleCard key={i} item={m} index={i} />
          ))}
        </div>
      </div>

      {/* Testimonials marquee */}
      <div className="marquee-wrapper py-2">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <div className="divider-glow absolute bottom-0 inset-x-0" />
    </section>
  )
}
