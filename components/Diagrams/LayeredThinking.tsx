'use client';
import React, { useState } from 'react';

interface LayerMetric {
  name: string;
  desc: string;
  drillsTo?: string[];
}

const LAYER_1: LayerMetric[] = [
  { name: 'Bookings vs goal', desc: 'Are we on pace to hit the cycle target?' },
  { name: 'Cost per appointment', desc: 'Is it within the 80% margin variance vs contracted goal?' },
  { name: 'Spend pacing', desc: 'Is daily spend tracking to plan?' },
  { name: 'Client sentiment', desc: 'Are they happy? Communicating? Showing up to calls?' },
  { name: 'Sales conversion (theirs)', desc: 'Are appointments turning into jobs on their end?' },
];

const LAYER_2: LayerMetric[] = [
  { name: 'Cost per lead (CPL)', desc: 'Driven by creative + targeting + offer.' },
  { name: 'Link CTR', desc: 'Driven by creative quality + ad copy + hook.' },
  { name: 'Link CPC', desc: 'Driven by CTR vs CPM together.' },
  { name: 'CPM', desc: 'Market dynamic + audience competition.' },
  { name: 'Frequency', desc: 'Creative fatigue indicator. >2.5 = refresh due.' },
  { name: 'Survey conversion', desc: 'Driven by survey length + landing page + offer clarity.' },
  { name: 'Lead-to-book rate', desc: 'Driven by VA speed + script + lead quality.' },
  { name: 'Show rate', desc: 'Driven by reminders + qualification + client follow-up.' },
];

const LAYER_3: LayerMetric[] = [
  { name: 'Survey question count', desc: '7q vs 4q changes conversion. Test it.' },
  { name: 'Landing page headline / hero', desc: 'Match-message between ad and LP.' },
  { name: 'Creative asset quality', desc: 'Organic vs Ken-generated, video vs static, format.' },
  { name: 'Phone number / CNAME / SHAKEN', desc: 'Trust signals — affects lead pickup rate.' },
  { name: 'VA double-call policy', desc: 'Single call vs double call within 2 min.' },
  { name: 'Reminder cadence', desc: 'SMS + email at 24h, 1h, day-of.' },
  { name: 'Audience exclusions', desc: 'Out-of-area zips, app placements, broad vs lookalike.' },
];

export function LayeredThinking() {
  const [active, setActive] = useState<1 | 2 | 3>(1);

  const layer = active === 1 ? LAYER_1 : active === 2 ? LAYER_2 : LAYER_3;
  const labels = {
    1: { color: '#22C55E', name: 'Layer 1 — Outcomes', sub: 'What you check FIRST. If green, stop.' },
    2: { color: '#F59E0B', name: 'Layer 2 — Drivers',  sub: 'Drill here when a Layer 1 metric is red.' },
    3: { color: '#9F1239', name: 'Layer 3 — Levers',   sub: 'The actual things you change to fix Layer 2.' },
  } as const;

  return (
    <div className="space-y-3">
      {/* Pyramid */}
      <div className="relative">
        <button
          onClick={() => setActive(1)}
          className={`block w-full mx-auto rounded-t-xl py-3 text-center transition-all ${active === 1 ? 'ring-2 ring-offset-1 ring-brand-yellow' : ''}`}
          style={{ backgroundColor: labels[1].color, color: '#fff', maxWidth: '100%' }}
        >
          <div className="font-black text-base">LAYER 1 — Outcomes</div>
          <div className="text-xs opacity-80">Bookings, CPA, spend pacing, client happy</div>
        </button>
        <button
          onClick={() => setActive(2)}
          className={`block mx-auto py-2.5 text-center transition-all ${active === 2 ? 'ring-2 ring-offset-1 ring-brand-yellow' : ''}`}
          style={{ backgroundColor: labels[2].color, color: '#fff', width: '85%' }}
        >
          <div className="font-black text-sm">LAYER 2 — Drivers</div>
          <div className="text-[11px] opacity-80">CPL, CTR, CPC, CPM, freq, survey, book rate</div>
        </button>
        <button
          onClick={() => setActive(3)}
          className={`block mx-auto rounded-b-xl py-2 text-center transition-all ${active === 3 ? 'ring-2 ring-offset-1 ring-brand-yellow' : ''}`}
          style={{ backgroundColor: labels[3].color, color: '#fff', width: '70%' }}
        >
          <div className="font-black text-xs">LAYER 3 — Levers</div>
          <div className="text-[10px] opacity-80">The actual thing you change</div>
        </button>
      </div>

      {/* Active layer detail */}
      <div className="rounded-xl border-2 p-3" style={{ borderColor: labels[active].color }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: labels[active].color, color: '#fff' }}>
            {labels[active].name}
          </span>
          <span className="text-xs text-brand-gray">{labels[active].sub}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-1.5">
          {layer.map((m) => (
            <div key={m.name} className="bg-white rounded-lg border border-brand-gray-mid px-2.5 py-1.5">
              <div className="font-black text-xs text-brand-black">{m.name}</div>
              <div className="text-[11px] text-brand-gray mt-0.5">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-brand-black text-white p-3">
        <div className="text-xs font-black uppercase tracking-widest text-brand-yellow mb-1.5">The flow</div>
        <div className="text-xs leading-relaxed">
          Look at <strong>Layer 1</strong> first. If everything is green, monitor and move on. If a Layer 1 metric is red,
          drop into <strong>Layer 2</strong> for THAT specific metric only — don&apos;t boil the ocean. Pick the biggest, easiest-to-solve
          driver and reach into <strong>Layer 3</strong> to actually pull the lever. Verify the Layer 1 metric improves. Repeat.
        </div>
      </div>
    </div>
  );
}
