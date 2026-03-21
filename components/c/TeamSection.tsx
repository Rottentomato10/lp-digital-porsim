'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const TEAM = [
  {
    name: 'שם שותף א׳',
    role: 'מייסד שותף · פורשים כנף',
    bio: 'משפט קצר על הרקע ומה מביא לכאן.',
    image: null, // ← שים כאן: '/team/partner-a.jpg'
  },
  {
    name: 'שם שותף ב׳',
    role: 'מייסד שותף · פורשים כנף',
    bio: 'משפט קצר על הרקע ומה מביא לכאן.',
    image: null, // ← שים כאן: '/team/partner-b.jpg'
  },
]

function Avatar({ person, index }: { person: typeof TEAM[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center gap-4">

      {/* Photo or placeholder */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#F5A624]/30"
        style={{ boxShadow: '0 0 32px rgba(245,166,36,0.12)' }}>
        {person.image ? (
          <Image src={person.image} alt={person.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
            <span className="text-4xl text-white/10 font-black select-none">
              {person.name[0]}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-white font-bold text-lg">{person.name}</p>
        <p className="text-[#F5A624]/70 text-sm font-medium mt-0.5">{person.role}</p>
        <p className="text-white/40 text-sm mt-2 leading-relaxed max-w-xs mx-auto">{person.bio}</p>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#0C0C0C]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="text-[#F5A624] font-semibold text-sm tracking-widest uppercase">
            מי מאחורי הקורס
          </span>
          <h2 className="mt-4 font-black text-white"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}>
            שני אנשים שהחליטו לעשות את מה שבית הספר לא עשה.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 md:gap-16 justify-items-center">
          {TEAM.map((person, i) => (
            <Avatar key={i} person={person} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
