'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useContent } from '@/lib/content-context'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-right gap-3 group">
        <span className="font-bold text-base md:text-lg text-white group-hover:text-[#F5A624] transition-colors leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
          className="flex-shrink-0 text-[#F5A624]/50"><ChevronDown size={18} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <p className="text-white/60 text-base md:text-lg leading-relaxed pb-5 whitespace-pre-line">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N1FAQ() {
  const contentD = useContent()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const allFaqs = [...contentD.objections.items, ...(contentD.pricing.faq ?? [])]

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-12"
        >
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            שאלות ותשובות
          </span>
          <h2 className="mt-4 font-black text-white"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
            אם אתה מתלבט — בטח שאלת את עצמך את זה
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-[#101010] border border-white/7 p-6 md:p-8"
        >
          {allFaqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
