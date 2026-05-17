import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Padding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: Padding
  variant?: 'default' | 'warm' | 'rose'
}

const PADDING_CLASSES: Record<Padding, string> = {
  none: '', sm: 'p-3', md: 'p-4', lg: 'p-6',
}

const VARIANT_CLASSES = {
  default: 'bg-white border border-cream-200',
  warm: 'bg-gradient-to-br from-warm-50 to-warm-100/60 border border-warm-200',
  rose: 'bg-gradient-to-br from-lila-50 to-lila-100/60 border border-lila-200',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { hover, padding = 'md', variant = 'default', className, children, ...props }, ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl shadow-soft transition-all duration-200',
        VARIANT_CLASSES[variant],
        PADDING_CLASSES[padding],
        hover && 'hover:shadow-glow hover:-translate-y-0.5 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
