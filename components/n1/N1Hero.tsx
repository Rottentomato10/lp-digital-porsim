'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VolumeX, Volume2, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useContent, useCheckoutUrl } from '@/lib/content-context'

export default function N1Hero() {
  const contentD = useContent()
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

        {/* Logo + headline row */}
        <div className="flex items-center gap-4 mb-6">
          <Image src="/logo.png" alt="פורשים כנף" width={56} height={56}
            className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0" priority />
          <div>
            <h1 className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}>
              {contentD.hero.headline_1}
            </h1>
            <h1 className="font-black leading-tight"
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
              {contentD.hero.headline_2}
            </h1>
          </div>
        </div>

        {/* Video — prominent, first screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer group mb-8"
          style={{ boxShadow: '0 0 80px rgba(245,166,36,0.08)' }}
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline loop muted preload="metadata"
              src="/video.mov"
            />
            <motion.div
              animate={{ opacity: isMuted ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="flex items-center gap-2.5 bg-black/55 backdrop-blur-md rounded-full px-5 py-3 border border-white/10">
                <VolumeX size={16} className="text-white/70" />
                <span className="text-white/70 text-sm font-medium">לחץ לצפייה עם קול</span>
              </div>
            </motion.div>
            <motion.div
              animate={{ opacity: isMuted ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 bg-[#F5A624]/90 rounded-full px-3 py-1.5"
            >
              <Volume2 size={13} className="text-black" />
              <span className="text-black text-xs font-bold">עם קול</span>
            </motion.div>
            <button
              onClick={handleFullscreen}
              className="absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="מסך מלא"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </motion.div>

        {/* Sub text + CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl whitespace-pre-line">
          {contentD.hero.sub}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          href={CHECKOUT_URL}
          className="cta-glow inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
          {contentD.hero.cta}
        </motion.a>
      </div>
    </section>
  )
}
