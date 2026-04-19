'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const STAGES = [
  {
    phase: 'שלב 1',
    phaseTitle: 'היסודות — להבין את שפת המשחק',
    color: '#F5A624',
    chapters: [
      {
        title: 'מבוא',
        sub: 'היכרות עם הקורס, הגישה והחזון — איך לומדים כסף כמו מנכ״לים ולא כמו צרכנים.',
        lessons: [],
      },
      {
        title: 'ערך, לא נייר',
        sub: 'למה משלמים לכם? מה משפיע על השכר ואיך מגדילים אותו.',
        lessons: ['כסף, מאז ועד היום', 'אמצעי תשלום, ערך ותפוקה', 'חמשת הכוחות', 'סיכום'],
      },
      {
        title: 'חגורת הביטחון',
        sub: 'כל זכויות העובדים מתחת ומעל גיל 18. איך מוודאים שלא מנצלים אתכם.',
        lessons: ['פתיח זכויות', 'מתחת לגיל 18', 'מעל גיל 18', 'סיכום זכויות'],
      },
      {
        title: 'המסננת',
        sub: 'לאן נעלם הכסף בין הברוטו לנטו? פיצוח סעיפי המיסוי, ביטוח לאומי והפנסיה.',
        lessons: ['ברוטו-נטו', 'תחנות', 'תלוש שכר', 'תלוש שכר בפועל', 'סיכום'],
      },
      {
        title: 'סוחר, לא כספת',
        sub: 'איך הבנקים באמת מרוויחים?',
        lessons: ['פתיח', 'מחיר הכסף', 'כרטיסים ומסגרות'],
      },
      {
        title: 'כסף בעייתי',
        sub: 'זיהוי כסף שעובד נגדכם: מינוס, אשראי והלוואות.',
        lessons: ['מינוס', 'הגנב המודרני', 'סיכום'],
      },
      {
        title: 'מחיר הזמן',
        sub: 'ריבית הפריים, אינפלציה ואיך באמת מודדים רווח.',
        lessons: ['שלט רחוק', 'נוסחת הבוס', 'הגנב השקט', 'מראה למציאות', 'סיכום', 'סיכום חלק 1'],
      },
    ],
  },
  {
    phase: 'שלב 2',
    phaseTitle: 'הצמיחה — עוברים להתקפה',
    color: '#5EEAD4',
    chapters: [
      {
        title: 'כוח הזמן',
        sub: 'מהי השקעה, תשואה, ריבית דריבית — ואיך הזמן עובד לטובתכם.',
        lessons: ['פתיח השקעות', 'תשואה ד׳תשואה', 'סיכוי סיכון, פיזור וזמן', 'סיכום'],
      },
      {
        title: 'המגרש',
        sub: 'שוק ההון מבפנים: מניות, אג״ח, מדדים וההבדל בין משקיע למהמר.',
        lessons: ['הקניון של העולם', 'צרכן ומשקיע', 'מדדים', 'סיכום'],
      },
      {
        title: 'השיטה',
        sub: 'איך משקיעים בפועל: קרנות סל, פיזור, DCA והבחירה בין עצמאי, חצי-אוטומטי ומנוהל.',
        lessons: ['שלושת האופציות', 'מדדים', 'יוצאים לדרך', 'סיכום'],
      },
      {
        title: 'הקירות',
        sub: 'נדל״ן, מינוף, משכנתא, אסטרטגיית כניסה ואזהרות מהזדמנויות מסוכנות.',
        lessons: ['עוגן בכלכלה', 'מינוף — ראש מעל המים', 'אסטרטגיות ומלכודת', 'סיכום', 'סיכום חלק 2'],
      },
    ],
  },
  {
    phase: 'שלב 3',
    phaseTitle: 'המנכ״לים — בונים מערכת מנצחת',
    color: '#A78BFA',
    chapters: [
      {
        title: 'היד על הברז',
        sub: 'ניהול תזרים ותקציב: נוסחת הזהב, כרית ביטחון ושליטה יומיומית.',
        lessons: ['פתיח', 'הנוסחה', 'מלכודת הדבש', 'סיכום'],
      },
      {
        title: 'מפת האוצר',
        sub: 'הטבות מס שלא כל אחד מכיר: קרן השתלמות, נקודות זיכוי והחזרי מס.',
        lessons: ['פנסיה', 'קרן השתלמות', 'עצמאים', 'כסף על הרצפה', 'סיכום'],
      },
      {
        title: 'המערכת',
        sub: 'האינטגרציה של הכל — מערכת הפעלה שנתית, צ׳ק-ליסט מנכ״ל ותכנון העשור קדימה.',
        lessons: ['המפה', 'הקומות', 'צ׳ק-ליסט מנכ״ל', 'סיכום כולל'],
      },
      {
        title: 'הקופסה השחורה (בונוס)',
        sub: 'הפסיכולוגיה שמאחורי כסף: הטיות, באגים נוירולוגיים ואיך לעקוף את המוח.',
        lessons: ['המשכיות העצמי', 'שיעור מהקזינו'],
      },
    ],
  },
]

function ChapterRow({ chapter, color }: { chapter: typeof STAGES[0]['chapters'][0]; color: string }) {
  const [open, setOpen] = useState(false)
  const hasLessons = chapter.lessons.length > 0

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => hasLessons && setOpen(!open)}
        className={`w-full flex items-start gap-3 py-4 text-right ${hasLessons ? 'cursor-pointer group' : 'cursor-default'}`}
      >
        <div className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: color }} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base md:text-lg group-hover:text-[#F5A624] transition-colors">{chapter.title}</p>
          <p className="text-white/40 text-sm leading-relaxed mt-0.5">{chapter.sub}</p>
          {hasLessons && <p className="text-white/20 text-xs mt-1">{chapter.lessons.length} שיעורים</p>}
        </div>
        {hasLessons && (
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1.5 text-white/15">
            <ChevronDown size={16} />
          </motion.span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="pb-4 pr-6 space-y-1.5">
              {chapter.lessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/15 text-xs font-mono w-5 text-center">{i + 1}</span>
                  <span className="text-white/35 text-sm">{lesson}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StageAccordion({ stage, si, inView }: { stage: typeof STAGES[0]; si: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  const chapterCount = stage.chapters.length
  const lessonCount = stage.chapters.reduce((s, c) => s + Math.max(c.lessons.length, 1), 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: si * 0.1 }}
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: open ? `${stage.color}30` : `${stage.color}15`, background: `linear-gradient(160deg, ${stage.color}06 0%, #0E0E0E 50%)` }}
    >
      <button onClick={() => setOpen(!open)} className="w-full p-5 xs:p-6 md:p-8 text-right">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: `${stage.color}15`, color: stage.color }}>
              {stage.phase}
            </span>
            <h3 className="text-white font-bold text-lg md:text-xl">{stage.phaseTitle}</h3>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
            className="flex-shrink-0" style={{ color: stage.color }}>
            <ChevronDown size={20} />
          </motion.span>
        </div>
        <p className="text-white/25 text-sm mt-2 mr-1">{chapterCount} פרקים · {lessonCount} שיעורים</p>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 xs:px-6 md:px-8 pb-5 xs:pb-6 md:pb-8 pt-0">
              {stage.chapters.map((chapter, ci) => (
                <ChapterRow key={ci} chapter={chapter} color={stage.color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function N9aSyllabus() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const CHECKOUT_URL = useCheckoutUrl()

  const totalLessons = STAGES.reduce((sum, s) => sum + s.chapters.reduce((cs, c) => cs + Math.max(c.lessons.length, 1), 0), 0)

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-14">
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            די לאלתורים.
            <br />מתודולוגיה אחת. ברורה. פרקטית.
          </h2>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex flex-wrap justify-center gap-3 mb-14">
          {['בלי מילים גבוהות', 'בלי תיאוריה מיותרת', 'רק מה שאתה באמת צריך לדעת'].map((item, i) => (
            <span key={i} className="text-[#F5A624]/70 text-base md:text-lg font-medium px-4 py-2 rounded-full border border-[#F5A624]/15 bg-[#F5A624]/5">
              ✔ {item}
            </span>
          ))}
        </motion.div>

        {/* Course overview */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="text-center mb-10">
          <h3 className="font-bold text-white text-2xl md:text-3xl mb-2">3 שעות. {totalLessons} שיעורים. גישה לכל החיים.</h3>
          <p className="text-white/40 text-lg">לחץ על כל פרק כדי לראות את השיעורים</p>
        </motion.div>

        {/* Full syllabus accordion — stages closed by default */}
        <div className="space-y-4">
          {STAGES.map((stage, si) => (
            <StageAccordion key={si} stage={stage} si={si} inView={inView} />
          ))}
        </div>

        {/* Mid CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="text-center mt-14">
          <a href={CHECKOUT_URL}
            className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני רוצה גישה מלאה — ₪390
          </a>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
