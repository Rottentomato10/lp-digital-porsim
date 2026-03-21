'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

export default function DFinalCta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245,166,36,0.09) 0%, transparent 65%)' }} />

      <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl mx-auto px-5 text-center">

        <h2 className="font-black text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.6rem)' }}>
          <span className="block text-white/40">{contentD.finalCta.line1}</span>
          <span className="block">{contentD.finalCta.line2}</span>
        </h2>

        <button className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-xl px-12 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-5">
          {contentD.finalCta.cta}
        </button>

        <p className="text-white/25 text-sm">{contentD.finalCta.sub}</p>

      </motion.div>
    </section>
  )
}
