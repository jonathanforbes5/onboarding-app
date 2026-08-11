'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MB_TRAINING_DAYS } from '@/data/mbTrainingData';
import { MBS1_Company101 } from './sessions/MBS1_Company101';
import { MBS2_ReportsData } from './sessions/MBS2_ReportsData';
import { MBS3_AuditingQA } from './sessions/MBS3_AuditingQA';
import { MBS4_ActionSteps } from './sessions/MBS4_ActionSteps';

const C = {
  bg: '#0A0A0A',
  surf: '#111111',
  surf2: '#161616',
  surf3: '#1C1C1C',
  border: '#1E1E1E',
  border2: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  acc: '#F5C800',
};

// ── Day detail view ───────────────────────────────────────────────────────────

interface DayDetailProps {
  dayId: number;
  onBack: () => void;
  onNextDay?: () => void;
}

function DayDetail({ dayId, onBack, onNextDay }: DayDetailProps) {
  const { markMBDayComplete, completedMBDays, currentUser } = useApp();
  const [view, setView] = useState<'sections' | 'section-detail'>('sections');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'user';
  const day = MB_TRAINING_DAYS.find((d) => d.id === dayId)!;
  const isDone = completedMBDays.includes(dayId);

  function goToSection(sectionId: string) {
    setActiveSectionId(sectionId);
    setView('section-detail');
  }

  // ── Section detail view ──
  if (view === 'section-detail' && activeSectionId) {
    const sectionIndex = day.sections.findIndex((s) => s.id === activeSectionId);
    const section = day.sections[sectionIndex];
    const prevSection = sectionIndex > 0 ? day.sections[sectionIndex - 1] : null;
    const nextSection = sectionIndex < day.sections.length - 1 ? day.sections[sectionIndex + 1] : null;

    return (
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Back to sections overview */}
        <button
          onClick={() => setView('sections')}
          style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer', padding: '0 0 24px', display: 'block' }}
        >
          ← Session {dayId} Overview
        </button>

        {/* Section mini-header */}
        <div style={{
          background: `linear-gradient(135deg, ${day.color}12 0%, #111111 60%)`,
          border: `1px solid ${day.color}33`,
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: day.color, borderRadius: '14px 14px 0 0' }} />
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: day.color + '22', border: `1px solid ${day.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>
            {section.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: day.color, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Section {sectionIndex + 1} of {day.sections.length} · {section.estimatedTime}
            </div>
            <div style={{ color: C.text, fontSize: 18, fontWeight: 900, marginBottom: 2, letterSpacing: '-0.2px' }}>{section.title}</div>
            <div style={{ color: '#777', fontSize: 12.5 }}>{section.subtitle}</div>
          </div>
        </div>

        {/* Section content */}
        <div style={{ marginBottom: 32 }}>
          {dayId === 1 && <MBS1_Company101 sectionId={activeSectionId} />}
          {dayId === 2 && <MBS2_ReportsData />}
          {dayId === 3 && <MBS3_AuditingQA />}
          {dayId === 4 && <MBS4_ActionSteps />}
        </div>

        {/* Prev / Next navigation */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {prevSection ? (
            <button
              onClick={() => goToSection(prevSection.id)}
              style={{
                padding: '12px 20px', borderRadius: 10,
                border: `1px solid ${C.border2}`, background: C.surf2,
                color: C.muted, fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              ← {prevSection.title}
            </button>
          ) : (
            <button
              onClick={() => setView('sections')}
              style={{
                padding: '12px 20px', borderRadius: 10,
                border: `1px solid ${C.border2}`, background: 'transparent',
                color: C.muted, fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              ← Back to Overview
            </button>
          )}
          <div style={{ flex: 1 }} />
          {nextSection ? (
            <button
              onClick={() => goToSection(nextSection.id)}
              style={{
                padding: '12px 22px', borderRadius: 10,
                border: 'none', background: day.color,
                color: '#000', fontWeight: 800, fontSize: 13, cursor: 'pointer',
              }}
            >
              {nextSection.title} →
            </button>
          ) : (
            <button
              onClick={() => { markMBDayComplete(dayId); setView('sections'); }}
              style={{
                padding: '12px 22px', borderRadius: 10,
                border: 'none', background: C.acc,
                color: '#000', fontWeight: 800, fontSize: 13, cursor: 'pointer',
              }}
            >
              Complete Session →
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Sections overview (default) ──
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer', padding: '0 0 24px', display: 'block' }}
      >
        ← All Sessions
      </button>

      {/* Day header */}
      <div style={{
        background: `linear-gradient(135deg, ${day.color}12 0%, #111111 60%)`,
        border: `1px solid ${day.color}33`,
        borderRadius: 16,
        padding: '28px 28px 24px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: day.color, borderRadius: '16px 16px 0 0' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: day.color + '22', border: `1px solid ${day.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            {day.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <span style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Session {day.id}</span>
              <span style={{ color: C.muted, fontSize: 11 }}>·</span>
              <span style={{ color: C.muted, fontSize: 11 }}>{day.estimatedTime}</span>
              <span style={{ color: C.muted, fontSize: 11 }}>·</span>
              <span style={{ color: C.muted, fontSize: 11 }}>{day.sections.length} sections</span>
              {isDone && (
                <span style={{
                  backgroundColor: '#22C55E22', border: '1px solid #22C55E44',
                  color: '#22C55E', fontSize: 10, fontWeight: 800,
                  padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                }}>✓ Complete</span>
              )}
            </div>
            <h1 style={{ color: C.text, fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              {day.title}
            </h1>
            <p style={{ color: '#999', fontSize: 13, margin: '0 0 12px', lineHeight: 1.6 }}>{day.subtitle}</p>
            <div style={{
              backgroundColor: day.color + '0E', border: `1px solid ${day.color}22`,
              borderRadius: 8, padding: '10px 14px',
            }}>
              <span style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objective: </span>
              <span style={{ color: '#aaa', fontSize: 12.5 }}>{day.objective}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: '#555', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
          Sections
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {day.sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => goToSection(section.id)}
              style={{
                backgroundColor: C.surf,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '18px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = day.color + '66'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: day.color + '18', border: `1px solid ${day.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {section.icon}
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  backgroundColor: C.border2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 900, color: '#555',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div style={{ color: C.text, fontSize: 13.5, fontWeight: 800, marginBottom: 4, lineHeight: 1.3 }}>{section.title}</div>
              <div style={{ color: C.muted, fontSize: 11.5, lineHeight: 1.5, flex: 1 }}>{section.subtitle}</div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#444', fontSize: 10.5 }}>{section.estimatedTime}</span>
                <span style={{ color: day.color, fontSize: 13 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div style={{
        backgroundColor: C.acc + '0A',
        border: `1px solid ${C.acc}22`,
        borderRadius: 12,
        padding: '20px 22px',
        marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Takeaways</span>
        </div>
        {day.keyTakeaways.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < day.keyTakeaways.length - 1 ? 8 : 0 }}>
            <span style={{ color: C.acc, fontSize: 10, marginTop: 4, flexShrink: 0 }}>✓</span>
            <span style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────

export function MBTrainingTab() {
  const { completedMBDays, currentUser } = useApp();
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'user';

  function handleDayClick(dayId: number, dayAvailable: boolean) {
    if (!isAdmin && !dayAvailable) return;
    setActiveDay(dayId);
  }

  if (activeDay !== null) {
    const currentIdx = MB_TRAINING_DAYS.findIndex((d) => d.id === activeDay);
    const nextDay = MB_TRAINING_DAYS[currentIdx + 1];
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', color: C.text }}>
        <DayDetail
          dayId={activeDay}
          onBack={() => setActiveDay(null)}
          onNextDay={nextDay ? () => setActiveDay(nextDay.id) : undefined}
        />
      </div>
    );
  }

  const availableDays = isAdmin ? MB_TRAINING_DAYS : MB_TRAINING_DAYS.filter((d) => d.available);
  const totalDays = availableDays.length;
  const doneDays = completedMBDays.filter((id) => availableDays.some((d) => d.id === id)).length;
  const pct = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;
  const nextIncompleteDay = availableDays.find((d) => !completedMBDays.includes(d.id));

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '28px 20px 80px', color: C.text,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1400 0%, #111111 60%)',
          border: `1px solid ${C.acc}33`,
          borderRadius: 16,
          padding: '28px 28px 24px',
          marginBottom: 28,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.acc}, transparent)`, borderRadius: '16px 16px 0 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                Full-Cycle Media Buyer
              </div>
              <h1 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.4px' }}>
                4-Session Training Program
              </h1>
              <p style={{ color: '#888', fontSize: 13, margin: 0, lineHeight: 1.65, maxWidth: 480 }}>
                Thu Jul 23 · Fri Jul 24 · Mon Jul 27 · Tue Jul 28. Read each session, then pass
                each session to mark it complete.
              </p>
            </div>
            <div style={{
              backgroundColor: '#111', border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: '18px 24px', textAlign: 'center', minWidth: 130,
            }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.acc, lineHeight: 1 }}>{pct}%</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>Complete</div>
              <div style={{ color: '#444', fontSize: 10, marginTop: 5 }}>{doneDays} / {totalDays} sessions</div>
              <div style={{ marginTop: 10, height: 4, backgroundColor: '#1f1f1f', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: C.acc, transition: 'width 0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Resume banner — shown when in progress but not done */}
        {nextIncompleteDay && doneDays > 0 && (isAdmin || nextIncompleteDay.available) && (
          <button
            onClick={() => setActiveDay(nextIncompleteDay.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              backgroundColor: nextIncompleteDay.color + '0E',
              border: `1px solid ${nextIncompleteDay.color}33`,
              borderRadius: 12, padding: '16px 20px',
              marginBottom: 4, cursor: 'pointer', textAlign: 'left',
              width: '100%',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: nextIncompleteDay.color + '22',
              border: `1px solid ${nextIncompleteDay.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              {nextIncompleteDay.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: nextIncompleteDay.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                Continue Training
              </div>
              <div style={{ color: C.text, fontSize: 13.5, fontWeight: 700 }}>
                Session {nextIncompleteDay.id}: {nextIncompleteDay.title}
              </div>
            </div>
            <div style={{ color: nextIncompleteDay.color, fontSize: 18, flexShrink: 0 }}>→</div>
          </button>
        )}

        {/* Day cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MB_TRAINING_DAYS.map((day) => {
            const isDone = completedMBDays.includes(day.id);
            const isLocked = !isAdmin && !day.available;

            return (
              <button
                key={day.id}
                onClick={() => handleDayClick(day.id, day.available)}
                disabled={isLocked}
                style={{
                  backgroundColor: isLocked ? '#0D0D0D' : C.surf,
                  border: `1px solid ${isDone ? '#22C55E33' : isLocked ? '#222' : C.border}`,
                  borderRadius: 12, padding: '20px 22px',
                  textAlign: 'left', cursor: isLocked ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'border-color 0.15s',
                  position: 'relative', overflow: 'hidden',
                  opacity: isLocked ? 0.55 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLocked) (e.currentTarget as HTMLButtonElement).style.borderColor = day.color + '88';
                }}
                onMouseLeave={(e) => {
                  if (!isLocked) (e.currentTarget as HTMLButtonElement).style.borderColor = isDone ? '#22C55E33' : C.border;
                }}
              >
                {isDone && !isLocked && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: '#22C55E' }} />
                )}

                {/* Day icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  backgroundColor: isLocked ? '#1A1A1A' : day.color + '18',
                  border: `1px solid ${isLocked ? '#2A2A2A' : day.color + '33'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {isLocked ? '🔒' : isDone ? '✅' : day.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ color: isLocked ? '#444' : day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Session {day.id}
                    </span>
                    <span style={{ color: '#333', fontSize: 11 }}>·</span>
                    <span style={{ color: '#555', fontSize: 11 }}>{day.date}</span>
                    {isLocked && (
                      <span style={{
                        backgroundColor: '#1A1A1A', border: '1px solid #333',
                        color: '#555', fontSize: 10, fontWeight: 800,
                        padding: '1px 7px', borderRadius: 20, textTransform: 'uppercase',
                      }}>Coming Soon</span>
                    )}
                    {isAdmin && !day.available && (
                      <span style={{
                        backgroundColor: '#4A90D918', border: '1px solid #4A90D933',
                        color: '#4A90D9', fontSize: 10, fontWeight: 800,
                        padding: '1px 7px', borderRadius: 20, textTransform: 'uppercase',
                      }}>Admin Preview</span>
                    )}
                    {isDone && !isLocked && (
                      <span style={{
                        backgroundColor: '#22C55E22', border: '1px solid #22C55E44',
                        color: '#22C55E', fontSize: 10, fontWeight: 800,
                        padding: '1px 7px', borderRadius: 20, textTransform: 'uppercase',
                      }}>Done</span>
                    )}
                  </div>
                  <div style={{ color: isLocked ? '#444' : C.text, fontSize: 15, fontWeight: 800, marginBottom: 3 }}>{day.title}</div>
                  <div style={{ color: '#444', fontSize: 12, lineHeight: 1.5 }}>{isLocked ? 'This session will be unlocked by your trainer.' : day.subtitle}</div>
                </div>

                {!isLocked && <div style={{ color: '#333', fontSize: 20, flexShrink: 0 }}>›</div>}
              </button>
            );
          })}
        </div>

        {/* Completion banner */}
        {doneDays === totalDays && (
          <div style={{
            marginTop: 28,
            backgroundColor: '#22C55E0D',
            border: '1px solid #22C55E33',
            borderRadius: 12,
            padding: '20px 24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏆</div>
            <div style={{ color: '#22C55E', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Training Complete
            </div>
            <div style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>
              You&apos;ve completed all four sessions. Daily accountability calls start Wed, July 29 — use the SOPs and Tools tabs as your daily reference going forward.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
