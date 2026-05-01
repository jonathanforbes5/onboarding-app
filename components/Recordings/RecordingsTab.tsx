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

type ViewFilter = 'all' | 'onboarding' | 'service';
type LoomFilter = 'all' | 'lead_flow' | 'creative' | 'osa' | 'technical' | 'advanced' | 'retention';

const FILTERS: { id: ViewFilter; label: string }[] = [
  { id: 'all',        label: 'All' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'service',    label: 'Service Delivery' },
];

const LOOM_FILTERS: { id: LoomFilter; label: string; color: string }[] = [
  { id: 'all',        label: 'All',             color: '#F5C800' },
  { id: 'lead_flow',  label: 'Lead Flow',        color: '#22C55E' },
  { id: 'creative',   label: 'Creative',         color: '#F59E0B' },
  { id: 'osa',        label: 'OSA Fixes',        color: '#EF4444' },
  { id: 'technical',  label: 'Technical',        color: '#4A90D9' },
  { id: 'advanced',   label: 'Advanced',         color: '#A78BFA' },
  { id: 'retention',  label: 'Retention',        color: '#EC4899' },
];

const LOOM_CATEGORY_LABELS: Record<LoomFilter, string> = {
  all:        'All',
  lead_flow:  'Lead Flow',
  creative:   'Creative & Ads',
  osa:        'Out-of-Service-Area',
  technical:  'Technical Fix',
  advanced:   'Advanced Ops',
  retention:  'Client Retention',
};

interface TrainingLoom {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  priority: string;
}

function LoomCard({ loom }: { loom: TrainingLoom }) {
  const catColor = LOOM_FILTERS.find((f) => f.id === loom.category)?.color ?? '#666';
  const isCore = loom.priority === 'core';
  return (
    <a
      href={loom.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        gap: 12,
        backgroundColor: '#111111',
        border: `1px solid ${isCore ? catColor + '33' : '#1E1E1E'}`,
        borderRadius: 12,
        padding: '14px 16px',
        textDecoration: 'none',
        transition: 'border-color 0.15s, background-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = catColor + '66';
        e.currentTarget.style.backgroundColor = '#161616';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isCore ? catColor + '33' : '#1E1E1E';
        e.currentTarget.style.backgroundColor = '#111111';
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: catColor + '15',
        border: `1px solid ${catColor}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: catColor,
        fontSize: 14,
      }}>
        ▶
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 700 }}>{loom.title}</span>
          {isCore && (
            <span style={{
              backgroundColor: catColor,
              color: '#000',
              fontSize: 9,
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: 20,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}>
              Core
            </span>
          )}
        </div>
        <div style={{ color: '#666', fontSize: 12, lineHeight: 1.55, marginBottom: 5 }}>{loom.description}</div>
        <span style={{
          backgroundColor: catColor + '18',
          border: `1px solid ${catColor}30`,
          color: catColor,
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 20,
        }}>
          {LOOM_CATEGORY_LABELS[loom.category as LoomFilter] ?? loom.category}
        </span>
      </div>
      <div style={{ color: '#555', marginTop: 2, flexShrink: 0 }}>
        <ExternalLinkIcon />
      </div>
    </a>
  );
}

export function RecordingsTab() {
  const [filter, setFilter] = useState<ViewFilter>('all');
  const [loomFilter, setLoomFilter] = useState<LoomFilter>('all');

  const filteredTraining = recordingsData.recordings.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'onboarding') return r.category === 'onboarding_reference';
    if (filter === 'service') return r.category === 'service_delivery';
    return false;
  });

  const filteredLooms = (recordingsData.training_looms as TrainingLoom[]).filter((l) => {
    if (loomFilter === 'all') return true;
    return l.category === loomFilter;
  });

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
            Training Library
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: 0 }}>
            Structured training videos, service delivery walkthroughs, and 37 hands-on Loom walkthroughs from the Client Ongoing Management SOP — every scenario you'll face on live accounts.
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

        {/* ── Training Videos ── */}
        {filteredTraining.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
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

        {filteredTraining.length === 0 && (
          <div style={{ textAlign: 'center', color: '#444', fontSize: 13, padding: '3rem' }}>
            No recordings match this filter.
          </div>
        )}

        {/* ── Training Looms ── */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: 16 }}>🎬</span>
            <h2 style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 800, margin: 0 }}>Training Looms</h2>
            <span style={{
              backgroundColor: '#1A1400',
              border: '1px solid #2A2200',
              color: '#F5C800',
              fontSize: 10,
              padding: '2px 7px',
              borderRadius: 20,
              fontWeight: 700,
            }}>
              {filteredLooms.length}
            </span>
          </div>
          <p style={{ color: '#444', fontSize: 12, margin: '0 0 1rem', paddingLeft: 24 }}>
            Real account walkthroughs from the Client Ongoing Management SOP — every scenario you'll face on live accounts. Start with the <strong style={{ color: '#888' }}>Core</strong> ones.
          </p>

          {/* Loom filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem', paddingLeft: 24 }}>
            {LOOM_FILTERS.map((f) => {
              const active = loomFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setLoomFilter(f.id)}
                  style={{
                    padding: '4px 11px',
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 700,
                    border: '1px solid',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.1s',
                    backgroundColor: active ? f.color : '#111',
                    borderColor: active ? f.color : '#2A2A2A',
                    color: active ? '#000' : '#666',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredLooms.map((loom) => (
              <LoomCard key={loom.id} loom={loom} />
            ))}
          </div>

          {filteredLooms.length === 0 && (
            <div style={{ textAlign: 'center', color: '#444', fontSize: 13, padding: '2rem' }}>
              No Looms in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
