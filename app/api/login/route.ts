import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE, AUTH_MAX_AGE, authToken } from '../../auth'
export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== process.env.APP_PASSWORD)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set(AUTH_COOKIE, authToken(), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: AUTH_MAX_AGE })
  return res
}
