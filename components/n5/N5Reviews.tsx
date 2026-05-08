'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const AVATAR_COLORS = ['#F5A624', '#5EEAD4', '#A78BFA', '#F472B6', '#60A5FA', '#34D399', '#FB923C', '#E879F9']

const FEATURED = {
  name: 'אור כ.',
  city: 'תל אביב',
  year: '2025',
  quote: 'בלי להגזים — הקורס הזה שינה לי את הראש לגמרי. דברים שאף אחד לא טרח להסביר לי פתאום הפכו ברורים. הלוואי שהייתי רואה את זה שנים קודם.',
}

const REVIEWS = [
  { name: 'עמית ר.', city: 'הרצליה', year: '2025', quote: 'הבנתי שאני מפסיד מאות שקלים בחודש בלי לשים לב. הקורס פקח לי את העיניים.' },
  { name: 'דניאל כ.', city: 'ירושלים', year: '2024', quote: 'פתחתי תיק השקעות שבוע אחרי הקורס. לא האמנתי שזה כל כך פשוט כשמבינים.' },
  { name: 'נועה ש.', city: 'חיפה', year: '2025', quote: 'הלוואי שהייתי לומדת את זה לפני שנים. הייתי חוסכת לעצמי כל כך הרבה טעויות.' },
  { name: 'מייק ג.', city: 'כרמיאל', year: '2024', quote: 'למדתי שאני צריך לדעת לנהל כסף בעצמי ולא לסמוך על אף אחד. זה שינה לי את הגישה.' },
  { name: 'שירה ל.', city: 'רמת גן', year: '2025', quote: 'יצאתי מהקורס עם רצון אחד: להתחיל להשקיע. דחוףףףף.' },
  { name: 'עאמר ח.', city: 'טירה', year: '2024', quote: 'גיליתי שיש מלא דברים וחוקים שלא ידעתי עליהם. כסף זה באמת לא צחוק.' },
  { name: 'ליאור ק.', city: 'באר שבע', year: '2025', quote: 'הקורס גרם לי להתנהל אחרת עם כסף ולהתחיל לחסוך כבר מעכשיו.' },
  { name: 'מאיה ד.', city: 'יקנעם', year: '2024', quote: 'לפני הקורס כסף היה נושא מלחיץ. עכשיו אני פחות פוחדת ויותר מבינה.' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624] text-sm">★</span>)}
    </div>
  )
}

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}20`, border: `2px solid ${color}40` }}>
      <span className="font-bold text-sm" style={{ color }}>{name[0]}</span>
    </div>
  )
}



function WaCarousel() {
  const [active, setActive] = useState(0)
  const [screenshots, setScreenshots] = useState<{ src: string; alt: string }[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/review-list.json')
      .then(r => r.json())
      .then((images: string[]) => {
        setScreenshots(images.map(src => ({ src: encodeURI(src), alt: 'ביקורת תלמיד' })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const total = screenshots.length
  const prev = () => total > 0 && setActive(a => (a - 1 + total) % total)
  const next = () => total > 0 && setActive(a => (a + 1) % total)

  if (loading) return <div style={{ height: '260px' }} />
  if (total === 0) return null

  const getOffset = (i: number) => {
    const diff = ((i - active) % total + total) % total
    if (diff === 0) return 0    // center
    if (diff === 1) return 1    // right
    if (diff === total - 1) return -1 // left
    return 2                     // hidden
  }

  return (
    <div dir="ltr" className="relative" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="relative flex items-center justify-center" style={{ height: '260px' }}>
        {screenshots.map((img, i) => {
          const pos = getOffset(i)
          const isCenter = pos === 0
          const isHidden = Math.abs(pos) > 1

          return (
            <div key={i}
              className="absolute transition-all duration-500 ease-out cursor-pointer"
              onClick={() => { if (pos === -1) prev(); if (pos === 1) next() }}
              style={{
                width: '55%',
                transform: `translateX(${pos * 75}%) scale(${isCenter ? 1 : 0.8})`,
                opacity: isHidden ? 0 : 1,
                filter: isCenter ? 'none' : 'blur(3px) brightness(0.5)',
                zIndex: isCenter ? 10 : 1,
                pointerEvents: isHidden ? 'none' : 'auto',
              }}
            >
              <div className={`rounded-2xl overflow-hidden border-2 ${isCenter ? 'border-[#25D366]/40' : 'border-white/10'}`}
                style={isCenter ? { boxShadow: '0 0 40px rgba(37,211,102,0.15)' } : {}}>
                <img src={img.src} alt={img.alt}
                  className="w-full h-auto" loading="eager" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Arrows below */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button onClick={prev}
          className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:border-[#F5A624]/30 transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next}
          className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 hover:border-[#F5A624]/30 transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default function N5Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-5">

        {/* WhatsApp screenshots carousel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-14">
          <p className="text-center text-[#F5A624] text-sm font-semibold tracking-wide mb-6">קצת ממה שאומרים עלינו</p>
          <WaCarousel />
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-14" />

        <p className="text-center text-white/30 text-sm font-semibold tracking-wide mb-8">עוד ביקורות מתלמידים</p>

        {/* Featured review */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative p-5 xs:p-8 md:p-10 rounded-3xl border border-[#F5A624]/20 bg-[#120E00] mb-6 overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(245,166,36,0.07), transparent)' }} />
          <div className="relative z-10">
            <div className="flex justify-center mb-3">
              {Array(5).fill(0).map((_, i) => <span key={i} className="text-[#F5A624]">★</span>)}
            </div>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-5 max-w-lg mx-auto">
              ״{FEATURED.quote}״
            </p>
            <p className="text-white/50 text-sm">{FEATURED.name} · {FEATURED.city}</p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-4">
          {REVIEWS.map((review, i) => (
            <div key={i} className="p-5 rounded-xl bg-[#111111] border border-white/7">
              <Stars />
              <p className="text-white/65 text-base leading-relaxed mb-3">״{review.quote}״</p>
              <p className="text-white/50 text-sm">{review.name} · {review.city}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
