/**
 * Add new users to the allowed_users table.
 * Protected by SETUP_SECRET — same token used for /api/setup.
 *
 * Usage:
 *   POST https://onboarding.roofignite.com/api/add-users?token=<SETUP_SECRET>
 *   Body: { users: [{ email, display_name, role, user_key }] }
 *
 * Or use the GET shorthand for the pre-configured Pod 5 users:
 *   GET https://onboarding.roofignite.com/api/add-users?token=<SETUP_SECRET>&preset=pod5
 */

import { NextRequest, NextResponse } from 'next/server';

const PROJECT_REF = 'keceufndfmmcpwferudo';
const MGMT_API    = 'https://api.supabase.com';

const POD5_USERS_SQL = `
insert into allowed_users (email, display_name, role, user_key) values
  ('ksenia@roofignite.com', 'Ksenia', 'user', 'ksenia'),
  ('adeen@roofignite.com',  'Adeen',  'user', 'adeen')
on conflict (email) do update set
  display_name = excluded.display_name,
  role = excluded.role,
  user_key = excluded.user_key;
`;

async function runSql(managementToken: string, sql: string) {
  const res = await fetch(`${MGMT_API}/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export async function GET(req: NextRequest) {
  const token    = req.nextUrl.searchParams.get('token');
  const expected = process.env.SETUP_SECRET;
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!mgmtToken) {
    return NextResponse.json(
      { error: 'SUPABASE_MANAGEMENT_TOKEN env var is missing' },
      { status: 500 },
    );
  }

  const preset = req.nextUrl.searchParams.get('preset');

  if (preset === 'pod5') {
    const result = await runSql(mgmtToken, POD5_USERS_SQL);
    return NextResponse.json(
      {
        success: result.ok,
        message: result.ok
          ? '✅ Pod 5 users added: ksenia@roofignite.com and adeen@roofignite.com'
          : '❌ Failed to add Pod 5 users',
        detail: result.ok ? undefined : result.body,
      },
      { status: result.ok ? 200 : 500 },
    );
  }

  return NextResponse.json(
    {
      usage: 'GET /api/add-users?token=<SETUP_SECRET>&preset=pod5',
      presets: { pod5: 'Add Ksenia and Adeen (Pod 5)' },
    },
    { status: 200 },
  );
}

export async function POST(req: NextRequest) {
  const token    = req.nextUrl.searchParams.get('token');
  const expected = process.env.SETUP_SECRET;
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!mgmtToken) {
    return NextResponse.json(
      { error: 'SUPABASE_MANAGEMENT_TOKEN env var is missing' },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.users || !Array.isArray(body.users) || body.users.length === 0) {
    return NextResponse.json({ error: 'Body must include a users array' }, { status: 400 });
  }

  const rows = body.users.map((u: { email: string; display_name: string; role: string; user_key: string }) =>
    `('${u.email.toLowerCase().replace(/'/g, "''")}', '${u.display_name.replace(/'/g, "''")}', '${u.role}', '${u.user_key.replace(/'/g, "''")}')`
  ).join(',\n  ');

  const sql = `
insert into allowed_users (email, display_name, role, user_key) values
  ${rows}
on conflict (email) do update set
  display_name = excluded.display_name,
  role = excluded.role,
  user_key = excluded.user_key;
`;

  const result = await runSql(mgmtToken, sql);
  return NextResponse.json(
    {
      success: result.ok,
      message: result.ok ? `✅ ${body.users.length} user(s) added/updated` : '❌ SQL error',
      detail: result.ok ? undefined : result.body,
    },
    { status: result.ok ? 200 : 500 },
  );
}
