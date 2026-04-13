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

// ----------- Recording URLs -----------

const RECORDING_URLS: Record<string, string> = {
  service_delivery_p2: 'https://fathom.video/share/G9juWT1oFG_3CrppLscPDXceijJvP_rR',
  service_delivery_p1: 'https://fathom.video/share/uZeCCaxRRVumFq_K6yHx_tbN75iRaMaX',
  entire_ghl_build: 'https://fathom.video/share/VG-nsEXiRvRP-7oyMY1VxcVET743mMs8',
  roofing_onboarding: 'https://fathom.video/share/qj9AYoqURQ6jhx34jFRZiR2-xESYDswF',
  hvac_onboarding: 'https://fathom.video/share/VYz9GhzfjBBj1YuVUPLXLdbVz6UkW4Pd',
  gutter_onboarding: 'https://fathom.video/share/yNyAaNPjWJdhj-zps7GYjpziqpCsBhN_',
};

// ----------- Helpers -----------

function getItemsForSection(section: DaySection): (string | RecordingItem)[] {
  return section.items ?? [];
}

function getDayStats(day: Day, checklistItems: Record<string, boolean>) {
  let total = 0;
  let completed = 0;
  for (const section of day.sections) {
    const items = getItemsForSection(section);
    total += items.length;
    items.forEach((_, i) => {
      if (checklistItems[`${section.id}_${i}`]) completed++;
    });
  }
  return { total, completed };
}

// ----------- Colour tokens -----------

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
  accDark: '#D4AC00',
  green: '#22C55E',
  orange: '#F59E0B',
  red: '#EF4444',
  blue: '#4A90D9',
};

// ----------- Callout banner -----------

function CalloutBanner({ type, text }: { type: string; text: string }) {
  const colours: Record<string, { bg: string; border: string; icon: string }> = {
    warning: { bg: '#2A1A00', border: '#F59E0B', icon: '⚠️' },
    info: { bg: '#001A2A', border: '#4A90D9', icon: 'ℹ️' },
    critical: { bg: '#2A0000', border: '#EF4444', icon: '🚨' },
    tip: { bg: '#001A0A', border: '#22C55E', icon: '💡' },
  };
  const style = colours[type] ?? colours.info;
  return (
    <div
      style={{
        backgroundColor: style.bg,
        borderLeft: `3px solid ${style.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '10px 14px',
        marginBottom: 8,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{style.icon}</span>
      <p style={{ color: '#D0D0D0', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

// ----------- Checklist Item -----------

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
      {/* Checkbox */}
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
      {/* Label */}
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

// ----------- Section Card -----------

function SectionCard({ section, checklistItems, onToggle }: {
  section: DaySection;
  checklistItems: Record<string, boolean>;
  onToggle: (groupId: string, index: number) => void;
}) {
  const items = getItemsForSection(section);

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
      {/* Section header */}
      <div style={{ marginBottom: 12 }}>
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
          <p style={{ color: C.muted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{section.instruction}</p>
        )}
      </div>

      {/* Callout */}
      {section.callout && <CalloutBanner type={section.callout.type} text={section.callout.text} />}

      {/* Critical callout content (type=callout) */}
      {section.type === 'callout' && section.content && (
        <CalloutBanner type={section.type_detail ?? 'info'} text={section.content} />
      )}

      {/* Items */}
      {items.length > 0 && (
        <div>
          {items.map((item, i) => {
            const isRecording = typeof item === 'object';
            const text = isRecording ? (item as RecordingItem).text : (item as string);
            const recordingId = isRecording ? (item as RecordingItem).recording_id : null;
            const url = recordingId ? RECORDING_URLS[recordingId] : null;
            const checked = !!checklistItems[`${section.id}_${i}`];

            return (
              <div key={i}>
                <CheckItem
                  checked={checked}
                  onToggle={() => onToggle(section.id, i)}
                >
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------- Sidebar Day Dot -----------

function DayDot({ day, stats, isActive, onClick }: {
  day: Day;
  stats: { total: number; completed: number };
  isActive: boolean;
  onClick: () => void;
}) {
  const isDone = stats.total > 0 && stats.completed === stats.total;
  const isPartial = stats.completed > 0 && stats.completed < stats.total;

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        background: isActive ? C.surf3 : 'transparent',
        border: 'none',
        borderLeft: isActive ? `3px solid ${C.acc}` : '3px solid transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.15s ease',
      }}
    >
      {/* Status dot */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDone ? C.green : isPartial ? C.orange : C.surf3,
          border: isDone ? 'none' : isPartial ? 'none' : `2px solid ${C.border2}`,
          fontSize: isDone ? 13 : 12,
          fontWeight: 800,
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
            fontSize: 12.5,
            fontWeight: isActive ? 700 : 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Day {day.day} — {day.title}
        </div>
        {stats.total > 0 && (
          <div style={{ color: C.muted2, fontSize: 11, marginTop: 1 }}>
            {stats.completed}/{stats.total} done
          </div>
        )}
      </div>
    </button>
  );
}

// ----------- Main WorksheetTab -----------

export function WorksheetTab() {
  const { currentDay, setCurrentDay, checklistItems, toggleChecklistItem } = useApp();
  const days = dayContent.days as Day[];

  // Day progress for all days
  const allStats = useMemo(
    () => days.map((d) => getDayStats(d, checklistItems)),
    [days, checklistItems]
  );

  const currentDayData = days.find((d) => d.day === currentDay) ?? days[0];
  const currentDayIndex = days.indexOf(currentDayData);
  const currentStats = allStats[currentDayIndex];

  // Overall worksheet progress
  const totalItems = allStats.reduce((sum, s) => sum + s.total, 0);
  const completedItems = allStats.reduce((sum, s) => sum + s.completed, 0);
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

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
      {/* ---- Sidebar ---- */}
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          backgroundColor: C.surf,
          borderRight: `1px solid ${C.border}`,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Progress summary */}
        <div
          style={{
            padding: '16px 16px 12px',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              10-Day Worksheet
            </span>
            <span style={{ color: C.acc, fontSize: 12, fontWeight: 800 }}>{pct}%</span>
          </div>
          <div
            style={{
              height: 4,
              backgroundColor: C.surf3,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
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
          <div style={{ color: C.muted2, fontSize: 11, marginTop: 6 }}>
            {completedItems} of {totalItems} tasks
          </div>
        </div>

        {/* Day list */}
        <nav style={{ flex: 1, paddingTop: 4, paddingBottom: 4 }}>
          {days.map((day, i) => (
            <DayDot
              key={day.day}
              day={day}
              stats={allStats[i]}
              isActive={day.day === currentDay}
              onClick={() => setCurrentDay(day.day)}
            />
          ))}
        </nav>
      </aside>

      {/* ---- Main content ---- */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
        {/* Day header */}
        <div
          style={{
            borderBottom: `1px solid ${C.border}`,
            padding: '20px 28px 16px',
            backgroundColor: C.surf,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div
                style={{
                  color: C.acc,
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 4,
                }}
              >
                Day {currentDayData.day} of 10
              </div>
              <h2
                style={{
                  color: C.text,
                  fontSize: 22,
                  fontWeight: 900,
                  margin: '0 0 4px',
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
                gap: 10,
                backgroundColor: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '8px 14px',
                flexShrink: 0,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: C.text, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
                  {currentStats.completed}
                </div>
                <div style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>done</div>
              </div>
              <div style={{ color: C.border2, fontSize: 18 }}>/</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: C.muted, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                  {currentStats.total}
                </div>
                <div style={{ color: C.muted2, fontSize: 10, marginTop: 2 }}>total</div>
              </div>
            </div>
          </div>

          {/* Day progress bar */}
          <div
            style={{
              height: 3,
              backgroundColor: C.border,
              borderRadius: 2,
              overflow: 'hidden',
              marginTop: 14,
            }}
          >
            <div
              style={{
                height: '100%',
                width: currentStats.total > 0 ? `${Math.round((currentStats.completed / currentStats.total) * 100)}%` : '0%',
                backgroundColor: currentStats.completed === currentStats.total && currentStats.total > 0 ? C.green : C.acc,
                borderRadius: 2,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Day sections */}
        <div style={{ padding: '20px 28px 40px' }}>
          {currentDayData.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              checklistItems={checklistItems}
              onToggle={toggleChecklistItem}
            />
          ))}

          {/* Day complete state */}
          {currentStats.total > 0 && currentStats.completed === currentStats.total && (
            <div
              style={{
                backgroundColor: '#0D2A0D',
                border: `1px solid ${C.green}`,
                borderRadius: 12,
                padding: '20px 24px',
                textAlign: 'center',
                marginTop: 8,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <div style={{ color: C.green, fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
                Day {currentDayData.day} Complete!
              </div>
              <p style={{ color: '#4ade80', fontSize: 13, margin: '0 0 14px' }}>
                All tasks done. Keep the momentum going.
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
              ← Previous Day
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
              Next Day →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
