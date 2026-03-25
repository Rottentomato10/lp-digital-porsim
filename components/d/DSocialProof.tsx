'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useContent } from '@/lib/content-context'

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3 justify-center">
      {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624] text-sm">★</span>)}
    </div>
  )
}

function ReviewCard({ review }: { review: { name: string; quote: string } }) {
  return (
    <div className="p-5 rounded-2xl bg-[#111111] border border-white/7 text-center h-full">
      <Stars />
      <p className="text-white/65 text-sm leading-relaxed mb-4">״{review.quote}״</p>
      <div className="flex items-center justify-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-white/40 text-xs font-bold flex-shrink-0">
          {review.name[0]}
        </div>
        <p className="text-white/50 text-xs">{review.name}</p>
      </div>
    </div>
  )
}

export default function DSocialProof() {
  const contentD = useContent()
  const ALL_REVIEWS = [contentD.socialProof.featured, ...contentD.socialProof.others]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // 4 slots, each holds an index into ALL_REVIEWS
  // Positions in RTL 2×2 grid: [0]=top-right, [1]=top-left, [2]=bottom-right, [3]=bottom-left
  const [slots, setSlots] = useState([0, 1, 2, 3])
  const stateRef = useRef({ cyclePos: 0, nextIdx: 4 })

  useEffect(() => {
    if (!inView) return
    // Cycle every 3.5 seconds
    const delay = 3500
    const id = setInterval(() => {
      const { cyclePos, nextIdx } = stateRef.current
      setSlots(prev => {
        const next = [...prev]
        next[cyclePos] = nextIdx % ALL_REVIEWS.length
        return next
      })
      stateRef.current = {
        cyclePos: (cyclePos + 1) % 4,
        nextIdx: (nextIdx + 1) % ALL_REVIEWS.length,
      }
    }, delay)
    return () => clearInterval(id)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10">
          <span className="t-eyebrow">
            {contentD.socialProof.eyebrow}
          </span>
        </motion.div>

        {/* Featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-8 md:p-10 rounded-3xl border border-[#F5A624]/20 bg-[#120E00] mb-5 overflow-hidden text-center"
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(245,166,36,0.07), transparent)' }} />
          <div className="relative z-10">
            <div className="flex justify-center mb-3">
              {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624]">★</span>)}
            </div>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-5 max-w-lg mx-auto">
              ״{contentD.socialProof.featured.quote}״
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center text-[#F5A624] text-xs font-black">
                {contentD.socialProof.featured.name[0]}
              </div>
              <p className="text-white/50 text-sm">{contentD.socialProof.featured.name}</p>
            </div>
          </div>
        </motion.div>

        {/* Cycling 2×2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {slots.map((reviewIdx, pos) => (
            <div key={pos} className="relative" style={{ minHeight: '160px' }}>
              <AnimatePresence>
                <motion.div
                  key={reviewIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <ReviewCard review={ALL_REVIEWS[reviewIdx]} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
