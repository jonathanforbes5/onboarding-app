'use client';
import React, { useState } from 'react';

interface OrgNode {
  name: string;
  title: string;
  dept?: string;
  color: string;
  reports?: OrgNode[];
  detail?: string;
}

const ORG: OrgNode = {
  name: 'Oscar',
  title: 'CEO',
  color: 'bg-brand-black text-white',
  detail: 'Vision and strategy. Final decision authority.',
  reports: [
    {
      name: 'Mani',
      title: 'Director of Sales',
      color: 'bg-brand-yellow text-brand-black',
      detail: 'Manages acquisition and sales team. Responsible for new client flow.',
      reports: [
        { name: 'Setters', title: 'Book sales calls', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Book qualified sales calls with potential clients.' },
        { name: 'Closers', title: 'Convert to clients', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Convert sales calls into paying clients.' },
        { name: 'Michael', title: 'B2B Ads Manager', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Manages our own B2B Meta ads that generate agency leads.' },
      ],
    },
    {
      name: 'Jonathan',
      title: 'Director of Operations',
      color: 'bg-brand-yellow text-brand-black',
      detail: 'Your direct manager. Runs Tuesday/Friday review calls. Escalate any account that has been red for 3+ days without resolution.',
      reports: [
        { name: 'YOU (Pod 4)', title: 'Sam & Patrick — Starting Apr 14', color: 'bg-brand-black text-white', detail: 'Pod 4 managers. 25–30 client accounts. Client relationship owners, performance diagnosticians, and retention drivers.' },
        { name: 'Pod 3', title: 'Kyle & Abdullah', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Launched March 25, 2026. ~3 weeks ahead of Pod 4 — great peer resource.' },
        { name: 'Pod 1', title: 'Gianmarco & Gregory', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Launched March 12, 2026.' },
        { name: 'Pod 2', title: 'Cole & Tyler', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Most experienced pod. Cole moved to an ops/systems role. Best resource for internal tooling questions.' },
        { name: 'Emmanuel', title: 'Full-Cycle Media Buyer + Setup Lead', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Handles ALL GHL account setups, A2P registration via A2P Wizard, landing pages, and ongoing campaign management. Task via ClickUp — never set up accounts yourself after training.' },
        { name: 'Mervin', title: 'Full-Cycle Media Buyer + Setup Support', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Same tier as Emmanuel. Supports setup overflow and ongoing media buying. Task via ClickUp just as you would Emmanuel.' },
        { name: 'Leila / Aica', title: 'VA Management', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Leila = Head of VA Management (also controls Logbook access). Aica = VA Manager supporting Leila. Escalate ALL VA quality issues to Leila, never to individual VAs.' },
        { name: 'Ken', title: 'Graphic Design & AI Creative', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Based in Philippines — 24-hour turnaround standard. Task via ClickUp with: brand info, target market, reference images, and due date. Plan ahead — never wait until something is urgent.' },
      ],
    },
  ],
};

interface NodeProps {
  node: OrgNode;
  onSelect: (n: OrgNode) => void;
  selected: string | null;
  depth?: number;
}

function OrgNodeBox({ node, onSelect, selected, depth = 0 }: NodeProps) {
  const isSelected = selected === node.name;
  return (
    <button
      onClick={() => onSelect(node)}
      className={`px-3 py-2 rounded-lg text-center text-xs font-bold transition-all hover:scale-105 active:scale-95 min-w-[80px] ${node.color} ${
        isSelected ? 'ring-2 ring-brand-yellow ring-offset-1' : ''
      }`}
    >
      <div className="font-black text-sm leading-tight">{node.name}</div>
      <div className="opacity-70 font-normal text-[10px] leading-tight mt-0.5">{node.title}</div>
    </button>
  );
}

export function OrgChart() {
  const [selected, setSelected] = useState<OrgNode | null>(null);

  const handleSelect = (n: OrgNode) => {
    setSelected(selected?.name === n.name ? null : n);
  };

  return (
    <div className="space-y-4 overflow-x-auto">
      {/* CEO */}
      <div className="flex justify-center">
        <OrgNodeBox node={ORG} onSelect={handleSelect} selected={selected?.name || null} />
      </div>

      {/* Vertical connector */}
      <div className="flex justify-center">
        <div className="w-0.5 h-5 bg-brand-gray-mid" />
      </div>

      {/* Directors */}
      <div className="flex justify-center gap-12">
        {ORG.reports?.map((dir) => (
          <div key={dir.name} className="flex flex-col items-center gap-2">
            <OrgNodeBox node={dir} onSelect={handleSelect} selected={selected?.name || null} />
            <div className="w-0.5 h-4 bg-brand-gray-mid" />
            {/* Horizontal line */}
            <div className="flex gap-2 flex-wrap justify-center max-w-xs">
              {dir.reports?.map((rep) => (
                <OrgNodeBox key={rep.name} node={rep} onSelect={handleSelect} selected={selected?.name || null} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected detail */}
      {selected && (
        <div className="bg-brand-black text-white rounded-xl p-4 animate-fade-in mt-2">
          <div className="font-black text-base">{selected.name}</div>
          <div className="text-brand-yellow text-sm mb-2">{selected.title}</div>
          <div className="text-sm text-white/80">{selected.detail}</div>
        </div>
      )}
      <p className="text-xs text-brand-gray text-center">Click any box for role details</p>
    </div>
  );
}
