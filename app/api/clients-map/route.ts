import { NextResponse } from 'next/server';
import locations from '@/data/geo/locations.json';

const AIRTABLE_API     = 'https://api.airtable.com/v0';
const BASE_ID          = 'appu7PwZohLkR6Wvi';
const MAIN_TABLE       = 'tblkuc7mLefV3ng4h';
const PODS_TABLE       = 'tblNDev0V8qpGo1aq';
const TEAM_TABLE       = 'tbluywa1vBDeqtzPC';

const SYNONYMS: Record<string, string> = {
  Conneticut: 'Connecticut',
  Arizone:    'Arizona',
  Dever:      'Denver',
};

function normalize(loc: string): string {
  let out = loc.trim();
  for (const [bad, good] of Object.entries(SYNONYMS)) {
    out = out.replace(new RegExp(`\\b${bad}\\b`, 'g'), good);
  }
  return out.replace(/\s+/g, ' ');
}

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

async function fetchAll(table: string, token: string): Promise<AirtableRecord[]> {
  const all: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const u: string = `${AIRTABLE_API}/${BASE_ID}/${table}?pageSize=100${offset ? `&offset=${offset}` : ''}`;
    const r: Response = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`Airtable ${table} ${r.status}`);
    const j = await r.json() as { records: AirtableRecord[]; offset?: string };
    all.push(...j.records);
    offset = j.offset;
  } while (offset);
  return all;
}

interface CityPoint {
  loc: string;
  lat: number;
  lng: number;
  active: number;
  churned: number;
  preLaunch: number;
  paused: number;
  total: number;
  ams: string[];          // Primary CSM names
  niches: string[];
  pods: string[];
  clients: { name: string; status: string; pod?: string; am?: string; niche?: string }[];
}

// Cache the response in-memory for 5 minutes — Airtable data rarely flips and we'd rather not
// hammer the API every time someone opens the section.
let cache: { at: number; payload: any } | null = null;
const CACHE_MS = 5 * 60 * 1000;

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return NextResponse.json(cache.payload);
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    // Diagnostic: tell us *which* env vars made it to this function so we can pinpoint why
    // AIRTABLE_TOKEN is missing while other vars (eg ANTHROPIC_API_KEY) are not.
    const visibleKeys = Object.keys(process.env)
      .filter((k) => /AIRTABLE|SUPABASE|ANTHROPIC|VERCEL/i.test(k))
      .sort();
    return NextResponse.json({
      error: 'AIRTABLE_TOKEN not set',
      diagnostic: {
        VERCEL_ENV:    process.env.VERCEL_ENV ?? null,
        VERCEL_REGION: process.env.VERCEL_REGION ?? null,
        VERCEL_GIT_COMMIT_SHA: (process.env.VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 7),
        VERCEL_PROJECT_ID:   process.env.VERCEL_PROJECT_ID ?? null,
        VERCEL_PROJECT_NAME: process.env.VERCEL_PROJECT_NAME ?? null,
        VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
        VERCEL_DEPLOYMENT_ID: process.env.VERCEL_DEPLOYMENT_ID ?? null,
        airtable_present_in_env: 'AIRTABLE_TOKEN' in process.env,
        airtable_value_length: (process.env.AIRTABLE_TOKEN ?? '').length,
        anthropic_value_length: (process.env.ANTHROPIC_API_KEY ?? '').length,
        supabase_url_value_length: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').length,
        relevantEnvKeys: visibleKeys,
      },
    }, { status: 500 });
  }

  try {
    const [main, pods, team] = await Promise.all([
      fetchAll(MAIN_TABLE, token),
      fetchAll(PODS_TABLE, token),
      fetchAll(TEAM_TABLE, token),
    ]);

    const podName = new Map<string, string>(pods.map(p => [p.id, (p.fields['Pod Name'] ?? 'Unknown') as string]));
    const teamName = new Map<string, string>(team.map(t => [t.id, (t.fields['Name'] ?? 'Unknown') as string]));

    const byLoc = new Map<string, CityPoint>();
    let unmatched = 0;
    const unmatchedLocs = new Set<string>();

    for (const rec of main) {
      const f = rec.fields;
      const rawLoc = (f['General Location'] as string | undefined ?? '').trim();
      if (!rawLoc) continue;
      const norm = normalize(rawLoc);
      const coords = (locations as Record<string, { lat: number; lng: number }>)[norm];
      if (!coords) {
        unmatched++;
        unmatchedLocs.add(norm);
        continue;
      }

      let p = byLoc.get(norm);
      if (!p) {
        p = {
          loc: norm, lat: coords.lat, lng: coords.lng,
          active: 0, churned: 0, preLaunch: 0, paused: 0, total: 0,
          ams: [], niches: [], pods: [], clients: [],
        };
        byLoc.set(norm, p);
      }

      const status = (f['Client Status'] as string | undefined) ?? 'Unknown';
      if (status === 'Active')      p.active++;
      else if (status === 'Churned') p.churned++;
      else if (status === 'Pre-Launch') p.preLaunch++;
      else if (status === 'Paused') p.paused++;
      p.total++;

      const csmIds = (f['Primary CSM'] as string[] | undefined) ?? [];
      const am = csmIds.map(id => teamName.get(id)).filter(Boolean) as string[];
      for (const a of am) if (!p.ams.includes(a)) p.ams.push(a);

      const niche = f['Niche'] as string | undefined;
      if (niche && !p.niches.includes(niche)) p.niches.push(niche);

      const podIds = (f['Pod'] as string[] | undefined) ?? [];
      const podLabels = podIds.map(id => podName.get(id)).filter(Boolean) as string[];
      for (const pd of podLabels) if (!p.pods.includes(pd)) p.pods.push(pd);

      const business = f['Business Name'] as string | undefined;
      if (business) {
        p.clients.push({
          name: business,
          status,
          pod: podLabels[0],
          am: am[0],
          niche,
        });
      }
    }

    const payload = {
      points: Array.from(byLoc.values()).sort((a, b) => b.total - a.total),
      totals: {
        clients: main.length,
        active: main.filter(r => r.fields['Client Status'] === 'Active').length,
        churned: main.filter(r => r.fields['Client Status'] === 'Churned').length,
        preLaunch: main.filter(r => r.fields['Client Status'] === 'Pre-Launch').length,
        unmatched,
        unmatchedLocs: Array.from(unmatchedLocs).sort(),
      },
      generatedAt: Date.now(),
    };

    cache = { at: Date.now(), payload };
    return NextResponse.json(payload);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
