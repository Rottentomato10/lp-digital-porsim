'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

/* ════════════════════════════════════════════════════════════════
   ROI STORY — CINEMATIC CANVAS ANIMATION v2 (30s, 60fps)
   Class-based architecture, parallax, particles, organic motion
   ════════════════════════════════════════════════════════════════ */

const DURATION = 30
const W = 1920
const H = 1080
const GROUND_Y = 780

/* ─── palette ─── */
const P = {
  bg1: '#070b15', bg2: '#111828', sky1: '#0a1025', sky2: '#162040',
  ground: '#1a2744', groundLight: '#2a3e66', groundDark: '#0d1525',
  road: '#151f35', roadLine: '#2a3a5a',
  skin: '#f0c4a0', skinLight: '#fad5b8', skinShadow: '#c9956a',
  hair: '#2c1b0e', hairLight: '#3d2a18',
  shirt: '#4a8fe7', shirtLight: '#6aafff', shirtShadow: '#2e5fa0',
  pants: '#2d3a4e', pantsShadow: '#1c2636',
  shoes: '#1a1a2e', shoesLight: '#2a2a42',
  bill: '#6bc86b', billDark: '#3a8a3a', billLight: '#a0f0a0',
  backpack: '#e07030', backpackDark: '#b05020', backpackStrap: '#c06028',
  pitDark: '#020204', pitRim: '#4a3015', pitInner: '#0a0508',
  orange: '#F5A624', orangeGlow: 'rgba(245,166,36,0.25)',
  red: '#e04040', redDark: '#b02020',
  monster: '#8e44ad', monsterLight: '#b060d8', monsterDark: '#5c1f7a',
  monsterTeeth: '#f0e0c0',
  cream: '#E5D4B0', white: '#ffffff',
  textBg: 'rgba(0,0,0,0.7)', textBorder: 'rgba(245,166,36,0.25)',
  windowFrame: '#8b7355', windowGlass: 'rgba(120,200,255,0.12)',
  lock: '#c0c0c0', lockDark: '#888',
  cloud: 'rgba(255,255,255,0.8)', cloudShadow: 'rgba(200,210,230,0.5)',
  lampPost: '#3a4a5a', lampGlow: 'rgba(255,220,150,0.15)',
  bush: '#1a4a2a', bushLight: '#2a6a3a',
}

/* ─── math ─── */
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeOut(t: number) { return 1 - (1 - t) * (1 - t) }
function easeIn(t: number) { return t * t }
function lerp(a: number, b: number, t: number) { return a + (b - a) * clamp01(t) }
function clamp01(t: number) { return Math.max(0, Math.min(1, t)) }
function sceneT(time: number, start: number, end: number) { return clamp01((time - start) / (end - start)) }

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
}

/* ═══════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════ */
interface Particle {
  x: number; y: number; vx: number; vy: number
  life: number; maxLife: number; size: number
  color: string; alpha: number
}

class ParticleSystem {
  particles: Particle[] = []

  emit(x: number, y: number, count: number, color: string, spread: number, speed: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const v = speed * (0.5 + Math.random() * 0.5)
      this.particles.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v - 0.5,
        life: 1, maxLife: 0.8 + Math.random() * 0.8,
        size: 2 + Math.random() * 4,
        color, alpha: 1,
      })
    }
  }

  emitDirectional(x: number, y: number, count: number, color: string, dirX: number, dirY: number, spread: number) {
    for (let i = 0; i < count; i++) {
      const angle = Math.atan2(dirY, dirX) + (Math.random() - 0.5) * spread
      const v = 1.5 + Math.random() * 3
      this.particles.push({
        x, y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        life: 1, maxLife: 0.6 + Math.random() * 0.6,
        size: 1.5 + Math.random() * 3,
        color, alpha: 0.8,
      })
    }
  }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx; p.y += p.vy
      p.vy += 0.03
      p.life -= dt / p.maxLife
      p.alpha = Math.max(0, p.life)
      p.size *= 0.995
      if (p.life <= 0) this.particles.splice(i, 1)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      ctx.globalAlpha = p.alpha * 0.7
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }
}

/* ═══════════════════════════════════════
   ROI CHARACTER CLASS
   ═══════════════════════════════════════ */
class Roi {
  x = 0; y = 0; scale = 1.3
  walkCycle = 0; walking = false
  moodValue = 0          // 0 = happy, 0.5 = neutral, 1 = sad
  billCount = 5
  floating = false        // cloud scene
  floatOffset = 0
  squashStretch = 1       // 1 = normal
  prevY = 0               // for secondary motion lag
  hairLag = 0; billLag = 0

  update(dt: number, time: number) {
    if (this.walking) {
      this.walkCycle = (time * 2.5) % 1
    }
    // Squash & stretch from walk
    if (this.walking) {
      const footContact = Math.abs(Math.sin(this.walkCycle * Math.PI * 2))
      this.squashStretch = lerp(0.96, 1.04, footContact)
    } else {
      this.squashStretch = lerp(this.squashStretch, 1, 0.1)
    }
    // Float
    if (this.floating) {
      this.floatOffset = Math.sin(time * 1.5) * 12
    } else {
      this.floatOffset = lerp(this.floatOffset, 0, 0.05)
    }
    // Secondary motion (hair & bills lag behind body)
    const bodyVelocity = this.y - this.prevY
    this.hairLag = lerp(this.hairLag, -bodyVelocity * 3, 0.08)
    this.billLag = lerp(this.billLag, -bodyVelocity * 5, 0.06)
    this.prevY = this.y
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y + this.floatOffset)
    ctx.scale(this.scale, this.scale)

    // Apply squash & stretch
    ctx.scale(2 - this.squashStretch, this.squashStretch)

    const legSwing = this.walking ? Math.sin(this.walkCycle * Math.PI * 2) * 20 : 0
    const armSwing = this.walking ? Math.sin(this.walkCycle * Math.PI * 2) * 15 : 0
    const bodyBob = this.walking ? Math.abs(Math.sin(this.walkCycle * Math.PI * 2)) * 4 : 0
    const moodV = this.moodValue

    ctx.translate(0, -bodyBob)

    // ── Shadow ──
    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.beginPath()
    ctx.ellipse(0, 97 + bodyBob, 38 * this.squashStretch, 9, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // ── Back Leg ──
    this._drawLeg(ctx, -6, 52, -legSwing, true)

    // ── Backpack ──
    this._drawBackpack(ctx, armSwing)

    // ── Back Arm ──
    this._drawArm(ctx, -22, 14, armSwing, false, 0)

    // ── Body / Torso ──
    this._drawTorso(ctx)

    // ── Front Leg ──
    this._drawLeg(ctx, 6, 52, legSwing, false)

    // ── Front Arm (holding bills) ──
    this._drawArmWithBills(ctx, 22, 14, -armSwing * 0.3)

    // ── Head ──
    this._drawHead(ctx, moodV, bodyBob)

    ctx.restore()
  }

  _drawLeg(ctx: CanvasRenderingContext2D, x: number, y: number, swing: number, isShadow: boolean) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((swing * Math.PI) / 180)

    // Thigh
    const thighGrad = ctx.createLinearGradient(-10, 0, 10, 0)
    thighGrad.addColorStop(0, isShadow ? P.pantsShadow : P.pants)
    thighGrad.addColorStop(1, P.pants)
    roundRect(ctx, -10, 0, 20, 30, 6)
    ctx.fillStyle = thighGrad
    ctx.fill()

    // Shin
    roundRect(ctx, -9, 27, 18, 26, 5)
    ctx.fillStyle = isShadow ? P.pantsShadow : P.pants
    ctx.fill()

    // Shoe
    const shoeGrad = ctx.createLinearGradient(-12, 50, 14, 50)
    shoeGrad.addColorStop(0, P.shoes)
    shoeGrad.addColorStop(0.7, P.shoesLight)
    roundRect(ctx, -12, 50, 26, 12, 5)
    ctx.fillStyle = shoeGrad
    ctx.fill()
    // Shoe sole
    ctx.fillStyle = '#111'
    roundRect(ctx, -12, 59, 26, 3, 2)
    ctx.fill()

    ctx.restore()
  }

  _drawBackpack(ctx: CanvasRenderingContext2D, armSwing: number) {
    ctx.save()
    ctx.translate(-18, 10)
    ctx.rotate((armSwing * 0.05 * Math.PI) / 180)

    // Main body
    const bpGrad = ctx.createLinearGradient(-18, 0, 8, 0)
    bpGrad.addColorStop(0, P.backpackDark)
    bpGrad.addColorStop(0.5, P.backpack)
    bpGrad.addColorStop(1, P.backpackDark)
    roundRect(ctx, -18, -5, 26, 38, 6)
    ctx.fillStyle = bpGrad
    ctx.fill()

    // Pocket
    roundRect(ctx, -14, 16, 18, 12, 4)
    ctx.fillStyle = P.backpackDark
    ctx.fill()

    // Zipper line
    ctx.strokeStyle = '#d08040'
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(-14, 14); ctx.lineTo(4, 14); ctx.stroke()

    // Strap
    ctx.fillStyle = P.backpackStrap
    roundRect(ctx, 6, -2, 5, 30, 2)
    ctx.fill()

    ctx.restore()
  }

  _drawTorso(ctx: CanvasRenderingContext2D) {
    ctx.save()
    // Shirt with gradient for depth
    const shirtGrad = ctx.createLinearGradient(-24, 5, 24, 5)
    shirtGrad.addColorStop(0, P.shirtShadow)
    shirtGrad.addColorStop(0.3, P.shirt)
    shirtGrad.addColorStop(0.7, P.shirtLight)
    shirtGrad.addColorStop(1, P.shirtShadow)

    roundRect(ctx, -24, 5, 48, 50, 10)
    ctx.fillStyle = shirtGrad
    ctx.fill()

    // Shirt shadow on lower part
    ctx.save()
    ctx.globalAlpha = 0.15
    roundRect(ctx, -24, 35, 48, 20, 5)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.restore()

    // Collar V-neck
    ctx.beginPath()
    ctx.moveTo(-10, 5)
    ctx.lineTo(0, 18)
    ctx.lineTo(10, 5)
    ctx.strokeStyle = P.shirtShadow
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Collar skin
    ctx.beginPath()
    ctx.moveTo(-8, 5)
    ctx.lineTo(0, 15)
    ctx.lineTo(8, 5)
    ctx.fillStyle = P.skin
    ctx.fill()

    ctx.restore()
  }

  _drawArm(ctx: CanvasRenderingContext2D, x: number, y: number, swing: number, isFront: boolean, _bills: number) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((swing * Math.PI) / 180)

    // Upper arm
    const armGrad = ctx.createLinearGradient(-8, 0, 8, 0)
    armGrad.addColorStop(0, isFront ? P.shirt : P.shirtShadow)
    armGrad.addColorStop(1, isFront ? P.shirtLight : P.shirt)
    roundRect(ctx, -8, 0, 16, 28, 6)
    ctx.fillStyle = armGrad
    ctx.fill()

    // Forearm (skin)
    const skinGrad = ctx.createLinearGradient(-7, 26, 7, 26)
    skinGrad.addColorStop(0, P.skinShadow)
    skinGrad.addColorStop(1, P.skin)
    roundRect(ctx, -7, 26, 14, 16, 5)
    ctx.fillStyle = skinGrad
    ctx.fill()

    // Hand
    ctx.fillStyle = P.skin
    ctx.beginPath(); ctx.arc(0, 44, 8, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = P.skinShadow
    ctx.globalAlpha = 0.3
    ctx.beginPath(); ctx.arc(-2, 45, 7, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1

    ctx.restore()
  }

  _drawArmWithBills(ctx: CanvasRenderingContext2D, x: number, y: number, swing: number) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((swing * Math.PI) / 180)

    // Upper arm
    const armGrad = ctx.createLinearGradient(-8, 0, 8, 0)
    armGrad.addColorStop(0, P.shirt)
    armGrad.addColorStop(1, P.shirtLight)
    roundRect(ctx, -8, 0, 16, 28, 6)
    ctx.fillStyle = armGrad
    ctx.fill()

    // Forearm
    const skinGrad = ctx.createLinearGradient(-7, 26, 7, 26)
    skinGrad.addColorStop(0, P.skin)
    skinGrad.addColorStop(1, P.skinLight)
    roundRect(ctx, -7, 26, 14, 16, 5)
    ctx.fillStyle = skinGrad
    ctx.fill()

    // Hand
    ctx.fillStyle = P.skin
    ctx.beginPath(); ctx.arc(0, 44, 8, 0, Math.PI * 2); ctx.fill()

    // Bills with secondary motion lag
    for (let i = 0; i < this.billCount; i++) {
      ctx.save()
      const lagOffset = this.billLag * (i + 1) * 0.15
      ctx.translate(8, 30 - i * 6 + lagOffset)
      ctx.rotate((((-5 + i * 3) + (this.walking ? Math.sin(this.walkCycle * Math.PI * 4 + i) * 4 : 0)) * Math.PI) / 180)

      // Bill with gradient
      const billGrad = ctx.createLinearGradient(-22, -13, 22, 13)
      billGrad.addColorStop(0, P.billDark)
      billGrad.addColorStop(0.3, P.bill)
      billGrad.addColorStop(0.8, P.billLight)
      billGrad.addColorStop(1, P.bill)
      roundRect(ctx, -22, -13, 44, 26, 5)
      ctx.fillStyle = billGrad
      ctx.fill()
      ctx.strokeStyle = P.billDark
      ctx.lineWidth = 1.5
      ctx.stroke()

      // ₪
      ctx.fillStyle = P.billDark
      ctx.font = 'bold 13px sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('₪', 0, 0)

      // Decorative border
      roundRect(ctx, -18, -9, 36, 18, 3)
      ctx.strokeStyle = P.billDark
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([])

      ctx.restore()
    }

    ctx.restore()
  }

  _drawHead(ctx: CanvasRenderingContext2D, moodV: number, bodyBob: number) {
    ctx.save()
    ctx.translate(0, -17)

    const hairLag = this.hairLag

    // Neck with gradient
    const neckGrad = ctx.createLinearGradient(-7, 0, 7, 0)
    neckGrad.addColorStop(0, P.skinShadow)
    neckGrad.addColorStop(0.5, P.skin)
    neckGrad.addColorStop(1, P.skinShadow)
    roundRect(ctx, -7, 0, 14, 22, 5)
    ctx.fillStyle = neckGrad; ctx.fill()

    // Head shape with gradient
    const headGrad = ctx.createRadialGradient(4, -18, 5, 0, -16, 28)
    headGrad.addColorStop(0, P.skinLight)
    headGrad.addColorStop(0.7, P.skin)
    headGrad.addColorStop(1, P.skinShadow)
    ctx.beginPath()
    ctx.ellipse(0, -16, 24, 26, 0, 0, Math.PI * 2)
    ctx.fillStyle = headGrad; ctx.fill()

    // Ear
    const earGrad = ctx.createRadialGradient(-24, -14, 1, -24, -14, 7)
    earGrad.addColorStop(0, P.skin)
    earGrad.addColorStop(1, P.skinShadow)
    ctx.beginPath(); ctx.ellipse(-24, -14, 6, 8, 0, 0, Math.PI * 2)
    ctx.fillStyle = earGrad; ctx.fill()
    // Inner ear
    ctx.beginPath(); ctx.ellipse(-24, -13, 3, 5, 0, 0, Math.PI * 2)
    ctx.fillStyle = P.skinShadow; ctx.globalAlpha = 0.4; ctx.fill()
    ctx.globalAlpha = 1

    // Hair with secondary motion
    ctx.save()
    ctx.translate(0, hairLag * 0.3)
    ctx.beginPath()
    ctx.moveTo(-24, -16)
    ctx.quadraticCurveTo(-26, -46, -6, -46 + hairLag * 0.2)
    ctx.quadraticCurveTo(6, -47 + hairLag * 0.15, 18, -44 + hairLag * 0.1)
    ctx.quadraticCurveTo(28, -38, 25, -20)
    ctx.quadraticCurveTo(24, -30, 16, -35)
    ctx.quadraticCurveTo(6, -32, -4, -36 + hairLag * 0.1)
    ctx.quadraticCurveTo(-16, -32, -22, -24)
    ctx.closePath()
    // Hair gradient
    const hairGrad = ctx.createLinearGradient(0, -48, 0, -20)
    hairGrad.addColorStop(0, P.hairLight)
    hairGrad.addColorStop(1, P.hair)
    ctx.fillStyle = hairGrad; ctx.fill()

    // Hair shine
    ctx.beginPath()
    ctx.moveTo(-8, -44 + hairLag * 0.15)
    ctx.quadraticCurveTo(0, -46, 8, -42)
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

    // ── Dynamic Eyebrows ──
    ctx.lineWidth = 2.8; ctx.lineCap = 'round'; ctx.strokeStyle = P.hair
    const browAngle = lerp(0, 4, moodV) // inner brow rises when sad
    ctx.beginPath(); ctx.moveTo(-15, -25 - browAngle); ctx.lineTo(-6, -26 + browAngle * 0.5); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(6, -26 + browAngle * 0.5); ctx.lineTo(15, -25 - browAngle); ctx.stroke()

    // ── Eyes ──
    // Whites
    ctx.fillStyle = P.white
    ctx.beginPath(); ctx.ellipse(-10, -17, 7, 8, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(10, -17, 7, 8, 0, 0, Math.PI * 2); ctx.fill()
    // Eye outline
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 0.8
    ctx.beginPath(); ctx.ellipse(-10, -17, 7, 8, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.beginPath(); ctx.ellipse(10, -17, 7, 8, 0, 0, Math.PI * 2); ctx.stroke()

    // Iris
    ctx.fillStyle = '#5a3a1a'
    ctx.beginPath(); ctx.arc(-9, -16, 4.2, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(11, -16, 4.2, 0, Math.PI * 2); ctx.fill()

    // Pupil
    ctx.fillStyle = '#0a0500'
    ctx.beginPath(); ctx.arc(-9, -16, 2.2, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(11, -16, 2.2, 0, Math.PI * 2); ctx.fill()

    // Eye shine
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    ctx.beginPath(); ctx.arc(-7, -18.5, 1.5, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(13, -18.5, 1.5, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(-10.5, -14, 0.8, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(9.5, -14, 0.8, 0, Math.PI * 2); ctx.fill()

    // Nose
    ctx.beginPath()
    ctx.moveTo(1, -10)
    ctx.quadraticCurveTo(4, -3, 1, -1)
    ctx.strokeStyle = P.skinShadow; ctx.lineWidth = 1.8; ctx.lineCap = 'round'
    ctx.stroke()
    // Nostril hint
    ctx.fillStyle = P.skinShadow; ctx.globalAlpha = 0.3
    ctx.beginPath(); ctx.arc(0, -1, 1.5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1

    // ── Dynamic Mouth ──
    // moodV: 0 = big smile, 0.5 = neutral, 1 = frown
    const mouthCurve = lerp(10, -8, moodV)  // positive = smile, negative = frown
    const mouthWidth = lerp(8, 6, moodV)
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'
    ctx.strokeStyle = '#b07050'
    ctx.beginPath()
    ctx.moveTo(-mouthWidth, 3)
    ctx.quadraticCurveTo(0, 3 + mouthCurve, mouthWidth, 3)
    ctx.stroke()

    // Show teeth when happy
    if (moodV < 0.3) {
      ctx.globalAlpha = 1 - moodV * 3
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.beginPath()
      ctx.moveTo(-5, 3)
      ctx.quadraticCurveTo(0, 3 + mouthCurve * 0.8, 5, 3)
      ctx.quadraticCurveTo(0, 3 + mouthCurve * 0.4, -5, 3)
      ctx.fill()
      ctx.globalAlpha = 1
    }

    // Cheek blush when happy
    if (moodV < 0.4) {
      ctx.globalAlpha = (0.4 - moodV) * 0.4
      ctx.fillStyle = '#f0a0a0'
      ctx.beginPath(); ctx.ellipse(-16, -5, 6, 4, 0, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.ellipse(16, -5, 6, 4, 0, 0, Math.PI * 2); ctx.fill()
      ctx.globalAlpha = 1
    }

    ctx.restore() // head
  }
}

/* ═══════════════════════════════════════
   PIT CLASS
   ═══════════════════════════════════════ */
class Pit {
  worldX: number; label: string; openAmount = 0

  constructor(worldX: number, label: string) {
    this.worldX = worldX; this.label = label
  }

  draw(ctx: CanvasRenderingContext2D, screenX: number) {
    if (this.openAmount <= 0) return
    const x = screenX
    const y = GROUND_Y + 5
    const rx = 80 * this.openAmount
    const ry = 22 * this.openAmount

    // Crack lines radiating out
    ctx.save()
    ctx.globalAlpha = this.openAmount * 0.5
    ctx.strokeStyle = P.pitRim; ctx.lineWidth = 1.5
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.3
      const innerR = rx * 0.85
      const outerR = rx + 12 + (i % 3) * 8
      ctx.beginPath()
      ctx.moveTo(x + Math.cos(angle) * innerR, y + Math.sin(angle) * ry * 0.85)
      ctx.lineTo(x + Math.cos(angle) * outerR, y + Math.sin(angle) * (ry + 10 + (i % 2) * 5))
      ctx.stroke()
    }
    ctx.restore()

    // Use clip for depth effect
    ctx.save()
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
    ctx.clip()

    // Inner darkness gradient
    const depthGrad = ctx.createRadialGradient(x, y + ry * 0.5, 0, x, y, rx)
    depthGrad.addColorStop(0, '#000000')
    depthGrad.addColorStop(0.4, P.pitInner)
    depthGrad.addColorStop(0.8, P.pitDark)
    depthGrad.addColorStop(1, P.pitDark)
    ctx.fillStyle = depthGrad
    ctx.fillRect(x - rx, y - ry, rx * 2, ry * 2)

    // Depth lines inside
    ctx.globalAlpha = 0.15
    ctx.strokeStyle = P.pitRim
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.ellipse(x, y + i * 4, rx - i * 15, ry - i * 4, 0, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.restore()

    // Rim with glow
    ctx.strokeStyle = P.pitRim; ctx.lineWidth = 3.5
    ctx.beginPath(); ctx.ellipse(x, y - 2, rx, ry, 0, 0, Math.PI * 2); ctx.stroke()
    ctx.strokeStyle = 'rgba(80,50,20,0.3)'; ctx.lineWidth = 6
    ctx.beginPath(); ctx.ellipse(x, y - 2, rx + 2, ry + 1, 0, 0, Math.PI * 2); ctx.stroke()

    // Label badge
    if (this.openAmount > 0.5) {
      const a = clamp01((this.openAmount - 0.5) * 2)
      ctx.globalAlpha = a
      ctx.font = 'bold 15px sans-serif'
      const tw = ctx.measureText(this.label).width + 36
      const lx = x - tw / 2, ly = y - ry - 45

      // Badge shadow
      roundRect(ctx, lx + 2, ly + 2, tw, 32, 16)
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill()

      // Badge
      const badgeGrad = ctx.createLinearGradient(lx, ly, lx, ly + 32)
      badgeGrad.addColorStop(0, P.red)
      badgeGrad.addColorStop(1, P.redDark)
      roundRect(ctx, lx, ly, tw, 32, 16)
      ctx.fillStyle = badgeGrad; ctx.fill()

      ctx.fillStyle = P.white
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(this.label, x, ly + 16)
      ctx.globalAlpha = 1
    }
  }
}

/* ═══════════════════════════════════════
   INFLATION MONSTER CLASS
   ═══════════════════════════════════════ */
class InflationMonster {
  worldX: number; appear = 0

  constructor(worldX: number) { this.worldX = worldX }

  draw(ctx: CanvasRenderingContext2D, screenX: number, y: number, time: number) {
    if (this.appear <= 0) return
    ctx.save()
    ctx.translate(screenX, y)
    ctx.scale(this.appear, this.appear)

    const breathe = Math.sin(time * 3) * 4
    const wiggle = () => (Math.random() - 0.5) * 1.5  // organic wiggle

    // Body with gradient
    ctx.beginPath()
    ctx.ellipse(wiggle(), -22 + breathe + wiggle(), 40, 48, 0, 0, Math.PI * 2)
    const bodyGrad = ctx.createRadialGradient(10, -35 + breathe, 5, 0, -22 + breathe, 48)
    bodyGrad.addColorStop(0, P.monsterLight)
    bodyGrad.addColorStop(0.6, P.monster)
    bodyGrad.addColorStop(1, P.monsterDark)
    ctx.fillStyle = bodyGrad; ctx.fill()

    // Body spots
    ctx.globalAlpha = 0.15
    ctx.fillStyle = P.monsterDark
    ctx.beginPath(); ctx.arc(-12 + wiggle(), -5 + breathe, 8, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(15 + wiggle(), -30 + breathe, 6, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(-5 + wiggle(), -40 + breathe, 5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1

    // Horns
    const hornGrad = ctx.createLinearGradient(0, -70, 0, -55)
    hornGrad.addColorStop(0, '#ff6600')
    hornGrad.addColorStop(1, P.monsterDark)
    ctx.fillStyle = hornGrad
    ctx.beginPath()
    ctx.moveTo(-20, -65 + breathe); ctx.lineTo(-14, -88 + breathe); ctx.lineTo(-8, -65 + breathe)
    ctx.closePath(); ctx.fill()
    ctx.beginPath()
    ctx.moveTo(8, -65 + breathe); ctx.lineTo(14, -88 + breathe); ctx.lineTo(20, -65 + breathe)
    ctx.closePath(); ctx.fill()

    // Eyes
    ctx.fillStyle = P.white
    ctx.beginPath(); ctx.ellipse(-14 + wiggle(), -38 + breathe, 12, 14, -0.1, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(14 + wiggle(), -38 + breathe, 12, 14, 0.1, 0, Math.PI * 2); ctx.fill()
    // Iris
    ctx.fillStyle = '#F1C40F'
    ctx.beginPath(); ctx.arc(-12, -36 + breathe, 6, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.arc(16, -36 + breathe, 6, 0, Math.PI * 2); ctx.fill()
    // Pupil (slit)
    ctx.fillStyle = '#000'
    ctx.save()
    ctx.translate(-12, -36 + breathe); ctx.scale(0.4, 1)
    ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.translate(16, -36 + breathe); ctx.scale(0.4, 1)
    ctx.beginPath(); ctx.arc(0, 0, 4, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    // Mouth — open, blowing
    ctx.beginPath()
    ctx.ellipse(42 + wiggle(), -15 + breathe, 16, 11, 0, 0, Math.PI * 2)
    ctx.fillStyle = P.monsterDark; ctx.fill()
    // Teeth
    ctx.fillStyle = P.monsterTeeth
    for (let i = 0; i < 4; i++) {
      const tx = 32 + i * 6, ty = -20 + breathe
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx + 3, ty + 7); ctx.lineTo(tx + 6, ty)
      ctx.fill()
    }

    // Arms
    ctx.fillStyle = P.monster
    ctx.save(); ctx.translate(-38, -10 + breathe); ctx.rotate(Math.sin(time * 2) * 0.2)
    roundRect(ctx, -6, 0, 12, 20, 5); ctx.fill()
    ctx.fillStyle = P.monsterDark
    ctx.beginPath(); ctx.arc(0, 22, 6, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    ctx.save(); ctx.translate(38, -10 + breathe); ctx.rotate(-Math.sin(time * 2) * 0.2)
    ctx.fillStyle = P.monster
    roundRect(ctx, -6, 0, 12, 20, 5); ctx.fill()
    ctx.fillStyle = P.monsterDark
    ctx.beginPath(); ctx.arc(0, 22, 6, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    // Feet
    ctx.fillStyle = P.monsterDark
    ctx.beginPath(); ctx.ellipse(-14 + wiggle(), 28, 14, 8, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(14 + wiggle(), 28, 14, 8, 0, 0, Math.PI * 2); ctx.fill()

    // Label
    ctx.globalAlpha = this.appear
    roundRect(ctx, -45, 40, 90, 28, 14)
    const labelGrad = ctx.createLinearGradient(0, 40, 0, 68)
    labelGrad.addColorStop(0, P.red); labelGrad.addColorStop(1, P.redDark)
    ctx.fillStyle = labelGrad; ctx.fill()
    ctx.fillStyle = P.white; ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('אינפלציה', 0, 54)
    ctx.globalAlpha = 1

    ctx.restore()
  }
}

/* ═══════════════════════════════════════
   ENVIRONMENT DRAWING
   ═══════════════════════════════════════ */

function drawSky(ctx: CanvasRenderingContext2D, time: number) {
  const grad = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
  grad.addColorStop(0, P.bg1); grad.addColorStop(0.5, P.bg2); grad.addColorStop(1, P.ground)
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)

  // Moon
  ctx.save()
  ctx.globalAlpha = 0.12
  ctx.fillStyle = '#e0e8ff'
  ctx.beginPath(); ctx.arc(1600, 120, 45, 0, Math.PI * 2); ctx.fill()
  // Moon glow
  const moonGlow = ctx.createRadialGradient(1600, 120, 30, 1600, 120, 150)
  moonGlow.addColorStop(0, 'rgba(200,210,240,0.1)')
  moonGlow.addColorStop(1, 'rgba(200,210,240,0)')
  ctx.fillStyle = moonGlow
  ctx.beginPath(); ctx.arc(1600, 120, 150, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  // Stars
  const seeds = [
    [120,80],[340,50],[560,110],[780,30],[950,90],[1150,60],[1350,100],[1550,45],
    [200,150],[450,180],[700,140],[900,170],[1100,130],[1300,160],[1500,120],[1700,155],
    [80,220],[300,200],[520,250],[740,230],[1000,210],[1200,240],[1400,220],[1600,200],
    [180,40],[600,70],[1050,55],[1450,85],[250,260],[850,190],[1250,70],[1650,110],
    [400,35],[820,65],[1180,45],[1580,95],[160,180],[660,210],[1080,190],[1480,165],
  ]
  for (let i = 0; i < seeds.length; i++) {
    const [sx, sy] = seeds[i]
    const flicker = 0.3 + 0.7 * Math.sin(time * (1.2 + i * 0.25) + i * 2.7)
    const r = 0.8 + (i % 4) * 0.5
    ctx.globalAlpha = flicker * 0.7
    ctx.fillStyle = i % 7 === 0 ? '#ffd' : P.white
    ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawCitySilhouette(ctx: CanvasRenderingContext2D, cam: number) {
  ctx.globalAlpha = 0.035
  ctx.fillStyle = '#a0b0c0'
  const buildings = [
    [100,140,60],[250,190,50],[380,110,75],[540,210,45],[680,150,55],
    [850,230,42],[1000,130,68],[1180,180,52],[1350,160,62],[1530,200,48],
    [1700,135,58],[1880,175,52],[2050,210,42],[2250,145,65],[2450,185,55],
    [2650,125,72],[2850,200,48],[3050,155,58],[3250,180,52],[3450,140,68],
  ]
  for (const [bx, bh, bw] of buildings) {
    const sx = bx - cam * 0.15
    if (sx > -bw - 50 && sx < W + 50) {
      // Building
      ctx.fillRect(sx, GROUND_Y - bh, bw, bh)
      // Antenna
      if (bh > 160) {
        ctx.fillRect(sx + bw / 2 - 1, GROUND_Y - bh - 25, 2, 25)
      }
      // Windows
      ctx.save(); ctx.globalAlpha = 0.05
      for (let wy = GROUND_Y - bh + 18; wy < GROUND_Y - 12; wy += 22) {
        for (let wx = sx + 10; wx < sx + bw - 10; wx += 14) {
          ctx.fillRect(wx, wy, 7, 10)
        }
      }
      ctx.restore()
    }
  }
  ctx.globalAlpha = 1
}

function drawGround(ctx: CanvasRenderingContext2D, cam: number) {
  // Ground base
  const grad = ctx.createLinearGradient(0, GROUND_Y, 0, H)
  grad.addColorStop(0, P.groundLight); grad.addColorStop(0.08, P.ground)
  grad.addColorStop(0.4, P.groundDark); grad.addColorStop(1, '#060a12')
  ctx.fillStyle = grad; ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y)

  // Road surface
  ctx.fillStyle = P.road; ctx.fillRect(0, GROUND_Y, W, 130)

  // Road highlight
  ctx.fillStyle = P.groundLight; ctx.fillRect(0, GROUND_Y, W, 3)

  // Road dashes
  ctx.fillStyle = P.roadLine
  for (let i = -2; i < 50; i++) {
    const lx = i * 110 - (cam % 110)
    ctx.fillRect(lx, GROUND_Y + 60, 45, 4)
  }
}

// Foreground elements — lamp posts, bushes (parallax foreground layer)
function drawForeground(ctx: CanvasRenderingContext2D, cam: number, time: number) {
  // Lamp posts (move at 1.3x camera speed for foreground parallax)
  const lampPositions = [300, 900, 1500, 2100, 2700, 3300]
  for (const lx of lampPositions) {
    const sx = lx - cam * 1.3
    if (sx < -60 || sx > W + 60) continue

    ctx.globalAlpha = 0.6

    // Post
    ctx.fillStyle = P.lampPost
    ctx.fillRect(sx - 3, GROUND_Y - 180, 6, 180)

    // Lamp head
    roundRect(ctx, sx - 15, GROUND_Y - 195, 30, 18, 4)
    ctx.fillStyle = '#2a3848'; ctx.fill()

    // Light glow
    const glowGrad = ctx.createRadialGradient(sx, GROUND_Y - 170, 5, sx, GROUND_Y - 120, 100)
    glowGrad.addColorStop(0, 'rgba(255,220,150,0.08)')
    glowGrad.addColorStop(1, 'rgba(255,220,150,0)')
    ctx.fillStyle = glowGrad
    ctx.beginPath(); ctx.arc(sx, GROUND_Y - 140, 100, 0, Math.PI * 2); ctx.fill()

    ctx.globalAlpha = 1
  }

  // Bushes
  const bushPositions = [500, 1200, 1800, 2400, 3000]
  for (const bx of bushPositions) {
    const sx = bx - cam * 1.2
    if (sx < -80 || sx > W + 80) continue

    ctx.globalAlpha = 0.4
    const sway = Math.sin(time * 1.5 + bx * 0.01) * 2

    ctx.fillStyle = P.bush
    ctx.beginPath(); ctx.ellipse(sx + sway, GROUND_Y + 5, 35, 22, 0, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = P.bushLight
    ctx.beginPath(); ctx.ellipse(sx - 10 + sway, GROUND_Y, 20, 16, 0, 0, Math.PI * 2); ctx.fill()
    ctx.beginPath(); ctx.ellipse(sx + 15 + sway, GROUND_Y + 2, 18, 14, 0, 0, Math.PI * 2); ctx.fill()

    ctx.globalAlpha = 1
  }
}

/* ─── Clouds (Scene 1 floating) ─── */
function drawClouds(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number, time: number) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha = alpha

  const clouds = [
    { ox: -60, oy: 15, rx: 40, ry: 15 },
    { ox: 0, oy: 10, rx: 55, ry: 20 },
    { ox: 50, oy: 18, rx: 35, ry: 14 },
    { ox: -30, oy: 22, rx: 30, ry: 12 },
    { ox: 25, oy: 25, rx: 28, ry: 10 },
  ]

  for (const c of clouds) {
    const drift = Math.sin(time * 0.8 + c.ox * 0.1) * 5
    const cloudGrad = ctx.createRadialGradient(
      x + c.ox + drift, y + c.oy, c.rx * 0.2,
      x + c.ox + drift, y + c.oy, c.rx
    )
    cloudGrad.addColorStop(0, P.cloud)
    cloudGrad.addColorStop(0.6, P.cloudShadow)
    cloudGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = cloudGrad
    ctx.beginPath()
    ctx.ellipse(x + c.ox + drift, y + c.oy, c.rx, c.ry, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

/* ─── Falling Bill ─── */
function drawFallingBill(ctx: CanvasRenderingContext2D, x: number, progress: number) {
  if (progress <= 0 || progress >= 1) return
  const y = GROUND_Y - 70 + progress * 130
  const rot = progress * 400
  // Alpha fades as it "enters" the pit depth
  const alpha = progress < 0.7 ? 1 : 1 - ((progress - 0.7) / 0.3)

  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(x, y)
  ctx.rotate((rot * Math.PI) / 180)
  ctx.scale(1 - progress * 0.3, 1 - progress * 0.3) // shrinks as it falls deeper

  const billGrad = ctx.createLinearGradient(-24, -14, 24, 14)
  billGrad.addColorStop(0, P.billDark); billGrad.addColorStop(0.5, P.bill); billGrad.addColorStop(1, P.billLight)
  roundRect(ctx, -24, -14, 48, 28, 5)
  ctx.fillStyle = billGrad; ctx.fill()
  ctx.strokeStyle = P.billDark; ctx.lineWidth = 1.5; ctx.stroke()
  ctx.fillStyle = P.billDark; ctx.font = 'bold 14px sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('₪', 0, 0)

  ctx.restore()
}

/* ─── Shop Window ─── */
function drawShopWindow(ctx: CanvasRenderingContext2D, x: number, y: number, appear: number, time: number) {
  if (appear <= 0) return
  ctx.save(); ctx.globalAlpha = appear

  const ww = 180, wh = 220
  const wx = x - ww / 2, wy = y - wh

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  roundRect(ctx, wx + 5, wy + 5, ww, wh, 8); ctx.fill()

  // Frame with gradient
  const frameGrad = ctx.createLinearGradient(wx, wy, wx + ww, wy)
  frameGrad.addColorStop(0, '#6a5a45'); frameGrad.addColorStop(0.5, P.windowFrame); frameGrad.addColorStop(1, '#5a4a35')
  roundRect(ctx, wx, wy, ww, wh, 8)
  ctx.fillStyle = frameGrad; ctx.fill()

  // Glass
  roundRect(ctx, wx + 8, wy + 8, ww - 16, wh * 0.58, 4)
  ctx.fillStyle = P.windowGlass; ctx.fill()

  // Glass gradient (reflection)
  const glassRef = ctx.createLinearGradient(wx + 10, wy + 10, wx + ww - 10, wy + wh * 0.5)
  glassRef.addColorStop(0, 'rgba(255,255,255,0.05)')
  glassRef.addColorStop(0.5, 'rgba(255,255,255,0.02)')
  glassRef.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = glassRef
  roundRect(ctx, wx + 8, wy + 8, ww - 16, wh * 0.58, 4); ctx.fill()

  // Items
  ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = P.cream; ctx.fillText('✨ עתיד ✨', x, wy + 40)
  ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = P.orange
  ctx.fillText('🏠 דירה', x - 35, wy + 72)
  ctx.fillText('🏖 חופש', x + 35, wy + 100)
  ctx.fillText('💰 חיסכון', x, wy + 128)

  // Sparkles
  for (let i = 0; i < 4; i++) {
    const sa = 0.2 + 0.5 * Math.sin(time * 2.5 + i * 1.8)
    ctx.globalAlpha = appear * sa; ctx.fillStyle = P.orange
    ctx.beginPath(); ctx.arc(x - 50 + i * 33, wy + 50 + (i % 2) * 35, 2.5, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = appear

  // Door
  const doorGrad = ctx.createLinearGradient(x - 32, 0, x + 32, 0)
  doorGrad.addColorStop(0, '#3a2818'); doorGrad.addColorStop(0.5, '#5a4230'); doorGrad.addColorStop(1, '#3a2818')
  roundRect(ctx, x - 32, y - wh + wh * 0.66, 64, wh * 0.30, 4)
  ctx.fillStyle = doorGrad; ctx.fill()

  // Lock
  const lockY = y - wh + wh * 0.81
  roundRect(ctx, x - 11, lockY - 6, 22, 18, 4)
  const lockGrad = ctx.createLinearGradient(x - 11, lockY, x + 11, lockY)
  lockGrad.addColorStop(0, '#a0a0a0'); lockGrad.addColorStop(0.5, P.lock); lockGrad.addColorStop(1, '#a0a0a0')
  ctx.fillStyle = lockGrad; ctx.fill()
  ctx.beginPath(); ctx.arc(x, lockY - 12, 10, Math.PI, 0)
  ctx.strokeStyle = P.lock; ctx.lineWidth = 4.5; ctx.stroke()
  ctx.fillStyle = P.lockDark
  ctx.beginPath(); ctx.arc(x, lockY + 3, 3, 0, Math.PI * 2); ctx.fill()

  ctx.globalAlpha = 1; ctx.restore()
}

/* ─── Narration ─── */
function drawNarration(ctx: CanvasRenderingContext2D, text: string, speaker: string, alpha: number) {
  if (alpha <= 0 || !text) return
  ctx.save(); ctx.globalAlpha = alpha

  const boxW = 750, boxH = 95
  const boxX = (W - boxW) / 2, boxY = H - 145

  // Shadow
  roundRect(ctx, boxX + 3, boxY + 3, boxW, boxH, 18)
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill()

  // Background
  roundRect(ctx, boxX, boxY, boxW, boxH, 18)
  ctx.fillStyle = P.textBg; ctx.fill()
  ctx.strokeStyle = P.textBorder; ctx.lineWidth = 1.5; ctx.stroke()

  // Speaker badge
  ctx.font = 'bold 14px sans-serif'
  const bw = ctx.measureText(speaker).width + 28
  roundRect(ctx, boxX + 22, boxY - 15, bw, 30, 15)
  const badgeGrad = ctx.createLinearGradient(0, boxY - 15, 0, boxY + 15)
  badgeGrad.addColorStop(0, '#f5b838'); badgeGrad.addColorStop(1, P.orange)
  ctx.fillStyle = badgeGrad; ctx.fill()
  ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(speaker, boxX + 22 + bw / 2, boxY)

  // Text
  ctx.fillStyle = P.white; ctx.font = '18px sans-serif'
  ctx.textAlign = 'center'; ctx.direction = 'rtl'

  const words = text.split(' ')
  const lines: string[] = []; let cur = ''
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w
    if (ctx.measureText(test).width > boxW - 70) { lines.push(cur); cur = w } else cur = test
  }
  if (cur) lines.push(cur)

  const lh = 25
  const sy = boxY + boxH / 2 - ((lines.length - 1) * lh) / 2 + 6
  lines.forEach((l, i) => ctx.fillText(l, W / 2, sy + i * lh))

  ctx.globalAlpha = 1; ctx.restore()
}

/* ─── Thought Bubble ─── */
function drawThought(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, alpha: number) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha = alpha

  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.beginPath(); ctx.arc(x + 25, y + 40, 5, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(x + 40, y + 20, 8, 0, Math.PI * 2); ctx.fill()

  ctx.font = '17px sans-serif'
  const bw = ctx.measureText(text).width + 48
  roundRect(ctx, x + 35, y - 30, bw, 50, 25)
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill()
  ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1.5; ctx.stroke()

  ctx.fillStyle = '#333'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'
  ctx.fillText(text, x + 35 + bw / 2, y - 5)

  ctx.globalAlpha = 1; ctx.restore()
}

/* ═══════════════════════════════════════
   SCENE TIMELINE
   ═══════════════════════════════════════ */
interface SceneState {
  cameraX: number
  roi: { x: number; walking: boolean; moodValue: number; billCount: number; floating: boolean }
  pit1Open: number; pit2Open: number
  fallingBill1: number; fallingBill2: number
  monsterAppear: number
  shopAppear: number
  cloudAlpha: number
  narrationText: string; narrationSpeaker: string; narrationAlpha: number
  thoughtText: string; thoughtAlpha: number
  emitMonsterParticles: boolean
}

function getSceneState(t: number): SceneState {
  const s: SceneState = {
    cameraX: 0,
    roi: { x: 300, walking: false, moodValue: 0, billCount: 5, floating: false },
    pit1Open: 0, pit2Open: 0, fallingBill1: -1, fallingBill2: -1,
    monsterAppear: 0, shopAppear: 0, cloudAlpha: 0,
    narrationText: '', narrationSpeaker: '', narrationAlpha: 0,
    thoughtText: '', thoughtAlpha: 0,
    emitMonsterParticles: false,
  }

  // ── SCENE 1 (0–6s): Roi floating on clouds, happy ──
  if (t < 6) {
    const enter = easeOut(sceneT(t, 0, 2))
    s.roi.x = lerp(-100, 380, enter)
    s.roi.walking = t > 0.5
    s.roi.moodValue = 0  // happy
    s.roi.billCount = 5
    s.roi.floating = t < 4.5
    s.cloudAlpha = t < 4 ? easeOut(sceneT(t, 0.3, 1.5)) : 1 - easeIn(sceneT(t, 4, 5.2))
    s.cameraX = lerp(0, 120, easeInOut(sceneT(t, 2, 6)))

    if (t < 3) {
      s.narrationText = 'תכירו את רועי. רועי הרגע קיבל את המשכורת הראשונה שלו.'
      s.narrationSpeaker = 'אביתר'
      s.narrationAlpha = t < 0.5 ? 0 : t < 1 ? sceneT(t, 0.5, 1) : 1
    } else {
      s.narrationText = 'הוא מרגיש בעננים, הוא חושב שהוא בדרך לחופש כלכלי.'
      s.narrationSpeaker = 'אביתר'
      s.narrationAlpha = t < 3.3 ? sceneT(t, 3, 3.3) : t < 5.2 ? 1 : 1 - sceneT(t, 5.2, 5.8)
    }

    // Cloud dissolve + landing impact at ~5s
    if (t > 4.8 && t < 5.5) {
      s.roi.moodValue = lerp(0, 0.15, sceneT(t, 4.8, 5.2))
    }
  }

  // ── SCENE 2 (6–12s): First pit – taxes ──
  else if (t < 12) {
    s.cameraX = lerp(120, 650, easeInOut(sceneT(t, 6, 12)))
    s.roi.x = lerp(480, 800, easeInOut(sceneT(t, 6, 10)))
    s.roi.walking = t < 9.5
    s.roi.moodValue = lerp(0.15, 0.4, easeInOut(sceneT(t, 7, 10)))
    s.roi.billCount = t < 9.5 ? 5 : 4
    s.pit1Open = easeOut(sceneT(t, 7, 8.2))
    s.fallingBill1 = sceneT(t, 9.2, 10.8)

    s.narrationText = 'אבל רועי לא יודע לקרוא את תלוש השכר שלו. הוא מפספס זיכויים, הוא לא מבין לאן נעלמים לו מאות שקלים בכל חודש.'
    s.narrationSpeaker = 'דקל'
    s.narrationAlpha = t < 6.5 ? sceneT(t, 6, 6.5) : t < 11 ? 1 : 1 - sceneT(t, 11, 11.8)
  }

  // ── SCENE 3 (12–19s): Second pit – bank fees ──
  else if (t < 19) {
    s.cameraX = lerp(650, 1300, easeInOut(sceneT(t, 12, 19)))
    s.roi.x = lerp(800, 1300, easeInOut(sceneT(t, 12, 17)))
    s.roi.walking = t < 16
    s.roi.moodValue = lerp(0.4, 0.6, easeInOut(sceneT(t, 13, 16)))
    s.roi.billCount = t < 16 ? 4 : 3
    s.pit1Open = 1; s.pit2Open = easeOut(sceneT(t, 13.5, 14.8))
    s.fallingBill2 = sceneT(t, 15.5, 17)

    s.narrationText = 'הוא חושב שהבנק הוא חבר שלו, בזמן שהעמלות הקטנות והריביות על המינוס אוכלות לו את החסכונות.'
    s.narrationSpeaker = 'אביתר'
    s.narrationAlpha = t < 12.5 ? sceneT(t, 12, 12.5) : t < 18 ? 1 : 1 - sceneT(t, 18, 18.8)
  }

  // ── SCENE 4 (19–25s): Inflation monster ──
  else if (t < 25) {
    s.cameraX = lerp(1300, 1850, easeInOut(sceneT(t, 19, 25)))
    s.roi.x = lerp(1300, 1680, easeInOut(sceneT(t, 19, 23)))
    s.roi.walking = t < 22
    s.roi.moodValue = lerp(0.6, 0.85, easeInOut(sceneT(t, 20, 24)))
    s.roi.billCount = t < 22 ? 3 : t < 23 ? 2 : 1
    s.pit1Open = 1; s.pit2Open = 1
    s.monsterAppear = easeOut(sceneT(t, 20.5, 21.8))
    s.emitMonsterParticles = t > 21.5

    s.narrationText = 'והכסף שנשאר לו בעו"ש? הוא פשוט מאבד ערך כי הוא לא מושקע. בזמן שרועי מחכה \'להבין מספיק\', האינפלציה חוגגת.'
    s.narrationSpeaker = 'דקל'
    s.narrationAlpha = t < 19.5 ? sceneT(t, 19, 19.5) : t < 24 ? 1 : 1 - sceneT(t, 24, 24.8)
  }

  // ── SCENE 5 (25–30s): Locked shop window ──
  else {
    s.cameraX = lerp(1850, 2150, easeInOut(sceneT(t, 25, 28)))
    s.roi.x = lerp(1680, 1980, easeInOut(sceneT(t, 25, 27.5)))
    s.roi.walking = t < 27
    s.roi.moodValue = lerp(0.85, 1, easeInOut(sceneT(t, 26, 28)))
    s.roi.billCount = 1
    s.pit1Open = 1; s.pit2Open = 1; s.monsterAppear = 1
    s.shopAppear = easeOut(sceneT(t, 26, 27.5))
    s.thoughtAlpha = easeOut(sceneT(t, 28.2, 29.2))
    s.thoughtText = '?...למה אין לי כסף'

    s.narrationText = 'הערימה של רועי מצטמצמת. הוא עומד מול חלון ראווה של "עתיד, דירה, חופש" — והדלת נעולה.'
    s.narrationSpeaker = 'דקל'
    s.narrationAlpha = t < 25.5 ? sceneT(t, 25, 25.5) : t < 29 ? 1 : 1 - sceneT(t, 29, 30)
  }

  return s
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */
export default function RoiStoryAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef(0)
  const rafRef = useRef(0)
  const pausedAtRef = useRef(0)

  // Persistent objects
  const roiRef = useRef(new Roi())
  const pit1Ref = useRef(new Pit(700, 'מס הכנסה וביטוח לאומי'))
  const pit2Ref = useRef(new Pit(1200, 'עמלות וריביות בנק'))
  const monsterRef = useRef(new InflationMonster(1550))
  const particlesRef = useRef(new ParticleSystem())
  const lastTimeRef = useRef(0)

  const render = useCallback((currentTime: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const elapsed = (currentTime - startTimeRef.current) / 1000
    const t = Math.min(elapsed, DURATION)
    const time = currentTime / 1000
    const dt = time - lastTimeRef.current
    lastTimeRef.current = time

    setProgress(t / DURATION)
    pausedAtRef.current = t

    const scene = getSceneState(t)
    const cam = scene.cameraX
    const roi = roiRef.current
    const pit1 = pit1Ref.current
    const pit2 = pit2Ref.current
    const monster = monsterRef.current
    const particles = particlesRef.current

    // Update objects
    roi.x = scene.roi.x - cam
    roi.y = GROUND_Y - 100
    roi.walking = scene.roi.walking
    roi.moodValue = scene.roi.moodValue
    roi.billCount = scene.roi.billCount
    roi.floating = scene.roi.floating
    roi.update(dt, time)

    pit1.openAmount = scene.pit1Open
    pit2.openAmount = scene.pit2Open
    monster.appear = scene.monsterAppear

    // Emit monster particles
    if (scene.emitMonsterParticles && monster.appear > 0.5 && Math.random() < 0.3) {
      const mx = monster.worldX - cam
      particles.emitDirectional(mx + 50, GROUND_Y - 30, 1, P.monsterLight, 1, -0.3, 1.2)
      if (Math.random() < 0.15) {
        particles.emitDirectional(mx + 60, GROUND_Y - 25, 1, P.billLight, 1, -0.5, 0.8)
      }
    }
    particles.update(dt)

    // ── Draw ──
    ctx.clearRect(0, 0, W, H)

    drawSky(ctx, time)
    drawCitySilhouette(ctx, cam)
    drawGround(ctx, cam)

    // Clouds under Roi (Scene 1)
    if (scene.cloudAlpha > 0) {
      drawClouds(ctx, roi.x, GROUND_Y - 30, scene.cloudAlpha, time)
    }

    // Pits
    pit1.draw(ctx, pit1.worldX - cam)
    pit2.draw(ctx, pit2.worldX - cam)

    // Falling bills
    if (scene.fallingBill1 > 0 && scene.fallingBill1 < 1) {
      drawFallingBill(ctx, pit1.worldX - cam, scene.fallingBill1)
    }
    if (scene.fallingBill2 > 0 && scene.fallingBill2 < 1) {
      drawFallingBill(ctx, pit2.worldX - cam, scene.fallingBill2)
    }

    // Monster
    monster.draw(ctx, monster.worldX - cam, GROUND_Y - 10, time)

    // Shop window
    drawShopWindow(ctx, 2150 - cam, GROUND_Y, scene.shopAppear, time)

    // Roi
    roi.draw(ctx)

    // Particles (on top)
    particles.draw(ctx)

    // Thought bubble
    if (scene.thoughtAlpha > 0) {
      drawThought(ctx, roi.x - 10, GROUND_Y - 260, scene.thoughtText, scene.thoughtAlpha)
    }

    // Foreground parallax layer
    drawForeground(ctx, cam, time)

    // Narration
    drawNarration(ctx, scene.narrationText, scene.narrationSpeaker, scene.narrationAlpha)

    if (t < DURATION) {
      rafRef.current = requestAnimationFrame(render)
    } else {
      setPlaying(false)
    }
  }, [])

  const play = useCallback(() => {
    setPlaying(true)
    lastTimeRef.current = performance.now() / 1000
    startTimeRef.current = performance.now() - pausedAtRef.current * 1000
    rafRef.current = requestAnimationFrame(render)
  }, [render])

  const pause = useCallback(() => {
    setPlaying(false)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const replay = useCallback(() => {
    pausedAtRef.current = 0
    particlesRef.current = new ParticleSystem()
    play()
  }, [play])

  // Draw first frame
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const roi = roiRef.current
    roi.x = 300; roi.y = GROUND_Y - 100; roi.moodValue = 0; roi.billCount = 5
    drawSky(ctx, 0); drawCitySilhouette(ctx, 0); drawGround(ctx, 0)
    drawClouds(ctx, 300, GROUND_Y - 30, 0.8, 0)
    roi.draw(ctx)
    drawForeground(ctx, 0, 0)
  }, [])

  useEffect(() => { return () => cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      <canvas
        ref={canvasRef} width={W} height={H}
        className="w-full h-auto rounded-2xl shadow-2xl"
        style={{ background: P.bg1 }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
        {!playing && (
          <button
            onClick={() => { progress >= 1 ? replay() : play() }}
            className="pointer-events-auto cursor-pointer group flex items-center justify-center w-24 h-24 rounded-full bg-black/60 backdrop-blur-sm border-2 border-white/20 hover:bg-brand-orange/80 hover:border-brand-orange transition-all duration-300 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-10 h-10 ml-1 fill-white group-hover:fill-black transition-colors">
              {progress >= 1
                ? <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                : <polygon points="8,5 19,12 8,19" />}
            </svg>
          </button>
        )}
        {playing && (
          <button
            onClick={pause}
            className="pointer-events-auto cursor-pointer absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
