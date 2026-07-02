'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp, CheckCircle } from 'lucide-react';

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
};

const CATEGORIES = [
  { id: 'Feature Idea',          icon: '💡', color: '#F5C800', prompt: 'What\'s the idea? What problem would it solve or make easier?' },
  { id: 'Process Improvement',   icon: '🔧', color: '#60A5FA', prompt: 'What\'s the current friction? How could it work better?' },
  { id: 'Training Needed',       icon: '📚', color: '#A78BFA', prompt: 'What topic? What\'s unclear, missing, or needs better documentation?' },
  { id: 'Portal Bug',            icon: '🐛', color: '#EF4444', prompt: 'What broke? What were you doing when it happened?' },
  { id: 'Recognition',           icon: '❤️',  color: '#F472B6', prompt: 'Who do you want to shout out? What did they do that deserves recognition?' },
  { id: 'Open Feedback',         icon: '💬', color: '#34D399', prompt: 'What\'s on your mind? No filter needed — say it as you see it.' },
];

const ROADMAP_COLS = [
  { key: 'planned',     label: 'Planned',     color: '#A78BFA', dot: '#A78BFA' },
  { key: 'in_progress', label: 'In Progress', color: '#FBBF24', dot: '#FBBF24' },
  { key: 'done',        label: 'Done',        color: '#22C55E', dot: '#22C55E' },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  open:         { label: 'Open',         color: '#60A5FA' },
  under_review: { label: 'Under Review', color: '#FBBF24' },
  planned:      { label: 'Planned',      color: '#A78BFA' },
  done:         { label: 'Done',         color: '#22C55E' },
  closed:       { label: 'Closed',       color: '#555555' },
};

// Derive a stable fingerprint from browser properties so the ID persists
// even if localStorage is cleared, making casual multi-voting much harder.
function browserFingerprint(): string {
  try {
    const parts = [
      navigator.language,
      navigator.platform ?? '',
      String(navigator.hardwareConcurrency ?? 0),
      String(screen.width),
      String(screen.height),
      String(screen.colorDepth),
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ].join('|');
    // FNV-1a 32-bit hash
    let h = 0x811c9dc5;
    for (let i = 0; i < parts.length; i++) {
      h ^= parts.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return 'fp_' + h.toString(36);
  } catch {
    return '';
  }
}

function getVisitorId(): string {
  try {
    const stored = localStorage.getItem('ri_pub_visitor');
    if (stored) return stored; // preserve existing IDs so prior votes remain
    const id = browserFingerprint() || 'pub_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('ri_pub_visitor', id);
    return id;
  } catch {
    return browserFingerprint() || 'pub_anon';
  }
}

function genSubmissionId(): string {
  return '#' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(0, mins)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface FeedbackItem {
  id: string; title: string; description: string | null; category: string | null;
  vote_count: number; status: string; created_at: string; hasVoted: boolean;
}
interface RoadmapItem {
  id: string; title: string; description: string | null;
  status: 'planned' | 'in_progress' | 'done'; category: string | null; updated_at: string;
}

type Section = 'board' | 'submit';
type Sort = 'top' | 'new';

export default function VoiceClient() {
  const [visitorId, setVisitorId] = useState('');
  const [section, setSection] = useState<Section>('board');
  const [sort, setSort] = useState<Sort>('top');
  const [filterCat, setFilterCat] = useState<string | null>(null);

  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [feedItems, setFeedItems] = useState<FeedbackItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [votingId, setVotingId] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  const loadFeed = useCallback((vid?: string) => {
    const key = vid ?? visitorId;
    setFeedLoading(true);
    fetch(`/api/feedback?user_key=${encodeURIComponent(key || 'pub_anon')}`)
      .then(r => r.json())
      .then(d => setFeedItems(d.items ?? []))
      .catch(() => {})
      .finally(() => setFeedLoading(false));
  }, [visitorId]);

  const loadRoadmap = useCallback(() => {
    setRoadmapLoading(true);
    fetch('/api/roadmap')
      .then(r => r.json())
      .then(d => setRoadmapItems(d.items ?? []))
      .catch(() => {})
      .finally(() => setRoadmapLoading(false));
  }, []);

  useEffect(() => {
    if (!visitorId) return;
    loadFeed(visitorId);
    loadRoadmap();
  }, [visitorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (isRetry = false) => {
    if (!title.trim() || !selectedCat || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const payload = {
      title: title.trim(),
      description: details.trim() || undefined,
      category: selectedCat,
      created_by: 'anonymous',
    };
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const sid = genSubmissionId();
        setSubmittedId(sid);
        setTitle(''); setDetails(''); setSelectedCat(null);
        setSection('board');
        loadFeed();
      } else if (res.status === 503 && !isRetry) {
        // Tables were just created — retry once after a short delay
        setTimeout(() => handleSubmit(true), 1200);
        return; // keep submitting=true while we wait
      } else {
        const body = await res.json().catch(() => ({})) as { error?: string };
        setSubmitError(body.error ?? `Submission failed (${res.status}) — please try again.`);
      }
    } catch {
      setSubmitError('Network error — check your connection and try again.');
    }
    setSubmitting(false);
  };

  const vote = async (id: string) => {
    if (votingId || !visitorId) return;
    setVotingId(id);
    // Optimistic update
    setFeedItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, hasVoted: !item.hasVoted, vote_count: item.vote_count + (item.hasVoted ? -1 : 1) }
        : item
    ));
    try {
      const res = await fetch(`/api/feedback/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_key: visitorId }),
      });
      const data = await res.json() as { voted: boolean; rateLimited?: boolean };
      if (res.status === 429 || data.rateLimited) {
        // Roll back optimistic update
        setFeedItems(prev => prev.map(item =>
          item.id === id
            ? { ...item, hasVoted: !item.hasVoted, vote_count: item.vote_count + (item.hasVoted ? -1 : 1) }
            : item
        ));
        setRateLimited(true);
        setTimeout(() => setRateLimited(false), 5000);
      } else {
        // Sync with server truth
        setFeedItems(prev => prev.map(item =>
          item.id === id ? { ...item, hasVoted: data.voted } : item
        ));
      }
    } catch {
      // Roll back on network error
      setFeedItems(prev => prev.map(item =>
        item.id === id
          ? { ...item, hasVoted: !item.hasVoted, vote_count: item.vote_count + (item.hasVoted ? -1 : 1) }
          : item
      ));
    }
    setVotingId(null);
  };

  const displayed = feedItems
    .filter(i => !filterCat || i.category === filterCat)
    .sort((a, b) =>
      sort === 'top'
        ? b.vote_count - a.vote_count
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const catMeta = CATEGORIES.find(c => c.id === selectedCat);
  const catColor = catMeta?.color ?? C.acc;
  const catPrompt = catMeta?.prompt ?? 'More details (optional)';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', color: C.text }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 600px) {
          .voice-roadmap-grid { grid-template-columns: 1fr !important; }
          .voice-cat-grid { grid-template-columns: 1fr 1fr !important; }
          .voice-trust-pills { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        borderBottom: `1px solid ${C.border}`,
        padding: '0 20px',
        position: 'sticky', top: 0,
        backgroundColor: '#0A0A0AEE',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="RoofIgnite" style={{ height: 26, width: 'auto' }} />
            <span style={{ color: '#333', fontSize: 14, fontWeight: 400 }}>·</span>
            <span style={{ color: '#DDDDDD', fontSize: 14, fontWeight: 800, letterSpacing: '-0.2px' }}>Team Voice</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            backgroundColor: '#071207', border: '1px solid #22C55E28',
            borderRadius: 20, padding: '4px 12px',
            fontSize: 11, fontWeight: 700, color: '#4ADE80',
          }}>
            <span>🔒</span> 100% Anonymous
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>

        {/* ── Hero ── */}
        <div style={{ padding: '40px 0 32px', textAlign: 'center' }}>
          <h1 style={{ color: C.text, fontSize: 30, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.6px', lineHeight: 1.2 }}>
            Your Voice Matters.
          </h1>
          <p style={{ color: '#888', fontSize: 14, margin: '0 auto 20px', lineHeight: 1.7, maxWidth: 480 }}>
            Share ideas, flag issues, request training, or say what's on your mind.
            Completely anonymous — no login, no tracking, no way to trace it back to you.
          </p>

          <div className="voice-trust-pills" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
            {[
              '✓ No account required',
              '✓ No IP address logged',
              '✓ Your name is never stored',
              '✓ Votes tracked by browser only',
            ].map(item => (
              <span key={item} style={{
                backgroundColor: '#071207', border: '1px solid #22C55E1A',
                borderRadius: 20, padding: '4px 12px',
                fontSize: 11, fontWeight: 600, color: '#4ADE80',
                whiteSpace: 'nowrap',
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── Success banner ── */}
        {submittedId && (
          <div style={{
            backgroundColor: '#071507', border: '1px solid #22C55E28',
            borderRadius: 12, padding: '14px 18px', marginBottom: 20,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <CheckCircle size={18} color="#22C55E" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#4ADE80', fontSize: 13, fontWeight: 800 }}>Submitted — completely anonymously.</div>
              <div style={{ color: '#555', fontSize: 11.5, marginTop: 3 }}>
                Your anonymous reference ID (yours to keep, means nothing to us):
                {' '}<span style={{ color: '#777', fontFamily: 'monospace', fontWeight: 700 }}>{submittedId}</span>
              </div>
            </div>
            <button onClick={() => setSubmittedId(null)}
              style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 2 }}>
              ×
            </button>
          </div>
        )}

        {/* ── Section tabs ── */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
          {([['board', '📋 Community Board'], ['submit', '+ Share Something']] as const).map(([s, label]) => (
            <button key={s} onClick={() => setSection(s)}
              style={{
                padding: '10px 18px',
                borderBottom: `2px solid ${section === s ? C.acc : 'transparent'}`,
                color: section === s ? C.acc : '#666',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: section === s ? 800 : 600,
                fontFamily: 'inherit', transition: 'color 0.15s',
              }}
            >{label}</button>
          ))}
        </div>

        {/* ── Submit form ── */}
        {section === 'submit' && (
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: '#666', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                What kind of submission is this?
              </p>
              <div className="voice-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '13px 14px',
                      backgroundColor: selectedCat === cat.id ? cat.color + '18' : C.surf2,
                      border: `1.5px solid ${selectedCat === cat.id ? cat.color + '77' : C.border2}`,
                      borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.15s', fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{cat.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: selectedCat === cat.id ? cat.color : '#CCCCCC', lineHeight: 1.3 }}>
                      {cat.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedCat && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeIn 0.15s ease' }}>
                <input
                  placeholder="Give it a short title (required)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
                  style={{
                    backgroundColor: C.surf2,
                    border: `1.5px solid ${catColor}44`,
                    borderRadius: 10, padding: '12px 14px',
                    color: C.text, fontSize: 14, outline: 'none',
                    fontFamily: 'inherit', width: '100%',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = catColor + 'AA')}
                  onBlur={e => (e.currentTarget.style.borderColor = catColor + '44')}
                />
                <textarea
                  placeholder={catPrompt}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  rows={4}
                  style={{
                    backgroundColor: C.surf2, border: `1.5px solid ${C.border2}`,
                    borderRadius: 10, padding: '12px 14px',
                    color: C.text, fontSize: 13, outline: 'none',
                    fontFamily: 'inherit', width: '100%', resize: 'vertical',
                    lineHeight: 1.6,
                  }}
                />
                {submitError && (
                  <div style={{
                    backgroundColor: '#1A0000', border: '1px solid #EF444455',
                    borderRadius: 10, padding: '10px 14px',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                  }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{submitError}</div>
                      <button
                        onClick={() => handleSubmit()}
                        style={{ background: 'none', border: 'none', color: '#EF8888', fontSize: 11, fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                      >
                        Try again →
                      </button>
                    </div>
                    <button onClick={() => setSubmitError(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: '0 2px' }}>×</button>
                  </div>
                )}
                <button
                  onClick={() => handleSubmit()}
                  disabled={!title.trim() || submitting}
                  style={{
                    backgroundColor: title.trim() ? catColor : C.surf3,
                    color: title.trim() ? '#000' : '#444',
                    fontWeight: 800, fontSize: 14,
                    padding: '13px', borderRadius: 10, border: 'none',
                    cursor: title.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit', transition: 'all 0.15s',
                    letterSpacing: '0.02em',
                  }}
                >
                  {submitting ? 'Submitting…' : '🔒 Submit Anonymously'}
                </button>
                <p style={{ color: C.muted2, fontSize: 11, textAlign: 'center', margin: 0, lineHeight: 1.8 }}>
                  We do not log your IP address, use cookies, or link this to your device.<br />
                  No name, no email, no account — leadership sees it as <em>anonymous</em>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Community board ── */}
        {section === 'board' && (
          <div>
            {/* Rate limit warning */}
            {rateLimited && (
              <div style={{
                backgroundColor: '#1A0D00', border: '1px solid #FB923C44',
                borderRadius: 10, padding: '10px 14px', marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 700, color: '#FB923C',
              }}>
                ⚡ You're voting a lot — take a breather for a minute, then continue.
              </div>
            )}

            {/* Board stats */}
            {!feedLoading && feedItems.length > 0 && (
              <div style={{ marginBottom: 14, color: '#444', fontSize: 12, fontWeight: 600 }}>
                {feedItems.length} submission{feedItems.length !== 1 ? 's' : ''} from the team
                {' · '}{feedItems.reduce((s, i) => s + i.vote_count, 0)} total votes
              </div>
            )}

            {/* Board controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {/* Sort */}
              <div style={{ display: 'flex', gap: 2, backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, padding: 3, flexShrink: 0 }}>
                {([['top', '🔥 Top'], ['new', '🕒 New']] as const).map(([s, label]) => (
                  <button key={s} onClick={() => setSort(s)}
                    style={{
                      padding: '5px 10px', borderRadius: 5,
                      backgroundColor: sort === s ? C.surf3 : 'transparent',
                      color: sort === s ? C.text : C.muted,
                      border: 'none', fontSize: 11, fontWeight: 700,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                ))}
              </div>

              {/* Category filter pills */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', flex: 1 }}>
                <button onClick={() => setFilterCat(null)}
                  style={{
                    padding: '4px 10px', borderRadius: 20,
                    backgroundColor: !filterCat ? C.acc + '18' : C.surf2,
                    border: `1px solid ${!filterCat ? C.acc + '55' : C.border2}`,
                    color: !filterCat ? C.acc : C.muted,
                    fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  }}>All</button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setFilterCat(filterCat === cat.id ? null : cat.id)}
                    style={{
                      padding: '4px 10px', borderRadius: 20,
                      backgroundColor: filterCat === cat.id ? cat.color + '18' : C.surf2,
                      border: `1px solid ${filterCat === cat.id ? cat.color + '55' : C.border2}`,
                      color: filterCat === cat.id ? cat.color : C.muted,
                      fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                    {cat.icon} {cat.id}
                  </button>
                ))}
              </div>

              {filterCat && (
                <span style={{ color: '#2A2A2A', fontSize: 11, flexShrink: 0 }}>
                  {displayed.length} result{displayed.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {feedLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div style={{ width: 28, height: 28, border: '3px solid #222', borderTopColor: C.acc, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              </div>
            ) : displayed.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: C.muted2 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
                <p style={{ fontSize: 14, margin: '0 0 6px', fontWeight: 700, color: '#555' }}>No submissions yet.</p>
                <p style={{ fontSize: 12, margin: '0 0 16px' }}>Be the first — it only takes 30 seconds.</p>
                <button onClick={() => setSection('submit')}
                  style={{
                    backgroundColor: C.acc, color: '#000', fontWeight: 800,
                    fontSize: 13, padding: '10px 20px', borderRadius: 10, border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>+ Share Something →</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {displayed.map(item => {
                  const cat = CATEGORIES.find(c => c.id === item.category);
                  const s = STATUS_LABELS[item.status] ?? STATUS_LABELS.open;
                  return (
                    <div key={item.id} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      backgroundColor: C.surf, border: `1px solid ${C.border}`,
                      borderRadius: 12, padding: '14px 16px',
                    }}>
                      {/* Vote button */}
                      <button
                        onClick={() => vote(item.id)}
                        disabled={votingId === item.id}
                        title={item.hasVoted ? 'Remove your vote' : 'Upvote this'}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          justifyContent: 'center', gap: 1,
                          width: 50, minHeight: 62, padding: '8px 4px', borderRadius: 10,
                          backgroundColor: item.hasVoted ? '#1A1400' : C.surf2,
                          border: `1.5px solid ${item.hasVoted ? C.acc + '88' : C.border2}`,
                          cursor: votingId === item.id ? 'wait' : 'pointer',
                          flexShrink: 0,
                          transition: 'all 0.15s',
                          transform: votingId === item.id ? 'scale(0.93)' : 'scale(1)',
                        }}
                      >
                        <ChevronUp size={16} color={item.hasVoted ? C.acc : '#555'} strokeWidth={item.hasVoted ? 2.5 : 2} />
                        <span style={{ color: item.hasVoted ? C.acc : '#CCCCCC', fontSize: 16, fontWeight: 900, lineHeight: 1, margin: '1px 0' }}>
                          {item.vote_count}
                        </span>
                        <span style={{
                          fontSize: 8, fontWeight: 800, textTransform: 'uppercase',
                          letterSpacing: '0.05em', lineHeight: 1,
                          color: item.hasVoted ? C.acc : '#444',
                        }}>
                          {item.hasVoted ? 'voted' : 'vote'}
                        </span>
                      </button>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ color: '#EBEBEB', fontSize: 14, fontWeight: 700, margin: '0 0 5px', lineHeight: 1.35 }}>
                          {item.title}
                        </h3>
                        {item.description && (
                          <p style={{ color: '#666', fontSize: 12, margin: '0 0 8px', lineHeight: 1.6 }}>{item.description}</p>
                        )}
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                          {cat && (
                            <span style={{
                              backgroundColor: cat.color + '18', border: `1px solid ${cat.color}33`,
                              borderRadius: 20, padding: '2px 8px',
                              fontSize: 10, fontWeight: 700, color: cat.color,
                            }}>
                              {cat.icon} {cat.id}
                            </span>
                          )}
                          <span style={{
                            backgroundColor: '#1C1C1C', border: `1px solid ${s.color}22`,
                            borderRadius: 10, padding: '2px 7px',
                            fontSize: 10, fontWeight: 700, color: s.color,
                          }}>{s.label}</span>
                          <span style={{ color: '#2A2A2A', fontSize: 11, marginLeft: 'auto' }}>{timeAgo(item.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Roadmap ── */}
        <div style={{ marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 3, height: 18, backgroundColor: C.acc, borderRadius: 2 }} />
            <h2 style={{ color: C.text, fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: '-0.4px' }}>
              What We're Building
            </h2>
            <span style={{
              backgroundColor: C.acc + '18', border: `1px solid ${C.acc}33`,
              borderRadius: 20, padding: '3px 9px',
              fontSize: 10, fontWeight: 800, color: C.acc, letterSpacing: '0.04em',
            }}>FROM YOUR FEEDBACK</span>
          </div>
          <p style={{ color: '#555', fontSize: 13, margin: '0 0 22px', lineHeight: 1.65, paddingLeft: 13 }}>
            These are real items in our project tracker — directly driven by your submissions. Updated by leadership as work progresses.
          </p>

          {roadmapLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <div style={{ width: 28, height: 28, border: '3px solid #222', borderTopColor: '#A78BFA', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : roadmapItems.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '36px 20px',
              backgroundColor: C.surf, border: `1px solid ${C.border}`,
              borderRadius: 14, color: C.muted2,
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
              <p style={{ fontSize: 13, margin: 0, fontWeight: 600, color: '#444' }}>Roadmap is being set up — check back soon.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <div className="voice-roadmap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, minWidth: 480 }}>
                {ROADMAP_COLS.map(col => {
                  const items = roadmapItems.filter(i => i.status === col.key);
                  return (
                    <div key={col.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: col.dot }} />
                        <span style={{ color: '#CCCCCC', fontSize: 13, fontWeight: 700 }}>{col.label}</span>
                        <span style={{ color: '#333', fontSize: 11, marginLeft: 'auto' }}>({items.length})</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {items.length === 0 ? (
                          <div style={{
                            padding: '20px 14px', textAlign: 'center',
                            border: '1px dashed #1E1E1E', borderRadius: 10,
                            color: '#2A2A2A', fontSize: 12,
                          }}>
                            Nothing here yet
                          </div>
                        ) : items.map(item => (
                          <div key={item.id} style={{
                            backgroundColor: C.surf,
                            border: `1px solid ${C.border}`,
                            borderLeft: `3px solid ${col.dot}`,
                            borderRadius: 10, padding: '12px 14px',
                          }}>
                            <h4 style={{ color: '#E0E0E0', fontSize: 13, fontWeight: 700, margin: '0 0 5px', lineHeight: 1.35 }}>
                              {item.title}
                            </h4>
                            {item.description && (
                              <p style={{ color: '#555', fontSize: 11, margin: '0 0 6px', lineHeight: 1.6 }}>{item.description}</p>
                            )}
                            {item.category && (
                              <span style={{ color: '#3A3A3A', fontSize: 10, fontWeight: 600 }}>#{item.category}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 60, paddingTop: 20, borderTop: `1px solid ${C.border}`, textAlign: 'center' }}>
          <p style={{ color: '#222', fontSize: 11, margin: 0 }}>
            roofignite.com · team voice · all submissions are anonymous · no login required
          </p>
        </div>
      </main>
    </div>
  );
}
