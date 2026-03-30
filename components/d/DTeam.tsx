'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const TEAM = [
  {
    name: 'דקל קאפח',
    role: 'מייסד שותף · פורשים כנף',
    bio: 'כמתכנן פיננסי (CFP) ויזם שבונה כלים טכנולוגיים לעולם הפיננסים, אני רואה כל יום איך חוסר בידע בסיסי עולה לאנשים ביוקר. ב׳פורשים כנף׳ אני אחראי על הפיכת המושגים המורכבים ביותר לשיטה ברורה שכל אחד יכול ליישם.',
    image: null as string | null,
  },
  {
    name: 'אביתר דנגור',
    role: 'מייסד שותף · פורשים כנף',
    bio: 'אחרי שנים כמורה במערכת החינוך, הבנתי שיש חור שחור בתוכנית הלימודים. עם תואר בכלכלה וניסיון בחינוך, הקמתי את ׳פורשים כנף׳ כדי להנגיש ידע כלכלי בגובה העיניים. המטרה: שכל צעיר וצעירה יצאו לחיים עם הכלים שהם באמת צריכים.',
    image: null as string | null,
  },
]

const CREDS = [
  { value: '15,000+', label: 'תלמידים למדו' },
  { value: '7,000+', label: 'שעות לימוד' },
  { value: '94%', label: 'שביעות רצון' },
  { value: '5+', label: 'שנות פעילות' },
]

export default function DTeam() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-12 md:py-20 bg-[#080808]">
      <div className="max-w-3xl mx-auto px-5">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="t-eyebrow">
            מי אנחנו
          </span>
          <Image src="/logo.png" alt="פורשים כנף" width={200} height={200}
            className="w-44 h-44 md:w-52 md:h-52 object-contain mx-auto my-6 drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" />
          <p className="t-body-lg max-w-xl mx-auto mt-4">
            כבר 5 שנים אנחנו מלמדים חינוך פיננסי בבתי ספר ומסגרות חינוכיות ברחבי הארץ.
            עבדנו עם אלפי תלמידים ותלמידות — וראינו בדיוק איפה כולם נופלים.
            עכשיו, לראשונה, הבאנו את כל הידע הזה לדיגיטל.<br /><br />
            כדי שכל אחד יוכל לקבל אותו — לא רק מי שישב איתנו בכיתה.
          </p>
        </motion.div>

        {/* Credibility stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14"
        >
          {CREDS.map((c, i) => (
            <div key={i} className="text-center py-4 rounded-2xl border border-white/6 bg-[#101010]">
              <p className="font-black text-[#F5A624] text-xl">{c.value}</p>
              <p className="text-white/30 text-xs mt-0.5">{c.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 gap-10 md:gap-20 justify-items-center">
          {TEAM.map((person, i) => (
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
                <p className="t-muted mt-2 max-w-xs mx-auto">{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="divider-glow mt-14" />
    </section>
  )
}
