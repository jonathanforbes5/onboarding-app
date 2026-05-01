'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, StatCard, InfoBox, TwoCol, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

export function S01_CompanyVision() {
  return (
    <SectionWrapper sectionId={1}>
      {/* Origin story */}
      <Card dark className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative">
          <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Our Story</div>
          <h2 className="text-2xl font-black text-white mb-3">From Side Hustle to Industry Leader</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Roof Ignite began when <span className="text-white font-bold">Mani and Oscar</span>, then just 15 years old,
            set out to help their families by using their skills to support local contractors. What started as a small side project
            quickly grew into a proven system for generating qualified leads and booked appointments for contractors across multiple industries.
          </p>
        </div>
      </Card>

      {/* Evolution */}
      <TwoCol
        leftTitle="Our Evolution"
        left={
          <Card border>
            <BulletList items={[
              'Founded as Roof Ignite (roofing-focused)',
              'Expanded to multi-niche contractor marketing',
              'Current verticals: Roofing, HVAC, Gutters',
              'Future: Additional contractor trades',
            ]} />
          </Card>
        }
        rightTitle="Why Expand?"
        right={
          <Card yellow>
            <BulletList items={[
              'Proven systems work across niches',
              'Diversification strengthens the business',
              'Larger total addressable market',
              'Same performance model, different industries',
            ]} />
          </Card>
        }
      />

      {/* Revenue targets */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Where We Are & Where We&apos;re Going</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Current Revenue" value="$3K" sub="Per Month" border />
          <StatCard label="Target Revenue" value="$1M" sub="By end of summer 2026" yellow />
        </div>
      </div>

      {/* Expandable details */}
      <div className="space-y-2">
        <ExpandableCard title="Current State Details" subtitle="Where the company is today">
          <ul className="space-y-2 text-sm">
            {[
              'Multiple contractor verticals (Roofing, HVAC, Gutters)',
              'Operations infrastructure built and proven',
              'Scalable acquisition systems in place',
              'Growing team of specialists',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-yellow mt-0.5">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ExpandableCard>

        <ExpandableCard title="Target State — The Mission" subtitle="What we're building toward" accent>
          <ul className="space-y-2 text-sm">
            {[
              '$1,000,000/month revenue target',
              'Aggressive scaling phase — every hire matters',
              'Focus on retention & performance at scale',
              'World-class operations team leading the charge',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-black font-black mt-0.5">→</span>
                <span className="font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </ExpandableCard>
      </div>

      {/* Retention principle */}
      <Card dark>
        <div className="text-center py-2">
          <div className="text-brand-yellow text-4xl font-black mb-2">RETENTION &gt; ACQUISITION</div>
          <p className="text-white/70 text-sm max-w-sm mx-auto mb-4">Every additional cycle you preserve compounds the agency&apos;s revenue.</p>
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-white font-black text-xl">$X</div>
              <div className="text-white/50 text-xs mt-1">Cycle 1 Value</div>
            </div>
            <div className="bg-brand-yellow rounded-xl p-3 text-center">
              <div className="text-brand-black font-black text-xl">10X</div>
              <div className="text-brand-black/70 text-xs mt-1">Cycle 10 Value</div>
            </div>
          </div>
        </div>
      </Card>

      <InfoBox type="tip" title="Your Role">
        You are joining during an aggressive growth phase. Your performance on retention is directly tied to the company&apos;s path to $1M/month. <strong>Your role is critical to this mission.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
