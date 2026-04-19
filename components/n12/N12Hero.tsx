'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VolumeX, Volume2, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N12Hero() {
  const CHECKOUT_URL = useCheckoutUrl()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleClick = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if ((v as any).webkitEnterFullscreen) (v as any).webkitEnterFullscreen()
  }

  return (
    <section className="relative bg-[#060A13] overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,166,36,0.07) 0%, transparent 60%)' }} />

      <div className="max-w-lg mx-auto px-5 pt-6 pb-10 relative z-10">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex justify-center mb-5">
          <Image src="/logo.png" alt="פורשים כנף" width={72} height={72}
            className="w-16 h-16 object-contain" priority />
        </motion.div>

        {/* Headline — mobile-first, big and punchy */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-6">
          <h1 className="font-black text-white leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2rem, 8vw, 3.2rem)' }}>
            להבין כסף באמת.
            <br /><span className="text-[#F5A624]">להפסיק לנחש.</span>
          </h1>
          <p className="text-white/45 text-base leading-relaxed max-w-sm mx-auto">
            3 שעות שישנו את הדרך בה אתה מסתכל על כל שקל. לתמיד.
          </p>
        </motion.div>

        {/* Video — mobile optimized, no wasted space */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={handleClick}
          className="relative rounded-2xl overflow-hidden cursor-pointer group mb-6"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover"
              playsInline loop muted preload="metadata" src="/video.mov" />
            <motion.div animate={{ opacity: isMuted ? 1 : 0 }} transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2.5 border border-white/10">
                <VolumeX size={14} className="text-white/60" />
                <span className="text-white/60 text-sm">לחץ לצפייה עם קול</span>
              </div>
            </motion.div>
            <motion.div animate={{ opacity: isMuted ? 0 : 1 }} transition={{ duration: 0.25 }}
              className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none flex items-center gap-1.5 bg-[#F5A624] rounded-full px-2.5 py-1">
              <Volume2 size={12} className="text-black" />
              <span className="text-black text-[11px] font-bold">עם קול</span>
            </motion.div>
            <button onClick={handleFullscreen}
              className="absolute top-2.5 left-2.5 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-black/40 backdrop-blur text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="מסך מלא">
              <Maximize2 size={12} />
            </button>
          </div>
        </motion.div>

        {/* CTA — full width on mobile, impossible to miss */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <a href={CHECKOUT_URL}
            className="cta-shine block w-full text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all">
            אני רוצה להתחיל — ₪390
          </a>
          <p className="text-center text-white/20 text-xs mt-3">תשלום חד-פעמי · גישה לכל החיים · 7 ימי אחריות</p>
        </motion.div>

        {/* Trust strip — below CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-5 mt-6 pt-5 border-t border-white/6">
          {[
            { val: '15,000+', label: 'תלמידים' },
            { val: '300+', label: 'כיתות' },
            { val: '5+', label: 'שנים' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-black text-[#10B981] text-base">{s.val}</p>
              <p className="text-white/25 text-[11px]">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
