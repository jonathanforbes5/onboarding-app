'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';

const TIERS = [
  {
    tier: 'A',
    revenue: '$2.5M+ / year',
    label: 'IDEAL',
    icp: true,
    color: '#F5C800',
    bg: '#1A1400',
    traits: ['Value time and systems', 'Trust experts, don\'t micromanage', 'High standards, high capacity', 'Value-based buyers'],
    profile: 'Multi-crew roofing company, 10+ years in market, GM or office manager in place.',
  },
  {
    tier: 'B',
    revenue: '$1M–$2.5M / year',
    label: 'STRONG FIT',
    icp: true,
    color: '#4A90D9',
    bg: '#001020',
    traits: ['Growth-minded owner', 'Starting to build systems', 'Professional, receptive', 'Ready to delegate'],
    profile: 'Owner-operator scaling up, 3–5 crews, trying to get out of the field.',
  },
  {
    tier: 'C',
    revenue: '$500K–$1M / year',
    label: 'BORDERLINE',
    icp: false,
    color: '#888',
    bg: '#111',
    traits: ['Still doing the work', 'Less organized ops', 'May struggle with volume', 'Not growth-focused yet'],
    profile: 'Owner still swings hammers, 1–2 crews. May not have capacity for our leads.',
  },
  {
    tier: 'D',
    revenue: 'Under $500K / year',
    label: 'AVOID',
    icp: false,
    color: '#EF4444',
    bg: '#1A0000',
    traits: ['One-person operation', 'Price-sensitive', 'Can\'t handle lead volume', 'Chuck-in-a-truck'],
    profile: 'Solo contractor, no admin, no systems. Will blame the leads instead of the process.',
  },
];

const ICP_CHECKS = [
  { check: '$1M+ annual revenue', icon: '💰' },
  { check: 'Established business (3+ years)', icon: '📅' },
  { check: 'Growth-minded owner / GM', icon: '📈' },
  { check: 'Willing to invest $3K+/mo in ad spend', icon: '💳' },
  { check: 'Responsive and communicative', icon: '📱' },
  { check: 'Trusts the process, not a micromanager', icon: '🤝' },
  { check: 'Capacity to handle increased lead volume', icon: '🏗️' },
  { check: 'Professional systems already in place', icon: '⚙️' },
];

const RED_FLAGS = [
  { flag: 'Asks "how many leads?" instead of "how many booked jobs?"', why: 'Doesn\'t understand performance model — will churn early' },
  { flag: 'Wants to approve every lead individually', why: 'Micromanager — will create friction with VAs and process' },
  { flag: 'Under $500K revenue', why: 'Won\'t have capacity to close our volume' },
  { flag: '"I\'ve fired 3 agencies before"', why: 'May be the problem — investigate before onboarding' },
  { flag: 'Slow to respond during sales process', why: 'Will be slow to respond when you need info during setup' },
];

export function S05_SalesProcess() {
  return (
    <SectionWrapper sectionId={5}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Client Acquisition</div>
        <h2 className="text-xl font-black text-white mb-2">The Sales Handoff</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          By the time a client reaches you, Mani&apos;s team has already qualified and closed them. Understanding how that works helps you set expectations, handle early friction, and spot clients who might be a poor fit.
        </p>
      </Card>

      {/* Lead acquisition funnel */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">How Clients Get to You</h3>
        <div className="space-y-1">
          {[
            { step: 'B2B Meta Ads', owner: 'Michael Dallara', detail: 'Targeted ads to contractor business owners', color: '#F5C800' },
            { step: 'Outbound / Referrals', owner: 'Sales team', detail: 'Cold outreach + referrals from existing clients', color: '#4A90D9' },
            { step: 'Sales Call', owner: 'Mani\'s team', detail: 'Qualify, pitch, close — Bronson, Krisz, John, AJ', color: '#F5C800' },
            { step: 'Handoff to You', owner: 'You', detail: 'Onboarding begins — setup fee collected, build starts', color: '#22C55E' },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ backgroundColor: s.color, color: '#111' }}
              >{i + 1}</div>
              <div className="flex-1 bg-white rounded-xl border border-brand-gray-mid px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{s.step}</span>
                  <span className="text-[10px] text-brand-gray">{s.owner}</span>
                </div>
                <div className="text-xs text-brand-gray/70 mt-0.5">{s.detail}</div>
              </div>
              {i < 3 && <div className="text-brand-gray/30 text-lg w-4 text-center">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* A/B/C/D Tier grid — all visible at once */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The A–D Contractor Tiers</h3>
        <div className="space-y-2">
          {TIERS.map((t) => (
            <div key={t.tier} className="rounded-xl overflow-hidden" style={{ backgroundColor: t.bg, border: `1px solid ${t.color}33` }}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div
                  className="w-10 h-10 rounded-xl font-black text-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: t.color, color: '#111' }}
                >{t.tier}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-white">{t.revenue}</span>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded"
                      style={{ backgroundColor: t.icp ? `${t.color}33` : '#3330', color: t.icp ? t.color : '#EF4444' }}
                    >{t.label}</span>
                  </div>
                  <div className="text-xs text-white/40 mt-0.5 italic">{t.profile}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 px-4 pb-3">
                {t.traits.map((trait) => (
                  <div key={trait} className="flex items-start gap-1.5 text-xs text-white/60">
                    <span style={{ color: t.icp ? t.color : '#EF4444' }} className="flex-shrink-0 mt-0.5">{t.icp ? '▸' : '✕'}</span>
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ICP Checklist */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Ideal Client Profile — The 8 Criteria</h3>
        <div className="grid grid-cols-2 gap-2">
          {ICP_CHECKS.map((c) => (
            <div key={c.check} className="flex items-center gap-2 bg-white rounded-xl border border-brand-gray-mid px-3 py-2">
              <span className="text-base flex-shrink-0">{c.icon}</span>
              <span className="text-xs font-bold text-brand-black">{c.check}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Red flags at handoff */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Red Flags at Handoff — Know What to Watch For</h3>
        <div className="space-y-2">
          {RED_FLAGS.map((r) => (
            <div key={r.flag} className="rounded-xl overflow-hidden border border-red-100">
              <div className="bg-red-50 px-3 py-2 text-xs font-bold text-red-700 flex items-start gap-2">
                <span className="flex-shrink-0">⚑</span><span>{r.flag}</span>
              </div>
              <div className="bg-white px-3 py-1.5 text-xs text-brand-gray">{r.why}</div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="warning" title="You Don&apos;t Handle Sales">
        That&apos;s Mani&apos;s team. But understanding the ICP means you can set correct expectations during onboarding, flag poor-fit clients early, and avoid building for accounts that will churn in cycle 1.
      </InfoBox>
    </SectionWrapper>
  );
}
