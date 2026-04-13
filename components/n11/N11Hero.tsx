'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VolumeX, Volume2, Maximize2, ArrowDown } from 'lucide-react'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N11Hero() {
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
    <section className="relative min-h-[100svh] flex flex-col bg-[#060A13] overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(245,166,36,0.06) 0%, transparent 70%)' }} />

      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-5 pt-6 pb-8 w-full">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6">
          <Image src="/logo.png" alt="פורשים כנף" width={100} height={100}
            className="w-20 h-20 md:w-24 md:h-24 object-contain" priority />
        </motion.div>

        {/* Main content — two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text side */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} className="text-center md:text-right">

            <p className="text-[#F5A624]/70 text-sm font-semibold tracking-widest uppercase mb-4">
              הקורס המעשי לניהול פיננסי
            </p>

            <h1 className="font-black text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
              להבין כסף באמת.
              <br /><span className="text-[#F5A624]">להפסיק לנחש.</span>
            </h1>

            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-8 max-w-md md:mx-0 mx-auto">
              3 שעות שישנו את הדרך בה אתה מסתכל על כל שקל שנכנס ויוצא מהחשבון שלך. לתמיד.
            </p>

            {/* CTA + sub */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <a href={CHECKOUT_URL}
                className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
                אני רוצה להתחיל — ₪390
              </a>
              <p className="text-white/25 text-sm">תשלום חד-פעמי · גישה לכל החיים · 7 ימי אחריות</p>
            </div>
          </motion.div>

          {/* Video side */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleClick}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '0 20px 80px rgba(0,0,0,0.5), inset 0 0 0 0.5px rgba(245,166,36,0.12)',
            }}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover"
                playsInline loop muted preload="metadata" src="/video.mov" />
              <motion.div animate={{ opacity: isMuted ? 1 : 0 }} transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md rounded-full px-5 py-3 border border-white/10">
                  <VolumeX size={16} className="text-white/70" />
                  <span className="text-white/70 text-sm font-medium">לחץ לצפייה עם קול</span>
                </div>
              </motion.div>
              <motion.div animate={{ opacity: isMuted ? 0 : 1 }} transition={{ duration: 0.25 }}
                className="absolute bottom-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 bg-[#F5A624]/90 rounded-full px-3 py-1.5">
                <Volume2 size={13} className="text-black" />
                <span className="text-black text-xs font-bold">עם קול</span>
              </motion.div>
              <button onClick={handleFullscreen}
                className="absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="מסך מלא">
                <Maximize2 size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="flex justify-center pb-6">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="text-white/15">
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
