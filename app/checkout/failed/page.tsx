'use client'

import Image from 'next/image'
import { XCircle } from 'lucide-react'

export default function CheckoutFailed() {
  return (
    <div className="min-h-screen bg-[#060A13] flex items-center justify-center px-5" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
          className="w-20 h-20 object-contain mx-auto mb-6" />

        <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} className="text-red-400" />
        </div>

        <h1 className="text-white font-black text-3xl mb-3">התשלום לא הושלם</h1>
        <p className="text-white/60 text-lg leading-relaxed mb-8">
          משהו לא עבד. לא נגבה ממך כסף.
          <br />אפשר לנסות שוב או לפנות אלינו.
        </p>

        <div className="flex flex-col gap-3">
          <a href="/checkout"
            className="inline-flex items-center justify-center bg-[#F5A624] text-black font-black text-lg px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            נסה שוב
          </a>
          <a href="https://wa.me/9720537282727?text=היי, ניסיתי לשלם על הקורס ונתקלתי בבעיה"
            target="_blank" rel="noopener noreferrer"
            className="text-[#25D366] text-sm hover:underline">
            דברו איתנו בווטסאפ
          </a>
        </div>
      </div>
    </div>
  )
}
