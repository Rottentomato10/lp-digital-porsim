'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ShieldCheck, Lock } from 'lucide-react'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N11Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const CHECKOUT_URL = useCheckoutUrl()

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#060A13] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,166,36,0.04) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-lg mx-auto px-5">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          className="text-center mb-10">
          <h2 className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            הגיע הזמן.
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #0D1117 0%, #111827 100%)',
            border: '1px solid rgba(245,166,36,0.2)',
            boxShadow: '0 0 80px rgba(245,166,36,0.06)',
          }}>

          {/* Gold top line */}
          <div className="h-1 bg-gradient-to-r from-[#F5A624] via-[#FFCD6B] to-[#F5A624]" />

          {/* Discount banner */}
          <div className="bg-[#F5A624]/8 px-5 py-3 text-center border-b border-[#F5A624]/10">
            <p className="text-[#F5A624] font-bold text-sm">מחיר השקה מיוחד — חיסכון של ₪100</p>
          </div>

          <div className="p-6 xs:p-8 md:p-10">

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-white/25 line-through text-xl font-bold">₪490</span>
                <span className="font-black text-[#F5A624]" style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)' }}>
                  ₪390
                </span>
              </div>
              <p className="text-white/30 text-sm">תשלום חד-פעמי · גישה לכל החיים</p>
            </div>

            {/* What you get — visual list */}
            <div className="space-y-3 mb-8">
              {[
                { label: 'קורס מלא — 57 שיעורים', value: '₪490' },
                { label: 'אפליקציית ניהול תזרים', value: '₪200' },
                { label: 'תעודת סיום', value: '₪150' },
                { label: 'קהילה פרטית + תמיכה', value: '₪300' },
                { label: 'עדכונים עתידיים', value: 'חינם' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <Check size={15} className="text-[#10B981] flex-shrink-0" />
                    <span className="text-white/65 text-sm xs:text-base">{item.label}</span>
                  </div>
                  <span className="text-white/25 text-sm flex-shrink-0 line-through">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-8 pt-2">
              <span className="text-white/40 text-sm">שווי כולל: <span className="line-through">₪1,140</span></span>
              <span className="text-[#10B981] font-black text-lg">אתה משלם ₪390</span>
            </div>

            {/* CTA */}
            <a href={CHECKOUT_URL}
              className="cta-shine block w-full text-center bg-[#F5A624] text-black font-black text-xl py-5 rounded-full hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
              אני מתחיל עכשיו
            </a>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-white/25 text-xs">
                <Lock size={11} />
                <span>תשלום מאובטח</span>
              </div>
              <div className="flex items-center gap-1 text-white/25 text-xs">
                <ShieldCheck size={11} />
                <span>SSL 256-bit</span>
              </div>
            </div>

            {/* Guarantee */}
            <div className="p-5 rounded-xl bg-[#10B981]/5 border border-[#10B981]/15">
              <div className="flex items-center gap-2.5 mb-3">
                <ShieldCheck size={20} className="text-[#10B981] flex-shrink-0" />
                <p className="text-[#10B981] font-bold">7 ימי אחריות מלאה</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                אם בתוך 3 שעות לא תרגיש שקיבלת את השליטה לידיים — תקבל החזר מלא. בלי שאלות. אנחנו כאן בשביל התוצאות שלך.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
