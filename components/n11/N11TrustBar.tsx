'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ target, suffix = '', inView }: { target: number; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <>{count.toLocaleString()}{suffix}</>
}

export default function N11TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const stats = [
    { value: 15000, suffix: '+', label: 'תלמידים למדו' },
    { value: 300, suffix: '+', label: 'כיתות בשטח' },
    { value: 57, suffix: '', label: 'שיעורים בקורס' },
    { value: 5, suffix: '+', label: 'שנות פעילות' },
  ]

  return (
    <section ref={ref} className="relative bg-[#060A13] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-5 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center">
              <p className="font-black text-3xl md:text-4xl text-[#10B981] mb-1">
                <AnimatedNumber target={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p className="text-white/35 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
