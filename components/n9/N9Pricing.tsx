'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { useContent, useCheckoutUrl } from '@/lib/content-context'

const VALUE_ITEMS = [
  { label: 'קורס פיננסים לצעירים — א׳ עד ת׳', value: 490, desc: null },
  { label: 'אפליקציית ניהול תזרים אישי', value: 200, desc: 'כדי שלא תצטרך לבנות אקסלים מסובכים בעצמך' },
  { label: 'תעודת סיום פורשים כנף', value: 150, desc: null },
  { label: 'גישה לקהילה הפרטית שלנו', value: 300, desc: 'כי הרבה יותר קל כשיש איפה לשאול שאלות בזמן אמת' },
]

export default function N9Pricing() {
  const contentD = useContent()
  const CHECKOUT_URL = useCheckoutUrl()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const totalValue = VALUE_ITEMS.reduce((s, i) => s + i.value, 0)

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-28 bg-[#080808] overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,36,0.06) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">ההשקעה בעתיד שלך</span>
          <h2 className="mt-4 font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            הכלים שיחסכו לך<br />עשור של טעויות.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl border border-[#F5A624]/30 bg-[#0D0B00] overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(245,166,36,0.08)' }}>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F5A624] to-transparent" />

          <div className="bg-[#F5A624]/10 border-b border-[#F5A624]/15 px-5 py-3 text-center">
            <p className="text-[#F5A624] font-bold text-sm md:text-base">
              מחיר השקה מיוחד — ₪{contentD.pricing.price} במקום ₪{contentD.pricing.price_original}
            </p>
          </div>

          <div className="p-5 xs:p-8 md:p-12">

            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-white/30 line-through text-2xl font-bold">₪{contentD.pricing.price_original}</span>
                <span className="font-black" style={{
                  fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                  background: 'linear-gradient(135deg, #F5A624, #FFCD6B)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>₪{contentD.pricing.price}</span>
              </div>
              <p className="text-white/40 text-base">{contentD.pricing.price_note}</p>
            </div>

            <p className="text-center text-white/40 text-base md:text-lg mb-4">
              תכלס? זה פחות ממה שטעות אחת בכסף יכולה לעלות לך.
            </p>

            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-4 mb-8 text-sm md:text-base">
              <span className="text-white/30">✘ לא בשבילך אם אתה מחפש להתעשר מהר</span>
              <span className="text-[#F5A624]/60">✔ כן בשבילך אם אתה רוצה להבין כסף באמת</span>
            </div>

            <a href={CHECKOUT_URL}
              className="cta-glow block w-full text-center bg-[#F5A624] text-black font-black text-lg xs:text-xl py-4 xs:py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-3">
              אני מתחיל עכשיו
            </a>
            <p className="text-center text-white/25 text-sm mb-4">🔒 תשלום מאובטח</p>

            <p className="text-center text-white/30 text-sm mb-10">
              ברגע שתשלם — תקבל גישה מיידית.
              <br />תתחיל מהשיעור הראשון, 4 דקות שישנו איך אתה מסתכל על הכסף שלך.
            </p>

            <div className="mb-10">
              <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-4">מה מקבלים</p>
              <div className="space-y-4">
                {VALUE_ITEMS.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <Check size={14} className="text-[#F5A624] flex-shrink-0 mt-1" />
                        <span className="text-white/70 text-sm xs:text-base">{item.label}</span>
                      </div>
                      <span className="text-white/30 text-sm flex-shrink-0">₪{item.value}</span>
                    </div>
                    {item.desc && (
                      <p className="text-white/30 text-sm mr-6 mt-1">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="text-white/40 text-sm">שווי כולל</span>
                <span className="text-white/40 text-base font-semibold line-through">₪{totalValue}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[#F5A624]/80 text-sm font-bold">אתה משלם עכשיו</span>
                <span className="text-[#F5A624] text-base font-black">₪{contentD.pricing.price}</span>
              </div>
            </div>

            {/* Guarantee — new copy */}
            <div className="p-5 xs:p-6 md:p-8 rounded-2xl border border-[#F5A624]/25 bg-[#F5A624]/5">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={24} className="text-[#F5A624] flex-shrink-0" />
                <p className="text-[#F5A624] text-lg font-black">אחריות מלאה — 7 ימים</p>
              </div>
              <div className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed">
                <p>אם בתוך 3 שעות לא תרגיש שקיבלת את השליטה לידיים — האחריות עלינו.
                  <br />תקבל החזר מלא. בלי שאלות.</p>
                <p className="text-white/70">
                  אנחנו לא כאן בשביל הכסף שלך.
                  <br />אנחנו כאן בשביל התוצאות שלך.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
