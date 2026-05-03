'use client';
import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';

const VERTICALS = [
  {
    name: 'Roofing',
    emoji: '🏠',
    market: '$50B+',
    marketPct: 85,
    avgJob: '$8K–$30K',
    salesCycle: '7–21 days',
    urgency: 'Medium',
    color: '#F5C800',
    bg: '#1A1400',
    share: '85%',
    notes: [
      'Insurance claims drive 40%+ of jobs',
      'Seasonal: Spring/Summer peak',
      'High-ticket, trust-driven purchase',
      'Price: $300–$1,000/square',
    ],
    keyRisk: 'Show rate drops in winter — set expectations early',
  },
  {
    name: 'HVAC',
    emoji: '❄️',
    market: '$100B+',
    marketPct: 60,
    avgJob: '$5K–$15K',
    salesCycle: 'Hours–Days',
    urgency: 'HIGH',
    color: '#4A90D9',
    bg: '#001020',
    share: '10%',
    notes: [
      'Emergency-driven — speed to lead < 5 min CRITICAL',
      'Year-round revenue potential',
      'Maintenance contracts = recurring for contractor',
      'Urgency creates higher intent',
    ],
    keyRisk: 'VAs must call instantly — 5+ min drops booking rate severely',
  },
  {
    name: 'Gutters',
    emoji: '🌧️',
    market: '$8B+',
    marketPct: 20,
    avgJob: '$1K–$5K',
    salesCycle: '1–7 days',
    urgency: 'Low',
    color: '#22C55E',
    bg: '#001A0A',
    share: '5%',
    notes: [
      'Volume business — lower ticket',
      'Often bundled with roofing/siding',
      'Need 2–3× leads vs roofing to match revenue',
      'Fast cycles, less complexity',
    ],
    keyRisk: 'Need volume to justify cost — watch CPB closely',
  },
];

const OBJECTIONS = [
  { obj: '"Facebook leads suck"', response: 'Agreed — without a qualification system. Ours filters to only interested, qualified homeowners.' },
  { obj: '"I tried ads before — didn\'t work"', response: 'Most agencies run ads. We run a full lead-to-booked-appointment system with VAs and qualification.' },
  { obj: '"Angi/HomeAdvisor didn\'t work"', response: 'Shared leads — 10 contractors calling the same person. Our leads are exclusive, pre-qualified.' },
];

const SLANG = [
  { term: 'Chuck-in-a-truck', icon: '🚛', def: 'Low-level contractor who underbids everyone. NOT our ICP.' },
  { term: 'Tire-kicker', icon: '👀', def: 'Lead with no urgency or money. Filtered out by our qualification survey.' },
  { term: 'Storm chaser', icon: '⛈️', def: 'Contractor who follows hail/storm damage to chase insurance claims. Often A/B-tier.' },
  { term: 'Retail job', icon: '💳', def: 'Customer pays full amount out of pocket. Highest-value for contractor.' },
  { term: 'Insurance job', icon: '📄', def: 'Insurance covers roof — customer pays only the deductible ($1–3K on a $20K roof).' },
  { term: 'Show rate', icon: '📅', def: 'Percentage of booked appointments where the homeowner actually shows up.' },
];

export function S02_ContractorIndustry() {
  const [activeV, setActiveV] = useState(0);

  return (
    <SectionWrapper sectionId={2}>

      {/* Revenue mix overview */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Our 3 Verticals — Revenue Mix</h3>
        <div className="space-y-2 mb-4">
          {VERTICALS.map((v) => (
            <div key={v.name} className="flex items-center gap-3">
              <div className="w-20 text-right text-xs font-black text-brand-gray flex-shrink-0">{v.emoji} {v.name}</div>
              <div className="flex-1 h-6 rounded-full bg-brand-gray-light overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center pl-3 text-xs font-black"
                  style={{ width: v.share, backgroundColor: v.color, color: v.name === 'Roofing' ? '#111' : '#fff' }}
                >
                  {v.share}
                </div>
              </div>
              <div className="text-xs text-brand-gray w-20 flex-shrink-0">{v.avgJob}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-brand-gray text-center">Bar width = agency revenue share · Right = avg job ticket</div>
      </div>

      {/* Vertical deep-dive tabs */}
      <div>
        <div className="flex gap-2 mb-3">
          {VERTICALS.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setActiveV(i)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                activeV === i ? 'text-white shadow-md' : 'bg-white border border-brand-gray-mid text-brand-gray hover:border-brand-black'
              }`}
              style={activeV === i ? { backgroundColor: v.color, color: v.name === 'Roofing' ? '#111' : '#fff' } : {}}
            >
              {v.emoji} {v.name}
            </button>
          ))}
        </div>

        {(() => {
          const v = VERTICALS[activeV];
          return (
            <div className="rounded-xl p-4" style={{ backgroundColor: v.bg, border: `1px solid ${v.color}44` }}>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Market Size', value: v.market },
                  { label: 'Avg Job', value: v.avgJob },
                  { label: 'Sales Cycle', value: v.salesCycle },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-black text-base" style={{ color: v.color }}>{s.value}</div>
                    <div className="text-[10px] text-white/70 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5 mb-3">
                {v.notes.map((n) => (
                  <div key={n} className="flex items-start gap-2 text-xs text-white/70">
                    <span style={{ color: v.color }} className="mt-0.5 flex-shrink-0">▸</span>
                    <span>{n}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: `${v.color}22`, borderLeft: `3px solid ${v.color}` }}>
                <span className="font-black text-white">Key risk: </span>
                <span className="text-white/60">{v.keyRisk}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Insurance vs Retail */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Job Types — Insurance vs Retail</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl p-4 bg-brand-black text-white">
            <div className="text-brand-yellow font-black text-sm mb-1">📄 Insurance Job</div>
            <div className="text-2xl font-black text-white mb-1">$20K</div>
            <div className="text-xs text-white/70 mb-3">Roof value</div>
            <div className="space-y-1 text-xs text-white/60">
              <div>Insurance pays: <span className="text-white font-bold">$17–19K</span></div>
              <div>Customer pays: <span className="text-white font-bold">$1–3K</span> (deductible)</div>
              <div className="mt-2 text-white/70">40%+ of roofing volume — adjuster approval adds time</div>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-brand-yellow">
            <div className="font-black text-sm mb-1">💳 Retail Job</div>
            <div className="text-2xl font-black mb-1">$20K</div>
            <div className="text-xs text-brand-black/70 mb-3">Roof value</div>
            <div className="space-y-1 text-xs text-brand-black/60">
              <div>Customer pays: <span className="font-bold text-brand-black">Full $20K</span></div>
              <div>No adjuster: <span className="font-bold text-brand-black">Faster close</span></div>
              <div className="mt-2 text-brand-black/70">Higher-value relationship — most referrals come from here</div>
            </div>
          </div>
        </div>
      </div>

      {/* Homeowner psychology */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Homeowner Psychology — Who Buys</h3>
        <div className="space-y-2">
          {[
            { tier: 'Upper Class', quotes: '2–3 quotes', priority: 'Quality & Trust', color: '#F5C800', bg: '#1A1400', note: 'Price matters less — credibility and reputation win.' },
            { tier: 'Middle Class', quotes: '3 quotes', priority: 'Best Value', color: '#4A90D9', bg: '#001020', note: 'Comparing carefully — social proof and reviews convert them.' },
            { tier: 'Lower Class', quotes: '5+ quotes', priority: 'Lowest Price', color: '#777', bg: '#111', note: 'Hardest to close — avoid targeting unless insurance driven.' },
          ].map((t) => (
            <div key={t.tier} className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: t.bg, border: `1px solid ${t.color}33` }}>
              <div className="w-2 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-black text-sm text-white">{t.tier}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${t.color}33`, color: t.color }}>
                    {t.quotes}
                  </span>
                  <span className="text-[10px] text-white/70">Priority: {t.priority}</span>
                </div>
                <div className="text-xs text-white/75">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
        <InfoBox type="tip" className="mt-3">
          Our clients (A/B-tier contractors) primarily serve upper and middle class homeowners — which is why trust, social proof, and speed matter more than price in our ad creative.
        </InfoBox>
      </div>

      {/* Contractor objections */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Contractor Objections — and Why We Win</h3>
        <div className="space-y-2">
          {OBJECTIONS.map((o) => (
            <div key={o.obj} className="rounded-xl overflow-hidden border border-brand-gray-mid">
              <div className="bg-red-50 px-3 py-2 text-sm text-red-700 font-bold flex items-center gap-2">
                <span>❌</span><span>{o.obj}</span>
              </div>
              <div className="bg-white px-3 py-2 text-sm text-brand-black flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span><span>{o.response}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry slang */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Industry Slang — Know the Language</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SLANG.map((s) => (
            <div key={s.term} className="bg-white rounded-xl border border-brand-gray-mid p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{s.icon}</span>
                <span className="font-black text-sm">{s.term}</span>
              </div>
              <p className="text-xs text-brand-gray leading-relaxed">{s.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success factors comparison */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">What Drives Success — by Vertical</h3>
        <div className="rounded-xl border border-brand-gray-mid overflow-hidden">
          <div className="grid grid-cols-4 bg-brand-black text-white text-xs font-black uppercase tracking-widest">
            <div className="p-3">Factor</div>
            <div className="p-3 text-center" style={{ color: '#F5C800' }}>Roofing</div>
            <div className="p-3 text-center" style={{ color: '#4A90D9' }}>HVAC</div>
            <div className="p-3 text-center" style={{ color: '#22C55E' }}>Gutters</div>
          </div>
          {[
            { factor: 'Speed to Lead', roofing: '★★★', hvac: '★★★★★', gutters: '★★★★' },
            { factor: 'Creative Quality', roofing: '★★★★★', hvac: '★★★', gutters: '★★★' },
            { factor: 'Lead Volume', roofing: '★★★', hvac: '★★★★', gutters: '★★★★★' },
            { factor: 'Nurture Length', roofing: '★★★★★', hvac: '★★', gutters: '★★' },
            { factor: 'Seasonality Risk', roofing: 'High', hvac: 'Low', gutters: 'Medium' },
          ].map((row, i) => (
            <div key={row.factor} className={`grid grid-cols-4 text-xs ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-light'}`}>
              <div className="p-3 font-bold text-brand-black">{row.factor}</div>
              <div className="p-3 text-center text-brand-gray">{row.roofing}</div>
              <div className="p-3 text-center text-brand-gray">{row.hvac}</div>
              <div className="p-3 text-center text-brand-gray">{row.gutters}</div>
            </div>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}
