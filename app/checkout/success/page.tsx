'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { CheckCircle2, Copy, Check, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const SHARE_TEXT = 'הצטרפתי לנבחרת המנכ״לים של פורשים כנף 🚀 קורס שמלמד איך כסף באמת עובד — ממליץ בחום!'
const SHARE_URL = 'https://digital.porsimkanaf.com/course'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order') || ''
  const [copied, setCopied] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [provisionStatus, setProvisionStatus] = useState<string>('')

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { value: 390, currency: 'ILS', content_name: 'קורס פיננסים לצעירים' })
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', { transaction_id: orderId, value: 390, currency: 'ILS' })
    }
  }, [orderId])

  // Verify payment and provision access (fallback for missing webhook)
  useEffect(() => {
    if (!orderId) return
    const verify = async () => {
      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, marketing_consent: localStorage.getItem('marketing_consent') !== 'false' }),
        })
        const data = await res.json()
        setProvisionStatus(data.status || 'done')
      } catch {
        setProvisionStatus('error')
      }
    }
    verify()
  }, [orderId])

  // Auto-redirect to course after 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = 'https://course.porsimkanaf.com/login'
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyOrder = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'פורשים כנף', text: SHARE_TEXT, url: SHARE_URL })
      } catch {}
    } else {
      setShowShare(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#060A13] flex items-center justify-center px-5 py-10" dir="rtl">
      <div className="max-w-md w-full text-center">
        <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
          className="w-20 h-20 object-contain mx-auto mb-6" />

        <div className="w-16 h-16 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#10B981]" />
        </div>

        <h1 className="text-white font-black text-3xl mb-1">תודה רבה!</h1>
        <p className="text-[#10B981] font-bold text-lg mb-6">התשלום הצליח</p>

        {/* Order number */}
        {orderId && (
          <div className="my-6 p-5 rounded-2xl bg-white/[0.04] border border-[#F5A624]/20">
            <p className="text-white/40 text-sm mb-2">מספר הזמנה</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F5A624] font-mono font-black text-3xl xs:text-4xl tracking-wider">{orderId}</span>
              <button onClick={copyOrder} className="text-white/30 hover:text-white/60 transition-colors">
                {copied ? <Check size={18} className="text-[#10B981]" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-white/25 text-xs mt-2">שמור מספר זה לכל פנייה עתידית</p>
          </div>
        )}

        {/* Auto redirect notice */}
        <div className="p-5 rounded-xl bg-[#F5A624]/[0.06] border border-[#F5A624]/20 mb-6">
          <p className="text-white/70 text-base leading-relaxed mb-3">
            שלחנו לך מייל עם פרטי הכניסה לקורס.
            <br />
            <span className="text-white/40 text-sm">בדוק גם בתיקיית הספאם.</span>
          </p>
          <a href="https://course.porsimkanaf.com/login"
            className="inline-block w-full bg-[#F5A624] text-black font-bold text-base py-3.5 rounded-xl hover:brightness-110 transition-all text-center mb-2">
            כניסה לקורס
          </a>
          <p className="text-white/30 text-xs text-center">
            מועבר אוטומטית תוך {countdown} שניות...
          </p>
        </div>

        {/* What now */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/8 text-right mb-6">
          <p className="text-white/50 text-sm leading-relaxed">
            <span className="text-white font-bold">מה עכשיו?</span>
            <br />היכנס לקורס, התחבר עם האימייל והסיסמה שנשלחו אליך, ותתחיל מהשיעור הראשון — 4 דקות שישנו את הדרך בה אתה מסתכל על הכסף שלך.
          </p>
        </div>

        {/* Share */}
        <div className="p-5 rounded-xl border border-[#F5A624]/15 bg-[#F5A624]/[0.03] mb-6">
          <p className="text-[#F5A624] font-bold text-base mb-3">🎉 אתה חלק מנבחרת המנכ״לים!</p>
          <p className="text-white/40 text-sm mb-4">ספר לחברים שהצטרפת — הם יודו לך אחר כך.</p>

          <button onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 bg-[#F5A624] text-black font-bold text-sm py-3 rounded-xl hover:brightness-110 transition-all mb-3">
            <Share2 size={16} />
            שתף את הרכישה
          </button>

          {/* Fallback share options */}
          {showShare && (
            <div className="flex items-center justify-center gap-3 mt-2">
              <a href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + ' ' + SHARE_URL)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center hover:bg-[#25D366]/25 transition-colors">
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-50">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2]/15 flex items-center justify-center hover:bg-[#1877F2]/25 transition-colors">
                <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(SHARE_TEXT + ' ' + SHARE_URL); }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Copy size={16} className="text-white/40" />
              </button>
            </div>
          )}
        </div>

        {/* WhatsApp support */}
        <a href={`https://wa.me/9720537282727?text=${encodeURIComponent('היי, שילמתי על הקורס, מספר הזמנה: ' + orderId)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#25D366]/20 bg-[#25D366]/[0.06] hover:bg-[#25D366]/[0.12] transition-colors">
          <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-[#25D366] font-bold text-sm">צריך עזרה? דברו איתנו בווטסאפ</span>
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
