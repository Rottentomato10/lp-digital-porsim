'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { num: 1, title: 'להבין', desc: 'איך כסף עובד באמת\n(משכורת, מסים, בנקים)\nבלי מילים גבוהות. בלי סיבוכים.' },
  { num: 2, title: 'לגרום לכסף לעבוד', desc: 'השקעות. שוק ההון. מדדים.\nבלי פחד. בלי בלבול.' },
  { num: 3, title: 'לשלוט', desc: 'שיטה פשוטה לניהול כסף\nשאתה באמת יכול ליישם.\nלדעת לאן כל שקל הולך.' },
]

const OUTCOMES = [
  'תדע לקרוא תלוש שכר ולהבין אם חסר לך כסף',
  'תבין מה זה S&P500 ולמה 90% מהמשקיעים המקצועיים לא מכים אותו',
  'תדע כמה מס הכנסה אתה אמור לשלם — ואם אתה משלם יותר מדי',
  'תבנה שיטה לניהול כסף שמתאימה לך — ותדע בדיוק כמה אתה יכול להשקיע כל חודש',
  'תבין למה כסף בעו"ש מאבד ערך ומה האלטרנטיבות שעומדות בפניך',
]

const STAGES = [
  { badge: 'חלק 1', title: 'היסודות', stats: '5 פרקים · 25 שיעורים · 82 דקות', about: 'שכר, זכויות עובד ותלוש השכר, אשראי, ריבית ואינפלציה.', color: '#F5A624' },
  { badge: 'חלק 2', title: 'הצמיחה', stats: '2 פרקים · 17 שיעורים · 57 דקות', about: 'מניות, אג"ח, מדדים, קרנות סל. נדל"ן, מינוף, משכנתא.', color: '#5EEAD4' },
  { badge: 'חלק 3', title: 'שליטה', stats: '3 פרקים · 15 שיעורים · 53 דקות', about: 'ניהול חכם, הטבות, שכיר מול עצמאי. + בונוס: פסיכולוגיית כסף.', color: '#A78BFA' },
]

export default function N6Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#0F1520]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-14">
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            לא עוד טיפים.
            <br />מסלול אחד. ברור. פרקטי.
          </h2>
        </motion.div>

        {/* What's different */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-14">
          {['בלי מילים גבוהות', 'בלי תיאוריה מיותרת', 'רק מה שאתה באמת צריך לדעת'].map((item, i) => (
            <span key={i} className="text-[#F5A624]/70 text-base md:text-lg font-medium px-4 py-2 rounded-full border border-[#F5A624]/12 bg-[#F5A624]/5">
              ✔ {item}
            </span>
          ))}
        </motion.div>

        {/* 3 Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center p-6 rounded-2xl border border-white/8 bg-[#1A2333]">
              <div className="w-12 h-12 rounded-full bg-[#F5A624]/12 border border-[#F5A624]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#F5A624] font-black">{step.num}</span>
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-3">{step.title}</h3>
              <p className="text-white/55 text-base md:text-lg leading-relaxed whitespace-pre-line">{step.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Outcomes */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-5 xs:p-8 md:p-10 rounded-2xl bg-[#141E2B] border border-white/7 mb-14">
          <h3 className="text-white font-bold text-2xl md:text-3xl mb-6">עם מה אתה יוצא בפועל?</h3>
          <div className="space-y-4">
            {OUTCOMES.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#F5A624] text-xl mt-0.5">✔</span>
                <p className="text-white/65 text-lg md:text-xl">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-white/35 text-lg mt-6">וזה משהו שתשתמש בו כל החיים.</p>
        </motion.div>

        {/* Syllabus */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="text-center mb-10">
          <h3 className="font-bold text-white text-2xl md:text-3xl mb-2">3 שעות. 57 שיעורים. גישה לכל החיים.</h3>
          <p className="text-white/35 text-lg">שיעורים קצרים של 2–5 דקות. מושלם לצפייה בדרך לעבודה או ללימודים.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }} className="space-y-4">
          {STAGES.map((stage, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border p-4 xs:p-6 md:p-8"
              style={{ borderColor: `${stage.color}20`, background: `linear-gradient(135deg, ${stage.color}06 0%, #141E2B 100%)` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${stage.color}15`, color: stage.color }}>
                  {stage.badge}
                </span>
                <h4 className="text-white font-bold text-xl">{stage.title}</h4>
              </div>
              <p className="text-white/30 text-sm mb-2">{stage.stats}</p>
              <p className="text-white/55 text-lg">{stage.about}</p>
            </div>
          ))}
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
