import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  if (!['going', 'maybe', 'not_going'].includes(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  const supabase = createClient()
  const { data, error } = await supabase.from('event_rsvps').upsert({ event_id: params.id, user_id: profile.id, status: body.status }, { onConflict: 'event_id,user_id' }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ rsvp: data })
}
