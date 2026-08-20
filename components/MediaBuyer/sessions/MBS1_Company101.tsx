'use client';
import React from 'react';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616', surf3: '#1C1C1C',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888', acc: '#F5C800',
};

const STANDARDS = [
  { icon: '⏰', num: '01', title: 'Punctuality', desc: 'On time to every meeting — early if anything. One minute late is late. This is non-negotiable from Day 1 and every day after.' },
  { icon: '💬', num: '02', title: 'Communication', desc: 'Clear, direct, and immediate. If something is unclear, ask — do not guess. Proactively update the team on anything that affects accounts or timelines.' },
  { icon: '🎯', num: '03', title: 'Accountability', desc: 'Own your accounts and your mistakes. If something is off, it is your problem to catch and fix before anyone has to ask you about it.' },
  { icon: '👁️', num: '04', title: 'Attention to Detail', desc: 'Instructions and account context are followed precisely — not approximated. Read everything. Track every change. Log every action.' },
  { icon: '✅', num: '05', title: 'Approval Before Action', desc: 'Nothing goes live, gets changed, or gets pushed out on an account without approval first. No exceptions while this model is new.' },
];

const DEPTS = [
  {
    name: 'Media Buying', tag: 'YOU', color: '#F5C800', bg: '#1A1400',
    lead: 'Jonathan Forbes — MB Lead (R&D, action steps, accountability)',
    members: 'Emmanuel · Mervin · Bren · 3–5 more joining soon',
    desc: 'Owns ad performance end-to-end — strategy, execution, data analysis, and creative direction requests. Jonathan leads with R&D, accountability, and escalation ownership.',
  },
  {
    name: 'Creative', tag: '', color: '#A855F7', bg: '#0D0717',
    lead: 'Ken — Creative Strategist (owns copy + creative direction)',
    members: 'Ken · Hiring another Creative Specialist now',
    desc: 'Builds all ad assets based on media buyer direction and performance data. Creative Strategist owns copy and creative direction. You brief with specific data — they execute.',
  },
  {
    name: 'CSM', tag: 'CLIENT CONTACT', color: '#4A90D9', bg: '#00101A',
    lead: 'CSM Team',
    members: 'CSM team',
    desc: 'Owns ALL client communication — performance updates, billing, renewals, escalations. Zero crossover with media buyers. CSM communicates the results you generate.',
  },
  {
    name: 'VA / Call Center', tag: '', color: '#22C55E', bg: '#001A0A',
    lead: 'Leila — VA Lead',
    members: 'Louie Ann Z. · Pamela  —  VA Managers  ·  Leila  —  VA Lead  ·  Individual VAs',
    desc: 'Calls leads within 5 minutes and books appointments. You generate the leads — they close them. Speed-to-lead under 5 minutes is the standard.',
  },
  {
    name: 'Tech / Automations', tag: 'HIRING', color: '#F97316', bg: '#1A0A00',
    lead: 'Role vacant — actively hiring',
    members: 'TBD',
    desc: 'GHL setup, landing page builds, integrations, and technical escalations. No dedicated owner yet — actively hiring. Tech blockers get flagged immediately.',
  },
];

const TOOLS = [
  { name: 'Meta Ads Manager', icon: '📢', desc: 'Primary ad platform. Campaign setup, monitoring, optimization, and change logging. Every change you make must be documented.' },
  { name: 'GoHighLevel (GHL)', icon: '⚙️', desc: 'CRM and lead pipeline. Check daily for lead stages, VA activity, and log data. Source of truth on lead outcomes.' },
  { name: 'ClickUp', icon: '📋', desc: 'Task management for the team. Every creative request, tech escalation, and action step — account name, link, and deadline required.' },
  { name: 'Slack', icon: '💬', desc: 'Designated channels for updates, escalations, and team communication. Correct channel discipline is expected.' },
  { name: 'MB Command Centre (Coming)', icon: '📊', desc: 'Real-time account health dashboard — equivalent of what pod managers have. We will build this fast.' },
];

const KPIS = [
  { name: 'Booked Appointments', layer: 'L1', track: 'GHL pipeline', importance: 'The primary deliverable — everything you do serves this number.' },
  { name: 'Cost per Booked Appt', layer: 'L1', track: 'Total spend ÷ booked appts', importance: 'Tells you whether the model is financially viable for the client.' },
  { name: 'Leads Generated', layer: 'L1', track: 'GHL + Meta', importance: 'Early funnel health indicator — drops before appointments do.' },
  { name: 'Ad Spend vs Pacing', layer: 'L1', track: 'Meta Ads Manager daily', importance: 'Cycle billing depends on hitting the full budget by Day 28.' },
  { name: 'Link CTR', layer: 'L2', track: 'Meta Ads Manager', importance: 'Reflects creative and audience relevance. Low CTR = ad-level problem.' },
  { name: 'Cost per Link Click', layer: 'L2', track: 'Meta Ads Manager', importance: 'Isolates whether CPL issues come from the ad or the landing page.' },
  { name: 'CPM', layer: 'L2', track: 'Meta Ads Manager', importance: 'Audience efficiency signal. Spikes indicate saturation or competition.' },
  { name: 'Cost per Lead (CPL)', layer: 'L2', track: 'Meta + GHL', importance: 'Bridges spend to lead volume — key lever before appointments land.' },
  { name: 'Frequency', layer: 'L2', track: 'Meta Ads Manager', importance: 'High frequency = audience overexposure. Signals need for fresh creative.' },
  { name: 'Out-of-Service-Area %', layer: 'L2', track: 'GHL lead source data', importance: 'High rate = wasted spend on leads outside the client\'s territory.' },
];

function SectionHeader({ num, title, time, color = C.acc }: { num: string; title: string; time: string; color?: string }) {
  return (
    <div style={{ backgroundColor: '#1A1400', border: `1px solid ${color}33`, borderRadius: 12, padding: '16px 20px', position: 'relative', overflow: 'hidden', marginBottom: 4 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }} />
      <div style={{ color, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Section {num} · {time}</div>
      <div style={{ color: C.text, fontSize: 18, fontWeight: 900 }}>{title}</div>
    </div>
  );
}

function S1_Opportunity() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="01" title="A New Chapter" time="5 min" />
      <div style={{ backgroundColor: '#1A1400', border: '1px solid #F5C80044', borderRadius: 14, padding: '22px 24px' }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 900, marginBottom: 10, lineHeight: 1.3 }}>This is a brand new role. You are applying for it.</div>
        <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7, margin: '0 0 18px' }}>
          Being a media buyer at RoofIgnite is not an extension of what you were doing before. Your old role was execution — button-clicking, reactive tasks, following instructions. This role is ownership. You are the decision maker for your accounts. You diagnose problems, identify root causes, and take action. You are, for all practical purposes, playing the role of a pod manager — but for media buying only.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ backgroundColor: '#1A0000', border: '1px solid #EF444433', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#EF4444', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Old Role</div>
            {['Button-clicking, task execution', 'Reactive — waited to be told what to do', 'One part of a larger pod structure', 'Minimal decision-making authority', 'Performance measured loosely'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                <span style={{ color: '#EF4444', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E33', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#22C55E', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>New Role</div>
            {['Decision maker — diagnose, decide, act', 'Proactive — spots problems before crises', 'Full ownership of ad performance end-to-end', 'You direct Creative, coordinate Tech and VA', 'Held accountable to every KPI, every cycle'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                <span style={{ color: '#22C55E', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ color: '#aaa', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, backgroundColor: '#F5C8000A', border: '1px solid #F5C80033', borderLeft: '3px solid #F5C800', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 3 }}>Your existing experience is an advantage — not a guarantee.</div>
          <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.6 }}>You know the business. You know the clients. That gives you a head start in context. But this role requires a completely different standard. You are being evaluated for this position. It starts fresh.</div>
        </div>
      </div>
    </div>
  );
}

function S2_Standards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="02" title="Team Standards" time="5 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>These are not guidelines. They are the operating floor. Everyone on this team is held to the same bar from Day 1 forward.</p>
        <div style={{ marginBottom: 14, backgroundColor: '#1A0000', border: '2px solid #EF444444', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <span style={{ color: '#EF4444', fontSize: 13, fontWeight: 900 }}>No second chances. Not even once.</span>
          </div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.65 }}>If you go against any of the standards below — even arriving one minute late, making a change without approval, or failing to communicate when you should have — there is no formal warning, no probationary period, no second chance. One violation is enough.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STANDARDS.map((s) => (
            <div key={s.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: C.acc + '14', border: `1px solid ${C.acc}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#555', fontSize: 10, fontWeight: 800 }}>{s.num}</span>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>{s.title}</span>
                </div>
                <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S3_BusinessModel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="03" title="The RoofIgnite Model" time="10 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>We are a home service marketing agency. We run Meta ads and GoHighLevel automation to generate inbound qualified leads and booked appointments for contractors in roofing, HVAC, gutters, and similar trades across the US. Clients pay a setup fee to get started, then run on 28-day retainer cycles.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {['Setup Fee', '28-Day Cycle', '28-Day Cycle', '28-Day Cycle →'].map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ backgroundColor: i === 0 ? '#2A2A00' : '#1A1400', border: `1px solid ${i === 0 ? '#F5C80055' : '#F5C80033'}`, borderRadius: 8, padding: '7px 14px', textAlign: 'center' }}>
                <div style={{ color: i === 0 ? '#F5C800' : '#888', fontSize: 11, fontWeight: 700 }}>{s}</div>
                {i === 0 && <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>One-time</div>}
                {i > 0 && i < 3 && <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>28 days / $2,800</div>}
              </div>
              {i < 3 && <span style={{ color: '#444', fontSize: 16 }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ backgroundColor: '#0D0D00', border: '1px solid #F5C80022', borderRadius: 12, padding: '18px 18px', marginBottom: 14 }}>
          <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Performance Math — $100/Day Example</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: '$100/day × 28 days', value: '$2,800 cycle spend', sub: 'What must be spent — ramp if behind', color: '#F5C800', bg: '#1A1400' },
              { label: 'At 50% booking rate', value: '30 leads needed', sub: 'To reach the goal of 15 booked appointments', color: '#4A90D9', bg: '#00101A' },
              { label: '100% goal', value: '15 booked appointments', sub: 'The target every cycle must aim for', color: '#22C55E', bg: '#001A0A' },
              { label: '80% minimum', value: '12 booked appointments', sub: 'Below this = discount applied per missed appointment', color: '#F97316', bg: '#1A0500' },
              { label: 'Billing threshold', value: '6 booked appointments', sub: '50% of the 80% goal — below this we cannot bill', color: '#EF4444', bg: '#1A0000' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
                  {i > 0 && <div style={{ width: 1, flex: 1, backgroundColor: '#2A2A2A' }} />}
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: row.color, flexShrink: 0, margin: '4px 0' }} />
                  {i < 4 && <div style={{ width: 1, flex: 1, backgroundColor: '#2A2A2A' }} />}
                </div>
                <div style={{ flex: 1, marginLeft: 12, backgroundColor: row.bg, border: `1px solid ${row.color}22`, borderRadius: 8, padding: '10px 14px', marginBottom: i < 4 ? 6 : 0 }}>
                  <div style={{ color: '#666', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{row.label}</div>
                  <div style={{ color: row.color, fontSize: 15, fontWeight: 900 }}>{row.value}</div>
                  <div style={{ color: '#666', fontSize: 11, marginTop: 2, lineHeight: 1.4 }}>{row.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { range: '12–15 booked', label: 'Full billing', color: '#22C55E', bg: '#001A0A', icon: '✓' },
            { range: '6–11 booked', label: 'Discounted — per appt below 12', color: '#F97316', bg: '#1A0500', icon: '⬇' },
            { range: '0–5 booked', label: 'Below threshold — company eats it', color: '#EF4444', bg: '#1A0000', icon: '✕' },
          ].map((b) => (
            <div key={b.range} style={{ backgroundColor: b.bg, border: `1px solid ${b.color}33`, borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ color: b.color, fontSize: 18, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ color: b.color, fontSize: 12, fontWeight: 800, marginBottom: 3 }}>{b.range}</div>
              <div style={{ color: '#666', fontSize: 11, lineHeight: 1.4 }}>{b.label}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#F5C8000A', border: '1px solid #F5C80033', borderLeft: '3px solid #F5C800', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Spend Pacing — You Must Hit $2,800 by Day 28</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>If you are 25 days in and only $800 has been spent, ramp the budget over the remaining 3 days to hit $2,800. The cycle is 28 days AND contingent on hitting the spend target. Every appointment short of the 80% minimum costs the company money directly.</div>
        </div>
      </div>
    </div>
  );
}

function S5_MeetingCadence() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="05" title="Meeting Cadence" time="5 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>We will spend a significant amount of time together — the goal is daily meetings as the team matures. Starting structure below.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 14 }}>
          {[
            { day: 'Mon', type: 'Check-in', post: true, color: '#F5C800', desc: 'Brief check — performance, action steps, patterns' },
            { day: 'Tue', type: 'Deep Dive', post: false, color: '#22C55E', desc: 'Full account reviews, diagnostic sessions' },
            { day: 'Wed', type: 'Check-in', post: false, color: '#F5C800', desc: 'Brief check — performance, action steps, patterns' },
            { day: 'Thu', type: 'Check-in', post: true, color: '#F5C800', desc: 'Brief check — same as Monday' },
            { day: 'Fri', type: 'Deep Dive', post: false, color: '#22C55E', desc: 'Full account reviews, diagnostic sessions' },
          ].map((d) => (
            <div key={d.day} style={{ backgroundColor: C.surf2, border: `1px solid ${d.type === 'Deep Dive' ? '#22C55E22' : C.border2}`, borderRadius: 8, padding: '10px 10px', textAlign: 'center' }}>
              <div style={{ color: d.color, fontSize: 18, fontWeight: 900, marginBottom: 2 }}>{d.day}</div>
              <div style={{ color: d.type === 'Deep Dive' ? '#22C55E' : '#888', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', marginBottom: d.post ? 5 : 0 }}>{d.type}</div>
              {d.post && <div style={{ backgroundColor: C.acc + '18', border: `1px solid ${C.acc}33`, borderRadius: 4, padding: '2px 4px', fontSize: 9, color: C.acc, fontWeight: 800 }}>UPDATE POST DUE</div>}
              <div style={{ color: '#555', fontSize: 10, lineHeight: 1.4, marginTop: 5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: '📋', title: 'Written Update Posts — Mon & Thu', desc: 'Account-by-account read: what\'s performing, what\'s not, what action is being taken.' },
            { icon: '🔍', title: 'Deep Dives — Tue & Fri', desc: 'Full account reviews with Jonathan. Come with a diagnosis, not just data. Know your accounts before you walk in.' },
            { icon: '💬', title: 'Brief Check-ins — Mon, Wed & Thu', desc: 'Short — how are accounts performing, what action steps are you taking, what patterns are you noticing. These are check-ins, not presentations.' },
            { icon: '👁️', title: 'You Are Our Eyes', desc: 'You are the direct signal on what\'s working and what\'s not. You order creative and copy refreshes based on what you see. You communicate it to Creative. You ensure CSM has results worth talking about.' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', gap: 10, padding: '10px 12px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: C.text, fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{item.title}</div>
                <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S6_Departments() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="06" title="Department Structure" time="8 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>The agency runs as a specialist model. Every department owns its function. You work with all of them — you do not do their job, and they do not do yours.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DEPTS.map((d) => (
            <div key={d.name} style={{ backgroundColor: d.bg, border: `1px solid ${d.color}28`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{ color: d.color, fontSize: 13, fontWeight: 900 }}>{d.name}</span>
                {d.tag && <span style={{ backgroundColor: d.color + '22', border: `1px solid ${d.color}44`, color: d.color, fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase' }}>{d.tag}</span>}
              </div>
              <div style={{ color: '#555', fontSize: 11, marginBottom: 6, lineHeight: 1.5 }}>{d.members}</div>
              <div style={{ color: '#666', fontSize: 11, fontStyle: 'italic', marginBottom: 8 }}>{d.lead}</div>
              <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, backgroundColor: '#1A0000', border: '2px solid #EF444433', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 900, marginBottom: 4 }}>⚠️ Zero Client Contact — No Exceptions</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.65 }}>Media buyers do not communicate directly with clients — not by email, phone, Slack, or any other channel. No performance updates, check-ins, billing conversations, or renewal discussions. Everything goes through CSM. CSM communicates the results you generate.</div>
        </div>
      </div>
    </div>
  );
}

function S7_Funnel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="07" title="Full Funnel Ownership" time="5 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>Other departments execute parts of the funnel. You own the result. If a client is not hitting targets, that conversation starts with you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
          {[
            { step: '01', label: 'Meta Ads', owner: 'Media Buying — YOUR domain', note: 'Targeting, creative, budget, optimization. All of it.', color: '#F5C800', owned: true },
            { step: '02', label: 'Landing Page', owner: 'Tech / Automations (build) — you own performance', note: 'v3 landing pages are set up from day one. Both survey lengths available immediately. You flag performance issues and request changes — the foundation is already there.', color: '#F97316', owned: false },
            { step: '03', label: 'Qualification Survey', owner: 'Tech / Automations (setup) — you own outcomes', note: '7-question and 4-question both available from launch. Your job is switching between them based on conversion data, not rebuilding from scratch.', color: '#A855F7', owned: false },
            { step: '04', label: 'Lead into GHL / CRM', owner: 'Tech / Automations (integrations)', note: 'Every lead must be visible and categorized correctly in GHL.', color: '#4A90D9', owned: false },
            { step: '05', label: 'VA Call — within 5 min', owner: 'VA / Call Center (execution)', note: 'Speed-to-lead is critical. If VA team is missing leads, flag with timestamps.', color: '#22C55E', owned: false },
            { step: '06', label: 'Booked Appointment', owner: 'THE OUTCOME YOU OWN', note: 'This is what clients pay for. Every step above feeds into this number.', color: '#F5C800', owned: true },
          ].map((item, i) => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'stretch', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 28 }}>
                {i > 0 && <div style={{ width: 1, height: 10, backgroundColor: '#2A2A2A' }} />}
                <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: item.color + '22', border: `1px solid ${item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: item.color, flexShrink: 0 }}>{item.step}</div>
                {i < 5 && <div style={{ width: 1, flex: 1, backgroundColor: '#2A2A2A', marginTop: 3 }} />}
              </div>
              <div style={{ flex: 1, backgroundColor: item.owned ? item.color + '0A' : C.surf2, border: `1px solid ${item.owned ? item.color + '33' : C.border2}`, borderRadius: 8, padding: '9px 12px' }}>
                <div style={{ color: item.owned ? item.color : C.text, fontSize: 13, fontWeight: 800 }}>{item.label}</div>
                <div style={{ color: item.owned ? item.color + 'CC' : '#666', fontSize: 11, fontWeight: 600, marginTop: 1 }}>{item.owner}</div>
                <div style={{ color: '#666', fontSize: 11, lineHeight: 1.4, marginTop: 4 }}>{item.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#F5C8000A', border: '1px solid #F5C80033', borderLeft: '3px solid #F5C800', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Ownership is not about execution — it is about accountability.</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>Other departments execute their steps. You own the chain. You coordinate the pieces. You ensure nothing falls through. You are accountable for the final number on every cycle report.</div>
        </div>
      </div>
    </div>
  );
}

function S8_Tools() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="08" title="Tools & Systems" time="5 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>We move fast on building new systems. The pod managers have a command centre for real-time account health — we will build the media buyer equivalent. Until then, these are your daily tools.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {TOOLS.map((t) => (
            <div key={t.name} style={{ display: 'flex', gap: 12, padding: '10px 12px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ color: C.text, fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{t.name}</div>
                <div style={{ color: '#888', fontSize: 12, lineHeight: 1.45 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S9_KPIs() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="09" title="KPI Overview" time="5 min" />
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <p style={{ color: '#777', fontSize: 12, lineHeight: 1.6, margin: '0 0 14px' }}>Ten KPIs across two layers. Session 2 goes deep on each — how to read them, what failure looks like, and the levers to pull. For now, understand what they are, where they come from, and why they matter.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {KPIS.map((k) => (
            <div key={k.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8 }}>
              <span style={{ backgroundColor: k.layer === 'L1' ? '#22C55E22' : '#4A90D922', color: k.layer === 'L1' ? '#22C55E' : '#4A90D9', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, flexShrink: 0, marginTop: 2 }}>{k.layer}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{k.name}</div>
                <div style={{ color: '#555', fontSize: 11, marginBottom: 3 }}>Tracked via: {k.track}</div>
                <div style={{ color: '#777', fontSize: 11, lineHeight: 1.45 }}>{k.importance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S10_LayerReporting() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionHeader num="10" title="Layer Reporting" time="5 min" />
      <div style={{ backgroundColor: '#1A1400', border: '1px solid #F5C80033', borderRadius: 12, padding: '18px 20px' }}>
        <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 10 }}>Two-Layer Reporting — How You Read Accounts</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E33', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>Layer 1 — Cycle Performance</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>Full 28-day cycle metrics. Booked appointments, CPA, leads generated, spend pacing. Primary accountability window — if L1 is green, stop there.</div>
          </div>
          <div style={{ backgroundColor: '#00101A', border: '1px solid #4A90D933', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>Layer 2 — Rolling Windows</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>3-day, 5-day, and 7-day breakdowns of driver metrics. Only drill here when L1 is showing a problem. Catches issues inside the cycle — not at close.</div>
          </div>
        </div>
        <div style={{ color: '#666', fontSize: 12, lineHeight: 1.6 }}>Rolling windows catch a CPL creep on Day 8 instead of Day 28. Session 2 covers how to read both layers and what to do when you find a problem.</div>
      </div>
    </div>
  );
}

const SECTION_MAP: Record<string, () => React.ReactElement> = {
  s1: S1_Opportunity,
  s2: S2_Standards,
  s3: S3_BusinessModel,
  s5: S5_MeetingCadence,
  s6: S6_Departments,
  s7: S7_Funnel,
  s8: S8_Tools,
  s9: S9_KPIs,
  s10: S10_LayerReporting,
};

export function MBS1_Company101({ sectionId }: { sectionId?: string }) {
  if (sectionId && SECTION_MAP[sectionId]) {
    const SectionComponent = SECTION_MAP[sectionId];
    return <SectionComponent />;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <S1_Opportunity /><S2_Standards /><S3_BusinessModel />
      <S5_MeetingCadence /><S6_Departments /><S7_Funnel /><S8_Tools />
      <S9_KPIs /><S10_LayerReporting />
    </div>
  );
}
