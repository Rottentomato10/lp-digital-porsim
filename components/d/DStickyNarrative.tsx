'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SLIDES = [
  { eyebrow: null,              main: '12 שנה.',                        sub: 'כל כך הרבה זמן בבית הספר.',                                   accent: false },
  { eyebrow: 'מה לימדו אותך?', main: 'אלגברה. היסטוריה. ספרות.',      sub: null,                                                            accent: false },
  { eyebrow: 'ומה לא לימדו?',  main: 'אפס שעות על כסף.',              sub: 'איך הוא עובד. לאן הוא הולך. איך לגרום לו לצמוח.',             accent: false },
  { eyebrow: null,              main: 'זה לא אשמתך.',                   sub: 'זו המערכת.\nפשוט לא בנו את זה לתוכנית הלימודים.',               accent: false },
  { eyebrow: null,              main: 'עד עכשיו.',                      sub: null,                                                            accent: true  },
]

const TIMING = [
  { in: [0, 0],       hold: [0, 0.16],     out: [0.16, 0.26] },
  { in: [0.16, 0.26], hold: [0.26, 0.38],  out: [0.38, 0.48] },
  { in: [0.38, 0.48], hold: [0.48, 0.60],  out: [0.60, 0.70] },
  { in: [0.60, 0.70], hold: [0.70, 0.82],  out: [0.82, 0.90] },
  { in: [0.82, 0.90], hold: [0.90, 1],     out: [1, 1]        },
]

// Cubic ease-in-out
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function buildOpacity(t: typeof TIMING[0], isLast: boolean) {
  if (t.in[0] === t.in[1]) {
    return isLast ? [1, 1, 1, 1] : [1, 1, 0]
  }
  return isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
}

function buildKeypoints(t: typeof TIMING[0], isLast: boolean): number[] {
  if (t.in[0] === t.in[1]) {
    return isLast ? [0, 0.5, 1] : [0, t.out[0], t.out[1]]
  }
  return isLast
    ? [t.in[0], t.in[1], t.hold[1], 1]
    : [t.in[0], t.in[1], t.out[0], t.out[1]]
}

export default function DStickyNarrative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const opacities = TIMING.map((t, i) => {
    const isLast = i === TIMING.length - 1
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, buildKeypoints(t, isLast), buildOpacity(t, isLast), { ease: easeInOut })
  })

  const ys = TIMING.map((t, i) => {
    const isLast = i === TIMING.length - 1
    if (t.in[0] === t.in[1]) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useTransform(scrollYProgress, isLast ? [0, 1] : [t.out[0], t.out[1]], isLast ? [0, 0] : [0, -52], { ease: easeInOut })
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(
      scrollYProgress,
      isLast ? [t.in[0], t.in[1], 1] : [t.in[0], t.in[1], t.out[0], t.out[1]],
      isLast ? [52, 0, 0]             : [52, 0, 0, -52],
      { ease: easeInOut }
    )
  })

  const glowOp = useTransform(scrollYProgress, [0.75, 1], [0.07, 0.22])
  const active  = useTransform(scrollYProgress, (v: number) => Math.min(Math.floor(v * SLIDES.length), SLIDES.length - 1))

  return (
    <div ref={containerRef} style={{ height: '440vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#080808] flex items-center justify-center" style={{ willChange: 'transform' }}>

        {/* Glow builds on last slide */}
        <motion.div className="pointer-events-none absolute inset-0" style={{
          opacity: glowOp,
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(245,166,36,1) 0%, transparent 65%)',
        }} />

        {/* Progress dots — desktop */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-20">
          {SLIDES.map((_, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotOp    = useTransform(active, (v: number) => Math.round(v) === i ? 1 : 0.22)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dotScale = useTransform(active, (v: number) => Math.round(v) === i ? 1.5 : 1)
            return <motion.div key={i} className="rounded-full bg-[#F5A624]"
              style={{ width: 5, height: 5, opacity: dotOp, scale: dotScale }} />
          })}
        </div>

        {/* Mobile progress bar */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-white/10 rounded-full overflow-hidden z-20 md:hidden">
          <motion.div className="h-full bg-[#F5A624] rounded-full origin-left" style={{ scaleX: scrollYProgress }} />
        </motion.div>

        {/* Slides */}
        <div className="relative z-10 w-full" style={{ height: '100vh' }}>
          {SLIDES.map((slide, i) => (
            <motion.div key={i}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 text-center"
              style={{ opacity: opacities[i], y: ys[i] }}
            >
              {slide.eyebrow && (
                <p className="text-[#F5A624]/60 font-semibold text-sm tracking-widest uppercase mb-5">
                  {slide.eyebrow}
                </p>
              )}
              <h2 className="font-black leading-tight max-w-3xl mx-auto"
                style={{
                  fontSize: 'clamp(2.6rem, 7vw, 6rem)',
                  color: slide.accent ? '#F5A624' : '#ffffff',
                  textShadow: slide.accent ? '0 0 60px rgba(245,166,36,0.4)' : 'none',
                }}>
                {slide.main}
              </h2>
              {slide.sub && (
                <p className="mt-6 text-white/45 text-lg md:text-xl leading-relaxed max-w-lg mx-auto whitespace-pre-line">
                  {slide.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
