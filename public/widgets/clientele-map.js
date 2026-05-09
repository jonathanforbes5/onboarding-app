// RoofIgnite Clientele Map — embeddable widget (vanilla JS, ES module)
//
// Single source of truth for the "Clientele At A Glance" map. Lives at
//   https://onboarding.roofignite.com/widgets/clientele-map.js
// Loaded by:
//   1. The Next.js portal (onboarding.roofignite.com) — same domain.
//   2. dashboard.roofignite.com/clientele.html — different domain, cross-origin.
//
// Usage:
//   <div id="ri-clientele-map"></div>
//   <script type="module" src="https://onboarding.roofignite.com/widgets/clientele-map.js"></script>
//
// Data + topojson are both pulled from onboarding.roofignite.com so the
// dashboard doesn't need to know anything about Airtable. CORS is `*` on
// /api/clients-map. Update this file → both surfaces update on next page load.
// build_marker: 2026-05-09T10:30 v1

import { geoAlbersUsa, geoPath } from 'https://esm.sh/d3-geo@3';
import { feature } from 'https://esm.sh/topojson-client@3';

const API_BASE = 'https://onboarding.roofignite.com';

// ---------------------------------------------------------------------------
// Static data (kept in sync with components/Diagrams/ClientMap.tsx)
// ---------------------------------------------------------------------------

const STATE_CENTROIDS = {
  Alabama: { lat: 32.8067, lng: -86.7911, zoom: 4 },
  Alaska:  { lat: 61.3707, lng: -152.4044, zoom: 2.5 },
  Arizona: { lat: 33.7298, lng: -111.4312, zoom: 4 },
  Arkansas:{ lat: 34.9697, lng: -92.3731, zoom: 4 },
  California:{ lat: 36.7783, lng: -119.4179, zoom: 3 },
  Colorado:{ lat: 39.0598, lng: -105.3111, zoom: 4 },
  Connecticut:{ lat: 41.5978, lng: -72.7554, zoom: 6 },
  Delaware:{ lat: 39.3185, lng: -75.5071, zoom: 6 },
  Florida: { lat: 27.7663, lng: -81.6868, zoom: 3.5 },
  Georgia: { lat: 33.0406, lng: -83.6431, zoom: 4 },
  Hawaii:  { lat: 21.0943, lng: -157.4983, zoom: 4 },
  Idaho:   { lat: 44.2405, lng: -114.4788, zoom: 3.5 },
  Illinois:{ lat: 40.3495, lng: -88.9861, zoom: 4 },
  Indiana: { lat: 39.8494, lng: -86.2583, zoom: 4 },
  Iowa:    { lat: 42.0115, lng: -93.2105, zoom: 4 },
  Kansas:  { lat: 38.5266, lng: -96.7265, zoom: 4 },
  Kentucky:{ lat: 37.6681, lng: -84.6701, zoom: 4 },
  Louisiana:{ lat: 31.1695, lng: -91.8678, zoom: 4 },
  Maine:   { lat: 44.6939, lng: -69.3819, zoom: 4 },
  Maryland:{ lat: 39.0639, lng: -76.8021, zoom: 5 },
  Massachusetts:{ lat: 42.2302, lng: -71.5301, zoom: 5 },
  Michigan:{ lat: 43.3266, lng: -84.5361, zoom: 4 },
  Minnesota:{ lat: 45.6945, lng: -93.9002, zoom: 3.5 },
  Mississippi:{ lat: 32.7416, lng: -89.6787, zoom: 4 },
  Missouri:{ lat: 38.4561, lng: -92.2884, zoom: 4 },
  Montana: { lat: 46.9219, lng: -110.4544, zoom: 3 },
  Nebraska:{ lat: 41.1254, lng: -98.2681, zoom: 4 },
  Nevada:  { lat: 38.3135, lng: -117.0554, zoom: 3.5 },
  'New Hampshire':{ lat: 43.4525, lng: -71.5639, zoom: 5 },
  'New Jersey':   { lat: 40.2989, lng: -74.5210, zoom: 5 },
  'New Mexico':   { lat: 34.8405, lng: -106.2485, zoom: 4 },
  'New York':     { lat: 42.1657, lng: -74.9481, zoom: 4 },
  'North Carolina':{ lat: 35.6301, lng: -79.8064, zoom: 4 },
  'North Dakota': { lat: 47.5289, lng: -99.7840, zoom: 3.5 },
  Ohio:    { lat: 40.3888, lng: -82.7649, zoom: 4 },
  Oklahoma:{ lat: 35.5653, lng: -96.9289, zoom: 4 },
  Oregon:  { lat: 44.5720, lng: -122.0709, zoom: 4 },
  Pennsylvania:{ lat: 40.5908, lng: -77.2098, zoom: 4 },
  'Rhode Island':{ lat: 41.6809, lng: -71.5118, zoom: 7 },
  'South Carolina':{ lat: 33.8569, lng: -80.9450, zoom: 4 },
  'South Dakota':  { lat: 44.2998, lng: -99.4388, zoom: 3.5 },
  Tennessee:{ lat: 35.7478, lng: -86.6923, zoom: 4 },
  Texas:    { lat: 31.0545, lng: -97.5635, zoom: 3 },
  Utah:     { lat: 40.1500, lng: -111.8624, zoom: 4 },
  Vermont:  { lat: 44.0459, lng: -72.7107, zoom: 5 },
  Virginia: { lat: 37.7693, lng: -78.1700, zoom: 4 },
  Washington:{ lat: 47.4009, lng: -121.4905, zoom: 4 },
  'West Virginia':{ lat: 38.4912, lng: -80.9545, zoom: 4 },
  Wisconsin:{ lat: 44.2685, lng: -89.6165, zoom: 4 },
  Wyoming: { lat: 42.7559, lng: -107.3025, zoom: 3.5 },
};

const STATE_ABBR = {
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California', CO:'Colorado',
  CT:'Connecticut', DE:'Delaware', FL:'Florida', GA:'Georgia', HI:'Hawaii', ID:'Idaho',
  IL:'Illinois', IN:'Indiana', IA:'Iowa', KS:'Kansas', KY:'Kentucky', LA:'Louisiana',
  ME:'Maine', MD:'Maryland', MA:'Massachusetts', MI:'Michigan', MN:'Minnesota', MS:'Mississippi',
  MO:'Missouri', MT:'Montana', NE:'Nebraska', NV:'Nevada', NH:'New Hampshire', NJ:'New Jersey',
  NM:'New Mexico', NY:'New York', NC:'North Carolina', ND:'North Dakota', OH:'Ohio',
  OK:'Oklahoma', OR:'Oregon', PA:'Pennsylvania', RI:'Rhode Island', SC:'South Carolina',
  SD:'South Dakota', TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont', VA:'Virginia',
  WA:'Washington', WV:'West Virginia', WI:'Wisconsin', WY:'Wyoming',
};

// State-level market difficulty tiers — derived from MARKET_ENTRIES in
// data/marketDifficulty.ts. Worst-tier-wins per state.
const STATE_TIER = {
  Texas: 'avoid', Hawaii: 'avoid', Tennessee: 'avoid',
  Colorado: 'hard', Florida: 'hard', Delaware: 'hard',
  California: 'hard', 'North Carolina': 'hard', 'South Carolina': 'hard',
  Maryland: 'hard', 'New Jersey': 'hard', Pennsylvania: 'hard',
  Arizona: 'hard', Minnesota: 'hard', Wisconsin: 'hard',
  Missouri: 'hard',
  'New York': 'great', Ohio: 'great', Illinois: 'great',
  Alabama: 'great', Georgia: 'great', Massachusetts: 'great',
  Connecticut: 'great', 'Rhode Island': 'great', Washington: 'great',
  Oregon: 'great',
  Montana: 'unknown', Idaho: 'unknown', Wyoming: 'unknown', Utah: 'unknown',
  'New Mexico': 'unknown', 'North Dakota': 'unknown', 'South Dakota': 'unknown',
  Nebraska: 'unknown', Kansas: 'unknown', Iowa: 'unknown', Michigan: 'unknown',
  Indiana: 'unknown', Kentucky: 'unknown', Mississippi: 'unknown',
  Louisiana: 'unknown', 'West Virginia': 'unknown', Vermont: 'unknown',
};

const TIER_LABELS = { avoid: 'Avoid', hard: 'Hard', great: 'Easy / Great', easy: 'Easy / Great', unknown: 'No data' };
const TIER_COLORS = { avoid: '#7F1D1D', hard: '#EA580C', great: '#16A34A', easy: '#16A34A', unknown: '#374151' };

const STATUS_FILTERS = [
  { id: 'all',       label: 'All Current', color: '#F5C800' },
  { id: 'active',    label: 'Active',      color: '#22C55E' },
  { id: 'preLaunch', label: 'Pre-Launch',  color: '#A78BFA' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmtMoney = (n) => n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const fmtPct   = (n) => n == null ? '—' : (n * 100).toFixed(1) + '%';
const fmtNum   = (n, dp = 0) => n == null ? '—' : n.toLocaleString('en-US', { maximumFractionDigits: dp });
const fmtDate  = (s) => {
  if (!s) return '—';
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? s : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
};

function resolveState(query) {
  const q = query.trim();
  if (!q) return null;
  const upper = q.toUpperCase();
  if (STATE_ABBR[upper]) return STATE_ABBR[upper];
  for (const name of Object.keys(STATE_CENTROIDS)) {
    if (name.toLowerCase() === q.toLowerCase()) return name;
  }
  for (const name of Object.keys(STATE_CENTROIDS)) {
    if (name.toLowerCase().startsWith(q.toLowerCase())) return name;
  }
  return null;
}

function escHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------------------------------------------------------------------------
// Scoped CSS — injected once
// ---------------------------------------------------------------------------

const CSS = `
.rim-root { font-family: Inter, system-ui, -apple-system, sans-serif; color: #111; }
.rim-root *, .rim-root *::before, .rim-root *::after { box-sizing: border-box; }
.rim-card { background: #0F172A; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px; color: #fff; }
.rim-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
.rim-title { font-size: 14px; font-weight: 800; color: #fff; letter-spacing: -0.01em; }
.rim-subtitle { font-size: 11px; color: #94A3B8; margin-top: 2px; }
.rim-diff-toggle { font-size: 11px; color: #CBD5E1; display: inline-flex; gap: 6px; align-items: center; cursor: pointer; user-select: none; }
.rim-diff-toggle input { cursor: pointer; }
.rim-diff-legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; font-size: 10px; }
.rim-diff-legend .swatch { display: inline-flex; align-items: center; gap: 4px; color: #CBD5E1; font-weight: 700; }
.rim-diff-legend .dot { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
.rim-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin: 10px 0; }
.rim-stat-btn { text-align: left; padding: 10px 12px; border-radius: 12px; background: #1E293B; border: 1px solid rgba(255,255,255,0.08); color: #fff; cursor: pointer; transition: all 0.15s; font-family: inherit; }
.rim-stat-btn:hover { background: #273449; }
.rim-stat-btn.active { background: #0A0A0A; border-color: #F5C800; box-shadow: 0 0 0 1px #F5C800 inset; }
.rim-stat-label { font-size: 9px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #94A3B8; }
.rim-stat-btn.active .rim-stat-label { color: var(--rim-color, #F5C800); }
.rim-stat-value { font-size: 18px; font-weight: 900; color: #fff; }
.rim-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.rim-search-wrap { position: relative; flex: 1; min-width: 220px; }
.rim-search { width: 100%; padding: 8px 12px; border-radius: 10px; font-size: 12px; background: #0A0A0A; color: #fff; border: 1px solid rgba(255,255,255,0.15); outline: none; font-family: inherit; }
.rim-search:focus { border-color: #F5C800; }
.rim-search-go { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); padding: 4px 8px; border-radius: 6px; background: #F5C800; color: #0A0A0A; font-size: 10px; font-weight: 900; border: none; cursor: pointer; font-family: inherit; }
.rim-search-nomatch { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #F87171; }
.rim-reset-btn { padding: 8px 12px; border-radius: 10px; font-size: 11px; font-weight: 700; background: #1E293B; color: #CBD5E1; border: 1px solid rgba(255,255,255,0.08); cursor: pointer; font-family: inherit; }
.rim-reset-btn:hover { background: #273449; }
.rim-hint { font-size: 10px; color: #64748B; }
.rim-mapwrap { position: relative; border-radius: 12px; overflow: hidden; background: #0A0A0A; border: 1px solid #1f1f1f; }
.rim-svg { display: block; width: 100%; height: auto; touch-action: none; }
.rim-tip { position: absolute; z-index: 10; pointer-events: none; background: #0A0A0A; border: 1px solid rgba(245,200,0,0.33); border-radius: 8px; padding: 10px 12px; min-width: 220px; max-width: 280px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: #fff; font-size: 12px; }
.rim-tip-loc { font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #F5C800; margin-bottom: 4px; }
.rim-tip-row { font-size: 12px; }
.rim-tip-meta { font-size: 11px; color: rgba(255,255,255,0.7); margin-top: 6px; }
.rim-tip-meta b { color: #F5C800; font-weight: 900; }
.rim-tip-clients { margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; color: rgba(255,255,255,0.6); }
.rim-tip-clients .name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rim-tip-cta { font-size: 10px; color: rgba(245,200,0,0.8); font-style: italic; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); }
.rim-footer { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 10px; color: #64748B; }
.rim-warn { font-size: 10px; color: #FBA94B; background: rgba(234,88,12,0.08); border: 1px solid rgba(234,88,12,0.25); border-radius: 10px; padding: 8px 10px; margin-top: 8px; }
.rim-loading { font-size: 12px; color: #94A3B8; text-align: center; padding: 32px; }
.rim-error { font-size: 12px; color: #F87171; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px; }
.rim-drawer { margin-top: 12px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); background: #fff; color: #111; }
.rim-drawer-head { background: #0A0A0A; color: #fff; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.rim-drawer-kind { font-size: 9px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #F5C800; }
.rim-drawer-title { font-size: 14px; font-weight: 900; }
.rim-drawer-meta { font-size: 10px; color: rgba(255,255,255,0.6); }
.rim-drawer-close { background: transparent; color: rgba(255,255,255,0.7); border: none; font-size: 12px; font-weight: 700; cursor: pointer; font-family: inherit; }
.rim-drawer-close:hover { color: #fff; }
.rim-empty { text-align: center; font-size: 11px; color: #6B7280; padding: 20px 12px; }
.rim-cli { border-bottom: 1px solid #E5E7EB; }
.rim-cli:last-child { border-bottom: 0; }
.rim-cli-head { width: 100%; text-align: left; padding: 10px 12px; background: #fff; border: 0; cursor: pointer; display: flex; align-items: center; gap: 10px; font-family: inherit; }
.rim-cli-head:hover { background: #F4F4F5; }
.rim-cli-name { font-size: 13px; font-weight: 900; color: #0A0A0A; }
.rim-cli-sub { font-size: 11px; color: #6B7280; }
.rim-cli-flex { flex: 1; min-width: 0; }
.rim-cli-flex > * { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rim-cli-arrow { font-size: 10px; color: #6B7280; }
.rim-cli-body { background: #F4F4F5; padding: 12px; }
.rim-fields { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 4px 16px; font-size: 11px; }
.rim-field { display: flex; gap: 8px; align-items: baseline; min-width: 0; }
.rim-field-l { font-size: 9px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #6B7280; flex-shrink: 0; width: 96px; }
.rim-field-v { color: #0A0A0A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rim-field-v.mono { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 10px; }
.rim-field-v.empty { color: #9CA3AF; font-style: italic; }
.rim-lifetime { background: #0A0A0A; color: #fff; border-radius: 10px; padding: 10px; margin-top: 10px; }
.rim-lifetime-head { display: flex; justify-content: space-between; flex-wrap: wrap; align-items: baseline; margin-bottom: 6px; gap: 4px; }
.rim-lifetime-h1 { font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #F5C800; }
.rim-lifetime-h2 { font-size: 9px; color: rgba(255,255,255,0.4); font-style: italic; }
.rim-lifetime-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; font-size: 10px; }
.rim-lifetime-grid .l { color: rgba(255,255,255,0.5); font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; }
.rim-lifetime-grid .v { color: #fff; font-weight: 900; font-size: 13px; }
.rim-cycles-h { font-size: 10px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #6B7280; margin-top: 10px; margin-bottom: 6px; }
.rim-cycle { background: #fff; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 4px; overflow: hidden; }
.rim-cycle-head { width: 100%; text-align: left; padding: 8px 10px; background: #fff; border: 0; cursor: pointer; display: flex; gap: 8px; align-items: center; font-family: inherit; }
.rim-cycle-head:hover { background: #F4F4F5; }
.rim-cycle-label { font-size: 11px; font-weight: 900; color: #0A0A0A; flex-shrink: 0; }
.rim-cycle-dates { font-size: 10px; color: #6B7280; flex-shrink: 0; }
.rim-cycle-pace { flex: 1; text-align: right; font-size: 10px; font-weight: 700; }
.rim-cycle-arrow { font-size: 10px; color: #6B7280; }
.rim-cycle-body { background: #F4F4F5; padding: 8px 10px; border-top: 1px solid #E5E7EB; }
.rim-cycle-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 4px 12px; font-size: 10px; }
.rim-cycle-grid + .rim-cycle-grid { padding-top: 6px; margin-top: 6px; border-top: 1px solid #E5E7EB; }
.rim-stat-mini .l { font-size: 8px; font-weight: 900; letter-spacing: 0.15em; text-transform: uppercase; color: #6B7280; }
.rim-stat-mini .v { font-size: 11px; font-weight: 700; color: #0A0A0A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rim-stat-mini .s { font-size: 9px; color: #6B7280; font-style: italic; }
@media (max-width: 640px) {
  .rim-stats { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .rim-fields, .rim-lifetime-grid, .rim-cycle-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
.rim-marker { cursor: pointer; }
.rim-state-path { transition: fill 0.15s; }
.rim-state-path:hover { stroke: #F5C800; stroke-width: 0.7; filter: brightness(1.15); }
`;

let cssInjected = false;
function ensureCss() {
  if (cssInjected) return;
  const style = document.createElement('style');
  style.setAttribute('data-rim-styles', '1');
  style.textContent = CSS;
  document.head.appendChild(style);
  cssInjected = true;
}

// ---------------------------------------------------------------------------
// Mount
// ---------------------------------------------------------------------------

const VIEW_W = 980;
const VIEW_H = 560;

async function mount(target, options = {}) {
  ensureCss();
  const root = typeof target === 'string' ? document.querySelector(target) : target;
  if (!root) {
    console.warn('[RIClienteleMap] mount target not found:', target);
    return;
  }

  // Scope so we don't accidentally inherit weird parent styles.
  root.classList.add('rim-root');
  root.innerHTML = '<div class="rim-loading">Loading client map…</div>';

  // State
  const state = {
    isAdmin: options.isAdmin !== false, // default true — dashboards already gate at the page level
    data: null,
    error: null,
    filter: 'all',
    showDifficulty: false,
    zoom: 1,
    center: [-96, 38],
    selection: null,    // { kind: 'city', point } | { kind: 'state', name }
    openClientId: null,
    openCycle: null,
    stateSearch: '',
    hovered: null,
    tooltipPos: { x: 0, y: 0 },
  };

  // Fetch data + topojson in parallel
  let mapData, topo;
  try {
    [mapData, topo] = await Promise.all([
      fetch(`${API_BASE}/api/clients-map`).then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }),
      fetch(`${API_BASE}/us-states-10m.json`).then((r) => {
        if (!r.ok) throw new Error('topojson HTTP ' + r.status);
        return r.json();
      }),
    ]);
  } catch (e) {
    root.innerHTML = `<div class="rim-error">Couldn't load map data: ${escHtml(e.message || e)}</div>`;
    return;
  }
  if (mapData && mapData.error) {
    root.innerHTML = `<div class="rim-error">Couldn't load map data: ${escHtml(mapData.error)}</div>`;
    return;
  }

  state.data = mapData;
  const states = feature(topo, topo.objects.states).features;

  // Build the static shell
  root.innerHTML = `
    <div class="rim-card">
      <div class="rim-header">
        <div>
          <div class="rim-title">RoofIgnite Clientele At A Glance</div>
          <div class="rim-subtitle">Live map. Click a state or dot for full client profiles${state.isAdmin ? ' (admin)' : ''}.</div>
        </div>
        <label class="rim-diff-toggle">
          <input type="checkbox" data-rim="difficulty">
          <span>Show market difficulty fill</span>
        </label>
      </div>
      <div class="rim-diff-legend" data-rim="legend" hidden>
        ${['avoid','hard','great','unknown'].map(t => `
          <span class="swatch"><span class="dot" style="background:${TIER_COLORS[t]}"></span>${TIER_LABELS[t]}</span>
        `).join('')}
      </div>
      <div class="rim-stats" data-rim="stats"></div>
      <div class="rim-controls">
        <div class="rim-search-wrap">
          <input class="rim-search" data-rim="search" placeholder="Jump to state — type name or 2-letter code (e.g. FL, Florida, NC, NY)">
          <button class="rim-search-go" data-rim="go" hidden>Go →</button>
          <span class="rim-search-nomatch" data-rim="nomatch" hidden>No match</span>
        </div>
        <button class="rim-reset-btn" data-rim="reset" hidden>↺ Reset zoom</button>
        <span class="rim-hint">scroll to zoom · drag to pan</span>
      </div>
      <div class="rim-mapwrap" data-rim="mapwrap">
        <svg class="rim-svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" data-rim="svg">
          <g data-rim="zoomlayer">
            <g data-rim="states"></g>
            <g data-rim="markers"></g>
          </g>
        </svg>
        <div class="rim-tip" data-rim="tip" hidden></div>
      </div>
      <div class="rim-footer">
        <span data-rim="footer-l"></span>
        <span>Live from Airtable · refreshed every 5 min</span>
      </div>
      <div class="rim-warn" data-rim="warn" hidden></div>
      <div data-rim="drawer-mount"></div>
    </div>
  `;

  // Build a projection for both state paths and marker positions.
  // We size it to match the viewBox.
  const projection = geoAlbersUsa().fitSize([VIEW_W, VIEW_H], { type: 'FeatureCollection', features: states });
  const path = geoPath(projection);

  const $ = (sel) => root.querySelector(`[data-rim="${sel}"]`);
  const elStats     = $('stats');
  const elLegend    = $('legend');
  const elDifficulty= $('difficulty');
  const elSearch    = $('search');
  const elGo        = $('go');
  const elNomatch   = $('nomatch');
  const elReset     = $('reset');
  const elSvg       = $('svg');
  const elZoomLayer = $('zoomlayer');
  const elStatesG   = $('states');
  const elMarkers   = $('markers');
  const elTip       = $('tip');
  const elMapWrap   = $('mapwrap');
  const elFooterL   = $('footer-l');
  const elWarn      = $('warn');
  const elDrawer    = $('drawer-mount');

  // ---- State paths (drawn once)
  const SVGNS = 'http://www.w3.org/2000/svg';
  states.forEach((geo) => {
    const stateName = geo.properties && geo.properties.name;
    const p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', path(geo));
    p.setAttribute('class', 'rim-state-path');
    p.setAttribute('stroke', '#0A0A0A');
    p.setAttribute('stroke-width', '0.5');
    p.dataset.state = stateName || '';
    if (state.isAdmin && stateName) {
      p.style.cursor = 'pointer';
      p.addEventListener('click', () => {
        state.selection = { kind: 'state', name: stateName };
        state.openClientId = null;
        renderDrawer();
      });
    }
    elStatesG.appendChild(p);
  });

  // ---- Render fns
  function renderStateFills() {
    elStatesG.querySelectorAll('path').forEach((p) => {
      const name = p.dataset.state;
      const tier = name && STATE_TIER[name];
      const fill = state.showDifficulty && tier ? TIER_COLORS[tier] : '#1f1f1f';
      p.setAttribute('fill', fill);
    });
    elLegend.hidden = !state.showDifficulty;
  }

  function renderStats() {
    const totals = state.data.totals;
    elStats.innerHTML = STATUS_FILTERS.map((f) => {
      const count = f.id === 'all'
        ? (totals.active + totals.preLaunch)
        : f.id === 'active' ? totals.active : totals.preLaunch;
      const active = state.filter === f.id ? 'active' : '';
      return `<button class="rim-stat-btn ${active}" data-rim-filter="${f.id}" style="--rim-color:${f.color}">
        <div class="rim-stat-label">${f.label}</div>
        <div class="rim-stat-value">${count}</div>
      </button>`;
    }).join('');
    elStats.querySelectorAll('[data-rim-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.filter = btn.dataset.rimFilter;
        renderStats();
        renderMarkers();
      });
    });
  }

  function filterCount(p) {
    if (state.filter === 'all')       return p.active + p.preLaunch + p.paused;
    if (state.filter === 'active')    return p.active;
    if (state.filter === 'preLaunch') return p.preLaunch;
    return 0;
  }

  function renderMarkers() {
    elMarkers.innerHTML = '';
    const visible = state.data.points.filter((p) => filterCount(p) > 0);
    const zoomScale = 1 / Math.max(1, Math.sqrt(state.zoom));
    visible.forEach((p) => {
      const proj = projection([p.lng, p.lat]);
      if (!proj) return;
      const [cx, cy] = proj;
      const count = filterCount(p);
      const r = Math.max(2.5, Math.min(18, 5 + Math.sqrt(count) * 2.2) * zoomScale);
      const color =
        state.filter === 'preLaunch' ? '#A78BFA' :
        state.filter === 'active'    ? '#22C55E' :
        p.preLaunch > p.active ? '#A78BFA' : '#F5C800';

      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('class', 'rim-marker');
      g.setAttribute('transform', `translate(${cx}, ${cy})`);

      // Pulse ring
      const ring = document.createElementNS(SVGNS, 'circle');
      ring.setAttribute('r', String(r + 4 * zoomScale));
      ring.setAttribute('fill', color);
      ring.setAttribute('opacity', '0.15');
      const a1 = document.createElementNS(SVGNS, 'animate');
      a1.setAttribute('attributeName', 'r');
      a1.setAttribute('from', String(r));
      a1.setAttribute('to', String(r + 8 * zoomScale));
      a1.setAttribute('dur', '1.6s');
      a1.setAttribute('repeatCount', 'indefinite');
      const a2 = document.createElementNS(SVGNS, 'animate');
      a2.setAttribute('attributeName', 'opacity');
      a2.setAttribute('from', '0.4');
      a2.setAttribute('to', '0');
      a2.setAttribute('dur', '1.6s');
      a2.setAttribute('repeatCount', 'indefinite');
      ring.appendChild(a1);
      ring.appendChild(a2);
      g.appendChild(ring);

      const dot = document.createElementNS(SVGNS, 'circle');
      dot.setAttribute('r', String(r));
      dot.setAttribute('fill', color);
      dot.setAttribute('opacity', '0.85');
      dot.setAttribute('stroke', '#0A0A0A');
      dot.setAttribute('stroke-width', String(Math.max(0.4, zoomScale)));
      g.appendChild(dot);

      const txt = document.createElementNS(SVGNS, 'text');
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('y', String(3 * zoomScale));
      txt.setAttribute('style', `font-family:Inter,sans-serif;font-size:${Math.max(6, 10 * zoomScale)}px;font-weight:900;fill:#0A0A0A;pointer-events:none`);
      txt.textContent = String(count);
      g.appendChild(txt);

      // Hover
      g.addEventListener('mouseenter', (e) => showTip(p, e));
      g.addEventListener('mousemove',  (e) => showTip(p, e));
      g.addEventListener('mouseleave', hideTip);
      if (state.isAdmin) {
        g.addEventListener('click', () => {
          state.selection = { kind: 'city', point: p };
          state.openClientId = null;
          renderDrawer();
        });
      }
      elMarkers.appendChild(g);
    });

    // Footer + unmatched warning
    const visibleTotal = visible.reduce((a, p) => a + filterCount(p), 0);
    elFooterL.textContent = `Showing ${visible.length} cities · ${visibleTotal} clients${state.isAdmin ? ' · click any state or dot to see profiles' : ''}`;

    if (state.data.totals.unmatched > 0 && state.isAdmin) {
      const sample = state.data.totals.unmatchedLocs.slice(0, 5).join(', ');
      const more = state.data.totals.unmatchedLocs.length > 5 ? '…' : '';
      elWarn.innerHTML = `<strong>${state.data.totals.unmatched}</strong> client(s) couldn't be placed on the map (location string not in geocache). Run the geocoder script to add: <span style="font-family:ui-monospace,monospace">${escHtml(sample + more)}</span>`;
      elWarn.hidden = false;
    } else {
      elWarn.hidden = true;
    }
  }

  function showTip(p, e) {
    state.hovered = p;
    const rect = elMapWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const left = Math.min(x + 12, rect.width - 280);
    const top  = Math.min(y + 12, rect.height - 200);
    elTip.style.left = `${left}px`;
    elTip.style.top  = `${top}px`;
    const currentClients = state.isAdmin ? p.clients.filter((c) => c.status !== 'Churned') : [];
    elTip.innerHTML = `
      <div class="rim-tip-loc">${escHtml(p.loc)}</div>
      ${p.active > 0     ? `<div class="rim-tip-row"><span style="color:#4ADE80">●</span> Active: <strong>${p.active}</strong></div>` : ''}
      ${p.preLaunch > 0  ? `<div class="rim-tip-row"><span style="color:#C4B5FD">●</span> Pre-launch: <strong>${p.preLaunch}</strong></div>` : ''}
      ${p.paused > 0     ? `<div class="rim-tip-row"><span style="color:#FB923C">●</span> Paused: <strong>${p.paused}</strong></div>` : ''}
      ${p.ams && p.ams.length ? `<div class="rim-tip-meta"><b>AM:</b> ${escHtml(p.ams.join(', '))}</div>` : ''}
      ${p.pods && p.pods.length ? `<div class="rim-tip-meta"><b>Pod:</b> ${escHtml(p.pods.join(', '))}</div>` : ''}
      ${currentClients.length ? `<div class="rim-tip-clients">
        ${currentClients.slice(0,4).map((c) => `<span class="name"><span style="color:${c.status === 'Active' ? '#22C55E' : c.status === 'Pre-Launch' ? '#A78BFA' : '#888'}">●</span> ${escHtml(c.businessName)}</span>`).join('')}
        ${currentClients.length > 4 ? `<span class="name" style="color:rgba(255,255,255,0.4);font-style:italic">+${currentClients.length - 4} more</span>` : ''}
      </div>` : ''}
      ${state.isAdmin ? '<div class="rim-tip-cta">Click for full profiles →</div>' : ''}
    `;
    elTip.hidden = false;
  }

  function hideTip() {
    state.hovered = null;
    elTip.hidden = true;
  }

  elMapWrap.addEventListener('mouseleave', hideTip);

  // ---- Search
  function renderSearch() {
    const matched = state.stateSearch ? resolveState(state.stateSearch) : null;
    if (state.stateSearch && matched) {
      elGo.hidden = false;
      elGo.textContent = `Go to ${matched} →`;
      elNomatch.hidden = true;
    } else if (state.stateSearch && !matched) {
      elGo.hidden = true;
      elNomatch.hidden = false;
    } else {
      elGo.hidden = true;
      elNomatch.hidden = true;
    }
  }
  elSearch.addEventListener('input', () => {
    state.stateSearch = elSearch.value;
    renderSearch();
  });
  elSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const m = resolveState(elSearch.value);
      if (m) goToState(m);
    } else if (e.key === 'Escape') {
      state.stateSearch = '';
      elSearch.value = '';
      renderSearch();
    }
  });
  elGo.addEventListener('click', () => {
    const m = resolveState(elSearch.value);
    if (m) goToState(m);
  });

  function goToState(name) {
    const c = STATE_CENTROIDS[name];
    if (!c) return;
    // Translate lat/lng + zoom into an SVG transform around the projected centroid.
    const proj = projection([c.lng, c.lat]);
    if (!proj) return;
    state.zoom = c.zoom;
    state.center = [c.lng, c.lat];
    applyTransform();
    state.selection = { kind: 'state', name };
    state.openClientId = null;
    state.stateSearch = '';
    elSearch.value = '';
    renderSearch();
    renderDrawer();
    renderMarkers();
  }

  // ---- Zoom / pan (manual, no d3-zoom — keeps the bundle smaller)
  // We track zoom + center [lng, lat] and apply an SVG transform that maps the
  // projected centroid to the viewport center, scaled by `zoom`.
  function applyTransform() {
    const c = projection(state.center);
    if (!c) return;
    const [cx, cy] = c;
    const tx = VIEW_W / 2 - cx * state.zoom;
    const ty = VIEW_H / 2 - cy * state.zoom;
    elZoomLayer.setAttribute('transform', `translate(${tx}, ${ty}) scale(${state.zoom})`);
    elReset.hidden = (state.zoom === 1 && state.center[0] === -96 && state.center[1] === 38);
    renderMarkers();
  }
  elReset.addEventListener('click', () => {
    state.zoom = 1;
    state.center = [-96, 38];
    applyTransform();
  });

  // Wheel = zoom around mouse position
  elSvg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = elSvg.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (VIEW_W / rect.width);
    const my = (e.clientY - rect.top) * (VIEW_H / rect.height);
    const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
    const newZoom = Math.max(1, Math.min(8, state.zoom * factor));
    if (newZoom === state.zoom) return;
    // Convert mouse position to projected coords using current transform, then
    // recompute center so the same projected point stays under the cursor.
    const c = projection(state.center);
    if (!c) return;
    const [cx, cy] = c;
    const tx = VIEW_W / 2 - cx * state.zoom;
    const ty = VIEW_H / 2 - cy * state.zoom;
    const projX = (mx - tx) / state.zoom;
    const projY = (my - ty) / state.zoom;
    // After zoom: tx' = mx - projX * newZoom; new center proj = (VIEW_W/2 - tx') / newZoom
    const newTx = mx - projX * newZoom;
    const newTy = my - projY * newZoom;
    const newCx = (VIEW_W / 2 - newTx) / newZoom;
    const newCy = (VIEW_H / 2 - newTy) / newZoom;
    const inv = projection.invert ? projection.invert([newCx, newCy]) : null;
    if (inv) state.center = inv;
    state.zoom = newZoom;
    applyTransform();
  }, { passive: false });

  // Drag = pan
  let drag = null;
  elSvg.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, y: e.clientY, center: state.center.slice() };
    elSvg.setPointerCapture(e.pointerId);
  });
  elSvg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const rect = elSvg.getBoundingClientRect();
    const dx = (e.clientX - drag.x) * (VIEW_W / rect.width);
    const dy = (e.clientY - drag.y) * (VIEW_H / rect.height);
    const c = projection(drag.center);
    if (!c) return;
    const [cx, cy] = c;
    const newCx = cx - dx / state.zoom;
    const newCy = cy - dy / state.zoom;
    const inv = projection.invert ? projection.invert([newCx, newCy]) : null;
    if (inv) {
      state.center = inv;
      applyTransform();
    }
  });
  elSvg.addEventListener('pointerup', () => { drag = null; });
  elSvg.addEventListener('pointercancel', () => { drag = null; });

  // ---- Difficulty toggle
  elDifficulty.addEventListener('change', () => {
    state.showDifficulty = elDifficulty.checked;
    renderStateFills();
  });

  // ---- Drawer (admin client list + cycle profiles)
  function renderDrawer() {
    if (!state.isAdmin || !state.selection) {
      elDrawer.innerHTML = '';
      return;
    }
    const sel = state.selection;
    const allClients = sel.kind === 'city'
      ? sel.point.clients
      : state.data.points.filter((pt) => pt.state === sel.name).flatMap((pt) => pt.clients);
    const clients = allClients.filter((c) => c.status !== 'Churned');
    const heading = sel.kind === 'city' ? `Clients in ${sel.point.loc}` : `Clients in ${sel.name}`;

    elDrawer.innerHTML = `
      <div class="rim-drawer">
        <div class="rim-drawer-head">
          <div>
            <div class="rim-drawer-kind">${sel.kind === 'city' ? 'City' : 'State'}</div>
            <div class="rim-drawer-title">${escHtml(heading)}</div>
            <div class="rim-drawer-meta">${clients.length} current client${clients.length === 1 ? '' : 's'}</div>
          </div>
          <button class="rim-drawer-close" data-rim="drawer-close">✕ Close</button>
        </div>
        ${clients.length === 0
          ? `<div class="rim-empty">No current clients here. (Churned clients are hidden — see Airtable for history.)</div>`
          : clients.map((c) => renderClient(c)).join('')}
      </div>
    `;
    elDrawer.querySelector('[data-rim="drawer-close"]').addEventListener('click', () => {
      state.selection = null;
      state.openClientId = null;
      renderDrawer();
    });
    elDrawer.querySelectorAll('[data-rim-cli]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.rimCli;
        state.openClientId = state.openClientId === id ? null : id;
        renderDrawer();
      });
    });
    elDrawer.querySelectorAll('[data-rim-cycle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.rimCycle;
        state.openCycle = state.openCycle === k ? null : k;
        renderDrawer();
      });
    });
  }

  function renderClient(c) {
    const isOpen = state.openClientId === c.recordId;
    const statusColor =
      c.status === 'Active'      ? '#22C55E' :
      c.status === 'Pre-Launch'  ? '#A78BFA' :
      c.status === 'Paused'      ? '#F97316' : '#888';
    return `
      <div class="rim-cli">
        <button class="rim-cli-head" data-rim-cli="${escHtml(c.recordId)}">
          <span style="color:${statusColor}">●</span>
          <span class="rim-cli-flex">
            <span class="rim-cli-name">${escHtml(c.businessName)}</span>
            <span class="rim-cli-sub">${[c.clientName, c.pod || '—', c.primaryCsm || '—', c.niche || '—'].filter(Boolean).map(escHtml).join(' · ')}</span>
          </span>
          <span class="rim-cli-arrow">${isOpen ? '▲' : '▼'}</span>
        </button>
        ${isOpen ? `<div class="rim-cli-body">
          <div class="rim-fields">
            ${field('Status', c.status)}
            ${field('Niche', c.niche)}
            ${field('Signed Contract', c.signedContract)}
            ${field('Client AI Status', c.clientAiStatus == null ? undefined : (c.clientAiStatus ? 'Yes' : 'No'))}
            ${field('Appts Expectation', c.apptsExpectation)}
            ${field('MGMT Fee', c.mgmtFee)}
            ${field('Communication', c.communication)}
            ${field('CC', c.cc)}
            ${field('Start Date', c.startDate)}
            ${field('General Location', c.generalLocation)}
            ${field('Pod', c.pod)}
            ${field('Primary CSM', c.primaryCsm)}
            ${field('Stripe Email', c.stripeEmail, true)}
            ${field('Stripe Customer ID', c.stripeCustomerId, true)}
          </div>
          ${(c.cyclesTotal && c.cyclesTotal > 0) ? `
            <div class="rim-lifetime">
              <div class="rim-lifetime-head">
                <div class="rim-lifetime-h1">Lifetime — across ${c.cyclesTotal} cycle${c.cyclesTotal === 1 ? '' : 's'}</div>
                <div class="rim-lifetime-h2">CPL / CPA = ad spend ÷ leads/appts (totals, not avg of ratios)</div>
              </div>
              <div class="rim-lifetime-grid">
                <div><div class="l">Total billed</div><div class="v">${escHtml(fmtMoney(c.totalBilled))}</div></div>
                <div><div class="l">Total ad spend</div><div class="v">${escHtml(fmtMoney(c.totalAdSpend))}</div></div>
                <div><div class="l">CPL (ad spend)</div><div class="v">${c.avgCpl != null ? '$' + Math.round(c.avgCpl) : '—'}</div></div>
                <div><div class="l">CPA (ad spend)</div><div class="v">${c.avgCpa != null ? '$' + Math.round(c.avgCpa) : '—'}</div></div>
              </div>
            </div>
          ` : ''}
          ${(c.cycles && c.cycles.length) ? `
            <div class="rim-cycles-h">Cycles (${c.cycles.length}) — most recent first</div>
            ${c.cycles.map((cy, i) => renderCycle(c.recordId, cy, i)).join('')}
          ` : ''}
        </div>` : ''}
      </div>
    `;
  }

  function renderCycle(recordId, cy, i) {
    const key = `${recordId}-${i}`;
    const isOpen = state.openCycle === key;
    const onPace = (cy.appts != null && cy.apptGoal != null && cy.apptGoal > 0) ? cy.appts / cy.apptGoal : null;
    const paceColor = onPace == null ? '#6B7280' : onPace >= 0.8 ? '#22C55E' : onPace >= 0.5 ? '#F59E0B' : '#EF4444';
    const cpaCalc = (cy.adSpend && cy.appts) ? '$' + Math.round(cy.adSpend / cy.appts) : '—';
    return `
      <div class="rim-cycle">
        <button class="rim-cycle-head" data-rim-cycle="${escHtml(key)}">
          <span class="rim-cycle-label">${escHtml(cy.label || ('Cycle ' + (cy.number ?? '?')))}</span>
          <span class="rim-cycle-dates">${escHtml(fmtDate(cy.startDate))} → ${escHtml(fmtDate(cy.endDate))}</span>
          <span class="rim-cycle-pace">${(cy.appts != null && cy.apptGoal != null) ? `<span style="color:${paceColor}">${cy.appts}/${cy.apptGoal} appts</span>` : ''}</span>
          <span class="rim-cycle-arrow">${isOpen ? '▲' : '▼'}</span>
        </button>
        ${isOpen ? `<div class="rim-cycle-body">
          <div class="rim-cycle-grid">
            ${miniStat('Ad spend', fmtMoney(cy.adSpend))}
            ${miniStat('Leads', fmtNum(cy.totalLeads))}
            ${miniStat('Appts / goal', cy.appts != null ? `${cy.appts} / ${cy.apptGoal ?? '?'}` : '—')}
            ${miniStat('CPA (calc)', cpaCalc, 'ad spend ÷ appts')}
            ${miniStat('CPL', cy.cpl != null ? '$' + cy.cpl.toFixed(2) : '—', cy.cplGoal ? `goal $${cy.cplGoal}` : '')}
            ${miniStat('Est booked', fmtNum(cy.estBooked))}
            ${miniStat('Billing amt', fmtMoney(cy.billingAmount))}
            ${miniStat('Billed', cy.billed || '—', cy.goodToBill ? `good to bill: ${cy.goodToBill}` : '')}
          </div>
          <div class="rim-cycle-grid">
            ${miniStat('Link CTR', fmtPct(cy.linkCtr))}
            ${miniStat('Link CPC', cy.linkCpc != null ? '$' + cy.linkCpc.toFixed(2) : '—')}
            ${miniStat('CPM', cy.cpm != null ? '$' + Math.round(cy.cpm) : '—')}
            ${miniStat('Frequency', fmtNum(cy.frequency, 2))}
            ${miniStat('OSA %', fmtPct(cy.osaPct))}
            ${miniStat('Survey %', fmtPct(cy.surveyPct))}
            ${miniStat('Monthly bdgt', fmtMoney(cy.monthlyBudget))}
          </div>
        </div>` : ''}
      </div>
    `;
  }

  function field(label, value, mono) {
    const v = (value != null && String(value).trim() !== '') ? escHtml(value) : '';
    return `<div class="rim-field">
      <span class="rim-field-l">${escHtml(label)}</span>
      <span class="rim-field-v ${mono ? 'mono' : ''} ${v ? '' : 'empty'}" title="${v || '—'}">${v || '—'}</span>
    </div>`;
  }

  function miniStat(label, value, sub) {
    return `<div class="rim-stat-mini">
      <div class="l">${escHtml(label)}</div>
      <div class="v">${escHtml(value)}</div>
      ${sub ? `<div class="s">${escHtml(sub)}</div>` : ''}
    </div>`;
  }

  // ---- Initial render
  renderStateFills();
  renderStats();
  applyTransform();      // also calls renderMarkers
  renderSearch();
  renderDrawer();
}

// ---------------------------------------------------------------------------
// Auto-mount + global API
// ---------------------------------------------------------------------------

const RIClienteleMap = { mount };
if (typeof window !== 'undefined') {
  window.RIClienteleMap = RIClienteleMap;
  // Auto-mount any element marked with data-ri-clientele-map
  const auto = () => {
    document.querySelectorAll('[data-ri-clientele-map]').forEach((el) => {
      if (el.dataset.rimMounted) return;
      el.dataset.rimMounted = '1';
      const isAdmin = el.dataset.riAdmin !== 'false';
      mount(el, { isAdmin });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', auto);
  } else {
    auto();
  }
}

export default RIClienteleMap;
export { mount };
