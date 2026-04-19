'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShieldCheck, Lock, Check, X, Loader2, ArrowRight, Sparkles } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-[#080B16] to-[#0D1117]" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>

      {/* CardCom Payment — full screen on mobile, large modal on desktop */}
      {iframeUrl && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-6"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="relative w-full md:max-w-2xl bg-white md:rounded-2xl overflow-hidden shadow-2xl
            h-[100dvh] md:h-auto md:max-h-[92vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Lock size={13} className="text-green-500" />
                <span className="text-gray-500 text-sm">תשלום מאובטח</span>
              </div>
              <button onClick={closeModal}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            {/* Iframe — takes all remaining height */}
            <iframe
              src={iframeUrl}
              className="w-full border-0"
              style={{ height: 'calc(100dvh - 52px)', minHeight: '500px' }}
              allow="payment"
            />
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="פורשים כנף" width={36} height={36} className="w-8 h-8 object-contain" />
            <span className="font-bold text-white/80 text-sm">פורשים כנף</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Lock size={12} />
            <span>חיבור מאובטח</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F5A624]/10 border border-[#F5A624]/20 rounded-full px-4 py-1.5 mb-5">
            <Sparkles size={14} className="text-[#F5A624]" />
            <span className="text-[#F5A624] text-sm font-semibold">מיד לאחר התשלום — גישה מיידית</span>
          </div>
          <h1 className="font-black text-white text-3xl md:text-4xl mb-3">השלמת רכישה</h1>
          <p className="text-white/40 text-base max-w-md mx-auto">
            תקבל מייל עם לינק גישה אישי תוך דקות. תתחיל מהשיעור הראשון — 4 דקות שישנו הכל.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Main column */}
          <div className="md:col-span-3 order-2 md:order-1">

            {/* Pay button — big and bold */}
            <div className="mb-8">
              <button
                onClick={handlePay}
                disabled={loading}
                className="cta-shine w-full py-5 rounded-2xl bg-[#F5A624] hover:brightness-110 disabled:opacity-60 text-black font-black text-xl transition-all flex items-center justify-center gap-3 mb-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>פותח טופס תשלום...</span>
                  </>
                ) : (
                  <>
                    <span>שלם ₪390 — והתחל ללמוד</span>
                    <ArrowRight size={20} className="rotate-180" />
                  </>
                )}
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center mb-3">{error}</p>
              )}

              {/* Security badges */}
              <div className="flex items-center justify-center gap-5">
                {[
                  { icon: ShieldCheck, label: 'SSL מאובטח' },
                  { icon: Lock, label: 'הצפנה 256-bit' },
                  { icon: ShieldCheck, label: 'PCI DSS' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1 text-white/20 text-[11px]">
                    <b.icon size={11} />
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What happens after */}
            <div className="rounded-2xl p-5 mb-5 border border-[#10B981]/15"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 100%)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#10B981]/15 flex items-center justify-center">
                  <Check size={14} className="text-[#10B981]" />
                </div>
                <p className="text-[#10B981] font-bold text-sm">מה קורה אחרי התשלום?</p>
              </div>
              <div className="space-y-2 mr-9">
                {[
                  'מייל עם לינק גישה אישי — תוך דקות',
                  'גישה מיידית לכל 57 השיעורים',
                  'גישה לאפליקציה ולקהילה הפרטית',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#10B981]/40" />
                    <span className="text-white/40 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="rounded-2xl p-5 border border-[#F5A624]/10 bg-[#F5A624]/[0.03]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-[#F5A624]" />
                <p className="text-[#F5A624] font-bold text-sm">אחריות מלאה — 7 ימים</p>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mr-6">
                לא הרגשת שזה שווה? החזר מלא, בלי שאלות. אנחנו כאן בשביל התוצאות שלך.
              </p>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="md:col-span-2 order-1 md:order-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-6 md:sticky md:top-8">

              <h2 className="text-white font-bold text-base mb-4">סיכום הזמנה</h2>

              <div className="flex items-start gap-3 pb-4 border-b border-white/6">
                <div className="w-12 h-12 rounded-xl bg-[#F5A624]/10 flex items-center justify-center flex-shrink-0">
                  <Image src="/logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">קורס פיננסים לצעירים</p>
                  <p className="text-white/30 text-xs">57 שיעורים · 3 שעות · לכל החיים</p>
                </div>
              </div>

              {/* What's included */}
              <div className="py-4 border-b border-white/6">
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-wider mb-3">מה כלול</p>
                <div className="space-y-2">
                  {[
                    'קורס מלא — א׳ עד ת׳',
                    'אפליקציית ניהול תזרים',
                    'תעודת סיום',
                    'קהילה פרטית + תמיכה',
                    'עדכונים עתידיים — חינם',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={12} className="text-[#10B981] flex-shrink-0" />
                      <span className="text-white/45 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-white/25 text-xs">שווי כולל</span>
                  <span className="text-white/25 text-xs line-through">₪1,140</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/25 text-xs">הנחה</span>
                  <span className="text-[#10B981] text-xs font-medium">−₪750</span>
                </div>
                <div className="h-px bg-white/6 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">סה״כ</span>
                  <span className="text-[#F5A624] font-black text-2xl">₪390</span>
                </div>
                <p className="text-white/15 text-[10px] text-center pt-1">תשלום חד-פעמי · ללא מנוי · ללא חיובים נוספים</p>
              </div>
            </div>

            {/* WhatsApp */}
            <p className="text-center text-white/15 text-xs mt-4">
              שאלות? <a href="https://wa.me/9720537282727?text=היי, יש לי שאלה לגבי הקורס"
                target="_blank" rel="noopener noreferrer"
                className="text-[#25D366]/50 hover:text-[#25D366]">ווטסאפ</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
