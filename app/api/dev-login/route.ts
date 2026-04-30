/**
 * Dev-only login bypass — generates a magic link server-side and redirects
 * directly, skipping the email step entirely.
 *
 * STAGING ONLY — never add BYPASS_TOKEN to the production Vercel project.
 *
 * Usage: https://<staging-url>/api/dev-login?token=ri-dev-2026&email=jonathan@roofignite.com
 *
 * Required Vercel env vars (staging only):
 *   BYPASS_TOKEN              = ri-dev-2026  (or any string you choose)
 *   SUPABASE_SERVICE_ROLE_KEY = <service_role key from Supabase → Settings → API>
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const email = req.nextUrl.searchParams.get('email') ?? 'jonathan@roofignite.com';

  // Guard — only works when BYPASS_TOKEN is set (never set on production)
  const expected = process.env.BYPASS_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL not set' },
      { status: 500 },
    );
  }

  // Ask Supabase to generate a magic link server-side — no email sent
  const res = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({
      type: 'magiclink',
      email: email.toLowerCase().trim(),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: 'Supabase error', detail: body }, { status: 502 });
  }

  const data = await res.json();
  const actionLink: string = data?.action_link ?? data?.properties?.action_link;

  if (!actionLink) {
    return NextResponse.json({ error: 'No action_link in response', data }, { status: 502 });
  }

  // Redirect directly to the magic link — browser completes auth, no email needed
  return NextResponse.redirect(actionLink);
}
