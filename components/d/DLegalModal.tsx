'use client'

import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type ModalType = 'privacy' | 'terms' | 'accessibility' | null

const CONTENT: Record<NonNullable<ModalType>, { title: string; body: ReactNode }> = {
  privacy: {
    title: 'מדיניות פרטיות',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-bold mb-2">1. כללי</h3>
          <p>פורשים כנף (להלן: "החברה") מכבדת את פרטיות המשתמשים באתר. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">2. מידע שאנו אוספים</h3>
          <p>בעת הרכישה אנו אוספים: שם, כתובת דוא"ל, פרטי תשלום (מועברים ישירות לספק הסליקה — לא נשמרים אצלנו). בעת גלישה: כתובת IP, דפדפן, עמודים שנצפו — באמצעות עוגיות וכלי ניתוח.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">3. שימוש במידע</h3>
          <p>המידע משמש לעיבוד הזמנות, שליחת מייל אישור רכישה, שיפור השירות, ובמידת הצורך — לצרכי שיווק (בכפוף להסכמתך בלבד).</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">4. עוגיות (Cookies)</h3>
          <p>האתר משתמש בעוגיות לצורך ניתוח תנועה (Google Analytics) ושיפור חוויית המשתמש. ניתן לבטל עוגיות בהגדרות הדפדפן.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">5. זכויות המשתמש</h3>
          <p>יש לך זכות לעיין, לתקן, למחוק או לקבל העתק של המידע שנאסף אודותיך. לפנייה: support@porshimkanaf.co.il</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">6. אבטחת מידע</h3>
          <p>אנו נוקטים באמצעי אבטחה סבירים להגנת המידע. עם זאת, לא ניתן להבטיח אבטחה מוחלטת בסביבה דיגיטלית.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">7. יצירת קשר</h3>
          <p>לכל שאלה בנושא פרטיות: support@porshimkanaf.co.il</p>
        </div>
      </div>
    ),
  },
  terms: {
    title: 'תנאי שימוש',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-bold mb-2">1. כללי</h3>
          <p>השימוש באתר פורשים כנף מהווה הסכמה לתנאים המפורטים להלן. אנא קרא בעיון לפני הרכישה.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">2. הקורס ותוכנו</h3>
          <p>הקורס מיועד לצרכי חינוך והעשרה אישית בלבד. המידע אינו מהווה ייעוץ פיננסי, השקעות, מס או משפטי. החברה לא תישא באחריות להחלטות פיננסיות שתתקבלנה בעקבות הצפייה בקורס.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">3. רכישה וגישה</h3>
          <p>לאחר הרכישה תקבל גישה אישית לצמיתות לתכני הקורס. הגישה אינה ניתנת להעברה. אין להפיץ, לשתף, להעתיק או לשדר את התכנים ללא הסכמה בכתב.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">4. מדיניות ביטול והחזר</h3>
          <p>תוכל לבקש החזר מלא בתוך 7 ימים מיום הרכישה, ללא צורך בהסבר. לאחר 7 ימים לא יינתן החזר כספי. לפנייה: support@porshimkanaf.co.il</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">5. קניין רוחני</h3>
          <p>כל תכני הקורס, כולל סרטונים, מצגות וחומרים נלווים, הם רכושה הבלעדי של פורשים כנף ומוגנים בזכויות יוצרים.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">6. שינויים בתנאים</h3>
          <p>החברה שומרת את הזכות לעדכן תנאים אלה בכל עת. המשך השימוש לאחר שינוי מהווה הסכמה לתנאים המעודכנים.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">7. יצירת קשר</h3>
          <p>לכל שאלה: support@porshimkanaf.co.il</p>
        </div>
      </div>
    ),
  },
  accessibility: {
    title: 'הצהרת נגישות',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <div>
          <h3 className="text-white font-bold mb-2">מחויבות לנגישות</h3>
          <p>פורשים כנף מחויבת להנגיש את אתרה לאנשים עם מוגבלויות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג-2013.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">רמת הנגישות</h3>
          <p>האתר עומד ברמת תאימות AA של תקן WCAG 2.1 במרבית הדפים. אנו עובדים באופן שוטף לשיפור הנגישות בכלל חלקי האתר.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">מה בוצע</h3>
          <ul className="list-disc list-inside space-y-1 mr-3">
            <li>הגדרת שפה (עברית, RTL) בקוד האתר</li>
            <li>טקסט חלופי לתמונות</li>
            <li>ניגודיות צבעים עמידה בתקן</li>
            <li>תפריט נגישות ייעודי (כפתור שמאל תחתון)</li>
            <li>אפשרות הגדלת טקסט, ניגודיות גבוהה וגווני אפור</li>
            <li>ניווט מקלדת בכפתורים ובקישורים</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">פנייה בנושא נגישות</h3>
          <p>נתקלת בבעיית נגישות? אנחנו כאן לעזור. רכז הנגישות שלנו יטפל בפנייתך בהקדם.</p>
          <p className="mt-2">דוא"ל: accessibility@porshimkanaf.co.il<br />זמן מענה: עד 5 ימי עסקים</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">עדכון הצהרה</h3>
          <p>הצהרה זו עודכנה לאחרונה בינואר 2025.</p>
        </div>
      </div>
    ),
  },
}

interface Props {
  type: ModalType
  onClose: () => void
}

export function LegalModal({ type, onClose }: Props) {
  useEffect(() => {
    if (!type) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [type, onClose])

  const content = type ? CONTENT[type] : null

  return (
    <AnimatePresence>
      {type && content && (
        <motion.div
          key={type}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg max-h-[80vh] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
            style={{ background: '#111111' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/7 flex-shrink-0">
              <h2 className="text-white font-black text-lg">{content.title}</h2>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all">
                <X size={16} />
              </button>
            </div>
            {/* Content */}
            <div className="overflow-y-auto px-6 py-5 flex-1">
              {content.body}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export type { ModalType }
