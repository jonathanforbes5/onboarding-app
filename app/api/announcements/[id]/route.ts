import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as {
    title?: string; body?: string; link_url?: string;
    loom_url?: string; image_url?: string; published?: boolean;
  };

  const { data, error } = await client
    .from('announcements')
    .update({
      ...(body.title !== undefined && { title: body.title }),
      ...(body.body !== undefined && { body: body.body }),
      ...(body.link_url !== undefined && { link_url: body.link_url || null }),
      ...(body.loom_url !== undefined && { loom_url: body.loom_url || null }),
      ...(body.image_url !== undefined && { image_url: body.image_url || null }),
      ...(body.published !== undefined && { published: body.published }),
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ announcement: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { error } = await client.from('announcements').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
