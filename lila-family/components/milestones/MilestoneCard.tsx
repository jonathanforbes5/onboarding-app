import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { type Milestone, CATEGORY_EMOJI, CATEGORY_LABEL } from '@/lib/types'
import { formatDate, getAgeAtDate, cn } from '@/lib/utils'

const CATEGORY_GRADIENTS: Record<string, string> = {
  physical: 'from-rose-100 to-rose-50', cognitive: 'from-amber-100 to-amber-50',
  social: 'from-sky-100 to-sky-50', feeding: 'from-emerald-100 to-emerald-50',
  sleep: 'from-indigo-100 to-indigo-50', custom: 'from-purple-100 to-purple-50',
}

const CATEGORY_BADGE: Record<string, string> = {
  physical: 'bg-rose-200 text-rose-800', cognitive: 'bg-amber-200 text-amber-800',
  social: 'bg-sky-200 text-sky-800', feeding: 'bg-emerald-200 text-emerald-800',
  sleep: 'bg-indigo-200 text-indigo-800', custom: 'bg-purple-200 text-purple-800',
}

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const grad = CATEGORY_GRADIENTS[milestone.category] ?? CATEGORY_GRADIENTS.custom
  const badge = CATEGORY_BADGE[milestone.category] ?? CATEGORY_BADGE.custom

  return (
    <Card padding="none" className="overflow-hidden">
      {milestone.photo_url && (
        <div className="relative aspect-[16/10] bg-cream-100">
          <Image src={milestone.photo_url} alt={milestone.title} fill sizes="(max-width: 480px) 100vw, 480px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      )}
      <div className={cn('p-4 bg-gradient-to-br', grad)}>
        <div className="flex items-center justify-between mb-2">
          <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full', badge)}>
            <span>{CATEGORY_EMOJI[milestone.category]}</span>{CATEGORY_LABEL[milestone.category]}
          </span>
          <span className="text-xs text-cream-600 font-medium">{getAgeAtDate(milestone.milestone_date)}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-cream-900 leading-snug">{milestone.title}</h3>
        <p className="text-xs text-cream-600 mt-0.5">{formatDate(milestone.milestone_date)}</p>
        {milestone.description && <p className="text-sm text-cream-700 mt-2 leading-relaxed">{milestone.description}</p>}
      </div>
    </Card>
  )
}
