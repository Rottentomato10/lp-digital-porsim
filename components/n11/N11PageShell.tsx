'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N11Hero from './N11Hero'
import N11TrustBar from './N11TrustBar'
import N11Problem from './N11Problem'
import N11Solution from './N11Solution'
import N11Proof from './N11Proof'
import N11Pricing from './N11Pricing'
import N11FAQ from './N11FAQ'
import N11Final from './N11Final'
import DFooter from '@/components/d/DFooter'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N11PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#060A13]">
        <N11Hero />
        <N11TrustBar />
        <N11Problem />
        <N11Solution />
        <N11Proof />
        <N11Pricing />
        <N11FAQ />
        <N11Final />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
