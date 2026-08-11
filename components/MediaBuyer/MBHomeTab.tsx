'use client';
import React from 'react';
import { useApp } from '@/context/AppContext';
import { MB_TRAINING_DAYS } from '@/data/mbTrainingData';

const C = {
  bg: '#0A0A0A',
  surf: '#111111',
  surf2: '#161616',
  surf3: '#1C1C1C',
  border: '#1E1E1E',
  border2: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  muted2: '#555555',
  acc: '#F5C800',
  blue: '#4A90D9',
};

function Pill({
  children,
  color = C.acc,
  bg,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        backgroundColor: bg ?? color + '18',
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {children}
    </span>
  );
}

interface PillarCardProps {
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  goal: string;
  steps: string[];
}

function PillarCard({ number, title, subtitle, accent, goal, steps }: PillarCardProps) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        backgroundColor: C.surf,
        border: `1px solid ${accent}33`,
        borderRadius: 14,
        padding: '20px 20px 18px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: accent,
          borderRadius: '14px 14px 0 0',
        }}
      />

      <div style={{ marginBottom: 12 }}>
        <Pill color={accent}>{`Pillar ${number}`}</Pill>
      </div>

      <h2
        style={{
          color: C.text,
          fontSize: 15,
          fontWeight: 800,
          margin: '0 0 4px',
          letterSpacing: '-0.2px',
        }}
      >
        {title}
      </h2>
      <p style={{ color: C.muted, fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 }}>
        {subtitle}
      </p>

      <div
        style={{
          backgroundColor: accent + '0E',
          border: `1px solid ${accent}22`,
          borderRadius: 8,
          padding: '8px 12px',
          marginBottom: 14,
        }}
      >
        <span style={{ color: accent, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Goal:{' '}
        </span>
        <span style={{ color: '#bbb', fontSize: 12 }}>{goal}</span>
      </div>

      <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map((step, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span
              style={{
                flexShrink: 0,
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: accent + '22',
                border: `1px solid ${accent}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 800,
                color: accent,
                marginTop: 1,
              }}
            >
              {i + 1}
            </span>
            <span style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.5 }}>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TimelineRowProps {
  range: string;
  label: string;
  isLast?: boolean;
}

function TimelineRow({ range, label, isLast = false }: TimelineRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        paddingBottom: isLast ? 0 : 14,
        borderBottom: isLast ? 'none' : `1px solid ${C.border}`,
        marginBottom: isLast ? 0 : 14,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          minWidth: 72,
          backgroundColor: C.surf2,
          border: `1px solid ${C.border2}`,
          borderRadius: 6,
          padding: '4px 8px',
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: C.acc,
          fontFamily: 'monospace',
        }}
      >
        {range}
      </div>
      <span style={{ color: '#bbb', fontSize: 13, lineHeight: 1.55, paddingTop: 2 }}>{label}</span>
    </div>
  );
}

interface EscalationStepProps {
  number: number;
  label: string;
  detail: string;
  isLast?: boolean;
}

function EscalationStep({ number, label, detail, isLast = false }: EscalationStepProps) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {/* Number + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: number === 1 ? C.acc + '22' : C.surf3,
            border: `1.5px solid ${number === 1 ? C.acc + '66' : C.border2}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 900,
            color: number === 1 ? C.acc : C.muted,
          }}
        >
          {number}
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 18,
              backgroundColor: C.border2,
              margin: '4px 0',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 16, flex: 1 }}>
        <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{label}</div>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{detail}</div>
      </div>
    </div>
  );
}

export function MBHomeTab() {
  const { completedMBDays, mbTrainingPercent, setActiveTab } = useApp();
  const nextDay = MB_TRAINING_DAYS.find((d) => !completedMBDays.includes(d.id));
  const allDone = completedMBDays.length === MB_TRAINING_DAYS.length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '28px 20px 60px',
        color: C.text,
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ── Page header ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1A1400 0%, #111111 60%)',
            border: `1px solid ${C.acc}33`,
            borderRadius: 16,
            padding: '28px 28px 24px',
            marginBottom: 24,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* top accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${C.acc}, transparent)`,
              borderRadius: '16px 16px 0 0',
            }}
          />
          {/* ambient glow */}
          <div
            style={{
              position: 'absolute', top: -40, right: -40,
              width: 180, height: 180, borderRadius: '50%',
              background: `radial-gradient(circle, ${C.acc}0D 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', position: 'relative' }}>
            <div
              style={{
                width: 48, height: 48, backgroundColor: C.acc, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 16, color: '#000', flexShrink: 0,
              }}
            >
              MB
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1
                  style={{
                    color: C.text,
                    fontSize: 24,
                    fontWeight: 900,
                    margin: 0,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Welcome to your portal.
                </h1>
                <Pill color={C.acc}>Media Buyer</Pill>
              </div>
              <p style={{ color: '#999', fontSize: 13, margin: 0, lineHeight: 1.65, maxWidth: 560 }}>
                You own ad performance across your accounts — strategy, execution, and creative direction.
                CSM owns the client relationship. You own the results. Every change you make directly
                shapes how a client performs on their 28-day cycle.
              </p>
            </div>
          </div>
        </div>

        {/* ── Training Progress ── */}
        <div style={{
          backgroundColor: C.surf,
          border: `1px solid ${allDone ? '#22C55E33' : C.acc + '33'}`,
          borderRadius: 14,
          padding: '18px 22px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{allDone ? '🏆' : '📚'}</span>
              <span style={{ color: allDone ? '#22C55E' : C.acc, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {allDone ? 'Training Complete' : '4-Session Training Program'}
              </span>
            </div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.5, marginBottom: 10 }}>
              {allDone
                ? 'You\'ve completed all 5 days. Use SOPs and Tools as your daily reference.'
                : nextDay
                ? `Next up: Day ${nextDay.id} — ${nextDay.title}`
                : 'Start Day 1 below — pass each quiz at 80%+ to progress.'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, maxWidth: 200, height: 4, backgroundColor: '#1f1f1f', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${mbTrainingPercent}%`, height: '100%', background: allDone ? '#22C55E' : C.acc, transition: 'width 0.4s' }} />
              </div>
              <span style={{ color: '#555', fontSize: 11 }}>{completedMBDays.length}/{MB_TRAINING_DAYS.length} sessions · {mbTrainingPercent}%</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('mb_training')}
            style={{
              padding: '10px 18px', borderRadius: 8,
              border: `1px solid ${allDone ? '#22C55E44' : C.acc + '44'}`,
              background: 'transparent',
              color: allDone ? '#22C55E' : C.acc,
              fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0,
            }}
          >
            {allDone ? 'Review Sessions' : completedMBDays.length === 0 ? 'Start Session 1 →' : 'Continue →'}
          </button>
        </div>

        {/* ── Team Structure ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Media Buying Team
            </span>
          </div>
          <p style={{ color: '#666', fontSize: 12, margin: '0 0 14px', lineHeight: 1.5 }}>
            The pod model is retired — we now operate in departments. Media Buying owns ad performance. Sales/CSM owns all client communication. These lines do not cross.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              {
                name: 'Emmanuel',
                role: 'Setup Lead',
                bullets: ['Handles all new client account builds', 'MB handoff once account is live'],
                color: '#F59E0B',
              },
              {
                name: 'Bren',
                role: 'Media Buyer',
                bullets: ['Ongoing account management', 'Performance optimization & QA'],
                color: '#818CF8',
              },
              {
                name: 'Mervin',
                role: 'Media Buyer',
                bullets: ['Ongoing account management', 'KPI monitoring & reporting'],
                color: '#2DD4BF',
              },
              {
                name: 'Ken',
                role: 'Creative Lead',
                bullets: ['Static & video ad assets', 'Creative direction & strategy'],
                color: '#FB923C',
              },
            ].map((mb) => (
              <div
                key={mb.name}
                style={{
                  flex: '1 1 170px',
                  backgroundColor: C.surf,
                  border: `1px solid ${mb.color}33`,
                  borderRadius: 12,
                  padding: '14px 16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: mb.color }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: mb.color + '22', border: `1.5px solid ${mb.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 900, color: mb.color, flexShrink: 0,
                  }}>
                    {mb.name[0]}
                  </div>
                  <div>
                    <div style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>{mb.name}</div>
                    <div style={{ color: mb.color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{mb.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {mb.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <span style={{ color: mb.color, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                      <span style={{ color: '#999', fontSize: 11.5, lineHeight: 1.4 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Other departments you coordinate with */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            {[
              { label: 'Sales / CSM', desc: 'Owns the client relationship. All client communication routes through them — never directly from you.', color: '#EF4444' },
              { label: 'VA / Call Center', desc: 'Calls leads and books appointments. You coordinate on lead quality and call volume.', color: '#22C55E' },
              { label: 'Tech / Automations', desc: 'GHL setup, integrations, technical blockers. Escalate tech issues here.', color: '#818CF8' },
            ].map((dept) => (
              <div key={dept.label} style={{
                flex: '1 1 200px',
                backgroundColor: C.surf,
                border: `1px solid ${dept.color}22`,
                borderRadius: 10,
                padding: '12px 14px',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: dept.color, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ color: dept.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{dept.label}</div>
                  <div style={{ color: '#666', fontSize: 11.5, lineHeight: 1.5 }}>{dept.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Weekly Check-in & EOD Reports ── */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          {/* Weekly meeting */}
          <div style={{
            flex: '1 1 220px',
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${C.blue}`,
            borderRadius: 12,
            padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>📅</span>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Weekly Check-in</span>
            </div>
            <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6, marginBottom: 10 }}>
              Every <strong style={{ color: C.text }}>Monday 12–1 pm ET</strong> — team review with Jonathan & leadership.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {['Review previous week wins & blockers', 'Preview the week ahead', 'Strategy session + open questions'].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: C.blue, fontSize: 10, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#888', fontSize: 12, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EOD reports */}
          <div style={{
            flex: '2 1 320px',
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${C.acc}`,
            borderRadius: 12,
            padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>📝</span>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>Daily EOD Report</span>
              <span style={{
                backgroundColor: C.acc + '18', border: `1px solid ${C.acc}44`,
                borderRadius: 6, padding: '1px 7px', fontSize: 10, fontWeight: 800,
                color: C.acc, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>Required</span>
            </div>
            <p style={{ color: '#888', fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 }}>
              Post in <strong style={{ color: C.acc }}>#media-buyers</strong> before logging off each day. Format:
            </p>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '12px 14px', fontFamily: 'monospace', fontSize: 11.5, lineHeight: 1.7, color: '#bbb' }}>
              <div style={{ color: C.acc, fontWeight: 800, marginBottom: 4 }}>MM/DD End of Day</div>
              <div><span style={{ color: '#555' }}>✅ Completed:</span> Task name (~X hrs)</div>
              <div><span style={{ color: '#555' }}>✅ Completed:</span> Task name (~X hrs)</div>
              <div><span style={{ color: '#555' }}>🔄 In Progress:</span> Task name — ETA: [day]</div>
              <div><span style={{ color: '#555' }}>🚧 Blocker:</span> [describe if any]</div>
            </div>
          </div>
        </div>

        {/* ── Two Pillars ── */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Two Pillars of Your Role
            </span>
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <PillarCard
              number="1"
              title="Initial Onboarding Setup"
              subtitle="One-time per client. Launch fast without cutting corners. Test multiple creative formats from day one."
              accent={C.acc}
              goal="Live within 5–7 business days"
              steps={[
                'GHL setup via RoofIgnite dashboard (flag issues to Cole)',
                'Calendar, landing page + branding',
                'Domain (Namesilo/Porkbun + Cloudflare) + Meta pixel',
                'Launch with mixed creatives: organic images (single/bi/trifold), text-based statics (Ken), ArcAds video, RoofIgnite Studio statics',
              ]}
            />
            <PillarCard
              number="2"
              title="Ongoing Management"
              subtitle="Continuous optimization — maintaining and improving performance across all active accounts."
              accent={C.blue}
              goal="Performance improvements"
              steps={[
                'Landing page shortening (7Q → 4Q)',
                'Creative refreshes on dying ad sets',
                'Pixel conditioning / CAPI setup',
                'CRM sync via Zapier',
                'Survey gates for out-of-area leads',
                'A2P fixes for caller-ID and messaging',
              ]}
            />
          </div>
        </div>

        {/* ── Launch Timeline ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Pillar 1 Launch Timeline
            </span>
          </div>

          <div
            style={{
              backgroundColor: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: '20px 22px',
            }}
          >
            <TimelineRow
              range="Days 1–5"
              label="GHL snapshot setup, landing page + branding, domain connected + pixel linked, ad account built with copy and creative."
            />
            <TimelineRow
              range="Days 5–7"
              label="Account reviewed, approved, and launched. Client is live and spending."
            />
            <TimelineRow
              range="Day 7+"
              label="If still not live: flag your M&O Manager immediately with a specific blocker — don't wait, don't guess."
              isLast
            />
          </div>
        </div>

        {/* ── Bottom row: Escalation + Slack ── */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>

          {/* Escalation Path */}
          <div
            style={{
              flex: '2 1 300px',
              backgroundColor: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: '20px 22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
              <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Escalation Path
              </span>
            </div>
            <p style={{ color: C.muted, fontSize: 12, margin: '0 0 16px', lineHeight: 1.5 }}>
              Always exhaust these in order before going up the chain.
            </p>

            <EscalationStep
              number={1}
              label="Find it yourself"
              detail="This portal → Master Index → the SOP. 80% of answers are already here."
            />
            <EscalationStep
              number={2}
              label="Ask Claude"
              detail="The AI assistant built into this portal. Good for fast lookups and drafting."
            />
            <EscalationStep
              number={3}
              label="Ask your peers"
              detail="Other media buyers. DM them on Slack — they've probably hit the same issue."
            />
            <EscalationStep
              number={4}
              label="Escalate to Jon or Oscar"
              detail="Last resort only. Never feel bad about it — but come with context, not just a question."
              isLast
            />
          </div>

          {/* Slack Channels */}
          <div
            style={{
              flex: '1 1 220px',
              backgroundColor: C.surf,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              padding: '20px 22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
              <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Slack Channels
              </span>
            </div>
            <p style={{ color: C.muted, fontSize: 12, margin: '0 0 14px', lineHeight: 1.5 }}>
              Your primary Slack channels.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: '#media-buyers', desc: 'Your main channel — EOD reports, questions, blockers, wins. Tag leadership here.', highlight: true },
                { name: '#internal-team', desc: 'Company-wide announcements.' },
                { name: '#ops-manager-discussion', desc: 'Media buyers + leadership. Strategy and ops discussion.' },
              ].map((ch) => (
                <div
                  key={ch.name}
                  style={{
                    backgroundColor: 'highlight' in ch && ch.highlight ? C.acc + '0A' : C.surf2,
                    border: `1px solid ${'highlight' in ch && ch.highlight ? C.acc + '33' : C.border2}`,
                    borderRadius: 8,
                    padding: '10px 12px',
                  }}
                >
                  <div
                    style={{
                      color: C.acc,
                      fontSize: 13,
                      fontWeight: 800,
                      marginBottom: 3,
                      fontFamily: 'monospace',
                    }}
                  >
                    {ch.name}
                  </div>
                  <div style={{ color: C.muted, fontSize: 11.5, lineHeight: 1.5 }}>{ch.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
