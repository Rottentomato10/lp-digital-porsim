'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

function ConfirmContent() {
  const params = useSearchParams()
  const status = params.get('status')

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-5" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-6" />

        {status === 'ok' ? (
          <>
            <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={28} className="text-[#10B981]" />
            </div>
            <h1 className="text-white font-bold text-2xl mb-3">מעולה, נרשמת בהצלחה!</h1>
            <p className="text-white/50 text-base mb-2">
              בשבועות הקרובים נשלח לך תכנים קצרים ומעשיים שיעזרו לך להבין כסף יותר טוב.
            </p>
            <p className="text-white/30 text-sm">
              אפשר לבטל בכל עת דרך הלינק בתחתית כל אימייל.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-white font-bold text-2xl mb-3">משהו השתבש</h1>
            <p className="text-white/50 text-base">הלינק לא תקין או שכבר נרשמת.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default function DripConfirm() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <ConfirmContent />
    </Suspense>
  )
}
