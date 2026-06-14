'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const FAQ_ITEMS = [
  {
    q: 'זה מרגיש לי יקר',
    a: 'טעות אחת בהלוואה, ריבית שלא בדקת, או כסף שיושב בעו"ש ומאבד ערך — עולה אלפי שקלים בשנה.\nהסדנה עולה פחות מארוחה זוגית במסעדה — ונשארת איתך לכל החיים.',
  },
  {
    q: 'אני יכול ללמוד את זה לבד מיוטיוב',
    a: 'טכנית? כן. בפועל? כמעט אף אחד לא עושה את זה.\nרואים סרטון פה, עוד אחד שם, וחוזרים לאותם הרגלים. ביוטיוב אתה מקבל חתיכות מפוזרות בלי סדר. כאן אתה מקבל מערכת שלמה — מא׳ עד ת׳ — שבנויה לתת לך תוצאות.',
  },
  {
    q: 'מה אם זה לא מתאים לי?',
    a: 'יש אחריות מלאה של 7 ימים. אם לא הרגשת שלמדת משהו חדש — החזר מלא, בלי שאלות.\nאין לך מה להפסיד. הסיכון היחיד הוא לא לנסות.',
  },
  {
    q: 'אתם לא עוד סדנה שמבטיחה להתעשר מהר?',
    a: 'ממש לא. ומי שמבטיח לך את זה — תברח.\nאנחנו מלמדים אותך להבין איך כסף עובד, לקבל החלטות חכמות ולהימנע מטעויות. זה לא סקסי — אבל זה מה שבאמת משנה.',
  },
  {
    q: 'אין לי הרבה כסף — זה בכלל רלוונטי?',
    a: 'דווקא בגלל זה. הרגלים פיננסיים נבנים כשיש מעט.\nמי שלומד לנהל 3,000₪ בחודש — ידע לנהל 30,000₪ כשהם יגיעו.',
  },
  {
    q: 'אני עדיין צעיר — זה לא מוקדם מדי?',
    a: 'מי שמתחיל בגיל 20 מגיע לגיל 30 עם כלים, חיסכון וביטחון. מי שמתחיל בגיל 30 — מגיע לאותו מקום עם חרטה שלא התחיל קודם.\nהזמן הוא היתרון הכי גדול שיש לך עכשיו.',
  },
  {
    q: 'כמה זמן זה לוקח?',
    a: '3 שעות. 58 שיעורים קצרים וממוקדים — בלי חפירות.\nאפשר לסיים ביום אחד או לפרוס לשבוע בקצב שלך.',
  },
  {
    q: 'צריך רקע כלשהו?',
    a: 'אפס. הסדנה מתחילה מ"מה זה בכלל כסף" ובונה משם.\nאם היה לך את הידע הזה — לא היית צריך אותנו.',
  },
  {
    q: 'אני לא טוב עם מספרים',
    a: 'אין פה נוסחאות או חישובים. הכל מוסבר בשפה פשוטה, עם דוגמאות מהחיים — גלידריה, ברמנים, ארוחות.\nאם אתה יודע לקרוא עברית, אתה יכול להבין כסף.',
  },
  {
    q: 'לכמה זמן יש לי גישה?',
    a: 'לתמיד. תשלום אחד — גישה מלאה לכל החיים, כולל כל העדכונים העתידיים. בלי מנוי, בלי חידוש.',
  },
  {
    q: 'מה ההבדל בינכם לבין יועץ פיננסי?',
    a: 'יועץ אומר לך מה לעשות. אנחנו מלמדים אותך להבין למה.\nכשאתה מבין — אתה לא צריך לשלם למישהו שיגיד לך מה לעשות עם הכסף שלך.',
  },
  {
    q: 'אני כבר עובד ומרוויח — מאוחר מדי?',
    a: 'ממש לא — דווקא עכשיו יש לך כסף אמיתי לנהל.\nאבל כל חודש שעובר בלי ידע — זה כסף שנשאר על השולחן.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right gap-3 group">
        <span className="font-bold text-lg md:text-xl text-white group-hover:text-[#F5A624] transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
          className="flex-shrink-0 text-[#F5A624]/50"><ChevronDown size={18} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-white/60 text-lg md:text-xl leading-relaxed pb-5 whitespace-pre-line">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N2FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">שאלות ותשובות</span>
          <h2 className="mt-4 font-black text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            אם אתה מתלבט — בטח שאלת את עצמך את זה
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-[#101010] border border-white/7 p-6 md:p-8"
        >
          {FAQ_ITEMS.slice(0, 6).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>

        {/* Mid CTA */}
        <div className="text-center my-10">
          <p className="text-white/40 text-lg mb-4">אם זה ענה לך — פשוט תתחיל</p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-base xs:text-lg px-7 xs:px-10 py-3.5 xs:py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מתחיל עכשיו
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl bg-[#101010] border border-white/7 p-6 md:p-8"
        >
          {FAQ_ITEMS.slice(6).map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
