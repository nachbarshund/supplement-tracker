import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  // Only allow flavour-heaven CDN
  if (!url.startsWith('https://flavour-heaven.de/cdn/')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'Referer': 'https://flavour-heaven.de/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    if (!res.ok) return new NextResponse(`Upstream ${res.status}`, { status: 502 })

    const buffer = await res.arrayBuffer()
    const ct = res.headers.get('content-type') || 'image/jpeg'

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    })
  } catch (e) {
    return new NextResponse('Error', { status: 500 })
  }
}
