'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import teamData from '@/repo/data/team.json';
import recordingsData from '@/repo/data/recordings.json';

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
  const isPod4 = (member as any).pod === 4;

  return (
    <div
      style={{
        backgroundColor: C.surf3,
        border: `1px solid ${isPod4 ? C.acc + '44' : C.border}`,
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
            {isPod4 && (
              <span
                style={{
                  backgroundColor: C.acc + '22',
                  border: `1px solid ${C.acc}55`,
                  color: C.acc,
                  fontSize: 9,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Your Pod
              </span>
            )}
            {(member as any).is_key && (
              <span
                style={{
                  backgroundColor: '#2A1A00',
                  border: `1px solid ${C.orange}44`,
                  color: C.orange,
                  fontSize: 9,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Key Contact
              </span>
            )}
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

// ----------- Reference link -----------
function RefLink({
  icon,
  label,
  desc,
  url,
  badge,
}: {
  icon: string;
  label: string;
  desc: string;
  url: string;
  badge?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 14px',
        backgroundColor: C.surf3,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        textDecoration: 'none',
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.acc + '88')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.border)}
    >
      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{label}</span>
          {badge && (
            <span
              style={{
                backgroundColor: C.acc,
                color: '#000',
                fontSize: 9,
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: 4,
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
      </div>
      <span style={{ color: C.muted2, fontSize: 12, flexShrink: 0, marginTop: 2 }}>↗</span>
    </a>
  );
}

// ----------- Main OverviewTab -----------
export function OverviewTab() {
  const { currentUser } = useApp();
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
            marginBottom: 28,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative accent */}
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
              CI
            </div>
            <div>
              <p style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>
                Pod 4 · April 14, 2026
              </p>
              <h1 style={{ color: C.text, fontSize: 26, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                Welcome, {userName}.
              </h1>
              <p style={{ color: '#aaa', fontSize: 14, margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
                You're joining <strong style={{ color: C.text }}>Roof Ignite</strong> as a Pod 4 Manager.
                Your job is to be the single point of accountability for a portfolio of contractor clients — from onboarding through renewal.
              </p>
            </div>
          </div>

          {/* Mission strip */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 20,
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Primary niche', value: 'Roofing (80–90%)' },
              { label: 'Billing model', value: '28-day performance cycles' },
              { label: 'Your target', value: '25–30 accounts' },
              { label: 'Revenue target', value: '$1M/mo by Q3 2026' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  flex: '1 1 140px',
                  backgroundColor: C.surf3,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              >
                <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                  {item.label}
                </div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

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

        {/* ── Quick Reference ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Reference Recordings</SectionTitle>
          <p style={{ color: C.muted, fontSize: 13, margin: '0 0 12px' }}>
            Real calls and walkthroughs to study. Start with Service Delivery Part 2.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recordingsData.recordings.map((rec) => (
              <RefLink
                key={rec.id}
                icon="🎥"
                label={rec.title}
                desc={rec.description}
                url={rec.url}
                badge={(rec as any).watch_first ? 'Watch First' : undefined}
              />
            ))}
          </div>
        </div>

        {/* ── SOPs & Tools ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>SOPs & Tools</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recordingsData.sop_links.map((sop) => (
              <RefLink
                key={sop.id}
                icon="📄"
                label={sop.title}
                desc={sop.description}
                url={sop.url}
              />
            ))}
            {recordingsData.tools.map((tool) => (
              <RefLink
                key={tool.id}
                icon="🔧"
                label={tool.title}
                desc={tool.description}
                url={tool.url}
              />
            ))}
            <RefLink
              icon="🖥️"
              label="GoHighLevel (GHL)"
              desc="Central CRM. Sub-account view, contacts, automations, calendar. Start here for any active account."
              url="https://app.gohighlevel.com"
            />
            <RefLink
              icon="📢"
              label="Meta Business Manager"
              desc="Campaign dashboard. Review metrics, check placements, verify CAPI and campaign naming (B2C required)."
              url="https://business.facebook.com"
            />
            <RefLink
              icon="✅"
              label="ClickUp"
              desc="All task coordination lives here. Create tasks for Emmanuel (setups, A2P), Ken (creatives), Leila (VA issues). Always include client details + 48hr deadline."
              url="https://app.clickup.com"
            />
          </div>
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
              { channel: '#ops', desc: 'Operations announcements and SOP updates.' },
              { channel: '#internal-team', desc: 'VA task assignments and team-wide notices. Post account-specific notes here.' },
              { channel: '#closer-call-recordings', desc: 'Every sales call. Pull these before every client onboarding call.' },
              { channel: '#post-onboarding-discussion', desc: 'Post your Custom GPT summary after every onboarding call.' },
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
