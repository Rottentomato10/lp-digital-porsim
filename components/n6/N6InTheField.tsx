'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

const FIELD_ITEMS = [
  { label: 'סדנה בתיכון רמת גן', placeholder: 'video-1' },
  { label: 'הרצאה בבית ספר בנתניה', placeholder: 'video-2' },
  { label: 'פעילות במכינה קדם-צבאית', placeholder: 'video-3' },
]

export default function N6InTheField() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#0F1520]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-4">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">אנחנו בשטח</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
            250+ כיתות. אלפי תלמידים.
            <br />ממשיכים ללמד כל יום.
          </h2>
          <p className="text-white/45 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            ב-5 השנים האחרונות אנחנו מעבירים סדנאות חינוך פיננסי בבתי ספר ובמסגרות חינוכיות בכל רחבי הארץ.
            הקורס הדיגיטלי נולד מתוך העשייה הזו.
          </p>
        </motion.div>

        {/* Video placeholders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FIELD_ITEMS.map((item, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#1A2333] aspect-[9/16] md:aspect-[4/5] flex items-center justify-center cursor-pointer hover:border-[#F5A624]/25 transition-colors">
              {/* Placeholder — replace with real video src */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/30 flex items-center justify-center group-hover:bg-[#F5A624]/25 transition-colors">
                  <Play size={22} className="text-[#F5A624] mr-[-2px]" />
                </div>
                <p className="text-white/40 text-sm font-medium">הוסף סרטון כאן</p>
              </div>
              <p className="absolute bottom-4 inset-x-4 text-center text-white/50 text-sm font-medium z-10">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick stats bar */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-8 flex-wrap mt-10">
          {[
            { val: '250+', label: 'כיתות' },
            { val: '15,000+', label: 'תלמידים' },
            { val: '94%', label: 'שביעות רצון' },
            { val: '5+', label: 'שנות פעילות' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-black text-[#F5A624] text-xl md:text-2xl">{s.val}</p>
              <p className="text-white/30 text-xs md:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
