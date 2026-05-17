import Link from 'next/link'
import { Activity, Bell, CalendarDays, Image as ImageIcon, Settings, Sparkles, User } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { getCurrentProfile } from '@/lib/supabase/server'

const ITEMS = [
  { href: '/milestones', label: 'Milestones', icon: Sparkles, color: 'bg-warm-100 text-warm-700' },
  { href: '/health', label: 'Health', icon: Activity, color: 'bg-emerald-100 text-emerald-700' },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon, color: 'bg-sky-100 text-sky-700' },
  { href: '/events', label: 'Events', icon: CalendarDays, color: 'bg-purple-100 text-purple-700' },
  { href: '/announcements', label: 'Announcements', icon: Bell, color: 'bg-lila-100 text-lila-700' },
  { href: '/profile', label: 'Profile', icon: User, color: 'bg-rose-100 text-rose-700' },
]

export default async function MorePage() {
  const profile = await getCurrentProfile()
  const isAdmin = profile?.role === 'admin'
  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="font-display text-3xl font-semibold text-cream-900">More</h1>
      <div className="grid grid-cols-2 gap-2">
        {ITEMS.map(({ href, label, icon: Icon, color }) => (
          <Link key={href} href={href}>
            <Card hover className="flex flex-col items-start gap-2 h-full">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
              <p className="font-display font-semibold text-cream-900">{label}</p>
            </Card>
          </Link>
        ))}
      </div>
      {isAdmin && (
        <Link href="/admin">
          <Card variant="warm" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-warm-200 text-warm-700 flex items-center justify-center"><Settings className="w-5 h-5" /></div>
            <div className="flex-1"><p className="font-display font-semibold text-cream-900">Admin</p><p className="text-xs text-cream-600">Members, invites, settings</p></div>
          </Card>
        </Link>
      )}
    </div>
  )
}
