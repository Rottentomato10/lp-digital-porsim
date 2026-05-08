'use client'

import { useState, useEffect } from 'react'
import { LegalModal, ModalType } from './DLegalModal'

const LINKS = [
  { key: 'privacy',       label: 'מדיניות פרטיות' },
  { key: 'terms',         label: 'תנאי שימוש' },
  { key: 'accessibility', label: 'הצהרת נגישות' },
] as const

export default function DFooter() {
  const [modal, setModal] = useState<ModalType>(null)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains('light-mode'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <footer className="border-t text-center bg-[#eaeae3] border-black/8">
        {/* Legal links row */}
        <div className="py-5 flex items-center justify-center gap-4 flex-wrap px-5">
          {LINKS.map(({ key, label }, i) => (
            <span key={key} className="flex items-center gap-4">
              {i > 0 && <span className="text-black/15">·</span>}
              <button
                onClick={() => setModal(key as ModalType)}
                className="t-caption hover:text-[#F5A624] transition-colors py-2 text-black/50"
              >
                {label}
              </button>
            </span>
          ))}
        </div>

        {/* Copyright row */}
        <div className="border-t border-black/5 py-4 flex justify-center">
          <p className="t-caption text-black/40">© 2026 פורשים כנף · כל הזכויות שמורות</p>
        </div>
      </footer>

      <LegalModal type={modal} onClose={() => setModal(null)} />
    </>
  )
}
