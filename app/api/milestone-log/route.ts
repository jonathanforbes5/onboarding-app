import { NextRequest, NextResponse } from 'next/server';

// Communication Milestones — append-only audit log for the dashboard's
// Communication Milestones panel (Campaign Stats → Overview).
//
// Every check/uncheck/mid-cycle update/touch-level change is ONE APPENDED ROW
// on the 'Milestone Log' tab of the Client Check-In Sheet. Nothing is ever
// edited or deleted — unchecking appends an 'unchecked' row with a required
// reason, so the original check (who/when) stays on record. Milestone state =
// last checked/unchecked row per (business, milestone). Timestamps are stamped
// HERE (server-side) so the browser clock can't backdate a check.
//
// These rows tie to CSM commissions — treat this file as commission
// infrastructure, not UI plumbing.
//
// Reads happen client-side via the public gviz endpoint (same pattern as the
// Main tab). This route also keeps the 8 legacy SOP dropdown columns on Main
// in sync (derived from milestone state) so existing Airtable reporting keeps
// working unchanged.
//
// Same Vercel env vars as client-checkin: GOOGLE_CLIENT_ID,
// GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN (scope: spreadsheets).

const SHEET_ID = '15xYnNomoGM3bQn0TGsIaQaH7bks4ZY3_N3ESFJKIl1Q';
const LOG_TAB = 'Milestone Log';
const MAIN_TAB = 'Main';

// Log tab columns (A:I) — created 2026-07-05.
// Timestamp | Business Name | Milestone | Action | By Name | By Email | Note | Cycle | Pace

const ACTIONS = new Set(['checked', 'unchecked', 'update', 'touch-level']);

// Milestone keys the dashboard sends. Kept in lockstep with the
// COMM_MILESTONES config in shared.js (Command Centre v2). The weekly-call-*
// keys were retired in the Aug-2026 remold to Mani's CSM Playbook but stay
// accepted so old log rows can still be unchecked/corrected.
const MILESTONE_KEYS = new Set([
  'closer-handoff', 'slack-channel', 'intro-call', 'onboarding-call',
  'billing-method', 'recap-email', 'prelaunch-expectation', 'approval-video',
  'ci-0', 'ci-1', 'ci-2', 'ci-3', 'ci-4', 'ci-5', 'ci-6',
  'renewal-planning',
  'weekly-call-1', 'weekly-call-2', 'weekly-call-3',
]);

// Legacy Main-tab dropdown columns, derived from milestone state so the
// existing airtable_sync 'clients' mode keeps reporting without changes.
// CI-2 (48h) has no legacy slot — new granularity, log-only.
const LEGACY_DERIVE: Record<string, string[]> = {
  'Before & After Onboarding': ['closer-handoff', 'intro-call', 'onboarding-call', 'recap-email'],
  'Before Launch':             ['slack-channel', 'prelaunch-expectation'],
  'Just Launched':             ['ci-0'],
  '7 Hours After Launch':      ['ci-1'],
  'Month 1 - Check-in 1':      ['ci-3'],
  'Month 1 - Check-in 2':      ['ci-4'],
  'Month 1 - Check-in 3':      ['ci-5'],
  'Month 1 - Check-in 4':      ['ci-6'],
};

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

// EST timestamp, matching the billing convention in Cole's repo (the sheet
// audience reads EST). ISO-like with explicit offset so it stays unambiguous.
function estNow(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    timeZoneName: 'longOffset',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? '';
  const offset = get('timeZoneName').replace('GMT', '') || '-05:00';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}${offset}`;
}

async function sheetGet(token: string, range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Sheet read failed (${range}): ${r.status}`);
  const j = await r.json() as { values?: string[][] };
  return j.values ?? [];
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

// Recompute the legacy dropdown columns on Main for one client from the full
// log. Complete → 'Done'. No longer complete and the cell says 'Done' →
// 'Pending' (never blanked — the log holds the trace, Main just reports).
async function deriveLegacyColumns(token: string, businessName: string): Promise<void> {
  const log = await sheetGet(token, `'${LOG_TAB}'!A2:I`);
  const target = businessName.trim().toLowerCase();
  // state: milestone key -> checked?
  const state: Record<string, boolean> = {};
  for (const row of log) {
    if ((row[1] ?? '').trim().toLowerCase() !== target) continue;
    const action = (row[3] ?? '').trim();
    const key = (row[2] ?? '').trim();
    if (action === 'checked') state[key] = true;
    else if (action === 'unchecked') state[key] = false;
  }

  const headers = (await sheetGet(token, `'${MAIN_TAB}'!1:1`))[0] ?? [];
  const colOf = (name: string) =>
    headers.findIndex(h => (h ?? '').trim().toLowerCase() === name.toLowerCase());

  const nameRows = await sheetGet(token, `'${MAIN_TAB}'!A2:A`);
  let rowIdx = -1;
  for (let i = 0; i < nameRows.length; i++) {
    if ((nameRows[i][0] ?? '').trim().toLowerCase() === target) { rowIdx = i + 2; break; }
  }
  if (rowIdx < 0) return; // no Main row — log still stands on its own

  // Current legacy values so we only flip Done→Pending, never stomp
  // hand-entered values like 'Skipped'.
  const rowVals = (await sheetGet(token, `'${MAIN_TAB}'!${rowIdx}:${rowIdx}`))[0] ?? [];

  const data: { range: string; values: string[][] }[] = [];
  for (const [legacyCol, keys] of Object.entries(LEGACY_DERIVE)) {
    const ci = colOf(legacyCol);
    if (ci < 0) continue;
    const complete = keys.every(k => state[k]);
    const current = (rowVals[ci] ?? '').trim();
    let next: string | null = null;
    if (complete && current !== 'Done') next = 'Done';
    else if (!complete && current === 'Done' && keys.some(k => k in state)) next = 'Pending';
    if (next !== null) {
      data.push({ range: `'${MAIN_TAB}'!${colLetter(ci)}${rowIdx}`, values: [[next]] });
    }
  }
  if (!data.length) return;
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${(token)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ valueInputOption: 'USER_ENTERED', data }),
  });
}

// POST /api/milestone-log
// Body: { businessName, milestone?, action, byName, byEmail, note?, cycle?, pace? }
//   action 'checked'   — milestone required
//   action 'unchecked' — milestone + note (reason) required
//   action 'update'    — mid-cycle update; note required, pace optional (on-pace/off-pace)
//   action 'touch-level' — note = new level (High/Standard/Light)
export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400, headers: corsHeaders }); }

  const businessName = (body?.businessName ?? '').toString().trim();
  const milestone = (body?.milestone ?? '').toString().trim();
  const action = (body?.action ?? '').toString().trim();
  const byName = (body?.byName ?? '').toString().trim();
  const byEmail = (body?.byEmail ?? '').toString().trim();
  const note = (body?.note ?? '').toString().trim();
  const cycle = (body?.cycle ?? '').toString().trim();
  const pace = (body?.pace ?? '').toString().trim();

  const bad = (error: string) =>
    NextResponse.json({ ok: false, error }, { status: 400, headers: corsHeaders });

  if (!businessName) return bad('businessName required');
  if (!ACTIONS.has(action)) return bad(`action must be one of: ${Array.from(ACTIONS).join(', ')}`);
  if (!byName || !byEmail) return bad('byName and byEmail required');
  if (!byEmail.toLowerCase().endsWith('@roofignite.com')) return bad('byEmail must be @roofignite.com');
  if ((action === 'checked' || action === 'unchecked') && !MILESTONE_KEYS.has(milestone)) {
    return bad(`unknown milestone "${milestone}"`);
  }
  if (action === 'unchecked' && !note) return bad('unchecking requires a reason (note)');
  if ((action === 'update' || action === 'touch-level') && !note) return bad('note required');

  try {
    const token = await getAccessToken();
    const row = [estNow(), businessName, milestone, action, byName, byEmail, note, cycle, pace];
    const r = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(`'${LOG_TAB}'!A:I`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: [row] }),
      },
    );
    const j = await r.json() as { error?: { message?: string } };
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: j?.error?.message ?? `append failed (${r.status})` },
        { status: 500, headers: corsHeaders },
      );
    }

    // Best-effort — the log row is the source of truth; a derive failure
    // must not fail the check.
    let derived = true;
    if (action === 'checked' || action === 'unchecked') {
      try { await deriveLegacyColumns(token, businessName); }
      catch { derived = false; }
    }

    return NextResponse.json({ ok: true, timestamp: row[0], derived }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500, headers: corsHeaders });
  }
}
