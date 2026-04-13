'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList, TwoCol } from '@/components/UI/Card';
import { OrgChart } from '@/components/Diagrams/OrgChart';

export function S07_OrgStructure() {
  return (
    <SectionWrapper sectionId={7}>

      {/* Org chart */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Company Org Chart</h3>
        <Card border>
          <OrgChart />
        </Card>
      </div>

      {/* Pod structure */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Pod Structure</div>
        <h2 className="text-xl font-black text-white mb-3">How Pods Work</h2>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          Each pod has 2 managers sharing <strong className="text-white">25–30 client accounts</strong>.
          You own all client relationships in your pod. You coordinate specialists — you don&apos;t do the technical work yourself.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pod 1', detail: 'Gianmarco & Gregory', status: 'Launched Mar 12', clients: '25–30' },
            { label: 'Pod 2', detail: 'Cole & Tyler', status: 'Most experienced', clients: '25–30' },
            { label: 'Pod 3', detail: 'Kyle & Abdullah', status: 'Launched Mar 25', clients: 'Building' },
            { label: 'Pod 4', detail: 'Sam & Patrick', status: 'YOU — Starting Apr 14', clients: 'Onboarding', isYou: true },
          ].map((pod) => (
            <div key={pod.label} className={`rounded-xl p-3 text-center ${(pod as any).isYou ? 'bg-brand-yellow text-brand-black' : 'bg-white/10'}`}>
              <div className={`font-black text-sm ${(pod as any).isYou ? 'text-brand-black' : 'text-white'}`}>{pod.label}</div>
              <div className={`text-[10px] mt-1 ${(pod as any).isYou ? 'text-brand-black/70' : 'text-white/60'}`}>{pod.detail}</div>
              <div className={`text-[10px] mt-1 font-bold ${(pod as any).isYou ? 'text-brand-black' : 'text-brand-yellow'}`}>{pod.status}</div>
              <div className={`text-[10px] mt-1 ${(pod as any).isYou ? 'text-brand-black/60' : 'text-white/40'}`}>{pod.clients} clients</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Media buying team structure */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Media Buying Team — 3-Tier Structure</h3>
        <div className="space-y-2">
          {[
            {
              tier: 'Tier 1',
              label: 'Full Cycle Media Buyers',
              people: 'Emmanuel & Mervin',
              color: 'bg-brand-yellow text-brand-black',
              desc: 'Handle complete GHL setup AND ongoing campaign management. All account setups and A2P go through Emmanuel. Task via ClickUp — always include client name, GHL sub-account link, and 48hr deadline.',
            },
            {
              tier: 'Tier 2',
              label: 'Pod Media Buyer',
              people: 'Bren (Pod 2)',
              color: 'bg-brand-black text-white',
              desc: 'Handles Meta campaign execution and creative optimization for Pod 2. Can support other pods on overflow when bandwidth allows.',
            },
            {
              tier: 'Tier 3',
              label: 'Graphic Design & AI Expert',
              people: 'Ken',
              color: 'bg-brand-gray-mid text-brand-black',
              desc: 'Handles both graphic design AND AI-powered creative production. Supports all pods with ad visuals and creative assets.',
            },
          ].map((t) => (
            <div key={t.tier} className={`rounded-xl p-4 ${t.color}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className={`text-xs font-black uppercase tracking-widest mb-0.5 ${t.color.includes('black') && !t.color.includes('text-white') ? 'text-brand-black/60' : 'opacity-60'}`}>{t.tier}</div>
                  <div className="font-black text-base">{t.label}</div>
                  <div className={`text-sm font-bold mt-0.5 ${t.color.includes('text-white') ? 'text-brand-yellow' : ''}`}>{t.people}</div>
                </div>
              </div>
              <div className={`text-xs mt-2 ${t.color.includes('text-white') ? 'text-white/70' : 'text-brand-black/60'}`}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What you are/aren't */}
      <TwoCol
        leftTitle="What You Are NOT"
        left={
          <Card border>
            <BulletList cross items={[
              'A task executor',
              'A landing page builder',
              'A Meta ads specialist',
              'A setup technician',
              'A VA manager',
              'A busy-work doer',
            ]} />
            <p className="text-xs text-brand-gray mt-3">You coordinate specialists. You do NOT do the busy work.</p>
          </Card>
        }
        rightTitle="What You ARE"
        right={
          <Card yellow>
            <BulletList check items={[
              'A pod leader managing 30–40 accounts',
              'A revenue retention engine',
              'A client relationship owner',
              'A KPI diagnostician',
              'A team coordinator',
              'An accountability driver',
            ]} />
          </Card>
        }
      />

      {/* Core responsibilities */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Core Responsibilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              area: 'Client Management',
              items: ['Own all client communication', 'Reduce churn proactively', 'Drive testimonials & referrals', 'Push upsells & cross-sells'],
            },
            {
              area: 'Performance Management',
              items: ['Diagnose KPI problems', 'Prescribe solutions', 'Coordinate specialists', 'Monitor ongoing performance'],
            },
            {
              area: 'Team Coordination',
              items: ['Emmanuel/Mervin (setup & campaigns)', 'Ken (AI creatives — 24hr turnaround, Philippines)', 'Leila/Aica (VA team — escalate quality issues)', 'Report to Jonathan Mon/Thu updates, Tue/Fri calls'],
            },
          ].map((area) => (
            <div key={area.area} className="bg-white rounded-xl border border-brand-gray-mid p-4">
              <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">{area.area}</div>
              <BulletList items={area.items} />
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="The Quarterback Analogy">
        You&apos;re not the entire team — you call the plays and coordinate execution. You diagnose problems and prescribe solutions. The specialists execute. <strong>You own the outcome.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
