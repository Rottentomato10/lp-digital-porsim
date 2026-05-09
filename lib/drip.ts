// ============================================
// Email Drip Campaign System — פורשים כנף
// ============================================

import { Redis } from '@upstash/redis'
import { createHmac } from 'crypto'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// --- Types ---

export interface DripEmail {
  id: string              // e.g. "email_1"
  subject: string
  body: string            // HTML content
  delayDays: number       // days after enrollment to send (1, 7, 14, 21...)
  active: boolean
}

export interface DripCampaign {
  id: string
  name: string
  emails: DripEmail[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface DripSubscriber {
  email: string
  name: string
  phone: string
  enrolledAt: string      // when they entered the drip
  currentStep: number     // index of next email to send (0-based)
  lastSentAt: string      // when last email was sent
  status: 'active' | 'completed' | 'purchased' | 'unsubscribed'
  source: string          // e.g. 'landing_page', 'checkout'
  coupon: string          // coupon used (if any)
  sentEmails: string[]    // IDs of emails already sent
  personalCoupon?: string          // unique coupon for email 13
  personalCouponCreatedAt?: string // when coupon was generated
  dripConfirmed?: boolean          // opted in to receive emails 2+
  dripConfirmedAt?: string         // timestamp of opt-in (legal proof)
  dripConfirmedIp?: string         // IP at time of opt-in (legal proof)
}

export interface DripSendLog {
  subscriberEmail: string
  emailId: string
  sentAt: string
  success: boolean
  error?: string
}

export interface DripStats {
  totalSubscribers: number
  activeSubscribers: number
  completedSubscribers: number
  purchasedSubscribers: number
  unsubscribedSubscribers: number
  totalEmailsSent: number
  purchaseConversions: number
}

// --- Keys ---
const CAMPAIGN_KEY = 'drip_campaign'
const SUBSCRIBERS_KEY = 'drip_subscribers'
const SEND_LOG_KEY = 'drip_send_log'
const UNSUBSCRIBED_KEY = 'drip_unsubscribed'

// --- Campaign CRUD ---

export async function getCampaign(): Promise<DripCampaign | null> {
  return await redis.get<DripCampaign>(CAMPAIGN_KEY)
}

export async function saveCampaign(campaign: DripCampaign): Promise<void> {
  campaign.updatedAt = new Date().toISOString()
  await redis.set(CAMPAIGN_KEY, campaign)
}

export async function createDefaultCampaign(): Promise<DripCampaign> {
  const campaign: DripCampaign = {
    id: 'main',
    name: 'סדרת אימיילים — לידים שלא רכשו',
    emails: [],
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  await saveCampaign(campaign)
  return campaign
}

// --- Subscriber Management ---

export async function getAllSubscribers(): Promise<DripSubscriber[]> {
  const data = await redis.get<DripSubscriber[]>(SUBSCRIBERS_KEY)
  return data || []
}

export async function getSubscriberByEmail(email: string): Promise<DripSubscriber | null> {
  const subs = await getAllSubscribers()
  return subs.find(s => s.email.toLowerCase() === email.toLowerCase()) || null
}

export async function addSubscriber(sub: Omit<DripSubscriber, 'currentStep' | 'lastSentAt' | 'status' | 'sentEmails'>): Promise<void> {
  const subs = await getAllSubscribers()

  // Don't add if already exists
  if (subs.some(s => s.email.toLowerCase() === sub.email.toLowerCase())) return

  // Check if unsubscribed
  const unsubs = await getUnsubscribedEmails()
  if (unsubs.includes(sub.email.toLowerCase())) return

  subs.push({
    ...sub,
    email: sub.email.toLowerCase(),
    currentStep: 0,
    lastSentAt: '',
    status: 'active',
    sentEmails: [],
    dripConfirmed: sub.dripConfirmed || false,
  })
  await redis.set(SUBSCRIBERS_KEY, subs)
}

export async function updateSubscriber(email: string, updates: Partial<DripSubscriber>): Promise<void> {
  const subs = await getAllSubscribers()
  const idx = subs.findIndex(s => s.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return
  subs[idx] = { ...subs[idx], ...updates }
  await redis.set(SUBSCRIBERS_KEY, subs)
}

export async function removeSubscriber(email: string): Promise<void> {
  const subs = await getAllSubscribers()
  const filtered = subs.filter(s => s.email.toLowerCase() !== email.toLowerCase())
  await redis.set(SUBSCRIBERS_KEY, filtered)
}

export async function markAsPurchased(email: string): Promise<void> {
  await updateSubscriber(email, { status: 'purchased' })
}

// --- Personal Coupons ---

export function generatePersonalCoupon(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'PK'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function validatePersonalCoupon(code: string): Promise<{ valid: boolean; discount: number; email?: string }> {
  const subs = await getAllSubscribers()
  const normalized = code.trim().toUpperCase()
  const sub = subs.find(s => s.personalCoupon === normalized)
  if (!sub) return { valid: false, discount: 0 }

  // Check 24-hour expiry
  if (sub.personalCouponCreatedAt) {
    const created = new Date(sub.personalCouponCreatedAt).getTime()
    const now = Date.now()
    if (now - created > 24 * 60 * 60 * 1000) {
      return { valid: false, discount: 0 } // expired
    }
  }

  return { valid: true, discount: 20, email: sub.email }
}

// --- Drip Confirmation (Double Opt-In) ---

const CONFIRM_SECRET = 'porsim_drip_confirm_2026'

export function generateConfirmToken(email: string): string {
  return createHmac('sha256', CONFIRM_SECRET).update(email.toLowerCase()).digest('hex').slice(0, 24)
}

export function verifyConfirmToken(email: string, token: string): boolean {
  return generateConfirmToken(email) === token
}

export async function confirmDripSubscription(email: string, ip: string): Promise<boolean> {
  const sub = await getSubscriberByEmail(email)
  if (!sub) return false
  if (sub.dripConfirmed) return true // already confirmed

  await updateSubscriber(email, {
    dripConfirmed: true,
    dripConfirmedAt: new Date().toISOString(),
    dripConfirmedIp: ip,
  })
  return true
}

// --- Unsubscribe ---

export async function getUnsubscribedEmails(): Promise<string[]> {
  const data = await redis.get<string[]>(UNSUBSCRIBED_KEY)
  return data || []
}

export async function unsubscribeEmail(email: string): Promise<void> {
  const unsubs = await getUnsubscribedEmails()
  const normalized = email.toLowerCase()
  if (!unsubs.includes(normalized)) {
    unsubs.push(normalized)
    await redis.set(UNSUBSCRIBED_KEY, unsubs)
  }
  await updateSubscriber(email, { status: 'unsubscribed' })
}

// --- Send Log ---

export async function addSendLog(log: DripSendLog): Promise<void> {
  const logs = await redis.get<DripSendLog[]>(SEND_LOG_KEY) || []
  logs.push(log)
  // Keep last 1000 logs
  if (logs.length > 1000) logs.splice(0, logs.length - 1000)
  await redis.set(SEND_LOG_KEY, logs)
}

export async function getSendLogs(): Promise<DripSendLog[]> {
  return await redis.get<DripSendLog[]>(SEND_LOG_KEY) || []
}

// --- Stats ---

export async function getDripStats(): Promise<DripStats> {
  const subs = await getAllSubscribers()
  const logs = await getSendLogs()

  return {
    totalSubscribers: subs.length,
    activeSubscribers: subs.filter(s => s.status === 'active').length,
    completedSubscribers: subs.filter(s => s.status === 'completed').length,
    purchasedSubscribers: subs.filter(s => s.status === 'purchased').length,
    unsubscribedSubscribers: subs.filter(s => s.status === 'unsubscribed').length,
    totalEmailsSent: logs.filter(l => l.success).length,
    purchaseConversions: subs.filter(s => s.status === 'purchased').length,
  }
}

// --- Email Sending via Brevo ---

export async function sendBrevoEmail(to: { email: string; name: string }, subject: string, htmlContent: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error('BREVO_API_KEY not configured')
    return false
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'פורשים כנף', email: 'team@porsimkanaf.com' },
        to: [{ email: to.email, name: to.name }],
        subject,
        htmlContent,
      }),
    })

    return res.ok
  } catch (err) {
    console.error('Brevo send error:', err)
    return false
  }
}

// --- Get subscribers who need emails today ---

export async function getSubscribersDueForEmail(campaign: DripCampaign): Promise<{ subscriber: DripSubscriber; email: DripEmail }[]> {
  const subs = await getAllSubscribers()
  const now = new Date()
  const due: { subscriber: DripSubscriber; email: DripEmail }[] = []

  for (const sub of subs) {
    if (sub.status !== 'active') continue
    if (sub.currentStep >= campaign.emails.length) {
      // Completed the sequence
      await updateSubscriber(sub.email, { status: 'completed' })
      continue
    }

    const nextEmail = campaign.emails[sub.currentStep]
    if (!nextEmail || !nextEmail.active) continue

    const enrolledAt = new Date(sub.enrolledAt)
    const daysSinceEnroll = (now.getTime() - enrolledAt.getTime()) / (1000 * 60 * 60 * 24)

    if (daysSinceEnroll >= nextEmail.delayDays) {
      due.push({ subscriber: sub, email: nextEmail })
    }
  }

  return due
}

// --- Default email template wrapper ---

export function wrapInTemplate(bodyHtml: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:rtl;">
<div style="max-width:580px;margin:0 auto;padding:32px 20px;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://digital.porsimkanaf.com/logo.png" alt="פורשים כנף" width="64" height="64" style="width:64px;height:64px;">
  </div>
  <div style="background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 24px;color:#ffffff;">
    ${bodyHtml}
  </div>
  <div style="text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0 0 8px;">
      © 2026 פורשים כנף · כל הזכויות שמורות
    </p>
    <a href="${unsubscribeUrl}" style="color:rgba(255,255,255,0.3);font-size:11px;text-decoration:underline;">
      להסרה מרשימת התפוצה
    </a>
  </div>
</div>
</body>
</html>`
}
