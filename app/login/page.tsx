'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../logo'

export default function LoginPage() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true); setErr('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    })
    if (res.ok) { router.push('/'); router.refresh() }
    else { setErr('Falsches Passwort'); setLoading(false) }
  }

  const ink = '#10262d', mute = '#58707a'
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', background: '#e6eff1', color: ink }}>
      <div style={{ width: '100%', maxWidth: 440, padding: '44px clamp(24px,6vw,44px)', borderRadius: 32, background: '#fff', boxShadow: '0 20px 60px rgba(16,38,45,.10)', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Logo size={56} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: 36, lineHeight: 1.1, fontFamily: "'Bricolage Grotesque',Georgia,sans-serif", fontWeight: 600, letterSpacing: '-0.02em' }}>Supplement Ratings</h1>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: mute }}>Deine ESN- und MORE-Produkte, ehrlich bewertet.</p>
          </div>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label htmlFor="pw" style={{ fontSize: 14, fontWeight: 600 }}>Passwort</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 56, padding: '0 18px', background: '#e6eff1', borderRadius: 16, color: mute }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            <input id="pw" type="password" placeholder="Passwort eingeben" value={pw} onChange={e => setPw(e.target.value)} autoComplete="current-password"
              style={{ flexGrow: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: 17, color: ink, fontFamily: 'inherit' }} />
          </div>
          {err && <p role="alert" style={{ margin: 0, fontSize: 14, color: '#b3261e' }}>{err}</p>}
          <button type="submit" disabled={loading || !pw}
            style={{ height: 56, border: 'none', borderRadius: 16, background: ink, color: '#fff', fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: loading || !pw ? 'not-allowed' : 'pointer', opacity: loading || !pw ? 0.6 : 1, fontFamily: 'inherit' }}>
            {loading ? 'Prüfe…' : 'Entsperren'}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </form>
      </div>
    </div>
  )
}
