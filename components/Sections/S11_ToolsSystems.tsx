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
  { name: 'Porkbun', category: 'Domain Registrar', priority: 'Background', icon: '🐷', desc: 'Domain registrar for client domains. Technical setup — Emmanuel manages.', fluency: 'Awareness only' },
];

const INTERNAL = [
  { name: 'Command Center', desc: 'Your #1 daily tool. Open this every morning — it\'s your entire account health dashboard. Color-coded: 🟢 Healthy / 🟡 Watch / 🟠 Act Now / 🔴 Escalate to Jonathan. The Logbook (all lead data) is accessible directly from within the Command Center.', icon: '🖥️', core: true },
  { name: 'Client Check-In Sheet', desc: 'Shared Google Sheet where you log every client\'s cycle status, health color, and billing state after every onboarding call and every Monday/Thursday. Jonathan and Oscar monitor this across all pods — keep it current.', icon: '📋', core: true },
  { name: 'ClickUp', desc: 'All specialist coordination happens here — setup tasks for Emmanuel, creative tasks for Ken, support tasks for Mervin. Always include: client name, GHL sub-account link, specific deadline. No ClickUp task = no work gets done.', icon: '✅', core: true },
  { name: 'Logbook', desc: 'Central truth for ALL lead data. Accessible from within the Command Center. VAs document every lead with status and notes. Check daily for open (white) leads that need VA follow-up. Access granted by Leila.', icon: '📓', core: false },
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
            <div key={tool.name} className="flex items-start gap-3 p-4 bg-white rounded-xl" style={{ border: tool.core ? '2px solid #111' : '1px solid #E5E7EB' }}>
              <span className="text-2xl flex-shrink-0">{tool.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="font-black text-sm">{tool.name}</div>
                  {tool.core && <span className="text-[9px] font-black uppercase tracking-widest bg-brand-black text-brand-yellow px-1.5 py-0.5 rounded">Core</span>}
                </div>
                <div className="text-xs text-brand-gray">{tool.desc}</div>
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

      {/* 10-day worksheet removed — use the Worksheet tab for the full day-by-day plan */}
      {false && <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your 10-Day Onboarding Worksheet</h3>
        <div className="space-y-3">
          {[
            {
              day: 1,
              title: 'Foundation Day',
              subtitle: 'Company foundations, system access, team intros',
              tasks: [
                'Request Logbook access from Leila (NOT Jonathan)',
                'Confirm ClickUp access and understand task structure',
                'Get added to Slack channels: #internal-team, #ops, #closer-call-recordings, #post-onboarding-discussion',
                'Log into GHL — confirm sub-account access',
                'Log into Meta Ads Manager — confirm partner access',
                'Access Account Master Dashboard and Command Center',
                'Message Emmanuel, Leila, and Ken in Slack — introduce yourself',
                'Watch Service Delivery Part 2 recording',
              ],
              color: 'border-brand-yellow bg-brand-yellow-light',
            },
            {
              day: 2,
              title: 'Service Delivery Deep Dive',
              subtitle: 'GHL builds, A2P, your one training setup',
              tasks: [
                'Complete ONE training GHL sub-account setup with Emmanuel',
                'Watch Emmanuel submit A2P via GHL A2P Wizard — understand the process',
                'Review the Service Delivery SOP — know where it lives',
                'Navigate GHL: sub-account view, contacts, automation builder, calendar',
                'Navigate the Logbook: filter by account, understand status columns',
                'Navigate Command Center: understand health color logic',
                'Task all future setups to Emmanuel via ClickUp — never set up again yourself',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 3,
              title: 'First Account Deep Dive',
              subtitle: 'Layer 1 → Layer 2, diagnosing your first real account',
              tasks: [
                'Open Command Center — identify green, yellow, orange, red accounts',
                'For red/orange: open Logbook, count open leads, check booking rate',
                'Calculate cost per booking for each account: ad spend ÷ booked appointments',
                'Confirm all campaigns are named with "B2C" (required for dashboard tracking)',
                'Identify which accounts have CAPI set up vs not — task Emmanuel for any missing',
                'Send intro message to each active client',
                'Pull closer call recordings for any new clients',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 4,
              title: 'Operating Rhythm',
              subtitle: 'Status updates, review calls, cycle management',
              tasks: [
                'Post your first Monday/Thursday status update: per account — name, cycle #, days elapsed, bookings vs target, health color, action steps with dates',
                'Know your billing window for each active account',
                'Initiate renewal conversations 5–7 days before any cycle end',
                'Document all cycle dates in Account Master Dashboard',
                'If any billing failure exists: CALL the client same day',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 5,
              title: 'Creative & Advertising',
              subtitle: 'Meta ad rules, creative standards, what you approve',
              tasks: [
                'Memorize the 6 approved placements: FB Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels',
                'Review Ad Set Reviewer at ad-set-reviewer.vercel.app',
                'Verify Advantage+ is OFF on all active campaigns (Meta re-enables after duplication)',
                'Confirm "B2C" appears in every campaign name',
                'Task Ken via ClickUp for any needed AI creatives — include brand info, market, reference images',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 6,
              title: 'VA Management & Logbook',
              subtitle: 'Working with Leila\'s team, lead quality, Logbook discipline',
              tasks: [
                'Check Logbook daily for open (white) leads',
                'Confirm VA response time is <5 min — escalate issues to Leila with specific lead examples',
                'Check OSA rate in Logbook — if >20%, audit targeting vs Account Specific Doc',
                'Post account-specific notes in #internal-team for any targeting or quality updates',
                'Understand live transfer process: VA transfers live to client\'s sales rep',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 7,
              title: 'First Review Call',
              subtitle: 'Prepare and present to Jonathan',
              tasks: [
                'Update Slack status by 9 AM (day before the call)',
                'Know current status of every account before the call',
                'Have specific action steps WITH dates ready — not just a report',
                'Layer 1 metrics ready for every account: bookings vs target, health color, cost per booking',
                'Flag any accounts needing deeper discussion — never bury problems',
                'After call: execute all flagged action items same day',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 8,
              title: 'Revenue Activities',
              subtitle: 'Renewals, testimonials, referrals, upsells',
              tasks: [
                'Ask every client who hit target for a written or video testimonial',
                'Ask happy clients if they know other contractors who could benefit',
                'Propose higher ad spend to clients with healthy cost per booking',
                'For any account in Week 3–4: initiate renewal conversation proactively',
                'Apply 24–48 hour rule: every client blocker resolved or escalated within 48 hours',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 9,
              title: 'Creative Refresh Protocol',
              subtitle: 'Post-Andromeda framework — what to do when performance drops',
              tasks: [
                'For any declining account: check context first (holiday? <7 days in campaign?)',
                'Check Layer 1 — if bookings on track, do not touch anything',
                'If creative fatigue: duplicate ad set → turn off top-reach ads → launch new set → wait 48h',
                'Only if Step 1 fails: do a full creative refresh — new photos, nothing reused',
                'Verify CAPI is set up on every active account',
                'Backfill CAPI on any accounts that were missing it',
              ],
              color: 'border-brand-gray-mid bg-white',
            },
            {
              day: 10,
              title: 'Friday Review + 10-Day Wrap',
              subtitle: 'Full account review, self-assessment, fully operational',
              tasks: [
                'Present all accounts — show movement since Tuesday\'s call',
                'Highlight wins: launched accounts, targets hit, positive client feedback',
                'I can run a client onboarding call independently',
                'I know how to diagnose using Layer 1 → Layer 2 framework',
                'I never confuse CPL with cost per booking',
                'I check the Logbook daily for open leads',
                'I know the 6 approved Meta placements',
                'I know A2P is a GHL process, not Meta',
                'I initiate renewals before cycles expire',
                'I know when to escalate to Jonathan vs handle independently',
              ],
              color: 'border-brand-black bg-brand-black',
              dark: true,
            },
          ].map((day) => (
            <div key={day.day} className={`rounded-xl border-2 overflow-hidden ${day.color}`}>
              <div className={`px-4 py-3 flex items-center gap-3 ${day.dark ? '' : ''}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  day.dark ? 'bg-brand-yellow text-brand-black' : 'bg-brand-black text-white'
                }`}>
                  {day.day}
                </div>
                <div>
                  <div className={`font-black text-sm ${day.dark ? 'text-white' : ''}`}>{day.title}</div>
                  <div className={`text-xs ${day.dark ? 'text-white/60' : 'text-brand-gray'}`}>{day.subtitle}</div>
                </div>
              </div>
              <div className={`px-4 pb-3 border-t ${day.dark ? 'border-white/10' : 'border-brand-gray-mid/50'}`}>
                <div className="pt-3 space-y-1.5">
                  {day.tasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className={`mt-0.5 flex-shrink-0 ${day.dark ? 'text-brand-yellow' : 'text-brand-gray'}`}>▸</span>
                      <span className={day.dark ? 'text-white/80' : ''}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
      {/* ClickUp task templates */}
      <ExpandableCard title="ClickUp Task Templates — Use These Every Time" subtitle="Standard formats for Emmanuel, Ken, and Mervin tasks">
        <div className="space-y-4">
          <div className="bg-brand-black rounded-xl p-4 font-mono text-xs">
            <div className="text-brand-yellow font-black text-sm mb-3 font-sans">📋 Emmanuel — Setup + A2P Task</div>
            <div className="text-white/80 space-y-1">
              <div><span className="text-brand-yellow">Task:</span> [CLIENT NAME] — GHL Setup + A2P</div>
              <div><span className="text-brand-yellow">Assignee:</span> Emmanuel | <span className="text-brand-yellow">Due:</span> [48hr deadline] | <span className="text-brand-yellow">Priority:</span> High</div>
              <div className="mt-2 text-white/60">---</div>
              <div><span className="text-brand-yellow">Client Name:</span> [Full name]</div>
              <div><span className="text-brand-yellow">GHL Sub-Account:</span> [Link]</div>
              <div><span className="text-brand-yellow">Niche:</span> Roofing / HVAC / Gutters</div>
              <div><span className="text-brand-yellow">Service Area:</span> [City, State + radius or zip codes]</div>
              <div><span className="text-brand-yellow">Ad Spend:</span> $[X]/day</div>
              <div><span className="text-brand-yellow">Target:</span> [X bookings/cycle]</div>
              <div><span className="text-brand-yellow">Assets:</span> [Google Drive link]</div>
              <div><span className="text-brand-yellow">Notes:</span> [Client preferences from onboarding call]</div>
              <div className="mt-2 text-red-400">⚠️ A2P = GHL registration (not Meta). Use A2P Wizard.</div>
            </div>
          </div>

          <div className="bg-brand-black rounded-xl p-4 font-mono text-xs">
            <div className="text-brand-yellow font-black text-sm mb-3 font-sans">🎨 Ken — Creative Request Task</div>
            <div className="text-white/80 space-y-1">
              <div><span className="text-brand-yellow">Task:</span> [CLIENT NAME] — Creative Set (Full Refresh)</div>
              <div><span className="text-brand-yellow">Assignee:</span> Ken | <span className="text-brand-yellow">Due:</span> [24hr — Philippines TZ] | <span className="text-brand-yellow">Priority:</span> High</div>
              <div className="mt-2 text-white/60">---</div>
              <div><span className="text-brand-yellow">Brand Info:</span> [Company name, colors, logo link]</div>
              <div><span className="text-brand-yellow">Market:</span> [City/region — match local house styles]</div>
              <div><span className="text-brand-yellow">Niche:</span> Roofing / HVAC / Gutters</div>
              <div><span className="text-brand-yellow">Reference Images:</span> [Google Drive link]</div>
              <div><span className="text-brand-yellow">Format:</span> 5 Singles + 5 Two-Folds + 5 Tri-Folds = 15 total</div>
              <div className="mt-2 text-red-400">⚠️ No reused photos. No jumbled text. No twins. Logos must be perfect.</div>
            </div>
          </div>

          <div className="bg-brand-black rounded-xl p-4 font-mono text-xs">
            <div className="text-brand-yellow font-black text-sm mb-3 font-sans">📧 Pre-Onboarding Email to Client</div>
            <div className="text-white/80 space-y-1">
              <div><span className="text-brand-yellow">Subject:</span> Getting Ready for Your Onboarding Call — [Client Name]</div>
              <div className="mt-2">Hey [Client],</div>
              <div className="mt-1">Looking forward to our call on [Date/Time]. To hit the ground running:</div>
              <div className="mt-1">✅ Facebook Business Manager access (admin or partner)</div>
              <div>✅ Facebook Page access</div>
              <div>✅ Company logo (PNG or SVG)</div>
              <div>✅ 5–10 photos: team, trucks, or completed jobs</div>
              <div>✅ Service area: zip codes or radius</div>
              <div>✅ Primary day-to-day contact</div>
              <div className="mt-1">See you then — [Your Name]</div>
            </div>
          </div>
        </div>
      </ExpandableCard>

      {/* Glossary */}
      <ExpandableCard title="Key Terms Glossary" subtitle="Terms that confused Pod 1 managers in their first month">
        <div className="space-y-2">
          {[
            { term: 'A2P / 10DLC', def: 'GoHighLevel phone number registration. NOT Meta. Emmanuel handles via GHL A2P Wizard. Rejection = 2–3 weeks lockout.' },
            { term: 'CAPI', def: 'Conversion API. Sends booked appointment data from GHL back to Meta pixel. Tells Meta what a qualified lead looks like.' },
            { term: 'Andromeda', def: 'Meta AI update that concentrates spend on top-performing ads. Causes creative fatigue faster at scale.' },
            { term: 'Layer 1 / Layer 2', def: 'L1 = bookings vs target (outcome). L2 = CPC, CTR, conversion rate (diagnostics). Only check L2 if L1 is failing.' },
            { term: 'Logbook', def: 'Central spreadsheet for all leads. VAs document every lead with status and notes. Access granted by Leila.' },
            { term: 'Command Center', def: 'Dashboard showing account health by color. Open every morning for daily triage.' },
            { term: 'Cost per Booking', def: 'Ad spend ÷ booked appointments. NOT cost per lead. This is what you report. Always.' },
            { term: 'B2C (Campaign Keyword)', def: 'Must be in every Meta campaign name. Account Master Dashboard only tracks "B2C" campaigns.' },
            { term: 'OSA (Out of Service Area)', def: 'Lead outside client\'s agreed service area. > 20% = targeting issue. Cross-check Meta vs account-specific doc.' },
            { term: 'Speed to Cashflow', def: 'Days from signed contract to first payment. Company average: 75–80 days. Your target: 60 or less.' },
            { term: 'Pixel Conditioning', def: 'Manually sending qualified booking data to Meta CAPI via GHL automation. Trains the algorithm on real buyers.' },
            { term: '80% Rule', def: 'Deliver 80% of agreed booking target before billing. 20 agreed → 16 minimum. Cycle extends at no charge until hit.' },
            { term: 'Death Valley', def: 'Days 7–21 after launch — where 60% of client churn originates. Highest-priority window for your first 2 cycles.' },
          ].map((item) => (
            <div key={item.term} className="flex items-start gap-3 p-2 bg-brand-gray-light rounded-lg">
              <div className="font-black text-xs text-brand-black min-w-[120px] flex-shrink-0">{item.term}</div>
              <div className="text-xs text-brand-gray">{item.def}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <Card yellow>
        <div className="text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h3 className="font-black text-xl mb-2">You&apos;re Almost Done!</h3>
          <p className="text-sm text-brand-black/70">Complete the knowledge check below to finish this section.</p>
        </div>
      </Card>

      <InfoBox type="success" title="Welcome to Roof Ignite">
        You were chosen because you demonstrated the right mindset, potential for leadership, and commitment to outcomes.
        <strong> Now it&apos;s time to prove it. Let&apos;s build something extraordinary together.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
