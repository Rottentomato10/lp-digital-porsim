import DHero            from '@/components/d/DHero'
import DStickyBar       from '@/components/d/DStickyBar'
import SocialToast      from '@/components/d/SocialToast'
import DVideo           from '@/components/d/DVideo'
import DStickyNarrative from '@/components/d/DStickyNarrative'
import DSolution        from '@/components/d/DSolution'
import DWhatYouGet      from '@/components/d/DWhatYouGet'
import DSocialProof     from '@/components/d/DSocialProof'
import DTeam            from '@/components/d/DTeam'
import DDecision        from '@/components/d/DDecision'
import DFooter          from '@/components/d/DFooter'
import DAccessibility   from '@/components/d/DAccessibility'
import DCookieConsent   from '@/components/d/DCookieConsent'

export const metadata = {
  title: 'פורשים כנף — קורס פיננסים לצעירים',
  description: 'הכסף שתרוויח מחר תלוי במה שתדע היום.',
}

export default function VariantD() {
  return (
    <main className="bg-[#080808]">
      <DStickyBar />
      <SocialToast />
      <DHero />
      <DVideo />
      <DStickyNarrative />
      <DSolution />
      <DWhatYouGet />
      <DSocialProof />
      <DTeam />
      <DDecision />
      <DFooter />
      <DAccessibility />
      <DCookieConsent />
    </main>
  )
}
