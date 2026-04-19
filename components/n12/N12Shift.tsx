'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N12Shift() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden bg-[#060A13]">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245,166,36,0.06) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-lg mx-auto px-5 text-center">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-white/25 text-xl font-medium line-through decoration-white/10 mb-3">
          הון הוא תוצאה של מזל.
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="font-black text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
          הון הוא תוצאה של <span className="text-[#F5A624]">ניהול</span>.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="text-white/40 text-base leading-[1.8] max-w-sm mx-auto">
          הבעיה היא שמעולם לא לימדו אותך איך לחשוב על כסף.
          אנחנו כאן כדי <span className="text-[#F5A624] font-bold">להשלים לך את הפער הזה</span>.
          וכל רגע שעובר בלי הידע הזה — עולה לך בכסף אמיתי.
        </motion.p>
      </div>
    </section>
  )
}
