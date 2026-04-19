'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wallet, FileText, TrendingUp, Users, Clock } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

const PROBLEMS = [
  {
    icon: Wallet, color: '#F59E0B',
    title: 'הכסף פשוט "עובר דרכך"',
    text: 'אתה עובד קשה בשביל המשכורת, אבל היא לא באמת נשארת אצלך. בלי שיטה, הכסף תמיד יהיה רק "תייר" בחשבון הבנק שלך.',
  },
  {
    icon: FileText, color: '#EF4444',
    title: 'עיוורון פיננסי מול תלוש השכר',
    text: 'אתה מפסיד כסף ששייך לך, רק כי אתה לא קורא את האותיות הקטנות. וזה לא סתם בורות — זה כסף אמיתי שנעלם לך כל חודש.',
  },
  {
    icon: TrendingUp, color: '#3B82F6',
    title: 'ההשקעות מרגישות כמו שפה אחרת',
    text: 'מניות, S&P500, קרנות סל — שמעת הכל, מבין אפס. אז אתה עושה את הדבר הכי טבעי — כלום. והאינפלציה לא מחכה.',
  },
  {
    icon: Users, color: '#8B5CF6',
    title: 'התחושה שאתה מפספס',
    text: 'אתה רואה אנשים סביבך שמדברים על השקעות, חיסכון, "שהכסף יעבוד בשבילך". פשוט אף אחד לא נתן לך את הכלים.',
  },
  {
    icon: Clock, color: '#10B981',
    title: 'וכל חודש שעובר — זה עולה לך',
    text: 'ההבדל בין להתחיל להשקיע בגיל 22 לבין 32 — זה לא כמה אלפי שקלים. זה יכול להיות ההבדל בין דירה לבין חלום על דירה.',
  },
]

export default function N12Problems() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="mb-14">
          <p className="text-[#F5A624] text-sm font-bold tracking-widest uppercase mb-3">אולי זה מוכר לך</p>
          <h2 className="font-black text-[#1a1a1a] text-3xl md:text-4xl">חמישה דברים שאף אחד לא לימד אותך.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-6 rounded-2xl border border-gray-100 bg-[#FAFAF9] hover:shadow-lg hover:shadow-black/5 transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.color}12` }}>
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">{p.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">{p.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="text-center">
          <a href={CHECKOUT_URL}
            className="inline-flex items-center bg-[#1a1a1a] text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-black transition-colors">
            תן לי להבין כסף עכשיו
          </a>
        </motion.div>

      </div>
    </section>
  )
}
