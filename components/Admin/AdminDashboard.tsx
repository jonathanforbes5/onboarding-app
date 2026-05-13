'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllUsersProgress, AllUsersProgress } from '@/lib/syncService';
import { isSupabaseEnabled } from '@/lib/supabase';
import dayContent from '@/repo/data/day-content.json';
import dayContentPod5 from '@/repo/data/day-content-pod5.json';
import { SECTIONS } from '@/data/sections';

interface ChatLog {
  id: string;
  user_name: string;
  question: string;
  answer: string;
  feedback: 'up' | 'down' | null;
  created_at: string;
}

interface ChatKnowledge {
  id: string;
  question: string;
  answer: string;
  submitted_by: string;
  approved: boolean;
  created_at: string;
}

interface SearchLog {
  id: string;
  user_name: string;
  query: string;
  result_title: string | null;
  result_kind: string | null;
  created_at: string;
}

// ── Colour tokens ────────────────────────────────────────────
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
  red:     '#EF4444',
  blue:    '#4A90D9',
};

// ── Per-pod date maps ─────────────────────────────────────────
const DAY_DATES_POD4: Record<number, string> = {
  1:'Mon Apr 14',2:'Tue Apr 15',3:'Wed Apr 16',4:'Thu Apr 17',5:'Fri Apr 18',
  6:'Mon Apr 21',7:'Tue Apr 22',8:'Wed Apr 23',9:'Thu Apr 24',10:'Fri Apr 25',
};
const DAY_DATES_POD5: Record<number, string> = {
  1:'Mon May 4', 2:'Tue May 5', 3:'Wed May 6', 4:'Thu May 7', 5:'Fri May 8',
  6:'Mon May 11',7:'Tue May 12',8:'Wed May 13',9:'Thu May 14',10:'Fri May 15',
};

// ── User display config ──────────────────────────────────────
const USER_CONFIG: Record<string, { label: string; color: string; textColor: string; pod: number; startDate: string }> = {
  sam:    { label: 'Sam',    color: '#F5C800', textColor: '#000', pod: 4, startDate: 'Apr 14, 2026' },
  ksenia: { label: 'Ksenia', color: '#EC4899', textColor: '#fff', pod: 5, startDate: 'May 4, 2026'  },
  adeen:  { label: 'Adeen',  color: '#8B5CF6', textColor: '#fff', pod: 5, startDate: 'May 4, 2026'  },
};

// ── Worksheet helpers ─────────────────────────────────────────
function getTotalWorksheetItems(days: any[]): number {
  return days.reduce((sum: number, day: any) => {
    return sum + day.sections.reduce((s: number, sec: any) => s + (sec.items?.length ?? 0), 0);
  }, 0);
}

function getCompletedForUser(
  checklistItems: Record<string, boolean>,
  days: any[],
): number {
  let done = 0;
  days.forEach((day: any) => {
    day.sections.forEach((sec: any) => {
      (sec.items ?? []).forEach((_: any, i: number) => {
        if (checklistItems[`${sec.id}_${i}`]) done++;
      });
    });
  });
  return done;
}

function getDayCompletion(
  day: any,
  checklistItems: Record<string, boolean>,
): { total: number; completed: number } {
  let total = 0, completed = 0;
  (day.sections as any[]).forEach((sec) => {
    (sec.items ?? []).forEach((_: any, i: number) => {
      total++;
      if (checklistItems[`${sec.id}_${i}`]) completed++;
    });
  });
  return { total, completed };
}

// ── Progress bar ──────────────────────────────────────────────
function ProgressBar({ pct, color = C.acc }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 6, backgroundColor: C.surf3, borderRadius: 3, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${Math.min(100, pct)}%`,
          backgroundColor: color,
          borderRadius: 3,
          transition: 'width 0.4s ease',
        }}
      />
    </div>
  );
}

// ── Stat tile ─────────────────────────────────────────────────
function Stat({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div
      style={{
        backgroundColor: C.surf3,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '12px 14px',
        flex: '1 1 120px',
      }}
    >
      <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ color: color ?? C.text, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: C.muted2, fontSize: 11, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ── User progress card ────────────────────────────────────────
function UserCard({
  userName,
  data,
}: {
  userName: string;
  data: AllUsersProgress[string] & { lastSeen?: string };
}) {
  const cfg = USER_CONFIG[userName];
  if (!cfg) return null;

  const isPod5     = cfg.pod === 5;
  const days       = isPod5 ? (dayContentPod5.days as any[]) : (dayContent.days as any[]);
  const dayDates   = isPod5 ? DAY_DATES_POD5 : DAY_DATES_POD4;
  const startMs    = isPod5 ? new Date('2026-05-04').getTime() : new Date('2026-04-14').getTime();

  const totalWS    = getTotalWorksheetItems(days);
  const doneWS     = getCompletedForUser(data.checklistItems, days);
  const wsPct      = totalWS > 0 ? Math.round((doneWS / totalWS) * 100) : 0;
  const sectionPct = Math.round((data.completedSections.length / SECTIONS.length) * 100);
  const currentDate = dayDates[data.currentDay] ?? `Day ${data.currentDay}`;

  // How many days are fully complete
  const daysComplete = days.filter((d: any) => {
    const { total, completed } = getDayCompletion(d, data.checklistItems);
    return total > 0 && completed === total;
  }).length;

  // Average quiz score
  const scores = Object.values(data.quizScores);
  const avgQuiz = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;

  // Relative last seen
  const lastSeen = data.lastSeen
    ? new Date(data.lastSeen).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'No activity yet';

  // Stalled flag: current day < expected day based on date (rough heuristic)
  const today = new Date();
  const elapsed = Math.max(0, Math.floor((today.getTime() - startMs) / (1000 * 60 * 60 * 24)));
  const businessDaysElapsed = Math.min(10, Math.floor(elapsed * (5 / 7)));
  const isStalled = data.currentDay < businessDaysElapsed - 1;

  return (
    <div
      style={{
        backgroundColor: C.surf,
        border: `1.5px solid ${C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        flex: '1 1 min(360px, 100%)',
        minWidth: 0,
      }}
    >
      {/* Card header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${cfg.color}18 0%, transparent 70%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: cfg.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 18,
            color: cfg.textColor,
            flexShrink: 0,
          }}
        >
          {cfg.label[0]}
        </div>
        <div>
          <div style={{ color: C.text, fontSize: 17, fontWeight: 900 }}>{cfg.label}</div>
          <div style={{ color: C.muted, fontSize: 12, marginTop: 1 }}>Pod {cfg.pod} Manager · Started {cfg.startDate}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              backgroundColor: isStalled ? '#2A0000' : '#001A0A',
              border: `1px solid ${isStalled ? C.red : C.green}44`,
              borderRadius: 6,
              padding: '3px 8px',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: isStalled ? C.red : C.green,
              }}
            />
            <span style={{ color: isStalled ? C.red : C.green, fontSize: 11, fontWeight: 700 }}>
              {isStalled ? 'Stalled' : 'On Track'}
            </span>
          </div>
          <div style={{ color: C.muted2, fontSize: 10, marginTop: 3 }}>Last active: {lastSeen}</div>
        </div>
      </div>

      {/* Stat grid */}
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Stat label="Current Day" value={`Day ${data.currentDay}`} sub={currentDate} color={cfg.color} />
          <Stat label="Days Complete" value={`${daysComplete}/10`} sub="worksheet days" />
          <Stat label="Training" value={`${sectionPct}%`} sub={`${data.completedSections.length}/${SECTIONS.length} sections`} />
          {avgQuiz !== null && (
            <Stat
              label="Avg Quiz"
              value={`${avgQuiz}%`}
              sub={`${scores.length} quiz${scores.length !== 1 ? 'zes' : ''} taken`}
              color={avgQuiz >= 80 ? C.green : avgQuiz >= 60 ? C.orange : C.red}
            />
          )}
        </div>
      </div>

      {/* Worksheet progress */}
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Worksheet Progress
          </span>
          <span style={{ color: C.text, fontSize: 12, fontWeight: 800 }}>{doneWS}/{totalWS} tasks · {wsPct}%</span>
        </div>
        <ProgressBar pct={wsPct} color={cfg.color} />
      </div>

      {/* Day-by-day breakdown */}
      <div style={{ padding: '14px 20px' }}>
        <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Day Breakdown
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 6 }}>
          {days.map((d: any) => {
            const { total, completed } = getDayCompletion(d, data.checklistItems);
            const isDone    = total > 0 && completed === total;
            const isPartial = completed > 0 && !isDone;
            const isCurrent = d.day === data.currentDay;
            const dayPct    = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div
                key={d.day}
                title={`Day ${d.day}: ${d.title}\n${completed}/${total} tasks · ${dayDates[d.day]}`}
                style={{
                  backgroundColor: isDone ? '#0D2A0D' : isPartial ? '#2A1A00' : C.surf3,
                  border: `1.5px solid ${isDone ? C.green : isPartial ? C.orange : isCurrent ? cfg.color : C.border}`,
                  borderRadius: 8,
                  padding: '8px 6px',
                  textAlign: 'center',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    margin: '0 auto 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDone ? C.green : isPartial ? C.orange : isCurrent ? cfg.color : C.surf2,
                    fontSize: isDone ? 11 : 10,
                    fontWeight: 900,
                    color: isDone || isPartial ? '#fff' : isCurrent ? cfg.textColor : C.muted,
                  }}
                >
                  {isDone ? '✓' : d.day}
                </div>
                <div style={{ color: isDone ? C.green : isPartial ? C.orange : C.muted2, fontSize: 9, fontWeight: 700 }}>
                  {dayPct}%
                </div>
              </div>
            );
          })}
        </div>
        {/* Week labels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
          <div style={{ color: C.muted2, fontSize: 9, textAlign: 'center' }}>
            {isPod5 ? 'Week 1 (May 4–8)' : 'Week 1 (Apr 14–18)'}
          </div>
          <div style={{ color: C.muted2, fontSize: 9, textAlign: 'center' }}>
            {isPod5 ? 'Week 2 (May 11–15)' : 'Week 2 (Apr 21–25)'}
          </div>
        </div>
      </div>

      {/* Quiz scores */}
      {scores.length > 0 && (
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Quiz Scores
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(data.quizScores).map(([secId, score]) => {
              const sec = SECTIONS.find((s) => s.id === Number(secId));
              const color = score >= 80 ? C.green : score >= 60 ? C.orange : C.red;
              return (
                <div
                  key={secId}
                  title={sec?.title ?? `Section ${secId}`}
                  style={{
                    backgroundColor: color + '18',
                    border: `1px solid ${color}44`,
                    borderRadius: 6,
                    padding: '4px 8px',
                    fontSize: 11,
                    fontWeight: 700,
                    color,
                  }}
                >
                  S{secId}: {score}%
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Ask RI Insights panel ─────────────────────────────────────
function AskRIInsights() {
  const [logs, setLogs]           = useState<ChatLog[]>([]);
  const [knowledge, setKnowledge] = useState<ChatKnowledge[]>([]);
  const [searchLogs, setSearchLogs] = useState<SearchLog[]>([]);
  const [loading, setLoading]     = useState(true);
  const [expanded, setExpanded]   = useState<string | null>(null);
  const [tab, setTab]             = useState<'questions' | 'corrections' | 'searches' | 'media'>('questions');
  const [mediaLinks, setMediaLinks] = useState<Record<string, { url: string; title?: string; updated_at?: string; updated_by?: string }>>({});
  const [mediaForm,  setMediaForm]  = useState<{ slot_key: string; url: string; title: string }>({ slot_key: '', url: '', title: '' });
  const [mediaSaving, setMediaSaving] = useState(false);
  const [mediaMsg,    setMediaMsg]    = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/chat-logs?limit=50');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs ?? []);
        setKnowledge(data.knowledge ?? []);
        setSearchLogs(data.searchLogs ?? []);
      }
    } catch {
      // Supabase may not be configured
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const loadMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/media-links');
      if (res.ok) {
        const j = await res.json();
        setMediaLinks(j.links ?? {});
      }
    } catch {}
  }, []);
  useEffect(() => { loadMedia(); }, [loadMedia]);

  async function saveMediaLink() {
    if (!mediaForm.slot_key.trim() || !mediaForm.url.trim()) {
      setMediaMsg('Slot key and URL are required.');
      return;
    }
    setMediaSaving(true);
    setMediaMsg(null);
    try {
      const res = await fetch('/api/media-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mediaForm, updated_by: 'admin' }),
      });
      const j = await res.json();
      if (!res.ok) {
        setMediaMsg(`Error: ${j.error ?? 'unknown'}`);
      } else {
        setMediaMsg(`Saved: ${j.slot_key}`);
        setMediaForm({ slot_key: '', url: '', title: '' });
        await loadMedia();
      }
    } catch (e) {
      setMediaMsg(`Error: ${String(e)}`);
    }
    setMediaSaving(false);
  }

  async function deleteMediaLink(slot: string) {
    if (!confirm(`Remove the Loom for slot "${slot}"? The placeholder will reappear in its place.`)) return;
    await fetch(`/api/media-links?slot=${encodeURIComponent(slot)}`, { method: 'DELETE' });
    await loadMedia();
  }

  async function toggleApproval(id: string, approved: boolean) {
    await fetch('/api/admin/chat-logs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved }),
    });
    setKnowledge((prev) => prev.map((k) => k.id === id ? { ...k, approved } : k));
  }

  const thumbsDown = logs.filter((l) => l.feedback === 'down');
  const topQuestions = logs.slice(0, 10);

  return (
    <div
      style={{
        marginTop: 32,
        backgroundColor: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, #4A90D918 0%, transparent 70%)`,
          borderBottom: `1px solid ${C.border}`,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div>
          <div style={{ color: C.blue, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
            Ask RI — Intelligence
          </div>
          <h2 style={{ color: C.text, fontSize: 16, fontWeight: 900, margin: 0 }}>
            What Pod Managers Are Asking
          </h2>
          <p style={{ color: C.muted, fontSize: 12, margin: '3px 0 0' }}>
            Use this to identify training gaps and common confusion points.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {thumbsDown.length > 0 && (
            <div
              style={{
                backgroundColor: '#2A0000',
                border: `1px solid ${C.red}44`,
                borderRadius: 8,
                padding: '5px 10px',
                fontSize: 11,
                color: C.red,
                fontWeight: 700,
              }}
            >
              👎 {thumbsDown.length} flagged
            </div>
          )}
          <button
            onClick={loadData}
            disabled={loading}
            style={{
              backgroundColor: C.surf2,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: '7px 12px',
              color: loading ? C.muted2 : C.text,
              fontSize: 11,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '⟳' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
        {[
          { id: 'questions' as const,   label: `Chat Questions (${logs.length})` },
          { id: 'searches' as const,    label: `Search Queries (${searchLogs.length})` },
          { id: 'corrections' as const, label: `Corrections (${knowledge.length})` },
          { id: 'media' as const,       label: `Media Links (${Object.keys(mediaLinks).length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 18px',
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              borderBottom: tab === t.id ? `2px solid ${C.blue}` : '2px solid transparent',
              backgroundColor: 'transparent',
              color: tab === t.id ? C.blue : C.muted,
              cursor: 'pointer',
              transition: 'all 0.1s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 20px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '30px 0', color: C.muted, fontSize: 13 }}>
            Loading Ask RI data…
          </div>
        )}

        {!loading && tab === 'questions' && (
          <>
            {topQuestions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: C.muted2, fontSize: 13 }}>
                No questions logged yet. Ask RI needs the ANTHROPIC_API_KEY configured and Supabase running.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {topQuestions.map((log) => {
                  const isExpanded = expanded === log.id;
                  const date = new Date(log.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  });
                  return (
                    <div
                      key={log.id}
                      style={{
                        backgroundColor: C.surf2,
                        border: `1px solid ${log.feedback === 'down' ? C.red + '44' : C.border}`,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        onClick={() => setExpanded(isExpanded ? null : log.id)}
                        style={{
                          padding: '10px 14px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 2, lineHeight: 1.4 }}>
                            {log.question}
                          </div>
                          <div style={{ color: C.muted2, fontSize: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <span>👤 {log.user_name}</span>
                            <span>🕐 {date}</span>
                            {log.feedback === 'down' && <span style={{ color: C.red }}>👎 Flagged</span>}
                            {log.feedback === 'up' && <span style={{ color: C.green }}>👍 Helpful</span>}
                          </div>
                        </div>
                        <span style={{ color: C.muted2, fontSize: 12, flexShrink: 0 }}>
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </div>
                      {isExpanded && (
                        <div
                          style={{
                            borderTop: `1px solid ${C.border}`,
                            padding: '10px 14px',
                            backgroundColor: C.surf3,
                          }}
                        >
                          <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                            AI Answer
                          </div>
                          <div
                            style={{
                              color: C.muted,
                              fontSize: 12,
                              lineHeight: 1.6,
                              whiteSpace: 'pre-wrap',
                              maxHeight: 300,
                              overflowY: 'auto',
                            }}
                          >
                            {log.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {!loading && tab === 'searches' && (
          <>
            {searchLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: C.muted2, fontSize: 13 }}>
                No search queries logged yet. Queries are recorded as users type (debounced) and again when they click a result.
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <button
                    onClick={() => {
                      const headers = ['created_at', 'user_name', 'query', 'result_kind', 'result_title'];
                      const escape = (s: any) => {
                        const v = s == null ? '' : String(s);
                        return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
                      };
                      const rows = searchLogs.map((l: any) => [
                        l.created_at, l.user_name, l.query, l.result_kind ?? '', l.result_title ?? '',
                      ].map(escape).join(','));
                      const csv = [headers.join(','), ...rows].join('\n');
                      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `search-logs-${new Date().toISOString().slice(0, 10)}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    style={{
                      backgroundColor: C.surf2, border: `1px solid ${C.border}`, color: C.text,
                      borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ⬇ Download CSV ({searchLogs.length} rows)
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {searchLogs.map((log) => {
                  const date = new Date(log.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  });
                  const kindColors: Record<string, string> = {
                    section: '#F5C800', sop: '#4A90D9', resource: '#22C55E',
                    recording: '#A78BFA', loom: '#F59E0B',
                  };
                  const kindColor = log.result_kind ? (kindColors[log.result_kind] ?? C.muted) : C.muted2;
                  return (
                    <div
                      key={log.id}
                      style={{
                        backgroundColor: C.surf2,
                        border: `1px solid ${C.border}`,
                        borderRadius: 10,
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
                          "{log.query}"
                        </div>
                        {log.result_title && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                            <span style={{ color: kindColor, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: kindColor + '18', padding: '1px 5px', borderRadius: 4 }}>
                              {log.result_kind}
                            </span>
                            <span style={{ color: C.muted, fontSize: 11 }}>→ {log.result_title}</span>
                          </div>
                        )}
                        <div style={{ color: C.muted2, fontSize: 10, display: 'flex', gap: 10 }}>
                          <span>👤 {log.user_name}</span>
                          <span>🕐 {date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </>
            )}
          </>
        )}

        {!loading && tab === 'corrections' && (
          <>
            {knowledge.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: C.muted2, fontSize: 13 }}>
                No corrections submitted yet. Pod managers can submit corrections when Ask RI gives a wrong answer.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {knowledge.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: C.surf2,
                      border: `1px solid ${item.approved ? C.green + '44' : C.border}`,
                      borderRadius: 10,
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: C.text, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                          Q: {item.question}
                        </div>
                        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>
                          A: {item.answer}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                        <button
                          onClick={() => toggleApproval(item.id, !item.approved)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 6,
                            fontSize: 10,
                            fontWeight: 800,
                            border: `1px solid ${item.approved ? C.green + '44' : C.border}`,
                            cursor: 'pointer',
                            backgroundColor: item.approved ? '#0D2A0D' : C.surf3,
                            color: item.approved ? C.green : C.muted,
                          }}
                        >
                          {item.approved ? '✓ Approved' : 'Approve'}
                        </button>
                        <div style={{ color: C.muted2, fontSize: 10 }}>by {item.submitted_by}</div>
                      </div>
                    </div>
                    <div style={{ color: C.muted2, fontSize: 10 }}>
                      {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {item.approved && ' · Will be injected into AI context'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 800, marginBottom: 8 }}>Add or update a Loom slot</div>
              <div style={{ color: C.muted, fontSize: 11, marginBottom: 10, lineHeight: 1.5 }}>
                Paste a Loom share URL. The placeholder for the matching slot key flips to a live embed within seconds — no redeploy needed.
                <br />
                Known slots: <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10 }}>intro_video, s17_cole_day, s17_tyler_day, s18_sales, s18_media-buying, s18_creative, s18_va, s18_finance, s18_ops</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8, alignItems: 'start' }}>
                <input
                  placeholder="slot_key (e.g. intro_video)"
                  value={mediaForm.slot_key}
                  onChange={(e) => setMediaForm((f) => ({ ...f, slot_key: e.target.value }))}
                  style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.surf3, color: C.text, fontSize: 12, fontFamily: 'ui-monospace, monospace' }}
                />
                <input
                  placeholder="https://www.loom.com/share/..."
                  value={mediaForm.url}
                  onChange={(e) => setMediaForm((f) => ({ ...f, url: e.target.value }))}
                  style={{ padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.surf3, color: C.text, fontSize: 12 }}
                />
                <input
                  placeholder="title (optional)"
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm((f) => ({ ...f, title: e.target.value }))}
                  style={{ gridColumn: '1 / span 2', padding: '8px 10px', borderRadius: 8, border: `1px solid ${C.border}`, backgroundColor: C.surf3, color: C.text, fontSize: 12 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                <button
                  onClick={saveMediaLink}
                  disabled={mediaSaving}
                  style={{
                    padding: '7px 14px', borderRadius: 8, border: 'none',
                    backgroundColor: '#F5C800', color: '#000', fontWeight: 800, fontSize: 12,
                    cursor: mediaSaving ? 'not-allowed' : 'pointer', opacity: mediaSaving ? 0.6 : 1,
                  }}
                >
                  {mediaSaving ? 'Saving…' : 'Save / update'}
                </button>
                {mediaMsg && <div style={{ color: mediaMsg.startsWith('Error') ? '#EF4444' : C.green, fontSize: 11 }}>{mediaMsg}</div>}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.keys(mediaLinks).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: C.muted2, fontSize: 13 }}>
                  No Loom slots populated yet. Use the form above to set the first one.
                </div>
              ) : Object.entries(mediaLinks).sort((a, b) => a[0].localeCompare(b[0])).map(([slot, info]: any) => (
                <div key={slot} style={{
                  backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10,
                  padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.text, fontSize: 12, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>{slot}</div>
                    {info.title && <div style={{ color: C.muted, fontSize: 11 }}>{info.title}</div>}
                    <div style={{ color: C.muted2, fontSize: 10, marginTop: 2, wordBreak: 'break-all' }}>
                      <a href={info.url} target="_blank" rel="noopener noreferrer" style={{ color: C.blue }}>{info.url}</a>
                    </div>
                    {info.updated_at && (
                      <div style={{ color: C.muted2, fontSize: 9, marginTop: 2 }}>
                        Updated {new Date(info.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        {info.updated_by ? ` · by ${info.updated_by}` : ''}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setMediaForm({ slot_key: slot, url: info.url, title: info.title ?? '' })}
                    style={{
                      padding: '5px 10px', borderRadius: 6, border: `1px solid ${C.border}`,
                      backgroundColor: C.surf3, color: C.text, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMediaLink(slot)}
                    style={{
                      padding: '5px 10px', borderRadius: 6, border: `1px solid #EF444444`,
                      backgroundColor: '#2A0D0D', color: '#EF4444', fontSize: 10, fontWeight: 700, cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Content Management (Announcements / Feedback / Roadmap / Resources / Recordings) ──
function ContentAdmin() {
  const [adminTab, setAdminTab] = useState<'announcements' | 'feedback' | 'roadmap' | 'resources' | 'recordings'>('announcements');

  // ── Announcements ──
  const [announcements, setAnnouncements] = useState<{
    id: string; title: string; body: string; link_url: string | null;
    loom_url: string | null; image_url: string | null; created_by: string;
    published: boolean; created_at: string;
  }[]>([]);
  const [aForm, setAForm] = useState({ title: '', notes: '', body: '', link_url: '', loom_url: '', image_url: '' });
  const [aSaving, setASaving] = useState(false);
  const [aMsg, setAMsg] = useState<string | null>(null);
  const [aSummarizing, setASummarizing] = useState(false);

  // ── Feedback ──
  const [feedbackItems, setFeedbackItems] = useState<{
    id: string; title: string; description: string | null; category: string | null;
    vote_count: number; created_by: string; status: string; created_at: string;
  }[]>([]);

  // ── Roadmap ──
  const [roadmapItems, setRoadmapItems] = useState<{
    id: string; title: string; description: string | null; category: string | null;
    status: string; created_by: string; created_at: string;
  }[]>([]);
  const [rForm, setRForm] = useState({ title: '', description: '', status: 'planned', category: '' });
  const [rSaving, setRSaving] = useState(false);
  const [rMsg, setRMsg] = useState<string | null>(null);

  // ── Resources ──
  type ContentItem = { id: string; title: string; description: string; url: string; icon: string; category: string; tags: string[]; published: boolean; created_at?: string };
  const [resources, setResources] = useState<ContentItem[]>([]);
  const [resForm, setResForm] = useState({ id: '', title: '', description: '', url: '', icon: '📄', category: 'sop', tags: '' });
  const [resEditingId, setResEditingId] = useState<string | null>(null);
  const [resSaving, setResSaving] = useState(false);
  const [resMsg, setResMsg] = useState<string | null>(null);

  // ── Recordings ──
  type RecItem = { id: string; title: string; description: string; url: string; category: string; tags: string[]; duration_mins?: number; watch_first?: boolean; published: boolean; created_at?: string };
  const [recordings, setRecordings] = useState<RecItem[]>([]);
  const [recForm, setRecForm] = useState({ id: '', title: '', description: '', url: '', category: 'training_loom', tags: '', duration_mins: '', watch_first: false });
  const [recEditingId, setRecEditingId] = useState<string | null>(null);
  const [recSaving, setRecSaving] = useState(false);
  const [recMsg, setRecMsg] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      const [aRes, fRes, rmRes] = await Promise.all([
        fetch('/api/announcements').then((r) => r.json()),
        fetch('/api/feedback').then((r) => r.json()),
        fetch('/api/roadmap').then((r) => r.json()),
      ]);
      setAnnouncements(aRes.announcements ?? []);
      setFeedbackItems(fRes.items ?? []);
      setRoadmapItems(rmRes.items ?? []);
    } catch {}
  }, []);

  const loadResources = useCallback(async () => {
    try {
      const d = await fetch('/api/content/resources').then(r => r.json());
      setResources(d.items ?? []);
    } catch {}
  }, []);

  const loadRecordings = useCallback(async () => {
    try {
      const d = await fetch('/api/content/recordings').then(r => r.json());
      setRecordings(d.items ?? []);
    } catch {}
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);
  useEffect(() => { if (adminTab === 'resources') loadResources(); }, [adminTab, loadResources]);
  useEffect(() => { if (adminTab === 'recordings') loadRecordings(); }, [adminTab, loadRecordings]);

  // ── Announcement actions ──
  async function summarizeWithAI() {
    if (!aForm.title.trim()) { setAMsg('Enter a title first'); return; }
    setASummarizing(true); setAMsg(null);
    try {
      const res = await fetch('/api/ai-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: aForm.title.trim(), notes: aForm.notes.trim() }),
      });
      const d = await res.json();
      if (d.summary) setAForm(f => ({ ...f, body: d.summary }));
      else setAMsg(d.error ?? 'Could not generate summary');
    } catch { setAMsg('AI unavailable'); }
    setASummarizing(false);
  }

  async function postAnnouncement() {
    if (!aForm.title.trim() || !aForm.body.trim()) { setAMsg('Title and body required'); return; }
    setASaving(true); setAMsg(null);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aForm.title.trim(), body: aForm.body.trim(),
          link_url: aForm.link_url.trim() || undefined,
          loom_url: aForm.loom_url.trim() || undefined,
          image_url: aForm.image_url.trim() || undefined,
          created_by: 'admin',
        }),
      });
      if (res.ok) { setAForm({ title: '', notes: '', body: '', link_url: '', loom_url: '', image_url: '' }); setAMsg('Posted! Users will see the popup on next login.'); await loadAll(); }
      else { const d = await res.json(); setAMsg(d.error ?? 'Error'); }
    } catch (e) { setAMsg(String(e)); }
    setASaving(false);
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm('Delete this announcement?')) return;
    await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/announcements/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published }) });
    await loadAll();
  }

  // ── Feedback actions ──
  async function updateFeedbackStatus(id: string, status: string) {
    await fetch(`/api/feedback/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setFeedbackItems((prev) => prev.map((f) => f.id === id ? { ...f, status } : f));
  }

  async function deleteFeedback(id: string) {
    if (!confirm('Delete this feedback item?')) return;
    await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  // ── Roadmap actions ──
  async function postRoadmapItem() {
    if (!rForm.title.trim()) { setRMsg('Title required'); return; }
    setRSaving(true); setRMsg(null);
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: rForm.title.trim(), description: rForm.description.trim() || undefined, status: rForm.status, category: rForm.category.trim() || undefined, created_by: 'admin' }),
      });
      if (res.ok) { setRForm({ title: '', description: '', status: 'planned', category: '' }); setRMsg('Added!'); await loadAll(); }
      else { const d = await res.json(); setRMsg(d.error ?? 'Error'); }
    } catch (e) { setRMsg(String(e)); }
    setRSaving(false);
  }

  async function updateRoadmapStatus(id: string, status: string) {
    await fetch(`/api/roadmap/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setRoadmapItems((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }

  async function deleteRoadmapItem(id: string) {
    if (!confirm('Delete this roadmap item?')) return;
    await fetch(`/api/roadmap/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  // ── Resource actions ──
  function startEditResource(item: ContentItem) {
    setResForm({ id: item.id, title: item.title, description: item.description, url: item.url, icon: item.icon || '📄', category: item.category, tags: (item.tags ?? []).join(', ') });
    setResEditingId(item.id);
    setResMsg(null);
  }

  function cancelEditResource() { setResForm({ id: '', title: '', description: '', url: '', icon: '📄', category: 'sop', tags: '' }); setResEditingId(null); setResMsg(null); }

  async function saveResource() {
    if (!resForm.title.trim() || !resForm.url.trim()) { setResMsg('Title and URL required'); return; }
    setResSaving(true); setResMsg(null);
    const payload = {
      id: resForm.id.trim() || undefined,
      title: resForm.title.trim(), description: resForm.description.trim(),
      url: resForm.url.trim(), icon: resForm.icon.trim() || '📄',
      category: resForm.category,
      tags: resForm.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    try {
      const method = resEditingId ? 'PUT' : 'POST';
      const url = resEditingId ? `/api/content/resources/${resEditingId}` : '/api/content/resources';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { cancelEditResource(); setResMsg(resEditingId ? 'Updated!' : 'Added!'); await loadResources(); }
      else { const d = await res.json(); setResMsg(d.error ?? 'Error'); }
    } catch (e) { setResMsg(String(e)); }
    setResSaving(false);
  }

  async function deleteResource(id: string) {
    if (!confirm('Remove this resource?')) return;
    await fetch(`/api/content/resources/${id}`, { method: 'DELETE' });
    await loadResources();
  }

  // ── Recording actions ──
  function startEditRecording(item: RecItem) {
    setRecForm({ id: item.id, title: item.title, description: item.description, url: item.url, category: item.category, tags: (item.tags ?? []).join(', '), duration_mins: item.duration_mins ? String(item.duration_mins) : '', watch_first: item.watch_first ?? false });
    setRecEditingId(item.id);
    setRecMsg(null);
  }

  function cancelEditRecording() { setRecForm({ id: '', title: '', description: '', url: '', category: 'training_loom', tags: '', duration_mins: '', watch_first: false }); setRecEditingId(null); setRecMsg(null); }

  async function saveRecording() {
    if (!recForm.title.trim() || !recForm.url.trim()) { setRecMsg('Title and URL required'); return; }
    setRecSaving(true); setRecMsg(null);
    const payload = {
      id: recForm.id.trim() || undefined,
      title: recForm.title.trim(), description: recForm.description.trim(),
      url: recForm.url.trim(), category: recForm.category,
      tags: recForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      duration_mins: recForm.duration_mins ? parseInt(recForm.duration_mins) : undefined,
      watch_first: recForm.watch_first,
    };
    try {
      const method = recEditingId ? 'PUT' : 'POST';
      const url = recEditingId ? `/api/content/recordings/${recEditingId}` : '/api/content/recordings';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { cancelEditRecording(); setRecMsg(recEditingId ? 'Updated!' : 'Added!'); await loadRecordings(); }
      else { const d = await res.json(); setRecMsg(d.error ?? 'Error'); }
    } catch (e) { setRecMsg(String(e)); }
    setRecSaving(false);
  }

  async function deleteRecording(id: string) {
    if (!confirm('Remove this recording?')) return;
    await fetch(`/api/content/recordings/${id}`, { method: 'DELETE' });
    await loadRecordings();
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 8,
    padding: '8px 12px', color: C.text, fontSize: 12, outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
  };

  const TABS = [
    { id: 'announcements' as const, label: `What's New (${announcements.length})` },
    { id: 'feedback' as const,      label: `Feedback (${feedbackItems.length})` },
    { id: 'roadmap' as const,       label: `Roadmap (${roadmapItems.length})` },
    { id: 'resources' as const,     label: 'Resources' },
    { id: 'recordings' as const,    label: 'Recordings' },
  ];

  return (
    <div style={{ marginTop: 32, backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #F5C80018 0%, transparent 70%)`, borderBottom: `1px solid ${C.border}`, padding: '16px 20px' }}>
        <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Content Management</div>
        <h2 style={{ color: C.text, fontSize: 16, fontWeight: 900, margin: 0 }}>Announcements · Feedback · Roadmap · Resources · Recordings</h2>
        <p style={{ color: C.muted, fontSize: 12, margin: '3px 0 0' }}>Manage all portal content without touching code.</p>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, overflowX: 'auto' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setAdminTab(t.id)} style={{
            padding: '10px 16px', fontSize: 12, fontWeight: 700, border: 'none', flexShrink: 0,
            borderBottom: adminTab === t.id ? `2px solid ${C.acc}` : '2px solid transparent',
            backgroundColor: 'transparent', color: adminTab === t.id ? C.acc : C.muted, cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>

        {/* ── Announcements ── */}
        {adminTab === 'announcements' && (
          <div>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Post New Announcement</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Title *" value={aForm.title} onChange={(e) => setAForm((f) => ({ ...f, title: e.target.value }))} style={inputStyle} />

                {/* AI assist */}
                <div>
                  <textarea
                    placeholder="Raw notes (optional) — paste bullet points, Slack messages, or rough context here. AI will turn them into a polished body."
                    value={aForm.notes}
                    onChange={(e) => setAForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical', color: C.muted }}
                  />
                  <button
                    onClick={summarizeWithAI}
                    disabled={aSummarizing}
                    style={{
                      marginTop: 6, backgroundColor: '#1A1600', border: `1px solid ${C.acc}44`,
                      color: aSummarizing ? C.muted : C.acc, fontSize: 11, fontWeight: 800,
                      padding: '6px 14px', borderRadius: 7, cursor: aSummarizing ? 'default' : 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {aSummarizing ? '✦ Generating…' : '✦ Generate summary with AI'}
                  </button>
                </div>

                <textarea placeholder="Body * (what users will see in the popup and What's New tab)" value={aForm.body} onChange={(e) => setAForm((f) => ({ ...f, body: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                <input placeholder="Link URL (optional)" value={aForm.link_url} onChange={(e) => setAForm((f) => ({ ...f, link_url: e.target.value }))} style={inputStyle} />
                <input placeholder="Loom URL (optional — embeds the video in the popup)" value={aForm.loom_url} onChange={(e) => setAForm((f) => ({ ...f, loom_url: e.target.value }))} style={inputStyle} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={postAnnouncement} disabled={aSaving} style={{ backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                    {aSaving ? 'Posting…' : 'Post announcement'}
                  </button>
                  {aMsg && <span style={{ color: aMsg.startsWith('Posted') ? C.green : C.red, fontSize: 12 }}>{aMsg}</span>}
                </div>
              </div>
            </div>

            {announcements.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No announcements yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {announcements.map((a) => (
                  <div key={a.id} style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>{a.title}</div>
                      <div style={{ color: C.muted, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>{a.body.slice(0, 120)}{a.body.length > 120 ? '…' : ''}</div>
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 6 }}>{new Date(a.created_at).toLocaleString()} · by {a.created_by} · {a.published ? '✅ Published' : '🚫 Hidden'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button onClick={() => togglePublish(a.id, !a.published)} style={{ backgroundColor: a.published ? '#1A1A1A' : '#0D1A0D', color: a.published ? C.muted : C.green, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 7, border: `1px solid ${a.published ? C.border : '#22C55E44'}`, cursor: 'pointer' }}>
                        {a.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => deleteAnnouncement(a.id)} style={{ backgroundColor: '#1A0D0D', color: C.red, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 7, border: `1px solid ${C.red}44`, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Feedback ── */}
        {adminTab === 'feedback' && (
          <div>
            {feedbackItems.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No feedback submitted yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {feedbackItems.map((f) => (
                  <div key={f.id} style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ backgroundColor: '#1A1400', color: C.acc, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, border: `1px solid ${C.acc}44` }}>▲ {f.vote_count}</span>
                        {f.category && <span style={{ color: C.muted2, fontSize: 10 }}>#{f.category}</span>}
                      </div>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{f.title}</div>
                      {f.description && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{f.description}</div>}
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 6 }}>{new Date(f.created_at).toLocaleString()} · by {f.created_by}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                      {['open', 'under_review', 'planned', 'done', 'closed'].map((s) => (
                        <button key={s} onClick={() => updateFeedbackStatus(f.id, s)} style={{ backgroundColor: f.status === s ? '#1A1400' : 'transparent', color: f.status === s ? C.acc : C.muted2, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, border: f.status === s ? `1px solid ${C.acc}44` : `1px solid ${C.border}`, cursor: 'pointer' }}>
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                      <button onClick={() => deleteFeedback(f.id)} style={{ backgroundColor: '#1A0D0D', color: C.red, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, border: `1px solid ${C.red}44`, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Roadmap ── */}
        {adminTab === 'roadmap' && (
          <div>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Add Roadmap Item</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Title *" value={rForm.title} onChange={(e) => setRForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
                <textarea placeholder="Description (optional)" value={rForm.description} onChange={(e) => setRForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <select value={rForm.status} onChange={(e) => setRForm(f => ({ ...f, status: e.target.value }))} style={{ ...inputStyle, width: 'auto' }}>
                    {['planned', 'in_progress', 'done'].map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                  <input placeholder="Category (optional)" value={rForm.category} onChange={(e) => setRForm(f => ({ ...f, category: e.target.value }))} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button onClick={postRoadmapItem} disabled={rSaving} style={{ backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{rSaving ? 'Adding…' : 'Add item'}</button>
                  {rMsg && <span style={{ color: rMsg === 'Added!' ? C.green : C.red, fontSize: 12 }}>{rMsg}</span>}
                </div>
              </div>
            </div>
            {roadmapItems.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No roadmap items yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {roadmapItems.map((r) => (
                  <div key={r.id} style={{ backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{r.title}</div>
                      {r.description && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{r.description}</div>}
                      {r.category && <div style={{ color: C.muted2, fontSize: 10, marginTop: 4 }}>{r.category}</div>}
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 4 }}>{new Date(r.created_at).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                      {['planned', 'in_progress', 'done'].map((s) => (
                        <button key={s} onClick={() => updateRoadmapStatus(r.id, s)} style={{ backgroundColor: r.status === s ? '#1A1400' : 'transparent', color: r.status === s ? C.acc : C.muted2, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, border: r.status === s ? `1px solid ${C.acc}44` : `1px solid ${C.border}`, cursor: 'pointer' }}>
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                      <button onClick={() => deleteRoadmapItem(r.id)} style={{ backgroundColor: '#1A0D0D', color: C.red, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6, border: `1px solid ${C.red}44`, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Resources ── */}
        {adminTab === 'resources' && (
          <div>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>{resEditingId ? 'Edit Resource' : 'Add New Resource / SOP / Tool'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input placeholder="Title *" value={resForm.title} onChange={e => setResForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
                  <input placeholder="Icon emoji" value={resForm.icon} onChange={e => setResForm(f => ({ ...f, icon: e.target.value }))} style={{ ...inputStyle, width: 80, flexShrink: 0 }} />
                </div>
                <textarea placeholder="Description" value={resForm.description} onChange={e => setResForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <input placeholder="URL *" value={resForm.url} onChange={e => setResForm(f => ({ ...f, url: e.target.value }))} style={inputStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <select value={resForm.category} onChange={e => setResForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, width: 'auto' }}>
                    <option value="resource">⚡ Quick Access</option>
                    <option value="tool">🛠️ Tool</option>
                    <option value="sop">📋 SOP</option>
                  </select>
                  <input placeholder="Tags (comma-separated, e.g. onboarding, client, process)" value={resForm.tags} onChange={e => setResForm(f => ({ ...f, tags: e.target.value }))} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={saveResource} disabled={resSaving} style={{ backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                    {resSaving ? 'Saving…' : resEditingId ? 'Update' : 'Add resource'}
                  </button>
                  {resEditingId && <button onClick={cancelEditResource} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.border}`, cursor: 'pointer' }}>Cancel</button>}
                  {resMsg && <span style={{ color: resMsg.includes('!') ? C.green : C.red, fontSize: 12 }}>{resMsg}</span>}
                </div>
              </div>
            </div>

            <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>{resources.length} items (static + DB combined)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {resources.map((item) => (
                <div key={item.id} style={{ backgroundColor: C.surf2, border: `1px solid ${resEditingId === item.id ? C.acc + '55' : C.border}`, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon || '📄'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>{item.title}</div>
                    <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{item.description?.slice(0, 80)}{(item.description?.length ?? 0) > 80 ? '…' : ''}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#1A1400', color: C.acc, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 4 }}>{item.category}</span>
                      {(item.tags ?? []).map(t => <span key={t} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>#{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => startEditResource(item)} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.border}`, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => deleteResource(item.id)} style={{ backgroundColor: '#1A0D0D', color: C.red, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.red}44`, cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Recordings ── */}
        {adminTab === 'recordings' && (
          <div>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 12, padding: '16px', marginBottom: 20 }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>{recEditingId ? 'Edit Recording' : 'Add New Recording'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Title *" value={recForm.title} onChange={e => setRecForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
                <textarea placeholder="Description" value={recForm.description} onChange={e => setRecForm(f => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <input placeholder="URL * (Fathom, Loom, YouTube, etc.)" value={recForm.url} onChange={e => setRecForm(f => ({ ...f, url: e.target.value }))} style={inputStyle} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <select value={recForm.category} onChange={e => setRecForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, width: 'auto' }}>
                    <option value="training_loom">🎬 Training Loom</option>
                    <option value="onboarding_reference">📞 Onboarding Reference</option>
                    <option value="service_delivery">⚙️ Service Delivery</option>
                    <option value="reference_recording">📹 Reference Recording</option>
                  </select>
                  <input placeholder="Duration (minutes)" type="number" value={recForm.duration_mins} onChange={e => setRecForm(f => ({ ...f, duration_mins: e.target.value }))} style={{ ...inputStyle, width: 140, flexShrink: 0 }} />
                </div>
                <input placeholder="Tags (comma-separated, e.g. creative, lead-flow, technical)" value={recForm.tags} onChange={e => setRecForm(f => ({ ...f, tags: e.target.value }))} style={inputStyle} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: C.muted }}>
                  <input type="checkbox" checked={recForm.watch_first} onChange={e => setRecForm(f => ({ ...f, watch_first: e.target.checked }))} />
                  Mark as "Watch First" (highlights this recording)
                </label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button onClick={saveRecording} disabled={recSaving} style={{ backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                    {recSaving ? 'Saving…' : recEditingId ? 'Update' : 'Add recording'}
                  </button>
                  {recEditingId && <button onClick={cancelEditRecording} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 8, border: `1px solid ${C.border}`, cursor: 'pointer' }}>Cancel</button>}
                  {recMsg && <span style={{ color: recMsg.includes('!') ? C.green : C.red, fontSize: 12 }}>{recMsg}</span>}
                </div>
              </div>
            </div>

            <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>{recordings.length} items (static + DB combined)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recordings.map((item) => (
                <div key={item.id} style={{ backgroundColor: C.surf2, border: `1px solid ${recEditingId === item.id ? C.acc + '55' : C.border}`, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ color: C.text, fontSize: 12, fontWeight: 700 }}>{item.title}</span>
                      {item.watch_first && <span style={{ backgroundColor: '#1A1400', color: C.acc, fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4 }}>WATCH FIRST</span>}
                    </div>
                    <div style={{ color: C.muted, fontSize: 11 }}>{item.description?.slice(0, 80)}{(item.description?.length ?? 0) > 80 ? '…' : ''}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#0D1A1A', color: '#06B6D4', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 4 }}>{item.category.replace(/_/g, ' ')}</span>
                      {item.duration_mins && <span style={{ color: C.muted2, fontSize: 10 }}>{Math.floor(item.duration_mins / 60) > 0 ? `${Math.floor(item.duration_mins / 60)}h ` : ''}{item.duration_mins % 60}m</span>}
                      {(item.tags ?? []).map(t => <span key={t} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>#{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => startEditRecording(item)} style={{ backgroundColor: C.surf3, color: C.muted, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.border}`, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => deleteRecording(item.id)} style={{ backgroundColor: '#1A0D0D', color: C.red, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.red}44`, cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


  // ── Announcements ──
  const [announcements, setAnnouncements] = useState<{
    id: string; title: string; body: string; link_url: string | null;
    loom_url: string | null; image_url: string | null; created_by: string;
    published: boolean; created_at: string;
  }[]>([]);
  const [aForm, setAForm] = useState({ title: '', body: '', link_url: '', loom_url: '', image_url: '' });
  const [aSaving, setASaving] = useState(false);
  const [aMsg, setAMsg] = useState<string | null>(null);

  // ── Feedback ──
  const [feedbackItems, setFeedbackItems] = useState<{
    id: string; title: string; description: string | null; category: string | null;
    vote_count: number; created_by: string; status: string; created_at: string;
  }[]>([]);

  // ── Roadmap ──
  const [roadmapItems, setRoadmapItems] = useState<{
    id: string; title: string; description: string | null; category: string | null;
    status: string; created_by: string; created_at: string;
  }[]>([]);
  const [rForm, setRForm] = useState({ title: '', description: '', status: 'planned', category: '' });
  const [rSaving, setRSaving] = useState(false);
  const [rMsg, setRMsg] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      const [aRes, fRes, rmRes] = await Promise.all([
        fetch('/api/announcements').then((r) => r.json()),
        fetch('/api/feedback').then((r) => r.json()),
        fetch('/api/roadmap').then((r) => r.json()),
      ]);
      // Admin view: fetch all (including unpublished) — for now same endpoint
      setAnnouncements(aRes.announcements ?? []);
      setFeedbackItems(fRes.items ?? []);
      setRoadmapItems(rmRes.items ?? []);
    } catch {}
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function postAnnouncement() {
    if (!aForm.title.trim() || !aForm.body.trim()) { setAMsg('Title and body required'); return; }
    setASaving(true); setAMsg(null);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: aForm.title.trim(),
          body: aForm.body.trim(),
          link_url: aForm.link_url.trim() || undefined,
          loom_url: aForm.loom_url.trim() || undefined,
          image_url: aForm.image_url.trim() || undefined,
          created_by: 'jonathan',
        }),
      });
      if (res.ok) {
        setAForm({ title: '', body: '', link_url: '', loom_url: '', image_url: '' });
        setAMsg('Posted!');
        await loadAll();
      } else {
        const d = await res.json(); setAMsg(d.error ?? 'Error');
      }
    } catch (e) { setAMsg(String(e)); }
    setASaving(false);
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm('Delete this announcement?')) return;
    await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published }),
    });
    await loadAll();
  }

  async function updateFeedbackStatus(id: string, status: string) {
    await fetch(`/api/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setFeedbackItems((prev) => prev.map((f) => f.id === id ? { ...f, status } : f));
  }

  async function deleteFeedback(id: string) {
    if (!confirm('Delete this feedback item?')) return;
    await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  async function postRoadmapItem() {
    if (!rForm.title.trim()) { setRMsg('Title required'); return; }
    setRSaving(true); setRMsg(null);
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: rForm.title.trim(),
          description: rForm.description.trim() || undefined,
          status: rForm.status,
          category: rForm.category.trim() || undefined,
          created_by: 'jonathan',
        }),
      });
      if (res.ok) {
        setRForm({ title: '', description: '', status: 'planned', category: '' });
        setRMsg('Added!');
        await loadAll();
      } else {
        const d = await res.json(); setRMsg(d.error ?? 'Error');
      }
    } catch (e) { setRMsg(String(e)); }
    setRSaving(false);
  }

  async function updateRoadmapStatus(id: string, status: string) {
    await fetch(`/api/roadmap/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setRoadmapItems((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  }

  async function deleteRoadmapItem(id: string) {
    if (!confirm('Delete this roadmap item?')) return;
    await fetch(`/api/roadmap/${id}`, { method: 'DELETE' });
    await loadAll();
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: C.surf2, border: `1px solid ${C.border}`, borderRadius: 8,
    padding: '8px 12px', color: C.text, fontSize: 12, outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
  };

  return (
    <div style={{
      marginTop: 32,
      backgroundColor: C.surf, border: `1px solid ${C.border}`,
      borderRadius: 16, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #F5C80018 0%, transparent 70%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: '16px 20px',
      }}>
        <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
          Content Management
        </div>
        <h2 style={{ color: C.text, fontSize: 16, fontWeight: 900, margin: 0 }}>
          Announcements · Feedback · Roadmap
        </h2>
        <p style={{ color: C.muted, fontSize: 12, margin: '3px 0 0' }}>
          Manage What&apos;s New posts, review feedback from the team, and update the portal roadmap.
        </p>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
        {([
          { id: 'announcements' as const, label: `What's New (${announcements.length})` },
          { id: 'feedback' as const,      label: `Feedback (${feedbackItems.length})` },
          { id: 'roadmap' as const,       label: `Roadmap (${roadmapItems.length})` },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => setAdminTab(t.id)}
            style={{
              padding: '10px 18px', fontSize: 12, fontWeight: 700, border: 'none',
              borderBottom: adminTab === t.id ? `2px solid ${C.acc}` : '2px solid transparent',
              backgroundColor: 'transparent',
              color: adminTab === t.id ? C.acc : C.muted,
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>

        {/* ── Announcements ── */}
        {adminTab === 'announcements' && (
          <div>
            {/* Create form */}
            <div style={{
              backgroundColor: C.surf2, border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: '16px', marginBottom: 20,
            }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Post New Announcement</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Title *" value={aForm.title} onChange={(e) => setAForm((f) => ({ ...f, title: e.target.value }))} style={inputStyle} />
                <textarea placeholder="Body *" value={aForm.body} onChange={(e) => setAForm((f) => ({ ...f, body: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                <input placeholder="Link URL (optional)" value={aForm.link_url} onChange={(e) => setAForm((f) => ({ ...f, link_url: e.target.value }))} style={inputStyle} />
                <input placeholder="Loom URL (optional — embeds the video)" value={aForm.loom_url} onChange={(e) => setAForm((f) => ({ ...f, loom_url: e.target.value }))} style={inputStyle} />
                <input placeholder="Image URL (optional)" value={aForm.image_url} onChange={(e) => setAForm((f) => ({ ...f, image_url: e.target.value }))} style={inputStyle} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={postAnnouncement}
                    disabled={aSaving}
                    style={{
                      backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12,
                      padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    }}
                  >
                    {aSaving ? 'Posting…' : 'Post announcement'}
                  </button>
                  {aMsg && <span style={{ color: aMsg === 'Posted!' ? C.green : C.red, fontSize: 12 }}>{aMsg}</span>}
                </div>
              </div>
            </div>

            {/* List */}
            {announcements.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No announcements yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {announcements.map((a) => (
                  <div key={a.id} style={{
                    backgroundColor: C.surf2, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: '12px 14px',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>{a.title}</div>
                      <div style={{ color: C.muted, fontSize: 11, marginTop: 3, lineHeight: 1.5 }}>
                        {a.body.slice(0, 120)}{a.body.length > 120 ? '…' : ''}
                      </div>
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 6 }}>
                        {new Date(a.created_at).toLocaleString()} · by {a.created_by} · {a.published ? '✅ Published' : '🚫 Hidden'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={() => togglePublish(a.id, !a.published)}
                        style={{
                          backgroundColor: a.published ? '#1A1A1A' : '#0D1A0D',
                          color: a.published ? C.muted : C.green,
                          fontSize: 11, fontWeight: 700,
                          padding: '5px 10px', borderRadius: 7,
                          border: `1px solid ${a.published ? C.border : '#22C55E44'}`, cursor: 'pointer',
                        }}
                      >
                        {a.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        style={{
                          backgroundColor: '#1A0D0D', color: C.red, fontSize: 11, fontWeight: 700,
                          padding: '5px 10px', borderRadius: 7,
                          border: `1px solid ${C.red}44`, cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Feedback ── */}
        {adminTab === 'feedback' && (
          <div>
            {feedbackItems.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No feedback submitted yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {feedbackItems.map((f) => (
                  <div key={f.id} style={{
                    backgroundColor: C.surf2, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: '12px 14px',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{
                          backgroundColor: '#1A1400', color: C.acc, fontSize: 10, fontWeight: 800,
                          padding: '2px 8px', borderRadius: 20, border: `1px solid ${C.acc}44`,
                        }}>
                          ▲ {f.vote_count}
                        </span>
                        {f.category && <span style={{ color: C.muted2, fontSize: 10 }}>{f.category}</span>}
                      </div>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{f.title}</div>
                      {f.description && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{f.description}</div>}
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 6 }}>
                        {new Date(f.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flexShrink: 0 }}>
                      {['open', 'under_review', 'planned', 'done', 'closed'].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateFeedbackStatus(f.id, s)}
                          style={{
                            backgroundColor: f.status === s ? '#1A1400' : 'transparent',
                            color: f.status === s ? C.acc : C.muted2,
                            fontSize: 10, fontWeight: 700,
                            padding: '4px 8px', borderRadius: 6,
                            border: f.status === s ? `1px solid ${C.acc}44` : `1px solid ${C.border}`,
                            cursor: 'pointer',
                          }}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                      <button
                        onClick={() => deleteFeedback(f.id)}
                        style={{
                          backgroundColor: '#1A0D0D', color: C.red, fontSize: 10, fontWeight: 700,
                          padding: '4px 8px', borderRadius: 6,
                          border: `1px solid ${C.red}44`, cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Roadmap ── */}
        {adminTab === 'roadmap' && (
          <div>
            {/* Create form */}
            <div style={{
              backgroundColor: C.surf2, border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: '16px', marginBottom: 20,
            }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Add Roadmap Item</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Title *" value={rForm.title} onChange={(e) => setRForm((f) => ({ ...f, title: e.target.value }))} style={inputStyle} />
                <textarea placeholder="Description (optional)" value={rForm.description} onChange={(e) => setRForm((f) => ({ ...f, description: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                <input placeholder="Category (optional — e.g. Portal, Training, Tools)" value={rForm.category} onChange={(e) => setRForm((f) => ({ ...f, category: e.target.value }))} style={inputStyle} />
                <select
                  value={rForm.status}
                  onChange={(e) => setRForm((f) => ({ ...f, status: e.target.value }))}
                  style={{ ...inputStyle }}
                >
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={postRoadmapItem}
                    disabled={rSaving}
                    style={{
                      backgroundColor: C.acc, color: '#000', fontWeight: 800, fontSize: 12,
                      padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    }}
                  >
                    {rSaving ? 'Adding…' : 'Add to roadmap'}
                  </button>
                  {rMsg && <span style={{ color: rMsg === 'Added!' ? C.green : C.red, fontSize: 12 }}>{rMsg}</span>}
                </div>
              </div>
            </div>

            {/* List */}
            {roadmapItems.length === 0 ? (
              <p style={{ color: C.muted2, fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No roadmap items yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {roadmapItems.map((r) => (
                  <div key={r.id} style={{
                    backgroundColor: C.surf2, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: '12px 14px',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{r.title}</div>
                      {r.description && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{r.description}</div>}
                      {r.category && <div style={{ color: C.muted2, fontSize: 10, marginTop: 4 }}>{r.category}</div>}
                      <div style={{ color: C.muted2, fontSize: 10, marginTop: 4 }}>{new Date(r.created_at).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                      {['planned', 'in_progress', 'done'].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateRoadmapStatus(r.id, s)}
                          style={{
                            backgroundColor: r.status === s ? '#1A1400' : 'transparent',
                            color: r.status === s ? C.acc : C.muted2,
                            fontSize: 10, fontWeight: 700,
                            padding: '4px 8px', borderRadius: 6,
                            border: r.status === s ? `1px solid ${C.acc}44` : `1px solid ${C.border}`,
                            cursor: 'pointer',
                          }}
                        >
                          {s.replace('_', ' ')}
                        </button>
                      ))}
                      <button
                        onClick={() => deleteRoadmapItem(r.id)}
                        style={{
                          backgroundColor: '#1A0D0D', color: C.red, fontSize: 10, fontWeight: 700,
                          padding: '4px 8px', borderRadius: 6,
                          border: `1px solid ${C.red}44`, cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main AdminDashboard ───────────────────────────────────────
export function AdminDashboard() {
  const [progress, setProgress] = useState<AllUsersProgress>({});
  const [loading, setLoading]   = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const supEnabled = isSupabaseEnabled();

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAllUsersProgress();
    setProgress(data);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const users = ['sam', 'ksenia', 'adeen'] as const;
  const pod4Users = ['sam'] as const;
  const pod5Users = ['ksenia', 'adeen'] as const;

  function podAvg(podUsers: readonly string[], daysList: any[]) {
    const totalWS = getTotalWorksheetItems(daysList);
    const worksheetAvg = podUsers.reduce((sum, u) => {
      const d = progress[u];
      if (!d) return sum;
      const done = getCompletedForUser(d.checklistItems, daysList);
      return sum + (totalWS > 0 ? Math.round((done / totalWS) * 100) : 0);
    }, 0) / podUsers.length;
    const sectionsAvg = podUsers.reduce((sum, u) => {
      const d = progress[u];
      return sum + (d ? Math.round((d.completedSections.length / SECTIONS.length) * 100) : 0);
    }, 0) / podUsers.length;
    return { worksheetAvg, sectionsAvg };
  }

  const pod4Stats = podAvg(pod4Users, dayContent.days as any);
  const pod5Stats = podAvg(pod5Users, dayContentPod5.days as any);

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
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(16px, 4vw, 28px) clamp(12px, 3vw, 24px) 60px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div>
            <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Admin · Jonathan Forbes
            </div>
            <h1 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.4px' }}>
              Pod Manager Progress Dashboard
            </h1>
            <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>
              Pod 4 (Sam · Apr 14) &amp; Pod 5 (Ksenia + Adeen · May 4)
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Sync status */}
            {!supEnabled && (
              <div
                style={{
                  backgroundColor: '#2A1A00',
                  border: `1px solid ${C.orange}44`,
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 11,
                  color: C.orange,
                  fontWeight: 700,
                }}
              >
                ⚠️ Supabase not configured — showing localStorage data
              </div>
            )}
            <button
              onClick={load}
              disabled={loading}
              style={{
                backgroundColor: C.surf2,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: '8px 14px',
                color: loading ? C.muted2 : C.text,
                fontSize: 12,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Refreshing…' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {/* Pod summary */}
        <div
          style={{
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Pod 4 */}
            <div style={{ flex: '1 1 260px' }}>
              <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Pod 4 — Sam · Apr 14
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Stat label="Worksheet" value={`${Math.round(pod4Stats.worksheetAvg)}%`} sub="Sam" color={pod4Stats.worksheetAvg >= 70 ? C.green : pod4Stats.worksheetAvg >= 40 ? C.orange : C.red} />
                <Stat label="Training" value={`${Math.round(pod4Stats.sectionsAvg)}%`} sub="sections done" color={pod4Stats.sectionsAvg >= 70 ? C.green : pod4Stats.sectionsAvg >= 40 ? C.orange : C.red} />
              </div>
            </div>
            {/* Pod 5 */}
            <div style={{ flex: '1 1 260px' }}>
              <div style={{ color: '#EC4899', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Pod 5 — Ksenia + Adeen · May 4
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Stat label="Worksheet" value={`${Math.round(pod5Stats.worksheetAvg)}%`} sub="avg" color={pod5Stats.worksheetAvg >= 70 ? C.green : pod5Stats.worksheetAvg >= 40 ? C.orange : C.red} />
                <Stat label="Training" value={`${Math.round(pod5Stats.sectionsAvg)}%`} sub="sections done" color={pod5Stats.sectionsAvg >= 70 ? C.green : pod5Stats.sectionsAvg >= 40 ? C.orange : C.red} />
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: C.muted }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⟳</div>
            <p style={{ fontSize: 14 }}>Loading progress data…</p>
          </div>
        )}

        {/* User cards */}
        {!loading && (
          <>
            {/* Pod 4 */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ color: C.muted2, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Pod 4
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {pod4Users.map((u) => (
                  <UserCard
                    key={u}
                    userName={u}
                    data={progress[u] ?? { checklistItems: {}, currentDay: 1, completedSections: [], quizScores: {} }}
                  />
                ))}
              </div>
            </div>
            {/* Pod 5 */}
            <div style={{ marginTop: 24 }}>
              <div style={{ color: '#EC4899', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Pod 5
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {pod5Users.map((u) => (
                  <UserCard
                    key={u}
                    userName={u}
                    data={progress[u] ?? { checklistItems: {}, currentDay: 1, completedSections: [], quizScores: {} }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Setup instructions if Supabase not configured */}
        {!supEnabled && (
          <div
            style={{
              marginTop: 28,
              backgroundColor: '#001A2A',
              border: `1px solid ${C.blue}44`,
              borderRadius: 12,
              padding: '18px 20px',
            }}
          >
            <div style={{ color: C.blue, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
              ℹ️ Enable Cross-Device Sync
            </div>
            <p style={{ color: '#ccc', fontSize: 13, margin: '0 0 12px', lineHeight: 1.6 }}>
              The admin dashboard needs Supabase to show real-time progress for all pod managers.
              Without it, it can only show local data from this browser.
            </p>
            <ol style={{ color: C.muted, fontSize: 13, margin: 0, paddingLeft: 18, lineHeight: 2 }}>
              <li>Go to <strong style={{ color: C.text }}>supabase.com</strong> → create a free project</li>
              <li>Open the SQL editor → paste and run <code style={{ color: C.acc }}>supabase/schema.sql</code></li>
              <li>Copy Project URL and anon key → create <code style={{ color: C.acc }}>.env.local</code> (see <code>.env.local.example</code>)</li>
              <li>Restart the dev server — sync activates automatically</li>
            </ol>
          </div>
        )}

        {/* Ask RI Insights */}
        <AskRIInsights />

        {/* Content Management */}
        <ContentAdmin />

        {lastRefresh && (
          <p style={{ color: C.muted2, fontSize: 11, textAlign: 'center', marginTop: 24 }}>
            Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
