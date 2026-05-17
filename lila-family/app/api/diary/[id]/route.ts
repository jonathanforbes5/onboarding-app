import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabase.from('diary_entries').select('*, author:profiles!diary_entries_author_id_fkey(*)').eq('id', params.id).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ entry: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const profile = await getCurrentProfile()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  const { data, error } = await supabase.from('diary_entries').update({ title: body.title ?? null, content: body.content, mood: body.mood ?? null, entry_date: body.entry_date, photos: body.photos ?? null, tags: body.tags ?? null, is_milestone: !!body.is_milestone }).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ entry: data })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const profile = await getCurrentProfile()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const supabase = createClient()
  const { error } = await supabase.from('diary_entries').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
