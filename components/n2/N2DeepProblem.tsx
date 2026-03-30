'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N2DeepProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-12">
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
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">הכסף פשוט נעלם</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אתה מרוויח. מוציא.
              <br />ובסוף החודש אין לך מושג לאן הכל הלך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              זה לא כי אתה מבזבז יותר מדי —
              <br />זה כי אין לך שיטה.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              בלי שיטה — תמיד תרגיש שהכסף שולט בך.
            </p>
          </div>

          {/* Pain 2 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">אתה לא באמת מבין את המשכורת שלך</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              ברוטו. נטו. מסים. פנסיה. השתלמות.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              אם היו מבקשים ממך להסביר את התלוש שלך —
              <br />היית מצליח?
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              רוב האנשים לא.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              וזה לא סתם חוסר ידע —
              <br />זה כסף אמיתי שאתה עלול להפסיד כל חודש.
            </p>
          </div>

          {/* Pain 3 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">השקעות מרגישות כמו שפה אחרת</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              שמעת על מניות. מדדים. S&P500.
              <br />אבל אף אחד לא הסביר לך את זה כמו שצריך.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              אז אתה עושה את הדבר הכי טבעי —
              <br />לא עושה כלום.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              והכסף? יושב. ומאבד ערך.
            </p>
          </div>

          {/* Pain 4 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">התחושה שאתה מאחור</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              אנשים סביבך כבר מדברים על השקעות.
              <br />על כסף שעובד בשבילם.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              ואתה?
              <br />יודע שאתה צריך להתחיל —
              <br />אבל לא יודע איך.
            </p>
          </div>

          {/* Pain 5 */}
          <div>
            <h3 className="text-white font-bold text-3xl md:text-4xl mb-5">וכל חודש שעובר — עולה לך כסף</h3>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
              זה לא דרמה. זו מתמטיקה.
            </p>
            <p className="text-white/60 text-xl md:text-2xl leading-relaxed mt-4">
              כסף שלא עובד — נשחק.
              <br />מישהו שמתחיל מוקדם
              <br />יגיע למקום אחר לגמרי ממי שמחכה.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl leading-relaxed mt-4">
              לא קצת אחר. <span className="text-[#F5A624] font-bold">אחר לגמרי.</span>
            </p>
          </div>
        </motion.div>

        {/* Mid CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-xl md:text-2xl mb-6">
            אם זה מרגיש לך מוכר — זה בדיוק בשבילך
          </p>
          <a href={CHECKOUT_URL}
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-xl px-12 py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            יאללה, אני מתחיל
          </a>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
