'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

export default function DMindShift() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 md:py-40 overflow-hidden bg-[#080808]">

      {/* Strong center glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,166,36,0.13) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">

        {/* Pre-line — struck through feeling */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/35 text-xl md:text-2xl font-medium mb-4 line-through decoration-white/20">
          {contentD.mindshift.pre}
        </motion.p>

        {/* Main statement */}
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-white leading-tight mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          {contentD.mindshift.main}
        </motion.h2>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/40 to-transparent mb-8 origin-center" />

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="t-body-lg max-w-xl mx-auto">
          ידע פיננסי הוא לא מותרות. הוא <span className="text-[#F5A624] font-bold">הבסיס</span> שעליו כל שאר ההחלטות נבנות.<br />כל שנה שעוברת בלי הידע הזה — עולה לך בכסף אמיתי.
        </motion.p>

      </div>
    </section>
  )
}
