'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const PHASES = [
  { num: 1, title: 'Lead Comes In', owner: 'Michael (B2B Ads)', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 2, title: 'Sales Call', owner: "Mani's Team", color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 3, title: 'Client Closed', owner: 'Closers + Pod Assignment', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 4, title: 'Onboarding Call', owner: 'YOU', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 5, title: 'Service Delivery Setup', owner: 'Emmanuel & Mervin (5–10 business days)', color: 'bg-brand-black border-brand-black', text: 'text-white' },
  { num: 6, title: 'Launch Campaigns', owner: 'Emmanuel + VA Team', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 7, title: 'Ongoing Optimization', owner: 'You + Specialists', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 8, title: 'Cycle Completion', owner: 'You verify + bill', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 9, title: 'Renewal', owner: 'You secure next cycle', color: 'bg-brand-black border-brand-black', text: 'text-white' },
];

export function S06_ServiceDelivery() {
  return (
    <SectionWrapper sectionId={6}>

      {/* Role overview */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Your Role</div>
        <h2 className="text-xl font-black text-white mb-3">You Own the Client Experience</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Once a client is closed, <strong className="text-white">you take over</strong>. You run the onboarding call, coordinate the build,
          manage launch, drive optimization, close the cycle, and secure renewal.
          You are the client&apos;s single point of contact from day one — <strong className="text-brand-yellow">you do not build or execute the technical work</strong>, you direct, track, and own outcomes.
        </p>
      </Card>

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
                  }`}>YOU OWN THIS</span>
                )}
              </div>
              {i < PHASES.length - 1 && <div className="text-brand-gray-mid text-xs w-4">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Call */}
      <ExpandableCard title="The Onboarding Call — Your First Touch" subtitle="This is YOUR call. It sets the tone for the entire relationship." accent defaultOpen>
        <div className="space-y-3">
          <InfoBox type="tip">
            Come prepared. Document everything. The quality of this call determines the quality of the setup — and the setup determines time to cashflow.
          </InfoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Your Goals on the Call</h4>
              <BulletList check items={[
                'Understand their business model deeply',
                'Gather all assets (logos, photos, brand colors)',
                'Confirm service area (exact zip codes)',
                'Set clear timeline expectations (5–10 business days for setup)',
                'Explain the 28-day cycle model',
                'Confirm communication channel (WhatsApp or Slack)',
                'Collect CRM details if they have one',
                'Confirm appointment capacity per week',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Questions to Always Ask</h4>
              <BulletList items={[
                'What is your average job value?',
                'What are your exact service zip codes?',
                'Do you have a CRM we need to integrate?',
                'What is your appointment capacity per week?',
                'What is your current close rate?',
                'Have you run paid ads before? Any issues?',
                'Who will be managing appointments on your end?',
              ]} />
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Within 1 Hour of Ending the Call</h4>
            <div className="space-y-1.5">
              {[
                { step: '1', action: 'Paste Fathom transcript into Custom GPT → get structured summary' },
                { step: '2', action: 'Post Custom GPT summary to #ops-manager-discussion in Slack' },
                { step: '3', action: 'Create ClickUp task for Emmanuel: client name, GHL sub-account link, all assets, 48hr deadline label' },
                { step: '4', action: 'WhatsApp/text client confirming next steps, timeline, and your contact info' },
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

      {/* Setup phase */}
      <ExpandableCard title="Service Delivery Setup — What Happens After Your Call" subtitle="Emmanuel & Mervin build the full infrastructure in 5–10 business days">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { item: 'GoHighLevel CRM', desc: 'Sub-account, pipelines, automations, calendar booking system' },
              { item: 'Landing Pages', desc: 'Conversion-optimized, brand-matched, hosted on Cloudflare' },
              { item: 'Qualification Survey', desc: '4-question standard: name, email, phone, service type' },
              { item: 'Meta Ad Campaigns', desc: 'Campaign structure, audiences, 6 approved placements only' },
              { item: 'A2P Registration', desc: 'GHL phone registration via A2P Wizard — ALWAYS Emmanuel, never you' },
              { item: 'VA Assignment & Brief', desc: 'Leila assigns VAs, Account Specific Doc created for VA call scripts' },
              { item: 'CAPI / Pixel Setup', desc: 'Qualified tag in GHL → fires conversion event to Meta via CAPI' },
              { item: 'Zapier / CRM Integration', desc: 'If client has their own CRM, leads sync via Google Sheets + Zapier' },
            ].map((item) => (
              <div key={item.item} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <div>
                  <div className="font-bold text-xs">{item.item}</div>
                  <div className="text-xs text-brand-gray">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <InfoBox type="warning" title="A2P Critical Rule">
            A2P (10DLC) is the GHL phone number registration process — NOT related to Meta. A rejected A2P means a 2–3 week delay to reapply.
            Always task Emmanuel via ClickUp with client name + GHL sub-account link. Never submit A2P yourself.
          </InfoBox>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">While Emmanuel Builds — Your Job</h4>
            <div className="space-y-1.5">
              {[
                { day: 'Day 1–2', action: 'Confirm Emmanuel received your ClickUp task and has everything he needs' },
                { day: 'Day 5', action: 'Check ClickUp — if no update on the task, follow up with Emmanuel in Slack' },
                { day: 'Day 8–10', action: 'If still not launched and no clear timeline, escalate to Jonathan' },
                { day: 'On Launch', action: 'Confirm with Leila that VAs are briefed and the Account Specific Doc is created' },
              ].map((s) => (
                <div key={s.day} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg text-xs">
                  <span className="w-14 font-black text-brand-black flex-shrink-0">{s.day}</span>
                  <span>{s.action}</span>
                </div>
              ))}
            </div>
          </div>

          <InfoBox type="info">
            Every day a client isn&apos;t launched = delayed cashflow. Track setup status in ClickUp daily. It&apos;s your responsibility to keep the build moving — not just wait.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Reference recordings */}
      <ExpandableCard title="Reference Recordings — Study Before Your First Call" subtitle="Real onboarding and service delivery sessions to learn from">
        <div className="space-y-2">
          {[
            { label: 'Service Delivery Part 1', desc: 'GHL setup walkthrough — how the sub-account build works from start to finish.', url: 'https://fathom.video/share/uZeCCaxRRVumFq_K6yHx_tbN75iRaMaX', priority: false },
            { label: 'Service Delivery Part 2 (Most Recent)', desc: 'Updated service delivery process. Watch after Part 1 for the current standards.', url: 'https://fathom.video/share/G9juWT1oFG_3CrppLscPDXceijJvP_rR', priority: false },
            { label: 'Entire GHL Build Start to Finish', desc: 'Complete sub-account build using standard A2P (not A2P Wizard). Know the full picture even though Emmanuel handles it.', url: 'https://fathom.video/share/VG-nsEXiRvRP-7oyMY1VxcVET743mMs8', priority: false },
            { label: 'Roofing Onboarding Call', desc: 'Real roofing client onboarding. Primary niche (80–90% of clients) — study this carefully.', url: 'https://fathom.video/share/qj9AYoqURQ6jhx34jFRZiR2-xESYDswF', priority: false },
            { label: 'HVAC Onboarding Call', desc: 'HVAC-specific nuances — different pain points and seasonality vs roofing.', url: 'https://fathom.video/share/VYz9GhzfjBBj1YuVUPLXLdbVz6UkW4Pd', priority: false },
            { label: 'Gutter Onboarding Call', desc: 'Gutter client onboarding. Note: gutters require 2–3× booking volume vs roofing to be profitable.', url: 'https://fathom.video/share/yNyAaNPjWJdhj-zps7GYjpziqpCsBhN_', priority: false },
          ].map((rec) => (
            <a key={rec.label} href={rec.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-xl border-2 border-brand-gray-mid bg-white hover:border-brand-black hover:shadow-sm transition-all group">
              <span className="text-lg mt-0.5 flex-shrink-0">🎥</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">{rec.label}</div>
                <div className="text-xs text-brand-gray mt-0.5">{rec.desc}</div>
              </div>
              <span className="text-brand-gray group-hover:text-brand-black text-xs flex-shrink-0 mt-1">↗</span>
            </a>
          ))}
          <a href="https://docs.google.com/document/d/10aoaz3edxvQBsDrwPsHjEO2CgZa0FPA8KltuXDf-IeQ/edit" target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl border-2 border-brand-gray-mid bg-white hover:border-brand-black hover:shadow-sm transition-all group">
            <span className="text-lg mt-0.5 flex-shrink-0">📄</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm">Service Delivery SOP (Google Doc)</div>
              <div className="text-xs text-brand-gray mt-0.5">Full written SOP — know where it lives, not every step by memory.</div>
            </div>
            <span className="text-brand-gray group-hover:text-brand-black text-xs flex-shrink-0 mt-1">↗</span>
          </a>
        </div>
      </ExpandableCard>

      {/* Ongoing optimization */}
      <ExpandableCard title="Ongoing Optimization — Your Weekly Rhythm" subtitle="What you're managing during every active cycle">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { week: 'Week 1', action: 'Launch & monitor. Let the pixel gather data — don\'t touch campaigns yet.', who: 'Emmanuel leads' },
              { week: 'Week 2–3', action: 'Identify early patterns. Optimize based on Layer 1 data.', who: 'You + Emmanuel' },
              { week: 'Week 3', action: 'Scale winning ad sets. Kill non-performers. Refresh creatives if needed.', who: 'Emmanuel + Ken' },
              { week: 'Week 4', action: 'Prepare cycle review. Compile results for client and billing.', who: 'You' },
            ].map((w) => (
              <div key={w.week} className="p-3 rounded-xl bg-brand-gray-light">
                <div className="font-black text-xs text-brand-black">{w.week}</div>
                <div className="text-xs text-brand-gray mt-1 leading-relaxed">{w.action}</div>
                <div className="text-[10px] text-brand-gray/70 mt-1.5 font-bold">→ {w.who}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Check Daily (Layer 1)</h4>
              <BulletList check items={[
                'Bookings vs target — are you on pace?',
                'Cost per booking (spend ÷ booked appointments)',
                'Open (white) leads in Logbook — nothing should sit unresolved',
                'Account health colors in Command Center',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Pull Layer 2 Only If Layer 1 Fails</h4>
              <BulletList items={[
                'CPC (target: <$6), CTR (target: >0.8%)',
                'Survey opt-in rate (target: >2.5%)',
                'OSA rate — if >20% of leads are out-of-area',
                'Creative concentration — top 3–4 ads eating 90%+ of spend?',
              ]} />
            </div>
          </div>

          <InfoBox type="warning" title="The Rule">
            Layer 1 first. Always. If bookings are on pace and cost per booking is acceptable — do not touch anything. Changing things that are working resets the algorithm and costs you days of data.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Cycle completion */}
      <ExpandableCard title="Cycle Completion & Renewal" subtitle="Close every cycle with intention — this is where retention happens">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Completion Checklist</h4>
              <BulletList check items={[
                'Verify target hit (or 80% rule applied)',
                'Compile final cycle data — bookings, cost per booking, ROAS if available',
                'Review results with client — celebrate wins, acknowledge gaps',
                'Document learnings for the next cycle',
                'Prepare billing documentation',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Renewal Playbook</h4>
              <BulletList check items={[
                'Start renewal conversation 5–7 days before cycle ends',
                'Never let a cycle expire unconfirmed',
                'Present a gameplan for next cycle — show you\'re thinking ahead',
                'Propose spend increase if results were strong',
                'Ask for a testimonial from every client who hit target',
                'Loop in Oscar if a client is hesitant — don\'t handle retention pushback alone',
              ]} />
            </div>
          </div>
          <InfoBox type="tip">
            Every additional cycle you preserve compounding the agency&apos;s revenue and your own compensation. Renewal is not an afterthought — it&apos;s the job.
          </InfoBox>
        </div>
      </ExpandableCard>

      <Card yellow>
        <div className="text-center">
          <div className="font-black text-2xl mb-1">You own the relationship.</div>
          <div className="text-sm text-brand-black/70">
            From the onboarding call to renewal — you are the client&apos;s single point of contact and the one accountable for outcomes.
          </div>
        </div>
      </Card>
    </SectionWrapper>
  );
}
