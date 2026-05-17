'use client'

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export interface PhotoUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  bucket?: string
  max?: number
  single?: boolean
}

export function PhotoUpload({ value, onChange, bucket = 'diary-photos', max = 12, single = false }: PhotoUploadProps) {
  const [active, setActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const upload = async (files: FileList | File[]) => {
    setError(null)
    setUploading(true)
    const next: string[] = single ? [] : [...value]
    try {
      for (const file of Array.from(files)) {
        if (next.length >= (single ? 1 : max)) break
        if (!file.type.startsWith('image/')) continue
        const ext = file.name.split('.').pop() || 'jpg'
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const { data, error: uploadError } = await supabase.storage.from(bucket).upload(filename, file, { contentType: file.type, upsert: false })
        if (uploadError) { setError(uploadError.message); continue }
        const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path)
        next.push(pub.publicUrl)
      }
      onChange(next)
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setActive(false); if (e.dataTransfer.files?.length) upload(e.dataTransfer.files) }
  const onFile = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files?.length) upload(e.target.files); e.target.value = '' }
  const remove = (url: string) => onChange(value.filter((v) => v !== url))

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url) => (
            <div key={url} className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 group">
              <Image src={url} alt="" fill sizes="128px" className="object-cover" />
              <button onClick={() => remove(url)} className="absolute top-1.5 right-1.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition" aria-label="Remove">
                <X className="w-3.5 h-3.5 text-cream-800" />
              </button>
            </div>
          ))}
        </div>
      )}
      {(single ? value.length === 0 : value.length < max) && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setActive(true) }}
          onDragLeave={() => setActive(false)}
          onClick={() => inputRef.current?.click()}
          className={cn('photo-drop-zone cursor-pointer flex flex-col items-center justify-center gap-2 text-cream-600 hover:border-rose-400 hover:bg-rose-50/40', active && 'active')}
        >
          <input ref={inputRef} type="file" accept="image/*" multiple={!single} className="hidden" onChange={onFile} />
          {uploading ? (
            <><Loader2 className="w-6 h-6 animate-spin text-lila-500" /><p className="text-sm">Uploading…</p></>
          ) : (
            <>
              <div className="w-10 h-10 rounded-2xl bg-lila-100 text-lila-500 flex items-center justify-center">
                {value.length === 0 ? <ImagePlus className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
              </div>
              <p className="text-sm font-medium">{value.length === 0 ? 'Add photos' : 'Add more'}</p>
              <p className="text-xs text-cream-500">Tap or drag images</p>
            </>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
