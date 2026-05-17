import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  const { data, error } = await supabase.from('events').insert({ title: body.title, description: body.description ?? null, event_date: body.event_date, location: body.location ?? null, cover_photo: body.cover_photo ?? null, event_type: body.event_type ?? 'gathering', created_by: profile.id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ event: data })
}
