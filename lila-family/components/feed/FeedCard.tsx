'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MessageCircle, Sparkles } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { type DiaryEntry, MOOD_EMOJI, MOOD_LABEL, REACTION_EMOJIS } from '@/lib/types'
import { formatRelative, formatShortDate, truncate, cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export interface FeedCardProps {
  entry: DiaryEntry
  currentUserId?: string | null
}

export function FeedCard({ entry, currentUserId }: FeedCardProps) {
  const [reactions, setReactions] = useState(entry.reactions ?? [])
  const [showAllEmojis, setShowAllEmojis] = useState(false)
  const supabase = createClient()

  const commentCount = entry._count?.comments ?? entry.comments?.length ?? 0
  const cover = entry.photos?.[0]
  const moreCount = (entry.photos?.length ?? 0) - 1

  const counts = reactions.reduce<Record<string, number>>((acc, r) => { acc[r.emoji] = (acc[r.emoji] ?? 0) + 1; return acc }, {})

  const toggleReaction = async (emoji: string) => {
    if (!currentUserId) return
    const existing = reactions.find((r) => r.user_id === currentUserId && r.emoji === emoji)
    if (existing) {
      setReactions((r) => r.filter((x) => x.id !== existing.id))
      await supabase.from('reactions').delete().eq('id', existing.id)
    } else {
      const optimistic = { id: crypto.randomUUID(), entity_type: 'diary_entry' as const, entity_id: entry.id, user_id: currentUserId, emoji, created_at: new Date().toISOString() }
      setReactions((r) => [...r, optimistic])
      await supabase.from('reactions').insert({ entity_type: 'diary_entry', entity_id: entry.id, emoji, user_id: currentUserId })
    }
    setShowAllEmojis(false)
  }

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <Avatar name={entry.author?.full_name || 'Family'} src={entry.author?.avatar_url} size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-cream-900 truncate">{entry.author?.full_name || 'Family'}</p>
          <p className="text-xs text-cream-500">{formatShortDate(entry.entry_date)} · {formatRelative(entry.created_at)}</p>
        </div>
        {entry.is_milestone && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-warm-100 text-warm-700 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> Milestone
          </span>
        )}
        {entry.mood && <span title={MOOD_LABEL[entry.mood]} className="text-xl leading-none" aria-label={MOOD_LABEL[entry.mood]}>{MOOD_EMOJI[entry.mood]}</span>}
      </div>
      {cover && (
        <Link href={`/diary/${entry.id}`} className="relative block aspect-[4/3] bg-cream-100">
          <Image src={cover} alt={entry.title || 'Diary photo'} fill sizes="(max-width: 480px) 100vw, 480px" className="object-cover" />
          {moreCount > 0 && <span className="absolute bottom-3 right-3 bg-cream-900/70 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur">+{moreCount}</span>}
        </Link>
      )}
      <div className="px-4 pt-3 pb-2">
        {entry.title && <Link href={`/diary/${entry.id}`}><h3 className="font-display text-lg font-semibold text-cream-900 leading-snug mb-1">{entry.title}</h3></Link>}
        <p className="text-sm text-cream-700 leading-relaxed whitespace-pre-line">{truncate(entry.content, 220)}</p>
        {entry.content.length > 220 && <Link href={`/diary/${entry.id}`} className="text-xs font-semibold text-lila-500 mt-1.5 inline-block">Read more</Link>}
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {entry.tags.map((t) => <span key={t} className="text-[11px] font-medium bg-cream-100 text-cream-600 px-2 py-0.5 rounded-full">#{t}</span>)}
          </div>
        )}
      </div>
      <div className="px-4 pb-3 pt-1 flex items-center justify-between gap-2 border-t border-cream-100 mt-2">
        <div className="flex items-center gap-1 flex-wrap">
          {REACTION_EMOJIS.slice(0, showAllEmojis ? REACTION_EMOJIS.length : 3).map((emoji) => {
            const active = reactions.some((r) => r.user_id === currentUserId && r.emoji === emoji)
            const c = counts[emoji] ?? 0
            return (
              <button key={emoji} onClick={() => toggleReaction(emoji)} className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm border transition-all active:scale-95', active ? 'bg-lila-50 border-lila-300 text-lila-700' : 'bg-white border-cream-200 hover:bg-cream-50')}>
                <span>{emoji}</span>
                {c > 0 && <span className="text-[11px] font-semibold">{c}</span>}
              </button>
            )
          })}
          {!showAllEmojis && <button onClick={() => setShowAllEmojis(true)} className="px-2 py-1 rounded-full text-xs text-cream-500 hover:bg-cream-100" aria-label="More reactions">+</button>}
        </div>
        <Link href={`/diary/${entry.id}#comments`} className="inline-flex items-center gap-1 text-xs text-cream-500 hover:text-cream-700">
          <MessageCircle className="w-4 h-4" />{commentCount}
        </Link>
      </div>
    </Card>
  )
}
