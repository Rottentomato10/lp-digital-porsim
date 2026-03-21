import StickyBar from '@/components/c/StickyBar'
import ProofHero from '@/components/c/ProofHero'
import CVideo from '@/components/c/CVideo'
import TestimonialsWall from '@/components/c/TestimonialsWall'
import MidCta from '@/components/c/MidCta'
import TeamSection from '@/components/c/TeamSection'
import CourseBlock from '@/components/c/CourseBlock'
import FinalCta from '@/components/c/FinalCta'

export const metadata = {
  title: 'פורשים כנף — קורס פיננסים לצעירים',
  description: 'מה שקורה כשצעירים מקבלים את הידע שבית הספר שכח לתת להם.',
}

export default function VariantC() {
  return (
    <main className="bg-[#0C0C0C]">
      <StickyBar />

      {/* Hero */}
      <ProofHero />

      {/* Video — autoplay muted on scroll */}
      <CVideo />

      {/* Testimonials wall */}
      <TestimonialsWall />

      {/* Mid CTA */}
      <MidCta />

      {/* Team */}
      <TeamSection />

      {/* Course details */}
      <CourseBlock />

      {/* Final CTA */}
      <FinalCta />

      <footer className="py-8 text-center text-white/15 text-sm border-t border-white/5">
        © 2025 פורשים כנף · כל הזכויות שמורות
      </footer>
    </main>
  )
}
