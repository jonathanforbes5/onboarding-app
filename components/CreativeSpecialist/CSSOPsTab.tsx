'use client';
import React, { useState, useRef, useCallback } from 'react';

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
  acc: '#A78BFA',
};

interface SOPItem {
  title: string;
  description: string;
  owner: string;
  url?: string;
  url2?: string;
  url2Label?: string;
  tags?: string[];
}

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  defaultOpen: boolean;
  sops: SOPItem[];
}

function sopMatches(sop: SOPItem, q: string): boolean {
  const lower = q.toLowerCase();
  return (
    sop.title.toLowerCase().includes(lower) ||
    sop.description.toLowerCase().includes(lower) ||
    sop.owner.toLowerCase().includes(lower) ||
    (sop.tags ?? []).some((t) => t.toLowerCase().includes(lower))
  );
}

function linkLabel(url: string): string {
  if (url.includes('loom.com')) return 'Watch Loom';
  if (url.includes('fathom.video')) return 'Watch Call';
  if (url.includes('docs.google.com/document')) return 'View Doc';
  if (url.includes('docs.google.com/spreadsheets')) return 'View Sheet';
  if (url.includes('drive.google.com/drive/folders')) return 'Open Folder';
  if (url.includes('drive.google.com/file')) return 'View PDF';
  return 'Open';
}

const CATEGORIES: Category[] = [
  {
    id: 'training',
    label: 'Role Training',
    icon: '🎬',
    color: '#FB923C',
    defaultOpen: true,
    sops: [
      {
        title: 'Ken × Tyler — Training Session 1',
        description: 'First recorded training call. Role overview, creative formats, and initial workflow walkthrough with Tyler.',
        owner: 'Tyler / Ken',
        url: 'https://fathom.video/share/5MA3xyFoD4iAi9o4yXzjodHoGXX2rUb4',
        tags: ['Fathom', 'Training'],
      },
      {
        title: 'Ken × Tyler — Training Session 2',
        description: 'Deep dive into specific creative production workflows, quality standards, and tool usage.',
        owner: 'Tyler / Ken',
        url: 'https://fathom.video/share/64Kh2VAkbr2Sj7fEeZLcw5nmSxUUcAN5',
        tags: ['Fathom', 'Training'],
      },
    ],
  },
  {
    id: 'formats',
    label: 'Creative Formats & Examples',
    icon: '🖼️',
    color: C.acc,
    defaultOpen: true,
    sops: [
      {
        title: 'RoofIgnite Creative Formats',
        description: 'The master reference for all creative formats we run — format specs, use cases, and production notes.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1xiBeYNmG4YI175Zv0v4h8_Y0fH9mgbidvfZD3IKDMMw/edit?usp=sharing',
        tags: ['Reference', 'Formats'],
      },
      {
        title: 'Static Creative Exemplars Guide',
        description: 'Reference examples for static ad creatives. Review before producing any static format.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1IdnwVmXrwLa6Wtc_WhUSkUsaqz5Shx3_2D3t6O1r6BI/edit?usp=sharing',
        tags: ['Exemplars', 'Static'],
      },
      {
        title: 'Video Creative Exemplars Guide',
        description: 'Reference examples for video ad creatives. Review before producing any video format.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1DoIPXdZkrKAchJcwF2NMa_-Wuu2dUWLJhSJZQo1MjCM/edit?usp=sharing',
        tags: ['Exemplars', 'Video'],
      },
      {
        title: 'Talking Head Scripts Companion',
        description: 'Script templates and guidelines for talking head ad formats used in AI video production.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1PaxVws6whEZk8efou1muU4HGh_NF7MHOjvo-NSTNeTk/edit?usp=sharing',
        tags: ['Scripts', 'Video'],
      },
      {
        title: 'Master Creatives Folder',
        description: 'Drive folder where all finished creative assets are stored and organized by client/format.',
        owner: 'Ken',
        url: 'https://drive.google.com/drive/folders/1J-OHOa2vrbuwVNzJNhxAXfSI3InHtULH?usp=drive_link',
        tags: ['Drive', 'Assets'],
      },
    ],
  },
  {
    id: 'principles',
    label: 'Shared Creative Principles',
    icon: '🧠',
    color: '#4A90D9',
    defaultOpen: true,
    sops: [
      {
        title: 'Creative Construction Mastery SOP',
        description: 'Written SOP + Loom of Oscar building ads — covers the psychology of creative and how to construct ads that convert.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1CMJ-s4BwXIp7pAU_vSKYU54RZlnrqb0RXlYJujg8Gxo/edit?usp=sharing',
        tags: ['Mastery', 'Strategy'],
      },
      {
        title: 'RI.LTD Andromeda Creative Diversification Playbook',
        description: 'Before/after examples + step-by-step edit tutorials for testimonial, drone, and talking-head ads.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1du8s7ylQDfBi4zqHWXF2VF2nt8LodggjiKxcKW3pLWU/edit?usp=sharing',
        tags: ['Playbook', 'Strategy'],
      },
      {
        title: 'Creative Mastery Ad Set 101 (PDF)',
        description: 'How to judge good vs. bad on our most popular evergreen creative format.',
        owner: 'Cole',
        url: 'https://drive.google.com/file/d/1cp4dKeQOW2H0AURfWNefBOY1YpUqHAeK/view?usp=sharing',
        tags: ['PDF', 'Reference'],
      },
      {
        title: 'Roofing B2C Ads Buildout',
        description: 'Full ad buildout reference for roofing B2C campaigns. Context for how creative fits into the overall ad strategy.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1UdHQXz-i7T5YfgS1aiVe7ycDYijudw1C8F0oMGr6mrU/edit?usp=sharing',
        tags: ['Buildout', 'Strategy'],
      },
      {
        title: 'RoofIgnite Studio SOP',
        description: 'How to use RoofIgnite Studio to produce visually diverse static creative at low cost.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1K9rVhomXWGcCJi3tGl_9QOi6G19dxK7mDERzX8V5m8M/edit?usp=sharing',
        tags: ['Studio', 'Tool'],
      },
      {
        title: 'RoofIgnite AI Video SOP',
        description: 'Step-by-step SOP for producing AI video ads using our AI video toolchain.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1dIN8VlaI-G26J_gM8FkZnPuAidaLpU1iF4jLyS8Z5mI/edit?usp=sharing',
        tags: ['Video', 'AI', 'Tool'],
      },
    ],
  },
];

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      backgroundColor: color + '18', border: `1px solid ${color}33`,
      borderRadius: 4, padding: '2px 6px',
      fontSize: 10, fontWeight: 700, color, letterSpacing: '0.04em',
    }}>
      {label}
    </span>
  );
}

function SOPCard({ sop, color }: { sop: SOPItem; color: string }) {
  return (
    <div style={{
      backgroundColor: C.surf2,
      border: `1px solid ${C.border2}`,
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
            {sop.title}
          </div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{sop.description}</div>
        </div>
        <div style={{
          flexShrink: 0,
          backgroundColor: C.surf3,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: '2px 8px',
          fontSize: 10,
          fontWeight: 700,
          color: C.muted2,
          whiteSpace: 'nowrap',
        }}>
          {sop.owner}
        </div>
      </div>

      {sop.tags && sop.tags.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {sop.tags.map((t) => <Tag key={t} label={t} color={color} />)}
        </div>
      )}

      {(sop.url || sop.url2) && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
          {sop.url && (
            <a
              href={sop.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                backgroundColor: color + '18', border: `1px solid ${color}44`,
                borderRadius: 6, padding: '5px 10px',
                fontSize: 11, fontWeight: 700, color,
                textDecoration: 'none',
              }}
            >
              <span>↗</span> {linkLabel(sop.url)}
            </a>
          )}
          {sop.url2 && (
            <a
              href={sop.url2}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                backgroundColor: '#FB923C18', border: '1px solid #FB923C44',
                borderRadius: 6, padding: '5px 10px',
                fontSize: 11, fontWeight: 700, color: '#FB923C',
                textDecoration: 'none',
              }}
            >
              <span>↗</span> {sop.url2Label ?? linkLabel(sop.url2)}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat, filteredSops }: { cat: Category; filteredSops?: SOPItem[] }) {
  const [open, setOpen] = useState(cat.defaultOpen);
  const isSearching = filteredSops !== undefined;
  const sopsToShow = isSearching ? filteredSops : cat.sops;
  const isOpen = isSearching || open;

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={() => { if (!isSearching) setOpen((o) => !o); }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          cursor: isSearching ? 'default' : 'pointer',
          padding: '12px 16px',
          backgroundColor: C.surf,
          border: `1px solid ${cat.color}33`,
          borderRadius: isOpen ? '12px 12px 0 0' : 12,
          transition: 'border-radius 0.15s',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 18 }}>{cat.icon}</span>
        <span style={{ color: cat.color, fontSize: 13, fontWeight: 800, flex: 1 }}>{cat.label}</span>
        <span style={{
          backgroundColor: cat.color + '18', border: `1px solid ${cat.color}33`,
          borderRadius: 20, padding: '2px 8px',
          fontSize: 11, fontWeight: 800, color: cat.color,
        }}>
          {sopsToShow.length}
        </span>
        {!isSearching && (
          <span style={{ color: C.muted2, fontSize: 14, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none', display: 'block' }}>
            ▾
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          border: `1px solid ${cat.color}22`,
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '12px 12px 14px',
          backgroundColor: C.surf + 'AA',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {sopsToShow.map((sop) => (
            <SOPCard key={sop.title} sop={sop} color={cat.color} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CSSOPsTab() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = query.trim();

  const filteredCategories = trimmed
    ? CATEGORIES
        .map((cat) => ({ cat, matched: cat.sops.filter((s) => sopMatches(s, trimmed)) }))
        .filter(({ matched, cat }) => matched.length > 0 || cat.label.toLowerCase().includes(trimmed.toLowerCase()))
        .map(({ cat, matched }) => ({
          cat,
          filteredSops: cat.label.toLowerCase().includes(trimmed.toLowerCase()) ? cat.sops : matched,
        }))
    : null;

  const totalResults = filteredCategories
    ? filteredCategories.reduce((n, { filteredSops }) => n + filteredSops.length, 0)
    : null;

  const clearSearch = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '28px 20px 60px',
      color: C.text,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ── Page header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0D0A1A 0%, #111111 60%)',
          border: `1px solid ${C.acc}33`,
          borderRadius: 16,
          padding: '22px 26px 20px',
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${C.acc}, transparent)`,
            borderRadius: '16px 16px 0 0',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>📐</span>
            <h1 style={{ color: C.text, fontSize: 20, fontWeight: 900, margin: 0, letterSpacing: '-0.3px' }}>
              AI Creative Specialist SOPs
            </h1>
          </div>
          <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
            Your master index of training recordings, creative format references, exemplars, and production SOPs.
            Start with Role Training, then use the format guides and principles docs as your daily reference.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <svg
            width="15" height="15" viewBox="0 0 20 20" fill="none"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.muted2 }}
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recordings, formats, SOPs, owners…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: C.surf,
              border: `1px solid ${trimmed ? C.acc + '55' : C.border2}`,
              borderRadius: 10,
              padding: '11px 40px 11px 40px',
              color: C.text,
              fontSize: 13.5,
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = C.acc + '88'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = trimmed ? C.acc + '55' : C.border2; }}
          />
          {trimmed && (
            <button
              onClick={clearSearch}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: C.muted, padding: 4, display: 'flex', alignItems: 'center',
              }}
              title="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Results summary ── */}
        {trimmed && (
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            {totalResults !== null && totalResults > 0 ? (
              <>
                <span style={{
                  backgroundColor: C.acc + '18', border: `1px solid ${C.acc}33`,
                  borderRadius: 20, padding: '2px 10px',
                  fontSize: 11, fontWeight: 800, color: C.acc,
                }}>
                  {totalResults} result{totalResults !== 1 ? 's' : ''}
                </span>
                <span style={{ color: C.muted2, fontSize: 11.5 }}>
                  across {filteredCategories!.length} categor{filteredCategories!.length !== 1 ? 'ies' : 'y'}
                </span>
              </>
            ) : (
              <span style={{ color: C.muted, fontSize: 12.5 }}>
                No results for <strong style={{ color: C.text }}>&ldquo;{trimmed}&rdquo;</strong> — try a different term.
              </span>
            )}
          </div>
        )}

        {/* ── Categories ── */}
        {filteredCategories
          ? filteredCategories.map(({ cat, filteredSops }) => (
              <CategorySection key={cat.id} cat={cat} filteredSops={filteredSops} />
            ))
          : CATEGORIES.map((cat) => (
              <CategorySection key={cat.id} cat={cat} />
            ))
        }

      </div>
    </div>
  );
}
