import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

const F = path.join('/tmp', 'ratings.json')

function isAuth() {
  return cookies().get('auth')?.value === process.env.APP_PASSWORD
}
function readData() {
  try { if (fs.existsSync(F)) return JSON.parse(fs.readFileSync(F, 'utf-8')) } catch {}
  return { ratings: {}, notes: {} }
}

export async function GET() {
  if (!isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(readData())
}
export async function POST(req: NextRequest) {
  if (!isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  fs.writeFileSync(F, JSON.stringify(await req.json()))
  return NextResponse.json({ ok: true })
}
