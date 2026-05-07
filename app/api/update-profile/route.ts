import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROJECT_REF = 'keceufndfmmcpwferudo';

const COLUMN_SQL = `
  alter table allowed_users add column if not exists bio text;
  alter table allowed_users add column if not exists goal text;
  alter table allowed_users add column if not exists avatar_emoji text;
  alter table allowed_users add column if not exists avatar_url text;
`.trim();

async function addProfileColumns(mgmtToken: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: COLUMN_SQL }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { email, bio, goal, avatar_emoji, avatar_url } = await req.json() as {
    email: string;
    bio?: string;
    goal?: string;
    avatar_emoji?: string;
    avatar_url?: string;
  };

  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceKey);
  const updateData = {
    ...(bio          !== undefined && { bio }),
    ...(goal         !== undefined && { goal }),
    ...(avatar_emoji !== undefined && { avatar_emoji }),
    ...(avatar_url   !== undefined && { avatar_url }),
  };

  let { error } = await admin
    .from('allowed_users')
    .update(updateData)
    .eq('email', email.toLowerCase());

  // If the update failed due to missing columns, auto-migrate and retry once.
  if (error && error.message.toLowerCase().includes('column')) {
    const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN ?? '';
    if (mgmtToken) {
      await addProfileColumns(mgmtToken);
    }
    // Retry regardless — if mgmt token isn't set, maybe another method worked.
    const retry = await admin
      .from('allowed_users')
      .update(updateData)
      .eq('email', email.toLowerCase());
    error = retry.error;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
