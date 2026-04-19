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
    <section id="pricing" ref={ref} className="py-16 md:py-24 bg-[#FAFAF9]">
      <div className="max-w-md mx-auto px-6">

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-10">
          <p className="text-[#F5A624] text-sm font-bold tracking-widest uppercase mb-3">ההשקעה בעתיד שלך</p>
          <h2 className="font-black text-[#1a1a1a] text-3xl md:text-4xl leading-tight">
            הכלים שיחסכו לך
            <br />עשור של טעויות.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl shadow-black/5">

          {/* Gold bar */}
          <div className="h-1 bg-gradient-to-r from-[#F5A624] via-[#FFCD6B] to-[#F5A624]" />

          <div className="p-6 md:p-8">
            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-gray-300 line-through text-xl font-bold">₪490</span>
                <span className="font-black text-[#1a1a1a]" style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }}>₪390</span>
              </div>
              <p className="text-gray-400 text-sm">תשלום חד-פעמי · גישה לכל החיים</p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {[
                'קורס מלא — 57 שיעורים',
                'אפליקציית ניהול תזרים',
                'תעודת סיום',
                'קהילה פרטית + תמיכה',
                'עדכונים עתידיים — חינם',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#10B981] flex-shrink-0" />
                  <span className="text-gray-600 text-[15px]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href={CHECKOUT_URL}
              className="block w-full text-center bg-[#1a1a1a] text-white font-black text-lg py-4 rounded-full hover:bg-black transition-colors mb-3">
              אני מתחיל עכשיו
            </a>
            <p className="text-center text-gray-400 text-xs mb-6">🔒 תשלום מאובטח</p>

            {/* Guarantee */}
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-[#10B981]" />
                <p className="text-[#166534] font-bold text-sm">7 ימי אחריות מלאה</p>
              </div>
              <p className="text-[#166534] text-sm leading-relaxed">
                אם בתוך 3 שעות לא תרגיש שקיבלת את השליטה לידיים — החזר מלא. בלי שאלות. אנחנו כאן בשביל התוצאות שלך.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
