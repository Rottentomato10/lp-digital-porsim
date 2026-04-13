'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right gap-3 group">
        <span className="font-bold text-base md:text-lg text-white/80 group-hover:text-white transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
          className="flex-shrink-0 text-white/20"><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-white/45 text-base md:text-lg leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N11FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#060A13]">
      <div className="max-w-2xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10">
          <h2 className="font-black text-white text-2xl md:text-3xl">שאלות נפוצות</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#0D1117] border border-white/5 p-5 md:p-8">
          {FAQ.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
