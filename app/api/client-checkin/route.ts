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
  // 2026-05-31 — Milestones tab fields. The dashboard's shared.js
  // EDITABLE set already includes these; the backend was lagging behind,
  // which caused Launch Date / Ready to Launch / etc. saves to fail
  // with "non-editable fields" errors.
  'Close Date', 'Onboarding Date', 'Ready to Launch Date', 'Launch Date',
  'Before & After Onboarding', 'Before Launch', 'Just Launched',
  '7 Hours After Launch',
  'Month 1 - Check-in 1', 'Month 1 - Check-in 2',
  'Month 1 - Check-in 3', 'Month 1 - Check-in 4',
  'Referral Email', 'Did we ask for referrals?',
  'How many times did you ask?', 'How many referrals did we get?',
  'Initial Opt-In Email', 'Onboarding Email',
  'Handoff Posted', 'Handoff Acknowledged',
  'Do we ask for testimonials?', 'Testimonial Email',
  // 2026-06-25 — Reference / Videographer flags (cols BJ/BK). These live
  // past the static HEADERS map above, so the write loop resolves their
  // column by live header-name lookup instead of position.
  'Reference-Call Friendly', 'Videographer Candidate',
  // 2026-07-05 — Communication Milestones panel (cols BL/BM, live-header
  // resolved). Touch level per Check-In SOP §4; call window per §4 Step 4.
  'Touch Level', 'Preferred Call Window',
  // 2026-07-16 — Contract chip on the account page lets CSMs paste the
  // contract Drive link when it's missing.
  'ContractLink',
  // 2026-08-01 — Master Creatives chip on the account page (same pattern
  // as ContractLink; col resolved by live header-name lookup).
  'Master Creatives Folder',
  // 2026-08-21 — Creative Brief panel (account page, Creative tab). The
  // 17 brief columns (DJ–DZ) are inline-editable on the panel, plus the
  // Website / Client Memory links get add-when-missing bubbles. All
  // resolved by live header-name lookup like the chips above.
  'Revenue Tier', 'Company Size', 'Years in Business', 'Ownership',
  'Owner Runs Appointments', 'Financing Details', 'Warranty Details',
  'Certifications & Trust Badges', 'Avg Ticket', 'Retail vs Insurance Mix',
  'Discounts', 'Languages Served', 'Positioning Angle',
  'Creative Constraints / Do-Not-Advertise', 'Angles Tested Log',
  'Service Area (Ads)', 'Brief Verified',
  'Website', 'Client Memory Folder',
]);

// Strip common business suffixes for fuzzy matching when an exact lookup
// misses (e.g. dashboard says "Evolve Roofing" but the sheet has
// "Evolve Roofing LLC"). Whitespace + punctuation collapsed.
function normalizeBiz(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,'"’]/g, '')                            // strip punctuation
    .replace(/\b(llc|l\.l\.c\.|inc|inc\.|incorporated|corp|corporation|co|company|ltd|limited|llp|pllc|pc|holdings|group|services|solutions)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

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

  // Pass 1: exact case-insensitive match (fast path, preserves prior behavior).
  for (let i = 0; i < rows.length; i++) {
    if ((rows[i][0] ?? '').trim().toLowerCase() === target) {
      return i + 2;
    }
  }

  // Pass 2: normalized fallback — strip LLC / Inc / etc. from both sides.
  // Only return when EXACTLY ONE row matches the normalized name, so we
  // never silently pick the wrong sibling (e.g. "Modern Roofing" vs
  // "Modern Roofing Co" both reducing to "modern roofing"). When 0 or 2+
  // matches, return null and let the caller surface the error.
  const targetNorm = normalizeBiz(businessName);
  if (!targetNorm) return null;
  const hits: number[] = [];
  for (let i = 0; i < rows.length; i++) {
    if (normalizeBiz(rows[i][0] ?? '') === targetNorm) {
      hits.push(i + 2);
    }
  }
  return hits.length === 1 ? hits[0] : null;
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
// Body: { businessName: string, clientId?: string|number, fields: { 'Field Name': value, ... } }
// clientId (permanent numeric Client ID) takes priority for row matching —
// rename-proof; businessName is the fallback for unstamped rows.
// Returns: { ok: true, row, updated, matched_by } or { ok: false, error }
export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400, headers: corsHeaders }); }

  const businessName = (body?.businessName ?? '').toString().trim();
  const clientId     = (body?.clientId ?? '').toString().trim();
  const fields       = body?.fields as Record<string, unknown> | undefined;
  if (!businessName && !/^\d+$/.test(clientId)) {
    return NextResponse.json({ ok: false, error: 'businessName or clientId required' }, { status: 400, headers: corsHeaders });
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

    // Live header row — ALWAYS fetched; every field resolves by NAME.
    // The static HEADERS map above is metadata for GET only. Writing by
    // hardcoded position corrupted data when the sheet was re-laid-out on
    // 2026-07-13 (e.g. "Launch Date" saves landed in the "Cycle 1 Billing
    // Amount" column). Position is a liability; header names aren't.
    const hr = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TAB_NAME)}!1:1`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!hr.ok) {
      return NextResponse.json(
        { ok: false, error: `header read failed (${hr.status}) — refusing to write by stale positions` },
        { status: 502, headers: corsHeaders },
      );
    }
    const hj = await hr.json() as { values?: string[][] };
    const liveHeaders: string[] = (hj.values && hj.values[0])
      ? hj.values[0].map((h) => String(h ?? ''))
      : [];
    if (!liveHeaders.length) {
      return NextResponse.json(
        { ok: false, error: 'empty header row — refusing to write' },
        { status: 502, headers: corsHeaders },
      );
    }

    // ---- Row matching: permanent Client ID first (rename-proof), then name ----
    let rowIdx: number | null = null;
    let matchedBy = '';
    if (/^\d+$/.test(clientId)) {
      const idColIdx = liveHeaders.findIndex((h) => h.trim().toLowerCase() === 'client id');
      if (idColIdx >= 0) {
        const idCol = colLetter(idColIdx);
        const cr = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(TAB_NAME)}!${idCol}2:${idCol}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (cr.ok) {
          const cj = await cr.json() as { values?: string[][] };
          const cells = cj.values ?? [];
          for (let i = 0; i < cells.length; i++) {
            if (((cells[i]?.[0] ?? '') + '').trim() === clientId) {
              rowIdx = i + 2;
              matchedBy = 'client_id';
              break;
            }
          }
        }
      }
    }
    if (!rowIdx && businessName) {
      rowIdx = await findRowByBusinessName(token, businessName);
      if (rowIdx) matchedBy = 'business_name';
    }
    if (!rowIdx) {
      return NextResponse.json(
        { ok: false, error: `no row found for clientId "${clientId}" / businessName "${businessName}"` },
        { status: 404, headers: corsHeaders },
      );
    }

    // Build batch update payload — one A1 range per field.
    const valueRanges = [];
    const unresolved: string[] = [];
    for (const [field, raw] of Object.entries(fields)) {
      const colIdx = liveHeaders.findIndex((h) => h.trim().toLowerCase() === field.trim().toLowerCase());
      if (colIdx < 0) { unresolved.push(field); continue; }
      const cell = `${TAB_NAME}!${colLetter(colIdx)}${rowIdx}`;
      const val  = raw == null ? '' : String(raw);
      valueRanges.push({ range: cell, values: [[val]] });
    }
    if (unresolved.length) {
      return NextResponse.json(
        { ok: false, error: `columns not found on sheet: ${unresolved.join(', ')}` },
        { status: 400, headers: corsHeaders },
      );
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
      { ok: true, row: rowIdx, updated: j.totalUpdatedCells ?? valueRanges.length, matched_by: matchedBy },
      { headers: corsHeaders },
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500, headers: corsHeaders },
    );
  }
}
