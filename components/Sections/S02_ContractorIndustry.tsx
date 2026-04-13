'use client';
import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList, Tag } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const VERTICALS = [
  {
    name: 'Roofing',
    emoji: '🏠',
    market: '$50B+',
    avgJob: '$8,000–$30,000',
    salesCycle: '7–21 days',
    highlights: [
      'Seasonal (Spring/Summer peak)',
      'Insurance claims drive 40%+ of business',
      'High-ticket, considered purchase',
      'Trust & reputation are everything',
      'Price: $300–$1,000/square',
    ],
    type: 'yellow' as const,
  },
  {
    name: 'HVAC',
    emoji: '❄️',
    market: '$100B+',
    avgJob: '$5,000–$15,000',
    salesCycle: 'Hours–Days',
    highlights: [
      'Mix of emergency + planned replacements',
      'Year-round business opportunity',
      'Maintenance contracts = recurring revenue',
      'Speed to lead CRITICAL (5 min response)',
      'Urgency-driven purchases',
    ],
    type: 'dark' as const,
  },
  {
    name: 'Gutters',
    emoji: '🌧️',
    market: '$8B+',
    avgJob: '$1,000–$5,000',
    salesCycle: '1–7 days',
    highlights: [
      'Lower ticket size — volume business',
      'Often bundled with roofing/siding',
      'Seasonal: Spring & Fall',
      'Fast sales cycles (less complexity)',
      'Need 2–3x leads vs roofing for profitability',
    ],
    type: 'border' as const,
  },
];

const SLANG = [
  { term: 'Chuck-in-a-truck', def: 'A low-level contractor who underbids everyone and competes solely on price. NOT our ICP.', icon: '🚛' },
  { term: 'Tire-kicker', def: 'A lead with no urgency, no buying intent, or no money. What we filter out through our qualification survey.', icon: '👀' },
  { term: 'Storm chaser', def: 'A contractor who follows weather patterns and hail/storm damage to chase insurance claims. Often B or A-tier clients.', icon: '⛈️' },
  { term: 'Retail job', def: 'Customer pays full amount out of pocket. Highest-value relationship for the contractor.', icon: '💳' },
  { term: 'Insurance job', def: 'Insurance covers the roof, customer pays only the deductible ($1–3K on a $20K roof).', icon: '📄' },
];

export function S02_ContractorIndustry() {
  const [activeVertical, setActiveVertical] = useState(0);

  return (
    <SectionWrapper sectionId={2}>

      {/* Vertical selector */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Our 3 Verticals</h3>
        <div className="flex gap-2 mb-4">
          {VERTICALS.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setActiveVertical(i)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                activeVertical === i
                  ? 'bg-brand-black text-white shadow-md scale-[1.02]'
                  : 'bg-white border border-brand-gray-mid text-brand-gray hover:border-brand-black'
              }`}
            >
              <span className="mr-1">{v.emoji}</span>
              {v.name}
            </button>
          ))}
        </div>

        {(() => {
          const v = VERTICALS[activeVertical];
          return (
            <Card dark className="animate-fade-in">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="text-center">
                  <div className="text-brand-yellow font-black text-xl">{v.market}</div>
                  <div className="text-white/50 text-xs">Market Size</div>
                </div>
                <div className="text-center">
                  <div className="text-brand-yellow font-black text-xl">{v.avgJob}</div>
                  <div className="text-white/50 text-xs">Avg Job Value</div>
                </div>
                <div className="text-center">
                  <div className="text-brand-yellow font-black text-xl">{v.salesCycle}</div>
                  <div className="text-white/50 text-xs">Sales Cycle</div>
                </div>
              </div>
              <BulletList items={v.highlights} className="[&_span]:text-white/80" />
            </Card>
          );
        })()}
      </div>

      {/* Homeowner psychology */}
      <ExpandableCard title="Homeowner Psychology (B2C)" subtitle="How buyers make decisions — helps shape messaging">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { tier: 'Upper Class', behavior: 'Get 2–3 quotes', choice: 'Best comfort, trust, reputation', priority: 'Quality > Price' },
            { tier: 'Middle Class', behavior: 'Get 3 quotes', choice: 'Best overall value', priority: 'Value-based' },
            { tier: 'Lower Class', behavior: 'Get 5+ quotes', choice: 'Cheapest option', priority: 'Price first' },
          ].map((t) => (
            <div key={t.tier} className="p-3 rounded-xl bg-brand-gray-light border border-brand-gray-mid">
              <div className="font-black text-sm mb-2">{t.tier}</div>
              <div className="text-xs space-y-1">
                <div><span className="text-brand-gray">Behavior:</span> {t.behavior}</div>
                <div><span className="text-brand-gray">Chooses:</span> {t.choice}</div>
                <div><span className="text-brand-gray">Priority:</span> <strong>{t.priority}</strong></div>
              </div>
            </div>
          ))}
        </div>
        <InfoBox type="tip" className="mt-3">
          Key insight: homeowners are making a major purchase with high anxiety. They need education, reassurance, and speed — especially in emergencies.
        </InfoBox>
      </ExpandableCard>

      {/* Contractor psychology */}
      <ExpandableCard title="Contractor Psychology (B2B)" subtitle="Understanding how our clients think about marketing">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">What They Think</h4>
            <div className="space-y-2">
              {['"Facebook leads suck"', '"Angi\'s List leads suck"', '"I\'ve tried marketing before and it didn\'t work"'].map((q) => (
                <div key={q} className="flex items-center gap-2 p-2 rounded-lg bg-red-50 text-sm text-red-700">
                  <span>❌</span><span>{q}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Our Positioning</h4>
            <BulletList check items={[
              'Extensive social proof',
              'Performance-based model (low risk)',
              'We only work with established businesses',
              'Position of authority — trust our process',
            ]} />
          </div>
        </div>
      </ExpandableCard>

      {/* Industry slang */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Industry Slang Glossary</h3>
        <div className="space-y-2">
          {SLANG.map((s) => (
            <ExpandableCard key={s.term} title={s.term} subtitle="Click to see definition" icon={<span>{s.icon}</span>}>
              <p className="text-sm text-brand-gray">{s.def}</p>
            </ExpandableCard>
          ))}
        </div>
      </div>

      {/* Success factors by niche */}
      <Card yellow>
        <h3 className="font-black text-sm uppercase tracking-widest mb-3">Niche-Specific Success Factors</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { niche: 'Roofing', factors: ['Creative quality', 'Longer nurture', 'Price justification'] },
            { niche: 'HVAC', factors: ['Speed to lead', 'Emergency positioning', 'Seasonal adjustments'] },
            { niche: 'Gutters', factors: ['Volume focus', 'Fast qualification', 'Efficient ops'] },
          ].map((n) => (
            <div key={n.niche} className="bg-black/10 rounded-xl p-3">
              <div className="font-black text-xs mb-2">{n.niche}</div>
              {n.factors.map((f) => (
                <div key={f} className="text-xs flex items-start gap-1 mb-1">
                  <span className="opacity-50">•</span><span>{f}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </SectionWrapper>
  );
}
