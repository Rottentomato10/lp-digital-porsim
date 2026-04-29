'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { VolumeX, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N9Hero() {
  const CHECKOUT_URL = useCheckoutUrl()
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrubBarRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Parallax floating elements
  const floatX = useTransform(mouseX, [0, 1], [-12, 12])
  const floatY = useTransform(mouseY, [0, 1], [-8, 8])
  const floatX2 = useTransform(mouseX, [0, 1], [10, -10])
  const floatY2 = useTransform(mouseY, [0, 1], [6, -6])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true

    const markPlaying = () => setIsPlaying(true)

    // Try to play; mark playing on first timeupdate (most reliable cross-browser)
    const onTimeFirst = () => {
      markPlaying()
      v.removeEventListener('timeupdate', onTimeFirst)
    }
    v.addEventListener('timeupdate', onTimeFirst)

    v.play().catch(() => {})

    // Fallback: hide cover after 3s no matter what
    const fallback = setTimeout(markPlaying, 3000)

    const onTime = () => {
      if (v.duration) setProgress(v.currentTime / v.duration)
    }
    v.addEventListener('timeupdate', onTime)
    return () => {
      clearTimeout(fallback)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('timeupdate', onTimeFirst)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const next = !isMuted
    videoRef.current.muted = next
    setIsMuted(next)
  }, [isMuted])

  const scrubTo = useCallback((clientX: number) => {
    const v = videoRef.current
    const bar = scrubBarRef.current
    if (!v || !bar || !v.duration) return
    const rect = bar.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    v.currentTime = pct * v.duration
  }, [])

  const handleScrubDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true
    scrubTo(e.clientX)
  }, [scrubTo])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDragging.current) scrubTo(e.clientX)
    }
    const handleUp = () => { isDragging.current = false }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [scrubTo])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
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
          <p className="text-white/45 text-sm md:text-base font-medium tracking-wide mb-4">
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
          className="relative rounded-2xl overflow-hidden mb-10 mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            boxShadow: '0 0 80px rgba(245,166,36,0.08), inset 0 0 0 0.5px rgba(245,166,36,0.15)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            width: '300px',
            maxWidth: '70vw',
            aspectRatio: '240/426',
          }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            loop
            muted
            autoPlay
            preload="auto"
            src="/video.mp4"
          />
          {/* "מוכנים?" cover — visible until video starts */}
          {!isPlaying && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, #1a1400 0%, #080808 70%)' }}>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  unicodeBidi: 'plaintext',
                }}>
                {'\u200Fמוכנים?'}
              </motion.span>
              <div className="mt-4 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#F5A624]/60"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mute/Unmute button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/15 transition-all hover:bg-black/75"
          >
            {isMuted ? <VolumeX size={16} className="text-white/80" /> : <Volume2 size={16} className="text-[#F5A624]" />}
            <span className={`text-xs font-semibold ${isMuted ? 'text-white/80' : 'text-[#F5A624]'}`}>
              {isMuted ? 'לחץ לסאונד' : 'עם סאונד'}
            </span>
          </button>

          {/* Progress bar / scrubber — visible on hover, forced LTR */}
          <div
            ref={scrubBarRef}
            dir="ltr"
            className="absolute bottom-0 left-0 right-0 z-20 h-6 flex items-end cursor-pointer transition-opacity duration-300"
            style={{ opacity: isHovering ? 1 : 0 }}
            onMouseDown={handleScrubDown}
          >
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#F5A624] rounded-full" style={{ width: `${progress * 100}%` }} />
            </div>
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
