'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, TwoCol, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { CycleModel } from '@/components/Diagrams/CycleModel';

export function S03_BusinessModel() {
  return (
    <SectionWrapper sectionId={3}>

      {/* Offer overview */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The Core Model</div>
        <h2 className="text-xl font-black text-white mb-3">28-Day Performance Cycle</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Clients pay <strong className="text-white">only when targets are hit</strong> — qualified booked appointments.
          Each cycle is 28 days: we run ads, qualify leads, book appointments, and bill on delivery.
        </p>
      </Card>

      {/* How the offer is structured */}
      <div className="space-y-2">
        <ExpandableCard title="Setup Fee — $1,500 to $5,000" subtitle="Paid upfront — one time" defaultOpen>
          <div className="space-y-2 text-sm">
            <p className="text-brand-gray">Client pays a one-time setup fee before launch. This covers all infrastructure work:</p>
            <BulletList items={[
              'Landing pages (conversion-optimized)',
              'Qualification surveys',
              'GoHighLevel CRM setup',
              'Meta ad campaign structure',
              'VA team assignment and onboarding',
              'Calendar integration',
            ]} />
            <div className="text-xs text-brand-gray mt-2"><strong>Handled by:</strong> Emmanuel and Mervin · <strong>Timeline:</strong> 2–3 business days</div>
          </div>
        </ExpandableCard>

        <ExpandableCard title="28-Day Performance Cycles — from $3,200/mo" subtitle="Recurring — usually $4,000 + 10% of ad spend" accent defaultOpen>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Hit Target', result: 'Bill client + renew next cycle', color: 'bg-green-50 border-green-300 text-green-800' },
                { label: 'Miss Target', result: 'Optimize and extend cycle', color: 'bg-yellow-50 border-yellow-300 text-yellow-800' },
                { label: '80% Rule', result: 'Partial credit — bill at margin', color: 'bg-blue-50 border-blue-300 text-blue-800' },
              ].map((s) => (
                <div key={s.label} className={`p-3 rounded-xl border ${s.color}`}>
                  <div className="font-black text-sm mb-1">{s.label}</div>
                  <div className="text-xs">{s.result}</div>
                </div>
              ))}
            </div>
          </div>
        </ExpandableCard>
      </div>

      {/* 28-Day Cycle Diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 28-Day Cycle Model</h3>
        <Card border>
          <CycleModel />
        </Card>
      </div>

      {/* Why it works */}
      <TwoCol
        leftTitle="For Clients"
        left={
          <Card yellow>
            <BulletList check items={[
              'No risk — only pay for results',
              'Predictable appointment flow',
              'Continuous optimization',
              'Fully managed service',
            ]} />
          </Card>
        }
        rightTitle="For Us"
        right={
          <Card dark>
            <BulletList check items={[
              'Forces accountability',
              'Creates recurring revenue',
              'Aligned incentives',
              'Compounding value over cycles',
            ]} className="[&_span]:text-white/80 [&_.text-green-500]:text-brand-yellow" />
          </Card>
        }
      />

      {/* Winter program */}
      <ExpandableCard title="Winter Program — November through February" subtitle="Seasonal adaptation for roofing clients">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-brand-yellow">
              <div className="font-black text-sm mb-2">Peak Season</div>
              <div className="text-xs text-brand-black/70 mb-2">Spring / Summer / Fall</div>
              <BulletList items={['Full service model', 'Aggressive scaling', 'Maximum volume', 'Performance billing']} />
            </div>
            <div className="p-4 rounded-xl bg-brand-black text-white">
              <div className="font-black text-sm text-brand-yellow mb-2">Winter Program</div>
              <div className="text-xs text-white/50 mb-2">November – February</div>
              <BulletList items={['Retainer model', 'Maintenance mode', 'Relationship focus', 'Lower volume expectations']} className="[&_span]:text-white/80" />
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
