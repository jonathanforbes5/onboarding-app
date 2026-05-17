import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { const url = request.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url) }
  const { data: invite } = await supabase.from('invites').select('*').eq('code', params.code).maybeSingle()
  if (invite && (!invite.used_at || invite.used_by === user.id)) {
    const name = request.nextUrl.searchParams.get('name') || invite.name || user.email?.split('@')[0] || 'Family'
    await supabase.from('profiles').upsert({ id: user.id, full_name: name, role: invite.role || 'family' })
    await supabase.from('invites').update({ used_by: user.id, used_at: new Date().toISOString() }).eq('id', invite.id)
  }
  const url = request.nextUrl.clone(); url.pathname = '/feed'; url.search = ''
  return NextResponse.redirect(url)
}
