'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N2Decision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* For you */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#101010] border border-[#F5A624]/20">
            <h3 className="text-[#F5A624] font-bold text-xl md:text-2xl mb-5">זה בשבילך אם:</h3>
            <div className="space-y-3">
              {[
                'אתה מרוויח אבל לא שולט בכסף',
                'אין לך מושג בהשקעות',
                'אתה מרגיש שאתה מפספס',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#F5A624] text-lg">✔</span>
                  <p className="text-white/70 text-lg md:text-xl">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Not for you */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#101010] border border-white/7">
            <h3 className="text-white/40 font-bold text-xl md:text-2xl mb-5">זה לא בשבילך אם:</h3>
            <div className="space-y-3">
              {[
                'אתה כבר מנהל כסף בצורה מסודרת',
                'יש לך ניסיון בהשקעות',
                'אתה לא מתכוון לפעול',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-white/30 text-lg">✘</span>
                  <p className="text-white/40 text-lg md:text-xl">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
