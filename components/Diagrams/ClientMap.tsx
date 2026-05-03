'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { useApp } from '@/context/AppContext';
import { STATE_TIER, TIER_COLORS, TIER_LABELS, type DifficultyTier } from '@/data/marketDifficulty';

interface Client {
  name: string;
  status: string;
  pod?: string;
  am?: string;
  niche?: string;
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
  ams: string[];
  niches: string[];
  pods: string[];
  clients: Client[];
}

interface MapData {
  points: CityPoint[];
  totals: { clients: number; active: number; churned: number; preLaunch: number; unmatched: number; unmatchedLocs: string[] };
  generatedAt: number;
}

const STATUS_FILTERS = [
  { id: 'all',       label: 'All',       color: '#F5C800' },
  { id: 'active',    label: 'Active',    color: '#22C55E' },
  { id: 'churned',   label: 'Churned',   color: '#EF4444' },
  { id: 'preLaunch', label: 'Pre-Launch', color: '#A78BFA' },
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
  const mapRef = useRef<HTMLDivElement>(null);

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
    if (filter === 'all')       return p.total;
    if (filter === 'active')    return p.active;
    if (filter === 'churned')   return p.churned;
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
            ? data.totals.clients
            : f.id === 'active' ? data.totals.active
            : f.id === 'churned' ? data.totals.churned
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
                    style={{
                      default: { fill: baseFill, stroke: '#0A0A0A', strokeWidth: 0.5, outline: 'none' },
                      hover:   { fill: showDifficulty && tier ? baseFill : '#2a2a2a', stroke: '#F5C800', strokeWidth: 0.5, outline: 'none', filter: 'brightness(1.15)' },
                      pressed: { fill: baseFill, outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {visible.map((p) => {
            const count = filterCount(p);
            const r = Math.min(18, 5 + Math.sqrt(count) * 2.2);
            const color =
              filter === 'churned' ? '#EF4444' :
              filter === 'preLaunch' ? '#A78BFA' :
              filter === 'active' ? '#22C55E' :
              p.churned > p.active ? '#EF4444' :
              p.preLaunch > p.active ? '#A78BFA' :
              '#F5C800';
            return (
              <Marker
                key={p.loc}
                coordinates={[p.lng, p.lat]}
                onMouseEnter={(e: any) => handleEnter(p, e)}
                onMouseMove={(e: any) => handleEnter(p, e)}
                style={{ default: { cursor: 'pointer' } } as any}
              >
                {/* Pulse ring */}
                <circle r={r + 4} fill={color} opacity={0.15}>
                  <animate attributeName="r" from={r} to={r + 8} dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle r={r} fill={color} opacity={0.85} stroke="#0A0A0A" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={3}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 900, fill: '#0A0A0A', pointerEvents: 'none' }}
                >
                  {count}
                </text>
              </Marker>
            );
          })}
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
              {hovered.churned > 0     && <div><span className="text-red-400">●</span> Churned: <strong>{hovered.churned}</strong></div>}
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
            {isAdmin && hovered.clients.length > 0 && (
              <div className="text-[10px] text-white/60 mt-1.5 pt-1.5 border-t border-white/10">
                {hovered.clients.slice(0, 4).map((c, i) => (
                  <div key={i} className="truncate">
                    <span style={{
                      color: c.status === 'Active' ? '#22C55E' :
                             c.status === 'Churned' ? '#EF4444' :
                             c.status === 'Pre-Launch' ? '#A78BFA' : '#888'
                    }}>●</span> {c.name}
                  </div>
                ))}
                {hovered.clients.length > 4 && <div className="text-white/40 italic">+{hovered.clients.length - 4} more</div>}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] text-brand-gray">
        <span>Showing {visible.length} cities · {visibleTotal} clients</span>
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
