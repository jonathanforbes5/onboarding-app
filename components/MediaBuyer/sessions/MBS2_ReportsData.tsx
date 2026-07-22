'use client';
import React, { useState } from 'react';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616', surf3: '#1C1C1C',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888',
  acc: '#4A90D9',
};

const L1_METRICS = [
  { name: 'Total Booked Appointments vs Goal', note: 'Within 80% of contracted target. Check first.', primary: true },
  { name: 'Cost per Booked Appointment', note: 'Benchmark ~$225–$250 in default markets — varies by market and ticket size.' },
  { name: 'CPA vs Client Gross Margin', note: 'Cost must be sustainable for the client\'s ticket size and business model.' },
];

const L2_METRICS = [
  { name: 'Link CTR', benchmark: '> 0.8%', fail: 'Creative fatigue or wrong audience', color: '#F5C800' },
  { name: 'Link CPC', benchmark: '< $6', fail: 'CTR too low or CPM too high', color: '#F5C800' },
  { name: 'CPM', benchmark: 'Market dependent', fail: 'High competition, wrong audience, or low relevance', color: '#4A90D9' },
  { name: 'Frequency', benchmark: '< 3.5 before refresh', fail: 'Creative fatigue — same audience seeing same ad too often', color: '#EF4444' },
  { name: 'Survey Conversion', benchmark: '> 2.5%', fail: 'Too many questions, friction, or mismatch with ad promise', color: '#F5C800' },
  { name: 'OSA Rate', benchmark: '< 15%', fail: 'Targeting mismatch — geo too broad or wrong creative attracting wrong market', color: '#EF4444' },
  { name: 'VA Lead-to-Book Rate', benchmark: 'HVAC: > 30%; Roofing: varies', fail: 'VA speed, script quality, or lead qualification issue', color: '#22C55E' },
  { name: 'Show Rate', benchmark: 'Track vs prior cycles', fail: 'Reminder automation issue or poor qualification', color: '#4A90D9' },
];

const L3_LEVERS = [
  { driver: 'CTR / Frequency (fatigue)', lever: 'Post-Andromeda duplicate → if no recovery in 48h, full creative refresh (15 new ads)', coord: 'Creative' },
  { driver: 'Survey Conversion', lever: 'Switch 7-question to 4-question, simplify language', coord: 'Tech/Automations' },
  { driver: 'OSA Rate > 15%', lever: 'Audit all targeting sources, add exclusion zips', coord: 'Tech/Automations' },
  { driver: 'VA Booking Rate Low', lever: 'Flag to VA team with specific lead examples and timestamps', coord: 'VA/Call Center' },
  { driver: 'CPA vs Target (CPM high, booking rate ok)', lever: 'Creative refresh — front-end ad cost is the bottleneck, not the funnel', coord: 'Creative' },
  { driver: 'Show Rate Low', lever: 'Audit reminder flow in GHL — 24h, 1h, day-of reminders', coord: 'Tech/Automations' },
];

const CASE_STUDY = {
  account: 'U.S. Shingle Palm Beach (example)',
  l1: [
    { metric: 'Bookings', value: '19 / 40 target', status: 'red' },
    { metric: 'CPA', value: '$338 vs $255 goal', status: 'red' },
    { metric: 'Pacing', value: 'Day 24/28, –14 behind', status: 'red' },
  ],
  l2: [
    { metric: 'CPM', value: '$73 (FL market)', status: 'red' },
    { metric: 'Link CPC', value: '$9.95', status: 'red' },
    { metric: 'Link CTR', value: '0.73%', status: 'red' },
    { metric: 'Booking Rate (L7D)', value: '75%', status: 'green' },
    { metric: 'Frequency', value: '1.93', status: 'green' },
  ],
  diagnosis: 'Layer 1 red on bookings AND CPA. Layer 2: booking rate is fine (75%) but CPM and CPC are too high — front-end ad cost is the bottleneck, not the funnel.',
  action: 'Layer 3 lever: creative refresh. CPC trending up rapidly = fatigue. Do not touch the funnel — fix the ad.',
};

export function MBS2_ReportsData() {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Intro card */}
      <div style={{ backgroundColor: '#00101A', border: '1px solid #4A90D933', borderRadius: 14, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #4A90D9, #4A90D900)' }} />
        <div style={{ color: '#4A90D9', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>The Layered Read</div>
        <div style={{ color: C.text, fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Start at Layer 1. Drill only when it breaks.</div>
        <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Every account read follows the same sequence: check Layer 1 (outcomes) first. If green, move on.
          If red, drill into Layer 2 for that specific metric only. Pick the biggest, easiest-to-solve driver and pull the Layer 3 lever.
          Verify Layer 1 improves. Do not boil the ocean.
        </p>
      </div>

      {/* Layer model — interactive */}
      <div style={{ backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#4A90D9', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>The Three Layers</span>
        </div>

        {/* Layer selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {([1, 2, 3] as const).map((l) => {
            const colors: Record<number, string> = { 1: '#22C55E', 2: '#4A90D9', 3: '#F5C800' };
            const labels: Record<number, string> = { 1: 'Layer 1 — Outcomes', 2: 'Layer 2 — Drivers', 3: 'Layer 3 — Levers' };
            return (
              <button
                key={l}
                onClick={() => setActiveLayer(l)}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: 8, border: `1px solid ${activeLayer === l ? colors[l] + '88' : '#2A2A2A'}`,
                  background: activeLayer === l ? colors[l] + '18' : '#161616',
                  color: activeLayer === l ? colors[l] : '#666',
                  fontWeight: 800, fontSize: 11, cursor: 'pointer', textAlign: 'center',
                }}
              >
                {labels[l]}
              </button>
            );
          })}
        </div>

        {activeLayer === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Check these first. If all green → stop.</div>
            {L1_METRICS.map((m) => (
              <div key={m.name} style={{ padding: '12px 14px', backgroundColor: m.primary ? '#001A0A' : '#161616', border: `1px solid ${m.primary ? '#22C55E33' : '#2A2A2A'}`, borderRadius: 8 }}>
                <div style={{ color: m.primary ? '#22C55E' : '#ddd', fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{m.name}</div>
                <div style={{ color: '#777', fontSize: 12, lineHeight: 1.4 }}>{m.note}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#22C55E0A', border: '1px solid #22C55E22', borderRadius: 8, padding: '10px 12px', marginTop: 6 }}>
              <span style={{ color: '#22C55E', fontSize: 11, fontWeight: 800 }}>The rule: </span>
              <span style={{ color: '#888', fontSize: 12 }}>Layer 1 green = stop. Do not look at Layer 2. Time is your bottleneck. Focus on accounts where something is actually wrong.</span>
            </div>
          </div>
        )}

        {activeLayer === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Drill here only when a Layer 1 metric is red.</div>
            {L2_METRICS.map((m) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ color: C.text, fontSize: 12.5, fontWeight: 700 }}>{m.name}</span>
                    <span style={{ backgroundColor: m.color + '18', color: m.color, fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 4, border: `1px solid ${m.color}33` }}>{m.benchmark}</span>
                  </div>
                  <div style={{ color: '#666', fontSize: 11.5, lineHeight: 1.4 }}>If failing: {m.fail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeLayer === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>The actual thing you change. Pick the lever that targets the specific Layer 2 driver.</div>
            {L3_LEVERS.map((l) => (
              <div key={l.driver} style={{ padding: '10px 12px', backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 8 }}>
                <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>{l.driver}</div>
                <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.5, marginBottom: 4 }}>{l.lever}</div>
                <div style={{ color: '#555', fontSize: 11 }}>Coordinate with: <span style={{ color: '#888' }}>{l.coord}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Benchmarks quick ref */}
      <div style={{ backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#4A90D9', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Benchmark Quick Reference</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {[
            { kpi: 'Link CTR', target: '> 0.8%', color: '#F5C800' },
            { kpi: 'Link CPC', target: '< $6', color: '#F5C800' },
            { kpi: 'Survey Conversion', target: '> 2.5%', color: '#22C55E' },
            { kpi: 'OSA Rate', target: '< 15%', color: '#EF4444' },
            { kpi: 'Frequency', target: 'Act > 3.5', color: '#EF4444' },
            { kpi: 'CPA Variance Band', target: '≤ 80% above contracted', color: '#4A90D9' },
          ].map((b) => (
            <div key={b.kpi} style={{ padding: '10px 12px', backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#aaa', fontSize: 12 }}>{b.kpi}</span>
              <span style={{ color: b.color, fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{b.target}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live read case study */}
      <div style={{ backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#4A90D9', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Live Read Example — How to Work Through an Account</span>
        </div>
        <div style={{ backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
          <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>{CASE_STUDY.account}</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: '#22C55E', fontSize: 10, fontWeight: 800, marginBottom: 6, textTransform: 'uppercase' }}>Layer 1</div>
            {CASE_STUDY.l1.map((m) => (
              <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #222' }}>
                <span style={{ color: '#888', fontSize: 12 }}>{m.metric}</span>
                <span style={{ color: m.status === 'red' ? '#EF4444' : '#22C55E', fontSize: 12, fontWeight: 700 }}>{m.value}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: '#4A90D9', fontSize: 10, fontWeight: 800, marginBottom: 6, textTransform: 'uppercase' }}>Layer 2 (drilled because L1 is red)</div>
            {CASE_STUDY.l2.map((m) => (
              <div key={m.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #222' }}>
                <span style={{ color: '#888', fontSize: 12 }}>{m.metric}</span>
                <span style={{ color: m.status === 'red' ? '#EF4444' : '#22C55E', fontSize: 12, fontWeight: 700 }}>{m.value}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A0A0A', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Diagnosis</div>
            <div style={{ color: '#aaa', fontSize: 12, lineHeight: 1.55, marginBottom: 8 }}>{CASE_STUDY.diagnosis}</div>
            <div style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Prescription</div>
            <div style={{ color: '#aaa', fontSize: 12, lineHeight: 1.55 }}>{CASE_STUDY.action}</div>
          </div>
        </div>
      </div>

      {/* Internal only rule */}
      <div style={{ backgroundColor: '#1A0000', border: '1px solid #EF444433', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ color: '#EF4444', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>⚠️ All Reads Stay Internal</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.6 }}>
          Findings from live reads — whether from this session or any account review — stay internal. Nothing gets shared with the client directly. CSM owns that conversation. Your job is to diagnose, prescribe, and coordinate. Not to report to the client.
        </div>
      </div>

      {/* Rolling windows note */}
      <div style={{ backgroundColor: '#00101A', border: '1px solid #4A90D922', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ color: '#4A90D9', fontSize: 11, fontWeight: 800, marginBottom: 6 }}>Rolling Windows — 3-Day, 5-Day, 7-Day</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.6 }}>
          Generating reports: pull the numbers introduced in Session 1 and layer the rolling windows on top of the cycle view.
          The layered read is the combination of both — cycle position tells you where you are, rolling windows tell you what is happening right now inside that cycle.
          Until report automation is live, pull rolling windows manually at the start of each day.
        </div>
      </div>

    </div>
  );
}
