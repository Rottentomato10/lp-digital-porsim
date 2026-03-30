'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useContent, useCheckoutUrl } from '@/lib/content-context'

export default function N1FinalCta() {
  const contentD = useContent()
  const CHECKOUT_URL = useCheckoutUrl()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
            <span className="text-white/30 block mb-2">{contentD.finalCta.line1}</span>
            {contentD.finalCta.line2}
          </p>
          <p className="text-white/40 text-base mb-8">{contentD.finalCta.sub}</p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-xl px-12 py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            {contentD.finalCta.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
