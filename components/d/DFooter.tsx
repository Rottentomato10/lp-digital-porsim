'use client'

import { useState } from 'react'
import Image from 'next/image'
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
      <footer className="bg-[#060606] border-t border-white/8">
        {/* Legal links row */}
        <div className="max-w-4xl mx-auto px-5 py-5 flex items-center justify-center gap-2 flex-wrap">
          {LINKS.map(({ key, label }, i) => (
            <span key={key} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/15 text-sm">·</span>}
              <button
                onClick={() => setModal(key as ModalType)}
                className="text-white/55 text-sm font-medium hover:text-[#F5A624] transition-colors underline underline-offset-4 decoration-white/25 hover:decoration-[#F5A624]/50"
              >
                {label}
              </button>
            </span>
          ))}
        </div>

        {/* Copyright row */}
        <div className="border-t border-white/5 py-4 flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="פורשים כנף" width={28} height={28}
            className="w-7 h-7 object-contain opacity-30" />
          <p className="text-white/20 text-xs">© 2025 פורשים כנף · כל הזכויות שמורות</p>
        </div>
      </footer>

      <LegalModal type={modal} onClose={() => setModal(null)} />
    </>
  )
}
