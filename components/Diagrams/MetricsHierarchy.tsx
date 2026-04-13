'use client';
import React, { useState } from 'react';

interface Layer1Item {
  metric: string;
  desc: string;
  icon: string;
}

interface Layer2Item {
  metric: string;
  desc: string;
  icon: string;
  fix: string;
}

const LAYER1: Layer1Item[] = [
  { metric: 'Total Booked Appointments', desc: 'The ultimate output — how many qualified appointments were booked this cycle', icon: '📅' },
  { metric: 'Target Achievement %', desc: 'Did we hit the agreed appointment target? This determines billing.', icon: '🎯' },
  { metric: 'Cost Per Booked Appointment', desc: 'Total ad spend ÷ appointments booked. The core efficiency metric.', icon: '💰' },
  { metric: 'Appointment Volume', desc: 'Raw quantity of booked appointments in the cycle period', icon: '📊' },
];

const LAYER2: Layer2Item[] = [
  { metric: 'Click-Through Rate (CTR)', desc: 'Percentage of people who clicked the ad. Indicates creative relevance.', icon: '👆', fix: 'Low CTR = refresh creative or test new hooks' },
  { metric: 'Cost Per Link Click (CPLC)', desc: 'How much each click costs. Influenced by CTR and competition.', icon: '🖱️', fix: 'High CPLC = improve CTR or adjust targeting' },
  { metric: 'Lead Conversion Rate', desc: 'Survey completions ÷ landing page visitors. Measures funnel quality.', icon: '📋', fix: 'Low rate = simplify survey, improve landing page' },
  { metric: 'VA Booking Rate', desc: 'Appointments booked ÷ leads contacted by VA. Measures VA performance.', icon: '📞', fix: 'Low rate = retrain VAs, review scripts' },
  { metric: 'Show Rate', desc: 'Appointments that actually show up ÷ booked. Affects client revenue.', icon: '✅', fix: 'Low rate = improve reminder automations' },
  { metric: 'Lead Quality Score', desc: 'Proportion of leads that meet qualification criteria from the survey.', icon: '⭐', fix: 'Low quality = tighten targeting, add survey questions' },
];

export function MetricsHierarchy() {
  const [selected, setSelected] = useState<{ layer: number; idx: number } | null>(null);

  const sel: Layer1Item | Layer2Item | null = selected
    ? selected.layer === 1
      ? LAYER1[selected.idx]
      : LAYER2[selected.idx]
    : null;

  return (
    <div className="space-y-4">
      {/* Layer 1 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-yellow text-brand-black font-black text-sm flex items-center justify-center">L1</div>
          <div>
            <div className="font-black text-sm">LAYER 1 — Business Outcomes</div>
            <div className="text-xs text-brand-gray">Check these first. If good, stop here.</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {LAYER1.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected?.layer === 1 && selected.idx === i ? null : { layer: 1, idx: i })}
              className={`p-3 rounded-xl text-left border-2 transition-all hover:scale-[1.01] ${
                selected?.layer === 1 && selected.idx === i
                  ? 'border-brand-yellow bg-brand-yellow'
                  : 'border-brand-yellow/30 bg-brand-yellow-light hover:border-brand-yellow'
              }`}
            >
              <div className="text-lg mb-1">{m.icon}</div>
              <div className="font-bold text-xs text-brand-black leading-tight">{m.metric}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t-2 border-dashed border-brand-gray-mid" />
        <div className="text-xs text-brand-gray font-bold px-2">DIG DEEPER ONLY WHEN LAYER 1 IS POOR</div>
        <div className="flex-1 border-t-2 border-dashed border-brand-gray-mid" />
      </div>

      {/* Layer 2 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-black text-white font-black text-sm flex items-center justify-center">L2</div>
          <div>
            <div className="font-black text-sm">LAYER 2 — Diagnostic Metrics</div>
            <div className="text-xs text-brand-gray">Use to find the root cause of Layer 1 problems.</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {LAYER2.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected?.layer === 2 && selected.idx === i ? null : { layer: 2, idx: i })}
              className={`p-3 rounded-xl text-left border-2 transition-all hover:scale-[1.01] ${
                selected?.layer === 2 && selected.idx === i
                  ? 'border-brand-black bg-brand-black text-white'
                  : 'border-brand-gray-mid bg-white hover:border-brand-black'
              }`}
            >
              <div className="text-base mb-1">{m.icon}</div>
              <div className="font-bold text-xs leading-tight">{m.metric}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {sel && (
        <div className={`rounded-xl p-4 animate-fade-in ${
          selected?.layer === 1 ? 'bg-brand-yellow text-brand-black' : 'bg-brand-black text-white'
        }`}>
          <div className="font-black mb-1">{sel.metric}</div>
          <div className="text-sm opacity-80 mb-2">{sel.desc}</div>
          {'fix' in sel && (sel as Layer2Item).fix && (
            <div className={`text-xs px-3 py-2 rounded-lg ${selected?.layer === 2 ? 'bg-white/20' : 'bg-black/10'}`}>
              <span className="font-bold">If low: </span>{(sel as Layer2Item).fix}
            </div>
          )}
        </div>
      )}
      <p className="text-xs text-brand-gray text-center">Click any metric for details</p>
    </div>
  );
}
