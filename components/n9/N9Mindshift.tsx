'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N9Mindshift() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#080808]">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,166,36,0.08) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
        {/* Crossed-out "before" state */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-white/35 text-2xl md:text-3xl font-medium line-through decoration-white/20 decoration-2">
            הון הוא תוצאה של מזל.
          </span>
        </motion.div>

        {/* Arrow transition */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-[#F5A624]/40 text-2xl">↓</span>
        </motion.div>

        {/* "After" state — bold truth */}
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-white leading-tight mb-10"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          הון הוא תוצאה של <span className="text-[#F5A624]">ניהול</span>.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/40 to-transparent mb-10 origin-center" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
          הבעיה היא שמעולם לא לימדו אותך איך לחשוב על כסף.
          <br />אנחנו כאן כדי <span className="text-[#F5A624] font-bold">להשלים לך את הפער הזה</span>.
          <br />וכל רגע שעובר בלי הידע הזה —
          <br />עולה לך בכסף אמיתי.
        </motion.p>
      </div>
    </section>
  )
}
