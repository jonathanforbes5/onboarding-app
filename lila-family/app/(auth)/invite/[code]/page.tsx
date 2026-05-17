'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Heart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import type { Invite } from '@/lib/types'

export default function InvitePage() {
  const params = useParams<{ code: string }>()
  const code = params.code
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [invite, setInvite] = useState<Invite | null>(null)
  const [inviterName, setInviterName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const res = await fetch(`/api/invites/${code}`)
      if (!mounted) return
      if (!res.ok) { setError('This invite link is invalid or has expired.'); setLoading(false); return }
      const data = await res.json()
      setInvite(data.invite); setInviterName(data.inviter_name ?? null)
      if (data.invite?.email) setEmail(data.invite.email)
      if (data.invite?.name) setFullName(data.invite.name)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [code])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!invite) return
    setSubmitting(true); setError(null)
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { data: { full_name: fullName, invite_code: code }, emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/api/invites/${code}/redeem?name=${encodeURIComponent(fullName)}` : undefined },
    })
    setSubmitting(false)
    if (signInError) { setError(signInError.message); return }
    setSent(true)
  }

  if (loading) return <div className="flex flex-col items-center justify-center py-12 text-cream-500"><Loader2 className="w-6 h-6 animate-spin" /><p className="mt-3 text-sm">Checking your invite…</p></div>

  if (error && !invite) return (
    <div className="bg-white border border-cream-200 rounded-3xl p-6 text-center shadow-soft">
      <h1 className="font-display text-2xl text-cream-900 mb-1">No invite found</h1>
      <p className="text-sm text-cream-600">{error}</p>
      <button onClick={() => router.push('/login')} className="mt-4 text-sm font-semibold text-lila-500">Go to sign in</button>
    </div>
  )

  if (sent) return (
    <div className="bg-white border border-cream-200 rounded-3xl p-6 text-center shadow-soft">
      <div className="w-12 h-12 mx-auto bg-lila-100 rounded-2xl flex items-center justify-center mb-3"><Heart className="w-6 h-6 text-lila-500" fill="currentColor" /></div>
      <h2 className="font-display text-xl font-semibold text-cream-900 mb-1">One last step</h2>
      <p className="text-sm text-cream-600">We sent you a magic link. Tap it to finish joining the family.</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-br from-lila-400 to-warm-400 flex items-center justify-center shadow-soft mb-3"><Heart className="w-7 h-7 text-white" fill="currentColor" /></div>
        <h1 className="font-display text-3xl text-cream-900">You&apos;re invited</h1>
        <p className="text-sm text-cream-600 mt-1">{inviterName ? <><span className="font-medium">{inviterName}</span> wants you to share in Lilakae&apos;s journey.</> : 'Join the Forbes family to share in Lilakae\'s journey.'}</p>
      </div>
      <form onSubmit={submit} className="bg-white border border-cream-200 rounded-3xl p-6 shadow-soft space-y-4">
        <div><label className="block text-xs font-semibold text-cream-700 mb-1.5">Full name</label><input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-lila-400 focus:ring-2 focus:ring-lila-100 outline-none text-sm" placeholder="Your name" /></div>
        <div><label className="block text-xs font-semibold text-cream-700 mb-1.5">Email</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-lila-400 focus:ring-2 focus:ring-lila-100 outline-none text-sm" placeholder="you@family.com" /></div>
        {error && <div className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}
        <Button type="submit" loading={submitting} fullWidth size="lg">Join the Family</Button>
      </form>
    </div>
  )
}
