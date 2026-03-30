'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N3Hero from './N3Hero'
import N3SalesPitch from './N3SalesPitch'
import N3DeepProblem from './N3DeepProblem'
import N3Vision from './N3Vision'
import N1Mindshift from '@/components/n1/N1Mindshift'
import N3Solution from './N3Solution'
import N2Decision from '@/components/n2/N2Decision'
import DSocialProof from '@/components/d/DSocialProof'
import N3Pricing from './N3Pricing'
import N2FAQ from '@/components/n2/N2FAQ'
import DTeam from '@/components/d/DTeam'
import N2FinalCta from '@/components/n2/N2FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N3PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        {/* Hero from n2: punchy headline + video */}
        <N3Hero />
        {/* Sales pitch: n2 punch + n1 depth */}
        <N3SalesPitch />
        {/* Deep problem: n1 emotional depth */}
        <N3DeepProblem />
        {/* Vision: with tangible mockups */}
        <N3Vision />
        {/* Mindshift */}
        <N1Mindshift />
        {/* Solution: n2 steps + n1 detailed syllabus */}
        <N3Solution />
        {/* Decision helper from n2 */}
        <N2Decision />
        {/* Social proof with 94% stat from original */}
        <DSocialProof />
        {/* Pricing: countdown + price anchoring + expanded guarantee */}
        <N3Pricing />
        {/* FAQ split with mid-CTA */}
        <N2FAQ />
        {/* Team with full stats */}
        <DTeam />
        {/* Final CTA */}
        <N2FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
