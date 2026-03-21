import Hero from '@/components/Hero'
import Diagnosis from '@/components/Diagnosis'
import VideoSection from '@/components/VideoSection'
import ProofSection from '@/components/ProofSection'
import Decision from '@/components/Decision'

export default function Home() {
  return (
    <main>
      {/* 1 — IGNITION */}
      <Hero />

      {/* 2 — DIAGNOSIS */}
      <Diagnosis />

      {/* 3 — THE TURN (VIDEO) */}
      <VideoSection />

      {/* 4 — PROOF + SOLUTION */}
      <ProofSection />

      {/* 5 — THE DECISION */}
      <Decision />

      {/* Footer */}
      <footer className="py-8 text-center text-white/20 text-sm border-t border-white/5">
        © 2025 פורשים כנף · כל הזכויות שמורות
      </footer>
    </main>
  )
}
