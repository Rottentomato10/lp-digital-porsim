'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N12Pitch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#FAFAF9]">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="space-y-7">

          <p className="text-gray-400 text-2xl md:text-3xl leading-relaxed">
            בוא נגיד את זה ישר:
          </p>
          <p className="text-[#1a1a1a] text-2xl md:text-3xl leading-relaxed font-bold">
            הבעיה היא לא אצלך.
          </p>
          <p className="text-gray-500 text-2xl md:text-3xl leading-relaxed">
            היא במערכת שמעולם לא ציידה אותך בספר החוקים הנכון.
          </p>
          <p className="text-gray-500 text-xl md:text-2xl leading-relaxed">
            12 שנים של לימודים — ואפס שעות על כסף.
            <br />ואז יום אחד אתה מתחיל לעבוד, מקבל משכורת,
            <br />ומצפים ממך לדעת מה לעשות איתה.
          </p>

          <div className="h-px bg-gray-200 my-6" />

          <p className="text-[#1a1a1a] text-2xl md:text-3xl leading-relaxed font-black">
            מהרגע הזה — זו כבר <span className="text-[#F5A624]">הבחירה שלך</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
