'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';
import { MiroBoard } from '@/components/Diagrams/MiroBoard';
import { ApprovalVideoSOP } from '@/components/Diagrams/ApprovalVideoSOP';

const PHASES = [
  { num: 1, label: 'Lead & Close',        owner: 'Sales team → pod assignment',         yours: false },
  { num: 2, label: 'Onboarding Call',     owner: 'You run it — sets the entire tone',    yours: true  },
  { num: 3, label: 'Infrastructure Build', owner: 'Emmanuel + Mervin — you track daily', yours: false },
  { num: 4, label: 'Launch & Optimize',   owner: 'You own every outcome',               yours: true  },
  { num: 5, label: 'Cycle Close + Renew', owner: 'You secure it — every time',          yours: true  },
];

export function S06_ServiceDelivery() {
  return (
    <SectionWrapper sectionId={6}>

      {/* Role card */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Your Role</div>
        <h2 className="text-xl font-black text-white mb-2">You Own the Client — End to End</h2>
        <p className="text-white/80 text-sm leading-relaxed">
          Once a client is closed, it&apos;s yours. You run the onboarding call, track the build, manage launch, drive optimization,
          close the cycle, and lock in renewal. Specialists support you — but <strong className="text-brand-yellow">every outcome is on you</strong>.
        </p>
      </Card>

      {/* THE BIG PICTURE — Miro board + Loom walkthrough */}
      <div id="big-picture">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest bg-brand-yellow text-brand-black px-2 py-0.5 rounded">START HERE</span>
          <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray">The Big Picture — Customer Journey + Who Does What</h3>
        </div>
        <p className="text-xs text-brand-gray mb-3">
          Before anything else, watch this Loom and explore the Miro board. It maps the full customer journey from B2B lead to offboarding AND who in the company owns each stage. If a section of the portal feels disconnected, come back to this — it&apos;s the connective tissue.
        </p>

        <div className="space-y-3">
          <MiroBoard
            slotKey="s06_miro_journey"
            title="Customer Journey + Org Map (Miro)"
            subtitle="The full system in one board — pan, zoom, click into any node"
            caption="interactive"
          />
          <LoomSlot
            slotKey="s06_journey_loom"
            title="Walkthrough of the Big Picture"
            subtitle="Oscar walks the Miro board end-to-end — required first watch"
            recordedBy="Oscar"
            length="—"
          />
        </div>
      </div>

      {/* Phase flow */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 5-Phase Client Journey</h3>
        <div className="space-y-1.5">
          {PHASES.map((p, i) => (
            <div key={p.num} className="flex items-center gap-2">
              <div className={`flex-1 flex items-center gap-3 p-3 rounded-xl border ${p.yours ? 'bg-brand-yellow border-brand-yellow' : 'bg-brand-gray-light border-brand-gray-mid'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${p.yours ? 'bg-brand-black text-white' : 'bg-white/60 text-brand-gray'}`}>
                  {p.num}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-sm ${p.yours ? 'text-brand-black' : 'text-brand-black'}`}>{p.label}</div>
                  <div className={`text-xs ${p.yours ? 'text-brand-black/60' : 'text-brand-gray'}`}>{p.owner}</div>
                </div>
                {p.yours && <span className="text-[10px] font-black px-2 py-0.5 rounded bg-brand-black text-white">YOU OWN THIS</span>}
              </div>
              {i < PHASES.length - 1 && <div className="text-brand-gray-mid text-xs w-4 text-center">↓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* After the onboarding call */}
      <ExpandableCard title="After the Onboarding Call — 1-Hour Checklist" subtitle="Three things that must happen within 60 minutes of ending every call." accent defaultOpen>
        <div className="space-y-2">
          {[
            { step: '1', action: 'Post to Slack', detail: 'Paste Fathom transcript into Custom GPT → post structured output to #post-onboarding-discussion. Not a manual summary — the GPT output.' },
            { step: '2', action: 'Task Emmanuel in ClickUp', detail: 'Client name, GHL sub-account link, all assets, 48hr deadline label. For A2P clients: include business details. Be complete — missing info = delays.' },
            { step: '3', action: 'Text the client', detail: 'WhatsApp or SMS confirming next steps, expected setup timeline (5–10 business days), and how to reach you.' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
              <span className="w-6 h-6 rounded-full bg-brand-black text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{s.step}</span>
              <div>
                <div className="font-black text-sm text-brand-black">{s.action}</div>
                <div className="text-xs text-brand-gray mt-0.5 leading-relaxed">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <InfoBox type="warning" className="mt-3">
          Jonathan sees the timestamps on #post-onboarding-discussion. The 1-hour window is the standard — for every client, every call.
        </InfoBox>
      </ExpandableCard>

      {/* Setup phase */}
      <ExpandableCard title="The Build Phase — What Emmanuel Sets Up" subtitle="5–10 business days. Your job: track it, not build it.">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { item: 'GoHighLevel CRM', desc: 'Sub-account, pipelines, automations, booking calendar' },
              { item: 'Landing Pages', desc: 'Conversion-optimised, brand-matched, hosted on Cloudflare' },
              { item: 'Qualification Survey', desc: '4 questions: name, email, phone, service type' },
              { item: 'Meta Ad Campaigns', desc: 'Campaign structure, audiences, 6 placements only' },
              { item: 'A2P Registration', desc: 'GHL phone registration — always Emmanuel via ClickUp, never you' },
              { item: 'VA Assignment & Brief', desc: 'Leila assigns VAs, Account Specific Doc created for call scripts' },
              { item: 'CAPI / Pixel', desc: '"Qualified" tag in GHL → fires Schedule event to Meta' },
              { item: 'CRM Integration', desc: 'If client has their own CRM: leads sync via Google Sheets + Zapier' },
            ].map((item) => (
              <div key={item.item} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg">
                <span className="text-green-500 mt-0.5 flex-shrink-0 text-xs">✓</span>
                <div>
                  <div className="font-bold text-xs">{item.item}</div>
                  <div className="text-xs text-brand-gray">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Your Tracking Responsibilities</h4>
            <div className="space-y-1.5">
              {[
                { when: 'Day 1–2',  action: 'Confirm Emmanuel received your ClickUp task and has everything he needs' },
                { when: 'Day 5',    action: 'Check ClickUp — no update? Follow up with Emmanuel in Slack' },
                { when: 'Day 8–10', action: 'Still not launched? Escalate to Jonathan immediately' },
                { when: 'Launch',   action: 'Confirm with Leila that VAs are briefed and the Account Specific Doc is live' },
              ].map((s) => (
                <div key={s.when} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg text-xs">
                  <span className="w-16 font-black text-brand-black flex-shrink-0">{s.when}</span>
                  <span className="text-brand-gray">{s.action}</span>
                </div>
              ))}
            </div>
          </div>

          <InfoBox type="info">
            Every day a client isn&apos;t launched = delayed cashflow. Keeping the build moving is your responsibility — not just waiting on it.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Approval video SOP — between build and launch */}
      <ExpandableCard title="Pre-Launch Approval Video — SOP" subtitle="The Loom you send the client before launch — pre-handles 90% of mid-cycle objections" defaultOpen>
        <ApprovalVideoSOP />
      </ExpandableCard>

      {/* Optimization rhythm */}
      <ExpandableCard title="Optimization Rhythm — Your Weekly Cadence" subtitle="What you're doing during every active 28-day cycle">
        <div className="space-y-3">
          <div className="space-y-2">
            {[
              { week: 'Week 1',   action: 'Launch and monitor. Pixel is still learning — don\'t touch campaigns. Confirm everything is running correctly.' },
              { week: 'Week 2–3', action: 'Diagnose Layer 1. Bookings on pace? Cost per booking acceptable? If not — identify why before acting.' },
              { week: 'Week 3',   action: 'Scale winners, kill non-performers. If creative is the problem, brief Ken for a refresh with specific direction.' },
              { week: 'Week 4',   action: 'Compile cycle results. Prepare billing. Start renewal conversation 5–7 days before cycle ends — never on Day 28.' },
            ].map((w) => (
              <div key={w.week} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
                <span className="w-16 font-black text-xs text-brand-black flex-shrink-0 mt-0.5">{w.week}</span>
                <span className="text-xs text-brand-gray leading-relaxed">{w.action}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Check Daily (Layer 1)</h4>
              <BulletList check items={[
                'Bookings vs target — are you on pace?',
                'Cost per booking (ad spend ÷ booked appointments)',
                'Open leads in Logbook — nothing should sit unresolved',
                'Account health colors in Command Center',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Layer 2 — Only if Layer 1 Fails</h4>
              <BulletList items={[
                'CPC (target: <$6) and CTR (target: >0.8%)',
                'Survey opt-in rate (target: >2.5%)',
                'OSA rate — if >20% of leads are out-of-area',
                'Creative concentration — top 3–4 ads eating 90%+ of spend?',
              ]} />
            </div>
          </div>

          <InfoBox type="warning" title="The Rule">
            Layer 1 first. Always. If bookings are on pace and cost per booking is healthy — do not touch anything. Changing what&apos;s working resets the algorithm and costs you days.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Cycle close + renewal */}
      <ExpandableCard title="Cycle Close & Renewal" subtitle="Close every cycle with intention — this is where retention happens">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Closing the Cycle</h4>
            <BulletList check items={[
              'Verify target hit (or 80% rule applied)',
              'Compile final numbers — bookings, cost per booking',
              'Review results with client — celebrate wins, address gaps',
              'Document learnings for next cycle',
              'Prepare billing documentation',
            ]} />
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Renewal Playbook</h4>
            <BulletList check items={[
              'Start the conversation 5–7 days before cycle ends',
              'Present a gameplan for next cycle — show you\'re thinking ahead',
              'Propose ad spend increase if results were strong',
              'Request a testimonial from every client who hit target',
              'Ask for referrals to other contractors',
              'Loop in Oscar if a client is hesitant — don\'t handle retention alone',
            ]} />
          </div>
        </div>
        <InfoBox type="tip" className="mt-3">
          Renewal is not an afterthought — it&apos;s the job. Every additional cycle compounds your commission and the agency&apos;s revenue.
        </InfoBox>
      </ExpandableCard>

      {/* Reference recordings */}
      <ExpandableCard title="Reference Recordings" subtitle="Watch these before your first onboarding call">
        <div className="space-y-2">
          {[
            { label: 'New Onboarding Process — Apr 30',  badge: 'WATCH FIRST',    desc: 'Jonathan walks all pod managers through the updated onboarding flow and expectations.',          url: 'https://fathom.video/share/9JhnQ7WvdHRKUgsnCyVkbzjKxeK-o_78' },
            { label: 'Full GHL Build — Start to Finish', badge: 'MOST RECENT',    desc: 'Complete sub-account build walkthrough. Understand the full picture even though Emmanuel executes.', url: 'https://fathom.video/share/VG-nsEXiRvRP-7oyMY1VxcVET743mMs8' },
            { label: 'Creative Audit — Oscar & Kyle',    badge: 'MUST WATCH',     desc: 'Oscar runs a live creative audit. Learn how to identify what\'s working, what\'s failing, what to brief.', url: 'https://www.loom.com/share/4c73ce9ede374abf8eac9158af79ea17' },
            { label: 'Roofing Onboarding Call',          badge: null,              desc: 'Real roofing client onboarding. 80–90% of your clients — study this carefully.',                url: 'https://fathom.video/share/qj9AYoqURQ6jhx34jFRZiR2-xESYDswF' },
            { label: 'HVAC Onboarding Call',             badge: null,              desc: 'HVAC-specific nuances — different pain points and seasonality vs roofing.',                      url: 'https://fathom.video/share/VYz9GhzfjBBj1YuVUPLXLdbVz6UkW4Pd' },
            { label: 'Gutter Onboarding Call',           badge: null,              desc: 'Gutters need 2–3× booking volume vs roofing to be equally profitable.',                         url: 'https://fathom.video/share/yNyAaNPjWJdhj-zps7GYjpziqpCsBhN_' },
          ].map((rec) => (
            <a key={rec.label} href={rec.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-xl border-2 border-brand-gray-mid bg-white hover:border-brand-black hover:shadow-sm transition-all group">
              <span className="text-base mt-0.5 flex-shrink-0">🎥</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{rec.label}</span>
                  {rec.badge && <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-brand-black text-brand-yellow uppercase tracking-wider">{rec.badge}</span>}
                </div>
                <div className="text-xs text-brand-gray mt-0.5">{rec.desc}</div>
              </div>
              <span className="text-brand-gray group-hover:text-brand-black text-xs flex-shrink-0 mt-1">↗</span>
            </a>
          ))}
        </div>
      </ExpandableCard>

      <Card yellow>
        <div className="text-center">
          <div className="font-black text-xl mb-1">You own the relationship.</div>
          <div className="text-sm text-brand-black/70">From onboarding call to renewal — the result is yours.</div>
        </div>
      </Card>

    </SectionWrapper>
  );
}
