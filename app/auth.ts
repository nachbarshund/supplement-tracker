import { createHmac, timingSafeEqual } from 'crypto'

export const AUTH_COOKIE = 'auth'
export const AUTH_MAX_AGE = 60 * 60 * 24 * 365

export function authToken(): string {
  return createHmac('sha256', process.env.APP_PASSWORD || '').update('supplement-ratings-auth-v1').digest('hex')
}

export function isValidToken(value?: string): boolean {
  if (!value || !process.env.APP_PASSWORD) return false
  const a = Buffer.from(value)
  const b = Buffer.from(authToken())
  return a.length === b.length && timingSafeEqual(a, b)
}
