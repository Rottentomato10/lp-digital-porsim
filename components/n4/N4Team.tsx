'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function N4Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-10">
          <Image src="/logo.png" alt="פורשים כנף" width={200} height={200}
            className="w-36 h-36 md:w-44 md:h-44 object-contain mx-auto my-6 drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }} className="space-y-6 text-center">

          <div className="flex items-center justify-center gap-8 flex-wrap mb-8">
            {[
              { val: '5+', label: 'שנות פעילות' },
              { val: '15,000+', label: 'תלמידים' },
              { val: '94%', label: 'שביעות רצון' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-black text-[#F5A624] text-2xl">{s.val}</p>
                <p className="text-white/30 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            5 שנים של חינוך פיננסי בשטח. אלפי תלמידים ותלמידות.
          </p>
          <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            ראינו בדיוק איפה אנשים נתקעים — ובנינו את הקורס כדי לפתור את זה.
            <br />עכשיו הכל זמין גם לך — בדיגיטל.
          </p>
        </motion.div>

        {/* Founders */}
        <div className="grid grid-cols-2 gap-10 md:gap-20 justify-items-center mt-14">
          {[
            { name: 'דקל קאפח', role: 'מייסד שותף · פורשים כנף', bio: 'משפט קצר על הרקע ומה מביא לכאן.', image: null as string | null },
            { name: 'אביתר דנגור', role: 'מייסד שותף · פורשים כנף', bio: 'משפט קצר על הרקע ומה מביא לכאן.', image: null as string | null },
          ].map((person, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-4">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#F5A624]/30"
                style={{ boxShadow: '0 0 32px rgba(245,166,36,0.12)' }}>
                {person.image ? (
                  <Image src={person.image} alt={person.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                    <span className="text-4xl text-white/10 font-black select-none">{person.name[0]}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{person.name}</p>
                <p className="text-[#F5A624]/70 text-sm font-medium mt-0.5">{person.role}</p>
                <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="divider-glow mt-14" />
    </section>
  )
}
