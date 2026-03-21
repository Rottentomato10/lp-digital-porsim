'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { content } from '@/lib/content'

function StatCard({
  item,
  index,
}: {
  item: (typeof content.diagnosis.items)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex flex-col gap-3 p-7 md:p-8 rounded-2xl border border-brand-border bg-brand-card overflow-hidden"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(245,166,36,0.07), transparent)' }}
      />

      {/* Number */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-black leading-none"
          style={{
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {item.number}
        </span>
        <span className="text-brand-orange font-bold text-2xl">{item.unit}</span>
      </div>

      {/* Label */}
      <p className="text-white font-bold text-lg md:text-xl leading-snug">
        {item.label}
      </p>

      {/* Sub */}
      <p className="text-white/45 text-sm md:text-base leading-relaxed">{item.sub}</p>
    </motion.div>
  )
}

export default function Diagnosis() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 md:py-32 bg-brand-bg-2">
      <div className="divider-glow absolute top-0 inset-x-0" />

      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-brand-orange font-semibold text-sm tracking-widest uppercase"
          >
            {content.diagnosis.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            {content.diagnosis.headline.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {content.diagnosis.items.map((item, i) => (
            <StatCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      <div className="divider-glow absolute bottom-0 inset-x-0" />
    </section>
  )
}
