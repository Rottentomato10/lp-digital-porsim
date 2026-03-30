'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N2Hero from './N2Hero'
import N2SalesPitch from './N2SalesPitch'
import N2DeepProblem from './N2DeepProblem'
import N2Vision from './N2Vision'
import N1Mindshift from '@/components/n1/N1Mindshift'
import N2Solution from './N2Solution'
import N2Decision from './N2Decision'
import N2Reviews from './N2Reviews'
import N1Pricing from '@/components/n1/N1Pricing'
import N2FAQ from './N2FAQ'
import N2Team from './N2Team'
import N2FinalCta from './N2FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'
import DWhatsApp from '@/components/d/DWhatsApp'

export default function N2PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        <N2Hero />
        <N2SalesPitch />
        <N2DeepProblem />
        <N2Vision />
        <N1Mindshift />
        <N2Solution />
        <N2Decision />
        <N2Reviews />
        <N1Pricing />
        <N2FAQ />
        <N2Team />
        <N2FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
        <DWhatsApp />
      </main>
    </VariantProvider>
  )
}
