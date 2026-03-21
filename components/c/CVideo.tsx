'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { contentC } from '@/lib/content-c'

export default function CVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-120px' })

  const [isMuted, setIsMuted] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  // Autoplay (muted) when scrolled into view
  useEffect(() => {
    if (!inView || hasStarted) return
    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'
      )
      setHasStarted(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [inView, hasStarted])

  const toggleMute = () => {
    const func = isMuted ? 'unMute' : 'mute'
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }), '*'
    )
    setIsMuted(!isMuted)
  }

  const src = `https://www.youtube.com/embed/${contentC.video.videoId}?rel=0&modestbranding=1&enablejsapi=1&mute=1&playsinline=1`

  return (
    <section className="py-14 md:py-20 bg-[#0C0C0C]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div ref={wrapperRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-white/8 group"
          style={{ boxShadow: '0 0 60px rgba(245,166,36,0.1), 0 32px 64px rgba(0,0,0,0.6)' }}>

          {/* 16:9 */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              ref={iframeRef}
              src={src}
              className="absolute inset-0 w-full h-full"
              title="פורשים כנף"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Mute/unmute overlay button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full border border-white/15 hover:bg-black/90 hover:border-[#F5A624]/40 transition-all duration-200"
            aria-label={isMuted ? 'הפעל קול' : 'השתק'}
          >
            {isMuted
              ? <><VolumeX size={14} className="text-white/60" /><span className="text-white/60">לחץ לקול</span></>
              : <><Volume2 size={14} className="text-[#F5A624]" /><span className="text-[#F5A624]">עם קול</span></>
            }
          </button>
        </motion.div>

      </div>
    </section>
  )
}
