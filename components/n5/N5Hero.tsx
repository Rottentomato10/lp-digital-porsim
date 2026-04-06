'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VolumeX, Volume2, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N5Hero() {
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
    <section className="relative bg-[#080808] overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 pt-8 pb-12">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="פורשים כנף" width={120} height={120}
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" priority />
        </div>

        {/* Social proof badge — under logo, above eyebrow */}
        <div className="flex items-center justify-center mb-5 px-4">
          <div className="flex items-center gap-3 xs:gap-5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="text-white/50 text-sm font-semibold">15,000+ תלמידים</span>
            <span className="text-white/15">·</span>
            <span className="text-white/50 text-sm font-semibold">94% שביעות רצון</span>
            <span className="text-white/15">·</span>
            <span className="text-white/50 text-sm font-semibold">5+ שנות פעילות</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-white/30 text-sm md:text-base font-medium tracking-wide mb-4">
            הקורס המעשי לניהול פיננסי מבית ׳פורשים כנף׳
          </p>
          <h1 className="font-black text-white leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)' }}>
            תתחיל לשלוט בכסף שלך באמת —
            <br /><span style={{
              background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>גם אם אין לך מושג מאיפה להתחיל</span>
          </h1>
        </div>

        <p className="text-center text-white/60 text-lg xs:text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto">
          אתה מרוויח כסף.
          <br />אבל עמוק בפנים אתה יודע — אתה לא באמת שולט בו.
          <br />אף אחד לא לימד אותך איך כסף עובד.
          <br />וזה עולה לך המון. כל חודש.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer group mb-10"
          style={{ boxShadow: '0 0 80px rgba(245,166,36,0.08)' }}>
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
            className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg xs:text-xl px-8 xs:px-12 py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני מתחיל עכשיו
          </a>
        </div>
      </div>
    </section>
  )
}
