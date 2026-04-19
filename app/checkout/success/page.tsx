'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { CheckCircle2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order') || ''
  const [copied, setCopied] = useState(false)

  const copyOrder = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#060A13] flex items-center justify-center px-5" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
          className="w-20 h-20 object-contain mx-auto mb-6" />

        <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#10B981]" />
        </div>

        <h1 className="text-white font-black text-3xl mb-3">התשלום הצליח!</h1>

        {/* Order number — big and prominent */}
        {orderId && (
          <div className="my-6 p-5 rounded-2xl bg-white/[0.04] border border-[#F5A624]/20">
            <p className="text-white/40 text-sm mb-2">מספר הזמנה</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F5A624] font-mono font-black text-4xl tracking-wider">{orderId}</span>
              <button onClick={copyOrder} className="text-white/30 hover:text-white/60 transition-colors">
                {copied ? <Check size={18} className="text-[#10B981]" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-white/25 text-xs mt-2">שמור מספר זה לכל פנייה עתידית</p>
          </div>
        )}

        <p className="text-white/60 text-lg leading-relaxed mb-2">
          תוך מספר דקות תקבל מייל עם לינק גישה אישי לקורס.
        </p>
        <p className="text-white/40 text-base leading-relaxed mb-8">
          בדוק גם בתיקיית הספאם למקרה הצורך.
        </p>

        <div className="p-5 rounded-xl bg-white/5 border border-white/8 text-right mb-8">
          <p className="text-white/50 text-sm leading-relaxed">
            <span className="text-white font-bold">מה עכשיו?</span>
            <br />תפתח את המייל, תלחץ על הלינק, ותתחיל מהשיעור הראשון — 4 דקות שישנו את הדרך בה אתה מסתכל על הכסף שלך.
          </p>
        </div>

        <a href="https://wa.me/9720537282727?text=היי, שילמתי על הקורס, מספר הזמנה: ${orderId}"
          target="_blank" rel="noopener noreferrer"
          className="text-[#25D366] text-sm hover:underline">
          צריך עזרה? דברו איתנו בווטסאפ
        </a>
      </div>
    </div>
  )
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060A13] flex items-center justify-center">
        <div className="text-white/30">טוען...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
