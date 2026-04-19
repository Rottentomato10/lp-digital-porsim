'use client'

import { useEffect } from 'react'
import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'

import N9Hero from './N9Hero'
import N9SalesPitch from './N9SalesPitch'
import N9DeepProblem from './N9DeepProblem'
import N5Vision from '@/components/n5/N5Vision'
import N9Mindshift from './N9Mindshift'
import N9Solution from './N9Solution'
import N2Decision from '@/components/n2/N2Decision'
import N9MiniClose from './N9MiniClose'
import N5Reviews from '@/components/n5/N5Reviews'
import N9Pricing from './N9Pricing'
import N2FAQ from '@/components/n2/N2FAQ'
import N5Team from '@/components/n5/N5Team'
import N9FinalCta from './N9FinalCta'
import DFooter from '@/components/d/DFooter'
import DStickyBar from '@/components/d/DStickyBar'
import SocialToast from '@/components/d/SocialToast'
import { AccessibilityWidget } from '@/components/d/AccessibilityWidget'
import DCookieConsent from '@/components/d/DCookieConsent'

export default function N9PageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  // Track affiliate visit from ?via= parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const via = params.get('via')
    if (via) {
      // Save affiliate code in cookie for checkout
      document.cookie = `aff_via=${via}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      // Track visit
      fetch('/api/affiliate/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: via, type: 'visit' }),
      }).catch(() => {})
    }
  }, [])

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
        <N9Solution />
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
