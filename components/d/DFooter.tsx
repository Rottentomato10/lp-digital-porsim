'use client'

import { useState } from 'react'
import { LegalModal, ModalType } from './DLegalModal'

const LINKS = [
  { key: 'privacy',       label: 'מדיניות פרטיות' },
  { key: 'terms',         label: 'תנאי שימוש' },
  { key: 'accessibility', label: 'הצהרת נגישות' },
] as const

export default function DFooter() {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <>
      <footer className="bg-[#060606] border-t border-white/8 text-center">
        {/* Legal links row */}
        <div className="py-5 flex items-center justify-center gap-4 flex-wrap px-5">
          {LINKS.map(({ key, label }, i) => (
            <span key={key} className="flex items-center gap-4">
              {i > 0 && <span className="text-white/15">·</span>}
              <button
                onClick={() => setModal(key as ModalType)}
                className="t-caption hover:text-[#F5A624] transition-colors"
              >
                {label}
              </button>
            </span>
          ))}
        </div>

        {/* Copyright row */}
        <div className="border-t border-white/5 py-4 flex justify-center">
          <p className="t-caption">© 2026 פורשים כנף · כל הזכויות שמורות</p>
        </div>
      </footer>

      <LegalModal type={modal} onClose={() => setModal(null)} />
    </>
  )
}
