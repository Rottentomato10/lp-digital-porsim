'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function N3Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-3xl border border-[#F5A624]/20 bg-[#0D0B00]">

          <h3 className="text-[#F5A624] font-black text-3xl md:text-4xl mb-8">
            עכשיו תדמיין מצב אחר לגמרי:
          </h3>
          <div className="space-y-6 text-white/70 text-xl md:text-2xl leading-relaxed">
            <p>אתה פותח את האפליקציה של הבנק ויודע בדיוק מה קורה שם.
              <br />לאן הכסף הולך. כמה נשאר. מה המספר שאתה צריך להגיע אליו החודש.</p>
            <p>אתה מקבל תלוש שכר ומבין כל שורה.
              <br />אתה יודע שמה שמגיע לך — אתה באמת מקבל.</p>
            <p>יש לך כסף שעובד בשבילך — גם כשאתה ישן.
              <br />השקעת אותו במקום מסודר, שאתה מבין, שאתה בחרת בעצמך.</p>
            <p>מישהו שואל אותך &quot;מה אתה עושה עם הכסף שלך?&quot; — ויש לך תשובה. <span className="text-white font-bold">ברורה.</span></p>
          </div>

          {/* Tangible mockups placeholder */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#1a1700] border border-[#F5A624]/10 p-5 text-center">
              <span className="text-3xl mb-2 block">📊</span>
              <p className="text-white/50 text-sm font-medium">אפליקציית ניהול תזרים</p>
              <p className="text-white/30 text-xs mt-1">רואה לאן כל שקל הולך</p>
            </div>
            <div className="rounded-xl bg-[#1a1700] border border-[#F5A624]/10 p-5 text-center">
              <span className="text-3xl mb-2 block">📋</span>
              <p className="text-white/50 text-sm font-medium">תלוש שכר מפוענח</p>
              <p className="text-white/30 text-xs mt-1">מבין כל שורה, יודע מה מגיע לך</p>
            </div>
          </div>

          <p className="text-white font-bold text-2xl md:text-3xl mt-8">
            זה לא פנטזיה. זה מה שקורה כשיש לך ידע.
            <br />ו-3 שעות זה כל מה שמפריד בינך לבין שם.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
