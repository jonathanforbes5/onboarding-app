'use client'

import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = original
      document.removeEventListener('keydown', onEsc)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-cream-900/40 backdrop-blur-sm animate-fade-in" />
      <div className={cn(
        'relative w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-glow animate-slide-up overflow-hidden',
        'sm:max-w-md',
        size === 'lg' && 'sm:max-w-2xl',
        size === 'sm' && 'sm:max-w-sm',
        size === 'full' && 'sm:max-w-3xl',
        'max-h-[92vh] flex flex-col',
      )}>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-cream-100">
          <h3 className="font-display text-lg font-semibold text-cream-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream-100" aria-label="Close">
            <X className="w-4 h-4 text-cream-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
