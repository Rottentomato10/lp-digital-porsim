'use client'

import { VariantProvider } from '@/lib/content-context'
import type { ContentType } from '@/lib/content-context'
import DHero            from './DHero'
import DStickyBar       from './DStickyBar'
import SocialToast      from './SocialToast'
import DVideo           from './DVideo'
import DStickyNarrative from './DStickyNarrative'
import DProblem         from './DProblem'
import DMindShift       from './DMindShift'
import DSolution        from './DSolution'
import DWhatYouGet      from './DWhatYouGet'
import DSocialProof     from './DSocialProof'
import DTeam            from './DTeam'
import DDecision        from './DDecision'
import DFooter          from './DFooter'
import { AccessibilityWidget } from './AccessibilityWidget'
import DCookieConsent   from './DCookieConsent'

export default function DPageShell({ content, checkoutUrl }: { content: ContentType; checkoutUrl?: string }) {
  return (
    <VariantProvider content={content} checkoutUrl={checkoutUrl}>
      <main className="bg-[#080808]">
        <DStickyBar />
        <SocialToast />
        <DHero />
        <DVideo />
        <DStickyNarrative />
        <DTeam />
        <DProblem />
        <DMindShift />
        <DSolution />
        <DWhatYouGet />
        <DSocialProof />
        <DDecision />
        <DFooter />
        <AccessibilityWidget />
        <DCookieConsent />
      </main>
    </VariantProvider>
  )
}
