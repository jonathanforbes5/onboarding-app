import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const supabase = createClient()
  const { data: existing } = await supabase.from('reactions').select('id').eq('entity_type', body.entity_type).eq('entity_id', body.entity_id).eq('user_id', profile.id).eq('emoji', body.emoji).maybeSingle()
  if (existing) { await supabase.from('reactions').delete().eq('id', existing.id); return NextResponse.json({ toggled: 'removed' }) }
  const { data, error } = await supabase.from('reactions').insert({ entity_type: body.entity_type, entity_id: body.entity_id, emoji: body.emoji, user_id: profile.id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ toggled: 'added', reaction: data })
}
