'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentC } from '@/lib/content-c'

export default function MidCta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-5 overflow-hidden bg-[#0C0C0C]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,166,36,0.1) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F5A624]/30" />
            <span className="text-[#F5A624]/60 text-sm font-semibold tracking-widest uppercase">
              {contentC.midCta.headline}
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F5A624]/30" />
          </div>

          <p className="text-white/60 text-lg leading-relaxed mb-10">
            {contentC.midCta.sub}
          </p>

          <a
            href="#buy"
            className="cta-glow inline-flex items-center gap-3 bg-[#F5A624] text-black font-black text-xl px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            {contentC.midCta.cta}
          </a>

          <p className="mt-4 text-white/25 text-sm">
            {contentC.midCta.price} · {contentC.midCta.note}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
