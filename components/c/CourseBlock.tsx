'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { contentC } from '@/lib/content-c'

export default function CourseBlock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const stats = [
    { value: contentC.course.duration, label: 'תוכן' },
    { value: contentC.course.students, label: 'תלמידים' },
    { value: contentC.course.access, label: '' },
  ]

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 bg-[#0C0C0C]">

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase"
          >
            {contentC.course.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-black text-white"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.8rem)' }}
          >
            {contentC.course.headline}
          </motion.h2>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-[#141414] border border-white/7">
              <p className="text-[#F5A624] font-black text-xl md:text-2xl">{s.value}</p>
              {s.label && <p className="text-white/40 text-xs mt-0.5">{s.label}</p>}
            </div>
          ))}
        </motion.div>

        {/* Items */}
        <div className="grid sm:grid-cols-2 gap-3">
          {contentC.course.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#141414] border border-white/7"
            >
              <Check size={16} className="text-[#F5A624] mt-0.5 flex-shrink-0" />
              <span className="text-white/70 text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
