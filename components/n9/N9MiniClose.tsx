'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N9MiniClose() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <p className="text-white/50 text-xl md:text-2xl leading-relaxed mb-4">
            הידע כבר כאן.
          </p>
          <p className="text-white font-bold text-2xl md:text-3xl">
            השאלה היא אם תבחר להמשיך לנחש — או <span className="text-[#F5A624]">להתחיל לנהל</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
