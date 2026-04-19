'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck, Lock, Check, X, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePay = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cardcom', { method: 'POST' })
      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'אירעה שגיאה, נסה שוב')
        setLoading(false)
        return
      }

      setIframeUrl(data.url)
      setLoading(false)
    } catch {
      setError('אירעה שגיאה בתקשורת, נסה שוב')
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIframeUrl(null)
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* CardCom Payment Modal */}
      {iframeUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '95vh' }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-gray-400" />
                <span className="text-gray-500 text-sm">תשלום מאובטח — קארדקום</span>
              </div>
              <button onClick={closeModal}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            {/* Iframe */}
            <iframe
              src={iframeUrl}
              className="w-full border-0"
              style={{ height: 'min(82vh, 700px)' }}
              allow="payment"
            />
          </div>
        </div>
      )}

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

        <div className="grid md:grid-cols-5 gap-8">

          {/* Left: Payment info */}
          <div className="md:col-span-3 order-2 md:order-1">
            <h1 className="text-2xl font-black text-gray-900 mb-2">השלמת רכישה</h1>
            <p className="text-gray-500 text-base mb-8">מיד לאחר התשלום תקבל גישה מיידית לקורס, לאפליקציה ולקהילה — ישירות למייל.</p>

            {/* Pay button */}
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#F5A624] hover:bg-[#e09a1f] disabled:opacity-60 text-black font-black text-xl transition-colors flex items-center justify-center gap-2 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>טוען...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>שלם ₪390 — והתחל ללמוד</span>
                </>
              )}
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 mb-8">
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

            {/* What happens after */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
              <p className="text-green-800 font-bold text-sm mb-2">מה קורה אחרי התשלום?</p>
              <p className="text-green-700 text-sm leading-relaxed">
                תקבל מייל עם לינק גישה אישי תוך דקות.
                <br />תתחיל מהשיעור הראשון — 4 דקות שישנו את הדרך בה אתה מסתכל על הכסף שלך.
              </p>
            </div>

            {/* Guarantee */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldCheck size={18} className="text-amber-600" />
                <p className="text-amber-900 font-bold text-sm">אחריות מלאה — 7 ימים</p>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                לא הרגשת שזה שווה? החזר מלא, בלי שאלות.
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
                  <p className="text-gray-400 text-sm">57 שיעורים · 3 שעות · גישה לכל החיים</p>
                </div>
              </div>

              {/* What's included */}
              <div className="py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">מה כלול</p>
                <div className="space-y-2.5">
                  {[
                    'קורס מלא — א׳ עד ת׳',
                    'אפליקציית ניהול תזרים',
                    'תעודת סיום פורשים כנף',
                    'קהילה פרטית + תמיכה',
                    'עדכונים עתידיים — חינם',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">שווי כולל</span>
                  <span className="text-gray-400 text-sm line-through">₪1,140</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">מחיר השקה</span>
                  <span className="text-green-600 text-sm font-medium">−₪750</span>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold text-lg">סה״כ</span>
                  <span className="text-gray-900 font-black text-2xl">₪390</span>
                </div>
                <p className="text-gray-400 text-xs text-center pt-1">תשלום חד-פעמי · ללא מנוי</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
