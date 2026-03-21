'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { contentC } from '@/lib/content-c'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        visible
          ? 'bg-[#0e0e0e]/95 backdrop-blur-md border-b border-white/8 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        <Image src="/logo.png" alt="פורשים כנף" width={40} height={40} className="w-9 h-9 object-contain" />
        <span className="text-white/40 text-sm hidden sm:block">{contentC.topbar.badge}</span>
        <a
          href="#buy"
          className="bg-[#F5A624] text-black font-bold text-sm px-5 py-2 rounded-full hover:brightness-110 transition-all"
        >
          {contentC.topbar.cta}
        </a>
      </div>
    </header>
  )
}
