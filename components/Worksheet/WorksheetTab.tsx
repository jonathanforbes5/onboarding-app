'use client';
import React, { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import dayContent from '@/repo/data/day-content.json';

// ----------- Types -----------

interface RecordingItem {
  text: string;
  recording_id: string;
}

interface DaySection {
  id: string;
  title: string;
  type: string;
  type_detail?: string;
  content?: string;
  instruction?: string;
  callout?: { type: string; text: string };
  items?: (string | RecordingItem)[];
}

interface Day {
  day: number;
  title: string;
  subtitle: string;
  quiz_id: string | null;
  sections: DaySection[];
}

// ----------- Pod 4 specific dates (Mon–Fri, Apr 14–25, 2026) -----------
const DAY_DATES: Record<number, { short: string; full: string; week: number }> = {
  1:  { short: 'Mon Apr 14', full: 'Monday, April 14 2026',  week: 1 },
  2:  { short: 'Tue Apr 15', full: 'Tuesday, April 15 2026', week: 1 },
  3:  { short: 'Wed Apr 16', full: 'Wednesday, April 16 2026', week: 1 },
  4:  { short: 'Thu Apr 17', full: 'Thursday, April 17 2026', week: 1 },
  5:  { short: 'Fri Apr 18', full: 'Friday, April 18 2026',  week: 1 },
  6:  { short: 'Mon Apr 21', full: 'Monday, April 21 2026',  week: 2 },
  7:  { short: 'Tue Apr 22', full: 'Tuesday, April 22 2026', week: 2 },
  8:  { short: 'Wed Apr 23', full: 'Wednesday, April 23 2026', week: 2 },
  9:  { short: 'Thu Apr 24', full: 'Thursday, April 24 2026', week: 2 },
  10: { short: 'Fri Apr 25', full: 'Friday, April 25 2026',  week: 2 },
};

const WEEK_LABELS: Record<number, string> = {
  1: 'Week 1 — Apr 14–18',
  2: 'Week 2 — Apr 21–25',
};

// ----------- Recording URLs -----------
const RECORDING_URLS: Record<string, string> = {
  service_delivery_p2: 'https://fathom.video/share/G9juWT1oFG_3CrppLscPDXceijJvP_rR',
  service_delivery_p1: 'https://fathom.video/share/uZeCCaxRRVumFq_K6yHx_tbN75iRaMaX',
  entire_ghl_build:    'https://fathom.video/share/VG-nsEXiRvRP-7oyMY1VxcVET743mMs8',
  roofing_onboarding: 'https://fathom.video/share/qj9AYoqURQ6jhx34jFRZiR2-xESYDswF',
  hvac_onboarding:    'https://fathom.video/share/VYz9GhzfjBBj1YuVUPLXLdbVz6UkW4Pd',
  gutter_onboarding:  'https://fathom.video/share/yNyAaNPjWJdhj-zps7GYjpziqpCsBhN_',
};

// ----------- Helpers -----------
function getItems(section: DaySection): (string | RecordingItem)[] {
  return section.items ?? [];
}

function getDayStats(day: Day, checklistItems: Record<string, boolean>) {
  let total = 0;
  let completed = 0;
  for (const section of day.sections) {
    const items = getItems(section);
    total += items.length;
    items.forEach((_, i) => {
      if (checklistItems[`${section.id}_${i}`]) completed++;
    });
  }
  return { total, completed };
}

// ----------- Colour tokens -----------
const C = {
  bg:      '#0A0A0A',
  surf:    '#141414',
  surf2:   '#1C1C1C',
  surf3:   '#242424',
  border:  '#2A2A2A',
  border2: '#383838',
  text:    '#F5F5F5',
  muted:   '#888888',
  muted2:  '#555555',
  acc:     '#F5C800',
  green:   '#22C55E',
  orange:  '#F59E0B',
  blue:    '#4A90D9',
};

// ----------- Callout banner -----------
function CalloutBanner({ type, text }: { type: string; text: string }) {
  const styles: Record<string, { bg: string; border: string; icon: string }> = {
    warning:  { bg: '#2A1A00', border: '#F59E0B', icon: '⚠️' },
    info:     { bg: '#001A2A', border: '#4A90D9', icon: 'ℹ️' },
    critical: { bg: '#2A0000', border: '#EF4444', icon: '🚨' },
    tip:      { bg: '#001A0A', border: '#22C55E', icon: '💡' },
  };
  const s = styles[type] ?? styles.info;
  return (
    <div
      style={{
        backgroundColor: s.bg,
        borderLeft: `3px solid ${s.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '10px 14px',
        marginBottom: 8,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <p style={{ color: '#D0D0D0', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

// ----------- Checklist item -----------
function CheckItem({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '8px 0',
        borderBottom: `1px solid ${C.border}`,
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: checked ? 'none' : `2px solid ${C.border2}`,
          backgroundColor: checked ? C.green : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          transition: 'all 0.15s ease',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        style={{
          color: checked ? C.muted : C.text,
          fontSize: 13.5,
          lineHeight: 1.55,
          textDecoration: checked ? 'line-through' : 'none',
          flex: 1,
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ----------- Section card -----------
function SectionCard({
  section,
  checklistItems,
  onToggle,
}: {
  section: DaySection;
  checklistItems: Record<string, boolean>;
  onToggle: (groupId: string, index: number) => void;
}) {
  const items = getItems(section);
  return (
    <div
      style={{
        backgroundColor: C.surf2,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '16px 18px',
        marginBottom: 12,
      }}
    >
      <div style={{ marginBottom: items.length > 0 || section.callout || section.content ? 12 : 0 }}>
        <h3
          style={{
            color: C.acc,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            margin: '0 0 4px',
          }}
        >
          {section.title}
        </h3>
        {section.instruction && (
          <p style={{ color: C.muted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            {section.instruction}
          </p>
        )}
      </div>

      {section.callout && <CalloutBanner type={section.callout.type} text={section.callout.text} />}
      {section.type === 'callout' && section.content && (
        <CalloutBanner type={section.type_detail ?? 'info'} text={section.content} />
      )}

      {items.length > 0 && (
        <div>
          {items.map((item, i) => {
            const isRec = typeof item === 'object';
            const text = isRec ? (item as RecordingItem).text : (item as string);
            const recId = isRec ? (item as RecordingItem).recording_id : null;
            const url = recId ? RECORDING_URLS[recId] : null;
            const checked = !!checklistItems[`${section.id}_${i}`];

            return (
              <CheckItem key={i} checked={checked} onToggle={() => onToggle(section.id, i)}>
                <span style={{ flex: 1 }}>{text}</span>
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      marginLeft: 8,
                      padding: '2px 8px',
                      borderRadius: 6,
                      backgroundColor: C.surf3,
                      border: `1px solid ${C.border2}`,
                      color: C.acc,
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: 'none',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Watch ↗
                  </a>
                )}
              </CheckItem>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------- Sidebar day row -----------
function DayRow({
  day,
  stats,
  isActive,
  onClick,
}: {
  day: Day;
  stats: { total: number; completed: number };
  isActive: boolean;
  onClick: () => void;
}) {
  const isDone    = stats.total > 0 && stats.completed === stats.total;
  const isPartial = stats.completed > 0 && stats.completed < stats.total;
  const dateInfo  = DAY_DATES[day.day];

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 16px',
        background: isActive ? C.surf3 : 'transparent',
        border: 'none',
        borderLeft: isActive ? `3px solid ${C.acc}` : '3px solid transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.12s ease',
      }}
    >
      {/* Status dot */}
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDone ? C.green : isPartial ? C.orange : C.surf3,
          border: isDone || isPartial ? 'none' : `2px solid ${C.border2}`,
          fontSize: isDone ? 12 : 11,
          fontWeight: 900,
          color: isDone ? '#fff' : isPartial ? '#fff' : C.muted,
        }}
      >
        {isDone ? '✓' : day.day}
      </div>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: isActive ? C.text : isDone ? '#bbb' : C.muted,
            fontSize: 12,
            fontWeight: isActive ? 700 : 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {day.title}
        </div>
        <div style={{ color: C.muted2, fontSize: 10.5, marginTop: 1 }}>
          {dateInfo?.short}
          {stats.total > 0 && (
            <span style={{ marginLeft: 5, color: isDone ? C.green : isPartial ? C.orange : C.muted2 }}>
              · {stats.completed}/{stats.total}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ----------- Main WorksheetTab -----------
export function WorksheetTab() {
  const { currentDay, setCurrentDay, checklistItems, toggleChecklistItem } = useApp();
  const days = dayContent.days as Day[];

  const allStats = useMemo(
    () => days.map((d) => getDayStats(d, checklistItems)),
    [days, checklistItems]
  );

  const currentDayData  = days.find((d) => d.day === currentDay) ?? days[0];
  const currentDayIndex = days.indexOf(currentDayData);
  const currentStats    = allStats[currentDayIndex];
  const currentDateInfo = DAY_DATES[currentDayData.day];

  const totalItems     = allStats.reduce((s, x) => s + x.total, 0);
  const completedItems = allStats.reduce((s, x) => s + x.completed, 0);
  const pct            = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Group days by week for sidebar
  const weeks = [1, 2].map((wk) => ({
    week: wk,
    label: WEEK_LABELS[wk],
    days: days.filter((d) => DAY_DATES[d.day]?.week === wk),
  }));

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        minHeight: 'calc(100vh - 48px)',
        backgroundColor: C.bg,
        color: C.text,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* ───── Sidebar ───── */}
      <aside
        style={{
          width: 248,
          flexShrink: 0,
          backgroundColor: C.surf,
          borderRight: `1px solid ${C.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Overall progress */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span
              style={{
                color: C.muted,
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              10-Day Worksheet
            </span>
            <span style={{ color: C.acc, fontSize: 12, fontWeight: 800 }}>{pct}%</span>
          </div>
          <div style={{ height: 4, backgroundColor: C.surf3, borderRadius: 2, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                backgroundColor: C.acc,
                borderRadius: 2,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div style={{ color: C.muted2, fontSize: 10.5, marginTop: 5 }}>
            {completedItems} of {totalItems} tasks · Pod 4
          </div>
        </div>

        {/* Week-grouped day list */}
        <nav style={{ flex: 1, paddingBottom: 8 }}>
          {weeks.map(({ week, label, days: wDays }) => (
            <div key={week}>
              {/* Week header */}
              <div
                style={{
                  padding: '10px 16px 6px',
                  color: C.muted2,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: `1px solid ${C.border}`,
                  marginBottom: 2,
                }}
              >
                {label}
              </div>
              {wDays.map((d, i) => (
                <DayRow
                  key={d.day}
                  day={d}
                  stats={allStats[days.indexOf(d)]}
                  isActive={d.day === currentDay}
                  onClick={() => setCurrentDay(d.day)}
                />
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ───── Main content ───── */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Day header (sticky) */}
        <div
          style={{
            borderBottom: `1px solid ${C.border}`,
            padding: '18px 28px 14px',
            backgroundColor: C.surf,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                <span
                  style={{
                    color: C.acc,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Day {currentDayData.day} of 10
                </span>
                {currentDateInfo && (
                  <>
                    <span style={{ color: C.border2, fontSize: 11 }}>·</span>
                    <span
                      style={{
                        color: C.muted,
                        fontSize: 11,
                        fontWeight: 600,
                        backgroundColor: C.surf3,
                        border: `1px solid ${C.border2}`,
                        borderRadius: 5,
                        padding: '1px 7px',
                      }}
                    >
                      {currentDateInfo.short}
                    </span>
                    <span
                      style={{
                        color: C.muted2,
                        fontSize: 10,
                        backgroundColor: C.surf3,
                        border: `1px solid ${C.border}`,
                        borderRadius: 4,
                        padding: '1px 6px',
                      }}
                    >
                      Week {currentDateInfo.week}
                    </span>
                  </>
                )}
              </div>
              <h2
                style={{
                  color: C.text,
                  fontSize: 21,
                  fontWeight: 900,
                  margin: '0 0 3px',
                  letterSpacing: '-0.3px',
                }}
              >
                {currentDayData.title}
              </h2>
              <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>{currentDayData.subtitle}</p>
            </div>

            {/* Progress pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '8px 14px',
                flexShrink: 0,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: C.text, fontSize: 17, fontWeight: 900, lineHeight: 1 }}>
                  {currentStats.completed}
                </div>
                <div style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>done</div>
              </div>
              <div style={{ color: C.border2, fontSize: 16 }}>/</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: C.muted, fontSize: 17, fontWeight: 700, lineHeight: 1 }}>
                  {currentStats.total}
                </div>
                <div style={{ color: C.muted2, fontSize: 10, marginTop: 2 }}>tasks</div>
              </div>
            </div>
          </div>

          {/* Day progress bar */}
          <div style={{ height: 3, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
            <div
              style={{
                height: '100%',
                width: currentStats.total > 0
                  ? `${Math.round((currentStats.completed / currentStats.total) * 100)}%`
                  : '0%',
                backgroundColor:
                  currentStats.completed === currentStats.total && currentStats.total > 0
                    ? C.green
                    : C.acc,
                borderRadius: 2,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Sections */}
        <div style={{ padding: '20px 28px 40px' }}>
          {currentDayData.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              checklistItems={checklistItems}
              onToggle={toggleChecklistItem}
            />
          ))}

          {/* Day complete banner */}
          {currentStats.total > 0 && currentStats.completed === currentStats.total && (
            <div
              style={{
                backgroundColor: '#0D2A0D',
                border: `1px solid ${C.green}`,
                borderRadius: 12,
                padding: '20px 24px',
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>✅</div>
              <div style={{ color: C.green, fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                Day {currentDayData.day} Complete!
              </div>
              <p style={{ color: '#4ade80', fontSize: 13, margin: '0 0 14px' }}>
                All tasks done. {currentDateInfo ? `See you ${DAY_DATES[currentDayData.day + 1]?.short ?? 'next week'}.` : 'Keep it up.'}
              </p>
              {currentDayData.day < 10 && (
                <button
                  onClick={() => setCurrentDay(currentDayData.day + 1)}
                  style={{
                    backgroundColor: C.green,
                    color: '#000',
                    border: 'none',
                    borderRadius: 8,
                    padding: '9px 20px',
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Start Day {currentDayData.day + 1} →
                </button>
              )}
            </div>
          )}

          {/* Nav arrows */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
            <button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              style={{
                padding: '9px 18px',
                backgroundColor: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                color: currentDay === 1 ? C.muted2 : C.text,
                fontSize: 13,
                fontWeight: 600,
                cursor: currentDay === 1 ? 'not-allowed' : 'pointer',
                opacity: currentDay === 1 ? 0.4 : 1,
              }}
            >
              ← {currentDay > 1 ? `Day ${currentDay - 1}` : 'Previous'}
            </button>
            <button
              onClick={() => setCurrentDay(Math.min(10, currentDay + 1))}
              disabled={currentDay === 10}
              style={{
                padding: '9px 18px',
                backgroundColor: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                color: currentDay === 10 ? C.muted2 : C.text,
                fontSize: 13,
                fontWeight: 600,
                cursor: currentDay === 10 ? 'not-allowed' : 'pointer',
                opacity: currentDay === 10 ? 0.4 : 1,
              }}
            >
              {currentDay < 10 ? `Day ${currentDay + 1}` : 'Complete'} →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
