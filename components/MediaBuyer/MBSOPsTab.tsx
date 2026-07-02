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
        url: 'https://drive.google.com/drive/folders/190jk7W-dte9u0KO7u1Ug5xTJxmaI9Q_E?usp=drive_link',
      },
      {
        title: 'R.LTD Service Delivery SOP',
        description: 'One-time setup tutorial for Pillar 1 (needs updating).',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1EVh5t1JYFsyyAdw0XBEQdarLayi7JIjknTc4DL8Zb2k/edit?usp=sharing',
      },
      {
        title: 'R.LTD Client Ongoing Management SOP',
        description: 'Many Looms for common Pillar 2 action steps. Reference the Training Library tab inside.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1PRNfivI7vq0gqNT4YSBlwo1m93GUERF6gWR9fQQ5gqY/edit?usp=sharing',
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
        url: 'https://docs.google.com/document/d/1T9aEbXitLV6XZkRCnYD8_7CX3_isp6okUEIxipZIGpQ/edit?usp=sharing',
      },
      {
        title: 'RoofIgnite V3 Landing Page (LP V3): GHL Buildout SOP',
        description: 'V3 LP buildout inside GHL.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1nzVN4jf_EoywPWHvigzlEnDHlPnYk2dQSQVZFWuYEi8/edit?usp=sharing',
      },
      {
        title: 'Switching to 4Q Survey',
        description: 'Switch from default 7-question to 4-question survey for markets where landing-page conversion is low.',
        owner: 'Emmanuel',
        url: 'https://docs.google.com/document/d/1p1jzjcZCeMhvkrYXEiezutE7JPxgOwKi84Acs_nXbSg/edit?usp=sharing',
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
        url: 'https://drive.google.com/file/d/1cp4dKeQOW2H0AURfWNefBOY1YpUqHAeK/view?usp=sharing',
      },
      {
        title: 'Creative Construction Mastery SOP',
        description: 'Written SOP + Loom of Oscar building ads; the psychology behind creative.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1CMJ-s4BwXIp7pAU_vSKYU54RZlnrqb0RXlYJujg8Gxo/edit?usp=sharing',
      },
      {
        title: 'RI.LTD Andromeda Creative Diversification Playbook',
        description: 'Before/after examples + step-by-step edit tutorials for testimonial, drone, and talking-head ads.',
        owner: 'Oscar',
        url: 'https://docs.google.com/document/d/1du8s7ylQDfBi4zqHWXF2VF2nt8LodggjiKxcKW3pLWU/edit?usp=sharing',
      },
      {
        title: 'RoofIgnite Studio — Creative Format Library + SOP',
        description: 'In-house local creative builder: pick angle → format → plug in copy + assets → export. Formats: iMessage Testimonial, Notes-app Confession, Google Review Highlight, Two-Quotes Split, The Receipt, and more. Start with Michael Dallara\'s 2 overview Looms.',
        owner: 'Michael Dallara',
        url: 'https://docs.google.com/document/d/1K9rVhomXWGcCJi3tGl_9QOi6G19dxK7mDERzX8V5m8M/edit?usp=sharing',
      },
      {
        title: 'RoofIgnite AI Video SOP',
        description: 'Systemizes AI video production for creative diversity. Edit AI UGC videos in CapCut, use ArcAds for UGC actors, and revive dying winners with hook tests, copy/headline swaps, and clean dupes.',
        owner: 'Michael Dallara',
        url: 'https://docs.google.com/document/d/1dIN8VlaI-G26J_gM8FkZnPuAidaLpU1iF4jLyS8Z5mI/edit?usp=sharing',
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
        url: 'https://docs.google.com/document/d/1UdHQXz-i7T5YfgS1aiVe7ycDYijudw1C8F0oMGr6mrU/edit?usp=sharing',
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
        url: 'https://docs.google.com/document/d/1RmLtprnhJxhY7asBbUSPuiahD4H8vbz_dIb42Y__wr0/edit?usp=sharing',
      },
      {
        title: 'Client Check-In System',
        description: 'Management fee, appointment expectations, contact info, account owner.',
        owner: 'Oscar',
        url: 'https://docs.google.com/spreadsheets/d/15xYnNomoGM3bQn0TGsIaQaH7bks4ZY3_N3ESFJKIl1Q/edit?usp=sharing',
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
        url: 'https://drive.google.com/drive/folders/1Yls5gpC1dSTU4WhuQFzaOMcanBILRgiU?usp=drive_link',
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
        url: 'https://www.loom.com/share/014abf82664e4a6fa99b82cdd029c33d',
      },
      {
        title: 'Registering & deleting CNAME records (caller-ID fix)',
        description: 'Make business name on outbound calls match the sub-account. Check CNAME under Settings → Phone Numbers → Trust Center, register shortened name, remove already-registered CNAME via support-chat. Client examples: Trusted Home, Sharpline.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/c7d3c23fafcf42b8b9cc08ba47c0ca21',
      },
      {
        title: 'Installing our system on the client\'s own GHL sub-account',
        description: 'For the rare client who insists we build inside their own GHL agency sub-account. Covers client comms, admin access, and full asset transfer. Client example: Get Smart Construction.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/23404ec9af31419eb876682010fdd143',
      },
      {
        title: 'Auto-syncing leads into a client\'s CRM with Zapier — Roofr',
        description: 'Connect GHL → Google Sheet → client CRM. Includes field mapping for both 4Q and 7Q surveys. Client example: Madrid Roofing.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/d5c9c9141e824acab01946cc0b3d8030',
      },
      {
        title: 'Turning around a slow / low-quality account',
        description: 'Three fixes: (1) advanced pixel conditioning, (2) telling homeowners client will call an hour before appointment, (3) reading ad metrics vs. comparable account and rebuilding creatives. Client example: Kover Solutions.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/07dd1be8a96c4d60a936f30caf6cebcc',
      },
      {
        title: 'Moving an account onto an already-A2P-verified sub-account',
        description: 'When A2P won\'t verify: repurpose an old verified sub-account. Full asset transfer. Ask Oscar which verified account to use. Client example: Sharpline → Founders Roofing.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/7f8322d24522419d885375cd7e2e2c1b',
      },
      {
        title: 'Auto-syncing leads into AccuLynx with Zapier (2-part)',
        description: 'Part 1 builds the Zap; Part 2 finishes once API key arrives. If you switch 7Q → 4Q, refresh Sheet headers and re-map. Client example: Brown Roofing.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/8a9d316d70f64f9d9b4ed95c3761ea3a',
        url2: 'https://www.loom.com/share/095fe1fe2e7a4486a164d030a08ea80b',
        url2Label: 'Part 2',
      },
      {
        title: 'Advanced pixel conditioning / Conversion API setup',
        description: 'Generate CAPI access token + data-set/pixel ID in Events Manager, build GHL workflow firing \'schedule\' conversion event on \'qualified\' tag. Tag good leads within ~7 days. Client example: Klaus Larsen Roofing.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/8625af65318a49aaa2ce69830df8f949',
      },
      {
        title: 'Tagging booked leads back into a client\'s CRM',
        description: 'Build GHL workflow that, on \'qualified\' tag, pushes contact through Sheet → Zap into their system with \'booked\' tag, duplicated per county/sub-account. Client example: US Shingle.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/9195143fae2b4eccbb9ad1cb64258879',
      },
      {
        title: 'Killing out-of-service-area leads with a survey gate',
        description: 'Add required first survey question that disqualifies immediately on \'no.\' Keep ad spend high enough — not $20/day. Client example: Everlast Roofing.',
        owner: 'Oscar',
        url: 'https://www.loom.com/share/3303b0f97948404fbb81b088acb31bcb',
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
          {sop.url2 && (
            <a
              href={sop.url2}
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
              {sop.url2Label ?? 'Part 2'} <ExternalLinkIcon />
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
