import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew'],
  variable: '--font-heebo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'פורשים כנף — דיגיטלי',
  description: 'הידע הפיננסי שלא לימדו אותך בבית הספר. 3 שעות שישנו את הדרך שאתה מתנהל עם כסף.',
  openGraph: {
    title: 'פורשים כנף — דיגיטלי',
    description: 'הידע הפיננסי שלא לימדו אותך בבית הספר.',
    locale: 'he_IL',
    type: 'website',
  },
}

// ← החלף GTM-XXXXXXX ב-ID האמיתי שלך מ-Google Tag Manager
const GTM_ID = 'GTM-XXXXXXX'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Google Tag Manager — replace GTM_ID before launch */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}} />
      </head>
      <body className={`${heebo.variable} font-heebo`}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
