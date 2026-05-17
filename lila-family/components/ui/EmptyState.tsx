import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center py-12 px-6 rounded-3xl bg-gradient-to-br from-cream-50 to-lila-50/40 border border-cream-200', className)}>
      {icon && (
        <div className="w-16 h-16 mb-4 rounded-2xl bg-white shadow-soft flex items-center justify-center text-lila-400">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-cream-900 mb-1.5">{title}</h3>
      {description && <p className="text-sm text-cream-600 max-w-xs mb-4">{description}</p>}
      {action}
    </div>
  )
}
