'use client';
import React, { useState } from 'react';
import { MARKET_ENTRIES, TIER_COLORS, TIER_LABELS, type DifficultyTier } from '@/data/marketDifficulty';

const TIER_ORDER: DifficultyTier[] = ['avoid', 'hard', 'great', 'unknown'];

const TIER_DESC: Record<DifficultyTier, string> = {
  avoid:   'Refuse the deal. We have not made these markets work.',
  hard:    'Proceed only with very clear expectations + elevated pricing. Higher CPA tolerance built into goal.',
  great:   'Typical CPA $225–$250 or even better. Default markets where the model works cleanly.',
  easy:    'Typical CPA $225–$250 or even better. Default markets where the model works cleanly.',
  unknown: 'No data — we have never run a full cycle here. Treat as Hard until proven otherwise.',
};

export function MarketDifficulty() {
  const [tier, setTier] = useState<DifficultyTier>('avoid');
  const filtered = MARKET_ENTRIES.filter(e => (tier === 'great' ? e.tier === 'great' || e.tier === 'easy' : e.tier === tier));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIER_ORDER.map(t => {
          const count = MARKET_ENTRIES.filter(e => (t === 'great' ? e.tier === 'great' || e.tier === 'easy' : e.tier === t)).length;
          const isActive = tier === t;
          return (
            <button
              key={t}
              onClick={() => setTier(t)}
              className="rounded-xl px-3 py-2 text-left transition-all"
              style={{
                backgroundColor: isActive ? TIER_COLORS[t] : '#fff',
                color: isActive ? '#fff' : '#111',
                border: `2px solid ${TIER_COLORS[t]}`,
                outline: isActive ? '2px solid #F5C800' : 'none',
                outlineOffset: 1,
              }}
            >
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">{TIER_LABELS[t]}</div>
              <div className="font-black text-lg">{count}</div>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl p-3" style={{ backgroundColor: TIER_COLORS[tier] + '11', border: `1px solid ${TIER_COLORS[tier]}55` }}>
        <div className="text-xs font-bold mb-1" style={{ color: TIER_COLORS[tier] }}>{TIER_LABELS[tier].toUpperCase()}</div>
        <div className="text-xs text-brand-black/80">{TIER_DESC[tier]}</div>
      </div>

      <div className="space-y-1.5">
        {filtered.map(e => (
          <div key={e.area} className="rounded-xl bg-white border border-brand-gray-mid px-3 py-2">
            <div className="font-black text-sm text-brand-black">{e.area}</div>
            {e.note && <div className="text-xs text-brand-gray mt-0.5">{e.note}</div>}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-xs text-brand-gray text-center py-4">No entries.</div>
        )}
      </div>

      <div className="text-[10px] text-brand-gray italic">
        Data direct from Oscar. Update <span className="font-mono">data/marketDifficulty.ts</span> when the picture changes.
      </div>
    </div>
  );
}
