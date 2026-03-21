'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Options = {
  fontSize: number   // 0 = normal, 1 = large, 2 = x-large
  contrast: boolean
  grayscale: boolean
  underlineLinks: boolean
}

const DEFAULT: Options = { fontSize: 0, contrast: false, grayscale: false, underlineLinks: false }
const KEY = 'pk_a11y'

function applyOptions(opts: Options) {
  const root = document.documentElement
  const scale = opts.fontSize === 0 ? '100%' : opts.fontSize === 1 ? '112%' : '125%'
  root.style.setProperty('--a11y-font-scale', scale)
  root.style.filter = [
    opts.contrast  ? 'contrast(1.4) brightness(1.1)' : '',
    opts.grayscale ? 'grayscale(1)' : '',
  ].filter(Boolean).join(' ') || ''
  document.querySelectorAll('a').forEach(a => {
    a.style.textDecoration = opts.underlineLinks ? 'underline' : ''
  })
}

export default function DAccessibility() {
  const [open, setOpen] = useState(false)
  const [opts, setOpts] = useState<Options>(DEFAULT)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY)
      if (stored) setOpts(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    applyOptions(opts)
    localStorage.setItem(KEY, JSON.stringify(opts))
  }, [opts])

  const reset = () => setOpts(DEFAULT)

  const Row = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-sm transition-all"
      style={{ background: active ? 'rgba(245,166,36,0.12)' : 'transparent', color: active ? '#F5A624' : 'rgba(255,255,255,0.55)' }}
    >
      <span>{label}</span>
      {active && <span className="text-xs font-bold">✓</span>}
    </button>
  )

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="תפריט נגישות"
        className="fixed bottom-4 left-4 z-[998] w-12 h-12 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
        style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="1.5"/>
          <path d="M9 9h6M12 9v8M9 17l-2 3M15 17l2 3"/>
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 left-4 z-[997] w-64 rounded-2xl border border-white/10 p-4"
            style={{ background: 'rgba(16,16,16,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-3">נגישות</p>

            {/* Font size */}
            <div className="mb-2">
              <p className="text-white/25 text-xs px-1 mb-1">גודל טקסט</p>
              <div className="flex gap-2">
                {['רגיל', 'גדול', 'גדול מאד'].map((label, i) => (
                  <button key={i} onClick={() => setOpts(o => ({ ...o, fontSize: i }))}
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: opts.fontSize === i ? 'rgba(245,166,36,0.15)' : 'rgba(255,255,255,0.04)',
                      color: opts.fontSize === i ? '#F5A624' : 'rgba(255,255,255,0.4)',
                      border: opts.fontSize === i ? '1px solid rgba(245,166,36,0.3)' : '1px solid transparent',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Row label="ניגודיות גבוהה"  active={opts.contrast}       onClick={() => setOpts(o => ({ ...o, contrast: !o.contrast }))} />
            <Row label="גווני אפור"       active={opts.grayscale}      onClick={() => setOpts(o => ({ ...o, grayscale: !o.grayscale }))} />
            <Row label="קו תחת קישורים"  active={opts.underlineLinks} onClick={() => setOpts(o => ({ ...o, underlineLinks: !o.underlineLinks }))} />

            <div className="mt-3 pt-3 border-t border-white/6">
              <button onClick={reset} className="w-full text-white/25 text-xs hover:text-white/50 transition-colors py-1">
                איפוס הגדרות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
