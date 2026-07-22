'use client';
import React from 'react';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616', surf3: '#1C1C1C',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888', acc: '#22C55E',
};

const ESCALATION_LADDER = [
  { problem: 'Survey conversion under 2%', root: 'Survey too long or confusing', prescription: 'Switch 7-question to 4-question, simplify language', coord: 'Tech/Automations', severity: 'medium' },
  { problem: 'Rising CPL / falling CTR', root: 'Creative fatigue, frequency climbing', prescription: 'Post-Andromeda duplicate → if no recovery in 48h, full creative refresh', coord: 'Creative', severity: 'medium' },
  { problem: 'High OSA rate (above 20%)', root: 'Radius mismatch across targeting sources', prescription: 'Audit all targeting sources, add exclusion zips', coord: 'Tech/Automations', severity: 'medium' },
  { problem: 'Low VA booking rate', root: 'Leads not called within 5 min, or script issue', prescription: 'Flag to VA team with specific lead examples and timestamps', coord: 'VA/Call Center', severity: 'high' },
  { problem: 'Ads not spending 3+ days', root: 'Campaign paused, disapproval, or billing issue', prescription: 'Check Meta status, flag billing issue to CSM', coord: 'Tech/Automations, CSM', severity: 'high' },
  { problem: 'Billing failure / card declined', root: 'Client card declined or threshold hit', prescription: 'Flag to CSM immediately — CSM contacts the client', coord: 'CSM', severity: 'rule' },
  { problem: 'Low client close rate', root: 'Lead quality or client-side sales issue, needs data first', prescription: 'Pull data; if lead quality confirmed, escalate for creative/targeting review', coord: 'Sales/CSM', severity: 'medium' },
  { problem: 'Low show rate', root: 'Reminder automation or qualification issue', prescription: 'Audit reminder flow in GHL', coord: 'Tech/Automations', severity: 'medium' },
  { problem: 'Open leads not being called', root: 'VA bandwidth or scheduling gap', prescription: 'Flag to VA team with log screenshot and timestamps', coord: 'VA/Call Center', severity: 'high' },
  { problem: 'No new leads, 3+ days', root: 'Campaign paused, disapproval, billing, or fatigue', prescription: 'Check Meta status and billing, escalate as needed', coord: 'Tech/Automations, CSM', severity: 'high' },
  { problem: 'Cycle approaching renewal', root: 'N/A — informational only', prescription: 'Media buyer supplies performance data. CSM owns the renewal conversation.', coord: 'CSM', severity: 'rule' },
];

const REFRESH_STEPS = [
  { step: 'Before anything', icon: '🔍', action: 'Context check', detail: 'Check for holidays or local events. Check if inside the first 7 days of a launch. If yes, wait. Do not touch anything.' },
  { step: 'Step 1', icon: '🔄', action: 'Post-Andromeda Duplicate', detail: 'If top 3–4 ads hold 90%+ of spend and performance is declining: duplicate the ad set, turn off top-reach ads, launch new set, turn off old. Wait 48 hours — this resolves it roughly half the time.' },
  { step: 'Step 2', icon: '🎨', action: 'Full Creative Refresh', detail: 'If Step 1 does not resolve after 48 hours: brief Creative with brand info and reference images. Be specific — market, angle, format, and performance context.' },
];

export function MBS4_ActionSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Intro card */}
      <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E33', borderRadius: 14, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #22C55E, #22C55E00)' }} />
        <div style={{ color: '#22C55E', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Common Action Steps</div>
        <div style={{ color: C.text, fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Problem → Root Cause → Prescription → Coordinate</div>
        <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Every common account problem has a documented sequence. Know these cold so that in the middle of an audit, you are not figuring it out — you are executing the playbook.
        </p>
      </div>

      {/* Escalation ladder */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#22C55E', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Escalation Ladder — Diagnosis to Action</span>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 3fr 2fr', gap: 8, padding: '6px 10px', marginBottom: 6 }}>
          {['Problem', 'Root Cause', 'Prescription', 'Coordinate With'].map((h) => (
            <div key={h} style={{ color: '#444', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ESCALATION_LADDER.map((row) => {
            const severityColors: Record<string, string> = { high: '#EF4444', medium: '#F5C800', rule: '#4A90D9' };
            const color = severityColors[row.severity];
            return (
              <div key={row.problem} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 3fr 2fr', gap: 8, padding: '10px 10px', backgroundColor: C.surf2, border: `1px solid ${row.severity === 'rule' ? '#4A90D933' : row.severity === 'high' ? '#EF444422' : C.border2}`, borderRadius: 8 }}>
                <div style={{ color: row.severity === 'rule' ? '#4A90D9' : C.text, fontSize: 12, fontWeight: row.severity !== 'medium' ? 700 : 400, lineHeight: 1.4 }}>{row.problem}</div>
                <div style={{ color: '#888', fontSize: 11.5, lineHeight: 1.4 }}>{row.root}</div>
                <div style={{ color: '#bbb', fontSize: 11.5, lineHeight: 1.4 }}>{row.prescription}</div>
                <div>
                  {row.coord.split(', ').map((c) => (
                    <div key={c} style={{ display: 'inline-block', backgroundColor: color + '18', border: `1px solid ${color}33`, color, fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 4, marginRight: 3, marginBottom: 3 }}>{c}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CSM rule callout */}
        <div style={{ marginTop: 14, backgroundColor: '#4A90D90A', border: '1px solid #4A90D933', borderLeft: '3px solid #4A90D9', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Billing failures and renewals — both go through CSM</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>These are the two places the old and new role structure explicitly conflict. Media buyer flags the billing failure to CSM. CSM contacts the client. Media buyer supplies performance data for renewals. CSM has the renewal conversation. No exceptions.</div>
        </div>
      </div>

      {/* Creative Refresh Protocol */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#22C55E', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Creative Refresh Protocol</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REFRESH_STEPS.map((s, i) => (
            <div key={s.step} style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#22C55E18', border: '1px solid #22C55E33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{s.icon}</div>
                {i < REFRESH_STEPS.length - 1 && <div style={{ width: 1, flex: 1, backgroundColor: '#2A2A2A', margin: '4px 0' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: i < REFRESH_STEPS.length - 1 ? 12 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#22C55E', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}>{s.step}</span>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{s.action}</span>
                </div>
                <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Briefing Creative */}
        <div style={{ marginTop: 16, backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ color: '#A855F7', fontSize: 12, fontWeight: 800, marginBottom: 10 }}>When Briefing Creative — Be Specific</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Brand info', desc: 'Colors, logo, existing visual identity' },
              { label: 'Market context', desc: 'Roofing, HVAC, gutters — which vertical, which region' },
              { label: 'Angle', desc: 'Insurance, retail, emergency — what you\'re speaking to' },
              { label: 'Format', desc: 'Single, Two-fold, Tri-fold — which format you need' },
              { label: 'Reference images', desc: 'Previous winning creatives or organic client content' },
              { label: 'Performance context', desc: '"Previous video in this format got X% CTR and $Y CPL"' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '8px 10px', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: 6 }}>
                <div style={{ color: '#A855F7', fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: '#666', fontSize: 11, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, color: '#555', fontSize: 12 }}>Vague briefs produce vague ads. Specific briefs produce specific results.</div>
        </div>
      </div>

      {/* Playbook location */}
      <div style={{ backgroundColor: '#001A0A', border: '1px solid #22C55E33', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Playbook Infrastructure</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
          The escalation ladder, lever library, and creative refresh protocol live in the playbook. Knowing where to find them mid-audit is part of the session — so you are not searching for the process when you need it most.
          Location will be covered in the live session walkthrough.
        </div>
      </div>

      {/* Capacity & mindset */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#22C55E', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Operating at Scale</span>
        </div>
        <div style={{ backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>Longer-term capacity target</div>
              <div style={{ color: C.acc, fontSize: 28, fontWeight: 900, marginBottom: 4 }}>50</div>
              <div style={{ color: '#888', fontSize: 12 }}>accounts across the team — not 25.</div>
            </div>
            <div>
              <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>How to get there</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Diagnose fast using the playbook', 'Delegate execution to specialists', 'Spend time on decisions, not clicks', 'Scale comes from clean systems, not more hours'].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ color: '#22C55E', fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ color: '#888', fontSize: 12, lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Homework banner */}
      <div style={{ backgroundColor: '#F5C8000A', border: '2px solid #F5C80044', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ color: '#F5C800', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Homework — Due Before Wed July 29, 7:00 AM</div>
        <div style={{ color: '#ddd', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>For every account: a written read + a proposed action step</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
          Each buyer brings a written read plus a proposed action step per account into Wednesday's first daily call. This is how Day 1 of accountability calls has real material from the start — not just introductions.
          Do the reads Tuesday night. Have them ready before the first call.
        </div>
      </div>

    </div>
  );
}
