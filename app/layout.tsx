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
  title: 'פורשים כנף — קורס פיננסים לצעירים',
  description: 'הידע הפיננסי שלא לימדו אותך בבית הספר. 3 שעות שישנו את הדרך שאתה מתנהל עם כסף.',
  openGraph: {
    title: 'פורשים כנף — קורס פיננסים לצעירים',
    description: 'הידע הפיננסי שלא לימדו אותך בבית הספר.',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-heebo`}>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
