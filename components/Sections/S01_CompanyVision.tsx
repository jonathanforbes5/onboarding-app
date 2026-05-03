'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';

const NICHES = [
  {
    name: 'Roofing',
    pct: 85,
    ticket: '$8K–$25K',
    note: 'Primary niche. Insurance claims drive 40%+ of jobs.',
    color: '#F5C800',
    bg: '#1A1400',
  },
  {
    name: 'HVAC',
    pct: 10,
    ticket: '$3K–$12K',
    note: 'Emergency-driven. Speed to lead is critical (< 5 min).',
    color: '#4A90D9',
    bg: '#001020',
  },
  {
    name: 'Gutters',
    pct: 5,
    ticket: '$1K–$5K',
    note: 'Needs 2–3× more leads than roofing to be equally profitable.',
    color: '#22C55E',
    bg: '#001A0A',
  },
];

export function S01_CompanyVision() {
  return (
    <SectionWrapper sectionId={1}>

      {/* Origin story */}
      <Card dark className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="relative">
          <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-3">The Origin Story</div>
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">👥</div>
            <div>
              <h2 className="text-2xl font-black text-white mb-2">Built from the ground up.</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Mani and Oscar co-founded Roof Ignite to help local contractors grow through paid advertising.
                The agency scaled from a roofing-focused operation to a multi-niche model covering roofing, HVAC, and gutters —
                now running at <strong className="text-brand-yellow">$300K/month with 5 active pods</strong> in aggressive growth mode.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-brand-gray-mid p-4 text-center bg-white">
          <div className="text-xs font-black text-brand-gray uppercase tracking-widest mb-2">Current Revenue</div>
          <div className="text-3xl font-black text-brand-black">$300K</div>
          <div className="text-xs text-brand-gray mt-1">per month</div>
        </div>
        <div className="rounded-xl bg-brand-yellow p-4 text-center">
          <div className="text-xs font-black text-brand-black/60 uppercase tracking-widest mb-2">Active Growth</div>
          <div className="text-3xl font-black text-brand-black">5 Pods</div>
          <div className="text-xs text-brand-black/70 mt-1">scaling simultaneously</div>
        </div>
      </div>

      {/* Niches */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 3 Verticals — Revenue Mix</h3>
        <div className="space-y-3">
          {NICHES.map((n) => (
            <div key={n.name} className="rounded-xl p-4" style={{ backgroundColor: n.bg, border: `1px solid ${n.color}33` }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-black text-sm" style={{ color: n.color }}>{n.name}</span>
                  <span className="ml-2 text-xs text-white/70">Avg ticket: {n.ticket}</span>
                </div>
                <span className="font-black text-sm text-white">{n.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 mb-2">
                <div className="h-full rounded-full transition-all" style={{ width: `${n.pct}%`, backgroundColor: n.color }} />
              </div>
              <p className="text-xs text-white/75">{n.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retention principle */}
      <Card dark>
        <div className="text-center py-2">
          <div className="text-brand-yellow text-3xl font-black mb-2">RETENTION &gt; ACQUISITION</div>
          <p className="text-white/80 text-sm max-w-sm mx-auto mb-4">
            Acquiring a client costs thousands. Retaining one costs time and care. Every cycle you preserve compounds directly into your commission.
          </p>
          <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto">
            {[1, 2, 3, 5, 10].map((cycle) => (
              <div key={cycle} className={`rounded-lg p-2 text-center ${cycle === 10 ? 'bg-brand-yellow' : cycle >= 5 ? 'bg-white/20' : 'bg-white/10'}`}>
                <div className={`font-black text-xs ${cycle === 10 ? 'text-brand-black' : 'text-white'}`}>Cycle {cycle}</div>
                <div className={`font-black text-sm mt-0.5 ${cycle === 10 ? 'text-brand-black' : 'text-brand-yellow'}`}>{cycle}x</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <InfoBox type="tip" title="Why Your Role Is Critical">
        You are joining during an aggressive scaling phase. 5 pods, all growing simultaneously — every client you retain compounds the agency&apos;s revenue and your own compensation. <strong>Retention is the mission.</strong>
      </InfoBox>

    </SectionWrapper>
  );
}
