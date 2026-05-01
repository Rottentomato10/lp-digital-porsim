/* eslint-disable react/no-unescaped-entities */
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
        <p>פלטפורמת פורשים כנף, הכוללת אתר אינטרנט ו/או אפליקציה סלולרית (להלן: &quot;הפלטפורמה&quot;), מכבדת את פרטיות המשתמשים ופועלת בהתאם להוראות הדין הישראלי, לרבות חוק הגנת הפרטיות, ובכפוף לעקרונות בסיסיים של רגולציות בינלאומיות כגון ה-GDPR.</p>

        <div>
          <h3 className="text-white font-bold mb-2">סוגי המידע הנאסף</h3>
          <div className="space-y-3 mr-2">
            <div>
              <p className="text-white/70 font-medium">מידע הנמסר באופן יזום על ידי המשתמש</p>
              <p>שם מלא, מספר טלפון, כתובת דוא&quot;ל ופרטים נוספים הנמסרים בטפסים, בפניות יזומות או במסגרת יצירת קשר.</p>
            </div>
            <div>
              <p className="text-white/70 font-medium">מידע פיננסי המוזן על ידי המשתמש</p>
              <p>הכנסות, הוצאות, תקציבים, יעדים כלכליים, מאזן אישי ונתונים פיננסיים נוספים. הזנת מידע זה נעשית מרצון המשתמש בלבד ובאחריותו.</p>
            </div>
            <div>
              <p className="text-white/70 font-medium">מידע טכני הנאסף באופן אוטומטי</p>
              <p>כתובת IP, סוג מכשיר, מערכת הפעלה, דפדפן, זמני שימוש, דפי צפייה, נתוני גלישה ונתונים סטטיסטיים הנאספים באמצעות קבצי עוגיות וכלים אנליטיים כגון Google Analytics.</p>
            </div>
            <div>
              <p className="text-white/70 font-medium">התחברות באמצעות שירותי צד שלישי</p>
              <p>בעת שימוש בשירותי התחברות חיצוניים, עשוי להיאסף מידע בסיסי כגון שם וכתובת דוא&quot;ל, בהתאם להרשאות שניתנו על ידי המשתמש ובהתאם למדיניות אותו שירות.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">מטרות השימוש במידע</h3>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>מתן שירות ותפעול הפלטפורמה</li>
            <li>יצירת קשר עם המשתמש ומתן מענה לפניות</li>
            <li>שיפור חוויית המשתמש והתכנים</li>
            <li>ניתוח סטטיסטי ואנליטי של דפוסי שימוש</li>
            <li>התאמת תכנים ושירותים בהתאם לשימוש בפועל</li>
            <li>שליחת עדכונים, תוכן שיווקי או הצעות, בכפוף להסכמת המשתמש ובאפשרות להסרה בכל עת</li>
          </ul>
          <p className="mt-3">המידע הפיננסי שהוזן על ידי המשתמש אינו נמכר, מושכר או מועבר לצדדים שלישיים לצרכים מסחריים ביוזמת פורשים כנף.</p>
          <p className="mt-2">המידע לא יימסר לצדדים שלישיים אלא באחד מהמקרים הבאים:</p>
          <ul className="list-disc list-inside space-y-1 mr-2 mt-1">
            <li>לצורך אספקת השירות (ספקי שירות, מערכות טכנולוגיות וכו&apos;)</li>
            <li>בהתאם לדרישת דין, צו שיפוטי או הוראת רשות מוסמכת</li>
            <li>לצורך הגנה על זכויות משפטיות של החברה</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">אחסון מידע והעברתו</h3>
          <p>המידע עשוי להישמר ולהיות מעובד בשרתים של ספקי שירות חיצוניים, לרבות מחוץ לישראל. המשתמש מסכים לכך שהמידע עשוי להיות מועבר למדינות שאינן מעניקות רמת הגנה זהה לזו שבדין הישראלי.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">אבטחת מידע</h3>
          <p>המידע נשמר במערכות מאובטחות של ספקי שירות. פורשים כנף נוקטת באמצעים סבירים ומקובלים להגנה על המידע, אולם אין ביכולתה להבטיח חסינות מוחלטת מפני חדירות, גישה בלתי מורשית או כשלים טכנולוגיים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">שמירת מידע</h3>
          <p>המידע יישמר למשך הזמן הדרוש לצורך מימוש מטרות השימוש בו, או בהתאם לדרישות הדין.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">זכויות המשתמש</h3>
          <p>המשתמש זכאי:</p>
          <ul className="list-disc list-inside space-y-1 mr-2 mt-1">
            <li>לעיין במידע האישי שנשמר אודותיו</li>
            <li>לבקש תיקון או מחיקה של המידע</li>
            <li>להתנגד לשימוש במידע לצורכי דיוור ישיר</li>
          </ul>
          <p className="mt-2">פניות בנושא זה ניתן לשלוח ל: <span className="text-white">porsim.info@gmail.com</span></p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">קטינים</h3>
          <p>הפלטפורמה אינה מיועדת לילדים מתחת לגיל 13. משתמשים מתחת לגיל 18 נדרשים להשתמש בפלטפורמה באישור וליווי של הורה או אפוטרופוס חוקי.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">עוגיות (Cookies)</h3>
          <p>הפלטפורמה עושה שימוש בקבצי עוגיות לצורכי תפעול, מדידה, אבטחה ושיפור חוויית המשתמש. בנוסף, ייתכן שימוש בכלים של צדדים שלישיים (כגון Google ו-Meta) לצרכים אנליטיים ושיווקיים. ניתן לשנות את הגדרות הדפדפן לחסימת עוגיות, אולם ייתכן שחלק מהשירותים לא יפעלו באופן מלא.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">שינויים במדיניות</h3>
          <p>פורשים כנף רשאית לעדכן מדיניות פרטיות זו מעת לעת. המשך השימוש בפלטפורמה לאחר עדכון המדיניות מהווה הסכמה לנוסח המעודכן.</p>
        </div>
      </div>
    ),
  },

  terms: {
    title: 'תנאי שימוש',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <p>ברוכים הבאים לפלטפורמת &quot;פורשים כנף&quot; (להלן: &quot;הפלטפורמה&quot;). השימוש בפלטפורמה מהווה הסכמה מלאה, מודעת ובלתי חוזרת לתנאי שימוש אלו. אם אינך מסכים לאחד או יותר מהתנאים - הנך מתבקש שלא לעשות שימוש בפלטפורמה.</p>

        <div>
          <h3 className="text-white font-bold mb-2">1. מטרת הפלטפורמה ואי-מתן ייעוץ</h3>
          <p>הפלטפורמה מספקת תכנים בתחום החינוך הפיננסי לצורכי לימוד, ידע כללי והעשרה בלבד. התכנים המוצגים אינם מותאמים אישית למשתמש ואינם מתחשבים בנתוניו האישיים, לרבות מצבו הכלכלי, נכסיו, התחייבויותיו, מטרותיו, רמת הסיכון שלו או מצבו המשפחתי. אין לראות בתכנים ייעוץ השקעות, שיווק השקעות, ייעוץ פנסיוני, ייעוץ מס, ייעוץ משפטי או המלצה לביצוע פעולה כלשהי בנכסים פיננסיים, ניירות ערך או כל מוצר אחר. כל החלטה פיננסית שתתקבל על ידי המשתמש תיעשה באחריותו הבלעדית.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">2. אזהרת סיכון</h3>
          <p>פעולות פיננסיות, לרבות השקעות, חיסכון, נטילת אשראי או כל פעולה כלכלית אחרת, כרוכות בסיכון, לרבות אפשרות להפסד כספי. המשתמש מודע לכך ומתחייב לשקול את צעדיו באופן עצמאי, ובמידת הצורך להיוועץ בבעל רישיון מתאים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">3. היעדר התחייבות לתוצאות</h3>
          <p>החברה אינה מתחייבת לתוצאה כלשהי כתוצאה מהשימוש בפלטפורמה, לרבות אך לא רק: רווחים, תשואות, שיפור במצב הכלכלי, חיסכון, הצלחה עסקית או כל תוצאה אחרת.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">4. רישיון שימוש</h3>
          <p>רכישת גישה לפלטפורמה מקנה למשתמש רישיון אישי, מוגבל, בלתי בלעדי ואינו ניתן להעברה. המשתמש מתחייב שלא:</p>
          <ul className="list-disc list-inside space-y-1 mr-2 mt-2">
            <li>להעביר את פרטי הגישה לאחרים</li>
            <li>לשתף את התכנים עם צדדים שלישיים</li>
            <li>להקליט, לצלם, להעתיק או להפיץ את התכנים</li>
            <li>לעשות שימוש מסחרי כלשהו בתכנים</li>
            <li>לעשות שימוש בתכנים במסגרת הדרכה, קורס או פעילות עסקית</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">5. קניין רוחני</h3>
          <p>כל זכויות הקניין הרוחני בפלטפורמה, לרבות תכנים, סרטונים, טקסטים, מצגות, עיצובים, קבצים וכל חומר אחר, שייכים באופן בלעדי לפורשים כנף. אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות כל שימוש ללא אישור מראש ובכתב.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">6. שימוש מותר ואסור</h3>
          <p>המשתמש מתחייב להשתמש בפלטפורמה בהתאם לדין ולתנאים אלו. בין היתר, המשתמש מתחייב שלא:</p>
          <ul className="list-disc list-inside space-y-1 mr-2 mt-2">
            <li>לבצע פעולות העלולות לפגוע בפלטפורמה</li>
            <li>לנסות לחדור למערכות</li>
            <li>להעתיק או לשחזר תכנים</li>
            <li>לבצע שימוש בלתי חוקי או מטעה</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">7. השעיה וחסימת משתמש</h3>
          <p>החברה רשאית, לפי שיקול דעתה הבלעדי, לחסום או להגביל גישה של משתמש אשר הפר תנאי שימוש אלו או עשה שימוש בלתי ראוי בפלטפורמה, ללא צורך בהודעה מוקדמת.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">8. התחברות ושירותי צד שלישי</h3>
          <p>השימוש בפלטפורמה עשוי לכלול התחברות באמצעות שירותי צד שלישי. המשתמש אחראי לשמירה על פרטי הגישה שלו. החברה אינה אחראית לפעילות, מדיניות או תקלות של שירותים חיצוניים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">9. זמינות ותקלות</h3>
          <p>החברה אינה מתחייבת לזמינות רציפה של הפלטפורמה. ייתכנו תקלות, הפסקות שירות, עיכובים או שיבושים, והחברה לא תישא באחריות לנזקים הנובעים מכך.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">10. עדכון תכנים</h3>
          <p>התכנים בפלטפורמה עשויים להתעדכן, להשתנות או להתיישן, בין היתר עקב שינויי שוק, רגולציה, מיסוי או תנאים כלכליים. החברה אינה מתחייבת לעדכון שוטף של התכנים.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">11. הגבלת אחריות</h3>
          <p>השימוש בפלטפורמה נעשה באחריות המשתמש בלבד. בכל מקרה, אחריות החברה, ככל שתיקבע, לא תעלה על הסכום ששולם בפועל על ידי המשתמש עבור השירות.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">12. גיל משתמשים</h3>
          <p>השימוש בפלטפורמה מיועד למשתמשים מעל גיל 13. משתמשים מתחת לגיל 18 מצהירים כי קיבלו אישור מהורה או אפוטרופוס חוקי. האחריות על שימוש קטינים חלה על ההורה או האפוטרופוס.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">13. שינויים והפסקת פעילות</h3>
          <p>החברה רשאית לשנות, לעדכן או להפסיק את פעילות הפלטפורמה או חלק ממנה, וכן לעדכן תנאי שימוש אלו, בכל עת ולפי שיקול דעתה.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">14. דין וסמכות שיפוט</h3>
          <p>השימוש בפלטפורמה כפוף לדיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בעיר ירושלים.</p>
        </div>
      </div>
    ),
  },

  accessibility: {
    title: 'הצהרת נגישות',
    body: (
      <div className="space-y-5 text-white/55 text-sm leading-relaxed">
        <p>פורשים כנף אחראית על הקמה והפעלת האתר: <span className="text-white">https://www.porsimkanaf.com</span> (להלן: &quot;האתר&quot;).</p>
        <p>אנו רואים חשיבות רבה בהנגשת האתר ומתן שירות שוויוני, מכובד, נגיש ועצמאי לכלל המשתמשים, ובפרט לאנשים עם מוגבלות.</p>

        <div>
          <h3 className="text-white font-bold mb-2">רמת הנגישות</h3>
          <p>האתר עומד, ככל הניתן, בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התשע&quot;ג-2013), ברמת נגישות AA. האתר מיישם את עקרונות הנגישות בהתאם להנחיות מסמך WCAG 2.2 של ארגון World Wide Web Consortium (W3C). הנגשת האתר בוצעה בסיוע חברת &quot;Vee הנגשת אתרים&quot;.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">התאמות נגישות שבוצעו באתר</h3>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>התאמה לקוראי מסך (NVDA, JAWS)</li>
            <li>ניווט פשוט וברור</li>
            <li>מבנה היררכי תקין של כותרות (H1, H2, H3)</li>
            <li>התאמה למגוון מסכים ורזולוציות</li>
            <li>טקסט חלופי (alt) לתמונות</li>
            <li>תמיכה בניווט באמצעות מקלדת</li>
            <li>מבנה עמודים אחיד וברור</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">תפריט נגישות באתר</h3>
          <p className="mb-2">באתר קיים תפריט נגישות המאפשר, בין היתר:</p>
          <ul className="list-disc list-inside space-y-1 mr-2">
            <li>עצירת הבהובים ואנימציות</li>
            <li>דילוג ישיר לתוכן</li>
            <li>הגדלה והקטנה של טקסט</li>
            <li>שינוי ריווח בין אותיות, מילים ושורות</li>
            <li>שינוי ניגודיות (גבוהה / הפוכה / שחור-לבן)</li>
            <li>שינוי גופן לגופן קריא</li>
            <li>הדגשת קישורים</li>
            <li>מדריך קריאה</li>
            <li>שינוי סמן עכבר</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">סייגים לנגישות</h3>
          <p>למרות מאמצינו להנגיש את כלל תכני האתר, ייתכן שיימצאו חלקים שטרם הונגשו במלואם או שאינם עומדים באופן מלא בדרישות התקן. אנו פועלים באופן שוטף לשיפור הנגישות באתר.</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">יצירת קשר בנושא נגישות</h3>
          <p>אם נתקלתם בבעיה או תקלה בנושא נגישות, נשמח לקבל את פנייתכם ולסייע:</p>
          <p className="mt-2">
            <span className="text-white font-medium">רכז נגישות:</span> אביתר דנגור<br />
            <span className="text-white font-medium">טלפון:</span> 053-728-2727<br />
            <span className="text-white font-medium">דוא&quot;ל:</span> porsim.info@gmail.com
          </p>
          <p className="mt-2">ניתן לפנות גם לצורך בקשת מידע בפורמט נגיש.</p>
        </div>

        <p className="text-white/30 text-xs">הצהרת נגישות זו עודכנה לאחרונה בתאריך: 30.01.2026</p>
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
