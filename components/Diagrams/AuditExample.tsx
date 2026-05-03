'use client';
import React, { useState } from 'react';

interface AuditCase {
  client: string;
  status: 'green' | 'orange' | 'red';
  layer1: { label: string; value: string; verdict: 'good' | 'bad' }[];
  layer2: { metric: string; value: string; vsGoal: string; verdict: 'good' | 'bad' }[];
  diagnosis: string;
  action: string;
  takeaway: string;
}

const CASES: AuditCase[] = [
  {
    client: 'Outstanding Roofing — ON TRACK',
    status: 'green',
    layer1: [
      { label: 'Bookings', value: '21 / 16 (Est. 30)', verdict: 'good' },
      { label: 'CPA',      value: 'CPL $11.20 vs $175 goal',  verdict: 'good' },
      { label: 'Pacing',   value: 'Day 20/29, +9.97 ahead',   verdict: 'good' },
    ],
    layer2: [],
    diagnosis: 'All Layer 1 metrics green. No need to drill into Layer 2.',
    action: 'Monitor only. Don\'t over-touch a winning account.',
    takeaway: 'Layer 1 green = stop. Spend your energy where it actually moves the needle.',
  },
  {
    client: 'U.S. Shingle Palm Beach — NEEDS ATTENTION',
    status: 'red',
    layer1: [
      { label: 'Bookings',     value: '19 / 40 (Est. 23)', verdict: 'bad' },
      { label: 'CPA',          value: '$338 vs $255 goal', verdict: 'bad' },
      { label: 'Pacing',       value: 'Day 24/29, –14 behind', verdict: 'bad' },
    ],
    layer2: [
      { metric: 'CPM',         value: '$73.03',    vsGoal: 'High (FL market dynamic)', verdict: 'bad' },
      { metric: 'Link CPC',    value: '$9.95',     vsGoal: 'Way over benchmark',       verdict: 'bad' },
      { metric: 'Link CTR',    value: '0.73%',     vsGoal: 'Under',                    verdict: 'bad' },
      { metric: 'Booking rate (L7D)', value: '75%', vsGoal: 'Strong',                  verdict: 'good' },
      { metric: 'Frequency',   value: '1.93',      vsGoal: 'Healthy',                  verdict: 'good' },
    ],
    diagnosis: 'Layer 1 red on bookings AND CPA. Layer 2 shows: booking rate is FINE (75%), but volume is the constraint — CPM and CPC are too high so we can\'t generate enough leads. Front-end ad cost is the bottleneck, not the funnel.',
    action: 'Layer 3 lever: creative refresh. CPC trending up rapidly = fatigue. Don\'t touch the funnel — fix the ad.',
    takeaway: 'When Layer 2 has both green and red, attack the red. Booking rate green told you the LP/survey/VA were fine.',
  },
  {
    client: 'Klaus Larsen Hudson Valley — RECOVERING',
    status: 'orange',
    layer1: [
      { label: 'Bookings',  value: '32 / 27 (Est. 33)', verdict: 'good' },
      { label: 'CPA',       value: '$358 vs $435 goal',  verdict: 'good' },
      { label: 'Pacing',    value: '+5.57 ahead',        verdict: 'good' },
    ],
    layer2: [
      { metric: 'Frequency', value: '3.24', vsGoal: 'OVER 2.5 = fatigue', verdict: 'bad' },
      { metric: 'Link CTR',  value: '0.57%', vsGoal: 'Below',              verdict: 'bad' },
      { metric: 'Link CPC',  value: '$5.14', vsGoal: 'High',               verdict: 'bad' },
    ],
    diagnosis: 'Layer 1 looks fine (we\'re hitting goal) but Layer 2 already flags fatigue. This is the EARLY-WARNING zone — Layer 1 will go red next cycle if nothing changes.',
    action: 'Layer 3 lever: 10 new creatives approved + YouTube channel unlocked for video sourcing. Ship for Cycle 7.',
    takeaway: 'Layer 1 green doesn\'t mean ignore Layer 2 forever. Watch Layer 2 trends to PREDICT Layer 1 problems before they hit.',
  },
];

const BADGE: Record<AuditCase['status'], { bg: string; fg: string; label: string }> = {
  green:  { bg: '#22C55E', fg: '#fff', label: 'ON TRACK' },
  orange: { bg: '#F59E0B', fg: '#000', label: 'EARLY WARNING' },
  red:    { bg: '#EF4444', fg: '#fff', label: 'NEEDS ATTENTION' },
};

export function AuditExample() {
  const [active, setActive] = useState(0);
  const c = CASES[active];
  const badge = BADGE[c.status];

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CASES.map((cs, i) => (
          <button
            key={cs.client}
            onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              i === active ? 'bg-brand-black text-brand-yellow' : 'bg-brand-gray-light text-brand-gray hover:bg-brand-gray-mid'
            }`}
          >
            {cs.client.split('—')[0].trim()}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: badge.bg, color: badge.fg }}>
          {badge.label}
        </span>
        <span className="font-black text-sm">{c.client.split('—')[0].trim()}</span>
      </div>

      {/* Layer 1 grid */}
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1.5">Layer 1 — Outcomes</div>
        <div className="grid grid-cols-3 gap-1.5">
          {c.layer1.map((l) => (
            <div
              key={l.label}
              className="rounded-lg border px-2.5 py-1.5"
              style={{ borderColor: l.verdict === 'good' ? '#22C55E' : '#EF4444', backgroundColor: l.verdict === 'good' ? '#F0FDF4' : '#FEF2F2' }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-gray">{l.label}</div>
              <div className="font-black text-xs text-brand-black mt-0.5">{l.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 2 only if drilled */}
      {c.layer2.length > 0 && (
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1.5">Layer 2 — Drilling into the red</div>
          <div className="space-y-1">
            {c.layer2.map((l) => (
              <div
                key={l.metric}
                className="flex items-center justify-between rounded-lg border px-2.5 py-1.5"
                style={{ borderColor: l.verdict === 'good' ? '#22C55E' : '#EF4444', backgroundColor: l.verdict === 'good' ? '#F0FDF4' : '#FEF2F2' }}
              >
                <div className="font-black text-xs text-brand-black">{l.metric}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold">{l.value}</span>
                  <span className="text-brand-gray">·</span>
                  <span className="text-brand-gray text-[11px]">{l.vsGoal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-white border border-brand-gray-mid p-3 space-y-2">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Diagnosis</div>
          <div className="text-xs text-brand-black mt-0.5">{c.diagnosis}</div>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Action (Layer 3 lever)</div>
          <div className="text-xs text-brand-black mt-0.5">{c.action}</div>
        </div>
        <div className="rounded-lg bg-brand-yellow px-2.5 py-1.5">
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60">Takeaway</div>
          <div className="text-xs text-brand-black font-bold mt-0.5">{c.takeaway}</div>
        </div>
      </div>

      <p className="text-[11px] text-brand-gray italic">
        Source: real audit report posted by Gianmarco in #ops-manager-discussion. Names left as-is.
      </p>
    </div>
  );
}
