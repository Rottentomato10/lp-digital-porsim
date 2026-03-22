'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { contentD } from '@/lib/content-d'

const ICONS = ['🧠', '🔧', '📈']

export default function DSolution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5 text-center">

        {contentD.solution.eyebrow && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="t-eyebrow"
          >
            {contentD.solution.eyebrow}
          </motion.span>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-black text-white mx-auto"
          style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)', maxWidth: '32rem' }}
        >
          {contentD.solution.headline}
        </motion.h2>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 relative">

          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-10 right-[16.67%] left-[16.67%] h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(245,166,36,0.2), rgba(245,166,36,0.2), transparent)' }} />

          {[contentD.solution.steps[0], contentD.solution.steps[2], contentD.solution.steps[1]].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                const el = document.getElementById(`stage-${i + 1}`)
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="relative flex flex-col items-center text-center p-8 rounded-3xl border border-white/8 bg-[#111111] group hover:border-[#F5A624]/30 hover:bg-[#131000] transition-all duration-400 cursor-pointer"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(245,166,36,0.05), transparent)' }} />

              {/* Step number circle */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,166,36,0.15), rgba(245,166,36,0.05))',
                    border: '1px solid rgba(245,166,36,0.2)',
                  }}>
                  <span className="text-3xl">{ICONS[i]}</span>
                </div>
                {/* Step badge */}
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F5A624] flex items-center justify-center text-black font-black text-xs">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-black text-white text-xl mb-3">{step.title}</h3>
              <p className="t-muted mb-4">{step.desc}</p>
              <span className="text-[#F5A624]/40 text-xs group-hover:text-[#F5A624]/70 transition-colors">לסילבוס ↓</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
