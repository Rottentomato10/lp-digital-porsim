import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060A13] flex items-center justify-center px-5" dir="rtl"
      style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="max-w-md w-full text-center">

        <Image src="/logo.png" alt="פורשים כנף" width={80} height={80}
          className="w-20 h-20 object-contain mx-auto mb-8 opacity-60" />

        <h1 className="text-white font-black text-6xl mb-4">404</h1>

        <p className="text-white/50 text-xl leading-relaxed mb-3">
          אופס, כנראה שיש כאן איזשהי שגיאה.
        </p>
        <p className="text-white/30 text-base leading-relaxed mb-10">
          העמוד שחיפשת לא נמצא — אבל אל דאגה, אנחנו כאן.
        </p>

        <div className="flex flex-col gap-3">
          <a href="https://www.porsimkanaf.com/start"
            className="inline-flex items-center justify-center bg-[#F5A624] text-black font-black text-lg px-8 py-4 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all duration-200">
            קחו אותי לדף הנכון
          </a>

          <a href="/"
            className="text-white/30 text-sm hover:text-white/50 transition-colors">
            או חזרה לדף הראשי
          </a>
        </div>

        <p className="text-white/10 text-xs mt-12">
          שאלות? <a href="https://wa.me/9720537282727?text=היי, הגעתי לעמוד שלא קיים"
            target="_blank" rel="noopener noreferrer"
            className="text-[#25D366]/40 hover:text-[#25D366]">ווטסאפ</a>
        </p>

      </div>
    </div>
  )
}
