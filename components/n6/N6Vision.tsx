'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N6Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#0F1520]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-5 xs:p-8 md:p-12 rounded-3xl border border-[#F5A624]/15 bg-[#141E2B]">

          <h3 className="text-[#F5A624] font-black text-2xl xs:text-3xl md:text-4xl mb-6 xs:mb-8 text-center">
            תדמיין שאתה יודע בדיוק מה לעשות:
          </h3>
          <div className="space-y-5 text-white/65 text-xl md:text-2xl leading-relaxed text-center">
            <p>פותח את האפליקציה של הבנק ומבין כל מספר.
              <br />מקבל תלוש שכר ויודע שמה שמגיע לך — אתה מקבל.</p>
            <p>יש לך כסף שעובד בשבילך —
              <br />ואתה יודע בדיוק למה ואיך.</p>
          </div>

          <p className="text-white/45 text-xl md:text-2xl leading-relaxed mt-8 text-center">
            ההבדל? לא כמה כסף יש לך — אלא <span className="text-white font-bold">כמה אתה מבין אותו</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
