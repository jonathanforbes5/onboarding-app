import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const bucket = (formData.get('bucket') as string) || 'diary-photos'
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  const supabase = createClient()
  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `${profile.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()
  const { data, error } = await supabase.storage.from(bucket).upload(filename, arrayBuffer, { contentType: file.type, upsert: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return NextResponse.json({ url: pub.publicUrl, path: data.path })
}
