'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { contentD, CHECKOUT_URL } from '@/lib/content-d'

export default function DHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 70%, rgba(245,166,36,0.1) 0%, transparent 65%)' }} />

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center flex flex-col items-center">

        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
          <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
            className="w-16 h-16 object-contain drop-shadow-[0_0_24px_rgba(245,166,36,0.35)]" priority />
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#E5D4B0] border border-[#E5D4B0]/20 bg-[#E5D4B0]/5 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A624] animate-pulse inline-block" />
            {contentD.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.08] tracking-tight mb-5"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}>
          <span className="text-white block">{contentD.hero.headline_1}</span>
          <span className="block" style={{
            background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>{contentD.hero.headline_2}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
          {contentD.hero.sub}
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}>
          <div className="flex flex-col items-center gap-2.5">
            <a href={CHECKOUT_URL}
              className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
              {contentD.hero.cta}
            </a>
            <span className="text-white/25 text-xs">🔒 מועבר לדף תשלום מאובטח</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
