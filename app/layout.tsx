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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QFNH2ML23S" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QFNH2ML23S');
        `}} />
        {/* Microsoft Clarity */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w1gn6mbhva");
        `}} />
      </head>
      <body className={`${heebo.variable} font-heebo`}>
<div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
