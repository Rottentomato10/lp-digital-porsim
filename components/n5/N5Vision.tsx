'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N5Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-5 xs:p-8 md:p-12 rounded-3xl border border-[#F5A624]/20 bg-[#0D0B00]">

          <h3 className="text-[#F5A624] font-black text-2xl xs:text-3xl md:text-4xl mb-6 xs:mb-8 text-center">
            עכשיו תדמיין מצב אחר לגמרי:
          </h3>
          <div className="space-y-6 text-white/70 text-xl md:text-2xl leading-relaxed text-center">
            <p>אתה פותח את האפליקציה של הבנק ויודע בדיוק מה קורה שם.
              <br />לאן הכסף הולך. כמה נשאר. מה המספר שאתה צריך להגיע אליו החודש.</p>
            <p>אתה מקבל תלוש שכר ומבין כל שורה.
              <br />אתה יודע שמה שמגיע לך — אתה באמת מקבל.</p>
            <p>יש לך כסף שעובד בשבילך — גם אם מדובר בסכומים קטנים בהתחלה.
              <br />ואתה יודע בדיוק איך לעשות את זה.</p>
          </div>

          <p className="text-white/50 text-xl md:text-2xl leading-relaxed mt-8 text-center">
            וזה ההבדל האמיתי:
            <br />לא כמה כסף יש לך — אלא <span className="text-white font-bold">כמה אתה מבין אותו</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
