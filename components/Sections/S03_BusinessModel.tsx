'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { CycleModel } from '@/components/Diagrams/CycleModel';

export function S03_BusinessModel() {
  return (
    <SectionWrapper sectionId={3}>

      {/* ===== HERO: COMP STRUCTURE ===== */}
      <div className="rounded-2xl bg-brand-black overflow-hidden">
        <div className="bg-brand-yellow px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <div>
            <div className="font-black text-brand-black text-base uppercase tracking-wide">Your Compensation Structure</div>
            <div className="text-brand-black/60 text-xs">Presented by Jonathan — directly to all pod managers</div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Base', value: 'Fixed', sub: 'Monthly rate for your role', icon: '📌', color: '#555' },
              { label: 'Cycle Bonus', value: 'Per cycle', sub: 'Earned each successful 28-day delivery', icon: '🔄', color: '#F5C800' },
              { label: 'Compounding', value: 'Stacks over time', sub: 'Retention across cycles builds earnings', icon: '📈', color: '#22C55E' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-black text-sm" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-white/50 mt-1">{s.label}</div>
                <div className="text-[10px] text-white/30 mt-0.5 leading-tight">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <div className="text-white/60 text-xs font-black uppercase tracking-widest mb-3">How Earnings Compound</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
              {[
                { cycle: 1, h: 25 },
                { cycle: 2, h: 35 },
                { cycle: 3, h: 48 },
                { cycle: 4, h: 58 },
                { cycle: 5, h: 68 },
                { cycle: 6, h: 76 },
                { cycle: 10, h: 100 },
              ].map((c) => (
                <div key={c.cycle} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: '3px 3px 0 0',
                      height: `${Math.round(c.h * 0.72)}px`,
                      backgroundColor: c.cycle === 10 ? '#F5C800' : `rgba(245,200,0,${0.2 + c.h / 200})`,
                      transition: 'height 0.5s',
                    }}
                  />
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>C{c.cycle}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-white/30 text-center">Each retained cycle multiplies total earnings — retention IS the strategy</div>
          </div>

          <a
            href="https://docs.google.com/document/d/1H5NYHSFK4PBrSj259_d7ijWuY5Q9SST7DNeFQWqK0Lg/edit?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-brand-yellow rounded-xl px-4 py-3 hover:bg-yellow-400 transition-colors group"
          >
            <span className="text-lg">📄</span>
            <div className="flex-1">
              <div className="font-black text-sm text-brand-black">Full Compensation Structure Doc</div>
              <div className="text-xs text-brand-black/60">Complete breakdown — base, bonuses, cycle earnings</div>
            </div>
            <span className="text-brand-black/40 group-hover:text-brand-black text-sm">↗</span>
          </a>

          <InfoBox type="info" className="mt-3">
            The <strong>April 30 Onboarding &amp; Comp Structure</strong> recording covers this with Jonathan, Cole, and Tyler — check the Recordings tab.
          </InfoBox>
        </div>
      </div>

      {/* The Core Model */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The Core Model</div>
        <h2 className="text-xl font-black text-white mb-3">28-Day Performance Cycle</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Clients pay <strong className="text-white">only when targets are hit</strong> — qualified booked appointments.
          Each cycle is 28 days: we run ads, qualify leads, book appointments, and bill on delivery.
        </p>
      </Card>

      {/* 28-Day Cycle Diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 28-Day Cycle Model</h3>
        <Card border>
          <CycleModel />
        </Card>
      </div>

      {/* Billing outcomes */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Billing Outcomes — 3 Scenarios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Hit Target', icon: '✅', result: 'Bill client + renew next cycle', color: 'bg-green-50 border-green-300', text: 'text-green-800' },
            { label: '80% Rule', icon: '🟡', result: 'Partial credit — bill at margin', color: 'bg-yellow-50 border-yellow-300', text: 'text-yellow-800' },
            { label: 'Miss Target', icon: '🔴', result: 'Optimize + extend cycle, no bill', color: 'bg-red-50 border-red-300', text: 'text-red-800' },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`font-black text-sm mb-1 ${s.text}`}>{s.label}</div>
              <div className={`text-xs ${s.text} opacity-80`}>{s.result}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup fee */}
      <ExpandableCard title="Setup Fee — $1,500 to $5,000" subtitle="One-time upfront — paid before launch" defaultOpen>
        <div className="space-y-2 text-sm">
          <p className="text-brand-gray">Covers all infrastructure before the first cycle begins:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { item: 'Landing pages', who: 'Emmanuel' },
              { item: 'Qualification surveys', who: 'Emmanuel' },
              { item: 'GoHighLevel CRM', who: 'Emmanuel + Mervin' },
              { item: 'Meta ad structure', who: 'Emmanuel' },
              { item: 'VA assignment', who: 'Leila' },
              { item: 'Calendar integration', who: 'Emmanuel' },
            ].map((i) => (
              <div key={i.item} className="bg-brand-gray-light rounded-lg p-2">
                <div className="font-bold text-xs">{i.item}</div>
                <div className="text-[10px] text-brand-gray mt-0.5">{i.who}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-brand-gray"><strong>Timeline:</strong> 2–3 business days</div>
        </div>
      </ExpandableCard>

      {/* Why it works */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Why This Model Works</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-brand-yellow p-4">
            <div className="font-black text-sm mb-2">For Clients</div>
            <BulletList check items={[
              'No risk — pay for results only',
              'Predictable appointment flow',
              'Fully managed service',
              'Continuous optimization',
            ]} />
          </div>
          <div className="rounded-xl bg-brand-black p-4">
            <div className="font-black text-sm text-brand-yellow mb-2">For Us</div>
            <BulletList check items={[
              'Forces accountability',
              'Creates recurring revenue',
              'Aligned incentives',
              'Compounding value per cycle',
            ]} className="[&_span]:text-white/80 [&_.text-green-500]:text-brand-yellow" />
          </div>
        </div>
      </div>

      {/* Winter program */}
      <ExpandableCard title="Winter Program — November through February" subtitle="Seasonal adaptation for roofing clients">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-brand-yellow">
              <div className="font-black text-sm mb-1">Peak Season</div>
              <div className="text-xs text-brand-black/60 mb-2">Spring / Summer / Fall</div>
              <BulletList items={['Full service model', 'Aggressive scaling', 'Performance billing']} />
            </div>
            <div className="p-4 rounded-xl bg-brand-black text-white">
              <div className="font-black text-sm text-brand-yellow mb-1">Winter Program</div>
              <div className="text-xs text-white/50 mb-2">November – February</div>
              <BulletList items={['Retainer model', 'Maintenance mode', 'Lower volume expectations']} className="[&_span]:text-white/80" />
            </div>
          </div>
          <InfoBox type="info">See the <strong>Winter Retainer Plan SOP</strong> in the Resources tab for the full detailed process.</InfoBox>
        </div>
      </ExpandableCard>

      <InfoBox type="tip" title="The Compounding Effect">
        Acquiring a client costs thousands. Retaining a client costs time and care. Every cycle you preserve multiplies the agency&apos;s revenue. <strong>Your retention = your impact.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
