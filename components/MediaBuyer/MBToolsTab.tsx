'use client';
import React from 'react';

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

interface Tool {
  name: string;
  description: string;
  url?: string;
  note?: string;
  category: 'base' | 'new';
}

const TOOLS: Tool[] = [
  // New tools — shown first, highlighted
  {
    name: 'RoofIgnite Studio',
    description: 'In-house software to produce visually diverse creative — cheap to produce.',
    note: "SOP'd — start with Michael Dallara's overview Looms.",
    category: 'new',
  },
  {
    name: 'Arc Ads',
    description: 'AI influencers to execute the Meta Andromeda playbook. Heavier on time but worth it.',
    note: "SOP'd — follow the Andromeda Playbook.",
    category: 'new',
  },
  {
    name: 'GHL Setup Wizard',
    description: 'Replaces old manual in-GHL setup. Cuts setup from ~60 min to ~5–10 min. Handles GHL, Namesilo, and Cloudflare automatically.',
    url: 'https://dashboard.roofignite.com',
    note: 'Built by Cole. Use this for all new account setups.',
    category: 'new',
  },
  // Base tools
  {
    name: 'Meta Business Suite',
    description: 'Ad account, campaigns, creative, pixel.',
    category: 'base',
  },
  {
    name: 'GoHighLevel (GHL)',
    description: 'Snapshot setup, custom values, calendar, landing pages.',
    category: 'base',
  },
  {
    name: 'Canva',
    description: 'Editing single, two-fold, and tri-fold creatives.',
    category: 'base',
  },
  {
    name: 'Google Workspace',
    description: 'Docs, Drive — SOPs, client docs, resources.',
    category: 'base',
  },
  {
    name: 'Loom',
    description: 'Recorded SOP walkthroughs and training videos.',
    category: 'base',
  },
  {
    name: 'Slack',
    description: 'All internal communication. #internal-team, #ops-manager-discussion, #media-buyers.',
    category: 'base',
  },
  {
    name: 'ClickUp',
    description: 'Where your action items and tasks live.',
    category: 'base',
  },
  {
    name: 'Namesilo',
    description: 'Domains — replaces Porkbun (allows API domain purchases).',
    category: 'base',
  },
  {
    name: 'Cloudflare',
    description: 'DNS / CNAME linking for domain setup.',
    category: 'base',
  },
  {
    name: 'CapCut',
    description: 'Light video creative edits.',
    category: 'base',
  },
  {
    name: 'Fathom',
    description: 'Call and meeting recordings.',
    category: 'base',
  },
  {
    name: 'Ad Set Reviewer',
    description: 'Reviewing ad sets for performance.',
    url: 'https://ad-set-reviewer.vercel.app/',
    category: 'base',
  },
];

const newTools = TOOLS.filter((t) => t.category === 'new');
const baseTools = TOOLS.filter((t) => t.category === 'base');

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

interface NewToolCardProps {
  tool: Tool;
}

function NewToolCard({ tool }: NewToolCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#141000',
        border: `1px solid ${C.acc}44`,
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
        <h3
          style={{
            color: C.text,
            fontSize: 14,
            fontWeight: 800,
            margin: 0,
            letterSpacing: '-0.1px',
          }}
        >
          {tool.name}
        </h3>
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: C.acc,
              color: '#000',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Open <ExternalLinkIcon />
          </a>
        )}
      </div>

      <p style={{ color: '#bbb', fontSize: 13, margin: '0 0 10px', lineHeight: 1.55 }}>
        {tool.description}
      </p>

      {tool.note && (
        <div
          style={{
            backgroundColor: C.acc + '12',
            border: `1px solid ${C.acc}2A`,
            borderRadius: 7,
            padding: '7px 10px',
            fontSize: 12,
            color: C.acc,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ fontWeight: 800 }}>Note: </strong>
          <span style={{ color: '#c8a800' }}>{tool.note}</span>
        </div>
      )}
    </div>
  );
}

interface BaseToolCardProps {
  tool: Tool;
}

function BaseToolCard({ tool }: BaseToolCardProps) {
  const inner = (
    <div
      style={{
        backgroundColor: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, background-color 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 5 }}>
        <span style={{ color: C.text, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>
          {tool.name}
        </span>
        {tool.url && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              fontSize: 11,
              fontWeight: 700,
              color: C.muted,
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            Open <ExternalLinkIcon />
          </span>
        )}
      </div>
      <span style={{ color: C.muted, fontSize: 12, lineHeight: 1.55 }}>
        {tool.description}
      </span>
    </div>
  );

  if (tool.url) {
    return (
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={(e) => {
          const card = e.currentTarget.querySelector('div') as HTMLElement | null;
          if (card) {
            card.style.borderColor = C.acc + '55';
            card.style.backgroundColor = C.surf2;
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget.querySelector('div') as HTMLElement | null;
          if (card) {
            card.style.borderColor = C.border;
            card.style.backgroundColor = C.surf;
          }
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      onMouseEnter={(e) => {
        (e.currentTarget.querySelector('div') as HTMLElement).style.borderColor = C.border2;
        (e.currentTarget.querySelector('div') as HTMLElement).style.backgroundColor = C.surf2;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.querySelector('div') as HTMLElement).style.borderColor = C.border;
        (e.currentTarget.querySelector('div') as HTMLElement).style.backgroundColor = C.surf;
      }}
    >
      {inner}
    </div>
  );
}

export function MBToolsTab() {
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
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              color: C.text,
              fontSize: 22,
              fontWeight: 900,
              margin: '0 0 6px',
              letterSpacing: '-0.4px',
            }}
          >
            Tools
          </h1>
          <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
            Every tool in your stack. New tools are SOP'd — start there before going manual.
          </p>
        </div>

        {/* ── New Tools ── */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              backgroundColor: '#141000',
              border: `1px solid ${C.acc}44`,
              borderRadius: 16,
              padding: '20px 22px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* top accent bar */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                backgroundColor: C.acc,
                borderRadius: '16px 16px 0 0',
              }}
            />

            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16 }}>✨</span>
                <span
                  style={{
                    color: C.acc,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: '-0.1px',
                  }}
                >
                  New Tools
                </span>
                <span
                  style={{
                    backgroundColor: C.acc,
                    color: '#000',
                    borderRadius: 20,
                    padding: '2px 9px',
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Start here
                </span>
              </div>
              <span style={{ color: C.muted2, fontSize: 12 }}>{newTools.length} tools</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 12,
              }}
            >
              {newTools.map((tool) => (
                <NewToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Base Tools ── */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <div style={{ width: 3, height: 14, backgroundColor: C.muted2, borderRadius: 2 }} />
            <span
              style={{
                color: C.muted,
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Base Tools
            </span>
            <span style={{ color: C.muted2, fontSize: 11 }}>· {baseTools.length} tools</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 8,
            }}
          >
            {baseTools.map((tool) => (
              <BaseToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
