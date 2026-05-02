'use client';
import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import teamData from '@/repo/data/team.json';

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

const TIER_ACCENT: Record<string, string> = {
  leadership:   '#4A90D9',
  pod_managers: '#22C55E',
  media_buying: '#F59E0B',
  va_management:'#A78BFA',
};

const TIER_LABELS: Record<string, string> = {
  leadership:   'Leadership',
  pod_managers: 'Pod Managers',
  media_buying: 'Media Buying & Design',
  va_management:'VA Management',
  sales:        'Sales Team',
};

const TIER_ORDER = ['leadership', 'pod_managers', 'media_buying', 'va_management', 'sales'];

function SectionTitle({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{
        color: accent ?? C.acc,
        fontSize: 11,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: 0,
      }}>
        {children}
      </h2>
      <div style={{ height: 2, backgroundColor: C.border, marginTop: 8, borderRadius: 1 }} />
    </div>
  );
}

function TeamCard({ member }: { member: typeof teamData[0] }) {
  const [expanded, setExpanded] = useState(false);
  const accent = TIER_ACCENT[member.tier] ?? C.muted;
  const hasDetails = (member as any).contact || (member as any).notes;

  return (
    <div
      style={{
        backgroundColor: C.surf3,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '12px 14px',
        cursor: hasDetails ? 'pointer' : 'default',
        transition: 'border-color 0.15s',
      }}
      onClick={() => hasDetails && setExpanded((e) => !e)}
      onMouseEnter={(e) => hasDetails && (e.currentTarget.style.borderColor = accent + '55')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
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
        }}>
          {(member as any).avatar_initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ color: C.text, fontSize: 13.5, fontWeight: 700 }}>{member.name}</span>
          </div>
          <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{member.role}</div>
        </div>
        {hasDetails && (
          <span style={{ color: C.muted2, fontSize: 11, flexShrink: 0 }}>
            {expanded ? '▲' : '▼'}
          </span>
        )}
      </div>

      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
          {(member as any).contact && (
            <div style={{ marginBottom: 6 }}>
              <span style={{ color: C.acc, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                How to contact:
              </span>
              <p style={{ color: '#ccc', fontSize: 12.5, margin: '3px 0 0', lineHeight: 1.5 }}>
                {(member as any).contact}
              </p>
            </div>
          )}
          {(member as any).notes && (
            <div>
              <span style={{ color: C.muted, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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

const TAB_GUIDE = [
  {
    id: 'worksheet',
    label: 'Worksheet',
    icon: '📋',
    color: '#22C55E',
    desc: 'Day-by-day onboarding plan for your first 10 days. Built specifically for new pods (like Pod 5) — daily tasks, checklists, and milestones to get fully operational fast.',
    start: true,
  },
  {
    id: 'sections',
    label: 'Company',
    icon: '📚',
    color: '#F5C800',
    desc: '11 training sections covering the business model, metrics, org structure, and tools. Quizzes after each.',
    start: true,
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: '📁',
    color: '#4A90D9',
    desc: 'Every SOP, tool link, and quick-access resource in one place. Reference daily.',
    start: false,
  },
  {
    id: 'recordings',
    label: 'Recordings',
    icon: '🎬',
    color: '#A78BFA',
    desc: 'Training videos, service delivery walkthroughs, and 37 Loom walkthroughs for live account scenarios.',
    start: false,
  },
];

interface PodManagerProfile {
  display_name: string;
  user_key: string;
  bio?: string;
  goal?: string;
  avatar_emoji?: string;
}

export function OverviewTab() {
  const { currentUser, setShowSearch, setActiveTab, progressPercent, completedSections } = useApp();
  const userName = currentUser?.displayName ?? 'Pod Manager';
  const [podManagers, setPodManagers] = useState<PodManagerProfile[]>([]);

  useEffect(() => {
    fetch('/api/pod-managers')
      .then((r) => r.json())
      .then((d) => setPodManagers(d.managers ?? []))
      .catch(() => {});
  }, []);

  const teamByTier = TIER_ORDER.reduce<Record<string, typeof teamData>>((acc, tier) => {
    acc[tier] = teamData.filter((m) => m.tier === tier);
    return acc;
  }, {});

  return (
    <div style={{
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: C.bg,
      color: C.text,
      fontFamily: 'Inter, system-ui, sans-serif',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px 60px' }}>

        {/* ── Welcome ── */}
        <div style={{
          background: `linear-gradient(135deg, #1A1600 0%, #141414 60%)`,
          border: `1px solid ${C.acc}44`,
          borderRadius: 16,
          padding: '28px 28px 24px',
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${C.acc}, transparent)`,
            borderRadius: '16px 16px 0 0',
          }} />
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.acc}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', position: 'relative' }}>
            <div style={{
              width: 52, height: 52, backgroundColor: C.acc, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 18, color: '#000', flexShrink: 0,
            }}>
              RI
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>
                Roof Ignite · Pod Manager Portal
              </p>
              <h1 style={{ color: C.text, fontSize: 26, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                Welcome, {userName}.
              </h1>
              <p style={{ color: '#aaa', fontSize: 13.5, margin: 0, lineHeight: 1.6, maxWidth: 540 }}>
                This portal is your single source of truth — company training, SOPs, tools, recordings,
                and your 10-day onboarding worksheet. Use it daily to stay sharp, find resources fast,
                and never miss the mark.
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
            border: `1.5px solid ${C.border2}`,
            borderRadius: 12,
            padding: '13px 16px',
            cursor: 'pointer',
            marginBottom: 20,
            textAlign: 'left',
            transition: 'border-color 0.15s, background-color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = C.acc + '88';
            e.currentTarget.style.backgroundColor = C.surf;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = C.border2;
            e.currentTarget.style.backgroundColor = C.surf2;
          }}
        >
          <span style={{ color: C.muted, fontSize: 16 }}>🔍</span>
          <span style={{ color: C.muted, fontSize: 13, flex: 1 }}>Search training sections, topics, and keywords…</span>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <span style={{ color: C.muted2, fontSize: 11, backgroundColor: C.surf3, border: `1px solid ${C.border2}`, borderRadius: 5, padding: '2px 6px', fontWeight: 700 }}>⌘</span>
            <span style={{ color: C.muted2, fontSize: 11, backgroundColor: C.surf3, border: `1px solid ${C.border2}`, borderRadius: 5, padding: '2px 6px', fontWeight: 700 }}>K</span>
          </div>
        </button>

        {/* ── Training Progress ── */}
        <div style={{ marginBottom: 24 }}>
          <SectionTitle>Training Progress</SectionTitle>
          <div style={{
            backgroundColor: C.surf2,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}>
            {/* Progress bar */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>Company Training</span>
                <span style={{ color: C.acc, fontSize: 13, fontWeight: 800 }}>{progressPercent}%</span>
              </div>
              <div style={{ height: 8, backgroundColor: C.surf3, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  backgroundColor: C.acc,
                  borderRadius: 4,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 6 }}>
                {completedSections.length} of 11 sections complete · {11 - completedSections.length} remaining
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setActiveTab('sections')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: progressPercent === 0 ? C.acc : C.acc,
                color: '#000',
                fontWeight: 800,
                fontSize: 12,
                padding: '9px 16px',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              ▶ {progressPercent === 0 ? 'Start Training' : progressPercent === 100 ? 'Review Training' : 'Continue Training'}
            </button>
          </div>
        </div>

        {/* ── Portal Guide ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Portal Guide</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
            {TAB_GUIDE.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  gap: 12,
                  backgroundColor: C.surf2,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '14px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tab.color + '66';
                  e.currentTarget.style.backgroundColor = C.surf;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.backgroundColor = C.surf2;
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: tab.color + '18',
                  border: `1px solid ${tab.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 17,
                  flexShrink: 0,
                }}>
                  {tab.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{tab.label}</span>
                    {tab.start && (
                      <span style={{
                        backgroundColor: tab.color,
                        color: '#000',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: 20,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}>
                        Week 1
                      </span>
                    )}
                  </div>
                  <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{tab.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Your Role ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Your Role</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
            {[
              {
                icon: '🎯',
                title: 'Revenue Retention Engine',
                body: 'You are the quarterback — not the player. You diagnose, prescribe, and coordinate. Emmanuel & Mervin build, Leila manages VAs, Ken designs. You own the outcomes.',
              },
              {
                icon: '📋',
                title: 'You Own the Client Relationship',
                body: 'Once a client is closed, you take over. Onboarding call → setup coordination → launch → optimization → cycle completion → renewal. You are the client\'s single point of contact from day one to renewal.',
              },
              {
                icon: '⚡',
                title: '3 Things to Internalize',
                list: [
                  'Layer 1 first, always — if bookings are on pace, don\'t touch anything.',
                  'Cost per Booking — spend ÷ booked appointments. Not CPL, ever.',
                  'Speed to cashflow — every day a client isn\'t launched is revenue delayed.',
                ],
              },
            ].map((card) => (
              <div key={card.title} style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{card.icon}</div>
                <h3 style={{ color: C.text, fontSize: 14, fontWeight: 800, margin: '0 0 8px' }}>{card.title}</h3>
                {card.body && <p style={{ color: C.muted, fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>{card.body}</p>}
                {card.list && (
                  <ul style={{ color: C.muted, fontSize: 12.5, margin: 0, paddingLeft: 16, lineHeight: 1.8 }}>
                    {card.list.map((item) => (
                      <li key={item}><span style={{ color: C.text, fontWeight: 700 }}>{item.split(' — ')[0]}</span>{item.includes(' — ') ? ` — ${item.split(' — ')[1]}` : ''}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Operating rhythm */}
          <div style={{
            marginTop: 12,
            backgroundColor: '#001A00',
            border: `1px solid ${C.green}44`,
            borderRadius: 10,
            padding: '14px 18px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>📅</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.green, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                Weekly Operating Rhythm
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
                {[
                  { day: 'Mon & Thu', action: 'Post status updates per account: cycle #, days elapsed, bookings vs target, health color, action steps with dates' },
                  { day: 'Tue & Fri', action: 'Review calls with Jonathan & Oscar — come with prescriptions, not just reports. Attend Fridays first.' },
                  { day: 'Daily', action: 'Check Command Center + Logbook for open (white) leads. Reply to client messages same day.' },
                ].map((r) => (
                  <div key={r.day} style={{ backgroundColor: '#002200', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ color: C.green, fontSize: 11, fontWeight: 800, marginBottom: 3 }}>{r.day}</div>
                    <div style={{ color: '#aaa', fontSize: 12, lineHeight: 1.5 }}>{r.action}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Team Directory ── */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Team Directory</SectionTitle>
          <p style={{ color: C.muted, fontSize: 12.5, margin: '0 0 16px', lineHeight: 1.5 }}>
            Click any card to see how to contact them and key notes.
            Always use <strong style={{ color: C.text }}>ClickUp for tasks</strong> and <strong style={{ color: C.text }}>Slack for async comms</strong> — never route around the system.
          </p>
          {TIER_ORDER.map((tier) => {
            const members = teamByTier[tier];
            if (!members || members.length === 0) return null;
            const accent = TIER_ACCENT[tier];
            return (
              <div key={tier} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 3, height: 14, backgroundColor: accent, borderRadius: 2, flexShrink: 0 }} />
                  <span style={{ color: accent, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    {TIER_LABELS[tier]}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
                  {members.map((m) => (
                    <TeamCard key={m.id} member={m} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pod Manager Profiles ── */}
        {podManagers.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <SectionTitle accent="#22C55E">Pod Managers</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
              {podManagers.map((pm) => {
                const isMe = pm.user_key === currentUser?.userKey;
                return (
                  <div
                    key={pm.user_key}
                    style={{
                      backgroundColor: isMe ? '#1A1600' : C.surf3,
                      border: `1px solid ${isMe ? C.acc + '44' : C.border}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: pm.bio || pm.goal ? 8 : 0 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        backgroundColor: C.green + '22',
                        border: `1.5px solid ${C.green}66`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: pm.avatar_emoji ? 18 : 13, fontWeight: 900, color: C.green, flexShrink: 0,
                      }}>
                        {pm.avatar_emoji ?? pm.display_name[0]}
                      </div>
                      <div>
                        <div style={{ color: C.text, fontSize: 13.5, fontWeight: 700 }}>
                          {pm.display_name}
                          {isMe && <span style={{ color: C.acc, fontSize: 10, fontWeight: 800, marginLeft: 6, verticalAlign: 'middle' }}>YOU</span>}
                        </div>
                        <div style={{ color: C.muted, fontSize: 11.5, marginTop: 1 }}>Pod Manager</div>
                      </div>
                    </div>
                    {pm.bio && (
                      <p style={{ color: '#aaa', fontSize: 12, margin: '0 0 4px', lineHeight: 1.5 }}>{pm.bio}</p>
                    )}
                    {pm.goal && (
                      <div style={{ backgroundColor: C.green + '11', border: `1px solid ${C.green}22`, borderRadius: 6, padding: '5px 8px', marginTop: 4 }}>
                        <span style={{ color: C.green, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>30-day goal: </span>
                        <span style={{ color: '#aaa', fontSize: 12 }}>{pm.goal}</span>
                      </div>
                    )}
                    {!pm.bio && !pm.goal && isMe && (
                      <button
                        onClick={() => {/* triggers profile modal via storage event */
                          localStorage.removeItem(`ri_${pm.user_key}_profile_setup_seen`);
                          window.location.reload();
                        }}
                        style={{ color: C.acc, fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}
                      >
                        Set up your profile →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Slack Channels ── */}
        <div>
          <SectionTitle>Key Slack Channels</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
            {[
              {
                channel: '#ops-manager-discussion',
                desc: 'Post your Monday & Thursday status updates here. All pod managers, media buyers, and leadership are in this channel.',
                color: C.acc,
              },
              {
                channel: '#internal-team',
                desc: 'Account-specific requests, VA task context, and team-wide notices. Post here when you need the VA team to know something about an account.',
                color: C.green,
              },
            ].map((ch) => (
              <div
                key={ch.channel}
                style={{
                  backgroundColor: C.surf3,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <div style={{
                  color: ch.color,
                  fontSize: 13,
                  fontWeight: 800,
                  marginBottom: 6,
                  fontFamily: 'monospace',
                }}>
                  {ch.channel}
                </div>
                <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.55 }}>{ch.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
