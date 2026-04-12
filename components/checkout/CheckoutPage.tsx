'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck, Lock, Check, CreditCard, ChevronLeft } from 'lucide-react'

// ← הכנס כאן את הלינק של הספק שלך
const PROVIDER_CHECKOUT_URL = '#provider-checkout'

const INCLUDED = [
  'קורס פיננסים לצעירים — א׳ עד ת׳',
  'אפליקציית ניהול תזרים אישי',
  'תעודת סיום פורשים כנף',
  'גישה לקהילה הפרטית',
  'עדכונים עתידיים ללא תוספת עלות',
]

export default function CheckoutPage() {
  const [payMethod, setPayMethod] = useState<'card' | 'apple' | 'google'>('card')

  const handlePay = () => {
    window.location.href = PROVIDER_CHECKOUT_URL
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="פורשים כנף" width={36} height={36} className="w-9 h-9 object-contain" />
            <span className="font-bold text-gray-900">פורשים כנף</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Lock size={14} />
            <span>חיבור מאובטח</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Back link */}
        <a href="/n5" className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-8 transition-colors">
          <ChevronLeft size={16} />
          <span>חזרה לדף הקורס</span>
        </a>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Left: Payment */}
          <div className="md:col-span-3 order-2 md:order-1">
            <h1 className="text-2xl font-black text-gray-900 mb-6">השלמת רכישה</h1>

            {/* Payment methods */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

              {/* Method tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setPayMethod('card')}
                  className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${payMethod === 'card' ? 'text-gray-900 border-b-2 border-[#F5A624]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard size={18} />
                    <span>כרטיס אשראי</span>
                  </div>
                </button>
                <button
                  onClick={() => setPayMethod('apple')}
                  className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${payMethod === 'apple' ? 'text-gray-900 border-b-2 border-[#F5A624]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    <span>Apple Pay</span>
                  </div>
                </button>
                <button
                  onClick={() => setPayMethod('google')}
                  className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${payMethod === 'google' ? 'text-gray-900 border-b-2 border-[#F5A624]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <span>Google Pay</span>
                  </div>
                </button>
              </div>

              <div className="p-6">
                {payMethod === 'card' && (
                  <div className="space-y-4">
                    {/* Card number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">מספר כרטיס</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          dir="ltr"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] focus:ring-2 focus:ring-[#F5A624]/20 transition-all"
                          readOnly
                          onClick={handlePay}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                          <svg viewBox="0 0 48 32" className="h-5"><rect width="48" height="32" rx="4" fill="#1A1F71"/><path d="M19 22l3-14h4l-3 14h-4zm16-14l-4 9.5-.5-2.3-1.5-7.2h-4l6 14h4l6-14h-4zm-21 0l-5 14h4l.7-2h5l.4 2h4l-4-14h-5zm1.5 9l2-5.5 1 5.5h-3z" fill="white"/></svg>
                          <svg viewBox="0 0 48 32" className="h-5"><rect width="48" height="32" rx="4" fill="#252525"/><circle cx="19" cy="16" r="8" fill="#EB001B"/><circle cx="29" cy="16" r="8" fill="#F79E1B"/><path d="M24 10a8 8 0 010 12 8 8 0 010-12z" fill="#FF5F00"/></svg>
                        </div>
                      </div>
                    </div>

                    {/* Expiry + CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">תוקף</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          dir="ltr"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] focus:ring-2 focus:ring-[#F5A624]/20 transition-all"
                          readOnly
                          onClick={handlePay}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          dir="ltr"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] focus:ring-2 focus:ring-[#F5A624]/20 transition-all"
                          readOnly
                          onClick={handlePay}
                        />
                      </div>
                    </div>

                    {/* Cardholder */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">שם בעל הכרטיס</label>
                      <input
                        type="text"
                        placeholder="ישראל ישראלי"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] focus:ring-2 focus:ring-[#F5A624]/20 transition-all"
                        readOnly
                        onClick={handlePay}
                      />
                    </div>

                    {/* ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">תעודת זהות</label>
                      <input
                        type="text"
                        placeholder="000000000"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-base placeholder:text-gray-300 focus:outline-none focus:border-[#F5A624] focus:ring-2 focus:ring-[#F5A624]/20 transition-all"
                        readOnly
                        onClick={handlePay}
                      />
                    </div>
                  </div>
                )}

                {payMethod === 'apple' && (
                  <div className="text-center py-6">
                    <button
                      onClick={handlePay}
                      className="w-full py-4 rounded-xl bg-black text-white font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                      שלם עם Apple Pay
                    </button>
                  </div>
                )}

                {payMethod === 'google' && (
                  <div className="text-center py-6">
                    <button
                      onClick={handlePay}
                      className="w-full py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      שלם עם Google Pay
                    </button>
                  </div>
                )}

                {/* Pay button (card) */}
                {payMethod === 'card' && (
                  <button
                    onClick={handlePay}
                    className="w-full mt-6 py-4 rounded-xl bg-[#F5A624] hover:bg-[#e09a1f] text-black font-black text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock size={16} />
                    שלם ₪390
                  </button>
                )}

                {/* Security badges */}
                <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <ShieldCheck size={14} />
                    <span>SSL מאובטח</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Lock size={14} />
                    <span>הצפנה 256-bit</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <ShieldCheck size={14} />
                    <span>PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mt-6 p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck size={20} className="text-[#F5A624]" />
                <p className="text-gray-900 font-bold">אחריות מלאה — 7 ימים</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                אם לא הרגשת שזה שווה את זה תוך 7 ימים — תקבל החזר מלא. בלי שאלות. בלי אותיות קטנות.
              </p>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:sticky md:top-8">

              <h2 className="text-lg font-bold text-gray-900 mb-4">סיכום הזמנה</h2>

              <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0">
                  <Image src="/logo.png" alt="פורשים כנף" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">קורס פיננסים לצעירים</p>
                  <p className="text-gray-400 text-sm">גישה לכל החיים · 57 שיעורים</p>
                </div>
              </div>

              {/* What's included */}
              <div className="py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">מה כלול</p>
                <div className="space-y-2.5">
                  {INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-[#F5A624] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">מחיר מקורי</span>
                  <span className="text-gray-400 text-sm line-through">₪490</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">הנחת השקה</span>
                  <span className="text-green-600 text-sm font-medium">-₪100</span>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold text-lg">סה״כ</span>
                  <span className="text-gray-900 font-black text-2xl">₪390</span>
                </div>
                <p className="text-gray-400 text-xs text-center">תשלום חד-פעמי · ללא מנוי · ללא חיובים נוספים</p>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs leading-relaxed">
                הנתונים שלך מוגנים ומועברים באופן מאובטח.
                <br />אנחנו לא שומרים פרטי כרטיס אשראי.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
