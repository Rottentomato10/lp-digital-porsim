'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

const EDUCATORS = [
  { name: 'שם איש/אשת חינוך', role: 'מנהל/ת בית ספר', placeholder: true },
  { name: 'שם איש/אשת חינוך', role: 'מחנכ/ת כיתה', placeholder: true },
]

export default function N6EducatorEndorsements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#0F1520]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-4">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">אנשי חינוך ממליצים</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
            מי שרואה את ההשפעה בשטח — ממליץ
          </h2>
        </motion.div>

        {/* Video testimonial placeholders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATORS.map((edu, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-white/8 bg-[#1A2333]">
              {/* Video placeholder */}
              <div className="relative aspect-video flex items-center justify-center bg-[#141E2B] cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/30 flex items-center justify-center group-hover:bg-[#F5A624]/25 transition-colors">
                  <Play size={26} className="text-[#F5A624] mr-[-2px]" />
                </div>
                <p className="absolute bottom-3 inset-x-3 text-center text-white/30 text-sm">הוסף סרטון המלצה כאן</p>
              </div>
              <div className="p-5">
                <p className="text-white font-bold text-lg">{edu.name}</p>
                <p className="text-white/40 text-sm">{edu.role}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
