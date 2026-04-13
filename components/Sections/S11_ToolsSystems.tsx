'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const TOOLS = [
  { name: 'Slack', category: 'Communication', priority: 'Day 1', icon: '💬', desc: 'Primary communication hub. All internal comms, client updates, team coordination. Your lifeline.', fluency: 'Must be fluent' },
  { name: 'ClickUp', category: 'Project Management', priority: 'Day 1', icon: '✅', desc: 'Task management for ALL specialist coordination. Create tasks for Emmanuel (setup, A2P), Ken (creatives), Mervin. Always include: client details, GHL link, and 48hr deadline. This is how work gets assigned — not via Slack DM.', fluency: 'Must be fluent' },
  { name: 'GoHighLevel', category: 'CRM + Automation', priority: 'Week 1', icon: '⚙️', desc: 'Central CRM hub. Client funnels, automations, pipelines, appointment calendars. The nerve center of delivery.', fluency: 'Must understand navigation' },
  { name: 'Meta Ads Manager', category: 'Paid Media', priority: 'Week 2', icon: '📢', desc: 'Where campaigns live. Monitor performance, review metrics, understand what Emmanuel is managing.', fluency: 'Must read data' },
  { name: 'Fathom', category: 'Call Recording', priority: 'Week 1', icon: '🎙️', desc: 'Call recording and transcription. All pod calls visible to all team members. Use for training and review.', fluency: 'Enable team visibility setting' },
  { name: 'Google Workspace', category: 'Productivity', priority: 'Day 1', icon: '📊', desc: 'Docs, Sheets, Drive for reporting and documentation.', fluency: 'Standard use' },
  { name: 'BambooHR', category: 'HR', priority: 'Day 1', icon: '🌿', desc: 'HR management, time tracking, onboarding documentation.', fluency: 'Standard use' },
  { name: 'Canva', category: 'Design', priority: 'Nice to have', icon: '🎨', desc: 'Creative asset edits. Primarily used by Ken, but helpful for quick edits.', fluency: 'Basic understanding' },
  { name: 'Loom', category: 'Async Video', priority: 'Week 1', icon: '📹', desc: 'Async walkthroughs, training videos, and client update recordings.', fluency: 'Able to record and share' },
  { name: 'Cloudflare', category: 'DNS', priority: 'Background', icon: '🌐', desc: 'Domain DNS management. Used during technical setup. Emmanuel manages.', fluency: 'Awareness only' },
];

const INTERNAL = [
  { name: 'Logbook', desc: 'Central truth for ALL lead data — every lead from every account documented by VAs with status and notes. Access via Leila (not Jonathan). Check daily for open (white) leads.', icon: '📓' },
  { name: 'Account Master Dashboard', desc: 'Real-time account performance and cycle metrics. Track cycle #, days elapsed, bookings vs target, and billing status. Cole built and maintains this system.', icon: '📊' },
  { name: 'Command Center', desc: 'Health score dashboard — your daily triage. Color-coded: 🟢 Healthy (monthly check-in) / 🟡 Watch / 🟠 Act Now / 🔴 Escalate to Jonathan. Accounts behind on bookings turn RED.', icon: '🖥️' },
  { name: 'Custom GPT', desc: 'Paste Fathom transcript after every onboarding call → get structured client summary → post to #post-onboarding-discussion → use for ClickUp task to Emmanuel.', icon: '🤖' },
];

const PROFICIENCY = [
  { timeline: 'Day 1', requirement: 'Slack & ClickUp — fully fluent', color: 'bg-brand-yellow text-brand-black' },
  { timeline: 'Week 1', requirement: 'GoHighLevel navigation & structure', color: 'bg-brand-black text-white' },
  { timeline: 'Week 2', requirement: 'Meta Ads Manager — read and interpret data', color: 'bg-brand-gray-mid text-brand-black' },
  { timeline: 'Week 3', requirement: 'How all systems connect together', color: 'bg-brand-gray-light text-brand-black border border-brand-gray-mid' },
];

export function S11_ToolsSystems() {
  return (
    <SectionWrapper sectionId={11}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Your Tech Stack</div>
        <h2 className="text-xl font-black text-white mb-2">Tools & Systems Overview</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          You don&apos;t need to be a technical expert in all of these tools.
          But you need to know what each does, when to use it, and who to coordinate for technical tasks.
        </p>
      </Card>

      {/* Proficiency timeline */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Proficiency Timeline</h3>
        <div className="space-y-2">
          {PROFICIENCY.map((p) => (
            <div key={p.timeline} className={`rounded-xl p-4 flex items-center gap-4 ${p.color}`}>
              <div className={`font-black text-xs uppercase tracking-widest flex-shrink-0 ${p.color.includes('text-white') ? 'text-brand-yellow' : ''}`}>
                {p.timeline}
              </div>
              <div className={`font-bold text-sm ${p.color.includes('text-white') ? 'text-white' : ''}`}>
                {p.requirement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal dashboards */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Internal Software & Dashboards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTERNAL.map((tool) => (
            <div key={tool.name} className="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-brand-black">
              <span className="text-2xl flex-shrink-0">{tool.icon}</span>
              <div>
                <div className="font-black text-sm">{tool.name}</div>
                <div className="text-xs text-brand-gray mt-0.5">{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All tools grid */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Full Tools Overview</h3>
        <div className="space-y-2">
          {TOOLS.map((tool) => (
            <ExpandableCard
              key={tool.name}
              title={tool.name}
              subtitle={`${tool.category} · ${tool.priority}`}
              icon={<span>{tool.icon}</span>}
            >
              <div className="space-y-2">
                <p className="text-sm text-brand-gray">{tool.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-black">Proficiency required:</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    tool.priority === 'Day 1' ? 'bg-brand-yellow text-brand-black' :
                    tool.priority === 'Week 1' ? 'bg-brand-black text-white' :
                    tool.priority === 'Week 2' ? 'bg-orange-100 text-orange-700' :
                    'bg-brand-gray-light text-brand-gray'
                  }`}>
                    {tool.fluency}
                  </span>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </div>

      {/* What's next CTA */}
      <Card yellow>
        <div className="text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h3 className="font-black text-xl mb-2">You&apos;re Almost Done!</h3>
          <p className="text-sm text-brand-black/70 mb-4">Complete the knowledge check below to finish your onboarding.</p>
          <div className="text-left space-y-1">
            {[
              'Day 1: Company foundations, system access, meet the team',
              'Day 2: GHL service delivery deep dive, do ONE training setup',
              'Day 3: First account audit — Layer 1 → Layer 2 framework',
              'Day 4: First Monday/Thursday status update, cycle management',
              'Day 5: Meta ad rules, creative standards, ad set reviewer',
              'Day 6–7: VA management, Logbook, first review call',
              'Day 8–9: Revenue activities, client comms, creative refresh protocol',
              'Day 10: Fully operational — final self-assessment',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-5 h-5 rounded-full bg-brand-black text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <InfoBox type="success" title="Welcome to Contractors Ignite">
        You were chosen because you demonstrated the right mindset, potential for leadership, and commitment to outcomes.
        <strong> Now it&apos;s time to prove it. Let&apos;s build something extraordinary together.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
