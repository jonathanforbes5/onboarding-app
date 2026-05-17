import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/nav/BottomNav'
import { TopBar } from '@/components/nav/TopBar'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const profile = await getCurrentProfile()
  return (
    <div className="min-h-screen bg-cream-50">
      <TopBar profile={profile} />
      <main className="mx-auto max-w-[480px] px-4 pt-3 pb-32">{children}</main>
      <BottomNav isAdmin={profile?.role === 'admin'} />
    </div>
  )
}
