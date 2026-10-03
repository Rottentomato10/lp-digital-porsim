'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function N5Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-10">
          <Image src="/logo.png" alt="פורשים כנף" width={200} height={200}
            className="w-36 h-36 md:w-44 md:h-44 object-contain mx-auto my-6 drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6 text-center">

          <div className="flex items-center justify-center gap-8 flex-wrap mb-8">
            {[
              { val: '5+', label: 'שנות פעילות' },
              { val: '15,000+', label: 'תלמידי תיכון' },
              { val: '50+', label: 'מוסדות חינוך' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-[#F5A624] text-2xl">{s.val}</p>
                <p className="text-white/30 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold text-2xl md:text-3xl mb-2">מאחורי הסדנה</h3>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            ב-5 השנים האחרונות אנחנו מעבירים סדנאות חינוך פיננסי בבתי ספר, יחידות צבאיות ומסגרות חינוכיות ברחבי הארץ — כחלק מתוכניות ההעשרה של משרד החינוך, לכ-15,000 תלמידי תיכון ב-50+ מוסדות חינוך.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/50 text-base md:text-lg">
            <span>דקל קאפח — מייסד שותף, מתכנן פיננסי (CFP)</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>אביתר דנגור — מייסד שותף, רקע בחינוך וכלכלה</span>
          </div>
          <a href="https://porsimkanaf.com/about" target="_blank" rel="noopener noreferrer"
            className="inline-block text-[#F5A624] text-base md:text-lg font-medium hover:underline mt-2">
            עוד עלינו ←
          </a>
        </motion.div>

      </div>
      <div className="divider-glow mt-14" />
    </section>
  )
}
