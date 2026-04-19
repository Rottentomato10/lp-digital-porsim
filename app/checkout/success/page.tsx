'use client'

import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#060A13] flex items-center justify-center px-5" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
          className="w-20 h-20 object-contain mx-auto mb-6" />

        <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#10B981]" />
        </div>

        <h1 className="text-white font-black text-3xl mb-3">התשלום הצליח!</h1>
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

        <a href="https://wa.me/9720537282727?text=היי, שילמתי על הקורס ויש לי שאלה"
          target="_blank" rel="noopener noreferrer"
          className="text-[#25D366] text-sm hover:underline">
          צריך עזרה? דברו איתנו בווטסאפ
        </a>
      </div>
    </div>
  )
}
