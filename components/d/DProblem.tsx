'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

export default function DProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-2xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-12 text-center">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            {contentD.problem.eyebrow}
          </span>
          <h2 className="mt-4 text-white font-black leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
            {contentD.problem.headline}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {contentD.problem.items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-4 py-5 border-b border-white/6 last:border-0">
              <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-[#F5A624]/60 group-hover:bg-[#F5A624] transition-colors duration-300" />
              <p className="text-white/75 text-lg md:text-xl leading-snug font-medium group-hover:text-white transition-colors duration-300">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="divider-glow mt-0" />
    </section>
  )
}
