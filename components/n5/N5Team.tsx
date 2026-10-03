'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

// תוכן אמיתי מעמוד "אודות" באתר הראשי (porsimkanaf.com/אודות) — מוצג כאן בתוך הדף
// עצמו כדי שלא נוציא לקוח מדף הנחיתה (לפתוח טאב חדש בלבד אם ממש בוחרים בכך).
const STORY_TEXT = [
  'כמעט כולנו מסיימים 12 שנות לימוד עם המון ידע — אבל בלי להבין באמת איך להתנהל עם כסף.',
  'איך קוראים תלוש שכר? איך בונים תקציב? מה באמת עושה ריבית דריבית? איך מקבלים החלטות כלכליות טובות, ואיך נמנעים מטעויות שיכולות ללוות אותנו שנים?',
  'את רוב הדברים האלה אנחנו לומדים רק אחרי בית הספר — בדרך כלל דרך ניסוי וטעייה, ולעיתים במחיר יקר.',
  'פורשים כנף הוקמה כדי לשנות את זה.',
  'אנחנו רוצים לפגוש צעירים בדיוק בנקודה שבה הידע הזה יכול לעשות את ההבדל הגדול ביותר, ולתת להם כלים פשוטים, פרקטיים ורלוונטיים לחיים האמיתיים.',
  'מאז, יותר מ-15,000 תלמידים בעשרות מוסדות חינוך עברו את הסדנאות שלנו — ויצאו מהן עם ידע וכלים שהם יכולים לקחת איתם הרבה מעבר לכיתה.',
]
const MISSION_TEXT = [
  'לתת לכל צעיר וצעירה בישראל בסיס פיננסי טוב יותר לחיים.',
  'לא ללמד איך "להתעשר", אלא איך להבין כסף, להתנהל איתו, להימנע מטעויות ולקבל החלטות טובות יותר לאורך הדרך.',
]
const FOUNDERS = [
  {
    name: 'דקל קאפח',
    role: 'מתכנן פיננסי מוסמך (CFP) · תכנון פיננסי והשקעות',
    description:
      'דקל הוא מתכנן פיננסי מוסמך (CFP), עם ניסיון בעולמות התכנון הפיננסי וההשקעות. הוא מתמחה בהפיכת נושאים פיננסיים מורכבים לכלים פשוטים, ברורים ויישומיים — גם למי שמגיע בלי רקע קודם.',
  },
  {
    name: 'אביתר דנגור',
    role: 'B.A בכלכלה · תעודת הוראה מטעם חותם',
    description:
      'אביתר בעל תואר B.A בכלכלה ותעודת הוראה מטעם חותם, עם ניסיון רב שנים בחינוך ובהוראה. החיבור בין הרקע הכלכלי שלו לניסיון בכיתה הוא הבסיס לדרך שבה התכנים של פורשים כנף נבנים ומועברים.',
  },
]

function AboutModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          aria-label="סגירה"
          className="absolute left-4 top-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <h2 className="text-white font-bold text-2xl md:text-3xl mb-6 pr-2">
          את מה שלא לימדו אותנו על כסף — החלטנו ללמד את הדור הבא
        </h2>

        <div className="space-y-3 mb-8">
          {STORY_TEXT.map((p, i) => (
            <p key={i} className="text-white/60 text-base md:text-lg leading-relaxed">{p}</p>
          ))}
        </div>

        <h3 className="text-[#F5A624] font-bold text-lg md:text-xl mb-3">המשימה שלנו</h3>
        <div className="space-y-2 mb-8">
          {MISSION_TEXT.map((p, i) => (
            <p key={i} className="text-white/60 text-base md:text-lg leading-relaxed">{p}</p>
          ))}
        </div>

        <h3 className="text-[#F5A624] font-bold text-lg md:text-xl mb-4">מי עומד מאחורי פורשים כנף</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <p className="text-white font-bold">{f.name}</p>
              <p className="text-[#F5A624] text-sm mb-2">{f.role}</p>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function N5Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [showAbout, setShowAbout] = useState(false)

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-10">
          <Image src="/logo.png" alt="פורשים כנף" width={200} height={200}
            className="w-36 h-36 md:w-44 md:h-44 object-contain mx-auto my-6 drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6 text-center">

          <div className="flex items-center justify-center gap-8 flex-wrap mb-8">
            {[
              { val: '5+', label: 'שנות פעילות' },
              { val: '15,000+', label: 'תלמידי תיכון' },
              { val: '50+', label: 'מוסדות חינוך' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-[#F5A624] text-2xl">{s.val}</p>
                <p className="text-white/30 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold text-2xl md:text-3xl mb-2">מאחורי הסדנה</h3>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            ב-5 השנים האחרונות אנחנו מעבירים סדנאות חינוך פיננסי בבתי ספר, יחידות צבאיות ומסגרות חינוכיות ברחבי הארץ — כחלק מתוכניות ההעשרה של משרד החינוך, לכ-15,000 תלמידי תיכון ב-50+ מוסדות חינוך.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/50 text-base md:text-lg">
            <span>דקל קאפח — מייסד שותף, מתכנן פיננסי (CFP)</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span>אביתר דנגור — מייסד שותף, רקע בחינוך וכלכלה</span>
          </div>
          <button
            onClick={() => setShowAbout(true)}
            className="inline-block text-[#F5A624] text-base md:text-lg font-medium hover:underline mt-2"
          >
            עוד עלינו ←
          </button>
        </motion.div>

      </div>
      <div className="divider-glow mt-14" />

      <AnimatePresence>
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </AnimatePresence>
    </section>
  )
}
