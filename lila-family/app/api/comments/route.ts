import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const entityType = searchParams.get('entity_type'); const entityId = searchParams.get('entity_id')
  if (!entityType || !entityId) return NextResponse.json({ error: 'Missing entity' }, { status: 400 })
  const { data, error } = await supabase.from('comments').select('*, profile:profiles(*)').eq('entity_type', entityType).eq('entity_id', entityId).order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comments: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  if (!body.content?.trim()) return NextResponse.json({ error: 'Empty comment' }, { status: 400 })
  const supabase = createClient()
  const { data, error } = await supabase.from('comments').insert({ entity_type: body.entity_type, entity_id: body.entity_id, content: body.content.trim(), user_id: profile.id }).select('*, profile:profiles(*)').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ comment: data })
}
