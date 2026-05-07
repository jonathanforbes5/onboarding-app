'use client';
import React, { useEffect, useState } from 'react';
import { Map } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string | null;
  status: 'planned' | 'in_progress' | 'done';
  category: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const COLUMNS: { key: RoadmapItem['status']; label: string; color: string; bg: string; dot: string }[] = [
  { key: 'planned',     label: 'Planned',      color: '#A78BFA', bg: '#120D1A', dot: '#A78BFA' },
  { key: 'in_progress', label: 'In Progress',  color: '#FBBF24', bg: '#1A1200', dot: '#FBBF24' },
  { key: 'done',        label: 'Done',         color: '#22C55E', bg: '#0D1A0D', dot: '#22C55E' },
];

export function RoadmapTab() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/roadmap')
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
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
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 16px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: '#001A1A', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Map size={18} color="#06B6D4" />
            </div>
            <div>
              <h1 style={{ color: '#F5F5F5', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
                Roadmap
              </h1>
              <p style={{ color: '#555', fontSize: 12, margin: 0 }}>Upcoming improvements to the portal and your workflow</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
            <div style={{
              width: 32, height: 32, border: '3px solid #2A2A2A',
              borderTopColor: '#06B6D4', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
            gap: 16,
          }}>
            {COLUMNS.map((col) => {
              const colItems = items.filter((i) => i.status === col.key);
              return (
                <div key={col.key} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {/* Column header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                    paddingBottom: 10, borderBottom: `2px solid ${col.color}33`,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: col.dot }} />
                    <span style={{ color: col.color, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {col.label}
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      backgroundColor: col.bg, color: col.color, fontSize: 10, fontWeight: 800,
                      padding: '2px 8px', borderRadius: 20, border: `1px solid ${col.color}33`,
                    }}>
                      {colItems.length}
                    </span>
                  </div>

                  {/* Cards */}
                  {colItems.length === 0 ? (
                    <div style={{
                      padding: '20px 14px', textAlign: 'center',
                      border: '1px dashed #222', borderRadius: 12,
                      color: '#333', fontSize: 12,
                    }}>
                      Nothing here yet
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {colItems.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            backgroundColor: '#111', border: '1px solid #222',
                            borderRadius: 12, padding: '14px 16px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                            <h3 style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 800, margin: 0, lineHeight: 1.35, flex: 1 }}>
                              {item.title}
                            </h3>
                            {item.category && (
                              <span style={{
                                backgroundColor: '#1A1A1A', color: '#555', fontSize: 10, fontWeight: 700,
                                padding: '2px 7px', borderRadius: 20, border: '1px solid #2A2A2A',
                                flexShrink: 0, whiteSpace: 'nowrap',
                              }}>
                                {item.category}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p style={{ color: '#666', fontSize: 12, margin: '0 0 6px', lineHeight: 1.6 }}>
                              {item.description}
                            </p>
                          )}
                          <div style={{ color: '#333', fontSize: 11 }}>
                            {new Date(item.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#444', fontSize: 14 }}>
            <Map size={40} color="#333" style={{ margin: '0 auto 12px', display: 'block' }} />
            <p style={{ margin: 0 }}>No roadmap items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
