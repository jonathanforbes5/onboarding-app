import { NextResponse } from 'next/server';
import locations from '@/data/geo/locations.json';

// Run per-request — never static-prerender this route at build time, or the
// response freezes to build-time Airtable data (and the in-memory cache below
// would never refresh from a real request). This is the documented pitfall.
export const dynamic = 'force-dynamic';

const AIRTABLE_API     = 'https://api.airtable.com/v0';
const BASE_ID          = 'appu7PwZohLkR6Wvi';
const MAIN_TABLE       = 'tblkuc7mLefV3ng4h';
const PODS_TABLE       = 'tblNDev0V8qpGo1aq';
const TEAM_TABLE       = 'tbluywa1vBDeqtzPC';
const CYCLES_TABLE     = 'tblie3xZrU6aF16IV';

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

// ── State parsing ─────────────────────────────────────────────────────
const STATE_BY_ABBR: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts',
  MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};
const STATE_NAMES = new Set(Object.values(STATE_BY_ABBR).map(s => s.toLowerCase()));

// lowercase state name -> canonical casing ("new york" -> "New York")
const CANON_STATE: Record<string, string> = {};
for (const name of Object.values(STATE_BY_ABBR)) CANON_STATE[name.toLowerCase()] = name;

// Case-insensitive geocache lookup — case drift in Airtable location strings
// shouldn't drop a client off the map.
const GEOCACHE = new Map<string, { lat: number; lng: number }>(
  Object.entries(locations as Record<string, { lat: number; lng: number }>)
    .map(([k, v]) => [k.toLowerCase(), v]),
);

// Fallback placement for location strings the geocache doesn't know: if the
// string at least resolves to a state, drop the client on the state centroid
// instead of leaving it off the map entirely. scripts/geocode-locations.mjs
// upgrades these to city-level dots when run.
const STATE_CENTROID: Record<string, { lat: number; lng: number }> = {
  Alabama: { lat: 32.8067, lng: -86.7911 }, Alaska: { lat: 61.3707, lng: -152.4044 },
  Arizona: { lat: 34.2744, lng: -111.6602 }, Arkansas: { lat: 34.8938, lng: -92.4426 },
  California: { lat: 36.7783, lng: -119.4179 }, Colorado: { lat: 39.0598, lng: -105.3111 },
  Connecticut: { lat: 41.5978, lng: -72.7554 }, Delaware: { lat: 39.3185, lng: -75.5071 },
  Florida: { lat: 27.7663, lng: -81.6868 }, Georgia: { lat: 33.0406, lng: -83.6431 },
  Hawaii: { lat: 21.0943, lng: -157.4983 }, Idaho: { lat: 44.2405, lng: -114.4788 },
  Illinois: { lat: 40.3495, lng: -88.9861 }, Indiana: { lat: 39.8494, lng: -86.2583 },
  Iowa: { lat: 42.0115, lng: -93.2105 }, Kansas: { lat: 38.5266, lng: -96.7265 },
  Kentucky: { lat: 37.6681, lng: -84.6701 }, Louisiana: { lat: 31.1695, lng: -91.8678 },
  Maine: { lat: 44.6939, lng: -69.3819 }, Maryland: { lat: 39.0639, lng: -76.8021 },
  Massachusetts: { lat: 42.2302, lng: -71.5301 }, Michigan: { lat: 43.3266, lng: -84.5361 },
  Minnesota: { lat: 45.6945, lng: -93.9002 }, Mississippi: { lat: 32.7416, lng: -89.6787 },
  Missouri: { lat: 38.4561, lng: -92.2884 }, Montana: { lat: 46.9219, lng: -110.4544 },
  Nebraska: { lat: 41.1254, lng: -98.2681 }, Nevada: { lat: 38.3135, lng: -117.0554 },
  'New Hampshire': { lat: 43.4525, lng: -71.5639 }, 'New Jersey': { lat: 40.2989, lng: -74.5210 },
  'New Mexico': { lat: 34.8405, lng: -106.2485 }, 'New York': { lat: 42.1657, lng: -74.9481 },
  'North Carolina': { lat: 35.6301, lng: -79.8064 }, 'North Dakota': { lat: 47.5289, lng: -99.7840 },
  Ohio: { lat: 40.3888, lng: -82.7649 }, Oklahoma: { lat: 35.5653, lng: -96.9289 },
  Oregon: { lat: 44.5720, lng: -122.0709 }, Pennsylvania: { lat: 40.5908, lng: -77.2098 },
  'Rhode Island': { lat: 41.6809, lng: -71.5118 }, 'South Carolina': { lat: 33.8569, lng: -80.9450 },
  'South Dakota': { lat: 44.2998, lng: -99.4388 }, Tennessee: { lat: 35.7478, lng: -86.6923 },
  Texas: { lat: 31.0545, lng: -97.5635 }, Utah: { lat: 40.1500, lng: -111.8624 },
  Vermont: { lat: 44.0459, lng: -72.7107 }, Virginia: { lat: 37.7693, lng: -78.1700 },
  Washington: { lat: 47.4009, lng: -121.4905 }, 'West Virginia': { lat: 38.4912, lng: -80.9545 },
  Wisconsin: { lat: 44.2685, lng: -89.6165 }, Wyoming: { lat: 42.7559, lng: -107.3025 },
};

const KNOWN_REGION_TO_STATE: Record<string, string> = {
  'bay area':            'California',
  'central valley':      'California',
  'socal':               'California',
  'so cal':              'California',
  'norcal':              'California',
  'central fl':          'Florida',
  'central florida':     'Florida',
  'swfl':                'Florida',
  'central md':          'Maryland',
  'central maryland':    'Maryland',
  'central alabama':     'Alabama',
  'hill country':        'Texas',
  'dfw':                 'Texas',
  'fargo-moorhead':      'North Dakota',
  'quad cities':         'Iowa',
  'chicago market':      'Illinois',
  'chicagoland':         'Illinois',
  'denver metro':        'Colorado',
  'philadelphia/nj/de':  'Pennsylvania',
  'tristate':            'New York',
  'ne ohio':             'Ohio',
  'kc':                  'Missouri',
  'kcmo':                'Missouri',
};

function stateForLocation(raw: string): string | null {
  const s = raw.toLowerCase().trim();
  if (!s) return null;

  // 1) Plain state name
  if (STATE_NAMES.has(s)) {
    return CANON_STATE[s];
  }

  // 2) "City, ST" or "Region, ST"
  const abbrMatch = raw.match(/,\s*([A-Z]{2})\b/);
  if (abbrMatch && STATE_BY_ABBR[abbrMatch[1]]) {
    return STATE_BY_ABBR[abbrMatch[1]];
  }

  // 3) Embedded state name like "Bay Area, California"
  for (const name of Array.from(STATE_NAMES)) {
    if (s.includes(name)) {
      return CANON_STATE[name];
    }
  }

  // 4) Known regions
  for (const [region, state] of Object.entries(KNOWN_REGION_TO_STATE)) {
    if (s.includes(region)) return state;
  }

  return null;
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

// Per-client profile fields surfaced to the client. Sensitive fields (email,
// Stripe IDs) are still here — admin-only render gating is on the frontend.
interface ClientProfile {
  recordId:        string;
  businessName:    string;
  clientName?:     string;
  signedContract?: string;
  clientAiStatus?: boolean;
  apptsExpectation?: string;
  generalLocation?: string;
  communication?:  string;
  cc?:             string;
  mgmtFee?:        string;
  startDate?:      string;
  stripeCustomerId?: string;
  stripeEmail?:    string;
  pod?:            string;
  primaryCsm?:     string;
  status:          string;
  niche?:          string;
  referenceFriendly?:     boolean;
  videographerCandidate?: boolean;
  copyRunningCurrent?:    string;
  cycles?:         CycleSnapshot[];
  cyclesTotal?:    number;
  totalBilled?:    number;
  totalAdSpend?:   number;
  avgCpl?:         number;
  avgCpa?:         number;
}

interface CycleSnapshot {
  label?:          string;
  number?:         number;
  startDate?:      string;
  endDate?:        string;
  adSpend?:        number;
  billingAmount?:  number;
  monthlyBudget?:  number;
  apptGoal?:       number;
  appts?:          number;
  estBooked?:      number;
  totalLeads?:     number;
  cpl?:            number;
  cplGoal?:        number;
  osaPct?:         number;
  linkCtr?:        number;
  linkCpc?:        number;
  cpm?:            number;
  frequency?:      number;
  surveyPct?:      number;
  goodToBill?:     string;
  billed?:         string;
  copyRunning?:    string;
}

interface CityPoint {
  loc:        string;
  state?:     string;
  lat:        number;
  lng:        number;
  active:     number;
  churned:    number;
  preLaunch:  number;
  paused:     number;
  total:      number;
  ams:        string[];
  niches:     string[];
  pods:       string[];
  clients:    ClientProfile[];
}

let cache: { at: number; payload: any } | null = null;
const CACHE_MS = 5 * 60 * 1000;

// The map widget fetches this cross-origin from dashboard.roofignite.com, so
// the response must be CORS-readable (a plain GET is a simple request — no
// preflight — but it still needs Access-Control-Allow-Origin to be readable).
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET() {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return NextResponse.json(cache.payload, { headers: CORS_HEADERS });
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    const visibleKeys = Object.keys(process.env)
      .filter((k) => /AIRTABLE|SUPABASE|ANTHROPIC|VERCEL/i.test(k))
      .sort();
    return NextResponse.json({
      error: 'AIRTABLE_TOKEN not set',
      diagnostic: {
        VERCEL_ENV:    process.env.VERCEL_ENV ?? null,
        VERCEL_PROJECT_NAME: process.env.VERCEL_PROJECT_NAME ?? null,
        airtable_present_in_env: 'AIRTABLE_TOKEN' in process.env,
        airtable_value_length: (process.env.AIRTABLE_TOKEN ?? '').length,
        relevantEnvKeys: visibleKeys,
      },
    }, { status: 500, headers: CORS_HEADERS });
  }

  try {
    const [main, pods, team, cycles] = await Promise.all([
      fetchAll(MAIN_TABLE,   token),
      fetchAll(PODS_TABLE,   token),
      fetchAll(TEAM_TABLE,   token),
      fetchAll(CYCLES_TABLE, token),
    ]);

    const podName  = new Map<string, string>(pods.map(p => [p.id, (p.fields['Pod Name'] ?? 'Unknown') as string]));
    const teamName = new Map<string, string>(team.map(t => [t.id, (t.fields['Name']     ?? 'Unknown') as string]));

    // Index cycles by Account record ID (linked record)
    const cyclesByAccount = new Map<string, CycleSnapshot[]>();
    for (const c of cycles) {
      const f = c.fields;
      const accountIds = (f['Account'] as string[] | undefined) ?? [];
      const snap: CycleSnapshot = {
        label:          f['Cycle Label']            as string | undefined,
        number:         f['Cycle Number']           as number | undefined,
        startDate:      f['Cycle Start Date']       as string | undefined,
        endDate:        f['Cycle End Date (Actual)'] as string | undefined,
        adSpend:        f['Ad Spend']               as number | undefined,
        billingAmount:  f['Billing Amount']         as number | undefined,
        monthlyBudget:  f['Monthly Budget']         as number | undefined,
        apptGoal:       f['Appointment Goal']       as number | undefined,
        appts:          f['Appointments Booked']    as number | undefined,
        estBooked:      f['Est Booked']             as number | undefined,
        totalLeads:     f['Total Leads']            as number | undefined,
        cpl:            f['CPL']                    as number | undefined,
        cplGoal:        f['CPL Goal']               as number | undefined,
        osaPct:         f['OSA %']                  as number | undefined,
        linkCtr:        f['Link CTR']               as number | undefined,
        linkCpc:        f['Link CPC']               as number | undefined,
        cpm:            f['CPM']                    as number | undefined,
        frequency:      f['Frequency']              as number | undefined,
        surveyPct:      f['Survey %']               as number | undefined,
        goodToBill:     f['Good to Bill']           as string | undefined,
        billed:         f['Billed']                 as string | undefined,
        copyRunning:    f['Copy Running']           as string | undefined,
      };
      for (const id of accountIds) {
        if (!cyclesByAccount.has(id)) cyclesByAccount.set(id, []);
        cyclesByAccount.get(id)!.push(snap);
      }
    }
    // Sort cycles by number desc within each account (most recent first)
    for (const arr of Array.from(cyclesByAccount.values())) {
      arr.sort((a, b) => (b.number ?? 0) - (a.number ?? 0));
    }

    const byLoc = new Map<string, CityPoint>();
    let unmatched = 0;
    const unmatchedLocs = new Set<string>();

    for (const rec of main) {
      const f = rec.fields;
      const rawLoc = (f['General Location'] as string | undefined ?? '').trim();
      if (!rawLoc) continue;
      const norm = normalize(rawLoc);
      const state = stateForLocation(norm);
      // Geocache first (case-insensitive), then state-centroid fallback so a
      // string the geocoder hasn't seen yet still lands on the map at
      // state level instead of vanishing.
      const coords = GEOCACHE.get(norm.toLowerCase())
        ?? (state ? STATE_CENTROID[state] : undefined);
      if (!coords) {
        unmatched++;
        unmatchedLocs.add(norm);
        continue;
      }

      let p = byLoc.get(norm);
      if (!p) {
        p = {
          loc: norm,
          state: state ?? undefined,
          lat: coords.lat, lng: coords.lng,
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

      const csmIds   = (f['Primary CSM'] as string[] | undefined) ?? [];
      const amNames  = csmIds.map(id => teamName.get(id)).filter(Boolean) as string[];
      for (const a of amNames) if (!p.ams.includes(a)) p.ams.push(a);

      const niche = f['Niche'] as string | undefined;
      if (niche && !p.niches.includes(niche)) p.niches.push(niche);

      const podIds    = (f['Pod'] as string[] | undefined) ?? [];
      const podLabels = podIds.map(id => podName.get(id)).filter(Boolean) as string[];
      for (const pd of podLabels) if (!p.pods.includes(pd)) p.pods.push(pd);

      const business = f['Business Name'] as string | undefined;
      if (business) {
        const clientCycles = cyclesByAccount.get(rec.id) ?? [];
        const cyclesTotal  = clientCycles.length;
        // All "lifetime" totals are computed from raw ad spend / lead / appt
        // sums — ratio of totals, not average of ratios. This is the only
        // honest way to report lifetime CPL/CPA across cycles of different sizes.
        const totalBilled  = clientCycles.reduce((s, c) => s + (c.billingAmount ?? 0), 0);
        const totalAdSpend = clientCycles.reduce((s, c) => s + (c.adSpend ?? 0), 0);
        const totalLeads   = clientCycles.reduce((s, c) => s + (c.totalLeads ?? 0), 0);
        const totalAppts   = clientCycles.reduce((s, c) => s + (c.appts ?? 0), 0);
        const avgCpl       = totalLeads > 0 ? totalAdSpend / totalLeads : undefined;
        const avgCpa       = totalAppts > 0 ? totalAdSpend / totalAppts : undefined;

        p.clients.push({
          recordId:         rec.id,
          businessName:     business,
          clientName:       f['Client Name']        as string | undefined,
          signedContract:   f['Signed Contract']    as string | undefined,
          clientAiStatus:   f['Client AI Status']   as boolean | undefined,
          apptsExpectation: f['Appts Expectation']  as string | undefined,
          generalLocation:  rawLoc,
          communication:    f['Communication']      as string | undefined,
          cc:               f['CC']                 as string | undefined,
          mgmtFee:          f['MGMT Fee']           as string | undefined,
          startDate:        f['Start Date']         as string | undefined,
          stripeCustomerId: f['Stripe Customer ID'] as string | undefined,
          stripeEmail:      f['Stripe Email']       as string | undefined,
          pod:              podLabels[0],
          primaryCsm:       amNames[0],
          status,
          niche,
          referenceFriendly:    !!f['Reference-Call Friendly'],
          videographerCandidate:!!f['Videographer Candidate'],
          // Most recent cycle that has copy data — shown at the top of the card.
          copyRunningCurrent:   clientCycles.find(cy => cy.copyRunning)?.copyRunning,
          cycles:           clientCycles,
          cyclesTotal,
          totalBilled,
          totalAdSpend,
          avgCpl,
          avgCpa,
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
    return NextResponse.json(payload, { headers: CORS_HEADERS });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500, headers: CORS_HEADERS });
  }
}
