'use client';
import React, { useState } from 'react';
import { X, Bug } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function BugReportModal({ onClose }: { onClose: () => void }) {
  const { currentUser, activeTab } = useApp();
  const [title, setTitle]       = useState('');
  const [steps, setSteps]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]         = useState(false);

  async function submit() {
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: steps.trim() || undefined,
          category: 'Bug Report',
          created_by: currentUser?.userKey ?? 'anonymous',
          // tag current tab for context
          ...(activeTab ? { description: `${steps.trim() ? steps.trim() + '\n\n' : ''}Tab: ${activeTab}` } : {}),
        }),
      });
      setDone(true);
    } catch {}
    setSubmitting(false);
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#1A1A1A',
    border: '1px solid #333',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#F5F5F5',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#111',
          border: '1px solid #2A2A2A',
          borderRadius: 18,
          padding: '24px',
          maxWidth: 440,
          width: '100%',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              backgroundColor: '#1A0D0D',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bug size={15} color="#EF4444" />
            </div>
            <div>
              <div style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 800 }}>Report a Bug</div>
              <div style={{ color: '#555', fontSize: 11 }}>We'll look into it ASAP</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 4 }}
          >
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <div style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Bug reported — thanks!</div>
            <div style={{ color: '#666', fontSize: 12, marginBottom: 20 }}>It'll show up in the Feedback board under "Bug Report".</div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#F5C800', color: '#000', fontWeight: 800, fontSize: 13,
                padding: '9px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                What went wrong? *
              </label>
              <input
                autoFocus
                placeholder="e.g. Section links not working on mobile"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && title.trim()) submit(); }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>
                Steps to reproduce (optional)
              </label>
              <textarea
                placeholder="1. Open the chat&#10;2. Click a section link&#10;3. Nothing happens"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <button
              onClick={submit}
              disabled={!title.trim() || submitting}
              style={{
                backgroundColor: title.trim() ? '#EF4444' : '#2A2A2A',
                color: title.trim() ? '#fff' : '#555',
                fontWeight: 800, fontSize: 13,
                padding: '10px 20px', borderRadius: 10, border: 'none',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.15s',
              }}
            >
              {submitting ? 'Submitting…' : 'Submit bug report'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
