'use client';
import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const TIERS = [
  {
    tier: 'A-Tier',
    revenue: '$2.5M+ / year',
    color: 'bg-brand-yellow text-brand-black',
    icp: true,
    traits: [
      'Business owners who rely on their company',
      'Value time, transparency, and systems',
      'Value-based thinkers',
      'Best in market — high standards',
      'Systems already in place',
    ],
    desc: 'Our best clients. They understand marketing investment and trust experts.',
  },
  {
    tier: 'B-Tier',
    revenue: '$1M–$2.5M / year',
    color: 'bg-brand-black text-white',
    icp: true,
    traits: [
      'Managers of other people',
      'Company relies on them but they\'re growing',
      'Still need more systems',
      'Professional and ready to scale',
      'Growth-minded',
    ],
    desc: 'Great clients. Growing, professional, and receptive to our process.',
  },
  {
    tier: 'C-Tier',
    revenue: '$500K–$1M / year',
    color: 'bg-brand-gray-mid text-brand-black',
    icp: false,
    traits: [
      'Still doing the work themselves',
      'Smaller, less organized operations',
      'Not our target market',
    ],
    desc: 'Not our ICP. May struggle to handle increased lead volume.',
  },
  {
    tier: 'D-Tier',
    revenue: '$0–$500K / year',
    color: 'bg-red-100 text-red-800',
    icp: false,
    traits: [
      'One-person operations',
      'No capacity for volume',
      'Price-sensitive',
    ],
    desc: 'Avoid completely. Poor fit for our performance model.',
  },
];

export function S05_SalesProcess() {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  return (
    <SectionWrapper sectionId={5}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Sales Pipeline</div>
        <h2 className="text-xl font-black text-white mb-2">How We Acquire Clients</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Understanding the sales process helps you deliver better service. By the time a client reaches you, Mani&apos;s team has already qualified and closed them. Your job starts at the handoff.
        </p>
      </Card>

      {/* Sales flow */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Lead Acquisition Flow</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {[
            { label: 'B2B Meta Ads', owner: 'Michael' },
            { label: 'Outbound', owner: 'Sales team' },
            { label: 'Referrals', owner: 'Existing clients' },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="bg-white border border-brand-gray-mid rounded-lg px-3 py-2 text-center">
                <div className="font-bold text-xs">{step.label}</div>
                <div className="text-[10px] text-brand-gray">{step.owner}</div>
              </div>
              {i < 2 && <span className="text-brand-gray">→</span>}
            </React.Fragment>
          ))}
          <span className="text-brand-gray">→</span>
          <div className="bg-brand-yellow rounded-lg px-3 py-2 text-center">
            <div className="font-bold text-xs">Sales Call</div>
            <div className="text-[10px] text-brand-black/70">Mani&apos;s team</div>
          </div>
          <span className="text-brand-gray">→</span>
          <div className="bg-brand-black text-white rounded-lg px-3 py-2 text-center">
            <div className="font-bold text-xs">Handoff to You</div>
            <div className="text-[10px] text-white/50">Onboarding</div>
          </div>
        </div>
      </div>

      {/* A/B/C/D tiers */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The A, B, C, D Contractor Tiers</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {TIERS.map((t, i) => (
            <button
              key={t.tier}
              onClick={() => setActiveTier(activeTier === i ? null : i)}
              className={`p-3 rounded-xl text-left transition-all hover:scale-[1.01] ${t.color} ${
                activeTier === i ? 'ring-2 ring-brand-yellow ring-offset-1' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-black text-lg">{t.tier}</div>
                  <div className="text-xs opacity-70">{t.revenue}</div>
                </div>
                {t.icp ? (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-green-400 text-green-900">OUR ICP</span>
                ) : (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-200 text-red-700">AVOID</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {activeTier !== null && (
          <div className="bg-white rounded-xl border border-brand-gray-mid p-4 animate-fade-in">
            <div className="font-black text-base mb-1">{TIERS[activeTier].tier} — {TIERS[activeTier].revenue}</div>
            <p className="text-sm text-brand-gray mb-3">{TIERS[activeTier].desc}</p>
            <BulletList items={TIERS[activeTier].traits} check={TIERS[activeTier].icp} cross={!TIERS[activeTier].icp} />
          </div>
        )}
      </div>

      {/* ICP */}
      <Card yellow>
        <h3 className="font-black text-base mb-3">Ideal Client Profile (ICP)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BulletList check items={[
            '$1M+ annual revenue',
            'Established business (3+ years)',
            'Growth-minded owner/leadership',
            'Willing to invest ($3K+/month ad spend)',
            'Responsive and communicative',
          ]} />
          <BulletList check items={[
            'Trusts experts (not a micromanager)',
            'Established reputation in market',
            'Has capacity to handle increased volume',
            'Professional operations & systems',
            'Aligned on performance expectations',
          ]} />
        </div>
      </Card>

      <InfoBox type="warning" title="Important">
        You don&apos;t handle sales — that&apos;s Mani&apos;s team. But understanding the ICP helps you set expectations correctly during onboarding and flag clients who might be a poor fit for our model.
      </InfoBox>
    </SectionWrapper>
  );
}
