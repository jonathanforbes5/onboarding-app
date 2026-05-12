'use client';
import React, { useEffect, useState } from 'react';
import { Megaphone, ExternalLink, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { type Announcement, STATIC_ANNOUNCEMENTS, mergeAnnouncements } from '@/data/staticAnnouncements';

function LoomEmbed({ url }: { url: string }) {
  const id = url.match(/(?:loom\.com\/(?:share|embed)\/)([a-f0-9]+)/i)?.[1];
  if (!id) return null;
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 10, marginTop: 12 }}>
      <iframe src={`https://www.loom.com/embed/${id}`} allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} />
    </div>
  );
}

export function AnnouncementModal() {
  const { currentUser } = useApp();
  const userKey = currentUser?.userKey;
  const [queue, setQueue] = useState<Announcement[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!userKey) return;
    fetch('/api/announcements')
      .then(r => r.json())
      .then((d) => {
        const all = mergeAnnouncements(d.announcements ?? []);
        try {
          const seen: string[] = JSON.parse(localStorage.getItem(`ri_${userKey}_seen_announcements`) ?? '[]');
          const unseen = all.filter(a => !seen.includes(a.id));
          if (unseen.length > 0) {
            setQueue(unseen);
            setVisible(true);
          }
        } catch {}
      })
      .catch(() => {
        // API failed entirely — still show static announcements
        try {
          const seen: string[] = JSON.parse(localStorage.getItem(`ri_${userKey}_seen_announcements`) ?? '[]');
          const unseen = STATIC_ANNOUNCEMENTS.filter(a => !seen.includes(a.id));
          if (unseen.length > 0) {
            setQueue(unseen);
            setVisible(true);
          }
        } catch {}
      });
  }, [userKey]);

  const dismiss = () => {
    if (!userKey || queue.length === 0) return;
    const current = queue[0];

    // Mark as seen
    try {
      const seen: string[] = JSON.parse(localStorage.getItem(`ri_${userKey}_seen_announcements`) ?? '[]');
      if (!seen.includes(current.id)) {
        seen.push(current.id);
        localStorage.setItem(`ri_${userKey}_seen_announcements`, JSON.stringify(seen));
      }
    } catch {}

    const remaining = queue.slice(1);
    if (remaining.length > 0) {
      setQueue(remaining);
    } else {
      setVisible(false);
    }
  };

  if (!visible || queue.length === 0) return null;

  const a = queue[0];
  const hasMore = queue.length > 1;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 80,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#111',
          border: '1px solid #F5C80033',
          borderRadius: 20,
          width: '100%',
          maxWidth: 500,
          maxHeight: '90vh',
          overflowY: 'auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          animation: 'am-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Yellow accent bar */}
        <div style={{ height: 3, backgroundColor: '#F5C800', flexShrink: 0 }} />

        <div style={{ padding: '24px 24px 20px', overflowY: 'auto', flex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11, backgroundColor: '#1A0E00',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Megaphone size={18} color="#F5C800" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#F5C800', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                {hasMore ? `New announcement (${queue.length} unread)` : 'New announcement'}
              </div>
              <h2 style={{ color: '#F5F5F5', fontSize: 19, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>
                {a.title}
              </h2>
            </div>
          </div>

          {/* Body */}
          <p style={{ color: '#999', fontSize: 13, lineHeight: 1.75, margin: '0 0 14px', whiteSpace: 'pre-wrap' }}>
            {a.body}
          </p>

          {/* Image */}
          {a.image_url && (
            <img src={a.image_url} alt="" style={{ width: '100%', borderRadius: 10, marginBottom: 14, display: 'block' }} />
          )}

          {/* Loom */}
          {a.loom_url && <LoomEmbed url={a.loom_url} />}

          {/* External link */}
          {a.link_url && (
            <a href={a.link_url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 14, color: '#F5C800', fontSize: 12, fontWeight: 700,
                textDecoration: 'none',
              }}>
              <ExternalLink size={12} /> View more
            </a>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px 20px',
          borderTop: '1px solid #1E1E1E',
          display: 'flex', gap: 10, justifyContent: 'flex-end', flexShrink: 0,
        }}>
          <button
            onClick={dismiss}
            style={{
              backgroundColor: '#F5C800', color: '#000', fontWeight: 800, fontSize: 13,
              padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
            }}
          >
            {hasMore ? `Got it — next (${queue.length - 1} more)` : 'Got it ✓'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes am-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
