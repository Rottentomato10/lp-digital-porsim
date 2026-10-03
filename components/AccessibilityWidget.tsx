// תפריט נגישות — פאנל נשלף מהצד, בהתאם לתקנות נגישות תשע"ג-2013 / ת"י 5568.
// עוצב בהתאם לווידג'ט הנגישות ב-course.porsimkanaf.com (אותו מבנה, מותאם לפלטת הצבעים הכהה של דף הנחיתה).
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Accessibility,
  X,
  Sun,
  Moon,
  Contrast,
  Eye,
  EyeOff,
  Type,
  Link2,
  MousePointer2,
  BookOpen,
  RotateCcw,
  Volume2,
} from 'lucide-react'

const COLORS = {
  bg: '#1a1a2e',
  line: 'rgba(255,255,255,0.14)',
  hover: 'rgba(255,255,255,0.06)',
  gold: '#F5A624',
  goldSoft: 'rgba(245,166,36,0.18)',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.62)',
  textTertiary: 'rgba(255,255,255,0.45)',
  err: '#ef4444',
  errSoft: 'rgba(239,68,68,0.14)',
  shadow: '0 8px 32px rgba(0,0,0,0.45)',
}

interface AccessibilitySettings {
  fontSize: number
  letterSpacing: number
  wordSpacing: number
  lineHeight: number
  highContrast: boolean
  invertedContrast: boolean
  grayscale: boolean
  blackAndWhite: boolean
  highlightLinks: boolean
  highlightHeadings: boolean
  readableFont: boolean
  hideImages: boolean
  stopAnimations: boolean
  largeCursor: boolean
  brightCursor: boolean
  readingGuide: boolean
  screenReaderMode: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  letterSpacing: 0,
  wordSpacing: 0,
  lineHeight: 100,
  highContrast: false,
  invertedContrast: false,
  grayscale: false,
  blackAndWhite: false,
  highlightLinks: false,
  highlightHeadings: false,
  readableFont: false,
  hideImages: false,
  stopAnimations: false,
  largeCursor: false,
  brightCursor: false,
  readingGuide: false,
  screenReaderMode: false,
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [readingGuideY, setReadingGuideY] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('pk-lp-accessibility-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings({ ...defaultSettings, ...parsed })
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.style.zoom = settings.fontSize !== 100 ? `${settings.fontSize / 100}` : ''
    }
    body.style.letterSpacing = settings.letterSpacing ? `${settings.letterSpacing}px` : ''
    body.style.wordSpacing = settings.wordSpacing ? `${settings.wordSpacing}px` : ''
    body.style.lineHeight = settings.lineHeight !== 100 ? `${(settings.lineHeight * 1.5) / 100}` : ''

    root.classList.toggle('a11y-high-contrast', settings.highContrast)
    root.classList.toggle('a11y-inverted', settings.invertedContrast)
    root.classList.toggle('a11y-grayscale', settings.grayscale)
    root.classList.toggle('a11y-black-white', settings.blackAndWhite)
    body.classList.toggle('a11y-highlight-links', settings.highlightLinks)
    body.classList.toggle('a11y-highlight-headings', settings.highlightHeadings)
    body.classList.toggle('a11y-readable-font', settings.readableFont)
    body.classList.toggle('a11y-hide-images', settings.hideImages)
    body.classList.toggle('a11y-stop-animations', settings.stopAnimations)
    body.classList.toggle('a11y-large-cursor', settings.largeCursor)
    body.classList.toggle('a11y-bright-cursor', settings.brightCursor)
    body.classList.toggle('a11y-screen-reader', settings.screenReaderMode)

    localStorage.setItem('pk-lp-accessibility-settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    const body = document.body
    body.style.transition = 'margin 0.25s ease'
    body.style.marginRight = isOpen && window.innerWidth > 768 ? '280px' : ''
    return () => {
      body.style.marginRight = ''
      body.style.transition = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!settings.readingGuide) return
    const handleMouseMove = (e: MouseEvent) => setReadingGuideY(e.clientY)
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [settings.readingGuide])

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const resetAll = useCallback(() => {
    setSettings(defaultSettings)
    localStorage.removeItem('pk-lp-accessibility-settings')
    const mainContent = document.getElementById('main-content')
    if (mainContent) mainContent.style.zoom = ''
  }, [])

  const toggleContrast = (mode: 'high' | 'inverted' | 'grayscale' | 'blackWhite') => {
    setSettings((prev) => ({
      ...prev,
      highContrast: mode === 'high' ? !prev.highContrast : false,
      invertedContrast: mode === 'inverted' ? !prev.invertedContrast : false,
      grayscale: mode === 'grayscale' ? !prev.grayscale : false,
      blackAndWhite: mode === 'blackWhite' ? !prev.blackAndWhite : false,
    }))
  }

  const toggleCursor = (mode: 'large' | 'bright') => {
    setSettings((prev) => ({
      ...prev,
      largeCursor: mode === 'large' ? !prev.largeCursor : false,
      brightCursor: mode === 'bright' ? !prev.brightCursor : false,
    }))
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="פתח תפריט נגישות"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '12px',
          zIndex: 998,
          width: '44px',
          height: '44px',
          background: COLORS.bg,
          border: `1px solid ${COLORS.line}`,
          borderRadius: '50%',
          color: COLORS.gold,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: COLORS.shadow,
          transition: 'all 0.2s',
        }}
      >
        <Accessibility size={22} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '280px',
            maxWidth: '85vw',
            height: '100vh',
            background: COLORS.bg,
            borderLeft: `1px solid ${COLORS.line}`,
            zIndex: 9999,
            overflowY: 'auto',
            boxShadow: COLORS.shadow,
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: `1px solid ${COLORS.line}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: COLORS.bg,
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Accessibility size={22} style={{ color: COLORS.gold }} />
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: COLORS.text }}>הגדרות נגישות</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="סגור תפריט נגישות"
              style={{
                background: COLORS.line,
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                color: COLORS.text,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ padding: '16px 20px' }}>
            <button
              onClick={resetAll}
              style={{
                width: '100%',
                padding: '12px',
                background: COLORS.errSoft,
                border: `1px solid ${COLORS.errSoft}`,
                borderRadius: '10px',
                color: COLORS.err,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                fontWeight: 500,
                marginBottom: '20px',
              }}
            >
              <RotateCcw size={16} />
              איפוס הגדרות
            </button>

            <SectionTitle icon={<Contrast size={18} />} title="תצוגה וניגודיות" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              <ToggleButton active={settings.highContrast} onClick={() => toggleContrast('high')} icon={<Sun size={18} />} label="ניגודיות גבוהה" />
              <ToggleButton active={settings.invertedContrast} onClick={() => toggleContrast('inverted')} icon={<Moon size={18} />} label="ניגודיות הפוכה" />
              <ToggleButton active={settings.grayscale} onClick={() => toggleContrast('grayscale')} icon={<Eye size={18} />} label="גווני אפור" />
              <ToggleButton active={settings.blackAndWhite} onClick={() => toggleContrast('blackWhite')} icon={<Contrast size={18} />} label="שחור לבן" />
            </div>

            <SectionTitle icon={<Type size={18} />} title="טקסט וקריאות" />
            <SliderControl label="גודל טקסט" value={settings.fontSize} min={80} max={150} step={5} unit="%" onChange={(v) => updateSetting('fontSize', v)} />
            <SliderControl label="ריווח בין אותיות" value={settings.letterSpacing} min={0} max={10} step={1} unit="px" onChange={(v) => updateSetting('letterSpacing', v)} />
            <SliderControl label="ריווח בין מילים" value={settings.wordSpacing} min={0} max={20} step={2} unit="px" onChange={(v) => updateSetting('wordSpacing', v)} />
            <SliderControl label="גובה שורה" value={settings.lineHeight} min={100} max={200} step={10} unit="%" onChange={(v) => updateSetting('lineHeight', v)} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              <ToggleButton active={settings.readableFont} onClick={() => updateSetting('readableFont', !settings.readableFont)} icon={<Type size={18} />} label="גופן קריא" />
              <ToggleButton active={settings.highlightLinks} onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)} icon={<Link2 size={18} />} label="הדגשת קישורים" />
              <ToggleButton active={settings.highlightHeadings} onClick={() => updateSetting('highlightHeadings', !settings.highlightHeadings)} icon={<Type size={18} />} label="הדגשת כותרות" />
              <ToggleButton active={settings.stopAnimations} onClick={() => updateSetting('stopAnimations', !settings.stopAnimations)} icon={<EyeOff size={18} />} label="ביטול אנימציות" />
            </div>

            <SectionTitle icon={<MousePointer2 size={18} />} title="ניווט וסמן" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              <ToggleButton active={settings.largeCursor} onClick={() => toggleCursor('large')} icon={<MousePointer2 size={18} />} label="סמן גדול" />
              <ToggleButton active={settings.brightCursor} onClick={() => toggleCursor('bright')} icon={<MousePointer2 size={18} />} label="סמן גדול בהיר" />
              <ToggleButton active={settings.readingGuide} onClick={() => updateSetting('readingGuide', !settings.readingGuide)} icon={<BookOpen size={18} />} label="מדריך קריאה" />
              <ToggleButton active={settings.hideImages} onClick={() => updateSetting('hideImages', !settings.hideImages)} icon={<EyeOff size={18} />} label="הסתרת תמונות" />
            </div>

            <SectionTitle icon={<Volume2 size={18} />} title="קוראי מסך" />
            <ToggleButton active={settings.screenReaderMode} onClick={() => updateSetting('screenReaderMode', !settings.screenReaderMode)} icon={<Volume2 size={18} />} label="התאמה לקוראי מסך" fullWidth />

            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                background: COLORS.hover,
                borderRadius: '10px',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: COLORS.textTertiary,
              }}
            >
              <span>פורשים כנף © {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      )}

      {settings.readingGuide && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: readingGuideY - 4,
            height: '8px',
            background: COLORS.goldSoft,
            boxShadow: `0 0 0 2px ${COLORS.goldSoft}`,
            pointerEvents: 'none',
            zIndex: 9997,
          }}
        />
      )}
    </>
  )
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: COLORS.gold, fontSize: '0.85rem', fontWeight: 600 }}>
      {icon}
      {title}
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
  fullWidth,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  fullWidth?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '12px 10px',
        background: active ? COLORS.goldSoft : COLORS.hover,
        border: `1px solid ${active ? COLORS.gold : COLORS.line}`,
        borderRadius: '10px',
        color: active ? COLORS.gold : COLORS.textSecondary,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.75rem',
        fontWeight: 500,
        transition: 'all 0.2s',
        gridColumn: fullWidth ? '1 / -1' : undefined,
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.85rem' }}>
        <span style={{ color: COLORS.textSecondary }}>{label}</span>
        <span style={{ color: COLORS.gold, fontWeight: 600 }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          background: `linear-gradient(to left, ${COLORS.gold} ${((value - min) / (max - min)) * 100}%, ${COLORS.line} 0%)`,
          appearance: 'none',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
