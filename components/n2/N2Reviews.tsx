'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  { name: 'עמית ר.', quote: 'הבנתי שאני מפסיד מאות שקלים בחודש בלי לשים לב. הקורס פקח לי את העיניים.' },
  { name: 'דניאל כ.', quote: 'פתחתי השקעה שבוע אחרי הקורס. לא האמנתי שזה כל כך פשוט כשמבינים.' },
  { name: 'אור כ.', quote: 'הלוואי שהייתי לומד את זה לפני שנים. הייתי חוסך לעצמי כל כך הרבה טעויות.' },
  { name: 'נועה ש.', quote: 'הבנתי שכסף שיושב בעובר ושב פשוט מאבד ערך. זה לבד שווה את הקורס.' },
  { name: 'מייק ג.', quote: 'למדתי שאני צריך לדעת לנהל כסף בעצמי ולא לסמוך על אף אחד. זה שינה לי את הגישה.' },
  { name: 'שירה ל.', quote: 'יצאתי מהקורס עם רצון אחד: להתחיל להשקיע. דחוףףףף.' },
  { name: 'עאמר ח.', quote: 'גיליתי שיש מלא דברים וחוקים שלא ידעתי עליהם. כסף זה באמת לא צחוק.' },
  { name: 'ליאור ק.', quote: 'הקורס גרם לי להתנהל אחרת עם כסף ולהתחיל לחסוך כבר מעכשיו.' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624] text-sm">★</span>)}
    </div>
  )
}

export default function N2Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            מה אומרים עלינו
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {REVIEWS.map((review, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#111111] border border-white/7">
              <Stars />
              <p className="text-white/65 text-lg leading-relaxed mb-4">״{review.quote}״</p>
              <p className="text-white/50 text-sm">{review.name}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
