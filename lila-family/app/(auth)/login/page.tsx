'use client'

import { useState, type FormEvent } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/feed` : undefined },
    })
    setLoading(false)
    if (err) setError(err.message)
    else setSent(true)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-gradient-rose">Welcome home</h1>
        <p className="font-display italic text-cream-600 mt-2">A private space for our growing family.</p>
      </div>
      {sent ? (
        <div className="bg-white border border-cream-200 rounded-3xl p-6 text-center shadow-soft">
          <div className="w-12 h-12 mx-auto bg-lila-100 rounded-2xl flex items-center justify-center mb-3"><CheckCircle2 className="w-6 h-6 text-lila-500" /></div>
          <h2 className="font-display text-xl font-semibold text-cream-900 mb-1">Check your email</h2>
          <p className="text-sm text-cream-600">We sent a magic link to <span className="font-medium">{email}</span>. Tap it to sign in.</p>
          <button onClick={() => { setSent(false); setEmail('') }} className="mt-4 text-xs font-semibold text-lila-500">Use a different email</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-cream-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@family.com" className="w-full pl-10 pr-4 py-3 rounded-2xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-lila-400 focus:ring-2 focus:ring-lila-100 outline-none text-sm" />
            </div>
          </div>
          {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
          <Button type="submit" loading={loading} fullWidth size="lg">Send Magic Link</Button>
          <p className="text-[11px] text-center text-cream-500 leading-relaxed">This is a private family app. Access by invitation only.</p>
        </form>
      )}
    </div>
  )
}
