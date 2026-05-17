import Image from 'next/image'
import { cn, getAvatarColor, getInitials } from '@/lib/utils'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-24 h-24 text-2xl',
}

export interface AvatarProps {
  name: string
  src?: string | null
  size?: Size
  className?: string
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name || '?')
  const colorClass = getAvatarColor(name || 'default')
  const dims = SIZE_CLASSES[size]

  if (src) {
    const pixel = size === 'xs' ? 24 : size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 56 : 96
    return (
      <div className={cn('relative rounded-full overflow-hidden ring-2 ring-white shadow-sm', dims, className)}>
        <Image src={src} alt={name} width={pixel} height={pixel} className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white shadow-sm', colorClass, dims, className)}>
      {initials}
    </div>
  )
}
