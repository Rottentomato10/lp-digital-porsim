'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N2Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-3xl border border-[#F5A624]/20 bg-[#0D0B00]"
        >
          <h3 className="text-[#F5A624] font-black text-3xl md:text-4xl mb-8">
            עכשיו תדמיין מצב אחר לגמרי:
          </h3>
          <div className="space-y-6 text-white/70 text-xl md:text-2xl leading-relaxed">
            <p>
              אתה פותח את הבנק —
              <br />ויודע בדיוק מה קורה שם.
            </p>
            <p>
              אתה יודע כמה אתה יכול להוציא.
              <br />כמה אתה חוסך.
              <br />וכמה אתה משקיע.
            </p>
            <p>
              אתה מקבל תלוש שכר —
              <br />ומבין כל שורה.
              <br />אתה יודע שלא &quot;נעלם&quot; לך כסף.
            </p>
            <p>
              יש לך כסף שעובד בשבילך.
              <br />גם אם זה קטן בהתחלה —
              <br />זה בשליטה שלך.
            </p>
            <p>
              כשמישהו שואל אותך
              <br />&quot;מה אתה עושה עם הכסף שלך?&quot;
              <br />יש לך תשובה. <span className="text-white font-bold">ברורה.</span>
            </p>
            <p className="text-white font-bold text-2xl md:text-3xl pt-4">
              וזה לא פנטזיה.
              <br />זה מה שקורה כשיש לך ידע.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
