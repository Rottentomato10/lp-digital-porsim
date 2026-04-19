'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N12Close() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#060A13]">
      <div className="max-w-lg mx-auto px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <p className="text-white/25 text-base mb-3">
            העתיד שלך לא נקבע לפי כמה אתה מרוויח —
            <br />אלא לפי מה שאתה עושה עם מה שיש לך.
          </p>
          <h2 className="font-black text-white text-2xl md:text-3xl mb-2">
            תתחיל לנהל. <span className="text-[#F5A624]">תגיד לי שמוכן.</span>
          </h2>
          <p className="text-white/20 text-sm mb-6">₪390 · גישה לכל החיים</p>

          <a href={CHECKOUT_URL}
            className="cta-shine block w-full max-w-sm mx-auto text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all">
            אני מוכן. אני מתחיל עכשיו.
          </a>

          <p className="text-white/10 text-xs mt-6">
            שאלות? <a href="https://wa.me/9720537282727?text=היי, יש לי כמה שאלות בנוגע לקורס הדיגיטלי"
              target="_blank" rel="noopener noreferrer"
              className="text-[#25D366]/50 hover:text-[#25D366]">ווטסאפ</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
