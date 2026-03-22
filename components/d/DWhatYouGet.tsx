'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STAGES = [
  {
    num: '01',
    badge: 'חלק 1',
    title: 'היסודות',
    sub: 'להבין את שפת המשחק',
    stats: { chapters: 5, lessons: 25, minutes: 82 },
    color: '#F5A624',
    about: 'שכר, זכויות עובד, תלוש השכר מסעיף לסעיף, מה הבנקים לא אומרים לכם על אשראי — ואיך ריבית קשורה לאינפלציה?',
  },
  {
    num: '02',
    badge: 'חלק 2',
    title: 'הצמיחה',
    sub: 'עוברים להתקפה',
    stats: { chapters: 2, lessons: 17, minutes: 57 },
    color: '#5EEAD4',
    about: 'השקעות - שוק ההון, מניות, אג"ח ומדדים — בשפה שמבינים. קרנות סל, DCA ועוד. וגם: נדל״ן, מינוף, משכנתא ובעיקר - ראש מעל המים.',
  },
  {
    num: '03',
    badge: 'חלק 3',
    title: 'המנכ"לים',
    sub: 'בונים מערכת מנצחת',
    stats: { chapters: 3, lessons: 15, minutes: 53 },
    color: '#A78BFA',
    about: 'התנהלות חכמה, שיטות לניהול כסף, הטבות שלא כולם מכירים, שכיר מול עצמאי, וצ׳ק ליסט לביצוע מיידי + שיעור בונוס מתנה: פסיכולוגיית הכסף.',
  },
]

export default function DWhatYouGet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase"
          >
            תוכן הקורס
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-black text-white text-center"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}
          >
            3 חלקים. 57 שיעורים. 3 שעות.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-white/30 text-sm"
          >
            גישה לצמיתות · עדכונים ללא תוספת עלות
          </motion.p>
        </div>

        {/* Stage cards */}
        <div className="space-y-5">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              id={`stage-${i + 1}`}
              className="relative rounded-3xl overflow-hidden border scroll-mt-6"
              style={{
                borderColor: `${stage.color}25`,
                background: `linear-gradient(135deg, ${stage.color}0A 0%, #161616 45%, #141414 100%)`,
                boxShadow: `0 0 60px ${stage.color}06, inset 0 1px 0 ${stage.color}15`,
              }}
            >
              {/* Top accent line */}
              <div className="h-px w-full" style={{
                background: `linear-gradient(to right, transparent, ${stage.color}50, transparent)`
              }} />

              <div className="px-8 md:px-12 py-10 text-center">

                {/* Stage number — decorative background */}
                <div className="relative mb-6">
                  <span
                    className="absolute inset-0 flex items-center justify-center font-black select-none pointer-events-none"
                    style={{
                      fontSize: 'clamp(7rem, 20vw, 14rem)',
                      color: `${stage.color}06`,
                      lineHeight: 1,
                      top: '-40%',
                    }}
                  >{stage.num}</span>

                  {/* Badge */}
                  <span
                    className="relative inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-4"
                    style={{ background: `${stage.color}18`, color: stage.color }}
                  >
                    {stage.badge}
                  </span>

                  {/* Title */}
                  <h3 className="relative font-black text-white mb-1"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
                    {stage.title}
                  </h3>
                  <p className="relative text-white/40 font-medium">{stage.sub}</p>
                </div>

                {/* Stats pills */}
                <div className="flex items-center justify-center gap-3 flex-wrap mb-7">
                  {[
                    `${stage.stats.chapters} פרקים`,
                    `${stage.stats.lessons} שיעורים`,
                    `${stage.stats.minutes} דקות`,
                  ].map((stat, j) => (
                    <span key={j}
                      className="text-sm font-semibold px-4 py-1.5 rounded-full"
                      style={{
                        background: `${stage.color}12`,
                        color: `${stage.color}CC`,
                        border: `1px solid ${stage.color}20`,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* About */}
                <p className="text-white/50 leading-relaxed max-w-xl mx-auto"
                  style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                  {stage.about}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
