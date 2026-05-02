'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { OrgChart } from '@/components/Diagrams/OrgChart';

const PODS = [
  { label: 'Pod 1', managers: 'Gianmarco & Gregory', started: 'Mar 3, 2026', clients: '20–30', isYou: false },
  { label: 'Pod 2', managers: 'Cole & Tyler', started: 'Aug 2025', clients: '20–30', isYou: false },
  { label: 'Pod 3', managers: 'Kyle & Abdullah', started: 'Mar 25, 2026', clients: 'Building', isYou: false },
  { label: 'Pod 4', managers: 'Sam', started: 'Apr 14, 2026', clients: 'Onboarding', isYou: false },
  { label: 'Pod 5', managers: 'Ksenia & Adeen', started: 'May 4, 2026', clients: 'Onboarding', isYou: true },
];

const SPECIALISTS = [
  {
    name: 'Emmanuel',
    role: 'Full-Cycle Media Buyer (lead)',
    color: '#F5C800',
    bg: '#1A1400',
    handles: ['GHL full setup + A2P', 'Meta ad account structure', 'Account-specific doc', 'Campaign management'],
    howToTask: 'ClickUp task — include: client name, GHL sub-account link, 48hr deadline',
    note: 'More senior — all new setups go through Emmanuel first.',
  },
  {
    name: 'Mervin',
    role: 'Full-Cycle Media Buyer',
    color: '#4A90D9',
    bg: '#001020',
    handles: ['GHL setup support', 'Campaign management', 'Ongoing optimization', 'A/B testing'],
    howToTask: 'ClickUp task — same format as Emmanuel (client name, link, deadline)',
    note: 'Equal partner in builds — Emmanuel and Mervin both manage setup to launch.',
  },
  {
    name: 'Ken',
    role: 'Graphic Design & AI Creatives',
    color: '#22C55E',
    bg: '#001A0A',
    handles: ['Ad creative visuals', 'AI-generated content', 'Graphic assets', 'Creative iterations'],
    howToTask: 'Monday brief (for Thursday delivery) or Thursday brief (for Monday delivery) — see Creative Process section',
    note: 'Philippines timezone — creative-side ONLY. Plan 24–48hrs ahead.',
  },
  {
    name: 'Bren',
    role: 'Pod 2 Media Buyer',
    color: '#A78BFA',
    bg: '#0D0020',
    handles: ['Pod 2 Meta campaigns', 'Overflow support (when bandwidth allows)', 'Creative optimization'],
    howToTask: 'Ask Bren directly if you need overflow support — confirm bandwidth first',
    note: 'Primarily Pod 2. Available for other pods when capacity allows.',
  },
  {
    name: 'Leila, Aica & Pamela',
    role: 'VA Team — Speed to Lead',
    color: '#F97316',
    bg: '#1A0A00',
    handles: ['Calling leads within 5 min', 'Qualification survey follow-up', 'Appointment booking', 'Reminder calls'],
    howToTask: 'Escalate quality/speed issues to Leila — she manages the VA team',
    note: 'Speed to lead < 5 min is non-negotiable. Any quality issues → Leila immediately.',
  },
];

const ESCALATION = [
  { step: 'Small issues', who: 'Handle yourself', detail: 'Creative brief delays, minor KPI dips — diagnose and coordinate' },
  { step: 'Specialist issue', who: 'Direct ClickUp task', detail: 'Setup delays, campaign problems — task Emmanuel/Mervin with deadline' },
  { step: 'VA quality / speed', who: 'Escalate to Leila', detail: 'Speed > 5 min, wrong qualification, booking errors' },
  { step: 'Client at risk of churn', who: 'Inform Jonathan immediately', detail: 'Jonathan runs review calls — he needs to know before the client calls him' },
  { step: 'Unresolved after 48hr', who: 'Jonathan', detail: 'Any blocker that affects a client outcome and isn\'t resolved must go up' },
];

export function S07_OrgStructure() {
  return (
    <SectionWrapper sectionId={7}>

      {/* Org chart */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Company Structure</h3>
        <Card border>
          <OrgChart />
        </Card>
      </div>

      {/* Pod grid */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">All 5 Pods — Current Status</h3>
        <div className="space-y-2">
          {PODS.map((pod) => (
            <div
              key={pod.label}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={pod.isYou
                ? { backgroundColor: '#F5C800', border: '2px solid #F5C800' }
                : { backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
            >
              <div
                className="font-black text-sm w-14 flex-shrink-0"
                style={{ color: pod.isYou ? '#111' : '#111' }}
              >{pod.label}</div>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: pod.isYou ? '#111' : '#111' }}>{pod.managers}</div>
                <div className="text-xs" style={{ color: pod.isYou ? '#11110088' : '#6B7280' }}>Started {pod.started}</div>
              </div>
              <div className="text-right">
                <div className="font-black text-sm" style={{ color: pod.isYou ? '#111' : '#111' }}>{pod.clients}</div>
                <div className="text-[10px]" style={{ color: pod.isYou ? '#11110088' : '#9CA3AF' }}>clients</div>
              </div>
              {pod.isYou && (
                <div className="bg-brand-black text-brand-yellow text-[10px] font-black px-2 py-0.5 rounded ml-1">YOU</div>
              )}
            </div>
          ))}
        </div>
        <div className="text-xs text-brand-gray/60 mt-2 text-center">Target: 25 accounts per pod × 5 pods = $1M/month</div>
      </div>

      {/* What you are / aren't */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Role — The Quarterback</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-brand-gray-mid p-4">
            <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-3">You Are NOT</div>
            {['A landing page builder', 'A Meta ads specialist', 'A GHL technician', 'A VA manager', 'A busy-work doer'].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs text-brand-gray mb-1.5">
                <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span><span>{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-brand-yellow p-4">
            <div className="font-black text-xs uppercase tracking-widest text-brand-black/60 mb-3">You ARE</div>
            {['A pod leader (20–30 accounts)', 'A client relationship owner', 'A KPI diagnostician', 'A specialist coordinator', 'A revenue retention engine'].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs text-brand-black mb-1.5">
                <span className="text-brand-black/60 flex-shrink-0 mt-0.5">▸</span><span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialists */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Specialist Team — How to Work With Each</h3>
        <div className="space-y-2">
          {SPECIALISTS.map((s) => (
            <div key={s.name} className="rounded-xl overflow-hidden" style={{ backgroundColor: s.bg, border: `1px solid ${s.color}33` }}>
              <div className="flex items-start gap-3 px-4 py-3">
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black"
                  style={{ backgroundColor: s.color, color: '#111' }}
                >{s.name.charAt(0)}</div>
                <div>
                  <div className="font-black text-sm text-white">{s.name}</div>
                  <div className="text-xs font-bold" style={{ color: s.color }}>{s.role}</div>
                  <div className="text-[10px] text-white/40 mt-0.5 italic">{s.note}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 px-4 pb-3">
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Handles</div>
                  {s.handles.map((h) => (
                    <div key={h} className="text-xs text-white/60 flex items-start gap-1 mb-1">
                      <span style={{ color: s.color }} className="flex-shrink-0">▸</span><span>{h}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">How to Task</div>
                  <div className="text-xs text-white/60 leading-relaxed">{s.howToTask}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation path */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Escalation Path</h3>
        <div className="space-y-1">
          {ESCALATION.map((e, i) => (
            <div key={e.step} className="flex items-stretch gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                {i < ESCALATION.length - 1 && <div className="w-0.5 flex-1 bg-brand-gray-mid my-1" />}
              </div>
              <div className="bg-white rounded-xl border border-brand-gray-mid px-3 py-2 flex-1 mb-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-black text-xs text-brand-black">{e.step}</span>
                  <span className="text-[10px] font-bold text-brand-yellow bg-brand-black px-2 py-0.5 rounded">{e.who}</span>
                </div>
                <div className="text-xs text-brand-gray">{e.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="The Quarterback Analogy">
        You call the plays and coordinate execution. Specialists run the routes. <strong>You own the outcome — not the tasks.</strong> If a client underperforms, the question is: did you diagnose it and coordinate the right fix in time?
      </InfoBox>
    </SectionWrapper>
  );
}
