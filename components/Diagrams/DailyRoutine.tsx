'use client';
import React from 'react';

interface Step {
  time: string;
  what: string;
  detail: string;
}

const STEPS: Step[] = [
  {
    time: '0–10 min',
    what: 'Communication triage',
    detail: 'Open phone. Slack first — every unread thread gets a quick read. Emails next — 80% will be auto-responses or low-priority. Reply to anything you can in under 30 seconds. Anything bigger gets a "I see this, replying by [time]" placeholder so the sender knows you\'re alive.',
  },
  {
    time: '10–20 min',
    what: 'Command Centre check',
    detail: 'Open the dashboard. Scan all your accounts top-down. Note: any reds that flipped overnight, any oranges that are trending wrong, any greens with a Layer 2 metric drifting. Make a mental list of who needs eyes today.',
  },
  {
    time: '20–30 min',
    what: 'ClickUp triage',
    detail: 'Tasks assigned to you (you\'re owner). Tasks waiting on you (you\'re reviewer). Tasks waiting on others (chase if past deadline). New tasks from yesterday\'s meeting that need writing.',
  },
  {
    time: '30 min – noon',
    what: 'Meeting prep OR action item execution',
    detail: 'If you have meetings today: prep. Bring data, not opinions. If you don\'t: execute on the open action items, prioritised by client risk (red > orange > green). Coordinate with specialists via ClickUp tasks — never via Slack DM.',
  },
  {
    time: 'Noon – end of day',
    what: 'Client work + proactive outreach',
    detail: 'Onboarding calls if scheduled. Cycle reviews. Proactive client check-ins (don\'t wait for them to message — message them first when results are good AND when they\'re bad). Document everything in the per-client channel.',
  },
  {
    time: 'End of day',
    what: 'Close-out',
    detail: 'Anything you said you\'d send today — send it. Anything you owe a response on — respond. Final scan of Command Centre — anything red that should be on tomorrow\'s morning radar?',
  },
];

export function DailyRoutine() {
  return (
    <div className="space-y-1.5">
      {STEPS.map((s, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-brand-black text-brand-yellow text-[10px] font-black flex flex-col items-center justify-center">
              <span className="leading-tight">{s.time.split('–')[0].trim()}</span>
              {s.time.includes('–') && <span className="text-[8px] opacity-60">to {s.time.split('–')[1]?.trim()}</span>}
            </div>
            {i < STEPS.length - 1 && <div className="w-0.5 flex-1 bg-brand-gray-mid my-1 min-h-[16px]" />}
          </div>
          <div className="flex-1 bg-white rounded-xl border border-brand-gray-mid px-3 py-2 mb-1">
            <div className="font-black text-sm text-brand-black">{s.what}</div>
            <div className="text-xs text-brand-gray mt-0.5 leading-relaxed">{s.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
