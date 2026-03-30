'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N2Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-14">
          <h2 className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            לא עוד טיפים מפוזרים.
            <br />מסלול אחד. ברור. קצר.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-12"
        >
          {/* Step 1 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center">
              <span className="text-[#F5A624] font-black">1</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">להבין</h3>
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
                איך כסף עובד באמת
                <br />(משכורת, מסים, בנקים)
                <br />בלי מילים גבוהות. בלי סיבוכים.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center">
              <span className="text-[#F5A624] font-black">2</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">לשלוט</h3>
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
                שיטה פשוטה לניהול כסף
                <br />שאתה באמת יכול ליישם.
                <br />לדעת לאן כל שקל הולך.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center">
              <span className="text-[#F5A624] font-black">3</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">לגרום לכסף לעבוד</h3>
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed">
                השקעות. שוק ההון. מדדים.
                <br />בלי פחד. בלי בלבול.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What you get */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 md:p-10 rounded-2xl bg-[#101010] border border-white/7"
        >
          <h3 className="text-white font-bold text-2xl md:text-3xl mb-6">מה אתה יוצא עם זה בפועל</h3>
          <div className="space-y-4">
            {[
              'תדע לקרוא תלוש שכר ולהבין אם חסר לך כסף',
              'תבנה שיטה לניהול כסף שמתאימה לך',
              'תדע בדיוק כמה אתה יכול להשקיע כל חודש',
              'תבין השקעות ברמה שמאפשרת להתחיל לבד',
              'תפסיק לדחות — ותתחיל לפעול',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#F5A624] text-xl mt-0.5">✔</span>
                <p className="text-white/70 text-lg md:text-xl">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Syllabus summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white font-bold text-2xl md:text-3xl mb-3">
            3 שעות. 57 שיעורים. גישה לכל החיים.
          </p>
          <p className="text-white/50 text-xl md:text-2xl">
            בלי חפירות. בלי בזבוז זמן.
            <br />רק מה שאתה באמת צריך לדעת.
          </p>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
