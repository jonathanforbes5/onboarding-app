'use client';
import React, { useState } from 'react';

type Pod = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'ALL';

interface Row {
  need: string;
  firstTry: string;
  ifStuck: string;
  perPod?: Partial<Record<Pod, { firstTry: string; ifStuck: string }>>;
  detail: string;
}

const ROWS: Row[] = [
  {
    need: 'GHL setup / A2P / new account build',
    firstTry: 'Emmanuel (Full-Cycle MB)',
    ifStuck: 'Mervin (overflow)',
    detail: 'Task via ClickUp. Include: client name, GHL sub-account link, 48hr deadline. Emmanuel is the lead — Mervin handles overflow at the same tier.',
  },
  {
    need: 'Meta campaign execution / optimisation',
    firstTry: 'Your pod\'s media buyer',
    ifStuck: 'Emmanuel or Mervin',
    perPod: {
      P1: { firstTry: 'Mervin or Emmanuel',  ifStuck: 'Jonathan' },
      P2: { firstTry: 'Bren (Pod 2)',         ifStuck: 'Emmanuel' },
      P3: { firstTry: 'Mervin or Emmanuel',  ifStuck: 'Jonathan' },
      P4: { firstTry: 'Mervin or Emmanuel',  ifStuck: 'Jonathan' },
      P5: { firstTry: 'Mervin or Emmanuel',  ifStuck: 'Jonathan' },
    },
    detail: 'Always delegate the build to the media buyer — never do the click-work yourself. They are who you task to ACTUALLY do the work.',
  },
  {
    need: 'Creative — new ads, refresh, fatigue',
    firstTry: 'Source organic FIRST (client, FB page, IG, GMB, Yelp, website)',
    ifStuck: 'Ken (only as gap-filler)',
    detail: 'Ken is a substitute, not a default. Always try organic content from the client first — be persistent and specific in what you ask for. Then check their public assets (Yelp, Yellow Pages, GMB, Facebook, Instagram, website). Use Ken to fill gaps with AI-generated images that combine with organic.',
  },
  {
    need: 'VA quality, speed, qualification issues',
    firstTry: 'Leila (Head of VA)',
    ifStuck: 'Aica / Pamela',
    detail: 'NEVER escalate to individual VAs. All VA issues route through Leila — she also controls Logbook access.',
  },
  {
    need: 'How-to / process / "how do I do X"',
    firstTry: 'Search the portal first, then other pod managers',
    ifStuck: 'Jonathan',
    detail: 'Other MOMs are your fastest peer resource for tactical how-tos. Use Oscar/Jon for problem-solving guidance, not how-tos.',
  },
  {
    need: 'Sales-set expectation mismatch (client says "I was promised X")',
    firstTry: 'Original closer first',
    ifStuck: 'Mani',
    detail: 'Always talk to the closer first to understand what was actually said. Only loop Mani after you have that context — he is the call of last resort on closer accountability.',
  },
  {
    need: 'Client about to churn / relationship at risk',
    firstTry: 'Jonathan immediately',
    ifStuck: 'Loop in Oscar',
    detail: 'Group chat: you + Jon + (Oscar if escalated) + previous AM if relevant. Jon needs to know BEFORE the client calls him.',
  },
  {
    need: 'Mindset / prioritisation / strategy',
    firstTry: 'Oscar or Jonathan',
    ifStuck: '—',
    detail: 'Use Oscar/Jon for guidance on HOW to think about a problem, not for the operational answer. Build your own problem-solving instincts.',
  },
  {
    need: 'Cycle billing / payment refusal / contract issue',
    firstTry: 'Jonathan',
    ifStuck: 'Oscar (finance lead)',
    detail: 'Bring data: cycle dates, target vs actual, signed contract clauses. Don\'t bring the problem — bring the proposed action.',
  },
  {
    need: 'Anything truly urgent / on-fire',
    firstTry: 'Group chat — all relevant people',
    ifStuck: '—',
    detail: 'Group chat: you + Jon + Oscar + previous AM if relevant + the specialist whose work is involved. Faster than waterfall escalation.',
  },
];

const POD_LABELS: Record<Exclude<Pod, 'ALL'>, string> = {
  P1: 'Pod 1 (Gianmarco / Gregory)',
  P2: 'Pod 2 (Cole / Tyler)',
  P3: 'Pod 3 (Kyle / Abdullah)',
  P4: 'Pod 4 (Sam)',
  P5: 'Pod 5 (Ksenia / Adeen)',
};

export function WhoToGoTo() {
  const [pod, setPod] = useState<Pod>('ALL');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {/* Pod selector */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setPod('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            pod === 'ALL' ? 'bg-brand-black text-brand-yellow' : 'bg-brand-gray-light text-brand-gray hover:bg-brand-gray-mid'
          }`}
        >Generic</button>
        {(Object.keys(POD_LABELS) as (keyof typeof POD_LABELS)[]).map((p) => (
          <button
            key={p}
            onClick={() => setPod(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              pod === p ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-light text-brand-gray hover:bg-brand-gray-mid'
            }`}
          >{POD_LABELS[p].split(' ')[0]} {POD_LABELS[p].split(' ')[1]}</button>
        ))}
      </div>

      <p className="text-xs text-brand-gray">
        Pick your pod to see your specific media buyer. Everyone else is the same across pods.
      </p>

      {/* Rows */}
      <div className="space-y-1.5">
        {ROWS.map((row, i) => {
          const open = openIdx === i;
          const override = pod !== 'ALL' ? row.perPod?.[pod] : undefined;
          const firstTry = override?.firstTry ?? row.firstTry;
          const ifStuck  = override?.ifStuck  ?? row.ifStuck;

          return (
            <div key={row.need} className="rounded-xl border border-brand-gray-mid bg-white overflow-hidden">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full text-left px-3 py-2.5 flex items-start gap-3 hover:bg-brand-gray-light transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm text-brand-black">{row.need}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5 text-xs">
                    <span className="bg-brand-yellow text-brand-black px-2 py-0.5 rounded font-bold">
                      → {firstTry}
                    </span>
                    {ifStuck !== '—' && (
                      <span className="bg-brand-gray-light text-brand-gray px-2 py-0.5 rounded font-bold">
                        if stuck: {ifStuck}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-brand-gray flex-shrink-0 mt-1">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="px-3 pb-3 -mt-1 text-xs text-brand-gray border-t border-brand-gray-light pt-2">
                  {row.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
