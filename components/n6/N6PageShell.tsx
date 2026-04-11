'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N6Hero from './N6Hero'
import N6Problem from './N6Problem'
import N6Vision from './N6Vision'
import N6Solution from './N6Solution'
import N6InTheField from './N6InTheField'
import N6Reviews from './N6Reviews'
import N6EducatorEndorsements from './N6EducatorEndorsements'
import N6Pricing from './N6Pricing'
import N6FAQ from './N6FAQ'
import N6Team from './N6Team'
import N6FinalCta from './N6FinalCta'
import DFooter from '@/components/d/DFooter'
import N6StickyBar from './N6StickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N6PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#0F1520]">
        <N6StickyBar />
        <SocialToast />
        {/* Hero with field stats */}
        <N6Hero />
        {/* Condensed problem — positive framing */}
        <N6Problem />
        {/* Vision */}
        <N6Vision />
        {/* Solution: steps + outcomes + syllabus */}
        <N6Solution />
        {/* In the field — school activity videos */}
        <N6InTheField />
        {/* Educator endorsements */}
        <N6EducatorEndorsements />
        {/* Reviews */}
        <N6Reviews />
        {/* Pricing — after all social proof */}
        <N6Pricing />
        {/* FAQ */}
        <N6FAQ />
        {/* Team */}
        <N6Team />
        {/* Final CTA */}
        <N6FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
