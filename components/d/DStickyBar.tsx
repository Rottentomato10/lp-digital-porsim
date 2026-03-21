'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { contentD, CHECKOUT_URL } from '@/lib/content-d'

export default function DStickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-50 border-t border-white/8"
          style={{ background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)' }}
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-shrink-0">
              <span className="text-white/30 line-through text-sm">
                ₪{contentD.pricing.price_original}
              </span>
              <span className="font-black text-[#F5A624] text-2xl">
                ₪{contentD.pricing.price}
              </span>
              <span className="hidden sm:block text-white/30 text-xs">תשלום חד-פעמי</span>
            </div>

            {/* CTA */}
            <a
              href={CHECKOUT_URL}
              className="flex-shrink-0 cta-glow bg-[#F5A624] text-black font-black text-base px-6 py-2.5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              {contentD.pricing.cta}
            </a>

            {/* Trust */}
            <div className="hidden md:flex items-center gap-1.5 text-white/25 text-xs flex-shrink-0">
              <ShieldCheck size={13} className="text-[#F5A624]/40" />
              <span>תשלום מאובטח</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
