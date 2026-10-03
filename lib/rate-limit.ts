// Simple in-memory per-key rate limiter (per-instance only, resets on cold start).
const buckets = new Map<string, number[]>()

export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = (buckets.get(key) || []).filter(t => now - t < windowMs)
  if (timestamps.length >= max) return false
  timestamps.push(now)
  buckets.set(key, timestamps)
  return true
}

export function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}
