'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N1SalesPitch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed">
            בוא נהיה כנים לרגע.
          </p>
          <p className="text-white text-xl md:text-2xl leading-relaxed font-medium">
            אף אחד לא לימד אותך כסף.
          </p>
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed">
            לא בבית הספר, לא בצבא, לא באוניברסיטה.
            <br />12 שנים של לימודים — ואפס שעות על הדבר שישפיע על כל החלטה שתקבל בחיים.
          </p>
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed">
            ואז יום אחד אתה מתחיל לעבוד. מקבל משכורת.
            <br />ופתאום אתה אמור לדעת מה לעשות עם הכסף הזה.
          </p>
          <p className="text-white text-2xl md:text-3xl font-bold leading-tight">
            אבל אתה לא יודע.
            <br />כי אף אחד לא טרח ללמד אותך.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/30 to-transparent my-4" />

          <p className="text-white/70 text-xl md:text-2xl leading-relaxed">
            וזה בסדר. זה לא אשמתך.
            <br />אבל מהרגע הזה — זו כבר <span className="text-[#F5A624] font-bold">הבחירה שלך</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
