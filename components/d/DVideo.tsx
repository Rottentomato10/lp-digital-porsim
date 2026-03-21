'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { VolumeX, Volume2, Maximize2 } from 'lucide-react'
import { contentD } from '@/lib/content-d'

export default function DVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const inView     = useInView(wrapperRef, { once: true, margin: '-120px' })

  const [isMuted, setIsMuted] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!inView || hasStarted || !videoRef.current) return
    videoRef.current.muted = true
    videoRef.current.play().catch(() => {})
    setHasStarted(true)
  }, [inView, hasStarted])

  const handleClick = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) {
      v.requestFullscreen()
    } else if ((v as HTMLVideoElement & { webkitEnterFullscreen?: () => void }).webkitEnterFullscreen) {
      (v as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen()
    }
  }

  return (
    <section className="relative py-14 md:py-20 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,166,36,0.07) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-5">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-[#F5A624] font-semibold text-sm tracking-widest uppercase mb-6">
          {contentD.video.eyebrow}
        </motion.p>

        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="relative rounded-2xl overflow-hidden border border-white/8 cursor-pointer group"
          style={{ boxShadow: '0 0 80px rgba(245,166,36,0.1), 0 40px 80px rgba(0,0,0,0.7)' }}
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline loop muted preload="metadata"
              src="/video.mov"
            />

            {/* "לחץ לצפייה עם קול" — center, visible while muted */}
            <motion.div
              animate={{ opacity: isMuted ? 1 : 0, pointerEvents: isMuted ? 'none' : 'none' }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="flex items-center gap-2.5 bg-black/55 backdrop-blur-md rounded-full px-5 py-3 border border-white/10">
                <VolumeX size={16} className="text-white/70" />
                <span className="text-white/70 text-sm font-medium">לחץ לצפייה עם קול</span>
              </div>
            </motion.div>

            {/* "עם קול" — bottom-right corner after unmute */}
            <motion.div
              animate={{ opacity: isMuted ? 0 : 1, scale: isMuted ? 0.85 : 1 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 bg-[#F5A624]/90 backdrop-blur-md rounded-full px-3 py-1.5"
            >
              <Volume2 size={13} className="text-black" />
              <span className="text-black text-xs font-bold">עם קול</span>
            </motion.div>

            {/* Fullscreen button — top-left corner */}
            <button
              onClick={handleFullscreen}
              className="absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-black/70 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="מסך מלא"
            >
              <Maximize2 size={14} />
            </button>

            {/* Hover glow */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245,166,36,0.06), transparent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
