import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lila — Forbes Family',
  description: 'A private space for the Forbes family to share, remember, and celebrate Lilakae.',
  applicationName: 'Lila',
  appleWebApp: {
    capable: true,
    title: 'Lila',
    statusBarStyle: 'default',
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fff8f5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream-50 text-cream-900 min-h-screen">{children}</body>
    </html>
  )
}
