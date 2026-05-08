'use client'

import { useEffect } from 'react'

export default function LightModeInit() {
  useEffect(() => {
    document.documentElement.classList.add('light-mode')
    return () => {
      document.documentElement.classList.remove('light-mode')
    }
  }, [])

  return null
}
