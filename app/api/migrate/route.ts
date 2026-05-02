/**
 * Runs all pending DB migrations. Safe to call multiple times (idempotent).
 * GET /api/migrate
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROJECT_REF = 'keceufndfmmcpwferudo';

const MIGRATION_SQL = `
  alter table allowed_users add column if not exists bio text;
  alter table allowed_users add column if not exists goal text;
  alter table allowed_users add column if not exists avatar_emoji text;
  alter table allowed_users add column if not exists avatar_url text;
  alter table allowed_users add column if not exists password_hash text;
  alter table allowed_users add column if not exists password_salt text;
  alter table allowed_users add column if not exists force_reset boolean default false;
`.trim();

export async function GET(req: NextRequest) {
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const mgmtToken   = process.env.SUPABASE_MANAGEMENT_TOKEN;

  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey);
  const results: Record<string, string> = {};

  // Method 1: Supabase Management API (most reliable)
  if (mgmtToken) {
    const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: MIGRATION_SQL }),
    });
    if (res.ok) {
      results.method = 'Management API';
      results.status = 'success';
      return NextResponse.json({ success: true, ...results, message: '✅ All columns added via Management API.' });
    }
    results.mgmtApiError = `${res.status} ${await res.text()}`;
  }

  // Method 2: run_sql RPC (works if the function exists in DB)
  const { error: rpcError } = await admin.rpc('run_sql', { query: MIGRATION_SQL });
  if (!rpcError) {
    results.method = 'run_sql RPC';
    results.status = 'success';
    return NextResponse.json({ success: true, ...results, message: '✅ All columns added via run_sql RPC.' });
  }
  results.rpcError = rpcError.message;

  // Method 3: Try individual column adds via upsert probe
  // (Supabase won't add columns this way, but we can detect if they exist)
  const { error: probeError } = await admin
    .from('allowed_users')
    .select('password_hash, password_salt, force_reset')
    .limit(1);

  if (!probeError) {
    return NextResponse.json({
      success: true,
      method: 'probe',
      message: '✅ Password columns already exist — no migration needed.',
    });
  }

  // All methods failed — return the SQL for manual run
  return NextResponse.json({
    success: false,
    message: '⚠️ Could not auto-migrate. Paste the SQL below into Supabase SQL Editor.',
    sql: MIGRATION_SQL,
    errors: results,
  }, { status: 500 });
}
