import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });

  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) return NextResponse.json({ exists: false, hasPassword: false });

  const admin = createClient(supabaseUrl, serviceKey);

  const { data } = await admin
    .from('allowed_users')
    .select('email, display_name, role, user_key, password_hash, force_reset')
    .eq('user_key', name)
    .maybeSingle();

  if (!data) return NextResponse.json({ exists: false, hasPassword: false });

  return NextResponse.json({
    exists: true,
    hasPassword: !!data.password_hash,
    forceReset: data.force_reset ?? false,
    displayName: data.display_name,
    role: data.role,
  });
}
