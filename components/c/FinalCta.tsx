'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { contentC } from '@/lib/content-c'

export default function FinalCta() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="buy" ref={ref} className="relative py-24 md:py-36 px-5 bg-[#0C0C0C] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,36,0.09) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-sm mx-auto text-center"
      >
        {/* Price */}
        <div className="mb-8">
          <p className="text-white/30 text-sm mb-2">קורס פיננסים לצעירים · פורשים כנף</p>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 6rem)',
                background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {contentC.finalCta.price}
            </span>
            <span className="text-[#F5A624]/70 font-bold text-2xl">₪</span>
          </div>
        </div>

        {/* CTA */}
        <button className="cta-glow w-full bg-[#F5A624] text-black font-black text-xl px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-4">
          {contentC.finalCta.cta}
        </button>

        {/* Note */}
        <p className="text-white/25 text-xs leading-relaxed">{contentC.finalCta.note}</p>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 mt-5 text-white/30">
          <ShieldCheck size={16} className="text-[#F5A624]/40" />
          <span className="text-xs">7 ימי אחריות מלאה. לא אהבת — מחזירים הכל.</span>
        </div>
      </motion.div>
    </section>
  )
}
