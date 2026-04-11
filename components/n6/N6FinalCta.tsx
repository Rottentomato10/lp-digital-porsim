'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N6FinalCta() {
  const CHECKOUT_URL = useCheckoutUrl()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0F1520]">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <p className="text-white/40 text-xl md:text-2xl mb-4">
            הכלים כאן. הידע מוכן.
          </p>
          <p className="text-white font-black text-2xl xs:text-3xl md:text-4xl mb-3">
            עכשיו זו ההחלטה שלך.
          </p>
          <p className="text-white/35 text-lg mb-8">
            ₪390 · גישה לכל החיים
          </p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מתחיל עכשיו
          </a>
        </motion.div>
      </div>
    </section>
  )
}
