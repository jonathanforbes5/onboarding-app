import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROJECT_REF = 'keceufndfmmcpwferudo';

const CREATE_SQL = `
create table if not exists search_logs (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null default 'anonymous',
  query        text not null,
  result_title text,
  result_kind  text,
  created_at   timestamptz default now()
);
alter table search_logs enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'search_logs' and policyname = 'allow_all') then
    create policy "allow_all" on search_logs for all using (true) with check (true);
  end if;
end $$;
create index if not exists idx_search_logs_created on search_logs(created_at desc);
create index if not exists idx_search_logs_user    on search_logs(user_name);
`;

async function createTable(): Promise<void> {
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
  if (!mgmtToken) return;
  await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: CREATE_SQL }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ ok: true });
  }

  try {
    const body = await req.json() as {
      query: string;
      result_title?: string;
      result_kind?: string;
      user_name?: string;
    };

    const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
    const row = {
      user_name:    body.user_name ?? 'anonymous',
      query:        body.query,
      result_title: body.result_title ?? null,
      result_kind:  body.result_kind ?? null,
    };

    const { error } = await client.from('search_logs').insert(row);

    if (error?.message?.includes('does not exist')) {
      // Table missing — auto-create it then retry
      await createTable();
      await client.from('search_logs').insert(row);
    }
  } catch {
    // fire-and-forget
  }

  return NextResponse.json({ ok: true });
}
