'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true); setErr('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    })
    if (res.ok) { router.push('/'); router.refresh() }
    else { setErr('Falsches Passwort'); setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2F2F7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ background: '#FFF', borderRadius: 20, padding: '36px 28px', width: 320, boxShadow: '0 4px 24px rgba(0,0,0,.12)' }}>
        <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>🏋️</div>
        <h1 style={{ color: '#000', fontSize: 22, fontWeight: 700, textAlign: 'center', margin: '0 0 4px', letterSpacing: -.4 }}>Supplement Tracker</h1>
        <p style={{ color: '#6C6C70', fontSize: 13, textAlign: 'center', margin: '0 0 28px' }}>MORE & ESN Bewertungen</p>
        <input type="password" placeholder="Passwort" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', background: '#F2F2F7', border: 'none', borderRadius: 10, color: '#000', fontSize: 15, padding: '12px 14px', outline: 'none', boxSizing: 'border-box', marginBottom: err ? 8 : 12, fontFamily: 'inherit' }}
        />
        {err && <p style={{ color: '#FF3B30', fontSize: 12, margin: '0 0 10px', textAlign: 'center' }}>{err}</p>}
        <button onClick={handleLogin} disabled={loading || !pw}
          style={{ width: '100%', background: '#007AFF', color: '#FFF', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 600, cursor: loading || !pw ? 'not-allowed' : 'pointer', opacity: loading || !pw ? 0.5 : 1, fontFamily: 'inherit' }}>
          {loading ? 'Prüfe…' : 'Einloggen'}
        </button>
      </div>
    </div>
  )
}
