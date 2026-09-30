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
    tu: 46, v: [
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
      { n: 'Infused Strawberry Mint', c: 2, img: img('zerup-strawberry-daiquiri-ai-product.jpg', 120) },
      { n: 'Cactus Fruit', c: 2, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'sauce', label: 'Light Gourmet Sauce', sub: 'Kalorienarm · 285ml', brand: 'more', e: '🫙',
    hero: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 800),
    thumb: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 100),
    tu: 16, v: [
      { n: 'Trüffel Mayo', c: 6, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Teriyaki', c: 3, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Balsamico Garlic', c: 3, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'BBQ Teriyaki', c: 3, img: img('light-sauce-teriyaki-ai-product.jpg', 120) },
      { n: 'Light Mayo', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Creamy Honey Mustard', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'Creamy Mushroom', c: 1, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
      { n: 'True Curry Ketchup', c: 2, img: img('light-gourmet-sauce-trueffel-mayo-ai-product.jpg', 120) },
    ]},
  { id: 'pic', label: 'Protein Iced Coffee', sub: 'High Protein · 500g', brand: 'more', e: '☕',
    hero: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 800),
    thumb: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 100),
    tu: 12, v: [
      { n: 'Dark Chocolate Lover', c: 4, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Brownie Marshmallow', c: 2, img: img('protein-iced-coffee-brownie-marshmallow-ai-product.jpg', 120) },
      { n: 'Cafe Frappe Style', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Dark Choco Cookie', c: 1, img: img('protein-iced-coffee-dark-cookie-crumble-ai-product.jpg', 120) },
      { n: 'Creme Brulee', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Chocolate Amaretto', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Salted Caramel Brownie', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
      { n: 'Latte Macchiato', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
    ]},
  { id: 'protein', label: 'More Protein', sub: 'Milkshake Style · 600g', brand: 'more', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 15, v: [
      { n: 'Chocolate Brownie', c: 3, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Cinnalicious', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Choco Coco', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Vanilla Ice Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Chocolate Crispy Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Strawberry', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Vanilla Chocolate Chip Cookie', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Chocolate Drink', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'chunky', label: 'Chunky Flavour', sub: 'Dessert Drops · 150g', brand: 'more', e: '🍨',
    hero: img('chunky-flavour-donauwelle-ai-product.jpg', 800),
    thumb: img('chunky-flavour-donauwelle-ai-product.jpg', 100),
    tu: 12, v: [
      { n: 'Milky Cream Cake', c: 1, img: img('chunky-flavour-milky-cream-cake-ai-product.jpg', 120) },
      { n: 'Donauwelle', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Spaghetti Ice Cream', c: 1, img: img('chunky-flavour-aiimg137.jpg', 120) },
      { n: 'Ultra Dark Chocolate', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Milchreis Zimt', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Waldfrucht Panna Cotta', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Morezipan White Choco', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Dragonfruit Coconut', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Stracciatella', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Vanilla Chocolate Balls', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Banana Perfection', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
      { n: 'Vanilla Chocolate Chip Cookie', c: 1, img: img('chunky-flavour-donauwelle-ai-product.jpg', 120) },
    ]},
  { id: 'satisbites', label: 'Protein Satisbites', sub: 'Protein Snack · 2×25g', brand: 'more', e: '🍫',
    hero: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 800),
    thumb: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 100),
    tu: 8, v: [
      { n: 'White Choco Strawberry', c: 1, img: img('satisbites-white-chocolate-blueberry-cheesecake-ai-product.jpg', 120) },
      { n: 'White Choco Coffee', c: 2, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
      { n: 'Dark Choco Hazelnut', c: 1, img: img('satisbites-dark-chocolate-hazelnut-pralin-ai-product.jpg', 120) },
      { n: 'Milk Choco Coconut', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
      { n: 'White Choco Blueberry', c: 1, img: img('satisbites-white-chocolate-blueberry-cheesecake-ai-product.jpg', 120) },
      { n: 'Pink Raspberry Cheesecake', c: 1, img: img('satisbites-white-chocolate-blueberry-cheesecake-ai-product.jpg', 120) },
      { n: 'Milk Choco Banana Walnut', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
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
    tu: 5, v: [
      { n: 'Peach Passionfruit', c: 2, img: img('zerup-peach-iced-tea-aiimg122.jpg', 120) },
      { n: 'Juice Mango', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
      { n: 'Pink Peach Lemonade', c: 1, img: img('zerup-pink-boost-ai-product.jpg', 120) },
      { n: 'Lemon Iced Tea', c: 1, img: img('zerup-lemon-iced-tea-aiimg123.jpg', 120) },
    ]},
  { id: 'fizi', label: 'More FIZI', sub: 'Sparkling · 330ml', brand: 'more', e: '🫧',
    hero: img('zerup-mojito-ai-product.jpg', 800),
    thumb: img('zerup-mojito-ai-product.jpg', 100),
    tu: 6, v: [
      { n: 'Mojito', c: 1, img: img('zerup-mojito-ai-product.jpg', 120) },
      { n: 'Orange', c: 2, img: img('zerup-cola-orange-ai-product.jpg', 120) },
      { n: 'White Peach', c: 1, img: img('zerup-white-peach-sour-ai-product.jpg', 120) },
      { n: 'Lemon Lime', c: 1, img: img('zerup-lemon-iced-tea-aiimg123.jpg', 120) },
      { n: 'Mango', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'esn-stack', label: 'ESN Athlete Stack', sub: 'Men · 210 Kapseln', brand: 'esn', e: '💊',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 6, v: [
      { n: '210 Kapseln', c: 6, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'esn-ess', label: 'ESN Essentials', sub: 'Multivitamin · 180 Kapseln', brand: 'esn', e: '💊',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 5, v: [
      { n: '180 Kapseln', c: 5, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'esn-whey', label: 'ESN Designer Whey', sub: 'Protein Powder · 908g', brand: 'esn', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 4, v: [
      { n: 'Strawberry Cream 908g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Peanutbutter Cup 908g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
      { n: 'Banana Milk 1000g', c: 2, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
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
  { id: 'milkyccino', label: 'More Protein Milkyccino', sub: 'Kaffee Style · 500g', brand: 'more', e: '☕',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Chocolate Crispy Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'backprotein', label: 'More Back Protein', sub: 'Backmischung · 600g', brand: 'more', e: '🧁',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Sahne', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'peanutflips', label: 'More Protein Peanut Flips', sub: 'Protein Snack · 6×50g', brand: 'more', e: '🥜',
    hero: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 800),
    thumb: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Erdnuss', c: 1, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
    ]},
  { id: 'collagen', label: 'MORE Collagen+', sub: 'Collagen · 300g', brand: 'more', e: '✨',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Neutral', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
  { id: 'griess', label: 'More Protein Grießpudding', sub: 'Protein Dessert · 60g', brand: 'more', e: '🍮',
    hero: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 800),
    thumb: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 100),
    tu: 11, v: [
      { n: 'Original Taste', c: 11, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
    ]},
  { id: 'porridge', label: 'More Protein Porridge', sub: 'Frühstück · 62g', brand: 'more', e: '🥣',
    hero: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 800),
    thumb: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 100),
    tu: 5, v: [
      { n: 'Original Taste', c: 5, img: img('satisbites-milk-chocolate-coconut-ai-product.jpg', 120) },
    ]},
  { id: 'esn-basic', label: 'ESN Basic Whey', sub: 'Protein Powder · 1000g', brand: 'esn', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Neutral 1000g', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'esn-flex', label: 'ESN Flexpresso', sub: 'Protein Kaffee · 908g', brand: 'esn', e: '☕',
    hero: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 800),
    thumb: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Dark Chocolate Mocha', c: 1, img: img('protein-iced-coffee-dark-chocolate-lover-ai-product.jpg', 120) },
    ]},
  { id: 'esn-creamy', label: 'ESN Designer Protein Extra Creamy', sub: 'Protein Powder · 480g', brand: 'esn', e: '🥛',
    hero: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 800),
    thumb: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Dark Cookies & Cream', c: 1, img: img('protein-milkshake-chocolate-brownie-ai-product.jpg', 120) },
    ]},
  { id: 'esn-drip', label: 'ESN Daily Drip Electrolyte Boost', sub: 'Elektrolyte · 14×13g', brand: 'esn', e: '💧',
    hero: img('zerup-mango-lime-ai-product.jpg', 800),
    thumb: img('zerup-mango-lime-ai-product.jpg', 100),
    tu: 1, v: [
      { n: 'Pink Grapefruit', c: 1, img: img('zerup-mango-lime-ai-product.jpg', 120) },
    ]},
]

import Logo from './logo'

type Cat = typeof CATS[0]
type Item = { cat: Cat; v: Cat['v'][0]; stars: number; note: string }

const C = {
  bg: '#e6eff1', card: '#ffffff', ink: '#10262d', mute: '#58707a', line: '#dbe6e8',
  teal: '#1f7a85', tealDark: '#0f3f48', amber: '#f0a52b', starOff: '#c3d2d6',
  esnBg: '#d6ebee', esnFg: '#155f69', moreBg: '#ece4f7', moreFg: '#5a3d91',
  openBg: '#fdeccf', openFg: '#7a4d05',
}
const BR: Record<string, { bg: string; fg: string; label: string; letter: string }> = {
  more: { bg: C.moreBg, fg: C.moreFg, label: 'MORE', letter: 'M' },
  esn:  { bg: C.esnBg,  fg: C.esnFg,  label: 'ESN',  letter: 'E' },
}
const DISPLAY = "'Bricolage Grotesque',Georgia,sans-serif"
const STAR = 'M12 3.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 17l-5.4 3 1.2-6L3.3 9.8l6.1-.7z'
const LS = 'supplement-ratings-v1'
const fmt = (n: number) => n.toFixed(1).replace('.', ',')

const CSS = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
#start,#bestenliste,#produkte{scroll-margin-top:16px}
.app{display:flex;min-height:100vh;background:${C.bg};color:${C.ink};font-family:'Hanken Grotesk',system-ui,sans-serif}
.side{width:88px;flex-shrink:0;position:sticky;top:0;height:100vh;padding:28px 0;display:flex;flex-direction:column;align-items:center;gap:28px;background:#fff;border-radius:0 32px 32px 0}
.main{flex:1;min-width:0;padding:40px;display:flex;flex-direction:column;gap:16px}
.row2{display:flex;gap:16px}
.row2>.grow{flex:1;min-width:0}
.hero-chips{position:absolute;right:32px;top:40px;display:flex;flex-direction:column;gap:12px;align-items:flex-end}
.groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:48px;row-gap:24px}
.bnav{display:none}
.search{width:280px}
.h1{font-size:40px}
.pills{display:flex;gap:8px;flex-wrap:wrap}
button{font-family:inherit}
button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid ${C.teal};outline-offset:2px}
@media (max-width:900px){
  .side{display:none}
  .main{padding:24px 16px 120px;gap:14px}
  .row2{flex-direction:column}
  .hero-chips{display:none}
  .groups{grid-template-columns:1fr}
  .bnav{display:flex;position:fixed;left:16px;right:16px;bottom:16px;height:64px;border-radius:24px;background:#fff;box-shadow:0 8px 32px rgba(16,38,45,.14);justify-content:space-around;align-items:center;z-index:50}
  .search{width:100%}
  .h1{font-size:30px}
  .headrow{flex-direction:column;align-items:stretch!important;gap:16px}
}
`

function StarIcon({ on, s = 14 }: { on: boolean; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={on ? C.amber : 'none'} stroke={on ? C.amber : C.starOff}
      strokeWidth={on ? 1.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={STAR} />
    </svg>
  )
}

function Stars({ v, s = 14, on, label }: { v: number; s?: number; on?: (x: number) => void; label: string }) {
  if (!on) {
    return (
      <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }} aria-label={`${v} von 5 Sternen`}>
        {[1, 2, 3, 4, 5].map(x => <StarIcon key={x} on={x <= v} s={s} />)}
      </span>
    )
  }
  return (
    <span style={{ display: 'inline-flex', gap: 0, alignItems: 'center' }} role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map(x => (
        <button key={x} type="button" onClick={() => on(x === v ? 0 : x)} aria-label={`${x} von 5 Sternen`}
          style={{ border: 'none', background: 'none', padding: 4, margin: -2, cursor: 'pointer', display: 'flex' }}>
          <StarIcon on={x <= v} s={s} />
        </button>
      ))}
    </span>
  )
}

function Chip({ src, alt, brand, size = 48 }: { src?: string; alt: string; brand: string; size?: number }) {
  const [err, setErr] = useState(false)
  const b = BR[brand]
  const r = size * 0.32
  if (src && !err) {
    return (
      <div style={{ width: size, height: size, flexShrink: 0, borderRadius: r, overflow: 'hidden', background: C.bg }}>
        <img src={src} alt={alt} onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return (
    <div aria-hidden="true" style={{ width: size, height: size, flexShrink: 0, borderRadius: r, background: b.bg, color: b.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.3, fontWeight: 700, letterSpacing: '0.04em' }}>{b.letter}</div>
  )
}

function Card({ children, pad = 28, style }: { children: React.ReactNode; pad?: number | string; style?: React.CSSProperties }) {
  return <section style={{ background: C.card, borderRadius: 28, padding: pad, ...style }}>{children}</section>
}

function CardHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h2>
      {meta && <span style={{ fontSize: 14, color: C.mute }}>{meta}</span>}
    </div>
  )
}

const ico = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
const IcoHome = () => <svg {...ico}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></svg>
const IcoGrid = () => <svg {...ico}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
const IcoTrophy = () => <svg {...ico}><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4" /></svg>
const IcoLock = () => <svg {...ico}><path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5M15 8l4 4-4 4M19 12H9" /></svg>
const IcoSearch = () => <svg {...ico} width={18} height={18}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>

function NavBtn({ href, label, icon, active, onClick }: { href: string; label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <a href={href} aria-label={label} aria-current={active ? 'page' : undefined} onClick={onClick} style={{ width: 48, height: 48, borderRadius: 16, background: active ? C.ink : 'transparent', color: active ? '#fff' : C.mute, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>{icon}</a>
  )
}

function RateInline({ onR, label }: { onR: (x: number) => void; label: string }) {
  const [open, setOpen] = useState(false)
  if (open) return <Stars v={0} s={20} on={x => { onR(x); setOpen(false) }} label={label} />
  return (
    <button type="button" onClick={() => setOpen(true)}
      style={{ height: 36, padding: '0 16px', border: 'none', borderRadius: 12, background: C.teal, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Bewerten</button>
  )
}

function Group({ cat, items, onR, onN, forceOpen }: { cat: Cat; items: Item[]; onR: (ci: string, vn: string, x: number) => void; onN: (ci: string, vn: string, x: string) => void; forceOpen: boolean }) {
  const [all, setAll] = useState(false)
  const LIM = 6
  const shown = all || forceOpen ? items : items.slice(0, LIM)
  const b = BR[cat.brand]
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: C.mute, paddingBottom: 4, textTransform: 'uppercase' }}>
        {cat.label} <span style={{ fontWeight: 500, letterSpacing: 0 }}>· {cat.tu} bestellt</span>
      </div>
      {shown.map((it, i) => (
        <div key={it.v.n} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 0', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Chip src={it.v.img} alt={it.v.n} brand={cat.brand} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexGrow: 1, minWidth: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{it.v.n}</span>
              <span style={{ fontSize: 13, color: C.mute }}>{b.label} · ×{it.v.c}</span>
            </div>
            {it.stars === 0 && <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: C.openBg, color: C.openFg }}>Offen</span>}
            <Stars v={it.stars} s={16} on={x => onR(cat.id, it.v.n, x)} label={`${it.v.n} bewerten`} />
          </div>
          {it.stars > 0 && (
            <input aria-label={`Notiz zu ${it.v.n}`} placeholder="Notiz…" value={it.note} onChange={e => onN(cat.id, it.v.n, e.target.value)}
              style={{ marginLeft: 62, background: C.bg, border: 'none', borderRadius: 10, color: C.ink, fontSize: 14, padding: '9px 12px' }} />
          )}
        </div>
      ))}
      {!forceOpen && items.length > LIM && (
        <button type="button" onClick={() => setAll(a => !a)}
          style={{ alignSelf: 'flex-start', marginTop: 6, border: 'none', background: 'none', color: C.teal, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '6px 0' }}>
          {all ? 'Weniger anzeigen' : `Alle ${items.length} Sorten anzeigen`}
        </button>
      )}
    </div>
  )
}

export default function TrackerApp() {
  const [rats, sR] = useState<Record<string, Record<string, number>>>({})
  const [notes, sN] = useState<Record<string, Record<string, string>>>({})
  const [filter, sF] = useState<'all' | 'open' | 'esn' | 'more'>('all')
  const [q, sQ] = useState('')
  const [sv, sSv] = useState('idle')
  const [base, sBase] = useState<Record<string, Record<string, number>> | null>(null)
  const [nav, sNav] = useState('start')
  const [fresh, sFresh] = useState<Record<string, boolean>>({})
  const freshT = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let local: { ratings?: any; notes?: any } = {}
    try { local = JSON.parse(localStorage.getItem(LS) || '{}') } catch {}
    const has = (o: any) => o && Object.values(o).some((c: any) => Object.keys(c || {}).length)
    fetch('/api/ratings').then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() }).then(d => {
      const useLocal = !has(d.ratings) && has(local.ratings)
      const r = useLocal ? local.ratings : d.ratings || {}
      const n = useLocal ? local.notes || {} : d.notes || {}
      sR(r); sN(n); sBase(r)
      if (d.persistent === false) sSv('nopersist')
      if (useLocal) save(r, n)
    }).catch(() => { sR(local.ratings || {}); sN(local.notes || {}); sBase(local.ratings || {}); sSv('error') })
  }, [])

  useEffect(() => {
    const ids = ['start', 'bestenliste', 'produkte']
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1]
      sNav(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const save = useCallback((r: typeof rats, n: typeof notes) => {
    if (timer.current) clearTimeout(timer.current); sSv('saving')
    try { localStorage.setItem(LS, JSON.stringify({ ratings: r, notes: n })) } catch {}
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/ratings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ratings: r, notes: n }) })
        if (!res.ok) throw new Error(String(res.status))
        const d = await res.json()
        sSv(d.persistent === false ? 'nopersist' : 'saved'); setTimeout(() => sSv(v => v === 'saved' ? 'idle' : v), 2000)
      } catch { sSv('error') }
    }, 800)
  }, [])

  const onR = (ci: string, vn: string, x: number) => {
    const nr = { ...rats, [ci]: { ...(rats[ci] || {}), [vn]: x } }; sR(nr); save(nr, notes)
    const k = ci + '|' + vn
    if (freshT.current[k]) clearTimeout(freshT.current[k])
    if (x > 0) {
      sFresh(f => ({ ...f, [k]: true }))
      freshT.current[k] = setTimeout(() => sFresh(f => { const c = { ...f }; delete c[k]; return c }), 2500)
    } else sFresh(f => { const c = { ...f }; delete c[k]; return c })
  }
  const onN = (ci: string, vn: string, x: string) => { const nn = { ...notes, [ci]: { ...(notes[ci] || {}), [vn]: x } }; sN(nn); save(rats, nn) }

  const all: Item[] = CATS.flatMap(cat => cat.v.map(v => ({ cat, v, stars: (rats[cat.id] || {})[v.n] || 0, note: (notes[cat.id] || {})[v.n] || '' })))
  const rated = all.filter(i => i.stars > 0)
  const open = all.filter(i => i.stars === 0).sort((a, b) => b.v.c - a.v.c)
  const avg = rated.length ? rated.reduce((s, i) => s + i.stars, 0) / rated.length : 0
  const brandAvg = (b: string) => { const r = rated.filter(i => i.cat.brand === b); return r.length ? r.reduce((s, i) => s + i.stars, 0) / r.length : 0 }
  const cardOpen = all.filter(i => i.stars === 0 || fresh[i.cat.id + '|' + i.v.n])
    .sort((a, b) => b.v.c - a.v.c)
  const top = [...rated].sort((a, b) => b.stars - a.stars || b.v.c - a.v.c).slice(0, 3)
  const tot = CATS.reduce((s, c) => s + c.tu, 0)

  const ql = q.trim().toLowerCase()
  const groups = [...CATS].sort((a, b) => b.tu - a.tu).map(cat => ({
    cat,
    items: all.filter(i => i.cat.id === cat.id
      && (filter === 'all' || (filter === 'open' ? ((base ? (base[cat.id] || {})[i.v.n] || 0 : i.stars) === 0) : cat.brand === filter))
      && (!ql || i.v.n.toLowerCase().includes(ql) || cat.label.toLowerCase().includes(ql)))
      .sort((a, b) => b.v.c - a.v.c),
  })).filter(g => g.items.length)
  const colA = groups.filter((_, i) => i % 2 === 0), colB = groups.filter((_, i) => i % 2 === 1)

  const pill = (k: typeof filter, label: string) => (
    <button key={k} type="button" onClick={() => sF(k)} aria-pressed={filter === k}
      style={{ height: 36, padding: '0 16px', borderRadius: 999, border: `1px solid ${filter === k ? C.ink : C.line}`, background: filter === k ? C.ink : '#fff', color: filter === k ? '#fff' : C.ink, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{label}</button>
  )
  const gotoList = () => { sF('open'); document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div className="app">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <aside className="side">
        <Logo />
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }} aria-label="Navigation">
          <NavBtn href="#start" label="Start" icon={<IcoHome />} active={nav === 'start'} onClick={() => sNav('start')} />
          <NavBtn href="#produkte" label="Produkte" icon={<IcoGrid />} active={nav === 'produkte'} onClick={() => sNav('produkte')} />
          <NavBtn href="#bestenliste" label="Bestenliste" icon={<IcoTrophy />} active={nav === 'bestenliste'} onClick={() => sNav('bestenliste')} />
        </nav>
        <div style={{ marginTop: 'auto' }}><NavBtn href="/login" label="Sperren" icon={<IcoLock />} /></div>
      </aside>

      <main className="main" id="start">
        <div className="headrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 15, color: C.mute }}>
              Guten Tag, Christopher
              {sv === 'saving' && <span style={{ marginLeft: 10, color: C.openFg }}>Speichert…</span>}
              {sv === 'saved' && <span style={{ marginLeft: 10, color: C.teal }}>✓ Gespeichert</span>}
              {sv === 'error' && <span style={{ marginLeft: 10, color: '#b3261e' }}>Server-Speichern fehlgeschlagen (nur in diesem Browser gesichert)</span>}
              {sv === 'nopersist' && <span style={{ marginLeft: 10, color: '#b3261e' }}>Kein dauerhafter Speicher konfiguriert (nur in diesem Browser gesichert)</span>}
            </span>
            <h1 className="h1" style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Wie gut sind Deine Supplements?</h1>
          </div>
          <label className="search" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', borderRadius: 14, background: '#fff', color: C.mute }}>
            <IcoSearch />
            <input type="search" aria-label="Produkt suchen" placeholder="Produkt suchen" value={q} onChange={e => sQ(e.target.value)}
              style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: C.ink }} />
          </label>
        </div>

        <div className="row2">
          <section style={{ flex: '640 1 0', minWidth: 0, minHeight: 300, borderRadius: 28, background: `linear-gradient(135deg,${C.tealDark},${C.teal})`, color: '#fff', position: 'relative', padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#a8d8de' }}>{open.length ? 'WARTEN AUF DICH' : 'ALLES ERLEDIGT'}</span>
              <h2 style={{ margin: 0, fontSize: 38, lineHeight: 1.1, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em' }}>
                {open.length ? `${open.length} Produkte sind noch nicht bewertet` : 'Alle Produkte sind bewertet'}
              </h2>
            </div>
            {open.length > 0 && <div><button type="button" onClick={gotoList} style={{ height: 48, padding: '0 22px', border: 'none', borderRadius: 14, background: '#fff', color: C.ink, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Jetzt bewerten</button></div>}
            <div className="hero-chips">
              {open.slice(0, 3).map(it => (
                <div key={it.cat.id + it.v.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px 8px 8px', borderRadius: 18, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)' }}>
                  <Chip src={it.v.img} alt="" brand={it.cat.brand} size={40} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{it.v.n}</span>
                  <Stars v={0} s={14} label="" />
                </div>
              ))}
            </div>
          </section>

          <Card style={{ flex: '456 1 0', minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <CardHead title="Übersicht" meta={`${all.length} Sorten · ${tot} bestellt`} />
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 14, color: C.mute }}>Ø Bewertung</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 56, lineHeight: 1, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em' }}>{rated.length ? fmt(avg) : '–'}</span>
                    <StarIcon on s={30} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1, paddingBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{rated.length} von {all.length} bewertet</span>
                  <div style={{ height: 8, borderRadius: 4, background: C.bg }}><div style={{ width: `${(rated.length / all.length) * 100}%`, height: 8, borderRadius: 4, background: C.teal }} /></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(['esn', 'more'] as const).map(b => (
                  <div key={b} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{BR[b].label}</span><span style={{ color: C.mute }}>{brandAvg(b) ? `Ø ${fmt(brandAvg(b))}` : '–'}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: C.bg }}><div style={{ width: `${(brandAvg(b) / 5) * 100}%`, height: 8, borderRadius: 4, background: C.teal }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="row2">
          <Card style={{ flex: 1, minWidth: 0 }}>
            <div id="bestenliste" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CardHead title="Bestenliste" meta="Top 3" />
              {top.length === 0 && <p style={{ margin: '12px 0 0', color: C.mute, fontSize: 15 }}>Noch keine Bewertungen.</p>}
              {top.map((it, i) => (
                <div key={it.cat.id + it.v.n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
                  <div style={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', background: i === 0 ? C.amber : C.esnBg, color: i === 0 ? C.ink : C.esnFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{i + 1}</div>
                  <Chip src={it.v.img} alt="" brand={it.cat.brand} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{it.v.n}</span>
                    <span style={{ fontSize: 13, color: C.mute }}>{it.cat.label}</span>
                  </div>
                  <span style={{ fontSize: 20, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em' }}>{fmt(it.stars)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CardHead title="Noch nicht bewertet" meta={`${open.length} offen`} />
              {open.length === 0 && <p style={{ margin: '12px 0 0', color: C.mute, fontSize: 15 }}>Nichts offen.</p>}
              {cardOpen.slice(0, 3).map((it, i) => (
                <div key={it.cat.id + it.v.n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? `1px solid ${C.line}` : 'none' }}>
                  <Chip src={it.v.img} alt="" brand={it.cat.brand} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexGrow: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{it.v.n}</span>
                    <span style={{ fontSize: 13, color: C.mute }}>{it.cat.label}</span>
                  </div>
                  {it.stars > 0
                    ? <Stars v={it.stars} s={20} on={x => onR(it.cat.id, it.v.n, x)} label={`${it.v.n} bewerten`} />
                    : <RateInline onR={x => onR(it.cat.id, it.v.n, x)} label={`${it.v.n} bewerten`} />}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card pad="28px 32px 32px" style={{ scrollMarginTop: 16 }}>
          <div id="produkte" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <CardHead title="Alle Produkte" />
              <div className="pills">{pill('all', 'Alle')}{pill('open', 'Offen')}{pill('esn', 'ESN')}{pill('more', 'MORE')}</div>
            </div>
            {groups.length === 0 && <p style={{ margin: 0, color: C.mute, fontSize: 15 }}>Keine Treffer.</p>}
            <div className="groups">
              {[colA, colB].map((col, ci) => (
                <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
                  {col.map(g => <Group key={g.cat.id} cat={g.cat} items={g.items} onR={onR} onN={onN} forceOpen={!!ql || filter === 'open'} />)}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>

      <nav className="bnav" aria-label="Navigation">
        <NavBtn href="#start" label="Start" icon={<IcoHome />} active={nav === 'start'} onClick={() => sNav('start')} />
        <NavBtn href="#produkte" label="Produkte" icon={<IcoGrid />} active={nav === 'produkte'} onClick={() => sNav('produkte')} />
        <NavBtn href="#bestenliste" label="Bestenliste" icon={<IcoTrophy />} active={nav === 'bestenliste'} onClick={() => sNav('bestenliste')} />
        <NavBtn href="/login" label="Sperren" icon={<IcoLock />} />
      </nav>
    </div>
  )
}
