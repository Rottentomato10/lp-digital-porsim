'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const KEY = 'pk_cookie_consent'

export default function DCookieConsent() {
  const [show, setShow] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem(KEY, 'all')
    setShow(false)
  }

  const acceptEssential = () => {
    localStorage.setItem(KEY, 'essential')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:right-auto md:max-w-md z-[999]"
        >
          <div
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: 'rgba(16,16,16,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white/80 text-sm font-bold mb-2">🍪 מדיניות עוגיות</p>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              אתר זה משתמש בעוגיות (Cookies) לשיפור חוויית הגלישה, ניתוח תנועה ולצרכי שיווק.
              המשך גלישה מהווה הסכמה לשימוש בעוגיות בהתאם למדיניות הפרטיות שלנו.
            </p>

            {/* Expand details */}
            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-white/30 text-xs hover:text-white/50 transition-colors mb-3">
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? 'הסתר פירוט' : 'פירוט מלא על העוגיות'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 mb-4 text-xs leading-relaxed">
                    {/* Essential */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/70 font-bold">עוגיות הכרחיות</p>
                        <span className="text-[#10B981] text-[10px]">תמיד פעיל</span>
                      </div>
                      <p className="text-white/35">נדרשות לתפקוד בסיסי של האתר — ניהול סשנים, אבטחה, העדפות שפה, זכירת הסכמה לעוגיות. לא ניתן לכבות אותן.</p>
                    </div>

                    {/* Analytics */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-white/70 font-bold mb-1">עוגיות אנליטיקה וביצועים</p>
                      <p className="text-white/35">Google Analytics (GA4), Microsoft Clarity — אוספות מידע אנונימי על דפוסי גלישה, זמן שהייה, דפים נצפים ואינטראקציות. משמשות לשיפור חוויית המשתמש ולהבנת התנהגות הגולשים. המידע מעובד באופן מצטבר ואינו מזהה משתמשים באופן אישי.</p>
                    </div>

                    {/* Marketing */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-white/70 font-bold mb-1">עוגיות שיווק ופרסום</p>
                      <p className="text-white/35">Facebook Pixel (Meta) — מאפשרות מעקב אחר פעולות באתר (צפייה, רכישה), יצירת קהלים מותאמים לפרסום ומדידת אפקטיביות קמפיינים. המידע משותף עם Meta Platforms בהתאם למדיניות הפרטיות שלהם.</p>
                    </div>

                    {/* Functional */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-white/70 font-bold mb-1">עוגיות פונקציונליות</p>
                      <p className="text-white/35">שומרות העדפות נגישות, זיהוי אפיליאייט מפנה (?via=), קוד קופון, ושמירת פרטי הזמנה לאורך תהליך הרכישה.</p>
                    </div>

                    {/* Rights */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-[#F5A624]/10">
                      <p className="text-white/70 font-bold mb-1">הזכויות שלך</p>
                      <p className="text-white/35">
                        בהתאם לחוק הגנת הפרטיות, תשמ״א-1981, עומדות לך הזכויות הבאות: זכות עיון במידע, תיקונו או מחיקתו. לבקשות ניתן לפנות אלינו בכתובת porsim.info@gmail.com או בטלפון 053-728-2727.
                        <br /><br />
                        ניתן לנהל ולמחוק עוגיות דרך הגדרות הדפדפן שלך בכל עת. שים לב שמחיקת עוגיות הכרחיות עלולה לפגוע בחוויית השימוש באתר.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={accept}
                className="flex-1 bg-[#F5A624] text-black font-black text-sm py-2.5 rounded-xl hover:brightness-110 transition-all"
              >
                מאשר הכל ✓
              </button>
              <button
                onClick={acceptEssential}
                className="text-white/30 text-xs hover:text-white/50 transition-colors px-3 py-2.5"
              >
                הכרחיות בלבד
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
