#!/usr/bin/env node
// Geocoder for the Clientele Map cache (data/geo/locations.json).
//
// The /api/clients-map route only plots General Location strings that exist
// as keys in locations.json. This script fills the gaps:
//
//   node scripts/geocode-locations.mjs            # geocode everything the live
//                                                 # API currently reports as unmatched
//   node scripts/geocode-locations.mjs "Tampa, FL" "Marion, IL"   # specific strings
//
// Messy strings (typos, regions, multi-market blurbs) are handled by OVERRIDES
// below — the key is the exact normalized string as the API reports it, the
// value is either a clean "City, ST" query for Nominatim or {lat,lng} directly.
// Strings in SKIP are genuinely unplaceable and are left to the route's
// state-centroid fallback (or stay unmatched).
//
// Nominatim usage policy requires 1 req/sec and a real User-Agent.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE_PATH = join(ROOT, 'data', 'geo', 'locations.json');
const API = 'https://onboarding.roofignite.com/api/clients-map';

// Messy source string -> clean geocodable query (or direct {lat,lng}).
const OVERRIDES = {
  'Bradford, Connecticut':      'Branford, CT',            // no Bradford in CT
  'Bucks County, Pennsylvania': 'Doylestown, PA',
  'Central Pennsylvania: Harrisburg, Lancaster, York': 'Harrisburg, PA',
  'Chilliwack':                 'Chilliwack, British Columbia',
  'Dallas Fort Worth':          'Dallas, TX',
  'Eden Prarie, Minnesota':     'Eden Prairie, MN',
  'Eugene Oregon':              'Eugene, OR',
  'Fredericksburg OH':          'Fredericksburg, OH',
  'Full Colorado':              { lat: 39.0598, lng: -105.3111 },
  'Greater Phillly, PA':        'Philadelphia, PA',
  'Gwinnett County, Georgia':   'Lawrenceville, GA',
  'HR, VAB, R, Virginia':       'Virginia Beach, VA',      // Hampton Roads / VA Beach / Richmond
  'Hennepin, Minnesota':        'Minneapolis, MN',
  'Illinois, Tri-State area':   'Chicago, IL',
  'Indianapolis':               'Indianapolis, IN',
  'Jacksonville':               'Jacksonville, FL',
  'Kansas City':                'Kansas City, MO',
  'Kittening, PEN':             'Kittanning, PA',
  'Knoxville metro':            'Knoxville, TN',
  'Lake Mary Florida':          'Lake Mary, FL',
  'Metro Atlanta':              'Atlanta, GA',
  'Miami-Dade/Broward/Palm Beach Counties, FL': 'Fort Lauderdale, FL',
  'Nevada, Vegas':              'Las Vegas, NV',
  'New Hampshire, MA':          'Nashua, NH',
  'North Atlanta/ Georgia':     'Alpharetta, GA',
  'North of Salt Lake':         'Ogden, UT',
  'Northern DC':                'Washington, DC',
  'Orlando Florida':            'Orlando, FL',
  'Palm Beach County, FL':      'West Palm Beach, FL',
  'Palm Beach/Broward FL':      'Boca Raton, FL',
  'Panhandle, Florida':         'Pensacola, FL',
  'Peel & Halton Ontario':      'Mississauga, Ontario',
  'Phoenix':                    'Phoenix, AZ',
  'Pittsburgh':                 'Pittsburgh, PA',
  'Portland OR metro':          'Portland, OR',
  'Richmond Virginia':          'Richmond, VA',
  'SWFL(Broward)':              'Fort Lauderdale, FL',
  'Santa Clara and San Mateo County': 'San Mateo, CA',
  'Savannah Georgia':           'Savannah, GA',
  'Socal: SAN DIEGO, ORANGE, AND RIVERSIDE COUNTIES.': 'Santa Ana, CA',
  'Sonoma and Marin County':    'Petaluma, CA',
  'South NH / North MA':        'Nashua, NH',
  'Southeast Florida':          'Fort Lauderdale, FL',
  'Southern New Jersey':        'Cherry Hill, NJ',
  'St Cloud, MN, USA':          'St. Cloud, MN',
  'Syracuse, New York / Central New York': 'Syracuse, NY',
  'Thousands Oaks, California': 'Thousand Oaks, CA',
  'Twin Cities':                'Minneapolis, MN',
  'Western NY':                 'Buffalo, NY',
  'Whitby, ON':                 'Whitby, Ontario',
};

// Genuinely unplaceable — leave to the route's state-centroid fallback.
const SKIP = new Set([
  'Local market — TBD',
  'Re-roofing division (separate from RoofMax franchise) — zip codes TBD',
  'Colorado, Ohio',
  'Louisnana/ Kentucky',
]);

// Bare state names / 2-letter codes resolve locally to centroids (no network).
const STATE_CENTROIDS = {
  Alabama: [32.8067, -86.7911], Alaska: [61.3707, -152.4044], Arizona: [34.2744, -111.6602],
  Arkansas: [34.8938, -92.4426], California: [36.7783, -119.4179], Colorado: [39.0598, -105.3111],
  Connecticut: [41.5978, -72.7554], Delaware: [39.3185, -75.5071], Florida: [27.7663, -81.6868],
  Georgia: [33.0406, -83.6431], Hawaii: [21.0943, -157.4983], Idaho: [44.2405, -114.4788],
  Illinois: [40.3495, -88.9861], Indiana: [39.8494, -86.2583], Iowa: [42.0115, -93.2105],
  Kansas: [38.5266, -96.7265], Kentucky: [37.6681, -84.6701], Louisiana: [31.1695, -91.8678],
  Maine: [44.6939, -69.3819], Maryland: [39.0639, -76.8021], Massachusetts: [42.2302, -71.5301],
  Michigan: [43.3266, -84.5361], Minnesota: [45.6945, -93.9002], Mississippi: [32.7416, -89.6787],
  Missouri: [38.4561, -92.2884], Montana: [46.9219, -110.4544], Nebraska: [41.1254, -98.2681],
  Nevada: [38.3135, -117.0554], 'New Hampshire': [43.4525, -71.5639], 'New Jersey': [40.2989, -74.5210],
  'New Mexico': [34.8405, -106.2485], 'New York': [42.1657, -74.9481], 'North Carolina': [35.6301, -79.8064],
  'North Dakota': [47.5289, -99.7840], Ohio: [40.3888, -82.7649], Oklahoma: [35.5653, -96.9289],
  Oregon: [44.5720, -122.0709], Pennsylvania: [40.5908, -77.2098], 'Rhode Island': [41.6809, -71.5118],
  'South Carolina': [33.8569, -80.9450], 'South Dakota': [44.2998, -99.4388], Tennessee: [35.7478, -86.6923],
  Texas: [31.0545, -97.5635], Utah: [40.1500, -111.8624], Vermont: [44.0459, -72.7107],
  Virginia: [37.7693, -78.1700], Washington: [47.4009, -121.4905], 'West Virginia': [38.4912, -80.9545],
  Wisconsin: [44.2685, -89.6165], Wyoming: [42.7559, -107.3025],
};
const STATE_BY_ABBR = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho',
  IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function nominatim(query) {
  const u = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us,ca&q=${encodeURIComponent(query)}`;
  const r = await fetch(u, { headers: { 'User-Agent': 'RoofIgnite-ClienteleMap/1.0 (oscar@roofignite.com)' } });
  if (!r.ok) throw new Error(`nominatim ${r.status}`);
  const j = await r.json();
  if (!j.length) return null;
  return { lat: Number(Number(j[0].lat).toFixed(6)), lng: Number(Number(j[0].lon).toFixed(6)) };
}

function stateCentroid(raw) {
  const t = raw.trim();
  const name = STATE_BY_ABBR[t.toUpperCase()] ?? Object.keys(STATE_CENTROIDS).find(
    (n) => n.toLowerCase() === t.toLowerCase());
  if (!name) return null;
  const [lat, lng] = STATE_CENTROIDS[name];
  return { lat, lng };
}

async function main() {
  const cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
  let targets = process.argv.slice(2);
  if (!targets.length) {
    console.log(`No args — pulling unmatched list from ${API}`);
    const r = await fetch(API);
    const j = await r.json();
    targets = j?.totals?.unmatchedLocs ?? [];
    console.log(`${targets.length} unmatched strings reported by the API`);
  }

  const failures = [];
  let added = 0;
  for (const raw of targets) {
    if (cache[raw]) { console.log(`  ok      ${raw}`); continue; }
    if (SKIP.has(raw)) { console.log(`  skip    ${raw}`); continue; }

    let coords = null;
    const ov = OVERRIDES[raw];
    if (ov && typeof ov === 'object') coords = ov;
    if (!coords) coords = stateCentroid(ov ?? raw);
    if (!coords) {
      const query = ov ?? raw;
      try {
        coords = await nominatim(query);
      } catch (e) {
        console.log(`  ERROR   ${raw} (${e.message})`);
      }
      await sleep(1100);
    }
    if (coords) {
      cache[raw] = coords;
      added++;
      console.log(`  added   ${raw}  ->  ${coords.lat}, ${coords.lng}${ov ? `  (via ${typeof ov === 'string' ? ov : 'override coords'})` : ''}`);
    } else {
      failures.push(raw);
      console.log(`  FAILED  ${raw}`);
    }
  }

  if (added) {
    const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(CACHE_PATH, JSON.stringify(sorted, null, 2) + '\n');
  }
  console.log(`\nDone. Added ${added}, failed ${failures.length}.`);
  if (failures.length) console.log('Failures:\n' + failures.map((f) => `  - ${f}`).join('\n'));
}

main();
