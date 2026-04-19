'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQ = [
  { q: 'אני צעיר — זה לא מוקדם מדי?', a: 'דווקא עכשיו זה הכי קריטי. מי שמתחיל להבין כסף לפני שיש לו הרבה — נמנע מהטעויות הגדולות. הפער בין מי שמתחיל ב-20 לבין 30 הוא משנה חיים.' },
  { q: 'אתם לא עוד קורס שמבטיח התעשרות?', a: 'לא. מי שמבטיח לך עושר מהיר — תתרחק. אנחנו נותנים הבנה ברורה של איך כסף עובד, וכלים אמיתיים לפעול.' },
  { q: 'למה לא ללמוד מיוטיוב?', a: 'אתה יכול. אבל ביוטיוב אתה מקבל חתיכות. כאן אתה מקבל תמונה שלמה — שלב אחרי שלב, מסודר ומובנה.' },
  { q: 'אין לי הרבה כסף — זה רלוונטי?', a: 'דווקא בגלל זה. הרגלים פיננסיים נבנים כשיש מעט כסף. הקורס מלמד אותך לחשוב נכון — לא משנה כמה יש לך.' },
  { q: 'מה אם זה לא מתאים לי?', a: '7 ימי אחריות מלאה. אם לא הרגשת שלמדת משהו חדש — החזר מלא. בלי שאלות.' },
  { q: 'כמה זמן הקורס?', a: 'כ-3 שעות. שיעורים של 2-5 דקות. אפשר לסיים ביום אחד או בקצב שלך.' },
  { q: 'צריך ידע מוקדם?', a: 'אפס. הקורס מתחיל מאפס ומתאים למי שמרגיש שאין לו מושג.' },
  { q: 'לכמה זמן הגישה?', a: 'לתמיד. תשלום אחד — גישה מלאה לכל החיים, כולל עדכונים. בלי מנוי חודשי.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right gap-4 group">
        <span className="font-semibold text-base md:text-lg text-gray-700 group-hover:text-[#1a1a1a] transition-colors leading-snug">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-gray-500 text-base leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N12Questions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-10">
          <h2 className="font-black text-[#1a1a1a] text-3xl md:text-4xl">שאלות נפוצות</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          {FAQ.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
