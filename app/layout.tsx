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
  title: 'פורשים כנף — להבין כסף באמת',
  description: 'להבין כסף באמת — במקום להמשיך לנחש. 3 שעות שישנו את הדרך שאתה מתנהל עם כסף. 15,000+ תלמידים. 300+ כיתות.',
  openGraph: {
    title: 'פורשים כנף — להבין כסף באמת',
    description: 'להבין כסף באמת — במקום להמשיך לנחש. קורס פיננסים מעשי לצעירים.',
    locale: 'he_IL',
    type: 'website',
    siteName: 'פורשים כנף',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'פורשים כנף — להבין כסף באמת',
    description: 'קורס פיננסים מעשי לצעירים. 3 שעות. 57 שיעורים. גישה לכל החיים.',
  },
  keywords: ['קורס פיננסים', 'חינוך פיננסי', 'השקעות', 'ניהול כסף', 'פורשים כנף', 'קורס דיגיטלי'],
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3JL82KJZXN" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3JL82KJZXN');
        `}} />
        {/* Facebook Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1075380986890693');
          fbq('track', 'PageView');
        `}} />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1075380986890693&ev=PageView&noscript=1" />
        </noscript>
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
