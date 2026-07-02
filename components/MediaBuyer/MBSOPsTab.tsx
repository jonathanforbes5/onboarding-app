'use client';
import React, { useState } from 'react';

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
  acc: '#F5C800',
};

interface SOPItem {
  title: string;
  description: string;
  owner: string;
  url?: string;
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

const CATEGORIES: Category[] = [
  {
    id: 'core',
    label: 'Core Role SOPs',
    icon: '📌',
    color: '#F5C800',
    defaultOpen: true,
    sops: [
      {
        title: 'Marketing & Operations Management Folder',
        description: 'The folder holding almost all SOPs. Shared — everyone at RoofIgnite has access.',
        owner: 'Shared',
      },
      {
        title: 'R.LTD Service Delivery SOP',
        description: 'One-time setup tutorial for Pillar 1 (needs updating).',
        owner: 'Oscar',
      },
      {
        title: 'R.LTD Client Ongoing Management SOP',
        description: 'Many Looms for common Pillar 2 action steps. Reference the Training Library tab inside.',
        owner: 'Oscar',
      },
    ],
  },
  {
    id: 'setup',
    label: 'Account Setup & Landing Pages',
    icon: '🛠',
    color: '#4A90D9',
    defaultOpen: true,
    sops: [
      {
        title: 'GHL Setup Wizard',
        description: 'Replaces old manual in-GHL setup. Cuts setup from ~60 min to ~5–10 min.',
        owner: 'Cole',
        url: 'https://dashboard.roofignite.com',
      },
      {
        title: 'Set Up and Launch Landing Page V2',
        description: 'Step-by-step SOP for building and launching the landing page.',
        owner: 'Cole',
      },
      {
        title: 'RoofIgnite V3 Landing Page (LP V3): GHL Buildout SOP',
        description: 'V3 LP buildout inside GHL.',
        owner: 'Oscar',
      },
      {
        title: 'Switching to 4Q Survey',
        description: 'Switch from default 7-question to 4-question survey for markets where landing-page conversion is low.',
        owner: 'Emmanuel',
      },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: '🎨',
    color: '#A78BFA',
    defaultOpen: true,
    sops: [
      {
        title: 'Creative Mastery Ad Set 101 (PDF)',
        description: 'How to judge good vs. bad on our most popular evergreen creative format.',
        owner: 'Cole',
      },
      {
        title: 'Creative Construction Mastery SOP',
        description: 'Written SOP + Loom of Oscar building ads; the psychology behind creative.',
        owner: 'Oscar',
      },
      {
        title: 'RI.LTD Andromeda Creative Diversification Playbook',
        description: 'Before/after examples + step-by-step edit tutorials for testimonial, drone, and talking-head ads.',
        owner: 'Oscar',
      },
      {
        title: 'RoofIgnite Studio — Creative Format Library + SOP',
        description: 'In-house local creative builder: pick angle → format → plug in copy + assets → export. Formats: iMessage Testimonial, Notes-app Confession, Google Review Highlight, Two-Quotes Split, The Receipt, and more. Start with Michael Dallara\'s 2 overview Looms.',
        owner: 'Michael Dallara',
      },
      {
        title: 'RoofIgnite AI Video SOP',
        description: 'Systemizes AI video production for creative diversity. Edit AI UGC videos in CapCut, use ArcAds for UGC actors, and revive dying winners with hook tests, copy/headline swaps, and clean dupes.',
        owner: 'Michael Dallara',
      },
    ],
  },
  {
    id: 'copy',
    label: 'Ad Copy & Angles',
    icon: '✍️',
    color: '#F97316',
    defaultOpen: true,
    sops: [
      {
        title: 'Roofing B2C Ads Buildout (Copy / Headlines / Angles)',
        description: 'All templatized ad copy, headlines, and angles for roofing clients.',
        owner: 'Oscar',
      },
    ],
  },
  {
    id: 'client-data',
    label: 'Client Reference Data',
    icon: '📋',
    color: '#22C55E',
    defaultOpen: true,
    sops: [
      {
        title: 'Accounts Specific Document',
        description: 'Client-specific details for each active account.',
        owner: 'Oscar',
      },
      {
        title: 'Client Check-In System',
        description: 'Management fee, appointment expectations, contact info, account owner.',
        owner: 'Oscar',
      },
    ],
  },
  {
    id: 'hiring',
    label: 'Hiring System',
    icon: '👥',
    color: '#06B6D4',
    defaultOpen: false,
    sops: [
      {
        title: 'Hiring System',
        description: 'SOPs for Indeed, Facebook, and GHL hiring buildouts — for clients who want more sales reps or project managers.',
        owner: 'Oscar',
      },
    ],
  },
  {
    id: 'action-looms',
    label: 'Ongoing Management — Action Looms',
    icon: '🎬',
    color: '#EC4899',
    defaultOpen: true,
    sops: [
      {
        title: 'Fixing the $50/day ad spend limit',
        description: 'When a fresh account is capped at $50/day: check business verification, spin up a new Facebook Developer app if ineligible, apply for verification using A2P business info (license/incorporation docs). Client example: AHI Roofing.',
        owner: 'Oscar',
      },
      {
        title: 'Registering & deleting CNAME records (caller-ID fix)',
        description: 'Make business name on outbound calls match the sub-account. Check CNAME under Settings → Phone Numbers → Trust Center, register shortened name, remove already-registered CNAME via support-chat. Client examples: Trusted Home, Sharpline.',
        owner: 'Oscar',
      },
      {
        title: 'Installing our system on the client\'s own GHL sub-account',
        description: 'For the rare client who insists we build inside their own GHL agency sub-account. Covers client comms, admin access, and full asset transfer. Client example: Get Smart Construction.',
        owner: 'Oscar',
      },
      {
        title: 'Auto-syncing leads into a client\'s CRM with Zapier — Roofr',
        description: 'Connect GHL → Google Sheet → client CRM. Includes field mapping for both 4Q and 7Q surveys. Client example: Madrid Roofing.',
        owner: 'Oscar',
      },
      {
        title: 'Turning around a slow / low-quality account',
        description: 'Three fixes: (1) advanced pixel conditioning, (2) telling homeowners client will call an hour before appointment, (3) reading ad metrics vs. comparable account and rebuilding creatives. Client example: Kover Solutions.',
        owner: 'Oscar',
      },
      {
        title: 'Moving an account onto an already-A2P-verified sub-account',
        description: 'When A2P won\'t verify: repurpose an old verified sub-account. Full asset transfer. Ask Oscar which verified account to use. Client example: Sharpline → Founders Roofing.',
        owner: 'Oscar',
      },
      {
        title: 'Auto-syncing leads into AccuLynx with Zapier (2-part)',
        description: 'Part 1 builds the Zap; Part 2 finishes once API key arrives. If you switch 7Q → 4Q, refresh Sheet headers and re-map. Client example: Brown Roofing.',
        owner: 'Oscar',
      },
      {
        title: 'Advanced pixel conditioning / Conversion API setup',
        description: 'Generate CAPI access token + data-set/pixel ID in Events Manager, build GHL workflow firing \'schedule\' conversion event on \'qualified\' tag. Tag good leads within ~7 days. Client example: Klaus Larsen Roofing.',
        owner: 'Oscar',
      },
      {
        title: 'Tagging booked leads back into a client\'s CRM',
        description: 'Build GHL workflow that, on \'qualified\' tag, pushes contact through Sheet → Zap into their system with \'booked\' tag, duplicated per county/sub-account. Client example: US Shingle.',
        owner: 'Oscar',
      },
      {
        title: 'Killing out-of-service-area leads with a survey gate',
        description: 'Add required first survey question that disqualifies immediately on \'no.\' Keep ad spend high enough — not $20/day. Client example: Everlast Roofing.',
        owner: 'Oscar',
      },
    ],
  },
];

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M7 1h4v4M11 1L5.5 6.5M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{
        flexShrink: 0,
        transition: 'transform 0.2s',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SOPCardProps {
  sop: SOPItem;
  accent: string;
}

function SOPCard({ sop, accent }: SOPCardProps) {
  return (
    <div
      style={{
        backgroundColor: C.surf2,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: '0 10px 10px 0',
        padding: '13px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: C.text,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 4,
            lineHeight: 1.4,
          }}
        >
          {sop.title}
        </div>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.55 }}>{sop.description}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.03em',
              backgroundColor: accent + '18',
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            {sop.owner}
          </span>
          {sop.url && (
            <a
              href={sop.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 8px',
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: C.surf3,
                border: `1px solid ${C.border2}`,
                color: C.muted,
                textDecoration: 'none',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = C.text;
                e.currentTarget.style.borderColor = C.muted2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = C.muted;
                e.currentTarget.style.borderColor = C.border2;
              }}
            >
              Open <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

interface CategorySectionProps {
  category: Category;
}

function CategorySection({ category }: CategorySectionProps) {
  const [open, setOpen] = useState(category.defaultOpen);

  return (
    <div
      style={{
        backgroundColor: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          transition: 'background-color 0.15s',
          borderBottom: open ? `1px solid ${C.border}` : 'none',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.surf2; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>{category.icon}</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              color: C.text,
              fontSize: 13.5,
              fontWeight: 800,
              letterSpacing: '-0.1px',
            }}
          >
            {category.label}
          </span>
          <span
            style={{
              backgroundColor: category.color + '22',
              color: category.color,
              border: `1px solid ${category.color}44`,
              borderRadius: 20,
              padding: '1px 8px',
              fontSize: 10,
              fontWeight: 800,
            }}
          >
            {category.sops.length} {category.sops.length === 1 ? 'SOP' : 'SOPs'}
          </span>
        </div>
        <div style={{ color: C.muted2, flexShrink: 0 }}>
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* SOP list */}
      {open && (
        <div
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {category.sops.map((sop, i) => (
            <SOPCard key={i} sop={sop} accent={category.color} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MBSOPsTab() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '28px 20px 60px',
        color: C.text,
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              color: C.text,
              fontSize: 22,
              fontWeight: 900,
              margin: '0 0 6px',
              letterSpacing: '-0.4px',
            }}
          >
            SOP Master Index
          </h1>
          <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
            SOPs live on ClickUp and Drive. When stuck:{' '}
            <span style={{ color: C.text, fontWeight: 700 }}>portal</span>{' '}
            →{' '}
            <span style={{ color: C.text, fontWeight: 700 }}>Claude</span>{' '}
            →{' '}
            <span style={{ color: C.text, fontWeight: 700 }}>peer</span>{' '}
            →{' '}
            <span style={{ color: C.text, fontWeight: 700 }}>escalate.</span>
          </p>
        </div>

        {/* ── Notice banner ── */}
        <div
          style={{
            backgroundColor: '#1A1400',
            border: `1px solid ${C.acc}33`,
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>📌</span>
          <div style={{ fontSize: 12.5, color: '#bbb', lineHeight: 1.6 }}>
            <strong style={{ color: C.acc }}>Don't memorize these — know where to find them.</strong>{' '}
            Open the relevant SOP every time you're doing that task until you know it cold.
            All links open in ClickUp or Google Drive.
          </div>
        </div>

        {/* ── Category sections ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CATEGORIES.map((cat) => (
            <CategorySection key={cat.id} category={cat} />
          ))}
        </div>

      </div>
    </div>
  );
}
