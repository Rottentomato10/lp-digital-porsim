'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

export default function DObjections() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#080808]">
      <div className="divider-glow" />
      <div className="max-w-3xl mx-auto px-5 mt-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            {contentD.objections.eyebrow}
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          {contentD.objections.items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 p-6 md:p-8 rounded-2xl bg-[#101010] border border-white/7 items-start">

              {/* Question */}
              <p className="text-white/50 font-semibold text-base md:text-lg leading-snug">
                {item.q}
              </p>

              {/* Divider mobile */}
              <div className="md:hidden h-px bg-white/8" />

              {/* Answer */}
              <p className="text-white/75 text-sm md:text-base leading-relaxed">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
