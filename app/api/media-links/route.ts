import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROJECT_REF = 'keceufndfmmcpwferudo';

const CREATE_SQL = `
create table if not exists media_links (
  slot_key   text primary key,
  url        text not null,
  title      text,
  transcript text,
  updated_at timestamptz default now(),
  updated_by text
);
alter table media_links add column if not exists transcript text;
alter table media_links enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'media_links' and policyname = 'allow_all') then
    create policy "allow_all" on media_links for all using (true) with check (true);
  end if;
end $$;
`;

async function ensureTable(): Promise<void> {
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
  if (!mgmtToken) return;
  await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CREATE_SQL }),
  }).catch(() => {});
}

function client() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || (!serviceKey && !anonKey)) return null;
  return createClient(supabaseUrl, serviceKey ?? anonKey!);
}

export async function GET(req: NextRequest) {
  const supabase = client();
  if (!supabase) return NextResponse.json({ links: {} });
  const slot = req.nextUrl.searchParams.get('slot');

  try {
    const q = supabase.from('media_links').select('slot_key, url, title, transcript, updated_at, updated_by');
    const { data, error } = slot ? await q.eq('slot_key', slot).maybeSingle() : await q;

    if (error?.message?.includes('does not exist')) {
      await ensureTable();
      return NextResponse.json({ links: slot ? null : {} });
    }
    if (error) return NextResponse.json({ error: error.message }, { status: 200 });

    if (slot) return NextResponse.json({ link: data ?? null });
    const map: Record<string, any> = {};
    for (const row of (data as any[]) ?? []) map[row.slot_key] = row;
    return NextResponse.json({ links: map });
  } catch (e) {
    return NextResponse.json({ links: {} });
  }
}

export async function POST(req: NextRequest) {
  const supabase = client();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });

  const body = await req.json() as { slot_key: string; url?: string; title?: string; transcript?: string; updated_by?: string };
  if (!body.slot_key) {
    return NextResponse.json({ error: 'slot_key required' }, { status: 400 });
  }

  // Allow partial updates — if url isn't passed, leave it alone (we'll fetch existing).
  let existingUrl: string | null = null;
  if (!body.url) {
    const existing = await supabase.from('media_links').select('url').eq('slot_key', body.slot_key.trim()).maybeSingle();
    existingUrl = (existing.data as any)?.url ?? null;
    if (!existingUrl) {
      return NextResponse.json({ error: 'url required for new slot' }, { status: 400 });
    }
  }

  const row: any = {
    slot_key:   body.slot_key.trim(),
    url:        (body.url ?? existingUrl)!.trim(),
    updated_by: body.updated_by ?? 'admin',
    updated_at: new Date().toISOString(),
  };
  if (body.title      !== undefined) row.title      = body.title?.trim() ?? null;
  if (body.transcript !== undefined) row.transcript = body.transcript ?? null;

  const { error } = await supabase.from('media_links').upsert(row, { onConflict: 'slot_key' });

  // Catch both "table doesn't exist" AND "column doesn't exist in schema cache"
  // — Supabase reports them with different error strings.
  const needsMigration = error && /does not exist|Could not find the .* column/i.test(error.message);
  if (needsMigration) {
    await ensureTable();
    const retry = await supabase.from('media_links').upsert(row, { onConflict: 'slot_key' });
    if (retry.error) return NextResponse.json({ error: retry.error.message, hint: 'Run: alter table media_links add column if not exists transcript text;' }, { status: 500 });
  } else if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slot_key: row.slot_key });
}

export async function DELETE(req: NextRequest) {
  const supabase = client();
  if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  const slot = req.nextUrl.searchParams.get('slot');
  if (!slot) return NextResponse.json({ error: 'slot required' }, { status: 400 });
  const { error } = await supabase.from('media_links').delete().eq('slot_key', slot);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
