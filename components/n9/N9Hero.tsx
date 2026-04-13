'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { VolumeX, Volume2, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N9Hero() {
  const CHECKOUT_URL = useCheckoutUrl()
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Parallax floating elements
  const floatX = useTransform(mouseX, [0, 1], [-12, 12])
  const floatY = useTransform(mouseY, [0, 1], [-8, 8])
  const floatX2 = useTransform(mouseX, [0, 1], [10, -10])
  const floatY2 = useTransform(mouseY, [0, 1], [6, -6])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

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
    <section ref={heroRef} onMouseMove={handleMouseMove} className="relative bg-[#080808] overflow-hidden">
      {/* Parallax floating elements */}
      <motion.div style={{ x: floatX, y: floatY }}
        className="pointer-events-none absolute top-[15%] right-[8%] w-20 h-20 md:w-28 md:h-28 rounded-full opacity-[0.04]"
        >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#F5A624]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="56" textAnchor="middle" fill="currentColor" fontSize="28" fontWeight="bold">₪</text>
        </svg>
      </motion.div>
      <motion.div style={{ x: floatX2, y: floatY2 }}
        className="pointer-events-none absolute bottom-[25%] left-[5%] w-16 h-16 md:w-24 md:h-24 opacity-[0.04]">
        <svg viewBox="0 0 100 60" className="w-full h-full text-[#5EEAD4]">
          <polyline points="5,55 25,35 45,42 65,18 95,5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto px-5 pt-8 pb-12 relative z-10">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="פורשים כנף" width={120} height={120}
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" priority />
        </div>

        {/* Stats with success green for numbers */}
        <div className="flex items-center justify-center mb-5 px-4">
          <div className="flex items-center gap-3 xs:gap-5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="text-sm font-semibold"><span className="text-[#34D399]">15,000+</span> <span className="text-white/50">תלמידים</span></span>
            <span className="text-white/15">·</span>
            <span className="text-sm font-semibold"><span className="text-[#34D399]">300+</span> <span className="text-white/50">כיתות</span></span>
            <span className="text-white/15">·</span>
            <span className="text-sm font-semibold"><span className="text-[#34D399]">5+</span> <span className="text-white/50">שנות פעילות</span></span>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-white/30 text-sm md:text-base font-medium tracking-wide mb-4">
            הקורס המעשי לניהול פיננסי מבית ׳פורשים כנף׳
          </p>
          <h1 className="font-black text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}>
            להבין כסף באמת —
            <br /><span style={{
              background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>במקום להמשיך לנחש מאיפה להתחיל.</span>
          </h1>
        </div>

        <p className="text-center text-white/60 text-lg xs:text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
          אתה מרוויח כסף.
          <br />אבל עמוק בפנים אתה יודע — אתה לא באמת שולט בו.
          <br />אף אחד לא לימד אותך איך כסף עובד.
          <br />וזה עולה לך המון. כל חודש.
        </p>

        {/* Video with glassmorphism container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="relative rounded-2xl overflow-hidden cursor-pointer group mb-10"
          style={{
            boxShadow: '0 0 80px rgba(245,166,36,0.08), inset 0 0 0 0.5px rgba(245,166,36,0.15)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
          }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover"
              playsInline loop muted preload="metadata" src="/video.mov" />
            <motion.div animate={{ opacity: isMuted ? 1 : 0 }} transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex items-center gap-2.5 bg-black/55 backdrop-blur-md rounded-full px-5 py-3 border border-white/10">
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

        <div className="text-center">
          <a href={CHECKOUT_URL}
            className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מתחיל עכשיו
          </a>
        </div>
      </div>

      {/* Divider between Hero and SalesPitch */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/20 to-transparent" />
    </section>
  )
}
