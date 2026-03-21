'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'pk_cookie_consent'

export default function DCookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem(KEY, '1')
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
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:right-auto md:max-w-sm z-[999]"
        >
          <div
            className="rounded-2xl border border-white/10 p-5"
            style={{ background: 'rgba(16,16,16,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              אנחנו משתמשים בעוגיות לשיפור חוויית הגלישה ולניתוח תנועה באתר.
              <span className="text-white/40"> המשך גלישה מהווה הסכמה.</span>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="flex-1 bg-[#F5A624] text-black font-black text-sm py-2.5 rounded-xl hover:brightness-110 transition-all"
              >
                מאשר ✓
              </button>
              <button
                onClick={accept}
                className="text-white/30 text-xs hover:text-white/50 transition-colors"
              >
                סגור
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
