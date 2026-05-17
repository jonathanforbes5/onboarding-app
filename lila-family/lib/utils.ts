import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, differenceInWeeks, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'

export const LILAKAE_BIRTHDATE = new Date('2025-04-13')

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function formatDate(date: string | Date): string { return format(new Date(date), 'MMMM d, yyyy') }
export function formatShortDate(date: string | Date): string { return format(new Date(date), 'MMM d') }
export function formatDateTime(date: string | Date): string { return format(new Date(date), 'MMM d, yyyy · h:mm a') }
export function formatTime(date: string | Date): string { return format(new Date(date), 'h:mm a') }
export function formatRelative(date: string | Date): string { return formatDistanceToNow(new Date(date), { addSuffix: true }) }

export function getLilakaeAge(birthDate: Date = LILAKAE_BIRTHDATE): string {
  const now = new Date()
  const weeks = differenceInWeeks(now, birthDate)
  const days = differenceInDays(now, birthDate)
  const months = differenceInMonths(now, birthDate)
  const years = differenceInYears(now, birthDate)
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} old`
  if (weeks < 12) return `${weeks} weeks old`
  if (months < 24) return `${months} month${months === 1 ? '' : 's'} old`
  return `${years} year${years === 1 ? '' : 's'} old`
}

export function getAgeAtDate(atDate: string | Date, birthDate: Date = LILAKAE_BIRTHDATE): string {
  const at = new Date(atDate)
  const weeks = differenceInWeeks(at, birthDate)
  const days = differenceInDays(at, birthDate)
  const months = differenceInMonths(at, birthDate)
  if (days < 14) return `${Math.max(0, days)}d`
  if (weeks < 12) return `${weeks}w`
  return `${months}mo`
}

export function ageInWeeksAt(atDate: string | Date, birthDate: Date = LILAKAE_BIRTHDATE): number {
  return Math.max(0, differenceInWeeks(new Date(atDate), birthDate))
}

export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}

const AVATAR_COLORS = ['bg-lila-300', 'bg-warm-300', 'bg-lila-400', 'bg-warm-400', 'bg-pink-300', 'bg-rose-400']

export function getAvatarColor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) { hash = seed.charCodeAt(i) + ((hash << 5) - hash) }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function truncate(text: string, max = 140): string {
  if (text.length <= max) return text
  return text.slice(0, max).trim() + '…'
}

export function groupBy<T, K extends string | number>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {} as Record<K, T[]>)
}
