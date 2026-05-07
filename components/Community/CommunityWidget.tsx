'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronUp, Plus, Map, Megaphone, Bug, ExternalLink, Calendar, Lightbulb, MessageSquarePlus } from 'lucide-react';
import { useApp } from '@/context/AppContext';

type WidgetTab = 'whatsnew' | 'ideas' | 'roadmap';

interface Announcement {
  id: string; title: string; body: string;
  link_url: string | null; loom_url: string | null; image_url: string | null;
  created_by: string; created_at: string; published: boolean;
}
interface FeedbackItem {
  id: string; title: string; description: string | null; category: string | null;
  vote_count: number; created_by: string; status: string; created_at: string; hasVoted: boolean;
}
interface RoadmapItem {
  id: string; title: string; description: string | null;
  status: 'planned' | 'in_progress' | 'done'; category: string | null; updated_at: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function LoomEmbed({ url }: { url: string }) {
  const id = url.match(/(?:loom\.com\/(?:share|embed)\/)([a-f0-9]+)/i)?.[1];
  if (!id) return null;
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8, marginTop: 10 }}>
      <iframe src={`https://www.loom.com/embed/${id}`} allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} />
    </div>
  );
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  open:         { label: 'Open',         color: '#60A5FA', bg: '#0D1220' },
  under_review: { label: 'Under Review', color: '#FBBF24', bg: '#1A1200' },
  planned:      { label: 'Planned',      color: '#A78BFA', bg: '#120D1A' },
  done:         { label: 'Done',         color: '#22C55E', bg: '#0D1A0D' },
  closed:       { label: 'Closed',       color: '#555',    bg: '#1A1A1A' },
};

const ROADMAP_COLS: { key: RoadmapItem['status']; label: string; color: string }[] = [
  { key: 'planned',     label: 'Planned',     color: '#A78BFA' },
  { key: 'in_progress', label: 'In Progress', color: '#FBBF24' },
  { key: 'done',        label: 'Done',        color: '#22C55E' },
];

const WIDGET_TABS: { id: WidgetTab; label: string; icon: React.ReactNode }[] = [
  { id: 'whatsnew', label: "What's New", icon: <Megaphone size={13} /> },
  { id: 'ideas',    label: 'Ideas',      icon: <Lightbulb size={13} /> },
  { id: 'roadmap',  label: 'Roadmap',    icon: <Map size={13} /> },
];

export function CommunityWidget() {
  const { currentUser } = useApp();
  const userKey = currentUser?.userKey ?? 'anonymous';
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<WidgetTab>('whatsnew');

  // Announcements
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);

  // Feedback / Ideas
  const [feedItems, setFeedItems] = useState<FeedbackItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [showBugForm, setShowBugForm] = useState(false);
  const [ideaForm, setIdeaForm] = useState({ title: '', description: '', category: '' });
  const [bugForm, setBugForm] = useState({ title: '', steps: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitDone, setSubmitDone] = useState<'idea' | 'bug' | null>(null);
  const [votingId, setVotingId] = useState<string | null>(null);

  // Roadmap
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  // Unread badge
  const [unreadCount, setUnreadCount] = useState(0);

  const loadAnnouncements = useCallback(() => {
    setAnnouncementsLoading(true);
    fetch('/api/announcements')
      .then(r => r.json())
      .then(d => {
        const list: Announcement[] = d.announcements ?? [];
        setAnnouncements(list);
        // compute unread
        try {
          const seen: string[] = JSON.parse(localStorage.getItem(`ri_${userKey}_seen_announcements`) ?? '[]');
          setUnreadCount(list.filter(a => !seen.includes(a.id)).length);
        } catch {}
      })
      .catch(() => {})
      .finally(() => setAnnouncementsLoading(false));
  }, [userKey]);

  const loadFeedback = useCallback(() => {
    setFeedLoading(true);
    fetch(`/api/feedback?user_key=${encodeURIComponent(userKey)}`)
      .then(r => r.json())
      .then(d => setFeedItems(d.items ?? []))
      .catch(() => {})
      .finally(() => setFeedLoading(false));
  }, [userKey]);

  const loadRoadmap = useCallback(() => {
    setRoadmapLoading(true);
    fetch('/api/roadmap')
      .then(r => r.json())
      .then(d => setRoadmapItems(d.items ?? []))
      .catch(() => {})
      .finally(() => setRoadmapLoading(false));
  }, []);

  // Load on tab change when panel is open
  useEffect(() => {
    if (!open) return;
    if (activeTab === 'whatsnew') loadAnnouncements();
    if (activeTab === 'ideas') loadFeedback();
    if (activeTab === 'roadmap') loadRoadmap();
  }, [open, activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initial unread count on mount
  useEffect(() => { loadAnnouncements(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mark all visible announcements as seen when What's New tab is viewed
  useEffect(() => {
    if (open && activeTab === 'whatsnew' && announcements.length > 0) {
      try {
        const ids = announcements.map(a => a.id);
        localStorage.setItem(`ri_${userKey}_seen_announcements`, JSON.stringify(ids));
        setUnreadCount(0);
      } catch {}
    }
  }, [open, activeTab, announcements, userKey]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const vote = async (id: string) => {
    if (votingId) return;
    setVotingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_key: userKey }),
      });
      const data = await res.json() as { voted: boolean };
      setFeedItems(prev => prev.map(item =>
        item.id === id
          ? { ...item, hasVoted: data.voted, vote_count: item.vote_count + (data.voted ? 1 : -1) }
          : item
      ).sort((a, b) => b.vote_count - a.vote_count));
    } catch {}
    setVotingId(null);
  };

  const submitIdea = async () => {
    if (!ideaForm.title.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: ideaForm.title.trim(),
          description: ideaForm.description.trim() || undefined,
          category: ideaForm.category.trim() || undefined,
          created_by: 'anonymous',
        }),
      });
      if (res.ok) {
        setIdeaForm({ title: '', description: '', category: '' });
        setShowIdeaForm(false);
        setSubmitDone('idea');
        setTimeout(() => setSubmitDone(null), 3000);
        loadFeedback();
      }
    } catch {}
    setSubmitting(false);
  };

  const submitBug = async () => {
    if (!bugForm.title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bugForm.title.trim(),
          description: bugForm.steps.trim()
            ? `${bugForm.steps.trim()}\n\nReported from: ${activeTab}`
            : `Reported from: ${activeTab}`,
          category: 'Bug Report',
          created_by: userKey,
        }),
      });
      setBugForm({ title: '', steps: '' });
      setShowBugForm(false);
      setSubmitDone('bug');
      setTimeout(() => setSubmitDone(null), 3000);
    } catch {}
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#1C1C1C', border: '1px solid #333', borderRadius: 8,
    padding: '9px 12px', color: '#F5F5F5', fontSize: 13, outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
  };

  return (
    <>
      <style>{`
        .cw-trigger {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 44;
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          border-right: none;
          border-radius: 10px 0 0 10px;
          padding: 14px 6px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          box-shadow: -2px 0 12px rgba(0,0,0,0.4);
          transition: background 0.15s, padding 0.15s;
        }
        .cw-trigger:hover { background: #222; padding-right: 10px; }
        .cw-trigger-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 10px;
          font-weight: 800;
          color: #888;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: Inter, system-ui, sans-serif;
          user-select: none;
        }
        .cw-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 380px;
          max-width: 100vw;
          z-index: 46;
          background: #111;
          border-left: 1px solid #222;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -8px 0 32px rgba(0,0,0,0.5);
          font-family: Inter, system-ui, sans-serif;
        }
        .cw-panel.open { transform: translateX(0); }
        .cw-backdrop {
          position: fixed; inset: 0; z-index: 45;
          background: rgba(0,0,0,0.5);
          opacity: 0; pointer-events: none;
          transition: opacity 0.28s;
        }
        .cw-backdrop.open { opacity: 1; pointer-events: auto; }
        @media (max-width: 640px) {
          .cw-trigger {
            top: auto;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 100px);
            transform: none;
            border-radius: 50%;
            border-right: 1px solid #2A2A2A;
            padding: 12px;
            right: 14px;
          }
          .cw-trigger:hover { padding: 12px; }
          .cw-trigger-label { display: none; }
          .cw-panel {
            top: auto;
            height: 85vh;
            width: 100%;
            max-width: 100%;
            border-left: none;
            border-top: 1px solid #222;
            border-radius: 20px 20px 0 0;
            transform: translateY(100%);
          }
          .cw-panel.open { transform: translateY(0); }
        }
        @keyframes cw-spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Trigger */}
      <button
        className="cw-trigger"
        onClick={() => setOpen(true)}
        title="Community — ideas, roadmap & updates"
        aria-label="Open community panel"
      >
        <MessageSquarePlus size={15} color="#888" />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#F5C800',
            border: '1.5px solid #111',
          }} />
        )}
        <span className="cw-trigger-label">Community</span>
      </button>

      {/* Backdrop */}
      <div className={`cw-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      {/* Panel */}
      <div className={`cw-panel${open ? ' open' : ''}`} role="dialog" aria-label="Community panel">
        {/* Panel header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px 0',
          borderBottom: '1px solid #1C1C1C',
          paddingBottom: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageSquarePlus size={16} color="#F5C800" />
            <span style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 800 }}>Community</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 4 }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab bar */}
        <div style={{
          display: 'flex', gap: 0,
          padding: '10px 14px 0',
          borderBottom: '1px solid #1C1C1C',
        }}>
          {WIDGET_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 12px',
                borderBottom: `2px solid ${activeTab === tab.id ? '#F5C800' : 'transparent'}`,
                color: activeTab === tab.id ? '#F5C800' : '#666',
                background: 'none', border: 'none',
                borderTopLeftRadius: 6, borderTopRightRadius: 6,
                fontSize: 12, fontWeight: 700,
                cursor: 'pointer',
                transition: 'color 0.15s',
                position: 'relative',
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'whatsnew' && unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: '#F5C800',
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

          {/* ── What's New ───────────────────────────────── */}
          {activeTab === 'whatsnew' && (
            announcementsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
                <div style={{ width: 28, height: 28, border: '3px solid #222', borderTopColor: '#F5C800', borderRadius: '50%', animation: 'cw-spin 0.8s linear infinite' }} />
              </div>
            ) : announcements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#444' }}>
                <Megaphone size={36} color="#2A2A2A" style={{ display: 'block', margin: '0 auto 10px' }} />
                <p style={{ fontSize: 13, margin: 0 }}>No announcements yet — check back soon.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {announcements.map((a, idx) => (
                  <div key={a.id} style={{
                    backgroundColor: '#161616',
                    border: idx === 0 ? '1px solid #F5C80033' : '1px solid #1E1E1E',
                    borderRadius: 12, overflow: 'hidden',
                  }}>
                    {idx === 0 && <div style={{ height: 2, backgroundColor: '#F5C800' }} />}
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          {idx === 0 && (
                            <span style={{ backgroundColor: '#F5C800', color: '#000', fontSize: 8, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 6px', borderRadius: 20 }}>
                              New
                            </span>
                          )}
                          <span style={{ color: '#555', fontSize: 11 }}>by {a.created_by}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#3A3A3A', fontSize: 11 }}>
                          <Calendar size={10} />
                          <span>{timeAgo(a.created_at)}</span>
                        </div>
                      </div>
                      <h3 style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.35 }}>
                        {a.title}
                      </h3>
                      <p style={{ color: '#777', fontSize: 12, lineHeight: 1.7, margin: '0 0 8px', whiteSpace: 'pre-wrap' }}>
                        {a.body}
                      </p>
                      {a.image_url && (
                        <img src={a.image_url} alt="" style={{ width: '100%', borderRadius: 8, marginBottom: 8, display: 'block' }} />
                      )}
                      {a.loom_url && <LoomEmbed url={a.loom_url} />}
                      {a.link_url && (
                        <a href={a.link_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, color: '#F5C800', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                          <ExternalLink size={12} /> View more
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* ── Ideas ───────────────────────────────── */}
          {activeTab === 'ideas' && (
            <div>
              {/* Success banner */}
              {submitDone && (
                <div style={{
                  backgroundColor: '#0D1A0D', border: '1px solid #22C55E33', borderRadius: 10,
                  padding: '10px 14px', marginBottom: 12, fontSize: 12, fontWeight: 700, color: '#22C55E',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  ✓ {submitDone === 'idea' ? 'Idea submitted anonymously!' : 'Bug reported — thanks!'}
                </div>
              )}

              {/* Action buttons */}
              {!showIdeaForm && !showBugForm && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <button
                    onClick={() => setShowIdeaForm(true)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      backgroundColor: '#F5C800', color: '#000', fontWeight: 800, fontSize: 12,
                      padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    }}
                  >
                    <Plus size={13} /> Share idea
                  </button>
                  <button
                    onClick={() => setShowBugForm(true)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      backgroundColor: '#1A0D0D', color: '#EF4444', fontWeight: 700, fontSize: 12,
                      padding: '9px 14px', borderRadius: 9, border: '1px solid #EF444433', cursor: 'pointer',
                    }}
                  >
                    <Bug size={13} /> Bug
                  </button>
                </div>
              )}

              {/* Idea form */}
              {showIdeaForm && (
                <div style={{
                  backgroundColor: '#161616', border: '1px solid #F5C80033',
                  borderRadius: 12, padding: '14px', marginBottom: 14,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#F5C800', marginBottom: 10 }}>New idea</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input placeholder="What's your idea?" value={ideaForm.title}
                      onChange={e => setIdeaForm(f => ({ ...f, title: e.target.value }))}
                      style={inputStyle} autoFocus />
                    <textarea placeholder="More details (optional)" value={ideaForm.description}
                      onChange={e => setIdeaForm(f => ({ ...f, description: e.target.value }))}
                      rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                    <input placeholder="Category (optional)" value={ideaForm.category}
                      onChange={e => setIdeaForm(f => ({ ...f, category: e.target.value }))}
                      style={inputStyle} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={submitIdea} disabled={!ideaForm.title.trim() || submitting}
                        style={{
                          flex: 1, backgroundColor: ideaForm.title.trim() ? '#F5C800' : '#2A2A2A',
                          color: ideaForm.title.trim() ? '#000' : '#555', fontWeight: 800, fontSize: 12,
                          padding: '9px', borderRadius: 8, border: 'none',
                          cursor: ideaForm.title.trim() ? 'pointer' : 'not-allowed',
                        }}>
                        {submitting ? 'Submitting…' : 'Submit anonymously'}
                      </button>
                      <button onClick={() => { setShowIdeaForm(false); setIdeaForm({ title: '', description: '', category: '' }); }}
                        style={{ backgroundColor: '#1A1A1A', color: '#666', fontWeight: 700, fontSize: 12, padding: '9px 14px', borderRadius: 8, border: '1px solid #333', cursor: 'pointer' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bug report form */}
              {showBugForm && (
                <div style={{
                  backgroundColor: '#161616', border: '1px solid #EF444433',
                  borderRadius: 12, padding: '14px', marginBottom: 14,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#EF4444', marginBottom: 10 }}>
                    <Bug size={13} /> Report a Bug
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input placeholder="What went wrong?" value={bugForm.title}
                      onChange={e => setBugForm(f => ({ ...f, title: e.target.value }))}
                      style={inputStyle} autoFocus />
                    <textarea placeholder="Steps to reproduce (optional)" value={bugForm.steps}
                      onChange={e => setBugForm(f => ({ ...f, steps: e.target.value }))}
                      rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={submitBug} disabled={!bugForm.title.trim() || submitting}
                        style={{
                          flex: 1, backgroundColor: bugForm.title.trim() ? '#EF4444' : '#2A2A2A',
                          color: bugForm.title.trim() ? '#fff' : '#555', fontWeight: 800, fontSize: 12,
                          padding: '9px', borderRadius: 8, border: 'none',
                          cursor: bugForm.title.trim() ? 'pointer' : 'not-allowed',
                        }}>
                        {submitting ? 'Submitting…' : 'Report bug'}
                      </button>
                      <button onClick={() => { setShowBugForm(false); setBugForm({ title: '', steps: '' }); }}
                        style={{ backgroundColor: '#1A1A1A', color: '#666', fontWeight: 700, fontSize: 12, padding: '9px 14px', borderRadius: 8, border: '1px solid #333', cursor: 'pointer' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Feed list */}
              {feedLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}>
                  <div style={{ width: 26, height: 26, border: '3px solid #222', borderTopColor: '#A78BFA', borderRadius: '50%', animation: 'cw-spin 0.8s linear infinite' }} />
                </div>
              ) : feedItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 20px', color: '#3A3A3A' }}>
                  <Lightbulb size={32} color="#2A2A2A" style={{ display: 'block', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 12, margin: 0 }}>No ideas yet — be the first!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {feedItems.map(item => {
                    const s = STATUS_LABELS[item.status] ?? STATUS_LABELS.open;
                    return (
                      <div key={item.id} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                        backgroundColor: '#161616', border: '1px solid #1E1E1E',
                        borderRadius: 10, padding: '12px 14px',
                      }}>
                        <button onClick={() => vote(item.id)} disabled={votingId === item.id}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                            minWidth: 36, padding: '5px 6px', borderRadius: 8,
                            backgroundColor: item.hasVoted ? '#F5C80022' : '#1A1A1A',
                            border: item.hasVoted ? '1px solid #F5C80066' : '1px solid #2A2A2A',
                            cursor: votingId === item.id ? 'wait' : 'pointer',
                            flexShrink: 0,
                          }}>
                          <ChevronUp size={14} color={item.hasVoted ? '#F5C800' : '#444'} />
                          <span style={{ color: item.hasVoted ? '#F5C800' : '#444', fontSize: 11, fontWeight: 800 }}>
                            {item.vote_count}
                          </span>
                        </button>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                            <h4 style={{ color: '#F0F0F0', fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3, flex: 1 }}>
                              {item.title}
                            </h4>
                            <span style={{ backgroundColor: s.bg, color: s.color, fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 20, border: `1px solid ${s.color}33`, whiteSpace: 'nowrap' }}>
                              {s.label}
                            </span>
                          </div>
                          {item.description && (
                            <p style={{ color: '#555', fontSize: 11, margin: '0 0 3px', lineHeight: 1.5 }}>{item.description}</p>
                          )}
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                            {item.category && (
                              <span style={{ backgroundColor: '#1A1A1A', color: '#555', fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 20, border: '1px solid #2A2A2A' }}>
                                {item.category}
                              </span>
                            )}
                            <span style={{ color: '#333', fontSize: 10 }}>{timeAgo(item.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Roadmap ───────────────────────────────── */}
          {activeTab === 'roadmap' && (
            roadmapLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
                <div style={{ width: 28, height: 28, border: '3px solid #222', borderTopColor: '#06B6D4', borderRadius: '50%', animation: 'cw-spin 0.8s linear infinite' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {ROADMAP_COLS.map(col => {
                  const colItems = roadmapItems.filter(i => i.status === col.key);
                  return (
                    <div key={col.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${col.color}22` }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: col.color, flexShrink: 0 }} />
                        <span style={{ color: col.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col.label}</span>
                        <span style={{ marginLeft: 'auto', backgroundColor: `${col.color}18`, color: col.color, fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 20 }}>
                          {colItems.length}
                        </span>
                      </div>
                      {colItems.length === 0 ? (
                        <div style={{ padding: '14px 12px', textAlign: 'center', border: '1px dashed #1E1E1E', borderRadius: 8, color: '#2A2A2A', fontSize: 11 }}>
                          Nothing here yet
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {colItems.map(item => (
                            <div key={item.id} style={{
                              backgroundColor: '#161616', border: '1px solid #1E1E1E',
                              borderRadius: 10, padding: '12px 14px',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: item.description ? 6 : 0 }}>
                                <h4 style={{ color: '#F0F0F0', fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{item.title}</h4>
                                {item.category && (
                                  <span style={{ backgroundColor: '#1A1A1A', color: '#444', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 20, border: '1px solid #222', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                    {item.category}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p style={{ color: '#555', fontSize: 11, margin: '0 0 4px', lineHeight: 1.5 }}>{item.description}</p>
                              )}
                              <span style={{ color: '#2A2A2A', fontSize: 10 }}>{timeAgo(item.updated_at)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {roadmapItems.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#3A3A3A' }}>
                    <Map size={32} color="#2A2A2A" style={{ display: 'block', margin: '0 auto 8px' }} />
                    <p style={{ fontSize: 12, margin: 0 }}>No roadmap items yet.</p>
                  </div>
                )}
              </div>
            )
          )}

        </div>
      </div>
    </>
  );
}
