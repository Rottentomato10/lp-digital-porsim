'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Users, Calendar, Clock, Sparkles, Heart, Shield, ChevronLeft } from 'lucide-react'

const WAITLIST_URL = 'https://wa.me/9720537282727?text=היי, אשמח לשמוע עוד על פורשות כנף ולהירשם לרשימת ההמתנה'

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.section>
  )
}

export default function PorshotLanding() {
  return (
    <div className="min-h-screen bg-[#080808] text-white" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245,166,36,0.06) 0%, transparent 60%)',
        }} />

        <div className="max-w-3xl mx-auto px-5 pt-10 pb-16 relative z-10">
          <div className="flex justify-center mb-5">
            <Image src="/logo.png" alt="פורשים כנף" width={100} height={100}
              className="w-20 h-20 object-contain drop-shadow-[0_0_40px_rgba(245,166,36,0.4)]" priority />
          </div>

          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-[#F5A624]/10 border border-[#F5A624]/20 rounded-full px-4 py-1.5">
              <Sparkles size={14} className="text-[#F5A624]" />
              <span className="text-[#F5A624] text-sm font-semibold">12 משתתפות בלבד בכל קבוצה</span>
            </span>
          </div>

          <h1 className="text-center font-black leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
            <span className="text-white">פורשות כנף</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #F5A624 0%, #FFCD6B 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>סדנאות פיננסיות לנשים</span>
          </h1>

          <p className="text-center text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            מרחב אינטימי ובטוח שבו נשים לומדות להרגיש בנוח עם כסף —
            <br />לדבר עליו, להבין אותו, ולקבל החלטות חכמות.
          </p>

          <div className="flex justify-center">
            <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer"
              className="cta-shine inline-flex items-center gap-2 bg-[#F5A624] text-black font-black text-lg px-10 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
              אני רוצה להצטרף
              <ChevronLeft size={20} />
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#F5A624]/20 to-transparent" />
      </section>

      {/* Why */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-[#F5A624] text-sm font-semibold tracking-wide text-center mb-4">למה פורשות כנף?</p>
          <h2 className="text-center font-black text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            כי אף אחד לא לימד אותנו<br />איך להרגיש בנוח עם כסף
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'מרחב בטוח', desc: 'קבוצה אינטימית של 12 נשים. בלי שיפוטיות, בלי לחץ — רק למידה מתוך חיבור אמיתי.' },
              { icon: Shield, title: 'ידע מעשי', desc: 'לא תיאוריות מהספרים. כלים פרקטיים שאפשר ליישם מהיום הראשון — תקציב, חיסכון, השקעות.' },
              { icon: Users, title: 'קהילה', desc: 'מפגשים פרונטליים שיוצרים קשרים אמיתיים. נשים שעוברות את אותו מסע — ביחד.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5A624]/10 flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-[#F5A624]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Program tracks */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-[#F5A624] text-sm font-semibold tracking-wide text-center mb-4">המסלולים</p>
          <h2 className="text-center font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            שני מסלולים. בחרי את שלך.
          </h2>
          <p className="text-center text-white/45 text-base mb-12 max-w-lg mx-auto">
            כל מסלול כולל 3 מפגשים פרונטליים, פעם בשבוע, שעתיים. קבוצה אקסקלוסיבית של 12 משתתפות.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Beginners */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/8 bg-white/[0.03]">
                <span className="inline-block bg-[#34D399]/15 text-[#34D399] text-xs font-bold px-3 py-1 rounded-full mb-3">מתחילות</span>
                <h3 className="text-white font-black text-xl mb-2">בסיס פיננסי</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  למי שרוצה להתחיל מאפס — להבין איך כסף עובד, לבנות תקציב ראשון ולהפסיק לפחד ממספרים.
                </p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { week: 'מפגש 1', topic: 'שפת הכסף — מה זה בכלל ואיך מפסיקים לברוח ממנו' },
                  { week: 'מפגש 2', topic: 'תקציב חכם — איך יודעים לאן הכסף הולך ואיך שולטים בו' },
                  { week: 'מפגש 3', topic: 'חיסכון ראשון — מאיפה מתחילים ואיך לא מוותרים' },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#34D399]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#34D399] text-xs font-black">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-bold">{m.week}</p>
                      <p className="text-white/40 text-sm">{m.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced */}
            <div className="rounded-2xl border border-[#F5A624]/25 overflow-hidden" style={{
              boxShadow: '0 0 40px rgba(245,166,36,0.06)',
            }}>
              <div className="p-6 border-b border-[#F5A624]/15 bg-[#F5A624]/[0.04]">
                <span className="inline-block bg-[#F5A624]/15 text-[#F5A624] text-xs font-bold px-3 py-1 rounded-full mb-3">מתקדמות</span>
                <h3 className="text-white font-black text-xl mb-2">צמיחה פיננסית</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  למי שכבר מבינה את הבסיס ורוצה לקחת את זה צעד קדימה — השקעות, פנסיה, ובניית עושר לטווח ארוך.
                </p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { week: 'מפגש 1', topic: 'עולם ההשקעות — מה האפשרויות ואיך לא נופלים בפח' },
                  { week: 'מפגש 2', topic: 'פנסיה וביטוח — מה שחייבים לדעת (ואף אחד לא מסביר)' },
                  { week: 'מפגש 3', topic: 'תוכנית פעולה — בניית אסטרטגיה כלכלית אישית' },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#F5A624] text-xs font-black">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-bold">{m.week}</p>
                      <p className="text-white/40 text-sm">{m.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Format details */}
      <Section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5">
          <p className="text-[#F5A624] text-sm font-semibold tracking-wide text-center mb-4">איך זה עובד</p>
          <h2 className="text-center font-black text-white mb-12" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            הפורמט
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Calendar, value: '3', label: 'מפגשים', sub: 'פעם בשבוע' },
              { icon: Clock, value: '2', label: 'שעות', sub: 'כל מפגש' },
              { icon: Users, value: '12', label: 'משתתפות', sub: 'בכל קבוצה' },
              { icon: Sparkles, value: '100%', label: 'פרונטלי', sub: 'פנים אל פנים' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center p-5 rounded-2xl border border-white/8 bg-white/[0.02]"
              >
                <item.icon size={20} className="text-[#F5A624] mx-auto mb-3" />
                <p className="text-white font-black text-2xl">{item.value}</p>
                <p className="text-white/60 text-sm font-medium">{item.label}</p>
                <p className="text-white/30 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* CTA */}
      <Section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            מוכנה לפרוש כנף?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md mx-auto">
            המקומות מוגבלים ל-12 משתתפות בכל קבוצה.
            <br />השאירי פרטים ונחזור אלייך עם כל המידע.
          </p>

          <a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer"
            className="cta-shine inline-flex items-center gap-2 bg-[#F5A624] text-black font-black text-lg px-10 py-5 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200 mb-6">
            אני רוצה להצטרף
            <ChevronLeft size={20} />
          </a>

          <p className="text-white/30 text-sm">
            או שלחי הודעה ישירה ב<a href={WAITLIST_URL} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">וואטסאפ</a>
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Image src="/logo.png" alt="פורשים כנף" width={24} height={24} className="w-6 h-6 object-contain" />
          <span className="text-white/40 text-sm font-medium">פורשות כנף</span>
        </div>
        <p className="text-white/20 text-xs">מבית פורשים כנף · כל הזכויות שמורות © 2026</p>
      </footer>
    </div>
  )
}
