'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { content } from '@/lib/content'

export default function VideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 md:py-36 bg-brand-bg overflow-hidden">

      {/* Big background glow behind video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,166,36,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-brand-orange font-semibold text-sm tracking-widest uppercase"
        >
          {content.video.eyebrow}
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 mb-3 font-black text-white leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
        >
          {content.video.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/45 text-base md:text-lg mb-10"
        >
          {content.video.sub}
        </motion.p>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-brand-border"
          style={{ boxShadow: '0 0 80px rgba(245,166,36,0.12), 0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* 16:9 ratio */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${content.video.videoId}?rel=0&modestbranding=1`}
              title="פורשים כנף — קורס פיננסים"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
