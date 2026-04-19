'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wallet, FileText, TrendingUp, Users, Clock } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const PROBLEMS = [
  { icon: Wallet, title: 'הכסף פשוט "עובר דרכך"', text: 'עובד קשה, אבל בסוף החודש לא נשאר כלום. בלי שיטה, הכסף רק "תייר" בחשבון.' },
  { icon: FileText, title: 'עיוורון מול תלוש השכר', text: 'מפסיד כסף ששייך לך, רק כי אתה לא קורא את האותיות הקטנות.' },
  { icon: TrendingUp, title: 'השקעות = שפה אחרת', text: 'מניות, S&P500, קרנות — שמעת הכל, מבין אפס. והאינפלציה לא מחכה.' },
  { icon: Users, title: 'מרגיש שמפספס', text: 'כולם סביבך מדברים על כסף. אתה לא עצלן — פשוט אף אחד לא נתן לך את הכלים.' },
  { icon: Clock, title: 'כל חודש שעובר עולה לך', text: 'ההבדל בין להתחיל בגיל 22 לבין 32 — זה ההבדל בין דירה לחלום על דירה.' },
]

export default function N12Problems() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-14 md:py-20 bg-[#0A0F1A]">
      <div className="max-w-lg mx-auto px-5">

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-[#F5A624]/60 text-xs font-bold tracking-widest uppercase mb-6">אולי זה מוכר לך</motion.p>

        {/* Compact stacked cards — mobile-first */}
        <div className="space-y-3 mb-10">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-[#F5A624]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bridge */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="text-center p-5 rounded-xl border border-[#F5A624]/15 bg-[#F5A624]/[0.04]">
          <p className="text-white/50 text-base">
            מה אם תוך <span className="text-[#F5A624] font-bold">3 שעות</span> כל זה ישתנה?
          </p>
        </motion.div>

      </div>
    </section>
  )
}
