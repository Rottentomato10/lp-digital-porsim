'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOASTS = [
  { name: 'אמיר', city: 'תל אביב',      ago: 'לפני 2 דקות' },
  { name: 'נועה',  city: 'חיפה',         ago: 'לפני 5 דקות' },
  { name: 'יואב',  city: 'ירושלים',      ago: 'לפני 7 דקות' },
  { name: 'שירה', city: 'באר שבע',      ago: 'לפני 11 דקות' },
  { name: 'רון',   city: 'רמת גן',       ago: 'לפני 14 דקות' },
  { name: 'דניאל', city: 'נתניה',        ago: 'לפני 18 דקות' },
  { name: 'מיכל', city: 'פתח תקווה',    ago: 'לפני 23 דקות' },
  { name: 'עומר',  city: 'אשדוד',        ago: 'לפני 26 דקות' },
  { name: 'ליאת',  city: 'הרצליה',       ago: 'לפני 31 דקות' },
  { name: 'גל',    city: 'ראשון לציון',  ago: 'לפני 35 דקות' },
]

function randMs(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function SocialToast() {
  const [current, setCurrent] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((idx: number) => {
    setCurrent(idx)
    // Hide after 3–4s
    timerRef.current = setTimeout(() => {
      setCurrent(null)
      // Wait random 12–25s before next
      timerRef.current = setTimeout(() => {
        showToast((idx + 1) % TOASTS.length)
      }, randMs(12_000, 25_000))
    }, randMs(3_000, 4_000))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // First appearance after 12s
    timerRef.current = setTimeout(() => showToast(0), 12_000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [showToast])

  const toast = current !== null ? TOASTS[current] : null

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 right-4 z-50 pointer-events-none"
        >
          <div
            className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3"
            style={{ background: 'rgba(12,12,12,0.95)', backdropFilter: 'blur(16px)' }}
          >
            <div className="w-8 h-8 rounded-full bg-[#F5A624]/15 border border-[#F5A624]/25 flex items-center justify-center flex-shrink-0">
              <span className="text-[#F5A624] text-xs font-black">{toast.name[0]}</span>
            </div>
            <div className="leading-tight">
              <p className="text-white text-sm font-semibold">
                {toast.name} <span className="text-white/40 font-normal">מ{toast.city}</span>
              </p>
              <p className="text-white/35 text-xs mt-0.5">הצטרף לקורס · {toast.ago}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
