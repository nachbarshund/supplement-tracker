import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

// Persistent store: Upstash Redis / Vercel KV via REST (env vars set by the Vercel integration).
// Fallback: /tmp file (local dev only - NOT persistent on Vercel, every serverless instance has its own /tmp).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'supplement-ratings'
const F = path.join('/tmp', 'ratings.json')
const EMPTY = { ratings: {}, notes: {} }

function isAuth() {
  return cookies().get('auth')?.value === process.env.APP_PASSWORD
}

async function redis(cmd: (string)[]) {
  const r = await fetch(URL_!, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd), cache: 'no-store' })
  if (!r.ok) throw new Error(`redis ${r.status}`)
  return (await r.json()).result
}

async function readData() {
  if (URL_ && TOKEN) {
    const v = await redis(['GET', KEY])
    return v ? JSON.parse(v) : EMPTY
  }
  try { if (fs.existsSync(F)) return JSON.parse(fs.readFileSync(F, 'utf-8')) } catch {}
  return EMPTY
}

async function writeData(d: unknown) {
  if (URL_ && TOKEN) { await redis(['SET', KEY, JSON.stringify(d)]); return }
  fs.writeFileSync(F, JSON.stringify(d))
}

export async function GET() {
  if (!isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    return NextResponse.json({ ...(await readData()), persistent: !!(URL_ && TOKEN) })
  } catch {
    return NextResponse.json({ error: 'Storage error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await writeData(await req.json())
    return NextResponse.json({ ok: true, persistent: !!(URL_ && TOKEN) })
  } catch {
    return NextResponse.json({ error: 'Storage error' }, { status: 500 })
  }
}
