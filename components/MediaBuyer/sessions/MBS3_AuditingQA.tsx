'use client';
import React from 'react';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616', surf3: '#1C1C1C',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888', acc: '#A855F7',
};

const AUDIT_STEPS = [
  { step: '1', label: 'Trace Leads to Outcome', desc: 'For each lead — was it called? When? Did it answer? Was it pitched? Did it book? If not, why? Trace every lead to its final outcome before changing anything.', icon: '🔍' },
  { step: '2', label: 'Read the Log Book', desc: 'Review the last 30 days before touching anything. Do not repeat what did not work. Log every change you make: what, why, and expected result.', icon: '📋' },
  { step: '3', label: 'Check KPIs Against Target', desc: 'Pull CPL by ad set, check frequency on all active sets, verify CTR trend, confirm spend is on pace. Layer 1 first, then Layer 2 if needed.', icon: '📊' },
  { step: '4', label: 'Competitive Research', desc: 'Audit accounts in context of what competitors are running and how the market is behaving. Recommendations made in a vacuum are guesses.', icon: '🎯' },
  { step: '5', label: 'Verify Spend Pacing', desc: 'Is the account on track to spend the right amount across the cycle? Not too fast, not too slow. Gradual corrections only.', icon: '💰' },
];

const QA_CHECKS = [
  { check: 'Zombie creative tests', detail: 'Tests concluded weeks ago but still running — still spending money with zero chance of winning. Kill every one.', severity: 'high' },
  { check: 'Audience overlap', detail: 'Multiple ad sets competing for the same audience burns budget and distorts data.', severity: 'high' },
  { check: 'Wrong geo targeting', detail: 'Service area targeting must match the Account Specific Document exactly. Wrong geo = unserviceable leads.', severity: 'high' },
  { check: 'Pixel and tracking integrity', detail: 'Broken tracking means incomplete data and wrong optimization signals sent to Meta.', severity: 'high' },
  { check: 'Things turned on that should be off', detail: 'Expired promos, wrong seasonal messaging, paused-but-still-running sets from old tests.', severity: 'medium' },
  { check: 'Things turned off that should be on', detail: 'Paused winners, missing ad sets from approved campaigns that never launched.', severity: 'medium' },
  { check: 'Log every QA check', detail: 'If you do not document it, it did not happen. Log in the account log book with date.', severity: 'rule' },
];

const BUDGET_RULES = [
  { rule: 'Protecting spend is treated as seriously as generating results', detail: 'Every dollar spent ties back to CPL and cost per booked appointment.' },
  { rule: 'Overpacing: reduce gradually', detail: '20–30% at a time. Aggressive reductions reset ad set learning and cost you days of recovery.' },
  { rule: 'Underpacing: increase gradually', detail: 'Do not try to make up underspend in the last few days. Aggressive late-cycle spend changes distort data.' },
  { rule: 'Holiday adjustments are planned, not reactive', detail: 'Scale ad spend down around major holidays in advance. Scale back up post-holiday. Failure to plan wastes client budget on zero-conversion days.' },
  { rule: 'Results should show up relatively quickly', detail: 'Overspending to "figure out" if something works is not the standard. Diagnose before spending more.' },
];

export function MBS3_AuditingQA() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Audit intro */}
      <div style={{ backgroundColor: '#0D0717', border: '1px solid #A855F733', borderRadius: 14, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #A855F7, #A855F700)' }} />
        <div style={{ color: '#A855F7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Auditing Standard</div>
        <div style={{ color: C.text, fontSize: 17, fontWeight: 900, marginBottom: 8 }}>Diagnose before acting. Every time.</div>
        <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
          Every account gets audited minimum weekly. Higher-priority or at-risk accounts get audited more often.
          Never make a change to an account without being able to state the problem it solves and the analysis that led you there.
        </p>
      </div>

      {/* Audit process */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#A855F7', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Standard Account Audit — 5 Steps</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {AUDIT_STEPS.map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: 12, padding: '12px 14px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#A855F718', border: '1px solid #A855F733', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#A855F7', fontSize: 10, fontWeight: 900 }}>STEP {s.step}</span>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{s.label}</span>
                </div>
                <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, backgroundColor: '#A855F70A', border: '1px solid #A855F722', borderLeft: '3px solid #A855F7', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
          <div style={{ color: '#A855F7', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>📌 Rule</div>
          <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>Diagnose before acting. Every time. Never make a change to an account without being able to state the problem it solves and the analysis that led you there.</div>
        </div>
      </div>

      {/* Competitive research callout */}
      <div style={{ backgroundColor: '#0D0717', border: '1px solid #A855F733', borderRadius: 12, padding: '16px 20px' }}>
        <div style={{ color: '#A855F7', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Competitive Research — Part of Every Audit</div>
        <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
          Audit accounts in the context of what competitors are running and what the market landscape looks like.
          What creative angles are competitors using? What offers? What is the saturation level in the market?
          <strong style={{ color: '#ddd' }}> Recommendations made without this context are not recommendations — they are guesses.</strong>
        </div>
      </div>

      {/* QA Standing Check */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#A855F7', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>QA — Weekly Standing Check</span>
        </div>
        <div style={{ backgroundColor: '#EF44440A', border: '1px solid #EF444422', borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
          <span style={{ color: '#EF4444', fontSize: 12, fontWeight: 700 }}>QA is not a one-time onboarding step. </span>
          <span style={{ color: '#888', fontSize: 12 }}>It is a weekly minimum for every account you own. No exceptions.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QA_CHECKS.map((q) => {
            const colors: Record<string, string> = { high: '#EF4444', medium: '#F5C800', rule: '#A855F7' };
            return (
              <div key={q.check} style={{ display: 'flex', gap: 10, padding: '10px 12px', backgroundColor: C.surf2, border: `1px solid ${colors[q.severity]}22`, borderRadius: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors[q.severity], flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ color: C.text, fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>{q.check}</div>
                  <div style={{ color: '#888', fontSize: 12, lineHeight: 1.4 }}>{q.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Management */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#A855F7', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Budget Management</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {BUDGET_RULES.map((r) => (
            <div key={r.rule} style={{ padding: '12px 14px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8 }}>
              <div style={{ color: '#A855F7', fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>{r.rule}</div>
              <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Model */}
      <div style={{ backgroundColor: '#0D0717', border: '1px solid #A855F733', borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#A855F7', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Setup Model — Directional</span>
        </div>
        <div style={{ backgroundColor: '#F5C8000A', border: '1px solid #F5C80022', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
          <span style={{ color: '#F5C800', fontSize: 11, fontWeight: 800 }}>Still being finalized — present as directional, not locked.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '12px 14px', backgroundColor: '#111', border: '1px solid #2A2A2A', borderRadius: 8 }}>
            <div style={{ color: '#ddd', fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>Option A (current direction)</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>One manual media buyer handles full account setup for everyone, carrying roughly half the normal book of business to make room for it. Hands off to the assigned buyer once setup is complete.</div>
          </div>
          <div style={{ padding: '12px 14px', backgroundColor: '#111', border: '1px solid #2A2A2A', borderRadius: 8 }}>
            <div style={{ color: '#ddd', fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>Option B (under consideration)</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>Manual buyer only handles GHL setup. Each assigned buyer does their own ad account setup from the start. Not decided.</div>
          </div>
          <div style={{ backgroundColor: '#A855F70A', border: '1px solid #A855F722', borderLeft: '3px solid #A855F7', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
            <div style={{ color: '#A855F7', fontSize: 11, fontWeight: 800, marginBottom: 4 }}>Either way</div>
            <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>The Creative Strategist owns copy and creative direction regardless of which setup model is used. Media buyer requests creative based on performance data and retains accountability for how it performs once live.</div>
          </div>
        </div>
      </div>

      {/* Creative Collaboration */}
      <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: '#A855F7', borderRadius: 2 }} />
          <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Creative Collaboration — Overview</span>
        </div>
        <div style={{ backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ color: '#A855F7', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Creative Department</div>
              {['Builds assets based on media buyer direction', 'Creative Strategist owns copy + creative direction', 'Requests come through ClickUp with full brief'].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#A855F7', fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#aaa', fontSize: 12, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Media Buyer (You)</div>
              {['Requests based on performance data', 'Gives specific feedback on what is and is not working', 'Retains accountability for how creative performs once live'].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#F5C800', fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#aaa', fontSize: 12, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, color: '#555', fontSize: 12, lineHeight: 1.5 }}>Full mechanics on creative requests and the lever library land in Session 4 with Oscar.</div>
      </div>

    </div>
  );
}
