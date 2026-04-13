'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const PHASES = [
  { num: 1, title: 'Lead Comes In', owner: 'Michael (B2B Ads)', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 2, title: 'Sales Call', owner: 'Mani\'s Team', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 3, title: 'Client Closed', owner: 'Closers + Pod Assignment', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 4, title: 'Onboarding Call', owner: 'YOU', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 5, title: 'Service Delivery Setup', owner: 'Emmanuel (5–10 business days)', color: 'bg-brand-black border-brand-black', text: 'text-white' },
  { num: 6, title: 'Launch Campaigns', owner: 'Emmanuel + VA Team', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 7, title: 'Ongoing Optimization', owner: 'You + Specialists', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 8, title: 'Cycle Completion', owner: 'You verify + bill', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 9, title: 'Renewal', owner: 'You secure next cycle', color: 'bg-brand-black border-brand-black', text: 'text-white' },
];

export function S06_ServiceDelivery() {
  return (
    <SectionWrapper sectionId={6}>

      {/* Phases overview */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Client Journey — 9 Phases</h3>
        <div className="space-y-1.5">
          {PHASES.map((p, i) => (
            <div key={p.num} className="flex items-center gap-3">
              <div className={`flex-1 flex items-center gap-3 p-3 rounded-xl border ${p.color}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  p.highlight ? 'bg-brand-black text-white' : 'bg-white/50 text-brand-gray'
                }`}>
                  {p.num}
                </div>
                <div>
                  <div className={`font-bold text-sm ${p.text}`}>{p.title}</div>
                  <div className={`text-xs ${p.text === 'text-white' ? 'text-white/60' : 'text-brand-gray'}`}>{p.owner}</div>
                </div>
                {p.highlight && (
                  <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded ${
                    p.text === 'text-white' ? 'bg-white/20 text-white' : 'bg-brand-black text-white'
                  }`}>YOUR PHASE</span>
                )}
              </div>
              {i < PHASES.length - 1 && <div className="text-brand-gray-mid text-xs w-4">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Phase 4: Onboarding Call Deep Dive */}
      <ExpandableCard title="Phase 4: Onboarding Call — Your First Touch" subtitle="This is YOUR call. Make it count." accent defaultOpen>
        <div className="space-y-3">
          <InfoBox type="tip">
            The onboarding call sets the tone for the entire relationship. Come prepared. Document everything.
          </InfoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Your Goals on the Call</h4>
              <BulletList check items={[
                'Understand their business deeply',
                'Gather all assets (logos, photos, brand colors)',
                'Set clear timeline expectations',
                'Explain the 28-day cycle model',
                'Establish communication cadence (WhatsApp/Slack)',
                'Collect CRM details if they have one',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Questions to Ask</h4>
              <BulletList items={[
                'What is your average job value?',
                'What is your service area (exact zip codes)?',
                'Do you have a CRM we need to integrate?',
                'What is your appointment capacity per week?',
                'What is your current close rate?',
                'Have you run paid ads before?',
              ]} />
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Within 1 Hour of Ending the Call</h4>
            <div className="space-y-1.5">
              {[
                { step: '1', action: 'Paste Fathom transcript into Custom GPT → get structured summary' },
                { step: '2', action: 'Post summary to #post-onboarding-discussion in Slack' },
                { step: '3', action: 'Create ClickUp task for Emmanuel with client details + 48hr deadline' },
                { step: '4', action: 'Text/WhatsApp client confirming next steps and timeline' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg text-xs">
                  <span className="w-5 h-5 rounded-full bg-brand-black text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
                  <span>{s.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ExpandableCard>

      {/* Phase 5: Setup */}
      <ExpandableCard title="Phase 5: Service Delivery Setup" subtitle="Emmanuel & Mervin build the full infrastructure in 5–10 business days">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { item: 'GoHighLevel CRM', desc: 'Sub-account setup, pipelines, automations, calendar booking' },
              { item: 'Landing Pages', desc: 'Conversion-optimized, brand-matched, hosted on Cloudflare' },
              { item: 'Qualification Survey', desc: '4-question standard: name, email, phone, service type' },
              { item: 'Meta Ad Campaigns', desc: 'Campaign structure, audiences, 6 approved placements only' },
              { item: 'A2P Registration', desc: 'GHL phone registration via A2P Wizard — ALWAYS Emmanuel, never you' },
              { item: 'VA Assignment & Brief', desc: 'Leila assigns VAs, Account Specific Doc created for VA scripts' },
              { item: 'CAPI Setup', desc: 'Pixel conditioning via GHL: Qualified tag → fires event to Meta' },
              { item: 'Zapier/API Setup', desc: 'If client has their own CRM to integrate via Google Sheets' },
            ].map((item) => (
              <div key={item.item} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg">
                <span className="text-green-500 mt-0.5">✓</span>
                <div>
                  <div className="font-bold text-xs">{item.item}</div>
                  <div className="text-xs text-brand-gray">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="warning" title="A2P Critical Rule">
            A2P (10DLC) is the GHL phone number registration process — NOT related to Meta. A rejected A2P = 2–3 week wait to reapply.
            Always task Emmanuel via ClickUp with the client name + GHL sub-account link. Never submit yourself.
          </InfoBox>
          <InfoBox type="info">
            Your job: ensure Emmanuel has all assets from the onboarding call. Track progress in ClickUp. Every day of delay = delayed cashflow.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Ongoing optimization */}
      <ExpandableCard title="Phase 7: Ongoing Optimization" subtitle="Your weekly rhythm during an active cycle">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { week: 'Week 1', action: 'Launch & monitor', who: 'Emmanuel' },
            { week: 'Week 2–3', action: 'Optimize early data', who: 'You + Emmanuel' },
            { week: 'Week 3', action: 'Scale winners, kill losers', who: 'Emmanuel + Ken' },
            { week: 'Week 4', action: 'Prepare for cycle review', who: 'You' },
          ].map((w) => (
            <div key={w.week} className="p-3 rounded-xl bg-brand-gray-light text-center">
              <div className="font-black text-xs text-brand-black">{w.week}</div>
              <div className="text-xs text-brand-gray mt-1">{w.action}</div>
              <div className="text-[10px] text-brand-gray/70 mt-1">→ {w.who}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Cycle completion */}
      <ExpandableCard title="Phase 8–9: Cycle Completion & Renewal" subtitle="Verify, bill, celebrate, renew">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Completion Checklist</h4>
              <BulletList check items={[
                'Verify target hit (or 80% rule met)',
                'Prepare billing documentation',
                'Review cycle data with client',
                'Document wins and learnings',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Renewal Checklist</h4>
              <BulletList check items={[
                'Celebrate wins — make them feel it',
                'Address any concerns proactively',
                'Secure commitment for next cycle',
                'Request testimonial/referral',
              ]} />
            </div>
          </div>
        </div>
      </ExpandableCard>

      <Card yellow>
        <div className="text-center">
          <div className="font-black text-2xl mb-1">You own the relationship.</div>
          <div className="text-sm text-brand-black/70">From Phases 4 through 9 — you are the client&apos;s single point of contact and accountability.</div>
        </div>
      </Card>
    </SectionWrapper>
  );
}
