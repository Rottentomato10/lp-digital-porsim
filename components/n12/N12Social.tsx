'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COLORS = ['#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#14B8A6']

const REVIEWS = [
  { name: 'אור כ.', city: 'תל אביב', year: '2025', quote: 'בלי להגזים — הקורס הזה שינה לי את הראש לגמרי. דברים שאף אחד לא טרח להסביר לי פתאום הפכו ברורים. הלוואי שהייתי רואה את זה שנים קודם.', featured: true },
  { name: 'עמית ר.', city: 'הרצליה', year: '2025', quote: 'הבנתי שאני מפסיד מאות שקלים בחודש בלי לשים לב. הקורס פקח לי את העיניים.' },
  { name: 'דניאל כ.', city: 'ירושלים', year: '2024', quote: 'פתחתי תיק השקעות שבוע אחרי הקורס. לא האמנתי שזה כל כך פשוט כשמבינים.' },
  { name: 'נועה ש.', city: 'חיפה', year: '2025', quote: 'הלוואי שהייתי לומדת את זה לפני שנים. הייתי חוסכת לעצמי כל כך הרבה טעויות.' },
  { name: 'שירה ל.', city: 'רמת גן', year: '2025', quote: 'יצאתי מהקורס עם רצון אחד: להתחיל להשקיע. דחוףףףף.' },
  { name: 'ליאור ק.', city: 'באר שבע', year: '2025', quote: 'הקורס גרם לי להתנהל אחרת עם כסף ולהתחיל לחסוך כבר מעכשיו.' },
]

export default function N12Social() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-12">
          <p className="text-[#10B981] text-sm font-bold tracking-widest uppercase mb-3">15,000+ כבר למדו</p>
          <h2 className="font-black text-[#1a1a1a] text-3xl md:text-4xl">מה אומרים אחרי הקורס</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`p-6 rounded-2xl border border-gray-100 ${r.featured ? 'md:col-span-2 lg:col-span-1 bg-[#FFFBEB]' : 'bg-[#FAFAF9]'}`}
            >
              <div className="flex gap-0.5 mb-3">
                {Array(5).fill(0).map((_, j) => <span key={j} className="text-[#F59E0B] text-sm">★</span>)}
              </div>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-5">״{r.quote}״</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${COLORS[i % COLORS.length]}15`, border: `1.5px solid ${COLORS[i % COLORS.length]}30` }}>
                  <span className="font-bold text-xs" style={{ color: COLORS[i % COLORS.length] }}>{r.name[0]}</span>
                </div>
                <div>
                  <p className="text-gray-700 text-sm font-medium">{r.name} · {r.city}</p>
                  <p className="text-gray-400 text-xs">{r.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
