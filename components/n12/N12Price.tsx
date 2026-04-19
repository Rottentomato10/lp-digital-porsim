'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N12Price() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section id="pricing" ref={ref} className="py-14 md:py-20 bg-[#060A13]">
      <div className="max-w-lg mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-8">
          <p className="text-[#F5A624]/60 text-xs font-bold tracking-widest uppercase mb-2">ההשקעה בעתיד שלך</p>
          <h2 className="font-black text-white text-2xl md:text-3xl leading-tight">
            הכלים שיחסכו לך
            <br />עשור של טעויות.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-[#F5A624]/20"
          style={{ background: 'linear-gradient(180deg, rgba(245,166,36,0.04) 0%, #0A0F1A 40%)' }}>

          <div className="h-0.5 bg-[#F5A624]" />

          <div className="p-5">
            {/* Price */}
            <div className="text-center mb-5">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-white/20 line-through text-lg">₪490</span>
                <span className="font-black text-[#F5A624] text-5xl">₪390</span>
              </div>
              <p className="text-white/25 text-xs">תשלום חד-פעמי · גישה לכל החיים</p>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-5">
              {['קורס מלא — 57 שיעורים', 'אפליקציית ניהול תזרים', 'תעודת סיום', 'קהילה פרטית + תמיכה', 'עדכונים עתידיים — חינם'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={13} className="text-[#10B981] flex-shrink-0" />
                  <span className="text-white/50 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={CHECKOUT_URL}
              className="cta-shine block w-full text-center bg-[#F5A624] text-black font-black text-lg py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-all mb-2">
              אני מתחיל עכשיו
            </a>
            <p className="text-center text-white/15 text-[11px] mb-5">🔒 תשלום מאובטח</p>

            {/* Guarantee */}
            <div className="p-4 rounded-xl bg-[#10B981]/[0.06] border border-[#10B981]/15">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={15} className="text-[#10B981]" />
                <p className="text-[#10B981] font-bold text-sm">7 ימי אחריות מלאה</p>
              </div>
              <p className="text-white/35 text-xs leading-relaxed">
                אם בתוך 3 שעות לא תרגיש שקיבלת את השליטה לידיים — החזר מלא. בלי שאלות. אנחנו כאן בשביל התוצאות שלך.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
