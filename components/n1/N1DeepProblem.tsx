'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PAIN_POINTS = [
  {
    headline: 'הכסף נעלם',
    body: 'אתה מרוויח. אתה מוציא. בסוף החודש אתה מסתכל על החשבון ולא מבין לאן הכל הלך. זה לא בגלל שאתה מבזבז — זה בגלל שאין לך שיטה.',
  },
  {
    headline: 'את המשכורת שלך אתה לא באמת מבין',
    body: 'ברוטו, נטו, מס הכנסה, ביטוח לאומי, פנסיה — מישהו פעם הסביר לך מה כל אלה? רוב האנשים לא יודעים לקרוא את תלוש השכר שלהם. וזה עולה להם כסף.',
  },
  {
    headline: 'ההשקעות מרגישות כמו שפה אחרת',
    body: 'מניות, אג"ח, S&P500, קרנות סל, ריבית דריבית — שמעת את כל המילים האלה. אבל אף אחד לא הסביר לך אותן בצורה שבאמת נכנסת. אז אתה פשוט לא עושה כלום.',
  },
  {
    headline: 'אתה יודע שאתה צריך לעשות משהו',
    body: 'יש לך את התחושה שאתה מפספס. שכסף שיושב בעו"ש מאבד ערך. שאתה צריך להתחיל "לעשות משהו חכם" — אבל אתה לא יודע מאיפה מתחילים.',
  },
  {
    headline: 'וכל יום שעובר — זה עולה לך',
    body: 'זה לא דרמה. ריבית דריבית עובדת גם נגדך. כל שנה שעוברת בלי שהכסף שלך עובד בשבילך — היא שנה שאתה משלם עליה. בשקט, בלי לשים לב.',
  },
]

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

        <div className="space-y-12">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-4">
                {point.headline}
              </h3>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Vision — how life looks if you solve this */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 md:p-10 rounded-3xl border border-[#F5A624]/20 bg-[#0D0B00]"
        >
          <h3 className="text-[#F5A624] font-black text-2xl md:text-3xl mb-6">
            עכשיו תדמיין רגע את ההפך.
          </h3>
          <div className="space-y-4 text-white/70 text-lg md:text-xl leading-relaxed">
            <p>אתה יודע בדיוק לאן כל שקל הולך.</p>
            <p>אתה מבין את תלוש השכר שלך — ויודע שלא מרמים אותך.</p>
            <p>יש לך שיטה לחיסכון שעובדת בלי להרגיש שאתה מוותר על משהו.</p>
            <p>הכסף שלך מושקע — ועובד בשבילך גם כשאתה ישן.</p>
            <p className="text-white font-bold text-xl md:text-2xl pt-4">
              זה לא פנטזיה. זה מה שקורה כשיש לך ידע.
            </p>
          </div>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
