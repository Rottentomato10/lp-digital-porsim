'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AVATAR_COLORS = ['#F5A624', '#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#14B8A6', '#F97316', '#D946EF']

const FEATURED = {
  name: 'אור כ.',
  city: 'תל אביב',
  year: '2025',
  quote: 'בלי להגזים — הקורס הזה שינה לי את הראש לגמרי. דברים שאף אחד לא טרח להסביר לי פתאום הפכו ברורים. הלוואי שהייתי רואה את זה שנים קודם.',
}

const REVIEWS = [
  { name: 'עמית ר.', city: 'הרצליה', year: '2025', quote: 'הבנתי שאני מפסיד מאות שקלים בחודש בלי לשים לב. הקורס פקח לי את העיניים.' },
  { name: 'דניאל כ.', city: 'ירושלים', year: '2024', quote: 'פתחתי תיק השקעות שבוע אחרי הקורס. לא האמנתי שזה כל כך פשוט כשמבינים.' },
  { name: 'נועה ש.', city: 'חיפה', year: '2025', quote: 'הלוואי שהייתי לומדת את זה לפני שנים. הייתי חוסכת לעצמי כל כך הרבה טעויות.' },
  { name: 'מייק ג.', city: 'כרמיאל', year: '2024', quote: 'למדתי שאני צריך לדעת לנהל כסף בעצמי ולא לסמוך על אף אחד. זה שינה לי את הגישה.' },
  { name: 'שירה ל.', city: 'רמת גן', year: '2025', quote: 'יצאתי מהקורס עם רצון אחד: להתחיל להשקיע. דחוףףףף.' },
  { name: 'ליאור ק.', city: 'באר שבע', year: '2025', quote: 'הקורס גרם לי להתנהל אחרת עם כסף ולהתחיל לחסוך כבר מעכשיו.' },
]

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18`, border: `2px solid ${color}30` }}>
      <span className="font-bold text-sm" style={{ color }}>{name[0]}</span>
    </div>
  )
}

export default function N11Proof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#060A13]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-14">
          <p className="text-[#10B981] text-sm font-semibold tracking-widest uppercase mb-4">
            15,000+ כבר שם
          </p>
          <h2 className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            מה אומרים אחרי הקורס
          </h2>
        </motion.div>

        {/* Featured — large quote */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative p-6 xs:p-8 md:p-12 rounded-3xl mb-6 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(245,166,36,0.06) 0%, rgba(16,185,129,0.03) 100%)',
            border: '1px solid rgba(245,166,36,0.12)',
          }}>
          <div className="text-[#F5A624]/20 text-6xl font-serif leading-none mb-4">״</div>
          <p className="text-white text-lg md:text-2xl font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
            {FEATURED.quote}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Avatar name={FEATURED.name} color={AVATAR_COLORS[0]} />
            <div className="text-right">
              <p className="text-white/50 text-sm font-medium">{FEATURED.name} · {FEATURED.city}</p>
              <p className="text-white/25 text-xs">{FEATURED.year}</p>
            </div>
          </div>
        </motion.div>

        {/* Grid — compact cards */}
        <div className="grid md:grid-cols-3 gap-3">
          {REVIEWS.map((review, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="p-5 rounded-2xl bg-[#0D1117] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex gap-0.5 mb-3">
                {Array(5).fill(0).map((_, j) => <span key={j} className="text-[#F5A624] text-xs">★</span>)}
              </div>
              <p className="text-white/55 text-[15px] leading-relaxed mb-4">״{review.quote}״</p>
              <div className="flex items-center gap-2">
                <Avatar name={review.name} color={AVATAR_COLORS[(i + 1) % AVATAR_COLORS.length]} />
                <div>
                  <p className="text-white/40 text-sm">{review.name} · {review.city}</p>
                  <p className="text-white/20 text-xs">{review.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
