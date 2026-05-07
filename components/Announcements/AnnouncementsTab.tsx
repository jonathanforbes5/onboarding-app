'use client';
import React, { useEffect, useState } from 'react';
import { Megaphone, ExternalLink, Play, Calendar } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  body: string;
  link_url: string | null;
  loom_url: string | null;
  image_url: string | null;
  created_by: string;
  created_at: string;
  published: boolean;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function LoomEmbed({ url }: { url: string }) {
  const id = url.match(/(?:loom\.com\/(?:share|embed)\/)([a-f0-9]+)/i)?.[1];
  if (!id) return null;
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 10, marginTop: 12 }}>
      <iframe
        src={`https://www.loom.com/embed/${id}`}
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
}

export function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((d) => setAnnouncements(d.announcements ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: '#0A0A0A',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: 80,
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 16px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: '#1A0E00', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Megaphone size={18} color="#F5C800" />
            </div>
            <div>
              <h1 style={{ color: '#F5F5F5', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
                What&apos;s New
              </h1>
              <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Updates, announcements, and portal changes</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
            <div style={{
              width: 32, height: 32, border: '3px solid #2A2A2A',
              borderTopColor: '#F5C800', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : announcements.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: '#444', fontSize: 14,
          }}>
            <Megaphone size={40} color="#333" style={{ margin: '0 auto 12px' }} />
            <p style={{ margin: 0 }}>No announcements yet — check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {announcements.map((a, idx) => (
              <div
                key={a.id}
                style={{
                  backgroundColor: '#111',
                  border: idx === 0 ? '1px solid #F5C80033' : '1px solid #222',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                {/* Top accent for latest */}
                {idx === 0 && <div style={{ height: 3, backgroundColor: '#F5C800' }} />}

                <div style={{ padding: '20px 22px' }}>
                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {idx === 0 && (
                        <span style={{
                          backgroundColor: '#F5C800', color: '#000', fontSize: 9, fontWeight: 900,
                          textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 20,
                        }}>
                          New
                        </span>
                      )}
                      <span style={{ color: '#555', fontSize: 11, fontWeight: 600 }}>
                        by {a.created_by}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#444', fontSize: 11 }}>
                      <Calendar size={11} />
                      <span>{timeAgo(a.created_at)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 style={{ color: '#F5F5F5', fontSize: 17, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.35 }}>
                    {a.title}
                  </h2>

                  {/* Body */}
                  <p style={{ color: '#888', fontSize: 13, lineHeight: 1.75, margin: '0 0 12px', whiteSpace: 'pre-wrap' }}>
                    {a.body}
                  </p>

                  {/* Image */}
                  {a.image_url && (
                    <img
                      src={a.image_url}
                      alt=""
                      style={{ width: '100%', borderRadius: 10, marginBottom: 12, display: 'block' }}
                    />
                  )}

                  {/* Loom embed */}
                  {a.loom_url && <LoomEmbed url={a.loom_url} />}

                  {/* Link */}
                  {a.link_url && (
                    <a
                      href={a.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        marginTop: 12, color: '#F5C800', fontSize: 12, fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={13} />
                      View more
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
