'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N6Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#0F1520]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="space-y-8">

          <p className="text-white/60 text-2xl md:text-3xl leading-relaxed">
            בוא נגיד את האמת:
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-medium">
            12 שנים של לימודים — ואפס שעות על כסף.
          </p>
          <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
            לא כי לא רצית לדעת.
            <br />אלא כי המערכת פשוט לא לימדה את זה.
            <br />משכורת, מסים, חיסכון, השקעות — הדברים שמשפיעים
            <br />על כל יום בחיים שלך נשארו מחוץ לכיתה.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/25 to-transparent my-4" />

          <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
            אבל הידע הזה קיים — הוא פשוט לא היה נגיש מספיק.
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-bold">
            עד עכשיו. <span className="text-[#F5A624]">עכשיו הוא כאן בשבילך.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
