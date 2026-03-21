'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

export default function DFinalClose() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(245,166,36,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">

        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
          {contentD.finalClose.eyebrow}
        </motion.span>

        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 mb-7 font-black text-white leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)' }}>
          {contentD.finalClose.headline}
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-white/50 text-base md:text-lg leading-relaxed mb-14">
          {contentD.finalClose.body}
        </motion.p>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4">
          {contentD.finalClose.stats.map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#111111] border border-white/7">
              <p className="font-black text-[#F5A624] text-xl md:text-2xl">{s.value}</p>
              <p className="text-white/35 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
