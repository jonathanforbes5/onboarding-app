import { NextResponse, type NextRequest } from 'next/server'
import { createClient, getCurrentProfile } from '@/lib/supabase/server'
import { generateInviteCode } from '@/lib/utils'

export async function GET() {
  const profile = await getCurrentProfile()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const supabase = createClient()
  const { data, error } = await supabase.from('invites').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ invites: data ?? [] })
}

export async function POST(request: NextRequest) {
  const profile = await getCurrentProfile()
  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  const body = await request.json()
  const supabase = createClient()
  let code = generateInviteCode()
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabase.from('invites').select('id').eq('code', code).maybeSingle()
    if (!existing) break
    code = generateInviteCode()
  }
  const { data, error } = await supabase.from('invites').insert({ code, email: body.email ?? null, name: body.name ?? null, role: body.role ?? 'family', created_by: profile.id }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ invite: data })
}
