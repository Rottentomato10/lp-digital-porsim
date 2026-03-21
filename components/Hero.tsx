'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { content } from '@/lib/content'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-bg">

      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 65%, rgba(245,166,36,0.11) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl mx-auto">

        {/* Logo */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <Image
            src="/logo.png"
            alt="פורשים כנף"
            width={120}
            height={120}
            className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(245,166,36,0.3)]"
            priority
          />
        </motion.div>

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-cream border border-brand-cream/20 bg-brand-cream/5 rounded-full px-4 py-1.5 mb-8 tracking-wide">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            {content.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-black leading-[1.1] tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
        >
          <span className="text-white block">{content.hero.headline_1}</span>
          <span className="text-white block">{content.hero.headline_2}</span>
          <span
            className="block mt-1"
            style={{
              background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {content.hero.headline_accent}
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.32)}
          className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          {content.hero.sub}
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(0.44)}>
          <button
            className="cta-glow inline-flex items-center gap-3 bg-brand-orange text-black font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          >
            {content.hero.cta}
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-16 flex flex-col items-center gap-2 text-white/25 text-sm"
        >
          <span>{content.hero.scroll_label}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-brand-orange rounded-full opacity-60" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
