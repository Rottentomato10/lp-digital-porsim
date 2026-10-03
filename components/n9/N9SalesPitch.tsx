'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N9SalesPitch() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="pb-8 md:pb-10 pt-16 md:pt-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="space-y-8">

          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            בוא נגיד את זה ישר:
          </p>
          <p className="text-white text-2xl md:text-3xl leading-relaxed font-medium">
            הבעיה היא לא אצלך.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            רובנו פשוט לא קיבלנו את הכלים להבין איך כסף עובד.
          </p>
          <p className="text-white/70 text-2xl md:text-3xl leading-relaxed">
            12 שנים של לימודים — וכמעט אפס זמן על משכורת, מסים, בנקים, השקעות או תכנון פיננסי.
            <br />ואז יום אחד מתחילים לעבוד, מקבלים משכורת,
            <br />ומצפים מאיתנו פשוט לדעת מה לעשות.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/30 to-transparent my-4" />

          <p className="text-white text-2xl md:text-3xl leading-relaxed font-bold">
            מהרגע הזה — <span className="text-[#F5A624]">אפשר להתחיל ללמוד</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
