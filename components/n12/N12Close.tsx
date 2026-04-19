'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N12Close() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>

          <Image src="/logo.png" alt="פורשים כנף" width={64} height={64}
            className="w-14 h-14 object-contain mx-auto mb-8 opacity-50" />

          <p className="text-white/35 text-lg md:text-xl mb-3">
            העתיד שלך לא נקבע לפי כמה אתה מרוויח —
            <br />אלא לפי מה שאתה עושה עם מה שיש לך.
          </p>
          <h2 className="font-black text-white text-3xl md:text-4xl leading-tight mb-4">
            תתחיל לנהל. <span className="text-[#F5A624]">תגיד לי שמוכן.</span>
          </h2>
          <p className="text-white/30 text-base mb-8">₪390 · תשלום חד-פעמי · גישה לכל החיים</p>

          <a href={CHECKOUT_URL}
            className="inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מוכן. אני מתחיל עכשיו.
          </a>

          <p className="text-white/15 text-sm mt-8">
            שאלות? <a href="https://wa.me/9720537282727?text=היי, יש לי כמה שאלות בנוגע לקורס הדיגיטלי"
              target="_blank" rel="noopener noreferrer"
              className="text-[#25D366]/70 hover:text-[#25D366]">דברו איתנו בווטסאפ</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
