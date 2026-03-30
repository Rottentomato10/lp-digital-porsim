'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N1DeepProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-12"
        >
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            אולי זה מוכר לך
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Pain 1 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">
              הכסף נעלם
            </h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אתה מרוויח. אתה מוציא. בסוף החודש אתה מסתכל על החשבון ולא מבין לאן הכל הלך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              זה לא בגלל שאתה מבזבז — זה בגלל שאין לך שיטה.
              אף אחד לא לימד אותך לבנות תקציב שבאמת עובד.
              לא כזה שגורם לך להרגיש רע — כזה שנותן לך שליטה.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              בלי שיטה, אתה תמיד תרגיש שהכסף שולט בך — ולא ההפך.
            </p>
          </div>

          {/* Pain 2 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">
              את המשכורת שלך אתה לא באמת מבין
            </h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              ברוטו, נטו, מס הכנסה, ביטוח לאומי, קרן פנסיה, קרן השתלמות —
              מישהו פעם הסביר לך מה כל אלה?
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              רוב האנשים לא יודעים לקרוא את תלוש השכר שלהם.
              הם לא יודעים אם הם מקבלים את מה שמגיע להם.
              הם לא יודעים אם המעסיק שלהם מפריש מה שצריך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              וזה לא סתם בורות — <span className="text-white font-medium">זה עולה כסף אמיתי</span>.
              כל חודש שעובר בלי שאתה מבין את התלוש שלך — הוא חודש שאתה אולי מפסיד כסף בלי לדעת.
            </p>
          </div>

          {/* Pain 3 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">
              ההשקעות מרגישות כמו שפה אחרת
            </h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              מניות, אג"ח, S&P500, קרנות סל, ריבית דריבית —
              שמעת את כל המילים האלה. ראית את הפוסטים באינסטגרם.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              אבל אף אחד לא הסביר לך אותן בצורה שבאמת נכנסת.
              אז אתה עושה את הדבר הכי טבעי — כלום.
              הכסף יושב. ואתה מחכה ל"יום שתבין".
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              אבל היום הזה לא מגיע לבד.
              <br /><span className="text-white font-medium">ובינתיים, כל שנה שהכסף שלך יושב בלי לעבוד — הוא מאבד מערכו.</span>
              האינפלציה לא מחכה שתהיה מוכן.
            </p>
          </div>

          {/* Pain 4 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">
              התחושה שאתה מפספס
            </h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אתה רואה אנשים סביבך שמדברים על השקעות, על חיסכון, על "לעשות את הכסף עובד".
              ואתה מרגיש שאתה מאחור.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              זה לא שאתה עצלן. זה לא שלא אכפת לך.
              פשוט אף אחד לא נתן לך את הכלים.
              ובלי כלים — קשה מאוד להתחיל.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              והדבר הכי מתסכל? <span className="text-white font-medium">שאתה יודע שאתה צריך לעשות משהו</span>.
              אתה רק לא יודע מה.
            </p>
          </div>

          {/* Pain 5 — cost of inaction */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">
              וכל יום שעובר — זה עולה לך
            </h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              זה לא דרמה. זה מתמטיקה.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              ריבית דריבית עובדת גם נגדך.
              כל שנה שעוברת בלי שהכסף שלך מושקע — היא שנה שאתה משלם עליה.
              בשקט. בלי לשים לב. בלי שמישהו שולח לך חשבון.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              מישהו שמתחיל להשקיע בגיל 20 עם סכום קטן כל חודש — מגיע למקום אחר לגמרי ממישהו שמתחיל בגיל 30.
              <br />לא קצת אחר. <span className="text-white font-medium">אחר לגמרי.</span>
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              ההבדל הוא לא כמה כסף יש לך —
              <br />ההבדל הוא <span className="text-[#F5A624] font-bold">מתי התחלת להבין</span>.
            </p>
          </div>
        </motion.div>

        {/* Vision — how life looks after */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 p-8 md:p-12 rounded-3xl border border-[#F5A624]/20 bg-[#0D0B00]"
        >
          <h3 className="text-[#F5A624] font-black text-3xl md:text-4xl mb-8">
            עכשיו תדמיין רגע את ההפך.
          </h3>
          <div className="space-y-6 text-white/70 text-xl md:text-2xl leading-relaxed">
            <p>
              אתה פותח את האפליקציה של הבנק ויודע בדיוק מה קורה שם.
              לאן הכסף הולך. כמה נשאר. מה המספר שאתה צריך להגיע אליו החודש.
            </p>
            <p>
              אתה מקבל תלוש שכר ומבין כל שורה.
              אתה יודע שמה שמגיע לך — אתה באמת מקבל.
            </p>
            <p>
              יש לך כסף שעובד בשבילך — גם כשאתה ישן.
              השקעת אותו במקום מסודר, שאתה מבין, שאתה בחרת בעצמך.
            </p>
            <p>
              מישהו שואל אותך "מה אתה עושה עם הכסף שלך?" — ויש לך תשובה.
              לא "אני לא יודע". לא "אני צריך לבדוק".
              <br />תשובה ברורה.
            </p>
            <p className="text-white font-bold text-2xl md:text-3xl pt-4">
              זה לא פנטזיה. זה מה שקורה כשיש לך ידע.
              <br />ו-3 שעות זה כל מה שמפריד בינך לבין שם.
            </p>
          </div>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
