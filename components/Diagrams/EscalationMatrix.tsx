'use client';
import React from 'react';

interface Tier {
  level: string;
  trigger: string;
  whoToContact: string;
  how: string;
  rule: string;
  bg: string;
  accent: string;
}

const TIERS: Tier[] = [
  {
    level: 'Tier 0',
    trigger: 'Tactical "how do I do this" question',
    whoToContact: 'Portal search → other pod managers',
    how: 'Search the portal (Cmd+K) first. Then ask in #manager-discussion. Don\'t ping a director for a how-to.',
    rule: 'Self-serve before escalating. Other MOMs are your fastest peer resource.',
    bg: '#F5F5F5',
    accent: '#666',
  },
  {
    level: 'Tier 1',
    trigger: 'Specialist needs to do work — campaign change, GHL fix, creative refresh',
    whoToContact: 'The specialist directly (ClickUp task)',
    how: 'ClickUp task with: client name, what changed, deadline. Don\'t escalate up before tasking down.',
    rule: 'Delegate the work, don\'t do it yourself. You are the quarterback.',
    bg: '#FEF7CD',
    accent: '#A88A00',
  },
  {
    level: 'Tier 2',
    trigger: 'Sales-set expectation mismatch (client says "I was told X")',
    whoToContact: '1) Original closer  →  2) Mani',
    how: 'Always talk to the closer FIRST to find out what was actually said. ONLY loop Mani after you have that context.',
    rule: 'Mani is for closer-accountability calls, not for translating what was said on the call.',
    bg: '#DBEAFE',
    accent: '#1E40AF',
  },
  {
    level: 'Tier 3',
    trigger: 'Account is red 3+ days, missed cycle target, or VA process is broken',
    whoToContact: 'Jonathan',
    how: 'Bring: cycle data, what you\'ve already tried, your proposed next action. Lead with the issue, follow with the proposed solution.',
    rule: 'Jon needs the diagnosis — not the raw problem. Show your thinking.',
    bg: '#FFE4E6',
    accent: '#9F1239',
  },
  {
    level: 'Tier 4',
    trigger: 'Client at risk of churn / threatening to cancel / relationship is on fire',
    whoToContact: 'Jonathan immediately + loop Oscar in group chat',
    how: 'Group chat: you + Jon + Oscar + previous AM (if relevant). Jon needs to know BEFORE the client calls him.',
    rule: 'On-fire = group chat, not waterfall. Speed > formal process.',
    bg: '#FEE2E2',
    accent: '#991B1B',
  },
  {
    level: 'Tier 5',
    trigger: 'Mindset, prioritisation, "how do I think about this"',
    whoToContact: 'Oscar or Jonathan',
    how: 'Use them for HOW to think — not for the operational answer. Build your own instincts over time.',
    rule: 'Oscar/Jon are scarce resources. Use them for level-up, not for unblocking.',
    bg: '#000',
    accent: '#F5C800',
  },
];

export function EscalationMatrix() {
  return (
    <div className="space-y-2">
      {TIERS.map((t) => {
        const isDark = t.bg === '#000';
        return (
          <div
            key={t.level}
            className="rounded-xl p-3"
            style={{ backgroundColor: t.bg, border: `1px solid ${t.accent}40` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
                style={{ backgroundColor: t.accent, color: isDark ? '#000' : '#fff' }}
              >
                {t.level}
              </span>
              <span className="font-black text-sm" style={{ color: isDark ? '#fff' : '#111' }}>
                {t.trigger}
              </span>
            </div>
            <div className="text-xs space-y-1.5" style={{ color: isDark ? '#fff' : '#111' }}>
              <div>
                <span className="font-black uppercase tracking-widest text-[10px] opacity-60">Who → </span>
                <span className="font-bold">{t.whoToContact}</span>
              </div>
              <div>
                <span className="font-black uppercase tracking-widest text-[10px] opacity-60">How → </span>
                <span style={{ color: isDark ? '#fff' : '#444' }}>{t.how}</span>
              </div>
              <div className="italic" style={{ color: isDark ? t.accent : '#666' }}>
                {t.rule}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
