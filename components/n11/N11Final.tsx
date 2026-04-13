'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N11Final() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#060A13] overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 60%, rgba(245,166,36,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}>

          <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-8 opacity-60" />

          <p className="text-white/35 text-lg md:text-xl mb-4">
            העתיד שלך לא נקבע לפי כמה אתה מרוויח.
          </p>
          <h2 className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            הוא נקבע לפי מה שאתה
            <br /><span className="text-[#F5A624]">עושה עם מה שיש לך.</span>
          </h2>

          <p className="text-white/30 text-lg mb-10">
            ₪390 · תשלום חד-פעמי · גישה לכל החיים
          </p>

          <a href={CHECKOUT_URL}
            className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-xl px-12 py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מוכן. אני מתחיל עכשיו.
          </a>

          {/* WhatsApp */}
          <p className="text-white/20 text-sm mt-8">
            שאלות? <a href="https://wa.me/9720537282727?text=%D7%94%D7%99%D7%99%2C%20%D7%99%D7%A9%20%D7%9C%D7%99%20%D7%9B%D7%9E%D7%94%20%D7%A9%D7%90%D7%9C%D7%95%D7%AA%20%D7%91%D7%A0%D7%95%D7%92%D7%A2%20%D7%9C%D7%A7%D7%95%D7%A8%D7%A1%20%D7%94%D7%93%D7%99%D7%92%D7%99%D7%98%D7%9C%D7%99"
              target="_blank" rel="noopener noreferrer"
              className="text-[#25D366] hover:underline">דברו איתנו בווטסאפ</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
