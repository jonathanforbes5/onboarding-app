import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: NextRequest, { params }: { params: { code: string } }) {
  const supabase = createClient()
  const { data: invite, error } = await supabase.from('invites').select('*').eq('code', params.code).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
  if (new Date(invite.expires_at) < new Date()) return NextResponse.json({ error: 'Invite expired' }, { status: 410 })
  let inviterName: string | null = null
  if (invite.created_by) {
    const { data: inviter } = await supabase.from('profiles').select('full_name').eq('id', invite.created_by).maybeSingle()
    inviterName = inviter?.full_name ?? null
  }
  return NextResponse.json({ invite, inviter_name: inviterName })
}

export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { data: invite } = await supabase.from('invites').select('*').eq('code', params.code).maybeSingle()
  if (!invite) return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
  if (new Date(invite.expires_at) < new Date()) return NextResponse.json({ error: 'Invite expired' }, { status: 410 })
  const { data: profile, error: profileError } = await supabase.from('profiles').upsert({ id: user.id, full_name: body.full_name || invite.name || user.email?.split('@')[0] || 'Family', role: invite.role || 'family' }).select().single()
  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 })
  await supabase.from('invites').update({ used_by: user.id, used_at: new Date().toISOString() }).eq('id', invite.id)
  return NextResponse.json({ profile })
}
