'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-right border-b border-white/5 last:border-0 py-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-sm text-white/70">{q}</span>
        <span className="text-white/20 text-xs flex-shrink-0">{open ? '−' : '+'}</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="text-white/35 text-sm leading-relaxed pt-3">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function N12Questions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#0A0F1A]">
      <div className="max-w-lg mx-auto px-5">
        <motion.h2 initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="font-black text-white text-xl mb-6">שאלות נפוצות</motion.h2>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          {FAQ.map((item, i) => <Item key={i} q={item.q} a={item.a} />)}
        </motion.div>
      </div>
    </section>
  )
}
