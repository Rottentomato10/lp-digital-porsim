'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N5Hero from './N5Hero'
import N5SalesPitch from './N5SalesPitch'
import N5DeepProblem from './N5DeepProblem'
import N5Vision from './N5Vision'
import N5Mindshift from './N5Mindshift'
import N5Solution from './N5Solution'
import N2Decision from '@/components/n2/N2Decision'
import N5MiniClose from './N5MiniClose'
import N5Reviews from './N5Reviews'
import N5Pricing from './N5Pricing'
import N2FAQ from '@/components/n2/N2FAQ'
import N5Team from './N5Team'
import N5FinalCta from './N5FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N5PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        {/* Hero: n2 headline + video */}
        <N5Hero />
        {/* Sales pitch: identification */}
        <N5SalesPitch />
        {/* Deep problem: n1 depth, mature tone */}
        <N5DeepProblem />
        {/* Vision: with mockups, ends with insight */}
        <N5Vision />
        {/* Mindshift */}
        <N5Mindshift />
        {/* Solution: steps + outcomes + syllabus + "what's different" badges */}
        <N5Solution />
        {/* Decision helper */}
        <N2Decision />
        {/* Mini close before pricing */}
        <N5MiniClose />
        {/* Reviews: featured hero + grid */}
        <N5Reviews />
        {/* Pricing: countdown + ROI line + bonus descriptions + mature guarantee */}
        <N5Pricing />
        {/* FAQ: split with mid-CTA */}
        <N2FAQ />
        {/* Team: with "we built this to solve that" */}
        <N5Team />
        {/* Final CTA */}
        <N5FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
