'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import teamData from '@/repo/data/team.json';

// ----------- Colour tokens (shared with WorksheetTab) -----------
const C = {
  bg: '#0A0A0A',
  surf: '#141414',
  surf2: '#1C1C1C',
  surf3: '#242424',
  border: '#2A2A2A',
  border2: '#383838',
  text: '#F5F5F5',
  muted: '#888888',
  muted2: '#555555',
  acc: '#F5C800',
  green: '#22C55E',
  orange: '#F59E0B',
  blue: '#4A90D9',
  red: '#EF4444',
};

// ----------- Team avatar colours -----------
const TIER_ACCENT: Record<string, string> = {
  leadership: '#4A90D9',
  pod_managers: '#22C55E',
  media_buying: '#F59E0B',
  va_management: '#A78BFA',
};

const TIER_LABELS: Record<string, string> = {
  leadership: 'Leadership',
  pod_managers: 'Pod Managers',
  media_buying: 'Media Buying & Design',
  va_management: 'VA Management',
};

// Order of tiers to display
const TIER_ORDER = ['leadership', 'pod_managers', 'media_buying', 'va_management'];

// ----------- Section header -----------
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2
        style={{
          color: C.acc,
          fontSize: 11,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div style={{ height: 2, backgroundColor: C.border, marginTop: 8, borderRadius: 1 }} />
    </div>
  );
}

// ----------- Card wrapper -----------
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        backgroundColor: C.surf2,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '18px 20px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ----------- Team member card -----------
function TeamCard({ member }: { member: typeof teamData[0] }) {
  const [expanded, setExpanded] = useState(false);
  const accent = TIER_ACCENT[member.tier] ?? C.muted;

  return (
    <div
      style={{
        backgroundColor: C.surf3,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '12px 14px',
        cursor: (member as any).contact || (member as any).notes ? 'pointer' : 'default',
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: accent + '22',
            border: `1.5px solid ${accent}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 900,
            color: accent,
            flexShrink: 0,
          }}
        >
          {(member as any).avatar_initial}
        </div>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ color: C.text, fontSize: 13.5, fontWeight: 700 }}>{member.name}</span>
          </div>
          <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{member.role}</div>
        </div>
        {/* Expand chevron */}
        {((member as any).contact || (member as any).notes) && (
          <span style={{ color: C.muted2, fontSize: 12, flexShrink: 0 }}>
            {expanded ? '▲' : '▼'}
          </span>
        )}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
          {(member as any).contact && (
            <div style={{ marginBottom: 6 }}>
              <span
                style={{
                  color: C.acc,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                How to contact:
              </span>
              <p style={{ color: '#ccc', fontSize: 12.5, margin: '3px 0 0', lineHeight: 1.5 }}>
                {(member as any).contact}
              </p>
            </div>
          )}
          {(member as any).notes && (
            <div>
              <span
                style={{
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Notes:
              </span>
              <p style={{ color: C.muted, fontSize: 12.5, margin: '3px 0 0', lineHeight: 1.5 }}>
                {(member as any).notes}
              </p>
            </div>
          )}
          {(member as any).timezone && (
            <p style={{ color: C.muted, fontSize: 11.5, marginTop: 4 }}>
              🌏 {(member as any).timezone} · {(member as any).turnaround_hours}h turnaround
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ----------- Main OverviewTab -----------
export function OverviewTab() {
  const { currentUser, setShowSearch } = useApp();
  const userName = currentUser?.displayName ?? 'Pod Manager';

  // Group team by tier
  const teamByTier = TIER_ORDER.reduce<Record<string, typeof teamData>>((acc, tier) => {
    acc[tier] = teamData.filter((m) => m.tier === tier);
    return acc;
  }, {});

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 48px)',
        backgroundColor: C.bg,
        color: C.text,
        fontFamily: 'Inter, system-ui, sans-serif',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* ── Welcome ── */}
        <div
          style={{
            background: `linear-gradient(135deg, #1A1600 0%, #141414 60%)`,
            border: `1px solid ${C.acc}44`,
            borderRadius: 16,
            padding: '28px 28px 24px',
            marginBottom: 20,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${C.acc}, transparent)`,
              borderRadius: '16px 16px 0 0',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div
              style={{
                width: 52,
                height: 52,
                backgroundColor: C.acc,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 18,
                color: '#000',
                flexShrink: 0,
              }}
            >
              RI
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>
                Roof Ignite · Pod Manager Portal
              </p>
              <h1 style={{ color: C.text, fontSize: 26, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                Welcome, {userName}.
              </h1>
              <p style={{ color: '#aaa', fontSize: 14, margin: 0, lineHeight: 1.6, maxWidth: 580 }}>
                This portal is your single source of truth for everything you need as a pod manager —
                company training, SOPs, recordings, tools, and your 10-day onboarding worksheet.
                Use it daily to stay educated, find resources fast, and never miss the mark.
              </p>
            </div>
          </div>
        </div>

        {/* ── Search bar ── */}
        <button
          onClick={() => setShowSearch(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: C.surf2,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: '11px 16px',
            cursor: 'pointer',
            marginBottom: 24,
            textAlign: 'left',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.acc + '66')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
        >
          <span style={{ color: C.muted2, fontSize: 15 }}>🔍</span>
          <span style={{ color: C.muted2, fontSize: 13, flex: 1 }}>Search training sections, SOPs, recordings…</span>
          <span style={{ color: C.muted2, fontSize: 11, backgroundColor: C.surf3, border: `1px solid ${C.border2}`, borderRadius: 4, padding: '1px 6px' }}>⌘K</span>
        </button>

        {/* ── Your Role ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Your Role</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            <Card>
              <div style={{ fontSize: 24, marginBottom: 10 }}>🎯</div>
              <h3 style={{ color: C.text, fontSize: 15, fontWeight: 800, margin: '0 0 8px' }}>
                Revenue Retention Engine
              </h3>
              <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                You are the quarterback — not the player. You diagnose, prescribe, and coordinate.
                Emmanuel builds, Leila manages VAs, Ken designs. You own the outcomes.
              </p>
            </Card>
            <Card>
              <div style={{ fontSize: 24, marginBottom: 10 }}>📋</div>
              <h3 style={{ color: C.text, fontSize: 15, fontWeight: 800, margin: '0 0 8px' }}>
                You Own Phases 4–9
              </h3>
              <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                Onboarding call → setup coordination → launch → optimization → cycle completion → renewal.
                You are the client's single point of contact throughout.
              </p>
            </Card>
            <Card>
              <div style={{ fontSize: 24, marginBottom: 10 }}>⚡</div>
              <h3 style={{ color: C.text, fontSize: 15, fontWeight: 800, margin: '0 0 8px' }}>
                3 Things to Internalize
              </h3>
              <ul style={{ color: C.muted, fontSize: 13, margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
                <li>Layer 1 before Layer 2. Always.</li>
                <li><strong style={{ color: C.text }}>Cost per Booking</strong> = spend ÷ appointments. Not CPL.</li>
                <li>Speed to Cashflow — every day unlaunched delays payment.</li>
              </ul>
            </Card>
          </div>

          {/* Operating rhythm callout */}
          <div
            style={{
              marginTop: 12,
              backgroundColor: '#001A00',
              border: `1px solid ${C.green}44`,
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>📅</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.green, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                Weekly Operating Rhythm
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { day: 'Mon & Thu', action: 'Post status updates (every active account: cycle #, days elapsed, bookings vs target, health color, action steps)' },
                  { day: 'Tue & Fri', action: 'Review calls with Jonathan & Oscar — come with prescriptions, not just reports' },
                  { day: 'Daily', action: 'Check Command Center + Logbook for open leads' },
                ].map((r) => (
                  <div key={r.day} style={{ flex: '1 1 200px' }}>
                    <span style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>{r.day}: </span>
                    <span style={{ color: C.muted, fontSize: 12 }}>{r.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Team Directory ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Team Directory</SectionTitle>
          <p style={{ color: C.muted, fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
            Click any card to see how to contact them and key notes. Never go around the system — use ClickUp for tasks, Slack for async comms.
          </p>
          {TIER_ORDER.map((tier) => {
            const members = teamByTier[tier];
            if (!members || members.length === 0) return null;
            const accent = TIER_ACCENT[tier];
            return (
              <div key={tier} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 14,
                      backgroundColor: accent,
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      color: accent,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                    }}
                  >
                    {TIER_LABELS[tier]}
                  </span>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 8,
                  }}
                >
                  {members.map((m) => (
                    <TeamCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Slack Channels ── */}
        <div>
          <SectionTitle>Key Slack Channels</SectionTitle>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 8,
            }}
          >
            {[
              { channel: '#ops', desc: 'Operations announcements and SOP updates. Read daily.' },
              { channel: '#internal-team', desc: 'VA task assignments and team-wide notices. Post all account-specific requests here.' },
            ].map((ch) => (
              <div
                key={ch.channel}
                style={{
                  backgroundColor: C.surf3,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    color: C.acc,
                    fontSize: 12.5,
                    fontWeight: 800,
                    marginBottom: 4,
                    fontFamily: 'monospace',
                  }}
                >
                  {ch.channel}
                </div>
                <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{ch.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
