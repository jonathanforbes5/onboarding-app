'use client';
import React, { useState } from 'react';
import sopData from '@/repo/data/sops.json';
import { ClientMap } from '@/components/Diagrams/ClientMap';
import { ApprovalVideoSOP } from '@/components/Diagrams/ApprovalVideoSOP';

type FilterTag = 'all' | 'client' | 'creative' | 'process' | 'onboarding';

const TAG_LABELS: Record<FilterTag, string> = {
  all: 'All SOPs',
  onboarding: 'Onboarding',
  client: 'Client Management',
  creative: 'Creative & Ads',
  process: 'Process & Systems',
};

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7 1h4v4M11 1L5.5 6.5M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface CardProps {
  title: string;
  description: string;
  url: string;
  accent?: string;
  meta?: string;
}

function ResourceCard({ title, description, url, accent = '#F5C800', meta }: CardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        backgroundColor: '#111111',
        border: '1px solid #1E1E1E',
        borderRadius: 12,
        padding: '14px 16px',
        textDecoration: 'none',
        transition: 'border-color 0.15s, background-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent + '55';
        e.currentTarget.style.backgroundColor = '#161616';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1E1E1E';
        e.currentTarget.style.backgroundColor = '#111111';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{title}</div>
          <div style={{ color: '#666', fontSize: 12, lineHeight: 1.55 }}>{description}</div>
          {meta && <div style={{ color: '#444', fontSize: 11, marginTop: 6 }}>{meta}</div>}
        </div>
        <div style={{ color: '#555', marginTop: 2 }}>
          <ExternalLinkIcon />
        </div>
      </div>
    </a>
  );
}

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
}

function SectionHeader({ icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <h2 style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 800, margin: 0 }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{ color: '#555', fontSize: 12, margin: 0, paddingLeft: 26 }}>{subtitle}</p>
      )}
    </div>
  );
}

export function SOPsTab() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all');

  const filteredSOPs = sopData.sops.filter((sop) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'creative') return sop.tags.some((t) => ['creative', 'ads', 'scaling', 'testing', 'copy', 'design', 'fundamentals'].includes(t));
    if (activeFilter === 'client') return sop.tags.some((t) => ['client', 'retention', 'seasonal', 'social-proof'].includes(t));
    if (activeFilter === 'process') return sop.tags.some((t) => ['process', 'va', 'setup', 'technical', 'dashboard', 'monitoring'].includes(t));
    if (activeFilter === 'onboarding') return sop.tags.includes('onboarding');
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      padding: '1.5rem 1rem 4rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h1 style={{ color: '#F5F5F5', fontSize: 20, fontWeight: 900, margin: '0 0 6px' }}>
            Resources & SOPs
          </h1>
          <p style={{ color: '#555', fontSize: 13, margin: '0 0 14px' }}>
            Everything you need in one place — quick-access resources, tools, and all standard operating procedures.
          </p>
          {/* Jump nav */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { label: '🗺️ Clientele At A Glance', href: '#clientele' },
              { label: '⚡ Quick Access', href: '#quick-access' },
              { label: '🎬 Approval Video SOP', href: '#approval-video' },
              { label: '🛠️ Tools', href: '#tools' },
              { label: '📋 SOPs', href: '#sops' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', color: '#888',
                  textDecoration: 'none', transition: 'all 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F5C80055'; e.currentTarget.style.color = '#F5F5F5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#888'; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Clientele At A Glance ── */}
        <div id="clientele" style={{ marginBottom: '2.5rem', scrollMarginTop: 60 }}>
          <SectionHeader icon="🗺️" title="RoofIgnite Clientele At A Glance" subtitle="Live view of every active and pre-launch account, by city. Click a state or dot for full client profiles (admin only)." />
          <div style={{
            backgroundColor: '#141414',
            border: '1px solid #2A2A2A',
            borderRadius: 14,
            padding: 14,
          }}>
            <ClientMap />
          </div>
        </div>

        {/* ── Quick Access ── */}
        <div id="quick-access" style={{ marginBottom: '2.5rem', scrollMarginTop: 60 }}>
          <SectionHeader icon="⚡" title="Quick Access" subtitle="Open these daily — know where they are." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {sopData.resources.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#111111',
                  border: '1px solid #1E1E1E',
                  borderRadius: 10,
                  padding: '12px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F5C80055';
                  e.currentTarget.style.backgroundColor = '#161616';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E1E1E';
                  e.currentTarget.style.backgroundColor = '#111111';
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{r.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F5F5F5', fontSize: 12, fontWeight: 700 }}>{r.title}</div>
                  <div style={{ color: '#555', fontSize: 11, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.description.split('.')[0]}</div>
                </div>
                <div style={{ color: '#333', flexShrink: 0 }}>
                  <ExternalLinkIcon />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Approval Video SOP ── */}
        <div id="approval-video" style={{ marginBottom: '2.5rem', scrollMarginTop: 60 }}>
          <SectionHeader icon="🎬" title="Pre-Launch Approval Video — SOP" subtitle="The Loom you send the client before launch. Pre-handles 90% of mid-cycle objections." />
          <div style={{
            backgroundColor: '#141414',
            border: '1px solid #2A2A2A',
            borderRadius: 14,
            padding: 14,
          }}>
            <ApprovalVideoSOP />
          </div>
        </div>

        {/* ── Tools ── */}
        <div id="tools" style={{ marginBottom: '2.5rem', scrollMarginTop: 60 }}>
          <SectionHeader icon="🛠️" title="Tools" subtitle="The core platforms you'll use every day." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {sopData.tools.map((t) => (
              <a
                key={t.id}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#111111',
                  border: '1px solid #1E1E1E',
                  borderRadius: 10,
                  padding: '12px 14px',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F655';
                  e.currentTarget.style.backgroundColor = '#161616';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E1E1E';
                  e.currentTarget.style.backgroundColor = '#111111';
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#F5F5F5', fontSize: 12, fontWeight: 700 }}>{t.title}</div>
                  <div style={{ color: '#555', fontSize: 11, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.description.split('.')[0]}</div>
                </div>
                <div style={{ color: '#333', flexShrink: 0 }}>
                  <ExternalLinkIcon />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── SOPs ── */}
        <div id="sops" style={{ scrollMarginTop: 60 }}>
          <SectionHeader icon="📋" title="Standard Operating Procedures" subtitle="Reference documents for every core process. Don't memorize — know where to find them." />

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
            {(Object.keys(TAG_LABELS) as FilterTag[]).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                style={{
                  padding: '10px 16px',
                  minHeight: 40,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  border: '1px solid',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.1s',
                  backgroundColor: activeFilter === tag ? '#F5C800' : '#111',
                  borderColor: activeFilter === tag ? '#F5C800' : '#2A2A2A',
                  color: activeFilter === tag ? '#000' : '#666',
                }}
              >
                {TAG_LABELS[tag]}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredSOPs.map((sop) => (
              <ResourceCard
                key={sop.id}
                title={sop.title}
                description={sop.description}
                url={sop.url}
                meta={sop.tags.map((t) => t.replace('-', ' ')).join(' · ')}
              />
            ))}
          </div>

          {filteredSOPs.length === 0 && (
            <div style={{ textAlign: 'center', color: '#444', fontSize: 13, padding: '2rem' }}>
              No SOPs match this filter.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
