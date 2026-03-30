'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N4SalesPitch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="pb-8 md:pb-10 pt-16 md:pt-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="space-y-8">

          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            בוא נהיה כנים לרגע.
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-medium">
            אתה לא טיפש.
            <br />אתה לא בזבזן.
            <br />ואתה לא &quot;גרוע עם כסף&quot;.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            פשוט אף אחד לא לימד אותך איך לנהל אותו.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            12 שנים של לימודים — ואפס שעות על כסף.
            <br />ואז יום אחד אתה מתחיל לעבוד, מקבל משכורת,
            <br />ומצפים ממך לדעת מה לעשות איתה.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            אבל איך תדע, אם אף אחד מעולם לא טרח להסביר לך?
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/30 to-transparent my-4" />

          <p className="text-white text-2xl md:text-3xl leading-relaxed font-bold">
            מהרגע הזה — זו כבר <span className="text-[#F5A624]">הבחירה שלך</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
