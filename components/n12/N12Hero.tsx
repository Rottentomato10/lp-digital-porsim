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
    <section className="bg-white border-b border-gray-100">
      {/* Top nav bar */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Image src="/logo.png" alt="פורשים כנף" width={48} height={48}
          className="w-10 h-10 md:w-12 md:h-12 object-contain" priority />
        <a href={CHECKOUT_URL}
          className="text-sm font-bold text-[#F5A624] hover:text-[#d48e1c] transition-colors">
          להרשמה →
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 md:pt-16 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <p className="text-[#F5A624] text-sm font-bold tracking-widest uppercase mb-5">
              הקורס המעשי לניהול פיננסי · פורשים כנף
            </p>

            <h1 className="font-black text-[#1a1a1a] leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)' }}>
              להבין כסף באמת.
              <br /><span className="text-[#F5A624]">להפסיק לנחש.</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              אתה מרוויח כסף. אבל עמוק בפנים אתה יודע — אתה לא באמת שולט בו. אף אחד לא לימד אותך איך כסף עובד. וזה עולה לך המון. כל חודש.
            </p>

            <div className="flex flex-col xs:flex-row items-start gap-4 mb-6">
              <a href={CHECKOUT_URL}
                className="inline-flex items-center bg-[#1a1a1a] text-white font-black text-lg px-8 py-4 rounded-full hover:bg-black transition-colors">
                אני מתחיל עכשיו — ₪390
              </a>
              <p className="text-gray-400 text-sm pt-2">7 ימי אחריות מלאה</p>
            </div>

            {/* Trust numbers */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
              {[
                { val: '15,000+', label: 'תלמידים' },
                { val: '300+', label: 'כיתות' },
                { val: '5+', label: 'שנים' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-black text-[#1a1a1a] text-lg">{s.val}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Video */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onClick={handleClick}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/10"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover"
                playsInline loop muted preload="metadata" src="/video.mov" />
              <motion.div animate={{ opacity: isMuted ? 1 : 0 }} transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur rounded-full px-5 py-3 shadow-lg">
                  <VolumeX size={16} className="text-gray-500" />
                  <span className="text-gray-600 text-sm font-medium">לחץ לצפייה עם קול</span>
                </div>
              </motion.div>
              <motion.div animate={{ opacity: isMuted ? 0 : 1 }} transition={{ duration: 0.25 }}
                className="absolute bottom-3 right-3 z-10 pointer-events-none flex items-center gap-1.5 bg-[#1a1a1a] rounded-full px-3 py-1.5">
                <Volume2 size={13} className="text-white" />
                <span className="text-white text-xs font-bold">עם קול</span>
              </motion.div>
              <button onClick={handleFullscreen}
                className="absolute top-3 left-3 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur text-gray-500 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100"
                aria-label="מסך מלא">
                <Maximize2 size={14} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
