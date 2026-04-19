'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N12Shift() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-white/30 text-2xl md:text-3xl font-medium line-through decoration-white/15 mb-5">
          הון הוא תוצאה של מזל.
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="font-black text-white text-4xl md:text-5xl leading-tight mb-8">
          הון הוא תוצאה של <span className="text-[#F5A624]">ניהול</span>.
        </motion.h2>
        <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/40 to-transparent mb-8 origin-center" />
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
          הבעיה היא שמעולם לא לימדו אותך איך לחשוב על כסף.
          <br />אנחנו כאן כדי <span className="text-[#F5A624] font-bold">להשלים לך את הפער הזה</span>.
          <br />וכל רגע שעובר בלי הידע הזה —
          <br />עולה לך בכסף אמיתי.
        </motion.p>
      </div>
    </section>
  )
}
