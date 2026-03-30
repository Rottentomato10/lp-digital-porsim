'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N4MiniClose() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="text-white/50 text-xl md:text-2xl leading-relaxed mb-4">
            אתה לא צריך עוד מידע.
          </p>
          <p className="text-white/50 text-xl md:text-2xl leading-relaxed mb-4">
            אתה כבר יודע שיש בעיה.
            <br />ואתה כבר מבין איך זה יכול להיראות אחרת.
          </p>
          <p className="text-white font-bold text-2xl md:text-3xl">
            השאלה היחידה היא אם אתה עושה עם זה משהו.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
