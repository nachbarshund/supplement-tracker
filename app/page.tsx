'use client'
import { useState } from 'react'

const FH = 'https://flavour-heaven.de/cdn/shop/files/'
function p(file: string, w = 400) {
  return `/api/img?url=${encodeURIComponent(`${FH}${file}?width=${w}`)}`
}

function Img({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  if (err) return <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🧃</div>
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />
}

export default function Page() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: '-apple-system,sans-serif', padding: '40px 20px' }}>
      <h1 style={{ color: '#FFF', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
        🧪 Bild-Test: Zerup via /api/img Proxy
      </h1>

      <div style={{ borderRadius: 16, overflow: 'hidden', background: '#1C1C1E', maxWidth: 440, boxShadow: '0 0 0 0.5px rgba(255,255,255,.1)' }}>
        
        {/* Card header */}
        <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 20px', cursor: 'pointer' }}>
          <div style={{ width: 44, height: 44, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}>
            <Img src={p('zerup-mango-lime-ai-product.jpg', 100)} alt="Zerup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#FFF' }}>Zerup</div>
            <div style={{ fontSize: 12, color: '#8E8E93' }}>
              <span style={{ color: '#FF3B30', fontWeight: 600, marginRight: 4 }}>MORE</span>
              42 bestellt · 24 Sorten
            </div>
          </div>
          <div style={{ marginLeft: 'auto', color: '#8E8E93' }}>{open ? '▲' : '▼'}</div>
        </div>

        {open && <>
          {/* Hero */}
          <div style={{ height: 240, position: 'relative', overflow: 'hidden', background: '#2C2C2E' }}>
            <Img src={p('zerup-mango-lime-ai-product.jpg', 800)} alt="Zerup"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 14, left: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FFF' }}>Zerup</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.75)' }}>Zero Sirup · 65ml</div>
            </div>
            <div style={{ position: 'absolute', top: 12, right: 12, background: '#FF3B30', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, color: '#FFF' }}>MORE</div>
          </div>

          <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, color: '#8E8E93', letterSpacing: .8, textTransform: 'uppercase', borderTop: '1px solid #3A3A3C' }}>
            Sortenranking
          </div>

          {[
            { name: 'Mango Lime', count: 5, file: 'zerup-mango-lime-ai-product.jpg' },
            { name: 'Peach Iced Tea', count: 4, file: 'zerup-peach-iced-tea-aiimg122.jpg' },
            { name: 'Honey Melon', count: 4, file: 'zerup-honey-melon-ai-product.jpg' },
            { name: 'Cola Orange', count: 4, file: 'zerup-cola-orange-ai-product.jpg' },
          ].map((v, i, arr) => (
            <div key={v.name} style={{ display: 'flex', gap: 12, padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid #2C2C2E' : 'none', alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#2C2C2E' }}>
                <Img src={p(v.file, 120)} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#FFF' }}>{v.name}</div>
                <div style={{ height: 3, background: '#3A3A3C', borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: '100%', width: `${(v.count / 5) * 100}%`, background: '#FF3B30', borderRadius: 2 }} />
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#FF3B30' }}>×{v.count}</span>
            </div>
          ))}
        </>}
      </div>

      <p style={{ color: '#8E8E93', fontSize: 13, marginTop: 20, lineHeight: 1.6 }}>
        Bilder kommen von <code style={{ color: '#FF3B30' }}>flavour-heaven.de/cdn/shop/files/</code><br/>
        via <code style={{ color: '#34C759' }}>/api/img?url=...</code> Proxy-Route<br/>
        Karte aufklappen → Hero + Thumbnails laden
      </p>
    </div>
  )
}
