'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURED = {
  name: 'אור כ.',
  quote: 'בלי להגזים — הקורס הזה שינה לי את הראש לגמרי. דברים שאף אחד לא טרח להסביר לי פתאום הפכו ברורים. הלוואי שהייתי רואה את זה שנים קודם.',
}

const REVIEWS = [
  { name: 'עמית ר.', quote: 'הבנתי שאני מפסיד מאות שקלים בחודש בלי לשים לב. הקורס פקח לי את העיניים.' },
  { name: 'דניאל כ.', quote: 'פתחתי תיק השקעות שבוע אחרי הקורס. לא האמנתי שזה כל כך פשוט כשמבינים.' },
  { name: 'נועה ש.', quote: 'הלוואי שהייתי לומדת את זה לפני שנים. הייתי חוסכת לעצמי כל כך הרבה טעויות.' },
  { name: 'מייק ג.', quote: 'למדתי שאני צריך לדעת לנהל כסף בעצמי ולא לסמוך על אף אחד. זה שינה לי את הגישה.' },
  { name: 'שירה ל.', quote: 'יצאתי מהקורס עם רצון אחד: להתחיל להשקיע. דחוףףףף.' },
  { name: 'עאמר ח.', quote: 'גיליתי שיש מלא דברים וחוקים שלא ידעתי עליהם. כסף זה באמת לא צחוק.' },
  { name: 'ליאור ק.', quote: 'הקורס גרם לי להתנהל אחרת עם כסף ולהתחיל לחסוך כבר מעכשיו.' },
  { name: 'מאיה ד.', quote: 'לפני הקורס כסף היה נושא מלחיץ. עכשיו אני פחות פוחדת ויותר מבינה.' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624] text-sm">★</span>)}
    </div>
  )
}

export default function N4Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        {/* Featured review */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative p-8 md:p-10 rounded-3xl border border-[#F5A624]/20 bg-[#120E00] mb-6 overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(245,166,36,0.07), transparent)' }} />
          <div className="relative z-10">
            <div className="flex justify-center mb-3">
              {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624]">★</span>)}
            </div>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-5 max-w-lg mx-auto">
              ״{FEATURED.quote}״
            </p>
            <p className="text-white/50 text-sm">{FEATURED.name}</p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-4">
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
