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
      detail: 'Your direct manager. Operations infrastructure and pod scaling.',
      reports: [
        { name: 'YOU (Pod 3)', title: 'Pod Manager — Kyle & Abdullah', color: 'bg-brand-black text-white', detail: 'Pod leaders managing 30–40 accounts. Client relationship owners. Performance and retention drivers.' },
        { name: 'Pod 1', title: 'Gianmarco & Gregory', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Launched March 12, 2026. ~50–60 clients. Media Buyer: Raymond.' },
        { name: 'Pod 2', title: 'Cole & Tyler', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Experienced pod. ~60 clients. Media Buyer: Bren.' },
        { name: 'Emmanuel', title: 'Digital Marketer', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Campaign execution, optimization, and technical setup specialist.' },
        { name: 'Layla / Aika', title: 'VA Managers', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Manage virtual assistant team. Quality control for appointment setting.' },
        { name: 'Raymond / Bren', title: 'Pod Media Buyers', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Meta campaign execution & creative optimization per pod.' },
        { name: 'Ken', title: 'AI Creative & Design', color: 'bg-white border border-brand-gray-mid text-brand-black', detail: 'Handles AI-powered creative and graphic design for all pods.' },
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
