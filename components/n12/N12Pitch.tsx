'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N12Pitch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#060A13]">
      <div className="max-w-lg mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="space-y-5">

          <p className="text-white/40 text-lg md:text-xl leading-relaxed">
            בוא נגיד את זה ישר:
          </p>
          <p className="text-white text-xl md:text-2xl leading-relaxed font-bold">
            הבעיה היא לא אצלך.
          </p>
          <p className="text-white/45 text-lg md:text-xl leading-relaxed">
            היא במערכת שמעולם לא ציידה אותך בספר החוקים הנכון.
          </p>
          <p className="text-white/40 text-base md:text-lg leading-[1.8]">
            12 שנים של לימודים — ואפס שעות על כסף.
            ואז יום אחד אתה מתחיל לעבוד, מקבל משכורת,
            ומצפים ממך לדעת מה לעשות איתה.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/25 to-transparent" />

          <p className="text-white text-xl md:text-2xl leading-relaxed font-black">
            מהרגע הזה — זו כבר <span className="text-[#F5A624]">הבחירה שלך</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
