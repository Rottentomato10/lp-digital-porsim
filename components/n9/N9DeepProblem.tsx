'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'
import { Wallet, FileText, TrendingUp, Users, Clock } from 'lucide-react'

const PROBLEMS = [
  {
    icon: Wallet,
    title: 'הכסף פשוט "עובר דרכך"',
    body: 'אתה עובד קשה בשביל המשכורת, אבל היא לא באמת נשארת אצלך. בסוף החודש אתה מסתכל על החשבון ולא מבין לאן הכל הלך.',
    detail: 'זה לא בגלל שאתה מבזבז — זה בגלל שאין לך שיטה. אף אחד לא לימד אותך לבנות תקציב שבאמת עובד.',
    punchline: 'בלי שיטה, הכסף תמיד יהיה רק "תייר" בחשבון הבנק שלך.',
  },
  {
    icon: FileText,
    title: 'עיוורון פיננסי מול תלוש השכר',
    body: 'ברוטו, נטו, מס הכנסה, ביטוח לאומי, קרן פנסיה, קרן השתלמות — מישהו פעם הסביר לך מה כל אלה?',
    detail: 'אתה מפסיד כסף ששייך לך, רק כי אתה לא קורא את האותיות הקטנות.',
    punchline: 'וזה לא סתם בורות — זה כסף אמיתי שנעלם לך כל חודש.',
  },
  {
    icon: TrendingUp,
    title: 'ההשקעות מרגישות כמו שפה אחרת',
    body: 'מניות, אג"ח, S&P500, קרנות סל, ריבית דריבית — שמעת את כל המילים האלה. ראית את הפוסטים באינסטגרם.',
    detail: 'אבל אף אחד לא הסביר לך אותן בצורה שבאמת נכנסת. אז אתה עושה את הדבר הכי טבעי — כלום.',
    punchline: 'האינפלציה לא מחכה שתהיה מוכן.',
  },
  {
    icon: Users,
    title: 'התחושה שאתה מפספס',
    body: 'אתה רואה אנשים סביבך שמדברים על השקעות, על חיסכון, על "שהכסף יעבוד בשבילך". ואתה מרגיש שאתה מאחור.',
    detail: 'זה לא שאתה עצלן. פשוט אף אחד לא נתן לך את הכלים.',
    punchline: 'ובלי כלים — קשה מאוד להתחיל.',
  },
  {
    icon: Clock,
    title: 'וכל חודש שעובר — זה עולה לך',
    body: 'זו לא דרמה. זו מתמטיקה. ריבית דריבית עובדת גם נגדך.',
    detail: 'ההבדל בין להתחיל להשקיע 500 ₪ בחודש בגיל 22 לבין 32 — זה לא כמה אלפי שקלים. זה יכול להיות ההבדל בין דירה לבין חלום על דירה.',
    punchline: 'השאלה היא לא אם תטפל בזה — אלא מתי.',
  },
]

function ProblemCard({ problem, index, inView }: { problem: typeof PROBLEMS[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = problem.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => setExpanded(!expanded)}
      className="group rounded-2xl border border-white/8 bg-[#111111] hover:border-[#F5A624]/25 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-5 xs:p-6 md:p-8">
        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#F5A624]/10 border border-[#F5A624]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F5A624]/15 transition-colors">
            <Icon size={20} className="text-[#F5A624]" />
          </div>
          <h3 className="text-white font-bold text-xl xs:text-2xl md:text-3xl leading-tight">{problem.title}</h3>
        </div>

        {/* Body — always visible */}
        <p className="text-white/55 text-lg md:text-xl leading-[1.8] mb-3">
          {problem.body}
        </p>

        {/* Expandable detail */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-white/55 text-lg md:text-xl leading-[1.8] mb-3">
            {problem.detail}
          </p>
        </motion.div>

        {/* Punchline */}
        <p className="text-white font-medium text-lg md:text-xl leading-[1.8]">
          {problem.punchline}
        </p>

        {/* Expand hint */}
        <p className="text-white/20 text-sm mt-3 group-hover:text-white/30 transition-colors">
          {expanded ? 'לחץ לסגירה' : 'לחץ לפרטים נוספים'}
        </p>
      </div>
    </motion.div>
  )
}

export default function N9DeepProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="pb-16 md:pb-24 pt-8 md:pt-10 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-12">
          <span className="text-[#F5A624] font-semibold text-base md:text-lg tracking-widest uppercase">אולי זה מוכר לך</span>
        </motion.div>

        {/* Cards layout */}
        <div className="space-y-4">
          {PROBLEMS.map((problem, i) => (
            <ProblemCard key={i} problem={problem} index={i} inView={inView} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="mt-16 text-center">
          <p className="text-white/40 text-xl md:text-2xl mb-6">אם זה מרגיש לך מוכר — זה בדיוק בשבילך</p>
          <a href={CHECKOUT_URL}
            className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            תן לי להבין כסף עכשיו
          </a>
        </motion.div>

      </div>
      <div className="divider-glow mt-16" />
    </section>
  )
}
