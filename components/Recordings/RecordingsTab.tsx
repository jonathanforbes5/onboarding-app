'use client';
import React, { useState } from 'react';
import recordingsData from '@/repo/data/recordings.json';

function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1h4v4M11 1L5.5 6.5M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
    </svg>
  );
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const CATEGORY_LABELS: Record<string, string> = {
  onboarding_reference: 'Onboarding Reference',
  service_delivery: 'Service Delivery',
};

interface TrainingRecordingProps {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  watch_first?: boolean;
}

function TrainingCard({ title, description, url, category, watch_first }: TrainingRecordingProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        gap: 12,
        backgroundColor: '#111111',
        border: `1px solid ${watch_first ? '#F5C80033' : '#1E1E1E'}`,
        borderRadius: 12,
        padding: '14px 16px',
        textDecoration: 'none',
        transition: 'border-color 0.15s, background-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#F5C80055';
        e.currentTarget.style.backgroundColor = '#161616';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = watch_first ? '#F5C80033' : '#1E1E1E';
        e.currentTarget.style.backgroundColor = '#111111';
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#1A1400',
        border: '1px solid #2A2200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#F5C800',
      }}>
        <PlayIcon />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 700 }}>{title}</span>
          {watch_first && (
            <span style={{
              backgroundColor: '#F5C800',
              color: '#000',
              fontSize: 9,
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: 20,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Watch First
            </span>
          )}
        </div>
        <div style={{ color: '#666', fontSize: 12, lineHeight: 1.55, marginBottom: 6 }}>{description}</div>
        <div style={{ color: '#444', fontSize: 11 }}>{CATEGORY_LABELS[category] ?? category}</div>
      </div>
      <div style={{ color: '#555', marginTop: 2 }}>
        <ExternalLinkIcon />
      </div>
    </a>
  );
}

interface ReferenceRecordingProps {
  id: string;
  title: string;
  description: string;
  url: string;
  duration_mins: number;
  date: string;
  participants: string[];
  tags: string[];
}

function ReferenceCard({ title, description, url, duration_mins, date, participants, tags }: ReferenceRecordingProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        gap: 14,
        backgroundColor: '#111111',
        border: '1px solid #1E1E1E',
        borderRadius: 14,
        padding: '16px 18px',
        textDecoration: 'none',
        transition: 'border-color 0.15s, background-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3B82F655';
        e.currentTarget.style.backgroundColor = '#141414';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1E1E1E';
        e.currentTarget.style.backgroundColor = '#111111';
      }}
    >
      {/* Duration badge */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        backgroundColor: '#0D1020',
        border: '1px solid #1E2040',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <div style={{ color: '#3B82F6', fontSize: 11, fontWeight: 800 }}>
          {formatDuration(duration_mins)}
        </div>
        <div style={{ color: '#3B82F666', fontSize: 9, marginTop: 1 }}>
          <PlayIcon />
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{title}</div>
        <div style={{ color: '#666', fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{description}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: '#444', fontSize: 11 }}>{formatDate(date)}</span>
          <span style={{ color: '#333', fontSize: 11 }}>·</span>
          <span style={{ color: '#444', fontSize: 11 }}>{participants.join(', ')}</span>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #2A2A2A',
              color: '#555',
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 20,
              fontWeight: 600,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ color: '#555', marginTop: 2 }}>
        <ExternalLinkIcon />
      </div>
    </a>
  );
}

type ViewFilter = 'all' | 'onboarding' | 'service' | 'strategy';

const FILTERS: { id: ViewFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'service', label: 'Service Delivery' },
  { id: 'strategy', label: 'Strategy & Reviews' },
];

export function RecordingsTab() {
  const [filter, setFilter] = useState<ViewFilter>('all');

  const filteredTraining = recordingsData.recordings.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'onboarding') return r.category === 'onboarding_reference';
    if (filter === 'service') return r.category === 'service_delivery';
    return false;
  });

  const filteredReference = recordingsData.reference_recordings.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'onboarding') return r.tags.includes('onboarding');
    if (filter === 'strategy') return r.tags.some((t) => ['review', 'performance', 'strategy', 'marketing'].includes(t));
    return filter === 'all';
  });

  const showTraining = filter === 'all' || filter === 'onboarding' || filter === 'service';
  const showReference = filter === 'all' || filter === 'onboarding' || filter === 'strategy';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      padding: '1.5rem 1rem 4rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: '#F5F5F5', fontSize: 20, fontWeight: 900, margin: '0 0 6px' }}>
            Reference Recordings
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
            Training walkthroughs and recent team calls. Watch these to understand how Roof Ignite operates in practice.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '5px 13px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                border: '1px solid',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.1s',
                backgroundColor: filter === f.id ? '#F5C800' : '#111',
                borderColor: filter === f.id ? '#F5C800' : '#2A2A2A',
                color: filter === f.id ? '#000' : '#666',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Reference Recordings ── */}
        {showReference && filteredReference.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 16 }}>📹</span>
              <h2 style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 800, margin: 0 }}>Recent Team Calls</h2>
              <span style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                color: '#555',
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 20,
                fontWeight: 700,
              }}>
                {filteredReference.length}
              </span>
            </div>
            <p style={{ color: '#444', fontSize: 12, margin: '0 0 1rem', paddingLeft: 24 }}>
              Real calls from the team. Study these to understand how Jonathan runs reviews, handles accounts, and trains new pod managers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filteredReference.map((r) => (
                <ReferenceCard key={r.id} {...r} />
              ))}
            </div>
          </div>
        )}

        {/* ── Training Videos ── */}
        {showTraining && filteredTraining.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <span style={{ fontSize: 16 }}>🎓</span>
              <h2 style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 800, margin: 0 }}>Training Videos</h2>
              <span style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #2A2A2A',
                color: '#555',
                fontSize: 10,
                padding: '2px 7px',
                borderRadius: 20,
                fontWeight: 700,
              }}>
                {filteredTraining.length}
              </span>
            </div>
            <p style={{ color: '#444', fontSize: 12, margin: '0 0 1rem', paddingLeft: 24 }}>
              Structured walkthroughs for onboarding and service delivery. Watch these in your first two weeks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredTraining.map((r) => (
                <TrainingCard key={r.id} {...r} />
              ))}
            </div>
          </div>
        )}

        {filteredTraining.length === 0 && filteredReference.length === 0 && (
          <div style={{ textAlign: 'center', color: '#444', fontSize: 13, padding: '3rem' }}>
            No recordings match this filter.
          </div>
        )}

      </div>
    </div>
  );
}
