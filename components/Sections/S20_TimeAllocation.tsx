'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

interface Task {
  task: string;
  duration: string;
  cadence?: string;
  note?: string;
  owner?: 'csm' | 'media-buyer' | 'creative' | 'either';
  blank?: boolean;
}

const SERVICE_DELIVERY: Task[] = [
  { task: 'GHL setup (sub-account, automations, calendars)', duration: '30–60 min', owner: 'media-buyer', note: 'Should be under an hour. Anything more = something\'s off.' },
  { task: 'Creatives creation', duration: '15–45 min', owner: 'media-buyer', note: 'Client sent perfect assets = 15 min. You\'re sourcing from FB / IG / GMB / Yelp / Yellow Pages = 45 min. Source organic FIRST before tasking Ken.' },
  { task: 'Ads Manager upload — manual', duration: '20–30 min', owner: 'media-buyer' },
  { task: 'Ads Manager upload — Ads Uploader tool', duration: '5–15 min', owner: 'media-buyer', note: 'Strongly preferred over manual.' },
  { task: 'Account Master Dashboard setup + team notification', duration: '5–10 min', owner: 'media-buyer' },
];

const SPECIAL_REQUESTS: Task[] = [
  { task: 'CRM integration (Zapier / API hookup)', duration: '< 5 min', owner: 'media-buyer', note: 'Quick — not common, but often requested by larger clients.' },
  { task: 'Hiring system buildout (sales rep targeting)', duration: '~1 hour total', owner: 'media-buyer', note: 'Same flow as a normal service delivery — only difference is targeting sales reps to hire instead of homeowners as leads. Copy + landing pages change. Images and creative format stay the same.' },
];

const CREATIVE_SPECIALIST: Task[] = [
  { task: 'AI image generation (per ad)',  duration: 'BLANK',  owner: 'creative', blank: true, note: 'TODO — Oscar to check with Cole on Ken\'s typical timing.' },
  { task: 'Graphic design / asset edits', duration: 'BLANK', owner: 'creative', blank: true, note: 'TODO — Oscar to check with Cole on Ken\'s typical timing.' },
];

const POD_MANAGER_RECURRING: Task[] = [
  { task: 'Pod meetings',                                    duration: '~1 hr',     cadence: '2× / week (Tue + Fri)', owner: 'csm' },
  { task: 'Pod meeting prep — gathering data + reports',     duration: '20–60 min', cadence: '2× / week (before each pod meeting)', owner: 'csm' },
  { task: 'Pod meeting follow-through — action items, delegation, comms', duration: 'Variable', cadence: 'Same day after each meeting', owner: 'csm', note: 'Light when clients are doing well — heavier when accounts need intervention. Communication, delegation, strategy. Take action SAME day.' },
];

const POD_MANAGER_ONBOARDING: Task[] = [
  { task: 'Pre-onboarding prep (review intake, surface gaps, brief media buyer)', duration: '5–15 min', owner: 'csm' },
  { task: 'Onboarding call itself',                                                duration: '30–60 min', owner: 'csm' },
  { task: 'Post-onboarding wrap (notes, fathom share, MB handoff, internal updates, fulfilling on promises)', duration: '10–20 min', owner: 'csm' },
  { task: 'Video approval (client-sent video for ads)',  duration: '~5 min',  owner: 'csm', note: 'Per video. Open question for the team: is the "what to film + what to show on the approval video" itself SOP\'d? If not, that\'s the next thing to build.' },
];

const POD_MANAGER_CLIENT_COMMS: Task[] = [
  { task: 'Introduction call (pre-onboarding)',           duration: 'Short',     owner: 'csm', note: 'Brief — set tone, confirm expectations.' },
  { task: 'Escalation call (client unhappy / on fire)',   duration: '5–10 min typical, 30–60 min worst case', owner: 'csm', note: 'Try to keep these efficient. Long escalation calls are fine occasionally — but with 20–30 accounts you cannot afford them as a habit. Address the issue, plan the action, end the call.' },
  { task: 'Performance review meeting (results dropped)', duration: 'Variable',  owner: 'csm', note: 'Video or phone. Gather troops, gather data, realign expectations. Used when lead quality / sales / appt goals are off and client is shaken.' },
  { task: 'General client questions',                     duration: 'Aim for text',  owner: 'csm', note: 'Default to TEXT, not call. Texting gives an immediate answer and a paper trail. If a client says "let\'s hop on a call", nudge toward text first ("I can answer right now over Slack — what\'s the question?"). Phone calls scale poorly across 20–30 accounts.' },
  { task: 'Recurring weekly client meetings',             duration: 'Avoid',         owner: 'csm', note: 'Set up auto-sending reports instead. If a client wants a feel-good weekly, the automated report does that work for you. Save your synchronous time for accounts that need it.' },
];

const POD_MANAGER_THINKING: Task[] = [
  { task: 'Strategising / quarterbacking',  duration: 'Variable',  owner: 'csm', note: 'You ARE the quarterback. Communication, delegation, strategy, calling plays — this is the highest-leverage time you spend. Hard to bound; protect it from being eaten by reactive Slack.' },
  { task: 'Asking questions (internal)',    duration: 'Variable',  owner: 'csm', note: 'Use the question-asking framework in Section 14. Lead with the issue, follow with the proposed solution. Get verbal agreement and act.' },
];

function intensityBadge(duration: string) {
  if (duration === 'BLANK')                                  return { color: '#94A3B8', label: 'TBD' };
  if (duration === 'Variable' || duration === 'Aim for text' || duration === 'Avoid' || duration === 'Short') return { color: '#6B7280', label: 'flex' };
  if (/^< |^~?5 |^5–10|^5–15|^10|^< 5/.test(duration))      return { color: '#22C55E', label: 'quick' };
  if (/^15|^20|^30/.test(duration))                          return { color: '#F5C800', label: 'medium' };
  if (/^~?1 hr|hour|^45/.test(duration))                     return { color: '#EA580C', label: 'heavy' };
  return { color: '#94A3B8', label: '' };
}

function TaskTable({ items, ownerLabel }: { items: Task[]; ownerLabel?: string }) {
  return (
    <div className="rounded-xl border border-brand-gray-mid overflow-hidden">
      <div className={`grid bg-brand-black text-white text-[10px] font-black uppercase tracking-widest`}
           style={{ gridTemplateColumns: '1fr 130px 90px' }}>
        <div className="p-3">Task</div>
        <div className="p-3 text-center">Duration</div>
        <div className="p-3 text-center">{ownerLabel ?? 'Cadence'}</div>
      </div>
      {items.map((t, i) => {
        const badge = intensityBadge(t.duration);
        return (
          <div key={t.task} className={`grid text-xs items-start ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-light'}`}
               style={{ gridTemplateColumns: '1fr 130px 90px' }}>
            <div className="p-3">
              <div className="font-black text-brand-black">{t.task}</div>
              {t.note && <div className="text-[11px] text-brand-gray mt-0.5 leading-relaxed">{t.note}</div>}
            </div>
            <div className="p-3 text-center self-center">
              <div className={`inline-block px-2 py-0.5 rounded text-[11px] font-black ${t.blank ? 'opacity-60' : ''}`}
                   style={{ backgroundColor: badge.color + '22', color: badge.color }}>
                {t.duration}
              </div>
            </div>
            <div className="p-3 text-center self-center text-[11px] text-brand-gray">
              {t.cadence ?? (t.owner ? t.owner.replace('-', ' ') : '')}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function S20_TimeAllocation() {
  return (
    <SectionWrapper sectionId={20}>

      <InfoBox type="tip" title="Why this matters">
        With 20–30 accounts in your pod, time is the bottleneck. These benchmarks are not contractual — they&apos;re the
        signal that something&apos;s off when you blow past them. If a 30-min task is taking 90 min, you&apos;re either
        bumping a process gap or doing work that should be delegated.
      </InfoBox>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Service Delivery Setup — what your media buyer should bill against</h3>
        <Card border>
          <TaskTable items={SERVICE_DELIVERY} ownerLabel="Owner" />
        </Card>
        <div className="mt-2 text-xs text-brand-gray">
          You don&apos;t do this work — you delegate it via ClickUp. But knowing the timing helps you set the deadline correctly and spot when something is dragging.
        </div>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Special Requests — niche but worth knowing</h3>
        <Card border>
          <TaskTable items={SPECIAL_REQUESTS} ownerLabel="Owner" />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Creative Specialist (Ken) — TBD</h3>
        <Card border>
          <TaskTable items={CREATIVE_SPECIALIST} ownerLabel="Owner" />
        </Card>
        <div className="mt-2 text-xs italic text-brand-gray">
          Oscar to confirm with Cole. Update <span className="font-mono">components/Sections/S20_TimeAllocation.tsx</span> when known.
        </div>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Recurring Pod Work</h3>
        <Card border>
          <TaskTable items={POD_MANAGER_RECURRING} />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Onboarding (Per New Client)</h3>
        <Card border>
          <TaskTable items={POD_MANAGER_ONBOARDING} ownerLabel="Owner" />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Client Communication</h3>
        <Card border>
          <TaskTable items={POD_MANAGER_CLIENT_COMMS} ownerLabel="Owner" />
        </Card>
        <InfoBox type="warning" title="Defaults">
          <strong>Text &gt; call.</strong> Always nudge synchronous asks toward async. Reserve calls for genuine escalations. <strong>Avoid recurring weekly client meetings</strong> unless absolutely necessary — auto-sending reports do the &quot;feel-good&quot; work without eating your week.
        </InfoBox>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Strategising &amp; Question-Asking</h3>
        <Card border>
          <TaskTable items={POD_MANAGER_THINKING} ownerLabel="Owner" />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Loom — How To Prep A Report Efficiently</h3>
        <LoomSlot
          slotKey="s20_report_prep"
          title="Report prep walkthrough"
          subtitle="The exact flow to assemble a pod-meeting or cycle-end report fast"
          recordedBy="Cole or Tyler"
          length="—"
        />
      </div>

      <InfoBox type="info" title="Watch out for">
        <strong>Long escalation calls.</strong> Some calls stretch to 30–60 min. With 20–30 accounts, you cannot afford that as a habit. Address the issue, plan the action, end the call. The agency is healthier when synchronous time stays scarce.
      </InfoBox>

    </SectionWrapper>
  );
}
