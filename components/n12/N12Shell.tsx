'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N12Hero from './N12Hero'
import N12Pitch from './N12Pitch'
import N12Problems from './N12Problems'
import N12Shift from './N12Shift'
import N12Method from './N12Method'
import N12Social from './N12Social'
import N12Price from './N12Price'
import N12Questions from './N12Questions'
import N12Close from './N12Close'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N12Shell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#FAFAF9] text-[#1a1a1a]" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <N12Hero />
        <N12Pitch />
        <N12Problems />
        <N12Shift />
        <N12Method />
        <N12Social />
        <N12Price />
        <N12Questions />
        <N12Close />

        {/* Minimal footer */}
        <footer className="py-8 text-center border-t border-gray-200">
          <p className="text-gray-400 text-sm">© 2026 פורשים כנף · כל הזכויות שמורות</p>
        </footer>

        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
