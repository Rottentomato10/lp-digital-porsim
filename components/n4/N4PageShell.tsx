'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N4Hero from './N4Hero'
import N4SalesPitch from './N4SalesPitch'
import N4DeepProblem from './N4DeepProblem'
import N4Vision from './N4Vision'
import N4Mindshift from './N4Mindshift'
import N4Solution from './N4Solution'
import N2Decision from '@/components/n2/N2Decision'
import N4MiniClose from './N4MiniClose'
import N4Reviews from './N4Reviews'
import N4Pricing from './N4Pricing'
import N2FAQ from '@/components/n2/N2FAQ'
import N4Team from './N4Team'
import N4FinalCta from './N4FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N4PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        {/* Hero: n2 headline + video */}
        <N4Hero />
        {/* Sales pitch: identification */}
        <N4SalesPitch />
        {/* Deep problem: n1 depth, mature tone */}
        <N4DeepProblem />
        {/* Vision: with mockups, ends with insight */}
        <N4Vision />
        {/* Mindshift */}
        <N4Mindshift />
        {/* Solution: steps + outcomes + syllabus + "what's different" badges */}
        <N4Solution />
        {/* Decision helper */}
        <N2Decision />
        {/* Mini close before pricing */}
        <N4MiniClose />
        {/* Reviews: featured hero + grid */}
        <N4Reviews />
        {/* Pricing: countdown + ROI line + bonus descriptions + mature guarantee */}
        <N4Pricing />
        {/* FAQ: split with mid-CTA */}
        <N2FAQ />
        {/* Team: with "we built this to solve that" */}
        <N4Team />
        {/* Final CTA */}
        <N4FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
