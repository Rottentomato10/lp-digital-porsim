'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N4DeepProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="pb-16 md:pb-24 pt-8 md:pt-10 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">אולי זה מוכר לך</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="space-y-16">

          <div>
            <h3 className="text-white font-bold text-2xl xs:text-3xl md:text-4xl mb-5">הכסף נעלם</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אתה מרוויח. אתה מוציא. בסוף החודש אתה מסתכל על החשבון ולא מבין לאן הכל הלך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              זה לא בגלל שאתה מבזבז — זה בגלל שאין לך שיטה.
              אף אחד לא לימד אותך לבנות תקציב שבאמת עובד.
              לא כזה שגורם לך להרגיש רע — כזה שנותן לך שליטה.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              בלי שיטה, אתה תמיד תרגיש שהכסף שולט בך — ולא ההפך.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl xs:text-3xl md:text-4xl mb-5">את המשכורת שלך אתה לא באמת מבין</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              ברוטו, נטו, מס הכנסה, ביטוח לאומי, קרן פנסיה, קרן השתלמות —
              מישהו פעם הסביר לך מה כל אלה?
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              רוב האנשים לא יודעים לקרוא את תלוש השכר שלהם.
              הם לא יודעים אם הם מקבלים את מה שמגיע להם.
              הם לא יודעים אם המעסיק מפריש מה שצריך.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              וזה לא סתם בורות — זה כסף אמיתי שאתה מפסיד כל חודש.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl xs:text-3xl md:text-4xl mb-5">ההשקעות מרגישות כמו שפה אחרת</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              מניות, אג"ח, S&P500, קרנות סל, ריבית דריבית —
              שמעת את כל המילים האלה. ראית את הפוסטים באינסטגרם.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              אבל אף אחד לא הסביר לך אותן בצורה שבאמת נכנסת.
              אז אתה עושה את הדבר הכי טבעי — כלום.
              הכסף יושב. ומאבד ערך.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              האינפלציה לא מחכה שתהיה מוכן.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl xs:text-3xl md:text-4xl mb-5">התחושה שאתה מפספס</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אתה רואה אנשים סביבך שמדברים על השקעות, על חיסכון, על &quot;שהכסף יעבוד בשבילך&quot;.
              ואתה מרגיש שאתה מאחור.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              זה לא שאתה עצלן. פשוט אף אחד לא נתן לך את הכלים.
              ובלי כלים — קשה מאוד להתחיל.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl xs:text-3xl md:text-4xl mb-5">וכל חודש שעובר — זה עולה לך</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              זה לא דרמה. זו מתמטיקה.
              ריבית דריבית עובדת גם נגדך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              מישהו שמתחיל להשקיע בגיל 20 עם סכום קטן כל חודש — מגיע למקום אחר לגמרי ממישהו שמתחיל בגיל 30.
              לא קצת אחר. <span className="text-[#F5A624] font-bold">אחר לגמרי.</span>
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              ההבדל בין להתחיל להשקיע 500 ₪ בחודש בגיל 22 לבין להתחיל בגיל 32 הוא לא כמה אלפי שקלים — זה יכול להיות ההבדל בין דירה לבין חלום על דירה.
            </p>
            <p className="text-white/50 text-xl md:text-2xl leading-relaxed mt-6">
              השאלה היא לא אם תטפל בזה — אלא מתי.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="mt-16 text-center">
          <p className="text-white/40 text-xl md:text-2xl mb-6">אם זה מרגיש לך מוכר — זה בדיוק בשבילך</p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            תן לי להבין כסף עכשיו
          </a>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
