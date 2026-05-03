'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const PRIORITY_MATRIX = [
  {
    status: 'Launch-Pending',
    color: 'bg-purple-600',
    textColor: 'text-white',
    description: 'Account signed, not yet live',
    action: 'Track daily — every day without launch = delayed cashflow. Push Emmanuel for 48hr setup completion.',
    urgency: 'Critical',
  },
  {
    status: 'Red',
    color: 'bg-red-500',
    textColor: 'text-white',
    description: '40%+ behind booking pace',
    action: 'Immediate action. Diagnose Layer 2. Escalate to Jonathan same day. No exceptions.',
    urgency: 'Immediate',
  },
  {
    status: 'Orange',
    color: 'bg-orange-400',
    textColor: 'text-white',
    description: '20–40% behind booking pace',
    action: 'Escalate VA performance to Leila. Review Layer 2 metrics. Proactive client update today.',
    urgency: 'Same Day',
  },
  {
    status: 'Yellow',
    color: 'bg-brand-yellow',
    textColor: 'text-brand-black',
    description: '10–20% behind booking pace',
    action: 'Monitor closely. Check Logbook for open leads. Proactive contact within 24 hours.',
    urgency: '24 Hours',
  },
  {
    status: 'Green',
    color: 'bg-green-500',
    textColor: 'text-white',
    description: 'On track for 80%+ of target',
    action: 'Monthly check-in. Do NOT dig into Layer 2. Revenue activities: testimonial, referral, upsell.',
    urgency: 'Scheduled',
  },
];

const DIFFICULT_CONVERSATIONS = [
  {
    scenario: 'Client wants to cancel',
    approach: 'Never agree or argue. Acknowledge, gather data, buy 48 hours.',
    script: 'I hear you. Before we make any decisions, let me pull the full performance data and get back to you today. I want to make sure we\'re both looking at the same picture.',
    escalate: 'Loop in Jonathan immediately. If still threatening after Jonathan — Oscar plays CEO card.',
  },
  {
    scenario: 'Results are low / client frustrated',
    approach: 'Diagnose before defending. Data-first, always.',
    script: 'I\'m pulling the account data right now. Let\'s look at where we are vs target, what the specific blockers are, and what I\'m prescribing. Can we jump on a call in the next 2 hours?',
    escalate: 'Jonathan if the account is Red or the client is threatening to leave.',
  },
  {
    scenario: 'Client asking for a discount',
    approach: 'Never discount without manager approval. Reframe to value.',
    script: 'I want to make sure you\'re getting maximum value before we talk pricing. Let me show you the ROI math on your bookings vs your retainer — I think the numbers will surprise you.',
    escalate: 'Any discount over 10% = Jonathan approval required. Price concessions use the commission floor protection.',
  },
  {
    scenario: 'Client blaming ad quality for sales issues',
    approach: 'Request CRM data before agreeing or defending.',
    script: 'I take that seriously. Can you share the full CRM data — what happened to each booked appointment? That tells me whether this is a media issue or a sales process issue. I need to see the data before I diagnose.',
    escalate: 'Mani if confirmed sales/close rate issue after ruling out media.',
  },
];

export function S12_AccountManagement() {
  return (
    <SectionWrapper sectionId={11}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Account Ownership</div>
        <h2 className="text-xl font-black text-white mb-2">The Account Management Playbook</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Managing accounts isn&apos;t checking in — it&apos;s owning outcomes. Every client in your pod is your
          responsibility from launch to renewal.{' '}
          <strong className="text-white">
            Proactive management means clients never wonder what&apos;s happening. Reactive management means you&apos;re
            always putting out fires.
          </strong>
        </p>
      </Card>

      {/* 24-48 hour rule */}
      <div className="rounded-2xl bg-brand-black p-5">
        <div className="text-brand-yellow font-black text-xs uppercase tracking-widest mb-2">The 24–48 Hour Rule — Detailed</div>
        <h3 className="text-white font-black text-lg mb-4">No blocker sits unresolved. No client wonders.</h3>
        <div className="space-y-3">
          {[
            {
              time: '0 hours',
              label: 'Blocker identified',
              action: 'Document it. Who owns the resolution? What exactly do they need? Send a specific, actionable message immediately.',
              color: 'bg-white/10 border-white/20',
              textColor: 'text-white/80',
            },
            {
              time: '0–24 hours',
              label: 'First contact made',
              action: 'Reach out via primary channel (Slack or phone). Include: client name, what is blocked, what you need from them, and your deadline.',
              color: 'bg-white/10 border-white/20',
              textColor: 'text-white/80',
            },
            {
              time: '24 hours',
              label: 'No response — second attempt',
              action: 'Switch channels. If you Slacked → call. If you emailed → Slack + call. Different channel every attempt.',
              color: 'bg-brand-yellow/20 border-brand-yellow/30',
              textColor: 'text-brand-yellow',
            },
            {
              time: '48 hours',
              label: 'Still no resolution — escalate',
              action: 'Message Jonathan: "I\'ve followed up 3 times via [channels] over 48 hours. Here\'s the paper trail. I need help escalating." No exceptions.',
              color: 'bg-red-900/40 border-red-700/30',
              textColor: 'text-red-300',
            },
          ].map((t) => (
            <div key={t.time} className={`rounded-xl p-3 border ${t.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded bg-white/10 ${t.textColor}`}>{t.time}</span>
                <span className={`font-black text-sm ${t.textColor}`}>{t.label}</span>
              </div>
              <p className="text-white/60 text-xs">{t.action}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-white/40 italic">
          Tracking method: ClickUp tasks with due dates. If it&apos;s not in ClickUp, it doesn&apos;t exist.
        </div>
      </div>

      {/* Account prioritization matrix */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Account Prioritization Matrix — Work This Order, Always</h3>
        <div className="space-y-2">
          {PRIORITY_MATRIX.map((item, i) => (
            <div key={item.status} className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-brand-gray-mid">
              <div className={`flex flex-col items-center justify-center px-4 py-3 min-w-[110px] flex-shrink-0 ${item.color}`}>
                <div className={`font-black text-xs uppercase tracking-widest ${item.textColor}`}>{i + 1}.</div>
                <div className={`font-black text-sm ${item.textColor}`}>{item.status}</div>
                <div className={`text-[10px] mt-0.5 opacity-80 ${item.textColor}`}>{item.urgency}</div>
              </div>
              <div className="flex-1 bg-white p-3">
                <div className="font-bold text-xs text-brand-gray mb-1">{item.description}</div>
                <div className="text-xs text-brand-black">{item.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monday/Thursday status update format */}
      <ExpandableCard title="Monday/Thursday Status Update — Exact Template" subtitle="Post in #ops-manager-discussion every Monday and Thursday" defaultOpen>
        <div className="space-y-4">
          <div className="bg-brand-black rounded-xl p-4 font-mono text-xs">
            <div className="text-brand-yellow font-black text-sm mb-4">📊 [Your Name] — Pod [#] Update — [Day, Date]</div>
            <div className="text-white space-y-4">
              <div>
                <div className="text-brand-yellow font-bold">CLIENT NAME — [Company Name]</div>
                <div className="text-white/70">Cycle: #X | Day X of 28 | Bookings: X / XX target | Health: 🟢🟡🟠🔴</div>
                <div className="text-white/70">Status: [What&apos;s happening — 1 to 2 sentences max. Be specific.]</div>
                <div className="text-white/70">Action: [Specific step + named owner + due date — e.g., &quot;Tasked Leila re: 4 open leads by EOD today&quot;]</div>
                <div className="text-white/70">Blocker: [Any blocker or &quot;None&quot;]</div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-brand-yellow font-bold">CLIENT NAME #2 — [Company Name]</div>
                <div className="text-white/70">Cycle: #1 | Day 7 of 28 | Bookings: 6 / 20 target | Health: 🟢</div>
                <div className="text-white/70">Status: On track. Averaging 0.86 bookings/day. CAPI firing correctly.</div>
                <div className="text-white/70">Action: Renewal conversation scheduled Day 22. No action needed this week.</div>
                <div className="text-white/70">Blocker: None</div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="text-red-400 font-bold">CLIENT NAME #3 — [Company Name] 🔴</div>
                <div className="text-white/70">Cycle: #2 | Day 18 of 28 | Bookings: 7 / 20 target | Health: 🔴</div>
                <div className="text-white/70">Status: 35% of target with 10 days left. Creative frequency 4.8 — fatigue confirmed.</div>
                <div className="text-white/70">Action: Post-Andromeda duplicate live as of Monday. Briefed Ken for full refresh if no recovery by Wed. Jonathan looped in.</div>
                <div className="text-white/70">Blocker: Client slow to provide new photo assets — followed up twice.</div>
              </div>
            </div>
          </div>
          <InfoBox type="warning" title="What Gets Called Out">
            Vague updates like &quot;accounts are doing well&quot; get addressed directly in review calls.
            Jonathan reads these before Tuesday/Friday calls. A specific update = a shorter, strategic call.
            A vague update = the entire call spent on basics.
          </InfoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="font-black text-xs text-green-800 mb-2">Strong Update Has:</div>
              <BulletList items={[
                'Every account — no skipping',
                'Exact day count (Day 14 of 28)',
                'Exact bookings vs target',
                'Named action steps with dates',
                'Blockers called out explicitly',
              ]} />
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="font-black text-xs text-red-800 mb-2">Weak Update Has:</div>
              <BulletList items={[
                '"All accounts doing well"',
                'Missing exact booking numbers',
                'No due dates on actions',
                '"Monitoring" with no specifics',
                'Red accounts buried or skipped',
              ]} />
            </div>
          </div>
        </div>
      </ExpandableCard>

      {/* Billing failures */}
      <div className="rounded-2xl border-2 border-red-400 bg-red-50 p-5">
        <div className="text-red-700 font-black text-xs uppercase tracking-widest mb-2">Non-Negotiable Protocol</div>
        <h3 className="text-red-900 font-black text-lg mb-3">Billing Failure — Call the Client Same Day</h3>
        <p className="text-red-800 text-sm mb-4">
          When a client&apos;s card declines or a billing failure pauses their ads, you pick up the phone immediately.
          Not Slack. Not email. <strong>Phone call, same day, no exceptions.</strong>
        </p>
        <div className="space-y-2">
          {[
            { step: 'Step 1', action: 'Identify the failure — Meta Ads Manager shows billing status. Ads paused = billing issue.' },
            { step: 'Step 2', action: 'Call the client within the hour. Every paused day = delayed lead volume = delayed cycle end = delayed billing.' },
            { step: 'Step 3', action: 'Guide them to update card or contact their bank to whitelist Meta charges. Stay on the call until resolved or a specific follow-up time is set.' },
            { step: 'Step 4', action: 'Confirm ads are running again in Meta before ending your day. Do not assume — verify.' },
            { step: 'Step 5', action: 'Log the billing failure and resolution in ClickUp. If it happens twice in one cycle, flag to Jonathan.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-3 bg-white rounded-lg p-3 border border-red-200">
              <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded self-start mt-0.5 flex-shrink-0">{s.step}</span>
              <span className="text-xs text-red-900">{s.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle renewal protocol */}
      <ExpandableCard title="Cycle Renewal Protocol" subtitle="5–7 days before end — never let a cycle expire unconfirmed">
        <div className="space-y-3">
          <InfoBox type="tip" title="The Golden Window">
            Renewals initiated 5–7 days before cycle end feel proactive and professional.
            Renewals initiated on Day 28 feel desperate and reactive. The timing signals your confidence.
          </InfoBox>
          <div className="space-y-2">
            {[
              {
                day: 'Day 21–22',
                action: 'Check Layer 1 — are you on track for 80%? If yes: prepare renewal conversation. If not: focus on hitting threshold first.',
                label: 'Assess',
              },
              {
                day: 'Day 22–23',
                action: 'Reach out to client: "We\'re on Day 22 and tracking well. I wanted to lock in Cycle X renewal now and show you what we\'re planning for the next push."',
                label: 'Initiate',
              },
              {
                day: 'Day 23–24',
                action: 'On renewal call: review results, confirm next cycle target, propose ad spend scale if CPB is healthy, request testimonial.',
                label: 'Confirm',
              },
              {
                day: 'Day 25',
                action: 'Renewal confirmed in writing (Slack or email). ClickUp task for Emmanuel to prep the next cycle setup.',
                label: 'Document',
              },
              {
                day: 'Day 28',
                action: 'Cycle ends with renewal already confirmed. No scrambling. Next cycle is ready to launch within 24 hours.',
                label: 'Launch-Ready',
              },
            ].map((r) => (
              <div key={r.day} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
                <div className="text-center min-w-[70px] flex-shrink-0">
                  <div className="text-[10px] font-black text-brand-gray uppercase tracking-widest">{r.day}</div>
                  <div className="text-xs font-black text-brand-black mt-0.5">{r.label}</div>
                </div>
                <p className="text-xs text-brand-gray">{r.action}</p>
              </div>
            ))}
          </div>
          <InfoBox type="warning">
            Never let a cycle expire without the next one confirmed. An expired cycle = client has to decide from scratch whether to keep going.
            A confirmed renewal = they never have the option to walk away without actively choosing to.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Revenue activities */}
      <ExpandableCard title="Revenue Activities — Every Successful Cycle" subtitle="Compounding income starts with these habits">
        <div className="space-y-2">
          {[
            {
              activity: 'Video Testimonial',
              when: 'Day 24–26, after cycle is confirmed successful',
              how: 'Request a short 60-second video. Use the Testimonial Request SOP. Genuine trust required — can\'t manufacture this.',
              value: 'Social proof for sales team',
            },
            {
              activity: 'Referral Ask',
              when: 'Same call as testimonial request',
              how: '"Do you know any other contractors who could use more booked appointments? Warm referrals from you close 3–5× faster."',
              value: '+$500 if the referral closes',
            },
            {
              activity: 'Upsell Proposal',
              when: 'When Layer 1 is consistently Green (3+ cycles)',
              how: 'Client crushing roofing? Propose a gutter or HVAC campaign. Two niches = two revenue streams for them.',
              value: 'Additional retainer + commission',
            },
            {
              activity: 'Ad Spend Scale',
              when: 'When cost per booking is healthy and CPB has room',
              how: '"Your CPB is $210 and you\'re hitting targets. If we push ad spend from $5K to $7K, we project 28+ bookings next cycle at roughly the same CPB."',
              value: '10% of monthly ad spend management fee',
            },
          ].map((item) => (
            <div key={item.activity} className="p-3 bg-brand-gray-light rounded-xl">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-black text-sm text-brand-black">{item.activity}</div>
                <span className="text-[10px] bg-brand-yellow px-2 py-0.5 rounded font-black flex-shrink-0 whitespace-nowrap">{item.when}</span>
              </div>
              <p className="text-xs text-brand-gray mb-1">{item.how}</p>
              <div className="text-[10px] font-black text-green-700 uppercase tracking-widest">{item.value}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Client communication standards */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Client Communication Standards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card border>
            <div className="font-black text-sm mb-3 text-green-700">Proactive (The Standard)</div>
            <BulletList check items={[
              'Update before they ask — they should never wonder',
              'Flag problems before they become crises',
              'Renewal initiated before cycle ends',
              'Billing failures get same-day phone calls',
              'Weekly Slack check-in even when green',
            ]} />
          </Card>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="font-black text-sm mb-3 text-red-700">Reactive (Never Acceptable)</div>
            <BulletList items={[
              'Waiting for client to message first',
              'Discovering problems from the client',
              'Last-minute renewal scramble',
              'Billing failures discovered days later',
              '"I was waiting for the review call"',
            ]} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            { label: 'Slack Response', sla: '5–30 min', note: 'During business hours. If on a call: post "In a call, back in 30 min."' },
            { label: 'Client Update', sla: 'Mon & Thu', note: 'Minimum twice weekly via #ops-manager-discussion. More for struggling accounts.' },
            { label: 'Problem Response', sla: 'Same day', note: 'Any account issue — action taken same day, update sent same day.' },
          ].map((s) => (
            <div key={s.label} className="bg-brand-gray-light rounded-xl p-3">
              <div className="font-black text-xs text-brand-gray uppercase tracking-widest mb-1">{s.label}</div>
              <div className="font-black text-xl text-brand-black mb-1">{s.sla}</div>
              <div className="text-xs text-brand-gray">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Handling difficult conversations */}
      <ExpandableCard title="Handling Difficult Conversations" subtitle="Client wants to cancel, results are low, discount requests">
        <div className="space-y-3">
          {DIFFICULT_CONVERSATIONS.map((conv) => (
            <div key={conv.scenario} className="bg-brand-gray-light rounded-xl p-4">
              <div className="font-black text-sm text-brand-black mb-2">{conv.scenario}</div>
              <div className="mb-2">
                <div className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Approach</div>
                <p className="text-xs text-brand-gray">{conv.approach}</p>
              </div>
              <div className="mb-2">
                <div className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Script</div>
                <div className="bg-brand-black rounded-lg p-3 text-xs text-white/80 italic">&ldquo;{conv.script}&rdquo;</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Escalate When</div>
                <p className="text-xs text-brand-gray">{conv.escalate}</p>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <InfoBox type="warning" title="The Ownership Mindset">
        Every account in your pod is yours. Not Emmanuel&apos;s, not Leila&apos;s, not Jonathan&apos;s.
        You coordinate specialists and escalate appropriately — but the outcome of every client relationship
        is your responsibility. <strong>Own the result. Own the problem. Own the renewal.</strong>
      </InfoBox>

    </SectionWrapper>
  );
}
