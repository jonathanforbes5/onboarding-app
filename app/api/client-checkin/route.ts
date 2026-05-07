import { NextRequest, NextResponse } from 'next/server';

// Bridge between dashboard.roofignite.com and the Client Check-In Google Sheet.
// Reads happen client-side via the public gviz/tq endpoint — this route exists for
// AUTHENTICATED WRITES. Uses an OAuth refresh-token flow so the client browser
// never sees Google credentials.
//
// Required Vercel env vars (server-side, NOT NEXT_PUBLIC_):
//   GOOGLE_CLIENT_ID         — OAuth client ID
//   GOOGLE_CLIENT_SECRET     — OAuth client secret
//   GOOGLE_REFRESH_TOKEN     — refresh token issued for oscar@roofignite.com (scope: spreadsheets)
//
// Sheet: https://docs.google.com/spreadsheets/d/15xYnNomoGM3bQn0TGsIaQaH7bks4ZY3_N3ESFJKIl1Q/

const SHEET_ID = '15xYnNomoGM3bQn0TGsIaQaH7bks4ZY3_N3ESFJKIl1Q';
const TAB_NAME = 'Main';

// Headers in column order — matches the live sheet (verified 2026-05-07).
// Editable on the dashboard form; everything else is render-only.
const HEADERS = [
  'Business Name', 'Client Name', 'Signed Contract', 'Client AI Status',
  'Appts Expectation', 'General Location', 'Communication', 'CC', 'MGMT Fee',
  'Start Date', 'Stripe Customer ID', 'Stripe Email',
  'Before & After Onboarding', 'Before Launch', 'Just Launched',
  '7 Hours After Launch', 'Month 1 - Check-in 1', 'Month 1 - Check-in 2',
  'Month 1 - Check-in 3', 'Month 1 - Check-in 4', 'Referral Email',
  'Did we ask for referrals?', 'How many times did you ask?',
  'How many referrals did we get?', 'Pod', 'Primary CSM', 'Client Status',
  'Niche', 'Churn Date', 'Churn Reason', 'Churn Explanation', 'Cycle Churned',
  'Contact Email', 'Contact Phone', 'Client Notes', 'Secondary CSM',
  'Billing Cycles', 'Sales Attribution', 'MGMT Fees Earned',
  'MGMT Fees Collected', 'Cycles Billed', 'Cycle 1 Billing Amount',
  'Close Date', 'Onboarding Date', 'Ready to Launch Date', 'Launch Date',
  'Closer', 'Client Memory Folder', 'Primary GHL Contact ID', 'Setup Fee',
] as const;

const EDITABLE = new Set<string>([
  'Business Name', 'Client Name', 'Signed Contract', 'Client AI Status',
  'Appts Expectation', 'General Location', 'Communication', 'CC', 'MGMT Fee',
  'Start Date', 'Stripe Customer ID', 'Stripe Email', 'Pod', 'Primary CSM',
  'Client Status', 'Niche', 'Contact Email', 'Contact Phone', 'Client Notes',
  'Secondary CSM',
]);

// A1 column letter for a 0-indexed column (handles A..Z, AA..ZZ).
function colLetter(idx: number): string {
  let s = '';
  let n = idx;
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

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
  const id     = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  const refresh = process.env.GOOGLE_REFRESH_TOKEN;
  if (!id || !secret || !refresh) {
    const visibleKeys = Object.keys(process.env).filter((k) => /GOOGLE|VERCEL_PROJECT|VERCEL_ENV/i.test(k)).sort();
    const project = process.env.VERCEL_PROJECT_NAME ?? 'unknown';
    throw new Error(`Missing Google creds on project=${project}. Visible: ${JSON.stringify(visibleKeys)}. Lengths: id=${(id ?? '').length} secret=${(secret ?? '').length} refresh=${(refresh ?? '').length}`);
  }
  const body = new URLSearchParams({
    client_id: id,
    client_secret: secret,
    refresh_token: refresh,
    grant_type: 'refresh_token',
  });
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const j = await r.json() as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!j.access_token) {
    throw new Error(`Token refresh failed: ${j.error_description || j.error || 'unknown'}`);
  }
  cachedAccessToken = {
    value: j.access_token,
    expiresAt: Date.now() + (j.expires_in ?? 3600) * 1000,
  };
  return j.access_token;
}

async function findRowByBusinessName(token: string, businessName: string): Promise<number | null> {
  // Read column A only — we just need the row index.
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TAB_NAME)}!A2:A`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Sheet read failed: ${r.status}`);
  const j = await r.json() as { values?: string[][] };
  const rows = j.values ?? [];
  const target = businessName.trim().toLowerCase();
  for (let i = 0; i < rows.length; i++) {
    if ((rows[i][0] ?? '').trim().toLowerCase() === target) {
      return i + 2; // header is row 1, data starts at row 2
    }
  }
  return null;
}

// GET /api/client-checkin → returns { headers, editable }.
// Convenience for the dashboard to know what fields to render and which are editable.
// (Reads of actual values still happen client-side via gviz/tq.)
export function GET() {
  return NextResponse.json(
    { headers: HEADERS, editable: Array.from(EDITABLE), sheetId: SHEET_ID, tab: TAB_NAME },
    { headers: corsHeaders },
  );
}

// POST /api/client-checkin
// Body: { businessName: string, fields: { 'Field Name': value, ... } }
// Returns: { ok: true, row, updated } or { ok: false, error }
export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400, headers: corsHeaders }); }

  const businessName = (body?.businessName ?? '').toString().trim();
  const fields       = body?.fields as Record<string, unknown> | undefined;
  if (!businessName) {
    return NextResponse.json({ ok: false, error: 'businessName required' }, { status: 400, headers: corsHeaders });
  }
  if (!fields || typeof fields !== 'object') {
    return NextResponse.json({ ok: false, error: 'fields object required' }, { status: 400, headers: corsHeaders });
  }

  // Reject anything not in the editable allowlist — locked-down by design.
  const rejected: string[] = [];
  for (const k of Object.keys(fields)) {
    if (!EDITABLE.has(k)) rejected.push(k);
  }
  if (rejected.length) {
    return NextResponse.json(
      { ok: false, error: `non-editable fields: ${rejected.join(', ')}` },
      { status: 400, headers: corsHeaders },
    );
  }

  try {
    const token = await getAccessToken();
    const rowIdx = await findRowByBusinessName(token, businessName);
    if (!rowIdx) {
      return NextResponse.json(
        { ok: false, error: `no row found for businessName "${businessName}"` },
        { status: 404, headers: corsHeaders },
      );
    }

    // Build batch update payload — one A1 range per field.
    const valueRanges = [];
    for (const [field, raw] of Object.entries(fields)) {
      const colIdx = (HEADERS as readonly string[]).indexOf(field);
      if (colIdx < 0) continue;
      const cell = `${TAB_NAME}!${colLetter(colIdx)}${rowIdx}`;
      const val  = raw == null ? '' : String(raw);
      valueRanges.push({ range: cell, values: [[val]] });
    }
    if (valueRanges.length === 0) {
      return NextResponse.json({ ok: true, row: rowIdx, updated: 0 }, { headers: corsHeaders });
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ valueInputOption: 'USER_ENTERED', data: valueRanges }),
    });
    const j = await r.json() as { error?: { message?: string }; totalUpdatedCells?: number };
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: j?.error?.message ?? `sheet write failed (${r.status})` },
        { status: 500, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { ok: true, row: rowIdx, updated: j.totalUpdatedCells ?? valueRanges.length },
      { headers: corsHeaders },
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500, headers: corsHeaders },
    );
  }
}
