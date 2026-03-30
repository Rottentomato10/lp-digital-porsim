'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const FAQ_ITEMS = [
  {
    q: 'אני עדיין צעיר — זה לא מוקדם מדי?',
    a: 'דווקא עכשיו זה הכי קריטי.\nמי שמתחיל להבין כסף לפני שיש לו הרבה — נמנע מהטעויות הגדולות כשכן יהיה לו.\nהפער בין מי שמתחיל בגיל 20 לבין מי שמתחיל בגיל 30 הוא לא קטן — הוא משנה חיים.',
  },
  {
    q: 'אתם לא עוד קורס שמבטיח התעשרות מהירה?',
    a: 'לא.\nאנחנו לא מבטיחים שתהיה עשיר — ומי שכן מבטיח? תתרחק.\nמה כן? שתצא עם הבנה ברורה של איך כסף עובד, ועם כלים אמיתיים לפעול.',
  },
  {
    q: 'אני יכול ללמוד את זה לבד מיוטיוב — למה לרכוש קורס?',
    a: 'אתה יכול. אבל רוב האנשים לא באמת מתקדמים ככה.\nרואים סרטון פה, עוד אחד שם… ולא עושים עם זה כלום.\nביוטיוב אתה מקבל חתיכות. כאן אתה מקבל תמונה שלמה.',
  },
  {
    q: 'אין לי הרבה כסף — זה בכלל רלוונטי?',
    a: 'דווקא בגלל זה.\nהרגלים פיננסיים נבנים כשיש מעט כסף.\nהקורס מלמד אותך לחשוב נכון — לא משנה כמה יש לך.',
  },
  {
    q: 'זה מרגיש לי יקר',
    a: 'טעות אחת בהשקעה, הלוואה עם ריבית גבוהה, או כסף שיושב בעו"ש ומאבד ערך — עולה אלפי שקלים.\nהקורס עולה פחות מארוחה זוגית — ונשאר איתך לכל החיים.',
  },
  {
    q: 'מה אם זה לא מתאים לי?',
    a: 'יש אחריות מלאה של 7 ימים.\nאם אחרי שבוע אתה לא מרגיש שלמדת משהו חדש — תקבל החזר מלא.\nבלי שאלות. אין לך מה להפסיד.',
  },
  {
    q: 'כמה זמן הקורס?',
    a: 'כ-3 שעות. אפשר לסיים ביום אחד — או בקצב שלך.\nכל שיעור קצר וממוקד. בלי שעמום.',
  },
  {
    q: 'צריך ידע מוקדם?',
    a: 'אפס.\nהקורס מתחיל מאפס. אם היית יודע את זה כבר — לא היית צריך אותנו.',
  },
  {
    q: 'אני לא טוב עם מספרים',
    a: 'הקורס לא דורש חישובים.\nהכל מוסבר בשפה פשוטה עם דוגמאות מהחיים.',
  },
  {
    q: 'לכמה זמן יש לי גישה?',
    a: 'לתמיד. תשלום אחד — גישה מלאה לכל החיים, כולל עדכונים.\nבלי מנוי חודשי.',
  },
  {
    q: 'מה ההבדל בינכם לבין יועץ פיננסי?',
    a: 'יועץ אומר לך מה לעשות. אנחנו מלמדים אותך להבין למה.\nכשאתה מבין — אתה מקבל החלטות טובות יותר לבד.',
  },
  {
    q: 'אני כבר עובד — מאוחר מדי?',
    a: 'ממש לא. דווקא עכשיו יש לך כסף לעשות איתו דברים חכמים.\nאף פעם לא מאוחר מדי, אבל כל יום שעובר בלי ידע — עולה לך.',
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
      <div className="max-w-3xl mx-auto px-5">

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
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
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
