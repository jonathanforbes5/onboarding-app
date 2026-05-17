'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookHeart, Calendar, Grid3x3, Home, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/feed', label: 'Home', icon: Home },
  { href: '/diary', label: 'Diary', icon: BookHeart },
] as const

const RIGHT_TABS = [
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/more', label: 'More', icon: Grid3x3 },
] as const

export function BottomNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe">
      <div className="mx-auto max-w-[480px] px-3 pb-2">
        <div className="relative bg-white/90 backdrop-blur-xl border border-cream-200 rounded-3xl shadow-soft flex items-center justify-around py-2 px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.href)
            return (
              <Link key={tab.href} href={tab.href} className={cn('flex flex-col items-center justify-center w-14 py-1.5 rounded-2xl transition-all', active ? 'text-lila-500 scale-105' : 'text-cream-500 hover:text-cream-700')}>
                <Icon className={cn('w-5 h-5', active && 'fill-lila-100')} />
                <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
              </Link>
            )
          })}
          <Link href={isAdmin ? '/diary/new' : '/feed'} className="relative -mt-7 w-14 h-14 rounded-full bg-gradient-to-br from-lila-500 to-warm-400 text-white flex items-center justify-center shadow-glow active:scale-95 transition" aria-label="New entry">
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          </Link>
          {RIGHT_TABS.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.href)
            return (
              <Link key={tab.href} href={tab.href} className={cn('flex flex-col items-center justify-center w-14 py-1.5 rounded-2xl transition-all', active ? 'text-lila-500 scale-105' : 'text-cream-500 hover:text-cream-700')}>
                <Icon className={cn('w-5 h-5', active && 'fill-lila-100')} />
                <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
