'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const STAGES = [
  { num: '01', title: 'היסודות', time: '82 דק׳', color: '#F5A624', items: ['שכר, זכויות, תלוש השכר', 'אשראי, ריבית ואינפלציה'] },
  { num: '02', title: 'הצמיחה', time: '57 דק׳', color: '#10B981', items: ['מניות, אג"ח, מדדים, קרנות סל', 'נדל"ן, מינוף, משכנתא'] },
  { num: '03', title: 'שליטה', time: '53 דק׳', color: '#8B5CF6', items: ['ניהול חכם, הטבות מס', 'שכיר vs עצמאי + פסיכולוגיית כסף'] },
]

function Stage({ s, inView }: { s: typeof STAGES[0]; inView: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-4 text-right">
        <span className="font-black text-2xl leading-none" style={{ color: s.color }}>{s.num}</span>
        <div className="flex-1">
          <p className="text-white font-bold text-base">{s.title}</p>
          <p className="text-white/25 text-xs">{s.time}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/20"><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-4 pr-14 space-y-1.5">
              {s.items.map((item, i) => (
                <p key={i} className="text-white/35 text-sm flex items-start gap-2">
                  <span style={{ color: s.color }} className="text-xs mt-0.5">✔</span> {item}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function N12Method() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#060A13]">
      <div className="max-w-lg mx-auto px-5">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-8">
          <h2 className="font-black text-white text-2xl md:text-3xl leading-tight mb-2">
            די לאלתורים.
            <br />מתודולוגיה אחת. ברורה.
          </h2>
          <p className="text-white/30 text-sm">3 שעות · 57 שיעורים · גישה לכל החיים</p>
        </motion.div>

        <div className="space-y-2.5 mb-8">
          {STAGES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}>
              <Stage s={s} inView={inView} />
            </motion.div>
          ))}
        </div>

        {/* Included */}
        <div className="grid grid-cols-4 gap-2 mb-10">
          {['קורס מלא', 'אפליקציה', 'תעודה', 'קהילה'].map((label, i) => (
            <div key={i} className="text-center py-3 rounded-lg bg-white/[0.03] border border-white/5">
              <p className="text-white/60 text-xs font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Mini close + CTA */}
        <div className="text-center">
          <p className="text-white/30 text-sm mb-1">הידע כבר כאן.</p>
          <p className="text-white font-bold text-lg mb-5">
            להמשיך לנחש — או <span className="text-[#F5A624]">להתחיל לנהל</span>?
          </p>
          <a href={CHECKOUT_URL}
            className="cta-shine block w-full text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all">
            אני מתחיל — ₪390
          </a>
        </div>

      </div>
    </section>
  )
}
