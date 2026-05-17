import Link from 'next/link'
import { BookHeart, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { FeedCard } from '@/components/feed/FeedCard'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'
import { getLilakaeAge } from '@/lib/utils'
import type { DiaryEntry, Reaction } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
  const supabase = createClient()
  const profile = await getCurrentProfile()
  const isAdmin = profile?.role === 'admin'

  const { data: entries } = await supabase
    .from('diary_entries')
    .select('*, author:profiles!diary_entries_author_id_fkey(*)')
    .order('entry_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(30)

  const entryIds = (entries ?? []).map((e) => e.id)
  const reactionsByEntry: Record<string, Reaction[]> = {}
  const commentCounts: Record<string, number> = {}

  if (entryIds.length > 0) {
    const { data: reactions } = await supabase.from('reactions').select('*').eq('entity_type', 'diary_entry').in('entity_id', entryIds)
    for (const r of (reactions ?? []) as Reaction[]) { const arr = reactionsByEntry[r.entity_id] ?? []; arr.push(r); reactionsByEntry[r.entity_id] = arr }
    const { data: comments } = await supabase.from('comments').select('id, entity_id').eq('entity_type', 'diary_entry').in('entity_id', entryIds)
    for (const c of comments ?? []) { commentCounts[c.entity_id] = (commentCounts[c.entity_id] ?? 0) + 1 }
  }

  const todayStr = new Date().toISOString().slice(0, 10)
  const hasEntryToday = (entries ?? []).some((e) => e.entry_date === todayStr)

  const decorated: DiaryEntry[] = (entries ?? []).map((e) => ({
    ...(e as DiaryEntry),
    reactions: reactionsByEntry[e.id] ?? [],
    _count: { reactions: reactionsByEntry[e.id]?.length ?? 0, comments: commentCounts[e.id] ?? 0 },
  }))

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="rounded-3xl bg-gradient-to-br from-lila-100 via-cream-50 to-warm-100 border border-lila-100 p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="text-4xl">👶🏽</div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-lila-700 uppercase tracking-wider">Lilakae Vienna</p>
            <h1 className="font-display text-2xl font-semibold text-cream-900 leading-tight">{getLilakaeAge()}</h1>
          </div>
          <Link href="/milestones" className="text-warm-700 bg-warm-100 hover:bg-warm-200 px-3 py-2 rounded-2xl text-xs font-semibold inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />Milestones
          </Link>
        </div>
      </section>
      {isAdmin && !hasEntryToday && (
        <Link href="/diary/new">
          <Card hover variant="warm" className="flex items-center justify-between">
            <div><p className="font-display font-semibold text-warm-900">Today&apos;s check-in</p><p className="text-xs text-warm-700/80 mt-0.5">A few words for future-you</p></div>
            <div className="w-10 h-10 rounded-2xl bg-warm-500 text-white flex items-center justify-center shadow-soft"><Plus className="w-5 h-5" /></div>
          </Card>
        </Link>
      )}
      <section className="space-y-4">
        {decorated.length === 0 ? (
          <EmptyState icon={<BookHeart className="w-7 h-7" />} title="No entries yet" description={isAdmin ? 'Start the diary with a first memory of Lilakae.' : 'Andrew and Shania will share moments here soon.'}
            action={isAdmin ? <Link href="/diary/new"><Button leftIcon={<Plus className="w-4 h-4" />}>Write the first entry</Button></Link> : undefined} />
        ) : decorated.map((entry) => <FeedCard key={entry.id} entry={entry} currentUserId={profile?.id} />)}
      </section>
    </div>
  )
}
