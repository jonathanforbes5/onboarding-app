'use client';
import React from 'react';

const STEPS = [
  {
    num: '1',
    title: 'What is the actual issue?',
    detail: 'State the problem in one sentence. Not the symptom — the underlying issue. "Cost per appt is $420 vs $262 target" is better than "client is upset".',
  },
  {
    num: '2',
    title: 'Where could the answer already exist?',
    detail: 'Portal search (Cmd+K). The chatbot. Your section notes. Recent #manager-discussion threads. SOPs. Other pod managers\' Slack history. Search BEFORE asking.',
  },
  {
    num: '3',
    title: 'What have you already tried?',
    detail: 'List your debugging steps. "I checked X, ruled out Y, looked at Z." This shows your thinking and saves the responder time. No tries listed = you didn\'t try.',
  },
  {
    num: '4',
    title: 'Who is the right person?',
    detail: 'Use the Who-To-Go-To matrix. Specialist for execution. Pod peers for how-tos. Jon for blockers. Oscar for mindset. Don\'t ping a director for a how-to.',
  },
  {
    num: '5',
    title: 'What is your proposed solution?',
    detail: 'Lead with the issue, FOLLOW WITH THE PROPOSED ACTION. "X is happening — I think we should Y because Z. Confirm or redirect?" This is the bar.',
  },
];

const BAD = [
  { type: 'Bad', text: '"Hey can I jump on a quick call?"' },
  { type: 'Bad', text: '"Klaus is having issues, what should I do?"' },
  { type: 'Bad', text: '"This account is bad, help"' },
];

const GOOD = [
  { type: 'Good', text: '"Klaus Larsen — CPA $358 vs $435 goal but Freq 3.24, CTR dropping. I asked Taylor for new creatives, he sent 10. Plan: ship them Monday + reduce budget 20% pending eval. OK?"' },
  { type: 'Good', text: '"Vita Roofing — 5 open leads, cycle ends in 3 days, behind by 1 booking. Already pinged Leila. Plan to extend cycle 2 days if VAs convert 3+. Approve?"' },
];

export function AskAQuestion() {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        {STEPS.map((s) => (
          <div key={s.num} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-yellow text-brand-black flex items-center justify-center font-black text-sm flex-shrink-0">
              {s.num}
            </div>
            <div className="flex-1 bg-white rounded-xl border border-brand-gray-mid px-3 py-2">
              <div className="font-black text-sm text-brand-black">{s.title}</div>
              <div className="text-xs text-brand-gray mt-0.5">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-red-300 bg-red-50 p-3">
          <div className="font-black text-xs uppercase tracking-widest text-red-800 mb-2">Bad — don&apos;t do this</div>
          <ul className="space-y-1.5">
            {BAD.map((b, i) => (
              <li key={i} className="text-xs text-red-900">✕ {b.text}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-green-300 bg-green-50 p-3">
          <div className="font-black text-xs uppercase tracking-widest text-green-800 mb-2">Good — this is the bar</div>
          <ul className="space-y-1.5">
            {GOOD.map((g, i) => (
              <li key={i} className="text-xs text-green-900">✓ {g.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-brand-black p-4 text-white">
        <div className="font-black text-xs uppercase tracking-widest text-brand-yellow mb-1.5">The rule</div>
        <div className="text-sm leading-relaxed">
          Lead with the issue. <strong>Follow with the proposed solution.</strong> Asking for permission to act is faster than asking what to do.
        </div>
      </div>
    </div>
  );
}
