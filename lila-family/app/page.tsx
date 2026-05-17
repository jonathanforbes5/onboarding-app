import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Heart, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function LandingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/feed')

  return (
    <main className="min-h-screen bg-gradient-to-br from-lila-50 via-cream-50 to-warm-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="relative">
          <div className="absolute inset-0 bg-lila-300/30 blur-3xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-lila-400 to-warm-400 shadow-glow flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        </div>
        <h1 className="font-display text-6xl md:text-7xl font-semibold mt-8 text-gradient-rose">Lila</h1>
        <p className="font-display italic text-cream-600 mt-3 text-lg text-center max-w-sm">
          A private space for our growing family.
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-warm-600 text-sm">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Forbes &amp; Chhom · 2025</span>
        </div>
        <div className="mt-12 w-full max-w-xs">
          <Link
            href="/login"
            className="block w-full text-center bg-gradient-to-r from-lila-500 to-lila-400 text-white font-semibold py-4 rounded-2xl shadow-soft hover:shadow-glow active:scale-[0.98] transition"
          >
            Sign In
          </Link>
          <p className="text-center text-xs text-cream-500 mt-4 font-medium">Invite-only. Made with love.</p>
        </div>
      </div>
      <footer className="px-6 py-8 text-center text-cream-500 text-xs">
        For Lilakae Vienna Forbes · <span className="font-display italic">our little light</span>
      </footer>
    </main>
  )
}
