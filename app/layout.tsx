import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Supplement Tracker', description: 'MORE & ESN Bewertungen' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/></head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
