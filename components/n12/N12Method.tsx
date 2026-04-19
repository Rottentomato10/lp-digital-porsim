'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const STAGES = [
  {
    num: '01', title: 'היסודות', stats: '5 פרקים · 25 שיעורים · 82 דק׳', color: '#F59E0B',
    about: 'שכר, זכויות עובד ותלוש השכר, אשראי, ריבית ואינפלציה.',
    items: ['להבין תלוש שכר שורה אחרי שורה', 'לדעת מה מגיע לך מהמעסיק', 'להבין ריבית ואינפלציה'],
  },
  {
    num: '02', title: 'הצמיחה', stats: '2 פרקים · 17 שיעורים · 57 דק׳', color: '#10B981',
    about: 'מניות, אג"ח, מדדים, קרנות סל. נדל"ן, מינוף, משכנתא.',
    items: ['להבין שוק ההון ולהתחיל להשקיע', 'לדעת מה זה S&P500', 'להבין נדל"ן ומשכנתא'],
  },
  {
    num: '03', title: 'שליטה', stats: '3 פרקים · 15 שיעורים · 53 דק׳', color: '#8B5CF6',
    about: 'ניהול חכם, הטבות, שכיר מול עצמאי. + בונוס: פסיכולוגיית כסף.',
    items: ['לבנות תקציב שעובד', 'לחסוך על מסים', 'להבין פסיכולוגיית כסף'],
  },
]

function StageRow({ stage }: { stage: typeof STAGES[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:shadow-md hover:shadow-black/5 transition-shadow">
      <button onClick={() => setOpen(!open)} className="w-full p-5 md:p-7 text-right flex items-start gap-5">
        <span className="font-black text-3xl md:text-4xl leading-none mt-1" style={{ color: stage.color }}>{stage.num}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#1a1a1a] text-xl md:text-2xl mb-1">{stage.title}</h3>
          <p className="text-gray-400 text-sm mb-1">{stage.stats}</p>
          <p className="text-gray-500 text-base">{stage.about}</p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          className="text-gray-300 mt-2 flex-shrink-0"><ChevronDown size={20} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 md:px-7 pb-5 md:pb-7 mr-[52px] md:mr-[68px]">
              <div className="border-t border-gray-100 pt-4 space-y-2.5">
                {stage.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5" style={{ color: stage.color }}>✔</span>
                    <span className="text-gray-600 text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
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
    <section ref={ref} className="py-16 md:py-24 bg-[#FAFAF9]">
      <div className="max-w-3xl mx-auto px-6">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-12">
          <p className="text-[#F5A624] text-sm font-bold tracking-widest uppercase mb-3">המסלול</p>
          <h2 className="font-black text-[#1a1a1a] text-3xl md:text-4xl leading-tight">
            די לאלתורים.
            <br />מתודולוגיה אחת. ברורה. פרקטית.
          </h2>
          <p className="text-gray-400 text-lg mt-3">3 שעות · 57 שיעורים · גישה לכל החיים</p>
        </motion.div>

        <div className="space-y-4 mb-12">
          {STAGES.map((stage, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}>
              <StageRow stage={stage} />
            </motion.div>
          ))}
        </div>

        {/* Included strip */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { top: '57', bottom: 'שיעורים' },
            { top: '3', bottom: 'שעות' },
            { top: '∞', bottom: 'גישה' },
            { top: '7', bottom: 'ימי אחריות' },
          ].map((s, i) => (
            <div key={i} className="text-center py-5 rounded-xl bg-white border border-gray-100">
              <p className="font-black text-2xl text-[#1a1a1a]">{s.top}</p>
              <p className="text-gray-400 text-sm">{s.bottom}</p>
            </div>
          ))}
        </motion.div>

        {/* MiniClose — inline */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-400 text-lg mb-2">הידע כבר כאן.</p>
          <p className="text-[#1a1a1a] font-bold text-xl md:text-2xl mb-6">
            השאלה היא אם תבחר להמשיך לנחש — או <span className="text-[#F5A624]">להתחיל לנהל</span>.
          </p>
          <a href={CHECKOUT_URL}
            className="inline-flex items-center bg-[#1a1a1a] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-black transition-colors">
            אני מתחיל — ₪390
          </a>
        </motion.div>

      </div>
    </section>
  )
}
