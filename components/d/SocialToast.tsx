'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAMES = [
  'א׳', 'ד׳', 'נ׳', 'י׳', 'ש׳', 'ר׳', 'מ׳', 'ע׳', 'ל׳', 'ג׳',
  'ת׳', 'ה׳', 'ב׳', 'ח׳', 'כ׳', 'א׳', 'ו׳', 'צ׳', 'פ׳', 'ס׳',
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function randMs(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function SocialToast() {
  const [current, setCurrent] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const poolRef = useRef<string[]>(shuffle(NAMES))
  const idxRef = useRef(0)
  const countRef = useRef(0)
  const inZoneRef = useRef(false)

  const getNextName = useCallback(() => {
    const name = poolRef.current[idxRef.current % poolRef.current.length]
    idxRef.current++
    // Reshuffle after going through all names
    if (idxRef.current >= poolRef.current.length) {
      poolRef.current = shuffle(NAMES)
      idxRef.current = 0
    }
    return name
  }, [])

  const showToast = useCallback(() => {
    if (!inZoneRef.current) return
    const name = getNextName()
    setCurrent(name)
    countRef.current++

    // Hide after 3-4s
    timerRef.current = setTimeout(() => {
      setCurrent(null)
    }, randMs(3000, 4000))
  }, [getNextName])

  useEffect(() => {
    // Observe when user scrolls into the zone (between syllabus and FAQ)
    const syllabusEl = document.getElementById('stage-1')
    const pricingEl = document.getElementById('pricing')

    if (!syllabusEl || !pricingEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === syllabusEl && entry.isIntersecting) {
            inZoneRef.current = true
          }
          if (entry.target === pricingEl && entry.isIntersecting) {
            inZoneRef.current = false
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(syllabusEl)
    observer.observe(pricingEl)

    // First toast: random 8-15s after entering zone
    const checkZone = setInterval(() => {
      if (inZoneRef.current && countRef.current === 0) {
        clearInterval(checkZone)
        timerRef.current = setTimeout(() => showToast(), randMs(8000, 15000))
      }
    }, 1000)

    // Second toast: after 4-5 minutes on page
    const longTimer = setTimeout(() => {
      if (countRef.current < 2) {
        showToast()
      }
    }, randMs(240000, 300000))

    return () => {
      observer.disconnect()
      clearInterval(checkZone)
      clearTimeout(longTimer)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [showToast])

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current + countRef.current}
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
            <div className="leading-tight">
              <p className="text-white text-sm font-semibold">
                {current} הרגע הצטרף/ה לקורס
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
