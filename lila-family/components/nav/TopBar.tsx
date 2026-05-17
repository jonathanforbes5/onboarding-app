import Link from 'next/link'
import { Bell, Heart } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import type { Profile } from '@/lib/types'

export function TopBar({ profile }: { profile: Profile | null }) {
  return (
    <header className="sticky top-0 z-30 bg-cream-50/80 backdrop-blur-xl border-b border-cream-100 pt-safe">
      <div className="mx-auto max-w-[480px] px-5 h-14 flex items-center justify-between">
        <Link href="/feed" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-lila-400 to-warm-400 flex items-center justify-center shadow-soft">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
          <span className="font-display text-xl font-semibold text-gradient-rose">Lila</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/announcements" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream-100 text-cream-700" aria-label="Announcements">
            <Bell className="w-5 h-5" />
          </Link>
          <Link href="/profile" aria-label="Profile">
            <Avatar name={profile?.full_name || 'Family'} src={profile?.avatar_url} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
