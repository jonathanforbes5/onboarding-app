import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { email, bio, goal, avatar_emoji } = await req.json() as {
    email: string;
    bio?: string;
    goal?: string;
    avatar_emoji?: string;
  };

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceKey);

  // Add columns if they don't exist yet (idempotent migration)
  try {
    await admin.rpc('run_sql', {
      query: `
        alter table allowed_users add column if not exists bio text;
        alter table allowed_users add column if not exists goal text;
        alter table allowed_users add column if not exists avatar_emoji text;
      `,
    });
  } catch {
    // rpc may not exist — fall through, update will still work if columns exist
  }

  const { error } = await admin
    .from('allowed_users')
    .update({
      ...(bio          !== undefined && { bio }),
      ...(goal         !== undefined && { goal }),
      ...(avatar_emoji !== undefined && { avatar_emoji }),
    })
    .eq('email', email.toLowerCase());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
