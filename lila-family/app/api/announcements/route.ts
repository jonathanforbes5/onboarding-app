import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabase.from('announcements').select('*, author:profiles!announcements_author_id_fkey(*)').order('pinned', { ascending: false }).order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ announcements: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  const { data, error } = await supabase.from('announcements').insert({ title: body.title, content: body.content, emoji: body.emoji ?? '📢', pinned: !!body.pinned, author_id: profile.id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ announcement: data })
}
