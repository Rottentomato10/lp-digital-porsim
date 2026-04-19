'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const C = ['#F5A624', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#14B8A6']

const REVIEWS = [
  { name: 'אור כ.', city: 'תל אביב', year: '2025', quote: 'בלי להגזים — הקורס הזה שינה לי את הראש לגמרי. דברים שאף אחד לא טרח להסביר לי פתאום הפכו ברורים. הלוואי שהייתי רואה את זה שנים קודם.' },
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
    <section ref={ref} className="py-14 md:py-20 bg-[#0A0F1A]">
      <div className="max-w-lg mx-auto px-5">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-8">
          <p className="text-[#10B981] text-xs font-bold tracking-widest uppercase mb-2">15,000+ כבר שם</p>
          <h2 className="font-black text-white text-2xl">מה אומרים אחרי הקורס</h2>
        </motion.div>

        <div className="space-y-3">
          {REVIEWS.map((r, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`p-4 rounded-xl border border-white/5 ${i === 0 ? 'bg-[#F5A624]/[0.04] border-[#F5A624]/10' : 'bg-white/[0.02]'}`}
            >
              <div className="flex gap-0.5 mb-2">
                {Array(5).fill(0).map((_, j) => <span key={j} className="text-[#F5A624] text-[10px]">★</span>)}
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-3">״{r.quote}״</p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${C[i % C.length]}15`, border: `1.5px solid ${C[i % C.length]}25` }}>
                  <span className="font-bold text-[10px]" style={{ color: C[i % C.length] }}>{r.name[0]}</span>
                </div>
                <span className="text-white/30 text-xs">{r.name} · {r.city} · {r.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
