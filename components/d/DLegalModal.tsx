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
        <p>פלטפורמת פורשים כנף, הכוללת אתר אינטרנט ו/או אפליקציה סלולרית (להלן: "הפלטפורמה"), מכבדת את פרטיות המשתמשים ופועלת בהתאם להוראות הדין הישראלי ובכפוף לדרישות בסיסיות של רגולציות בינלאומיות כגון ה-GDPR האירופי.</p>

        <div>
          <h3 className="text-white font-bold mb-2">סוגי המידע הנאסף</h3>
          <ol className="list-decimal list-inside space-y-2 mr-2">
            <li>מידע הנמסר באופן יזום על ידי המשתמש — שם מלא, מספר טלפון, כתובת דוא״ל ופרטים נוספים הנמסרים בטפסים, בפניות יזומות או במסגרת יצירת קשר.</li>
            <li>מידע פיננסי המוזן על ידי המשתמש באפליקציה — הכנסות, הוצאות, תקציבים, יעדים כלכליים, מאזן אישי ונתונים פיננסיים נוספים. הזנת מידע זה נעשית מרצון המשתמש בלבד.</li>
            <li>מידע טכני הנאסף באופן אוטומטי — כתובת IP, סוג מכשיר, מערכת הפעלה, דפדפן, משך ביקור, דפי צפייה ונתונים אנונימיים הנאספים באמצעות קבצי עוגיות וכלי מדידה כגון Google Analytics.</li>
            <li>התחברות באמצעות שירותי צד שלישי — בעת שימוש בשירותי התחברות חיצוניים כגון Google, עשוי להיאסף מידע בסיסי בכפוף למדיניות אותו שירות.</li>
          </ol>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">מטרות השימוש במידע</h3>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>מתן מענה לפניות משתמשים ויצירת קשר</li>
            <li>הפעלת הכלים והשירותים בפלטפורמה עבור המשתמש</li>
            <li>שיפור חוויית השימוש, התכנים והשירותים</li>
            <li>ניתוח סטטיסטי ואנליטי של דפוסי שימוש</li>
            <li>התאמת תכנים ושירותים בהתאם לאופן השימוש</li>
          </ul>
          <p className="mt-2">המידע הפיננסי שהוזן על ידי המשתמש אינו נמכר, מושכר או מועבר לצדדים שלישיים לצרכים מסחריים ביוזמת פורשים כנף. המידע לא יימסר לצדדים שלישיים אלא אם נדרש על פי דין, צו שיפוטי, הוראה של רשות מוסמכת או לצורך הגנה משפטית.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">אבטחת מידע ושמירתו</h3>
          <p>המידע האישי נשמר במערכות מאובטחות של ספקי שירות כגון Wix וספקי שירות נוספים. פורשים כנף נוקטת באמצעים סבירים ומקובלים להגנה על המידע, אולם אין ביכולתה להבטיח חסינות מוחלטת מפני חדירות או כשלים טכנולוגיים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">זכויות המשתמש</h3>
          <p>המשתמש זכאי לעיין במידע האישי שנשמר אודותיו, לבקש את תיקונו או מחיקתו, וכן להתנגד לשימוש בו לצורכי דיוור ישיר. פניות בנושא זה ניתן לשלוח ל: <span className="text-white">porsim.info@gmail.com</span></p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">קטינים</h3>
          <p>הפלטפורמה אינה מיועדת לילדים מתחת לגיל 13. משתמשים מתחת לגיל 18 מתבקשים לעשות שימוש בפלטפורמה בליווי הורה או אפוטרופוס חוקי.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">עוגיות (Cookies)</h3>
          <p>הפלטפורמה עושה שימוש בקבצי עוגיות לצורכי תפעול, מדידה ושיפור חוויית המשתמש. ניתן לשנות הגדרות הדפדפן לחסימת עוגיות, אולם ייתכן שחלק מהשירותים לא יפעלו באופן מלא.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">שינויים במדיניות</h3>
          <p>המשך השימוש בפלטפורמה מהווה הסכמה למדיניות פרטיות זו. פורשים כנף שומרת לעצמה את הזכות לעדכן את המדיניות מעת לעת.</p>
        </div>
      </div>
    ),
  },

  terms: {
    title: 'תנאי שימוש',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <p>ברוכים הבאים לפלטפורמת פורשים כנף. השימוש בפלטפורמה מהווה הסכמה מלאה ובלתי חוזרת לתנאי השימוש המפורטים במסמך זה. אם אינך מסכים לאחד או יותר מהתנאים הנכללים כאן הנך מתבקש שלא לעשות שימוש בפלטפורמה.</p>

        <div>
          <h3 className="text-white font-bold mb-2">מטרת הפלטפורמה ואי-מתן ייעוץ</h3>
          <p>הפלטפורמה נועדה להצגת מידע על שירותי חינוך פיננסי ותכנים נלווים. כל המידע המופיע בה מסופק לצורכי ידע כללי והעשרה בלבד ואינו מהווה ייעוץ פיננסי אישי, ייעוץ השקעות, ייעוץ מס או המלצה מחייבת לביצוע פעולה כלשהי. פורשים כנף אינה נושאת בכל אחריות לנזק שייגרם עקב הסתמכות על המידע המופיע בפלטפורמה.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">קניין רוחני</h3>
          <p>כל זכויות היוצרים וכל יתר זכויות הקניין הרוחני בפלטפורמה ובתכניה שייכים לפורשים כנף. אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות שימוש מסחרי ללא אישור מראש ובכתב.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">התחברות ושירותי צד שלישי</h3>
          <p>השימוש בפלטפורמה עשוי לכלול התחברות באמצעות שירותי צד שלישי כגון Google. המשתמש אחראי לשמירה על פרטי הגישה שלו. פורשים כנף אינה אחראית למדיניות או לתקלות של שירותים חיצוניים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">שימוש מותר ואחריות המשתמש</h3>
          <p>המשתמש מתחייב לעשות שימוש חוקי והוגן בפלטפורמה ולהימנע מפעילות הפוגעת בפלטפורמה או במשתמשים אחרים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">גיל משתמשים</h3>
          <p>השימוש בפלטפורמה מיועד למשתמשים מעל גיל 13. משתמשים מתחת לגיל 18 מתבקשים לעשות שימוש בליווי הורה, אפוטרופוס חוקי או מסגרת חינוכית רלוונטית.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">זמינות ותקלות</h3>
          <p>פורשים כנף אינה מתחייבת לזמינות רציפה של הפלטפורמה ואינה אחראית לנזקים הנובעים מהפסקות שירות.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">שינויים והפסקת פעילות</h3>
          <p>פורשים כנף רשאית לשנות, לעדכן או להפסיק את פעילות הפלטפורמה ולעדכן את תנאי השימוש מעת לעת לפי שיקול דעתה הבלעדי.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">דין וסמכות שיפוט</h3>
          <p>השימוש בפלטפורמה כפוף לדיני מדינת ישראל וסמכות השיפוט נתונה לבתי המשפט בירושלים.</p>
        </div>
      </div>
    ),
  },

  accessibility: {
    title: 'הצהרת נגישות',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <p>פורשים כנף אחראית על הקמת והפעלת אתר <span className="text-white">https://www.porsimkanaf.com</span>. אנו רואים חשיבות רבה במתן שירות שוויוני לכלל האזרחים ובשיפור השירות הניתן לאזרחים עם מוגבלות.</p>

        <div>
          <h3 className="text-white font-bold mb-2">רמת הנגישות באתר — AA</h3>
          <p>האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות 5568 התשע"ג 2013 ברמת AA, ומיישם את המלצות מסמך WCAG 2.2 מאת ארגון W3C. הנגשת האתר בוצעה על ידי חברת "Vee הנגשת אתרים".</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">תיקונים והתאמות שבוצעו</h3>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>התאמה לקוראי מסך — NVDA, JAWS</li>
            <li>אמצעי ניווט פשוטים וברורים</li>
            <li>תכני האתר כתובים באופן היררכי מסודר</li>
            <li>התאמה למגוון מסכים ורזולוציות</li>
            <li>מבנה קבוע לכל הדפים (H1/H2/H3)</li>
            <li>טקסט חלופי (alt) לכל התמונות</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">פונקציונליות תפריט הנגישות</h3>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>עצירת הבהובים ואנימציות</li>
            <li>דילוג ישיר לתוכן</li>
            <li>התאמה לניווט מקלדת</li>
            <li>הגדלה/הקטנה של טקסט</li>
            <li>ריווח בין אותיות/מילים/שורות</li>
            <li>ניגודיות גבוהה, הפוכה, שחור-לבן</li>
            <li>גופן קריא, הדגשת קישורים, מדריך קריאה</li>
            <li>שינוי סמן עכבר</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">יצירת קשר בנושא נגישות</h3>
          <p>נתקלתם בבעיית נגישות? נשמח לסייע.</p>
          <p className="mt-2">
            <span className="text-white font-medium">רכז נגישות:</span> אביתר דנגור<br />
            <span className="text-white font-medium">טלפון:</span> 053-728-2727<br />
            <span className="text-white font-medium">דוא״ל:</span> porsim.info@gmail.com
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">החרגות</h3>
          <p>למרות מאמצינו להנגיש את כלל הדפים, ייתכן שיתגלו חלקים שטרם הונגשו כראוי. אנו פועלים לשיפור מתמיד.</p>
        </div>

        <p className="text-white/30 text-xs">תאריך עדכון הצהרת נגישות: 30.01.2026</p>
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
