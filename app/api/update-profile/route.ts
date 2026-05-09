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
  if (!mgmtToken) return false;
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

async function tryUpdate(
  admin: any,
  email: string,
  updateData: Record<string, string | undefined>,
) {
  // `admin` typed as `any` because supabase-js v2's strict typed client
  // narrows update payloads to `never` when no Database generic is given. We
  // don't want to generate the full schema types just for this route — call
  // shape is verified at runtime via `.select('email')`.
  return admin
    .from('allowed_users')
    .update(updateData)
    .eq('email', email)
    .select('email');
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

  const normalizedEmail = email.toLowerCase().trim();
  const admin = createClient(supabaseUrl, serviceKey);
  const updateData: Record<string, string | undefined> = {};
  if (bio          !== undefined) updateData.bio          = bio;
  if (goal         !== undefined) updateData.goal         = goal;
  if (avatar_emoji !== undefined) updateData.avatar_emoji = avatar_emoji;
  if (avatar_url   !== undefined) updateData.avatar_url   = avatar_url;

  let { data: rows, error } = await tryUpdate(admin, normalizedEmail, updateData);

  // If columns are missing, auto-migrate then retry
  if (error && (error.message.includes('column') || error.message.includes('does not exist'))) {
    const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN ?? '';
    const migrated = await addProfileColumns(mgmtToken);

    if (!migrated) {
      return NextResponse.json({
        error: 'Profile columns are missing from the database. Ask an admin to visit /api/migrate to fix this.',
      }, { status: 500 });
    }

    const retry = await tryUpdate(admin, normalizedEmail, updateData);
    rows  = retry.data;
    error = retry.error;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Verify at least one row was actually updated
  if (!rows || rows.length === 0) {
    return NextResponse.json({
      error: `No user found with email ${normalizedEmail}. Profile could not be saved.`,
    }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
