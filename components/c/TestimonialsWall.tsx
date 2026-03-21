'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentC } from '@/lib/content-c'

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array(n).fill(0).map((_, i) => (
        <span key={i} className="text-[#F5A624] text-sm">★</span>
      ))}
    </div>
  )
}

function Card({
  t,
  index,
}: {
  t: (typeof contentC.testimonials)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`break-inside-avoid mb-4 rounded-2xl p-5 border transition-all duration-300 ${
        t.highlight
          ? 'bg-[#1A1200] border-[#F5A624]/30'
          : 'bg-[#111111] border-white/7 hover:border-white/15'
      }`}
    >
      <StarRow n={t.stars} />
      <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
        ״{t.quote}״
      </p>
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: t.highlight
              ? 'rgba(245,166,36,0.25)'
              : 'rgba(255,255,255,0.07)',
            color: t.highlight ? '#F5A624' : 'rgba(255,255,255,0.5)',
          }}
        >
          {t.name[0]}
        </div>
        <div>
          <p className="text-white/80 font-semibold text-sm">{t.name}</p>
          <p className="text-white/30 text-xs">גיל {t.age}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsWall() {
  // Split into 3 columns manually for masonry effect
  const cols: (typeof contentC.testimonials)[] = [[], [], []]
  contentC.testimonials.forEach((t, i) => {
    cols[i % 3].push(t)
  })

  return (
    <section className="py-12 md:py-16 px-5 bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto">
        {/* Desktop: 3 columns masonry */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {cols.map((col, ci) => (
            <div key={ci}>
              {col.map((t, ti) => (
                <Card key={ti} t={t} index={ci * 6 + ti} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-4">
          {contentC.testimonials.map((t, i) => (
            <Card key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
