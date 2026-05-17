import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100)
  const offset = parseInt(searchParams.get('offset') ?? '0')
  const date = searchParams.get('date')
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  let query = supabase.from('diary_entries').select('*, author:profiles!diary_entries_author_id_fkey(*)').order('entry_date', { ascending: false }).range(offset, offset + limit - 1)
  if (date) query = query.eq('entry_date', date)
  if (from) query = query.gte('entry_date', from)
  if (to) query = query.lte('entry_date', to)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ entries: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  const { data, error } = await supabase.from('diary_entries').insert({
    title: body.title ?? null, content: body.content, mood: body.mood ?? null, entry_date: body.entry_date,
    photos: body.photos ?? null, tags: body.tags ?? null, is_milestone: !!body.is_milestone, author_id: profile.id,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (body.is_milestone && data) {
    await supabase.from('milestones').insert({ title: body.title || 'Milestone moment', description: body.content, milestone_date: body.entry_date, category: 'custom', photo_url: body.photos?.[0] ?? null, created_by: profile.id })
  }
  return NextResponse.json({ entry: data })
}
