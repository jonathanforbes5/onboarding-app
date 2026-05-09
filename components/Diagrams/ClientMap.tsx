'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { useApp } from '@/context/AppContext';
import { STATE_TIER, TIER_COLORS, TIER_LABELS, type DifficultyTier } from '@/data/marketDifficulty';

interface CycleSnapshot {
  label?:         string;
  number?:        number;
  startDate?:     string;
  endDate?:       string;
  adSpend?:       number;
  billingAmount?: number;
  monthlyBudget?: number;
  apptGoal?:      number;
  appts?:         number;
  estBooked?:     number;
  totalLeads?:    number;
  cpl?:           number;
  cplGoal?:       number;
  osaPct?:        number;
  linkCtr?:       number;
  linkCpc?:       number;
  cpm?:           number;
  frequency?:     number;
  surveyPct?:     number;
  goodToBill?:    string;
  billed?:        string;
}

// State name → approximate centroid + suggested zoom for the search-and-jump feature.
const STATE_CENTROIDS: Record<string, { lat: number; lng: number; zoom: number }> = {
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

const STATE_ABBR: Record<string, string> = {
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

function resolveState(query: string): string | null {
  const q = query.trim();
  if (!q) return null;
  // Abbreviation match (case-insensitive)
  const upper = q.toUpperCase();
  if (STATE_ABBR[upper]) return STATE_ABBR[upper];
  // Exact name match (case-insensitive)
  for (const name of Object.keys(STATE_CENTROIDS)) {
    if (name.toLowerCase() === q.toLowerCase()) return name;
  }
  // Prefix match
  for (const name of Object.keys(STATE_CENTROIDS)) {
    if (name.toLowerCase().startsWith(q.toLowerCase())) return name;
  }
  return null;
}

function fmtMoney(n?: number) {
  if (n == null) return '—';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
function fmtPct(n?: number) {
  if (n == null) return '—';
  return (n * 100).toFixed(1) + '%';
}
function fmtNum(n?: number, dp = 0) {
  if (n == null) return '—';
  return n.toLocaleString('en-US', { maximumFractionDigits: dp });
}
function fmtDate(s?: string) {
  if (!s) return '—';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
}

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
  cycles?:         CycleSnapshot[];
  cyclesTotal?:    number;
  totalBilled?:    number;
  totalAdSpend?:   number;
  avgCpl?:         number;
  avgCpa?:         number;
}

interface CityPoint {
  loc: string;
  state?: string;
  lat: number;
  lng: number;
  active: number;
  churned: number;
  preLaunch: number;
  paused: number;
  total: number;
  ams: string[];
  niches: string[];
  pods: string[];
  clients: ClientProfile[];
}

interface MapData {
  points: CityPoint[];
  totals: { clients: number; active: number; churned: number; preLaunch: number; unmatched: number; unmatchedLocs: string[] };
  generatedAt: number;
}

// Churned clients are intentionally hidden from the map view — they're history,
// not current business. Showing them inflates the picture.
const STATUS_FILTERS = [
  { id: 'all',       label: 'All Current', color: '#F5C800' },
  { id: 'active',    label: 'Active',      color: '#22C55E' },
  { id: 'preLaunch', label: 'Pre-Launch',  color: '#A78BFA' },
] as const;
type StatusFilter = typeof STATUS_FILTERS[number]['id'];

export function ClientMap() {
  const { currentUser } = useApp();
  const isAdmin = currentUser?.role === 'super_admin';
  const [data, setData]   = useState<MapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [hovered, setHovered] = useState<CityPoint | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selection, setSelection] = useState<
    | { kind: 'city';  point: CityPoint }
    | { kind: 'state'; name: string }
    | null
  >(null);
  const [openClientId, setOpenClientId] = useState<string | null>(null);
  const [openCycle, setOpenCycle] = useState<string | null>(null);
  const [zoomCenter, setZoomCenter] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: [-96, 38], zoom: 1 });
  const [stateSearch, setStateSearch] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);

  const matchedState = stateSearch ? resolveState(stateSearch) : null;
  const goToState = (name: string) => {
    const c = STATE_CENTROIDS[name];
    if (!c) return;
    setZoomCenter({ coordinates: [c.lng, c.lat], zoom: c.zoom });
    setSelection({ kind: 'state', name });
    setOpenClientId(null);
    setStateSearch('');
  };
  const resetZoom = () => setZoomCenter({ coordinates: [-96, 38], zoom: 1 });

  useEffect(() => {
    fetch('/api/clients-map')
      .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
      .then((d: MapData) => { if ('error' in d) setError((d as any).error); else setData(d); })
      .catch(e => setError(String(e)));
  }, []);

  if (error) {
    return (
      <div className="text-xs text-red-500 p-3 bg-red-50 rounded-lg">
        Couldn&apos;t load map data: {error}
      </div>
    );
  }
  if (!data) {
    return <div className="text-xs text-brand-gray text-center py-8">Loading client map…</div>;
  }

  const filterCount = (p: CityPoint): number => {
    // 'All' = current business only. Churned is excluded from every count and
    // marker so the map reflects who we're actively working with.
    if (filter === 'all')       return p.active + p.preLaunch + p.paused;
    if (filter === 'active')    return p.active;
    if (filter === 'preLaunch') return p.preLaunch;
    return 0;
  };
  const visible = data.points.filter(p => filterCount(p) > 0);
  const visibleTotal = visible.reduce((acc, p) => acc + filterCount(p), 0);

  const handleEnter = (p: CityPoint, e: React.MouseEvent) => {
    setHovered(p);
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="space-y-3">
      {/* View toggle */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <label className="flex items-center gap-2 text-xs text-brand-gray cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showDifficulty}
            onChange={(e) => setShowDifficulty(e.target.checked)}
            className="cursor-pointer"
          />
          <span className="font-bold">Show market difficulty fill</span>
        </label>
        {showDifficulty && (
          <div className="flex flex-wrap gap-2 text-[10px]">
            {(['avoid','hard','great','unknown'] as DifficultyTier[]).map(t => (
              <span key={t} className="inline-flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: TIER_COLORS[t] }} />
                <span className="font-bold text-brand-gray">{TIER_LABELS[t]}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stat bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STATUS_FILTERS.map(f => {
          const count = f.id === 'all'
            ? data.totals.active + data.totals.preLaunch
            : f.id === 'active' ? data.totals.active
            : data.totals.preLaunch;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-xl px-3 py-2 text-left transition-all ${
                filter === f.id ? 'ring-2 ring-offset-1 ring-brand-yellow' : ''
              }`}
              style={{ backgroundColor: filter === f.id ? '#0A0A0A' : '#fff', border: '1px solid #E5E7EB' }}
            >
              <div className="text-[10px] font-black uppercase tracking-widest"
                   style={{ color: filter === f.id ? f.color : '#666' }}>
                {f.label}
              </div>
              <div className="font-black text-lg" style={{ color: filter === f.id ? '#fff' : '#111' }}>
                {count}
              </div>
            </button>
          );
        })}
      </div>

      {/* State search + zoom controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && matchedState) goToState(matchedState);
              if (e.key === 'Escape') setStateSearch('');
            }}
            placeholder="🔍 Jump to state — type name or 2-letter code (e.g. FL, Florida, NC, NY)"
            className="w-full px-3 py-2 rounded-lg text-xs border border-brand-gray-mid focus:border-brand-yellow focus:outline-none"
          />
          {stateSearch && matchedState && (
            <button
              onClick={() => goToState(matchedState)}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-brand-yellow text-brand-black text-[10px] font-black"
            >
              Go to {matchedState} →
            </button>
          )}
          {stateSearch && !matchedState && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">No match</span>
          )}
        </div>
        {(zoomCenter.zoom !== 1 || zoomCenter.coordinates[0] !== -96) && (
          <button
            onClick={resetZoom}
            className="px-3 py-2 rounded-lg text-xs font-bold bg-brand-gray-light hover:bg-brand-gray-mid transition-colors"
          >
            ↺ Reset zoom
          </button>
        )}
        <span className="text-[10px] text-brand-gray hidden sm:inline">scroll to zoom · drag to pan</span>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="relative rounded-xl overflow-hidden"
        style={{ backgroundColor: '#0A0A0A', border: '1px solid #1f1f1f' }}
        onMouseLeave={() => setHovered(null)}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          width={980}
          height={560}
          style={{ width: '100%', height: 'auto' }}
        >
          <ZoomableGroup
            center={zoomCenter.coordinates}
            zoom={zoomCenter.zoom}
            minZoom={1}
            maxZoom={8}
            // Clamp panning to roughly the US bbox so users can't drag the
            // map off into the Pacific. translateExtent is in SVG units
            // matching the ComposableMap width/height. d3-zoom inside RSM
            // honours this and prevents the transform from going past the
            // edges.
            translateExtent={[[0, 0], [980, 560]]}
            onMoveEnd={(p: any) => {
              // Belt-and-suspenders: clamp the [lng, lat] center to the US
              // bbox in case translateExtent is bypassed (e.g. via
              // programmatic state.zoomCenter update).
              const [lng, lat] = p.coordinates;
              const clampedLng = Math.max(-128, Math.min(-62, lng));
              const clampedLat = Math.max(22,   Math.min(51,  lat));
              setZoomCenter({ coordinates: [clampedLng, clampedLat], zoom: p.zoom });
            }}
          >
          <Geographies geography="/us-states-10m.json">
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const stateName = geo.properties?.name as string | undefined;
                const tier: DifficultyTier | undefined = stateName ? STATE_TIER[stateName] : undefined;
                const baseFill = showDifficulty && tier ? TIER_COLORS[tier] : '#1f1f1f';
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={isAdmin && stateName ? () => { setSelection({ kind: 'state', name: stateName }); setOpenClientId(null); } : undefined}
                    style={{
                      default: { fill: baseFill, stroke: '#0A0A0A', strokeWidth: 0.5, outline: 'none', cursor: isAdmin ? 'pointer' : 'default' },
                      hover:   { fill: showDifficulty && tier ? baseFill : '#2a2a2a', stroke: '#F5C800', strokeWidth: 0.5, outline: 'none', filter: 'brightness(1.15)', cursor: isAdmin ? 'pointer' : 'default' },
                      pressed: { fill: baseFill, outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {visible.map((p) => {
            const count = filterCount(p);
            // Markers shrink as zoom increases so dense areas (East Coast / South FL)
            // become clickable when zoomed in. Pulse ring also shrinks proportionally.
            const zoomScale = 1 / Math.max(1, Math.sqrt(zoomCenter.zoom));
            const r = Math.max(2.5, Math.min(18, 5 + Math.sqrt(count) * 2.2) * zoomScale);
            const color =
              filter === 'preLaunch' ? '#A78BFA' :
              filter === 'active' ? '#22C55E' :
              // 'all' = current business — colour by what dominates active vs pre-launch.
              p.preLaunch > p.active ? '#A78BFA' :
              '#F5C800';
            return (
              <Marker
                key={p.loc}
                coordinates={[p.lng, p.lat]}
                onMouseEnter={(e: any) => handleEnter(p, e)}
                onMouseMove={(e: any) => handleEnter(p, e)}
                onClick={isAdmin ? () => { setSelection({ kind: 'city', point: p }); setOpenClientId(null); } : undefined}
                style={{ default: { cursor: 'pointer' } } as any}
              >
                {/* Pulse ring — scales with marker so dense zoomed-in areas stay readable */}
                <circle r={r + 4 * zoomScale} fill={color} opacity={0.15}>
                  <animate attributeName="r" from={r} to={r + 8 * zoomScale} dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle r={r} fill={color} opacity={0.85} stroke="#0A0A0A" strokeWidth={Math.max(0.4, zoomScale)} />
                <text
                  textAnchor="middle"
                  y={3 * zoomScale}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: Math.max(6, 10 * zoomScale), fontWeight: 900, fill: '#0A0A0A', pointerEvents: 'none' }}
                >
                  {count}
                </text>
              </Marker>
            );
          })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {hovered && (
          <div
            className="absolute z-10 pointer-events-none rounded-lg shadow-xl"
            style={{
              left: Math.min(tooltipPos.x + 12, (mapRef.current?.clientWidth ?? 0) - 280),
              top:  Math.min(tooltipPos.y + 12, (mapRef.current?.clientHeight ?? 0) - 200),
              backgroundColor: '#0A0A0A',
              border: '1px solid #F5C80055',
              padding: '10px 12px',
              minWidth: 220,
              maxWidth: 280,
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">
              {hovered.loc}
            </div>
            <div className="text-xs text-white space-y-0.5">
              {hovered.active > 0      && <div><span className="text-green-400">●</span> Active: <strong>{hovered.active}</strong></div>}
              {hovered.preLaunch > 0   && <div><span className="text-purple-400">●</span> Pre-launch: <strong>{hovered.preLaunch}</strong></div>}
              {hovered.paused > 0      && <div><span className="text-orange-400">●</span> Paused: <strong>{hovered.paused}</strong></div>}
            </div>
            {hovered.ams.length > 0 && (
              <div className="text-[11px] text-white/70 mt-1.5">
                <span className="text-brand-yellow font-black">AM:</span> {hovered.ams.join(', ')}
              </div>
            )}
            {hovered.pods.length > 0 && (
              <div className="text-[11px] text-white/70">
                <span className="text-brand-yellow font-black">Pod:</span> {hovered.pods.join(', ')}
              </div>
            )}
            {isAdmin && (() => {
              const currentClients = hovered.clients.filter((c) => c.status !== 'Churned');
              if (currentClients.length === 0) return null;
              return (
                <div className="text-[10px] text-white/60 mt-1.5 pt-1.5 border-t border-white/10">
                  {currentClients.slice(0, 4).map((c, i) => (
                    <div key={i} className="truncate">
                      <span style={{
                        color: c.status === 'Active' ? '#22C55E' :
                               c.status === 'Pre-Launch' ? '#A78BFA' : '#888'
                      }}>●</span> {c.businessName}
                    </div>
                  ))}
                  {currentClients.length > 4 && <div className="text-white/40 italic">+{currentClients.length - 4} more</div>}
                </div>
              );
            })()}
            {isAdmin && (
              <div className="text-[10px] text-brand-yellow/80 mt-1.5 pt-1.5 border-t border-white/10 italic">Click for full profiles →</div>
            )}
          </div>
        )}
      </div>

      {/* Selection panel — admin-only — list + expandable profiles */}
      {isAdmin && selection && (() => {
        const clients: ClientProfile[] = (
          selection.kind === 'city'
            ? selection.point.clients
            : data.points.filter((pt) => pt.state === selection.name).flatMap((pt) => pt.clients)
        ).filter((c) => c.status !== 'Churned');

        const heading = selection.kind === 'city'
          ? `Clients in ${selection.point.loc}`
          : `Clients in ${selection.name}`;

        return (
          <div className="rounded-xl border border-brand-gray-mid bg-white overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-brand-black text-white">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">{selection.kind === 'city' ? 'City' : 'State'}</div>
                <div className="font-black text-sm">{heading}</div>
                <div className="text-[10px] text-white/60">{clients.length} current client{clients.length === 1 ? '' : 's'}</div>
              </div>
              <button
                onClick={() => { setSelection(null); setOpenClientId(null); }}
                className="text-white/70 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {clients.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-brand-gray">
                No current clients here. (Churned clients are hidden — see Airtable for history.)
              </div>
            ) : (
              <div className="divide-y divide-brand-gray-mid">
                {clients.map((c) => {
                  const isOpen = openClientId === c.recordId;
                  const statusColor =
                    c.status === 'Active'      ? '#22C55E' :
                    c.status === 'Pre-Launch'  ? '#A78BFA' :
                    c.status === 'Paused'      ? '#F97316' : '#888';
                  return (
                    <div key={c.recordId}>
                      <button
                        onClick={() => setOpenClientId(isOpen ? null : c.recordId)}
                        className="w-full text-left px-3 py-2 hover:bg-brand-gray-light transition-colors flex items-center gap-3"
                      >
                        <span style={{ color: statusColor }}>●</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm text-brand-black truncate">{c.businessName}</div>
                          <div className="text-[11px] text-brand-gray truncate">
                            {c.clientName ? `${c.clientName} · ` : ''}{c.pod ?? '—'} · {c.primaryCsm ?? '—'} · {c.niche ?? '—'}
                          </div>
                        </div>
                        <span className="text-[10px] text-brand-gray flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                      </button>
                      {isOpen && (
                        <div className="bg-brand-gray-light px-3 py-3 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                            <ProfileField label="Status"            value={c.status} />
                            <ProfileField label="Niche"             value={c.niche} />
                            <ProfileField label="Signed Contract"   value={c.signedContract} />
                            <ProfileField label="Client AI Status"  value={c.clientAiStatus == null ? undefined : (c.clientAiStatus ? 'Yes' : 'No')} />
                            <ProfileField label="Appts Expectation" value={c.apptsExpectation} />
                            <ProfileField label="MGMT Fee"          value={c.mgmtFee} />
                            <ProfileField label="Communication"     value={c.communication} />
                            <ProfileField label="CC"                value={c.cc} />
                            <ProfileField label="Start Date"        value={c.startDate} />
                            <ProfileField label="General Location"  value={c.generalLocation} />
                            <ProfileField label="Pod"               value={c.pod} />
                            <ProfileField label="Primary CSM"       value={c.primaryCsm} />
                            <ProfileField label="Stripe Email"      value={c.stripeEmail} mono />
                            <ProfileField label="Stripe Customer ID" value={c.stripeCustomerId} mono />
                          </div>

                          {/* Lifetime stats — pulled from Billing Cycles */}
                          {(c.cyclesTotal ?? 0) > 0 && (
                            <div className="rounded-lg bg-brand-black p-2.5">
                              <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1.5">
                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">Lifetime — across {c.cyclesTotal} cycle{c.cyclesTotal === 1 ? '' : 's'}</div>
                                <div className="text-[9px] text-white/40 italic">CPL / CPA = ad spend ÷ leads/appts (totals, not avg of ratios)</div>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                                <div>
                                  <div className="text-white/50 uppercase font-black tracking-widest">Total billed</div>
                                  <div className="text-white font-black text-sm">{fmtMoney(c.totalBilled)}</div>
                                </div>
                                <div>
                                  <div className="text-white/50 uppercase font-black tracking-widest">Total ad spend</div>
                                  <div className="text-white font-black text-sm">{fmtMoney(c.totalAdSpend)}</div>
                                </div>
                                <div>
                                  <div className="text-white/50 uppercase font-black tracking-widest">CPL (ad spend)</div>
                                  <div className="text-white font-black text-sm">{c.avgCpl != null ? `$${c.avgCpl.toFixed(0)}` : '—'}</div>
                                </div>
                                <div>
                                  <div className="text-white/50 uppercase font-black tracking-widest">CPA (ad spend)</div>
                                  <div className="text-white font-black text-sm">{c.avgCpa != null ? `$${c.avgCpa.toFixed(0)}` : '—'}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Per-cycle breakdown */}
                          {c.cycles && c.cycles.length > 0 && (
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1.5">
                                Cycles ({c.cycles.length}) — most recent first
                              </div>
                              <div className="space-y-1">
                                {c.cycles.map((cy, i) => {
                                  const cycleKey = `${c.recordId}-${i}`;
                                  const cycleOpen = openCycle === cycleKey;
                                  const onPace = cy.appts != null && cy.apptGoal != null && cy.apptGoal > 0 ? cy.appts / cy.apptGoal : null;
                                  const paceColor = onPace == null ? '#6B7280' : onPace >= 0.8 ? '#22C55E' : onPace >= 0.5 ? '#F59E0B' : '#EF4444';
                                  return (
                                    <div key={cycleKey} className="rounded-lg bg-white border border-brand-gray-mid overflow-hidden">
                                      <button
                                        onClick={() => setOpenCycle(cycleOpen ? null : cycleKey)}
                                        className="w-full text-left px-2.5 py-1.5 flex items-center gap-2 hover:bg-brand-gray-light transition-colors"
                                      >
                                        <span className="font-black text-[11px] text-brand-black flex-shrink-0">{cy.label ?? `Cycle ${cy.number ?? '?'}`}</span>
                                        <span className="text-[10px] text-brand-gray flex-shrink-0">{fmtDate(cy.startDate)} → {fmtDate(cy.endDate)}</span>
                                        <span className="flex-1 text-right text-[10px]">
                                          {cy.appts != null && cy.apptGoal != null && (
                                            <span className="font-bold" style={{ color: paceColor }}>
                                              {cy.appts}/{cy.apptGoal} appts
                                            </span>
                                          )}
                                        </span>
                                        <span className="text-[10px] text-brand-gray">{cycleOpen ? '▲' : '▼'}</span>
                                      </button>
                                      {cycleOpen && (
                                        <div className="px-2.5 py-2 bg-brand-gray-light border-t border-brand-gray-mid space-y-2">
                                          {/* Headline — most important top-down (Oscar's report order) */}
                                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 text-[10px]">
                                            <CycleStat label="Ad spend"     value={fmtMoney(cy.adSpend)} />
                                            <CycleStat label="Leads"        value={fmtNum(cy.totalLeads)} />
                                            <CycleStat label="Appts / goal" value={cy.appts != null ? `${cy.appts} / ${cy.apptGoal ?? '?'}` : '—'} />
                                            <CycleStat label="CPA (calc)"   value={cy.adSpend && cy.appts ? `$${(cy.adSpend / cy.appts).toFixed(0)}` : '—'} sub="ad spend ÷ appts" />
                                            <CycleStat label="CPL"          value={cy.cpl != null ? `$${cy.cpl.toFixed(2)}` : '—'} sub={cy.cplGoal ? `goal $${cy.cplGoal}` : undefined} />
                                            <CycleStat label="Est booked"   value={fmtNum(cy.estBooked)} />
                                            <CycleStat label="Billing amt"  value={fmtMoney(cy.billingAmount)} />
                                            <CycleStat label="Billed"       value={cy.billed ?? '—'} sub={cy.goodToBill ? `good to bill: ${cy.goodToBill}` : undefined} />
                                          </div>
                                          {/* Ad-quality details — secondary */}
                                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 text-[10px] pt-1.5 border-t border-brand-gray-mid">
                                            <CycleStat label="Link CTR"     value={fmtPct(cy.linkCtr)} />
                                            <CycleStat label="Link CPC"     value={cy.linkCpc != null ? `$${cy.linkCpc.toFixed(2)}` : '—'} />
                                            <CycleStat label="CPM"          value={cy.cpm != null ? `$${cy.cpm.toFixed(0)}` : '—'} />
                                            <CycleStat label="Frequency"    value={fmtNum(cy.frequency, 2)} />
                                            <CycleStat label="OSA %"        value={fmtPct(cy.osaPct)} />
                                            <CycleStat label="Survey %"     value={fmtPct(cy.surveyPct)} />
                                            <CycleStat label="Monthly bdgt" value={fmtMoney(cy.monthlyBudget)} />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      <div className="flex items-center justify-between text-[10px] text-brand-gray">
        <span>Showing {visible.length} cities · {visibleTotal} clients{isAdmin ? ' · click any state or dot to see profiles' : ''}</span>
        <span>Live from Airtable · refreshed every 5 min</span>
      </div>

      {data.totals.unmatched > 0 && isAdmin && (
        <div className="text-[10px] text-orange-600 bg-orange-50 rounded-lg p-2">
          <strong>{data.totals.unmatched}</strong> client(s) couldn&apos;t be placed on the map
          (location string not in geocache). Run the geocoder script to add:{' '}
          <span className="font-mono">{data.totals.unmatchedLocs.slice(0, 5).join(', ')}{data.totals.unmatchedLocs.length > 5 ? '…' : ''}</span>
        </div>
      )}
    </div>
  );
}

function CycleStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[8px] font-black uppercase tracking-widest text-brand-gray">{label}</div>
      <div className="font-bold text-[11px] text-brand-black truncate">{value}</div>
      {sub && <div className="text-[9px] text-brand-gray italic">{sub}</div>}
    </div>
  );
}

function ProfileField({ label, value, mono }: { label: string; value?: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 min-w-0">
      <span className="text-[9px] font-black uppercase tracking-widest text-brand-gray flex-shrink-0 w-24">{label}</span>
      <span className={`text-brand-black truncate ${mono ? 'font-mono text-[10px]' : ''}`} title={value ?? '—'}>
        {value && value.trim() ? value : <span className="text-brand-gray italic">—</span>}
      </span>
    </div>
  );
}
