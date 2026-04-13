'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen, TrendingUp, Settings } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const MODULES = [
  {
    icon: BookOpen,
    badge: 'חלק 1',
    title: 'היסודות',
    stats: '5 פרקים · 25 שיעורים · 82 דק׳',
    desc: 'שכר, זכויות, תלוש השכר, אשראי, ריבית ואינפלציה.',
    color: '#F5A624',
    outcomes: ['להבין תלוש שכר שורה אחרי שורה', 'לדעת מה מגיע לך מהמעסיק', 'להבין ריבית ואינפלציה'],
  },
  {
    icon: TrendingUp,
    badge: 'חלק 2',
    title: 'הצמיחה',
    stats: '2 פרקים · 17 שיעורים · 57 דק׳',
    desc: 'מניות, אג"ח, מדדים, קרנות סל. נדל"ן ומשכנתא.',
    color: '#10B981',
    outcomes: ['להבין שוק ההון ואיך להתחיל להשקיע', 'לדעת מה זה S&P500 ולמה הוא חשוב', 'להבין נדל"ן, מינוף ומשכנתא'],
  },
  {
    icon: Settings,
    badge: 'חלק 3',
    title: 'שליטה',
    stats: '3 פרקים · 15 שיעורים · 53 דק׳',
    desc: 'ניהול חכם, הטבות, שכיר vs עצמאי + פסיכולוגיית כסף.',
    color: '#8B5CF6',
    outcomes: ['לבנות תקציב שבאמת עובד', 'לחסוך על מסים בצורה חוקית', 'להבין פסיכולוגיית כסף'],
  },
]

function ModuleCard({ mod, index, inView }: { mod: typeof MODULES[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)
  const Icon = mod.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="rounded-2xl overflow-hidden border transition-all duration-300"
      style={{ borderColor: open ? `${mod.color}40` : 'rgba(255,255,255,0.06)', background: `linear-gradient(160deg, ${mod.color}06 0%, #0D1117 50%)` }}
    >
      <button onClick={() => setOpen(!open)} className="w-full p-6 md:p-8 text-right">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${mod.color}12`, border: `1px solid ${mod.color}25` }}>
            <Icon size={22} style={{ color: mod.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${mod.color}15`, color: mod.color }}>
                {mod.badge}
              </span>
              <h3 className="text-white font-bold text-xl md:text-2xl">{mod.title}</h3>
            </div>
            <p className="text-white/30 text-sm mb-1">{mod.stats}</p>
            <p className="text-white/55 text-base md:text-lg">{mod.desc}</p>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}
            className="flex-shrink-0 mt-1" style={{ color: mod.color }}>
            <ChevronDown size={20} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 mr-16">
              <div className="border-t pt-4 space-y-3" style={{ borderColor: `${mod.color}12` }}>
                {mod.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5" style={{ color: mod.color }}>✔</span>
                    <span className="text-white/60 text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function N11Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#060A13]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-6">
          <span className="text-[#F5A624]/60 text-sm font-semibold tracking-widest uppercase">מה בפנים</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14">
          <h2 className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            3 שעות. 57 שיעורים.
            <br />מסלול אחד ברור.
          </h2>
          <p className="text-white/40 text-lg">שיעורים של 2-5 דקות. מושלם לצפייה מכל מקום.</p>
        </motion.div>

        {/* Module accordion */}
        <div className="space-y-4 mb-14">
          {MODULES.map((mod, i) => (
            <ModuleCard key={i} mod={mod} index={i} inView={inView} />
          ))}
        </div>

        {/* What's included strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {[
            { label: 'קורס מלא', sub: '57 שיעורים' },
            { label: 'אפליקציה', sub: 'ניהול תזרים' },
            { label: 'תעודת סיום', sub: 'פורשים כנף' },
            { label: 'קהילה', sub: 'תמיכה בזמן אמת' },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-[#0D1117] border border-white/5">
              <p className="text-white font-bold text-sm md:text-base">{item.label}</p>
              <p className="text-white/30 text-xs md:text-sm mt-0.5">{item.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Mid CTA */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center">
          <a href={CHECKOUT_URL}
            className="cta-shine inline-flex items-center bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            אני רוצה גישה מלאה — ₪390
          </a>
        </motion.div>
      </div>
    </section>
  )
}
