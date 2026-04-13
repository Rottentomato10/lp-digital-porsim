'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
  {
    badge: 'חלק 1', title: 'היסודות', stats: '5 פרקים · 25 שיעורים · 82 דקות',
    about: 'שכר, זכויות עובד ותלוש השכר, אשראי, ריבית ואינפלציה.',
    lessons: ['מבוא לעולם הפיננסי', 'ברוטו ונטו — מה ההבדל?', 'תלוש שכר שורה אחרי שורה', 'ביטוח לאומי וזכויות', 'אשראי, ריבית ואינפלציה'],
    color: '#F5A624',
  },
  {
    badge: 'חלק 2', title: 'הצמיחה', stats: '2 פרקים · 17 שיעורים · 57 דקות',
    about: 'מניות, אג"ח, מדדים, קרנות סל. נדל"ן, מינוף, משכנתא.',
    lessons: ['מה זה שוק ההון?', 'מניות ואג"ח בפשטות', 'S&P500 ומדדים', 'קרנות סל — איך מתחילים', 'נדל"ן ומשכנתא'],
    color: '#5EEAD4',
  },
  {
    badge: 'חלק 3', title: 'שליטה', stats: '3 פרקים · 15 שיעורים · 53 דקות',
    about: 'ניהול חכם, הטבות, שכיר מול עצמאי. + בונוס: פסיכולוגיית כסף.',
    lessons: ['ניהול תקציב שעובד', 'הטבות מס שלא ידעת עליהן', 'שכיר vs עצמאי', 'בונוס: פסיכולוגיית כסף'],
    color: '#A78BFA',
  },
]

function SyllabusAccordion({ stage, inView }: { stage: typeof STAGES[0]; inView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden border transition-colors duration-300"
      style={{ borderColor: open ? `${stage.color}40` : `${stage.color}25`, background: `linear-gradient(135deg, ${stage.color}08 0%, #141414 100%)` }}>
      <button onClick={() => setOpen(!open)} className="w-full p-4 xs:p-6 md:p-8 text-right">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${stage.color}18`, color: stage.color }}>
              {stage.badge}
            </span>
            <h4 className="text-white font-bold text-xl">{stage.title}</h4>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
            className="flex-shrink-0" style={{ color: stage.color }}>
            <ChevronDown size={18} />
          </motion.span>
        </div>
        <p className="text-white/30 text-sm mt-2">{stage.stats}</p>
        <p className="text-white/60 text-lg mt-1">{stage.about}</p>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 xs:px-6 md:px-8 pb-4 xs:pb-6 md:pb-8 pt-0">
              <div className="border-t pt-4" style={{ borderColor: `${stage.color}15` }}>
                {stage.lessons.map((lesson, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <span className="text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${stage.color}12`, color: stage.color }}>
                      {i + 1}
                    </span>
                    <span className="text-white/55 text-base">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N9Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-14">
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            די לאלתורים.
            <br />מתודולוגיה אחת. ברורה. פרקטית.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-14">
          {['בלי מילים גבוהות', 'בלי תיאוריה מיותרת', 'רק מה שאתה באמת צריך לדעת'].map((item, i) => (
            <span key={i} className="text-[#F5A624]/70 text-base md:text-lg font-medium px-4 py-2 rounded-full border border-[#F5A624]/15 bg-[#F5A624]/5">
              ✔ {item}
            </span>
          ))}
        </motion.div>

        {/* 3 Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center p-6 rounded-2xl border border-white/8 bg-[#111111]">
              <div className="w-12 h-12 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#F5A624] font-black">{step.num}</span>
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-3">{step.title}</h3>
              <p className="text-white/60 text-base md:text-lg leading-relaxed whitespace-pre-line">{step.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Outcomes */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-5 xs:p-8 md:p-10 rounded-2xl bg-[#101010] border border-white/7 mb-14">
          <h3 className="text-white font-bold text-2xl md:text-3xl mb-6">עם מה אתה יוצא בפועל?</h3>
          <div className="space-y-4">
            {OUTCOMES.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#34D399] text-xl mt-0.5">✔</span>
                <p className="text-white/70 text-lg md:text-xl">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-lg mt-6">וזה משהו שתשתמש בו כל החיים.</p>
        </motion.div>

        {/* App mockup */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-[#101010] border border-white/7 mb-14">
          {/* Phone mockup */}
          <div className="w-[180px] flex-shrink-0">
            <div className="relative rounded-[24px] border-2 border-white/10 bg-[#1a1a1a] overflow-hidden"
              style={{ aspectRatio: '9/19.5', boxShadow: '0 0 40px rgba(245,166,36,0.06)' }}>
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 flex justify-center z-10">
                <div className="w-20 h-5 bg-[#1a1a1a] rounded-b-xl" />
              </div>
              {/* Screen content */}
              <div className="absolute inset-2 rounded-[18px] bg-[#0D0D0D] flex flex-col p-3 pt-7">
                <p className="text-[#F5A624] text-[10px] font-bold mb-2">תזרים חודשי</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-[#34D399] text-lg font-black">₪4,280</span>
                  <span className="text-white/30 text-[8px]">נשאר</span>
                </div>
                {/* Mini bars */}
                <div className="space-y-1.5 flex-1">
                  {[
                    { label: 'דיור', pct: 35, color: '#F5A624' },
                    { label: 'אוכל', pct: 20, color: '#5EEAD4' },
                    { label: 'חיסכון', pct: 25, color: '#34D399' },
                    { label: 'בילויים', pct: 12, color: '#A78BFA' },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-0.5">
                        <span className="text-white/40 text-[7px]">{bar.label}</span>
                        <span className="text-white/30 text-[7px]">{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full" style={{ width: `${bar.pct}%`, background: bar.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#F5A624] text-sm font-bold mb-2">בונוס: אפליקציית ניהול תזרים</p>
            <p className="text-white/60 text-lg leading-relaxed">
              כלי מעשי שמלווה אותך אחרי הקורס — לדעת בדיוק לאן כל שקל הולך, בלי אקסלים מסובכים.
            </p>
            <p className="text-white/30 text-sm mt-2">שווי ₪200 · כלול בחינם</p>
          </div>
        </motion.div>

        {/* Interactive Syllabus Accordion */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="text-center mb-10">
          <h3 className="font-bold text-white text-2xl md:text-3xl mb-2">3 שעות. 57 שיעורים. גישה לכל החיים.</h3>
          <p className="text-white/40 text-lg">לחץ על כל חלק כדי לראות את השיעורים</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }} className="space-y-4">
          {STAGES.map((stage, i) => (
            <SyllabusAccordion key={i} stage={stage} inView={inView} />
          ))}
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
