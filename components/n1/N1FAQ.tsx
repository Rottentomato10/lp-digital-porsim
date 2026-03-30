'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EXPANDED_FAQ = [
  {
    q: 'אני עדיין צעיר — זה לא מוקדם מדי להתחיל עם כסף?',
    a: 'דווקא עכשיו זה הכי קריטי.\nמי שמתחיל להבין כסף לפני שיש לו הרבה — נמנע מהטעויות הגדולות כשכן יהיה לו.\nהפער בין מי שמתחיל בגיל 18–20 לבין מי שמתחיל בגיל 30 הוא לא קטן — הוא משנה חיים.',
  },
  {
    q: 'אתם לא עוד קורס שמבטיח התעשרות מהירה?',
    a: 'לא.\nאנחנו לא מבטיחים שתהיה עשיר — ומי שכן מבטיח? תתרחק.\nמה כן? שתצא עם הבנה ברורה של איך כסף עובד, ועם כלים אמיתיים לפעול.\nמה תעשה איתם — זה כבר תלוי בך.',
  },
  {
    q: 'אני יכול ללמוד את זה לבד מיוטיוב — למה לרכוש קורס?',
    a: 'אתה יכול. אבל רוב האנשים לא באמת מתקדמים ככה.\nרואים סרטון פה, עוד אחד שם… ולא עושים עם זה כלום.\nהקורס הזה נותן לך מסלול ברור: שלב אחרי שלב, מסודר ומובנה — מהבסיס, להבנה, לפעולות אמיתיות.\nביוטיוב אתה מקבל חתיכות. כאן אתה מקבל תמונה שלמה.',
  },
  {
    q: 'אין לי הרבה כסף עדיין — זה בכלל רלוונטי לי?',
    a: 'דווקא בגלל זה.\nהרגלים פיננסיים נבנים כשיש מעט כסף — לא כשיש הרבה.\nאם לא תלמד לנהל 10,000 ₪ לא תדע להפוך אותם ל-100,000 ₪.\nהקורס מלמד אותך לחשוב נכון — לא משנה כמה יש לך עכשיו.',
  },
  {
    q: 'זה מרגיש לי יקר',
    a: 'הגיוני. אבל בוא נעשה חשבון פשוט:\nטעות אחת בהשקעה, הלוואה עם ריבית גבוהה, או פשוט כסף שיושב בעו"ש ומאבד ערך — יכולה לעלות לך אלפי שקלים.\nהקורס עולה פחות מארוחה זוגית במסעדה טובה — ונשאר איתך לכל החיים.',
  },
  {
    q: 'מה אם זה לא מתאים לי?',
    a: 'יש אחריות מלאה של 7 ימים.\nאם אחרי שבוע אתה לא מרגיש שלמדת משהו חדש — תקבל החזר מלא. בלי שאלות, בלי אותיות קטנות.\nאין לך מה להפסיד.',
  },
  {
    q: 'כמה זמן הקורס?',
    a: 'כ-3 שעות בסך הכל.\nאפשר לסיים ביום אחד — או לפרוס על כמה ימים בקצב שלך.\nכל שיעור קצר וממוקד. בלי שעמום, בלי מילוי.',
  },
  {
    q: 'צריך ידע מוקדם?',
    a: 'לא. אפס.\nהקורס מתחיל מאפס ומתאים בדיוק למי שמרגיש שאין לו מושג.\nאם היית יודע את זה כבר — לא היית צריך אותנו.',
  },
  {
    q: 'אני לא טוב עם מספרים — אצליח?',
    a: 'כן. הקורס לא דורש ממך לעשות חישובים.\nהכל מוסבר בשפה פשוטה, עם דוגמאות מהחיים.\nאם אתה יודע לקרוא — אתה יכול להבין כסף.',
  },
  {
    q: 'לכמה זמן יש לי גישה?',
    a: 'לתמיד.\nתשלום אחד — וגישה מלאה לכל החיים, כולל עדכונים עתידיים.\nבלי מנוי חודשי, בלי הפתעות.',
  },
  {
    q: 'מה ההבדל בינכם לבין יועץ פיננסי?',
    a: 'יועץ פיננסי אומר לך מה לעשות.\nאנחנו מלמדים אותך להבין למה.\nכשאתה מבין — אתה מקבל החלטות טובות יותר לבד, בלי לשלם למישהו כל חודש.',
  },
  {
    q: 'אני כבר עובד ומרוויח — מאוחר מדי?',
    a: 'ממש לא. דווקא עכשיו יש לך כסף שאתה יכול לעשות איתו דברים חכמים.\nהשאלה היא אם אתה עושה אותם — או רק מקווה לטוב.\nאף פעם לא מאוחר מדי להתחיל, אבל כל יום שעובר בלי ידע — עולה לך.',
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

export default function N1FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            שאלות ותשובות
          </span>
          <h2 className="mt-4 font-black text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            אם אתה מתלבט — בטח שאלת את עצמך את זה
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-[#101010] border border-white/7 p-6 md:p-8"
        >
          {EXPANDED_FAQ.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
