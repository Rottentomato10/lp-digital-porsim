'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCheckoutUrl } from '@/lib/content-context'

export default function N12Sticky() {
  const CHECKOUT_URL = useCheckoutUrl()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-50 safe-bottom"
          style={{ background: 'rgba(6,10,19,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="text-white/25 line-through text-xs">₪490</span>
                <span className="font-black text-[#F5A624] text-lg">₪390</span>
              </div>
              <p className="text-white/20 text-[10px]">תשלום חד-פעמי · 7 ימי אחריות</p>
            </div>
            <a href={CHECKOUT_URL}
              className="flex-shrink-0 bg-[#F5A624] text-black font-black text-sm px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all">
              התחל עכשיו
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
