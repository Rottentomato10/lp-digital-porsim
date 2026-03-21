'use client'

import { motion } from 'framer-motion'
import { contentC } from '@/lib/content-c'

export default function ProofHero() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-5 text-center overflow-hidden bg-[#0C0C0C]">

      {/* Very subtle warm glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(245,166,36,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className="text-[#F5A624] text-xl">★</span>
            ))}
          </div>

          <h1
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.2rem)' }}
          >
            <span className="text-white block">{contentC.hero.line1}</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {contentC.hero.line2}
            </span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl leading-relaxed">
            {contentC.hero.sub}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
