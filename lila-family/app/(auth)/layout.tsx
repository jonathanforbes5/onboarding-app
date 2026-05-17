import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-lila-50 via-cream-50 to-warm-50 flex flex-col">
      <header className="pt-safe px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-lila-400 to-warm-400 flex items-center justify-center shadow-soft">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-semibold text-gradient-rose">Lila</span>
        </Link>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <footer className="px-6 pb-8 text-center text-cream-500 text-xs">Made with love for the Forbes family ♡</footer>
    </main>
  )
}
