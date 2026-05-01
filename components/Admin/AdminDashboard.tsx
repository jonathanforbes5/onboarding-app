'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchAllUsersProgress, AllUsersProgress } from '@/lib/syncService';
import { isSupabaseEnabled } from '@/lib/supabase';
import dayContent from '@/repo/data/day-content.json';
import dayContentPod5 from '@/repo/data/day-content-pod5.json';
import { SECTIONS } from '@/data/sections';

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
        flex: '1 1 360px',
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
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
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px 60px' }}>

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

        {lastRefresh && (
          <p style={{ color: C.muted2, fontSize: 11, textAlign: 'center', marginTop: 24 }}>
            Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
