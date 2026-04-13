'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

const PAIN_POINTS = [
  { emoji: '💸', text: 'בסוף החודש אתה לא יודע לאן הכסף נעלם' },
  { emoji: '📄', text: 'תלוש השכר שלך? סינית' },
  { emoji: '📉', text: 'הכסף בבנק מאבד ערך ואתה לא עושה עם זה כלום' },
  { emoji: '🤷', text: 'מניות, S&P500, קרנות — שמעת הכל, מבין אפס' },
  { emoji: '⏳', text: 'כל חודש שעובר בלי ידע עולה לך בכסף אמיתי' },
]

export default function N11Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#060A13]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-16">
          <h2 className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            הבעיה היא לא אצלך.
          </h2>
          <p className="text-white/50 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            12 שנים של לימודים — ואפס שעות על כסף.
            <br />המערכת פשוט לא ציידה אותך בספר החוקים.
          </p>
        </motion.div>

        {/* Horizontal scrolling cards on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
          {PAIN_POINTS.map((point, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 w-[70vw] xs:w-[60vw] md:w-auto snap-center"
            >
              <div className="h-full p-5 md:p-6 rounded-2xl bg-[#0D1117] border border-white/6 hover:border-[#F5A624]/20 transition-colors duration-300 text-center">
                <span className="text-3xl md:text-4xl block mb-4">{point.emoji}</span>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition statement */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16">
          <div className="inline-block px-8 py-4 rounded-2xl border border-[#F5A624]/15 bg-[#F5A624]/5">
            <p className="text-white/70 text-xl md:text-2xl">
              מה אם תוך <span className="text-[#F5A624] font-bold">3 שעות</span> כל זה ישתנה?
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
