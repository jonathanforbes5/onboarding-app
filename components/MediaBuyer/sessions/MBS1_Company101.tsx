'use client';
import React from 'react';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616', surf3: '#1C1C1C',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888', acc: '#F5C800',
};

const DEPTS = [
  { name: 'Media Buying', tag: 'YOU', color: '#F5C800', bg: '#1A1400', desc: 'Owns ad performance — strategy, execution, creative direction requests.', members: 'Bren, Mervin' },
  { name: 'Creative', tag: '', color: '#A855F7', bg: '#0D0717', desc: 'Builds assets based on media buyer direction and performance data. Creative Strategist owns copy + direction.', members: 'Ken + Creative Strategist' },
  { name: 'CSM', tag: 'CLIENT CONTACT', color: '#4A90D9', bg: '#00101A', desc: 'Owns ALL client communication — performance updates, billing, renewals, escalations. Zero crossover.', members: 'CSM team' },
  { name: 'VA / Call Center', tag: '', color: '#22C55E', bg: '#001A0A', desc: 'Calls leads and books appointments. You generate leads. They close them.', members: 'Leila, Aica, VAs' },
  { name: 'Tech / Automations', tag: '', color: '#F97316', bg: '#1A0A00', desc: 'GHL setup, integrations, and technical issues. Escalate tech blockers here.', members: 'Emmanuel + Tech team' },
];

const KPIS = [
  { name: 'Cost per Link Click', layer: 'L2', desc: 'Ad efficiency at driving traffic' },
  { name: 'Link CTR', layer: 'L2', desc: 'Benchmark: above 0.8%', highlight: true },
  { name: 'CPM', layer: 'L2', desc: 'Audience competitiveness & ad relevance' },
  { name: 'Frequency', layer: 'L2', desc: 'Above 3–4 = creative refresh needed', highlight: true },
  { name: 'Cost per Lead (CPL)', layer: 'L2', desc: 'Primary ad efficiency metric' },
  { name: 'Cost per Booked Appt', layer: 'L1', desc: 'Connects ads to business outcome', highlight: true },
  { name: 'Out-of-Service-Area %', layer: 'L2', desc: 'Flag above 15% — targeting quality signal', highlight: true },
  { name: 'Leads Generated', layer: 'L1', desc: 'Rolling 3/5/7-day + cycle total' },
  { name: 'Booked Appointments', layer: 'L1', desc: 'Rolling 3/5/7-day + cycle total', highlight: true },
  { name: 'Ad Spend vs Pacing', layer: 'L1', desc: 'On track to spend right amount across cycle' },
];

const STANDARDS = [
  { icon: '💬', title: 'Communication', desc: 'Clear, direct, and prompt. If something is unclear, ask. Do not guess and move forward on an assumption.' },
  { icon: '🎯', title: 'Accountability', desc: 'Own your accounts and your mistakes. If something is off on your accounts, it is your problem to catch and fix.' },
  { icon: '👂', title: 'Listen to Detail', desc: 'Instructions and account context get followed precisely, not approximated. If a direction was given, follow it as given.' },
  { icon: '✅', title: 'Approval Before Action', desc: 'Nothing goes live, gets changed, or gets pushed out on an account without approval first. No exceptions while this model is new.' },
  { icon: '⏰', title: 'Punctuality', desc: 'On time to every meeting, early if anything. Late is not acceptable.' },
];

const TOOLS = [
  { name: 'ClickUp', icon: '📋', desc: 'Specialist task assignment. Every task needs account name, relevant link, and deadline.' },
  { name: 'GoHighLevel', icon: '⚙️', desc: 'Read daily for lead stages and log data.' },
  { name: 'Slack', icon: '💬', desc: 'Designated channels only. No random questions in reporting channels.' },
  { name: 'Meta Ads Manager', icon: '📢', desc: 'Campaign management. Confirm naming/placement rules with Tech.' },
  { name: 'Command Centre', icon: '📊', desc: 'Real-time account health. Update daily.' },
];

export function MBS1_Company101() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Business Model */}
      <div style={{ backgroundColor: '#1A1400', border: '1px solid #F5C80033', borderRadius: 14, padding: '24px 24px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #F5C800, #F5C80000)' }} />
        <div style={{ color: C.acc, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Business Model</div>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 900, marginBottom: 10 }}>28-Day Performance Cycle</div>
        <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65, margin: '0 0 16px' }}>
          RoofIgnite runs Meta ads and GHL to generate inbound leads and booked appointments for roofing contractors across the US.
          Clients run on a 28-day cycle. Revenue is tied to performance — clients pay when qualified booked-appointment targets are hit.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Cycle Length', value: '28 Days', sub: 'Primary accountability window' },
            { label: 'Billing Threshold', value: '80% Rule', sub: 'Below target = cycle extends, no charge' },
            { label: 'Revenue Target', value: '$1M/mo', sub: 'Aggressive scaling phase' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
              <div style={{ color: C.acc, fontSize: 17, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{s.label}</div>
              <div style={{ color: '#666', fontSize: 10, marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Funnel */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Full Funnel — Meta Ads to Booked Appointment</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { step: '1', label: 'Meta Ads', owner: 'Media Buying', metric: 'CTR > 0.8%', color: '#F5C800' },
            { step: '2', label: 'Landing Page', owner: 'Tech/Automations', metric: 'Survey start rate > 15%', color: '#F97316' },
            { step: '3', label: 'Qualification Survey', owner: 'Tech/Automations', metric: 'Completion rate > 2.5%', color: '#A855F7' },
            { step: '4', label: 'GoHighLevel CRM', owner: 'Tech/Automations', metric: 'Lead visibility 100%', color: '#4A90D9' },
            { step: '5', label: 'VA Call < 5 min', owner: 'VA / Call Center', metric: 'Speed: under 5 minutes', color: '#22C55E' },
            { step: '6', label: 'Booked Appointment', owner: 'YOU (outcome)', metric: 'Vs. cycle target', color: '#F5C800' },
          ].map((item, i) => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: item.color + '22', border: `1px solid ${item.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: item.color }}>{item.step}</div>
                {i < 5 && <div style={{ width: 1, height: 8, backgroundColor: '#333' }} />}
              </div>
              <div style={{ flex: 1, backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div>
                  <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>{item.owner}</div>
                </div>
                <div style={{ backgroundColor: item.color + '18', border: `1px solid ${item.color}33`, borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Structure */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>New Department Structure</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DEPTS.map((d) => (
            <div key={d.name} style={{ backgroundColor: d.bg, border: `1px solid ${d.color}2A`, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ color: d.color, fontSize: 13, fontWeight: 800 }}>{d.name}</span>
                {d.tag && (
                  <span style={{ backgroundColor: d.color + '22', border: `1px solid ${d.color}44`, color: d.color, fontSize: 9, fontWeight: 900, padding: '2px 7px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.tag}</span>
                )}
                <span style={{ color: '#444', fontSize: 11, marginLeft: 'auto' }}>{d.members}</span>
              </div>
              <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, backgroundColor: '#EF44440D', border: '1px solid #EF444433', borderLeft: '3px solid #EF4444', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: '#EF4444', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>⚠️ Zero Client Contact — No Exceptions</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>Media buyers have zero client-facing responsibility. Do not email clients, message them, hop on calls with them, or share performance data with them directly. All of that goes through CSM. This includes billing failures and renewal conversations.</div>
        </div>
      </div>

      {/* Role definition */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>What the Role Entails</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ backgroundColor: '#1A0000', border: '1px solid #EF444422', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#EF4444', fontSize: 11, fontWeight: 800, marginBottom: 10, textTransform: 'uppercase' }}>You Are NOT</div>
            {['A landing page builder', 'A GHL technician', 'A client relationship owner', 'A VA manager', 'A busy-work doer'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#EF4444', fontSize: 12, marginTop: 1, flexShrink: 0 }}>✕</span>
                <span style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E22', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 10, textTransform: 'uppercase' }}>You ARE</div>
            {['An account owner across 15–25 accounts', 'A KPI diagnostician', 'A specialist coordinator (Creative / VA / Tech)', 'The person accountable for ad-side performance'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#22C55E', fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Standards */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Team Standards — Set Day 1, Held Every Day After</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STANDARDS.map((s, i) => (
            <div key={s.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 14px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: C.acc + '18', border: `1px solid ${C.acc}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 4 }}>
                  <span style={{ color: C.acc, marginRight: 6, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </div>
                <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, backgroundColor: C.acc + '0A', border: `1px solid ${C.acc}22`, borderLeft: `3px solid ${C.acc}`, borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>📌 Rule</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>These standards are not a soft guideline. They are the bar. The team gets built around people who can meet them. Growth and continued opportunity go to those who perform at this level.</div>
        </div>
      </div>

      {/* KPI Reference */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Full KPI Reference — All 10</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {KPIS.map((k) => (
            <div key={k.name} style={{ padding: '10px 12px', backgroundColor: k.highlight ? C.acc + '0A' : C.surf2, border: `1px solid ${k.highlight ? C.acc + '33' : C.border2}`, borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ backgroundColor: k.layer === 'L1' ? '#22C55E22' : '#4A90D922', color: k.layer === 'L1' ? '#22C55E' : '#4A90D9', fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 4 }}>{k.layer}</span>
                <span style={{ color: k.highlight ? C.acc : C.text, fontSize: 12, fontWeight: 700 }}>{k.name}</span>
              </div>
              <div style={{ color: '#666', fontSize: 11, lineHeight: 1.4 }}>{k.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, backgroundColor: C.acc + '0A', border: `1px solid ${C.acc}22`, borderLeft: `3px solid ${C.acc}`, borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>📌 Rule</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>Full ownership means being able to explain any of these at any moment for any account — not just reacting when someone asks. Know your numbers before every meeting.</div>
        </div>
      </div>

      {/* Two-layer reporting */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Two-Layer Reporting System</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E33', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>LAYER 1 — Cycle Performance</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>Full 28-day cycle metrics. Primary accountability window. This is the judge at cycle close.</div>
          </div>
          <div style={{ backgroundColor: '#00101A', border: '1px solid #4A90D933', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>LAYER 2 — Rolling Windows</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>3-day, 5-day, and 7-day views. Catches problems early — inside the cycle, not at close.</div>
          </div>
        </div>
        <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>Rolling windows catch a CPL creep on Day 8 instead of Day 28. Until the automation is live, pull your own rolling windows at the start of each day. The numbers do not care about the automation status — you still need them.</div>
        </div>
      </div>

      {/* Tools */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Tools & Systems</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TOOLS.map((t) => (
            <div key={t.name} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
                <div style={{ color: '#888', fontSize: 12, lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Distribution */}
      <div style={{ backgroundColor: '#1A0A00', border: '1px solid #F9731633', borderRadius: 12, padding: '18px 20px' }}>
        <div style={{ color: '#F97316', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Account Distribution</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
          Distribution starts immediately — it does not wait for training to finish. Starts heavy, based on existing account assignments, and thins out as more media buyers come on.
          During the transition window, you carry accounts alongside whatever remains of current pod manager tasks. This overlap is expected to be temporary.
          <strong style={{ color: '#ddd' }}> The standard applies from Day 1 — accounts are yours to own regardless of how the transition is sequenced.</strong>
        </div>
      </div>

    </div>
  );
}
