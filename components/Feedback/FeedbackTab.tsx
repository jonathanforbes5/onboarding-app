'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Lightbulb, ChevronUp, Plus, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface FeedbackItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  vote_count: number;
  created_by: string;
  status: string;
  created_at: string;
  hasVoted: boolean;
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  open:         { label: 'Open',         color: '#60A5FA', bg: '#0D1220' },
  under_review: { label: 'Under Review', color: '#FBBF24', bg: '#1A1200' },
  planned:      { label: 'Planned',      color: '#A78BFA', bg: '#120D1A' },
  done:         { label: 'Done',         color: '#22C55E', bg: '#0D1A0D' },
  closed:       { label: 'Closed',       color: '#555',    bg: '#1A1A1A' },
};

export function FeedbackTab() {
  const { currentUser } = useApp();
  const userKey = currentUser?.userKey ?? 'anonymous';

  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [votingId, setVotingId] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch(`/api/feedback?user_key=${encodeURIComponent(userKey)}`)
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userKey]);

  useEffect(() => { load(); }, [load]);

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
      setItems((prev) => prev.map((item) =>
        item.id === id
          ? { ...item, hasVoted: data.voted, vote_count: item.vote_count + (data.voted ? 1 : -1) }
          : item
      ).sort((a, b) => b.vote_count - a.vote_count));
    } catch {}
    setVotingId(null);
  };

  const submit = async () => {
    if (!form.title.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || undefined,
          category: form.category.trim() || undefined,
          created_by: 'anonymous',
        }),
      });
      if (res.ok) {
        setForm({ title: '', description: '', category: '' });
        setShowForm(false);
        load();
      }
    } catch {}
    setSubmitting(false);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: '#0A0A0A',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: 80,
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: '#120D1A', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lightbulb size={18} color="#A78BFA" />
            </div>
            <div>
              <h1 style={{ color: '#F5F5F5', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
                Feedback Board
              </h1>
              <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Vote on ideas and suggest improvements — all submissions are anonymous</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              backgroundColor: showForm ? '#1A1A1A' : '#F5C800',
              color: showForm ? '#888' : '#000',
              fontWeight: 800, fontSize: 12,
              padding: '8px 14px', borderRadius: 10, border: showForm ? '1px solid #333' : 'none', cursor: 'pointer',
            }}
          >
            {showForm ? <X size={13} /> : <Plus size={13} />}
            {showForm ? 'Cancel' : 'Submit idea'}
          </button>
        </div>

        {/* Submit form */}
        {showForm && (
          <div style={{
            backgroundColor: '#111', border: '1px solid #F5C80033',
            borderRadius: 16, padding: '20px 22px', marginBottom: 24,
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#F5C800', marginBottom: 14 }}>New idea</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                placeholder="What's your idea or suggestion?"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                style={{
                  backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: 10,
                  padding: '10px 14px', color: '#F5F5F5', fontSize: 13, outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <textarea
                placeholder="More details (optional)"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                style={{
                  backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: 10,
                  padding: '10px 14px', color: '#F5F5F5', fontSize: 13, outline: 'none',
                  fontFamily: 'inherit', resize: 'vertical',
                }}
              />
              <input
                placeholder="Category (optional — e.g. Portal, Training, Tools)"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                style={{
                  backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: 10,
                  padding: '10px 14px', color: '#F5F5F5', fontSize: 13, outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                onClick={submit}
                disabled={!form.title.trim() || submitting}
                style={{
                  alignSelf: 'flex-end',
                  backgroundColor: form.title.trim() ? '#F5C800' : '#2A2A2A',
                  color: form.title.trim() ? '#000' : '#555',
                  fontWeight: 800, fontSize: 13,
                  padding: '10px 20px', borderRadius: 10, border: 'none',
                  cursor: form.title.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                {submitting ? 'Submitting…' : 'Submit anonymously'}
              </button>
            </div>
          </div>
        )}

        {/* Items */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
            <div style={{
              width: 32, height: 32, border: '3px solid #2A2A2A',
              borderTopColor: '#A78BFA', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#444', fontSize: 14 }}>
            <Lightbulb size={40} color="#333" style={{ margin: '0 auto 12px', display: 'block' }} />
            <p style={{ margin: 0 }}>No ideas yet — be the first to submit one!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item) => {
              const statusCfg = STATUS_LABELS[item.status] ?? STATUS_LABELS.open;
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    backgroundColor: '#111', border: '1px solid #222',
                    borderRadius: 14, padding: '16px 18px',
                    transition: 'border-color 0.15s',
                  }}
                >
                  {/* Vote button */}
                  <button
                    onClick={() => vote(item.id)}
                    disabled={votingId === item.id}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                      minWidth: 40, padding: '6px 8px', borderRadius: 10,
                      backgroundColor: item.hasVoted ? '#F5C80022' : '#1A1A1A',
                      border: item.hasVoted ? '1px solid #F5C80066' : '1px solid #333',
                      cursor: votingId === item.id ? 'wait' : 'pointer',
                      transition: 'all 0.15s',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronUp size={16} color={item.hasVoted ? '#F5C800' : '#555'} />
                    <span style={{ color: item.hasVoted ? '#F5C800' : '#555', fontSize: 12, fontWeight: 800 }}>
                      {item.vote_count}
                    </span>
                  </button>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <h3 style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 800, margin: 0, lineHeight: 1.35 }}>
                        {item.title}
                      </h3>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
                        {item.category && (
                          <span style={{
                            backgroundColor: '#1A1A1A', color: '#666', fontSize: 10, fontWeight: 700,
                            padding: '2px 8px', borderRadius: 20, border: '1px solid #2A2A2A',
                          }}>
                            {item.category}
                          </span>
                        )}
                        <span style={{
                          backgroundColor: statusCfg.bg, color: statusCfg.color, fontSize: 10, fontWeight: 700,
                          padding: '2px 8px', borderRadius: 20, border: `1px solid ${statusCfg.color}33`,
                        }}>
                          {statusCfg.label}
                        </span>
                      </div>
                    </div>
                    {item.description && (
                      <p style={{ color: '#666', fontSize: 12, margin: '0 0 4px', lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    )}
                    <span style={{ color: '#3A3A3A', fontSize: 11 }}>
                      {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
