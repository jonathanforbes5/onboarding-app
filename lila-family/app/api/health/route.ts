import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const person = searchParams.get('person'); const type = searchParams.get('type')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 500)
  let query = supabase.from('health_records').select('*').order('recorded_at', { ascending: false }).limit(limit)
  if (person) query = query.eq('person', person)
  if (type) query = query.eq('record_type', type)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ records: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  const { data, error } = await supabase.from('health_records').insert({ person: body.person, record_type: body.record_type, value: body.value, notes: body.notes ?? null, created_by: profile.id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ record: data })
}
