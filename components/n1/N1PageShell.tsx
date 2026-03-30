'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N1Hero from './N1Hero'
import N1SalesPitch from './N1SalesPitch'
import N1DeepProblem from './N1DeepProblem'
import N1Mindshift from './N1Mindshift'
import DSolution from '@/components/d/DSolution'
import DWhatYouGet from '@/components/d/DWhatYouGet'
import DSocialProof from '@/components/d/DSocialProof'
import N1Pricing from './N1Pricing'
import N1FAQ from './N1FAQ'
import DTeam from '@/components/d/DTeam'
import N1FinalCta from './N1FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N1PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        {/* 1. Hero — logo side, video prominent, autoplay */}
        <N1Hero />
        {/* 2. Sales pitch — direct text after video */}
        <N1SalesPitch />
        {/* 3. Deep problem — more pain, more depth, vision */}
        <N1DeepProblem />
        {/* 4. Mindshift */}
        <N1Mindshift />
        {/* 5. Solution + Syllabus */}
        <DSolution />
        <DWhatYouGet />
        {/* 6. Social proof */}
        <DSocialProof />
        {/* 7. Pricing — full screen, expanded guarantee */}
        <N1Pricing />
        {/* 8. FAQ — separate */}
        <N1FAQ />
        {/* 9. Team — near bottom */}
        <DTeam />
        {/* 10. Final CTA */}
        <N1FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
