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
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            בוא נהיה כנים לרגע.
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-medium">
            אף אחד לא לימד אותך כסף.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            לא בבית הספר. לא בצבא. לא באוניברסיטה.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            12 שנים של לימודים — ואפס שעות על הדבר שישפיע על כל החלטה שתקבל בחיים.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            ואז יום אחד אתה מתחיל לעבוד. מקבל משכורת.
            ופתאום אתה אמור לדעת מה לעשות עם הכסף הזה.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            אבל אתה לא יודע. כי אף אחד לא טרח ללמד אותך.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            וזה לא שאתה טיפש. ממש לא.
            <br />זה שהמערכת פשוט לא בנתה את זה בשבילך.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            אתה יודע לפתור משוואות, לנתח שירה, לכתוב חיבור —
            <br />אבל אף אחד לא הסביר לך מה זה ריבית דריבית,
            <br />למה כסף בעו"ש מאבד ערך,
            <br />או מה בכלל קורה עם תלוש השכר שלך.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/30 to-transparent my-4" />

          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            וזה בסדר. זה לא אשמתך.
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-bold">
            אבל מהרגע הזה — זו כבר <span className="text-[#F5A624]">הבחירה שלך</span>.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            אתה יכול להמשיך כמו שהיה.
            <br />או שאתה יכול לקחת 3 שעות ולהבין את מה שהיו צריכים ללמד אותך מזמן.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
