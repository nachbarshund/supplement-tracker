'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// flavour-heaven.de CDN - all MORE Nutrition product images
// Served via /api/img proxy to avoid CORS/hotlink issues
const FH = 'https://flavour-heaven.de/cdn/shop/files/'
function img(file: string, w = 400) {
  return `/api/img?url=${encodeURIComponent(`${FH}${file}?width=${w}`)}`
}

const CATS = [
  { id: 'zerup', label: 'Zerup', sub: 'Zero Sirup · 65ml', brand: 'more', e: '🧃',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 42, v: [
      { n: 'Mango Lime', c: 5, img: img('zerup-mango-lime-ai-product.jpg', 120) },
      { n: 'Peach Iced Tea', c: 4, img: img('zerup-peach-iced-tea-aiimg122.jpg', 120) },
      { n: 'Honey Melon', c: 4, img: img('zerup-honey-melon-ai-product.jpg', 120) },
      { n: 'Cola Orange', c: 4, img: img('zerup-cola-orange-ai-product.jpg', 120) },
      { n: 'Mojito', c: 2, img: img('zerup-mojito-ai-product.jpg', 120) },
      { n: 'Strawberry Daiquiri', c: 2, img: img('zerup-strawberry-daiquiri-ai-product.jpg', 120) },
      { n: 'Hugo', c: 2, img: img('zerup-hugo-ai-product.jpg', 120) },
      { n: 'Pina Colada', c: 2, img: img('zerup-pina-colada-ai-product.jpg', 120) },
      { n: 'Lemon Iced Tea', c: 2, img: img('zerup-lemon-iced-tea-aiimg123.jpg', 120) },
      { n: 'Pink Boost', c: 2, img: img('zerup-pink-boost-ai-product.jpg', 120) },
      { n: 'White Boost', c: 2, img: img('zerup-white-boost-ai-product.jpg', 120) },
      { n: 'Birne', c: 2, img: img('zerup-zero-sirup-aiimg119.jpg', 120) },
      { n: 'Apple Cranberry', c: 2, img: img('zerup-zero-sirup-aiimg119.jpg', 120) },
      { n: 'Peach Hibiscus', c: 2, img: img('zerup-peach-holunder-iced-tea-ai-product.jpg', 120) },
      { n: 'Caipirinha', c: 2, img: img('zerup-caipirinha-ai-product.jpg', 120) },
      { n: 'Krauter-Limonade', c: 2, img: img('zerup-kraeuter-limonade-ai-product.jpg', 120) },
      { n: 'Birne Melisse', c: 2, img: img('zerup-birne-melisse-ai-product.jpg', 120) },
      { n: 'Blackcurrant Kiwi', c: 2, img: img('zerup-blackcurrant-kiwiberries-ai-product.jpg', 120) },
      { n: 'Pineapple', c: 2, img: img('zerup-pineapple-ai-product.jpg', 120) },
      { n: 'Cherry Cola', c: 1, img: img('zerup-cherry-cola-ai-product.jpg', 120) },
      { n: 'Cherry Pomegranate', c: 1, img: img('zerup-cherry-kissed-pomegranate-ai-product.jpg', 120) },
      { n: 'White Peach Sour', c: 1, img: img('zerup-white-peach-sour-ai-product.jpg', 120) },
      { n: 'Mandarin', c: 1, img: img('zerup-mandarin-ai-product.jpg', 120) },
      { n: 'Hitschies Pfirsich', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'sauce', label: 'Light Gourmet Sauce', sub: 'Kalorienarm · 285ml', brand: 'more', e: '🫙',
    hero: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 800),
    thumb: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 100),
    tu: 14, v: [
      { n: 'Trüffel Mayo', c: 6, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Teriyaki', c: 3, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Balsamico Garlic', c: 3, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'BBQ Teriyaki', c: 3, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Light Mayo', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Creamy Honey Mustard', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Creamy Mushroom', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
    ]},
  { id: 'pic', label: 'Protein Iced Coffee', sub: 'High Protein · 500g', brand: 'more', e: '☕',
    hero: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 800),
    thumb: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 100),
    tu: 10, v: [
      { n: 'Dark Chocolate Lover', c: 3, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Brownie Marshmallow', c: 2, img: img('protein-iced-coffee-brownie-marshmallow-ai-product.jpg', 120) },
      { n: 'Cafe Frappe Style', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Dark Choco Cookie', c: 1, img: img('protein-iced-coffee-dark-cookie-crumble-ai-product.jpg', 120) },
      { n: 'Creme Brulee', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Chocolate Amaretto', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Salted Caramel Brownie', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
    ]},
  { id: 'protein', label: 'More Protein', sub: 'Milkshake Style · 600g', brand: 'more', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 8, v: [
      { n: 'Chocolate Brownie', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Cinnalicious', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Choco Coco', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Vanilla Ice Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Chocolate Crispy Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'chunky', label: 'Chunky Flavour', sub: 'Dessert Drops · 150g', brand: 'more', e: '🍨',
    hero: img('chunky-flavour-donauwelle-ai-product.jpg', 800),
    thumb: img('chunky-flavour-donauwelle-ai-product.jpg', 100),
    tu: 7, v: [
      { n: 'Milky Cream Cake', c: 1, img: img('chunky-flavour-milky-cream-cake-ai-product.jpg', 120) },
      { n: 'Donauwelle', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Spaghetti Ice Cream', c: 1, img: img('chunky-flavour-aiimg137.jpg', 120) },
      { n: 'Ultra Dark Chocolate', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Milchreis Zimt', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Waldfrucht Panna Cotta', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Morezipan White Choco', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
    ]},
  { id: 'satisbites', label: 'Protein Satisbites', sub: 'Protein Snack · 2×25g', brand: 'more', e: '🍫',
    hero: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 800),
    thumb: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 100),
    tu: 5, v: [
      { n: 'White Choco Strawberry', c: 1, img: img('satisbites-white-chocolate-blueberry-cheesecake-ai-product.jpg', 120) },
      { n: 'White Choco Coffee', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
      { n: 'Dark Choco Hazelnut', c: 1, img: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 120) },
      { n: 'Milk Choco Coconut', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
      { n: 'White Choco Blueberry', c: 1, img: img('satisbites-white-chocolate-blueberry-cheesecake-ai-product.jpg', 120) },
    ]},
  { id: 'chips', label: 'Protein Tortilla Chips', sub: 'High Protein Snack', brand: 'more', e: '🌮',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 3, v: [
      { n: 'Western Style', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
      { n: 'Ketchup', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
      { n: 'Bruschetta Rosemary', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'clearprotein', label: 'More Clear Protein', sub: 'Juice Style · 600g', brand: 'more', e: '🫗',
    hero: img('zerup-peach-iced-tea-aiimg122.jpg', 800),
    thumb: img('zerup-peach-iced-tea-aiimg122.jpg', 100),
    tu: 3, v: [
      { n: 'Peach Passionfruit', c: 1, img: img('zerup-peach-iced-tea-aiimg122.jpg', 120) },
      { n: 'Juice Mango', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
      { n: 'Pink Peach Lemonade', c: 1, img: img('zerup-pink-boost-ai-product.jpg', 120) },
    ]},
  { id: 'fizi', label: 'More FIZI', sub: 'Sparkling · 330ml', brand: 'more', e: '🫧',
    hero: img('zerup-mojito-ai-product.jpg', 800),
    thumb: img('zerup-mojito-ai-product.jpg', 100),
    tu: 4, v: [
      { n: 'Mojito', c: 1, img: img('zerup-mojito-ai-product.jpg', 120) },
      { n: 'Orange', c: 1, img: img('zerup-cola-orange-ai-product.jpg', 120) },
      { n: 'White Peach', c: 1, img: img('zerup-white-peach-sour-ai-product.jpg', 120) },
      { n: 'Lemon Lime', c: 1, img: img('zerup-lemon-iced-tea-aiimg123.jpg', 120) },
    ]},
  { id: 'esn-stack', label: 'ESN Athlete Stack', sub: 'Men · 210 Kapseln', brand: 'esn', e: '💊',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 5, v: [
      { n: '210 Kapseln', c: 5, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'esn-ess', label: 'ESN Essentials', sub: 'Multivitamin · 180 Kapseln', brand: 'esn', e: '💊',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 4, v: [
      { n: '180 Kapseln', c: 4, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'esn-whey', label: 'ESN Designer Whey', sub: 'Protein Powder · 908g', brand: 'esn', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 3, v: [
      { n: 'Strawberry Cream 908g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Peanutbutter Cup 908g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Banana Milk 1000g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'esn-sauce', label: 'ESN Fitness Sauce', sub: 'Premium Ultra · 285ml', brand: 'esn', e: '🫙',
    hero: img('light-sauce-teriyaki-ai-product.jpg', 800),
    thumb: img('light-sauce-teriyaki-ai-product.jpg', 100),
    tu: 3, v: [
      { n: 'BBQ', c: 1, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Chipotle', c: 1, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Grill Allrounder', c: 1, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
    ]},
  { id: 'esn-bar', label: 'ESN Designer Bar', sub: 'Protein Riegel · 45g', brand: 'esn', e: '🍫',
    hero: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 800),
    thumb: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 100),
    tu: 2, v: [
      { n: 'Tropical Vanilla', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
      { n: 'Dark Choco Raspberry', c: 1, img: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 120) },
    ]},
]

type Cat = typeof CATS[0]
const B: Record<string, { color: string; label: string }> = {
  more: { color: '#FF3B30', label: 'MORE' },
  esn:  { color: '#007AFF', label: 'ESN'  },
}

function Stars({ v, on, s = 18, d }: { v: number; on?: (x: number) => void; s?: number; d: boolean }) {
  const [h, sH] = useState(0)
  const f = d ? '#FFD60A' : '#FF9500', e = d ? '#3A3A3C' : '#D1D1D6'
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(x => (
        <svg key={x} width={s} height={s} viewBox="0 0 24 24" fill={x<=(h||v)?f:e}
          style={{ cursor:on?'pointer':'default', transition:'fill .12s', flexShrink:0 }}
          onClick={() => on && on(x===v?0:x)}
          onMouseEnter={() => on && sH(x)} onMouseLeave={() => on && sH(0)}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function ProxyImg({ src, alt, style, fallback = '📦' }: { src: string; alt: string; style?: React.CSSProperties; fallback?: string }) {
  const [err, setErr] = useState(false)
  if (err) return <div style={{ ...style, display:'flex', alignItems:'center', justifyContent:'center', fontSize: 28 }}>{fallback}</div>
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />
}

function VRow({ v, rank, max, acc, rat, onR, note, onN, dark, last }: any) {
  const pct = Math.max(4, (v.c / max) * 100)
  const tp = dark?'#FFF':'#000', ts = dark?'#8E8E93':'#6C6C70'
  const bc = dark?'#2C2C2E':'#E5E5EA', ib = dark?'#2C2C2E':'#F2F2F7'
  return (
    <div style={{ display:'flex', gap:12, padding:'12px 20px', borderBottom:last?'none':`1px solid ${bc}`, alignItems:'flex-start' }}>
      <div style={{ width:52, height:52, borderRadius:10, overflow:'hidden', flexShrink:0, background:dark?'#2C2C2E':'#F2F2F7' }}>
        <ProxyImg src={v.img} alt={v.n} style={{ width:'100%', height:'100%', objectFit:'cover' }} fallback={v.e||'📦'} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
          <span style={{ fontSize:11, fontWeight:600, color:ts, minWidth:22, flexShrink:0 }}>#{rank}</span>
          <span style={{ fontSize:14, fontWeight:500, color:tp, flex:1, lineHeight:1.3 }}>{v.n}</span>
          <span style={{ fontSize:12, fontWeight:700, color:acc, flexShrink:0 }}>×{v.c}</span>
        </div>
        <div style={{ height:3, background:dark?'#3A3A3C':'#E5E5EA', borderRadius:2, marginBottom:8, marginLeft:30 }}>
          <div style={{ height:'100%', width:`${pct}%`, background:acc, borderRadius:2, transition:'width .4s ease' }}/>
        </div>
        <div style={{ marginLeft:30 }}><Stars v={rat} on={onR} s={17} d={dark}/></div>
        {rat > 0 && (
          <input placeholder="Notiz…" value={note} onChange={e => onN(e.target.value)}
            style={{ marginTop:8, marginLeft:30, width:'calc(100% - 30px)', background:ib, border:'none', borderRadius:8, color:tp, fontSize:13, padding:'7px 10px', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}/>
        )}
      </div>
    </div>
  )
}

function Card({ cat, rats, notes, onR, onN, dark }: { cat: Cat; rats: Record<string,number>; notes: Record<string,string>; onR:(ci:string,vn:string,x:number)=>void; onN:(ci:string,vn:string,x:string)=>void; dark:boolean }) {
  const [open, sO] = useState(false)
  const br = B[cat.brand]
  const maxC = Math.max(...cat.v.map(v => v.c))
  const tr = cat.v.filter(v => (rats[v.n]||0) > 0).length
  const avg = tr > 0 ? cat.v.reduce((s,v) => s + (rats[v.n]||0), 0) / tr : 0
  const bg = dark?'#1C1C1E':'#FFF', bs = dark?'#2C2C2E':'#F2F2F7'
  const tp = dark?'#FFF':'#000', ts = dark?'#8E8E93':'#6C6C70', bc = dark?'#3A3A3C':'#E5E5EA'
  return (
    <div style={{ borderRadius:16, overflow:'hidden', background:bg, marginBottom:10, boxShadow:dark?'0 0 0 0.5px rgba(255,255,255,.1)':'0 1px 4px rgba(0,0,0,.1),0 0 0 0.5px rgba(0,0,0,.05)' }}>
      <div onClick={() => sO(o => !o)} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 20px', cursor:'pointer', userSelect:'none' }}>
        {/* Category thumbnail via proxy */}
        <div style={{ width:44, height:44, borderRadius:11, overflow:'hidden', flexShrink:0, background:br.color+'18' }}>
          <ProxyImg src={cat.thumb} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} fallback={cat.e} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:15, fontWeight:600, color:tp, letterSpacing:-.2 }}>{cat.label}</div>
          <div style={{ fontSize:12, color:ts, marginTop:1 }}>
            <span style={{ color:br.color, fontWeight:600, marginRight:4 }}>{br.label}</span>
            {cat.tu} bestellt · {cat.v.length} Sorten
            {avg > 0 && <span style={{ marginLeft:5, color:dark?'#FFD60A':'#FF9500' }}>{'★'.repeat(Math.round(avg))}{'☆'.repeat(5-Math.round(avg))}</span>}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:18, flexShrink:0 }}>
          {cat.v.slice(0,8).map((v,i) => <div key={i} style={{ width:3, height:`${Math.max(20,(v.c/maxC)*100)}%`, background:br.color, borderRadius:2, opacity:.8 }}/>)}
        </div>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={ts} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink:0, transform:open?'rotate(180deg)':'none', transition:'transform .2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      {open && (
        <>
          {/* Hero image */}
          <div style={{ height:240, position:'relative', overflow:'hidden', background:bs, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ProxyImg src={cat.hero} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} fallback={cat.e} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 50%)' }}/>
            <div style={{ position:'absolute', bottom:14, left:20, right:20 }}>
              <div style={{ fontSize:18, fontWeight:700, color:'#FFF', letterSpacing:-.3 }}>{cat.label}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.75)', marginTop:2 }}>{cat.sub}</div>
            </div>
            <div style={{ position:'absolute', top:12, right:12, background:br.color, borderRadius:6, padding:'2px 8px', fontSize:10, fontWeight:700, color:'#FFF', letterSpacing:.5 }}>{br.label}</div>
          </div>
          <div style={{ padding:'10px 20px 2px', fontSize:11, fontWeight:700, color:ts, letterSpacing:.8, textTransform:'uppercase', borderTop:`1px solid ${bc}` }}>Sortenranking</div>
          {[...cat.v].sort((a,b) => b.c-a.c).map((v,i) => (
            <VRow key={v.n} v={v} rank={i+1} max={maxC} acc={br.color}
              rat={rats[v.n]||0} onR={(x:number) => onR(cat.id,v.n,x)}
              note={notes[v.n]||''} onN={(x:string) => onN(cat.id,v.n,x)}
              dark={dark} last={i===cat.v.length-1}/>
          ))}
        </>
      )}
    </div>
  )
}

export default function TrackerApp() {
  const [dark, sD] = useState(true)
  const [rats, sR] = useState<Record<string,Record<string,number>>>({})
  const [notes, sN] = useState<Record<string,Record<string,string>>>({})
  const [brand, sB] = useState('all')
  const [sort, sS] = useState('count')
  const [sv, sSv] = useState('idle')
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') sD(window.matchMedia('(prefers-color-scheme: dark)').matches)
    fetch('/api/ratings').then(r => r.json()).then(d => {
      if (d.ratings) sR(d.ratings)
      if (d.notes) sN(d.notes)
    }).catch(() => {})
  }, [])

  const save = useCallback((r: typeof rats, n: typeof notes) => {
    if (timer.current) clearTimeout(timer.current); sSv('saving')
    timer.current = setTimeout(async () => {
      try {
        await fetch('/api/ratings', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ratings:r,notes:n}) })
        sSv('saved'); setTimeout(() => sSv('idle'), 2000)
      } catch { sSv('error') }
    }, 800)
  }, [])

  const onR = (ci:string,vn:string,x:number) => { const nr={...rats,[ci]:{...(rats[ci]||{}),[vn]:x}}; sR(nr); save(nr,notes) }
  const onN = (ci:string,vn:string,x:string) => { const nn={...notes,[ci]:{...(notes[ci]||{}),[vn]:x}}; sN(nn); save(rats,nn) }

  const cats = CATS.filter(c => brand==='all'||c.brand===brand).sort((a,b) => sort==='count'?b.tu-a.tu:a.label.localeCompare(b.label))
  const tot = CATS.reduce((s,c) => s+c.tu, 0)
  const rated = Object.values(rats).reduce((s,r) => s+Object.values(r).filter(x=>x>0).length, 0)
  const picks: Array<{cat:Cat;vn:string;stars:number;note:string}> = []
  for (const cat of CATS)
    for (const [vn,stars] of Object.entries(rats[cat.id]||{}))
      if (stars >= 4) picks.push({cat,vn,stars,note:(notes[cat.id]||{})[vn]||''})
  picks.sort((a,b) => b.stars-a.stars)

  const bg=dark?'#000':'#F2F2F7', bgC=dark?'#1C1C1E':'#FFF'
  const tp=dark?'#FFF':'#000', ts=dark?'#8E8E93':'#6C6C70'
  const br=dark?'#3A3A3C':'#E5E5EA', sb=dark?'#1C1C1E':'#E5E5EA', sa=dark?'#636366':'#FFF'

  return (
    <div style={{ minHeight:'100vh', background:bg, color:tp, fontFamily:'-apple-system,BlinkMacSystemFont,SF Pro Display,Helvetica Neue,sans-serif', paddingBottom:80 }}>
      <div style={{ padding:'56px 20px 0', position:'sticky', top:0, zIndex:100, background:bg, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:2 }}>
          <div>
            <h1 style={{ fontSize:32, fontWeight:700, margin:0, letterSpacing:-.5, color:tp, lineHeight:1.1 }}>Supplements</h1>
            <p style={{ margin:'3px 0 0', fontSize:13, color:ts }}>
              {tot} Einheiten · {rated} bewertet
              {sv==='saving'&&<span style={{ color:'#FF9500', marginLeft:8 }}>Speichert…</span>}
              {sv==='saved'&&<span style={{ color:'#34C759', marginLeft:8 }}>✓ Gespeichert</span>}
              {sv==='error'&&<span style={{ color:'#FF3B30', marginLeft:8 }}>✕ Fehler</span>}
            </p>
          </div>
          <button onClick={() => sD(d=>!d)} style={{ background:sb, border:'none', borderRadius:10, width:38, height:38, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:17, flexShrink:0 }}>
            {dark?'☀️':'🌙'}
          </button>
        </div>
        <div style={{ display:'flex', gap:8, marginTop:14, marginBottom:10 }}>
          <div style={{ display:'flex', background:sb, borderRadius:9, padding:2 }}>
            {['all','more','esn'].map(x => (
              <button key={x} onClick={() => sB(x)}
                style={{ padding:'5px 11px', borderRadius:7, border:'none', background:brand===x?sa:'transparent', color:brand===x?tp:ts, fontSize:13, fontWeight:brand===x?600:400, cursor:'pointer', transition:'all .15s', boxShadow:brand===x&&!dark?'0 1px 2px rgba(0,0,0,.12)':'none' }}>
                {x==='all'?'Alle':x.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => sS(s=>s==='count'?'alpha':'count')} style={{ background:sb, border:'none', borderRadius:9, padding:'5px 11px', color:ts, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
            {sort==='count'?'↓ Menge':'A–Z'}
          </button>
        </div>
        <div style={{ height:.5, background:br, marginLeft:-20, marginRight:-20 }}/>
      </div>

      <div style={{ padding:'10px 20px 0' }}>
        {cats.map(cat => (
          <Card key={cat.id} cat={cat} rats={rats[cat.id]||{}} notes={notes[cat.id]||{}} onR={onR} onN={onN} dark={dark}/>
        ))}
      </div>

      {picks.length > 0 && (
        <div style={{ padding:'16px 20px 0' }}>
          <div style={{ fontSize:20, fontWeight:700, color:tp, letterSpacing:-.3, marginBottom:10 }}>⭐️ Top Picks</div>
          <div style={{ background:bgC, borderRadius:16, overflow:'hidden', boxShadow:dark?'0 0 0 0.5px rgba(255,255,255,.1)':'0 1px 4px rgba(0,0,0,.1)' }}>
            {picks.map(({cat,vn,stars,note},i) => {
              const b = B[cat.brand]
              return (
                <div key={cat.id+vn} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 20px', borderBottom:i<picks.length-1?`0.5px solid ${br}`:'none' }}>
                  <span style={{ fontSize:18 }}>{cat.e}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:tp, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{vn}</div>
                    <div style={{ fontSize:11, color:ts }}>{cat.label} · <span style={{ color:b.color }}>{b.label}</span>{note?` · ${note}`:''}</div>
                  </div>
                  <Stars v={stars} s={13} d={dark}/>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
