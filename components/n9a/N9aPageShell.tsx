'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N9Hero from '@/components/n9/N9Hero'
import N9SalesPitch from '@/components/n9/N9SalesPitch'
import N9DeepProblem from '@/components/n9/N9DeepProblem'
import N5Vision from '@/components/n5/N5Vision'
import N9Mindshift from '@/components/n9/N9Mindshift'
import N9aSyllabus from './N9aSyllabus'
import N2Decision from '@/components/n2/N2Decision'
import N9MiniClose from '@/components/n9/N9MiniClose'
import N5Reviews from '@/components/n5/N5Reviews'
import N9Pricing from '@/components/n9/N9Pricing'
import N2FAQ from '@/components/n2/N2FAQ'
import N5Team from '@/components/n5/N5Team'
import N9FinalCta from '@/components/n9/N9FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N9aPageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        <N9Hero />
        <N9SalesPitch />
        <N9DeepProblem />
        <N5Vision />
        <N9Mindshift />
        <N9aSyllabus />
        <N2Decision />
        <N9MiniClose />
        <N5Reviews />
        <N9Pricing />
        <N2FAQ />
        <N5Team />
        <N9FinalCta />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
