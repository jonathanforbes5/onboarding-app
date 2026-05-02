'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const PHASES = [
  { num: 1, title: 'Lead Comes In', owner: 'Michael Dallara (B2B Ads)', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 2, title: 'Sales Call', owner: "Mani's Team (Closers + Setters)", color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 3, title: 'Client Closed', owner: 'Closers → Pod Assignment', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 4, title: 'Onboarding Call', owner: 'YOU — sets the entire tone', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 5, title: 'Infrastructure Build', owner: 'Emmanuel (lead) + Mervin — you track daily', color: 'bg-brand-black border-brand-black', text: 'text-white' },
  { num: 6, title: 'Launch Campaigns', owner: 'Emmanuel activates — you confirm every detail', color: 'bg-brand-gray-light border-brand-gray-mid', text: 'text-brand-black' },
  { num: 7, title: 'Ongoing Optimization', owner: 'YOU own every outcome — specialists support', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 8, title: 'Cycle Completion', owner: 'YOU verify results + bill', color: 'bg-brand-yellow border-brand-yellow', text: 'text-brand-black', highlight: true },
  { num: 9, title: 'Renewal', owner: 'YOU secure the next cycle', color: 'bg-brand-black border-brand-black', text: 'text-white' },
];

export function S06_ServiceDelivery() {
  return (
    <SectionWrapper sectionId={6}>

      {/* Role overview */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Your Role</div>
        <h2 className="text-xl font-black text-white mb-3">You Own the Client Experience — Fully</h2>
        <p className="text-white/70 text-sm leading-relaxed mb-3">
          Once a client is closed, <strong className="text-white">you take full ownership</strong>. You run the onboarding call, coordinate the build,
          manage launch, drive optimization, close the cycle, and secure renewal.
          You are the client&apos;s single point of contact from day one.
        </p>
        <p className="text-white/70 text-sm leading-relaxed">
          Specialists support you — Emmanuel and Mervin handle the technical build, Ken handles creatives, Bren handles media buying (primarily Pod 2, with bandwidth for more), the VA team manages speed-to-lead — but <strong className="text-brand-yellow">the outcome is always on you</strong>. When something is underperforming, it's your job to identify it, coordinate the fix, and follow through. You direct, they execute.
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
      <ExpandableCard title="Service Delivery Setup — Infrastructure Build" subtitle="Emmanuel (lead, more senior) + Mervin — equals building the full setup in 5–10 business days">
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
            { label: 'Entire GHL Build Start to Finish', badge: 'MOST RECENT', desc: 'The most up-to-date walkthrough of the complete sub-account build. Watch this to understand the full picture — even though Emmanuel handles the execution.', url: 'https://fathom.video/share/VG-nsEXiRvRP-7oyMY1VxcVET743mMs8' },
            { label: 'New Onboarding Process Call — Apr 30', badge: 'ESSENTIAL', desc: 'Jonathan walks all pod managers through the updated onboarding flow, comp structure, and expectations. Watch this first.', url: 'https://fathom.video/share/9JhnQ7WvdHRKUgsnCyVkbzjKxeK-o_78' },
            { label: 'Creative Audit — Oscar & Kyle', badge: 'MUST WATCH', desc: 'Oscar conducts a live creative audit for a client account, sharing insights with Kyle. Learn how to analyze ad creative performance, identify what\'s working, and what needs fixing.', url: 'https://www.loom.com/share/4c73ce9ede374abf8eac9158af79ea17' },
            { label: 'Service Delivery Part 1', badge: null, desc: 'GHL setup walkthrough — how the sub-account build works from start to finish.', url: 'https://fathom.video/share/uZeCCaxRRVumFq_K6yHx_tbN75iRaMaX' },
            { label: 'Service Delivery Part 2', badge: null, desc: 'Earlier service delivery walkthrough — reference alongside Part 1 for full context.', url: 'https://fathom.video/share/G9juWT1oFG_3CrppLscPDXceijJvP_rR' },
            { label: 'Roofing Onboarding Call', badge: null, desc: 'Real roofing client onboarding. Primary niche (80–90% of clients) — study this carefully.', url: 'https://fathom.video/share/qj9AYoqURQ6jhx34jFRZiR2-xESYDswF' },
            { label: 'HVAC Onboarding Call', badge: null, desc: 'HVAC-specific nuances — different pain points and seasonality vs roofing.', url: 'https://fathom.video/share/VYz9GhzfjBBj1YuVUPLXLdbVz6UkW4Pd' },
            { label: 'Gutter Onboarding Call', badge: null, desc: 'Gutter client onboarding. Note: gutters require 2–3× booking volume vs roofing to be profitable.', url: 'https://fathom.video/share/yNyAaNPjWJdhj-zps7GYjpziqpCsBhN_' },
          ].map((rec) => (
            <a key={rec.label} href={rec.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-xl border-2 border-brand-gray-mid bg-white hover:border-brand-black hover:shadow-sm transition-all group">
              <span className="text-lg mt-0.5 flex-shrink-0">🎥</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{rec.label}</span>
                  {rec.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-brand-black text-brand-yellow uppercase tracking-wider">{rec.badge}</span>
                  )}
                </div>
                <div className="text-xs text-brand-gray mt-0.5">{rec.desc}</div>
              </div>
              <span className="text-brand-gray group-hover:text-brand-black text-xs flex-shrink-0 mt-1">↗</span>
            </a>
          ))}
          <a href="https://docs.google.com/document/d/10aoaz3edxvQBsDrwPsHjEO2CgZa0FPA8KltuXDf-IeQ/edit" target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl border-2 border-brand-yellow bg-brand-yellow/5 hover:border-brand-black hover:shadow-sm transition-all group">
            <span className="text-lg mt-0.5 flex-shrink-0">📋</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Onboarding Flow SOP</span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-brand-black text-brand-yellow uppercase tracking-wider">REQUIRED</span>
              </div>
              <div className="text-xs text-brand-gray mt-0.5">Full written onboarding process SOP — step-by-step from client close to launch. Know this inside out.</div>
            </div>
            <span className="text-brand-gray group-hover:text-brand-black text-xs flex-shrink-0 mt-1">↗</span>
          </a>
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
              { week: 'Week 1', action: 'Launch & monitor. Let the pixel gather data — don\'t touch campaigns yet. Your job: confirm everything is running correctly.', who: 'You monitor — Emmanuel activates' },
              { week: 'Week 2–3', action: 'Identify early patterns. Diagnose Layer 1 data — bookings on pace? Cost per booking acceptable?', who: 'You own the diagnosis' },
              { week: 'Week 3', action: 'Scale winning ad sets. Kill non-performers. If creative is the issue, brief Ken (creative only) for refreshes.', who: 'You direct — specialists execute' },
              { week: 'Week 4', action: 'Prepare cycle review. Compile full results for client, document learnings, prepare billing.', who: 'You' },
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

      {/* Command Centre */}
      <ExpandableCard title="Command Centre — Your Primary Workspace" subtitle="This is where you work from every day — not just a dashboard">
        <div className="space-y-3">
          <InfoBox type="warning" title="Non-Negotiable">
            The Command Centre is your primary tool. Every account status, every action item, every flag lives here. If you&apos;re not in Command Centre daily, you are not managing your accounts — you&apos;re reacting to them.
          </InfoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { item: 'Account Health Colors', desc: 'Green / Yellow / Red — know every account\'s status before you open Slack or GHL.' },
              { item: 'Daily Check-In', desc: 'Open every morning. Review all accounts before any client communications.' },
              { item: 'Action Items', desc: 'Everything flagged for follow-up lives here. Don\'t let items go stale.' },
              { item: 'Booking Pace Tracker', desc: 'Are you on track for each client\'s target? Know this in real time.' },
              { item: 'VA Logbook Access', desc: 'Open (white) leads — nothing should sit unresolved. Check daily.' },
              { item: 'Cycle Status', desc: 'How far through the 28-day cycle is each account? Know before your calls.' },
            ].map((item) => (
              <div key={item.item} className="flex items-start gap-2 p-2 bg-brand-gray-light rounded-lg">
                <span className="text-brand-yellow mt-0.5 flex-shrink-0">★</span>
                <div>
                  <div className="font-bold text-xs">{item.item}</div>
                  <div className="text-xs text-brand-gray">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl border-2 border-brand-yellow bg-brand-yellow/5">
            <div className="font-black text-xs uppercase tracking-widest text-brand-black mb-2">📄 PDF Training — Complete This</div>
            <p className="text-sm text-brand-gray mb-2">
              There is a full PDF training guide for the Command Centre — go through it completely before your first week of active account management. Knowing this tool deeply separates reactive managers from proactive ones.
            </p>
            <p className="text-xs text-brand-gray">Ask Jonathan or check the Resources tab for the Command Centre PDF training document.</p>
          </div>
        </div>
      </ExpandableCard>

      {/* Creatives & Content */}
      <ExpandableCard title="Creatives & Organic Content — Why It Matters" subtitle="Creative quality is the #1 lever you can pull — don't neglect it">
        <div className="space-y-3">
          <Card dark>
            <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The Creative Rule</div>
            <p className="text-white/80 text-sm leading-relaxed">
              Creative is the single biggest variable in paid ad performance. A weak creative with a great offer will underperform. A great creative with a decent offer will outperform.
              <strong className="text-white"> You are responsible for identifying when creative is the problem and briefing Ken accordingly.</strong> Ken handles creatives only — brief him with specific direction, not vague requests.
            </p>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Monday/Thursday Posts — What You Provide</h4>
              <BulletList check items={[
                'Update your Slack status before your Monday/Thursday pod call',
                'Come with specific account performance data — not vibes',
                'Identify which accounts need creative refreshes and why',
                'Flag which creative concepts you want Ken to build next',
                'Provide context: what\'s the hook? What audience? What outcome?',
                'Detailed briefs = better creative = better results',
              ]} />
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Friday Calls — How to Present</h4>
              <BulletList items={[
                'Lead with Layer 1: bookings vs target, cost per booking',
                'Pull Layer 2 only if Layer 1 is failing — don\'t pad with data',
                'Don\'t ramble — get straight to the point',
                'Focus on Layer 1 vs Layer 2 framework, not random observations',
                'Confirm action steps before ending the call',
                'Reference the data you already analyzed — don\'t depend on leadership to interpret it for you',
                'Come with prescriptions, not just problems',
              ]} />
            </div>
          </div>

          <InfoBox type="tip" title="Oscar's Creative Audit — Must Watch">
            Watch the <strong>Creative Audit — Oscar &amp; Kyle</strong> recording in the Reference Recordings above. Oscar walks through a live creative audit: how to identify what&apos;s working, what&apos;s failing, and what to brief for next. This is the standard.
          </InfoBox>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Organic Content — Why It Supports Paid</h4>
            <div className="space-y-1.5 text-sm text-brand-gray leading-relaxed">
              <p>Organic content (social posts, videos) builds trust signals that directly impact paid ad performance. A prospect who&apos;s seen your client&apos;s organic content is more likely to book from a paid ad.</p>
              <p className="font-bold text-brand-black">Your job: make sure clients are posting consistently and understand why it matters to their results.</p>
            </div>
          </div>
        </div>
      </ExpandableCard>

      <Card yellow>
        <div className="text-center">
          <div className="font-black text-2xl mb-1">You own the relationship.</div>
          <div className="text-sm text-brand-black/70">
            From the onboarding call to renewal — you are the client&apos;s single point of contact and the one accountable for every outcome. Specialists support you. The result is yours.
          </div>
        </div>
      </Card>
    </SectionWrapper>
  );
}
