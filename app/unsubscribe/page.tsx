'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Image from 'next/image'

function UnsubContent() {
  const params = useSearchParams()
  const email = params.get('email') || ''
  const [done, setDone] = useState(false)

  const handleUnsub = async () => {
    if (!email) return
    await fetch(`/api/drip/unsubscribe?email=${encodeURIComponent(email)}`)
    setDone(true)
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-5" dir="rtl">
        <p className="text-white/50">לינק לא תקין</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-5" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-6" />

        {done ? (
          <>
            <h1 className="text-white font-bold text-2xl mb-3">הוסרת בהצלחה</h1>
            <p className="text-white/50 text-base">לא תקבל/י יותר אימיילים מאיתנו.</p>
            <p className="text-white/30 text-sm mt-4">אם שינית את דעתך — תמיד אפשר לחזור.</p>
          </>
        ) : (
          <>
            <h1 className="text-white font-bold text-2xl mb-3">הסרה מרשימת התפוצה</h1>
            <p className="text-white/50 text-base mb-6">
              בלחיצה על הכפתור תוסר/י מרשימת הדיוור של פורשים כנף.
            </p>
            <p className="text-white/30 text-sm mb-6">{email}</p>
            <button onClick={handleUnsub}
              className="bg-white/10 border border-white/15 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/15 transition-all">
              הסר אותי מהרשימה
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Unsubscribe() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <UnsubContent />
    </Suspense>
  )
}
