import { NextRequest, NextResponse } from 'next/server';

// Partner Status (KRS / StoneGrove) for the dashboard account page.
// Reads/writes the "Client Sheet" column on the Account Master Dashboard's
// pod tabs, ONLY on the client's block header row (the first row for the
// account whose Cycle cell is not a "Cycle N" row) — cycle rows are owned
// by position-indexed Apps Scripts and must never be touched here.
//
// GET  /api/amd-partner-status?name=<account>   -> { ok, value, pod, row }
// POST /api/amd-partner-status  { accountName, value: 'KRS'|'StoneGrove'|'' }
//
// Uses the same server-side Google OAuth refresh-token flow as
// /api/client-checkin (env: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET /
// GOOGLE_REFRESH_TOKEN, scope: spreadsheets).

const AMD_SHEET_ID = '1W560POSt6T4QsNObZGxz2BKyCNvRIW7dubAxhIVkAy4';
const POD_TABS = [
  'Pod 1 - RoofIgnite', 'Pod 2 - RoofIgnite', 'Pod 3 - RoofIgnite',
  'Pod 4 - RoofIgnite', 'Pod 5 - RoofIgnite',
];
const COLUMN = 'Client Sheet';
const ALLOWED = new Set(['', 'KRS', 'StoneGrove']);

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

let cachedAccessToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.value;
  }
  const id = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  const refresh = process.env.GOOGLE_REFRESH_TOKEN;
  if (!id || !secret || !refresh) throw new Error('Missing Google creds');
  const body = new URLSearchParams({
    client_id: id, client_secret: secret,
    refresh_token: refresh, grant_type: 'refresh_token',
  });
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const j = await r.json() as { access_token?: string; expires_in?: number; error_description?: string; error?: string };
  if (!j.access_token) throw new Error(`Token refresh failed: ${j.error_description || j.error || 'unknown'}`);
  cachedAccessToken = { value: j.access_token, expiresAt: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return j.access_token;
}

function colLetter(idx: number): string {
  let s = '';
  let n = idx;
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

type Located = { tab: string; row: number; colIdx: number; value: string };

// Find the account's block header row + the Client Sheet column, per tab
// (each pod tab resolves its own header row — layouts differ between tabs).
async function locate(token: string, accountName: string): Promise<Located | null> {
  const target = accountName.trim().toLowerCase();
  for (const tab of POD_TABS) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${AMD_SHEET_ID}/values/${encodeURIComponent(tab)}!A1:AZ1000`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) continue;
    const j = await r.json() as { values?: string[][] };
    const rows = j.values ?? [];
    if (!rows.length) continue;
    const headers = rows[0].map((h) => String(h ?? '').trim().toLowerCase());
    const colIdx = headers.indexOf(COLUMN.toLowerCase());
    const cycleIdx = headers.indexOf('cycle');
    if (colIdx < 0) continue;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i] ?? [];
      const name = String(row[0] ?? '').trim().toLowerCase();
      if (name !== target) continue;
      const cycle = cycleIdx >= 0 ? String(row[cycleIdx] ?? '').trim() : '';
      if (/^cycle/i.test(cycle)) continue;  // cycle rows are off-limits
      return { tab, row: i + 1, colIdx, value: String(row[colIdx] ?? '').trim() };
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const name = (req.nextUrl.searchParams.get('name') ?? '').trim();
  if (!name) {
    return NextResponse.json({ ok: false, error: 'name required' }, { status: 400, headers: corsHeaders });
  }
  try {
    const token = await getAccessToken();
    const loc = await locate(token, name);
    if (!loc) {
      return NextResponse.json({ ok: false, error: `account "${name}" not found on any pod tab` }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json({ ok: true, value: loc.value, pod: loc.tab, row: loc.row }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400, headers: corsHeaders }); }

  const accountName = (body?.accountName ?? '').toString().trim();
  const value = (body?.value ?? '').toString().trim();
  if (!accountName) {
    return NextResponse.json({ ok: false, error: 'accountName required' }, { status: 400, headers: corsHeaders });
  }
  if (!ALLOWED.has(value)) {
    return NextResponse.json({ ok: false, error: `value must be one of KRS, StoneGrove, or empty to clear` }, { status: 400, headers: corsHeaders });
  }

  try {
    const token = await getAccessToken();
    const loc = await locate(token, accountName);
    if (!loc) {
      return NextResponse.json({ ok: false, error: `account "${accountName}" not found on any pod tab` }, { status: 404, headers: corsHeaders });
    }
    const cell = `${encodeURIComponent(loc.tab)}!${colLetter(loc.colIdx)}${loc.row}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${AMD_SHEET_ID}/values/${cell}?valueInputOption=RAW`;
    const r = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [[value]] }),
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({} as any)) as { error?: { message?: string } };
      return NextResponse.json({ ok: false, error: j?.error?.message ?? `sheet write failed (${r.status})` }, { status: 500, headers: corsHeaders });
    }
    return NextResponse.json({ ok: true, value, pod: loc.tab, row: loc.row }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500, headers: corsHeaders });
  }
}
