'use client';
import React from 'react';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

interface VideoSection {
  num: string;
  duration: string;
  title: string;
  whatToCover: string[];
  watchOut: string;
}

const SECTIONS: VideoSection[] = [
  {
    num: '1',
    duration: '~15 sec',
    title: 'Intro',
    whatToCover: [
      'Greet by first name. Use the business name.',
      'Tell them what they\'re about to see (the ads, landing page, survey, booking flow).',
      'State the deadline + launch date explicitly. "Reply with approval or changes by Friday — we launch Monday."',
    ],
    watchOut: 'Don\'t hedge. No "hopefully" or "we think this might work." You\'re the expert. You built this. Stand behind it.',
  },
  {
    num: '2',
    duration: '~1 min',
    title: 'The Ad Creatives',
    whatToCover: [
      'Show every approved ad variant — image / video, headline, primary text.',
      'Explain WHY you chose each angle (storm, financing, free roof inspection, etc.).',
      'Mention the placements (FB Feed, IG Feed, Stories, Reels — the 6 approved).',
      'If you used Ken AI-generated creative, say so explicitly so they know.',
    ],
    watchOut: 'If creative came from their public assets (Yelp / GMB / Facebook), name the source so they don\'t panic about copyright.',
  },
  {
    num: '3',
    duration: '~1 min',
    title: 'The Landing Page',
    whatToCover: [
      'Click the actual ad → land on the page. Walk through it as a homeowner would.',
      'Show the hero, the trust signals, the value proposition.',
      'Hover over anything custom (their logo, their phone number, their service area).',
    ],
    watchOut: 'Confirm the phone number on the LP is YOUR tracking number, not their main line. Phone-number issues are the #1 launch-day surprise.',
  },
  {
    num: '4',
    duration: '~1 min',
    title: 'The Survey',
    whatToCover: [
      'Walk through every survey question they\'ll see.',
      'Explain WHY each question is there ("we filter out renters at this step", "this question disqualifies anyone outside your service area", etc.).',
      'Show the OSA logic if you\'re excluding zips.',
    ],
    watchOut: 'Clients later complain "the leads suck" 90% of the time when they didn\'t see the survey upfront. Walking through it now pre-handles that objection.',
  },
  {
    num: '5',
    duration: '~30 sec',
    title: 'The Booking + Reminder Flow',
    whatToCover: [
      'Show the calendar embed — what days/times are bookable.',
      'Show the confirmation email and SMS template.',
      'Mention the 24h, 1h, day-of reminder cadence.',
      'Say who\'s calling the leads and how fast (Leila\'s VA team, < 5 min speed-to-lead).',
    ],
    watchOut: 'Confirm the calendar is connected to THEIR calendar (Google / Outlook). Double-bookings on day 1 destroy trust.',
  },
  {
    num: '6',
    duration: '~30 sec',
    title: 'The CRM / Where Leads Land',
    whatToCover: [
      'Show the GHL pipeline — qualified → contacted → booked → showed → sold.',
      'Show that they have access (or the team member they nominated does).',
      'Mention where they can pull reports themselves so they don\'t have to ask you.',
    ],
    watchOut: 'If they don\'t have GHL access yet, send the invite IMMEDIATELY after the call. Never tell them "I\'ll set you up later."',
  },
  {
    num: '7',
    duration: '~15 sec',
    title: 'Outro — The Ask',
    whatToCover: [
      'Restate the deadline + launch date.',
      'Make the ask binary: "Reply with the word APPROVED, or list any changes you want."',
      'Tell them what happens next ("Once you approve, ads go live by [time/date].").',
    ],
    watchOut: 'Don\'t end with "let me know what you think". That invites unstructured feedback. Force a binary: approve, or specific changes.',
  },
];

const DOS = [
  'State the deadline + launch date out loud',
  'Walk every survey question with the WHY',
  'Confirm phone number is the tracking number, not their main line',
  'Show the pipeline + invite them in',
  'End with a binary ask: approve or list changes',
];

const DONTS = [
  'Hedge ("hopefully", "we think", "this might work")',
  'Skip the survey because "they won\'t care"',
  'Ask for "thoughts" — that invites scope-creep feedback',
  'Promise a launch date you haven\'t confirmed with the media buyer',
  'Talk for more than 5 minutes (they will skip)',
];

const PRECHECK = [
  'GHL setup is COMPLETE (A2P approved, calendar connected, automations live)',
  'Ad creatives are uploaded and approved internally',
  'Landing page is on the right pixel + tracking number',
  'Survey is the agreed length (4q vs 7q per the cycle plan)',
  'You\'ve confirmed the launch date with Emmanuel/Mervin',
  'Loom is set to <5 min — script the bullets above before recording',
];

export function ApprovalVideoSOP() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-brand-yellow p-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60 mb-1">Why this video matters</div>
        <div className="text-sm text-brand-black leading-relaxed">
          Half the &quot;your leads suck&quot; conversations mid-cycle are pre-handle-able right here. Clients who saw the survey, the LP, and the funnel BEFORE launch don&apos;t get to claim surprise later. Skip this video and you&apos;re booking yourself a save call in 14 days.
        </div>
      </div>

      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Before You Hit Record — Pre-Check</h4>
        <div className="rounded-xl border border-brand-gray-mid bg-white p-3 space-y-1">
          {PRECHECK.map((p) => (
            <div key={p} className="flex items-start gap-2 text-xs">
              <span className="text-green-600 flex-shrink-0">☐</span>
              <span className="text-brand-black">{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">The 7-Section Structure (~5 min total)</h4>
        <div className="space-y-1.5">
          {SECTIONS.map((s) => (
            <div key={s.num} className="rounded-xl border border-brand-gray-mid bg-white overflow-hidden">
              <div className="flex items-center gap-3 px-3 py-2 bg-brand-black text-white">
                <div className="w-7 h-7 rounded-lg bg-brand-yellow text-brand-black text-xs font-black flex items-center justify-center flex-shrink-0">
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm">{s.title}</div>
                  <div className="text-[10px] text-white/60">{s.duration}</div>
                </div>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                <ul className="space-y-1">
                  {s.whatToCover.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-brand-black">
                      <span className="text-brand-yellow flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-red-700 italic border-l-2 border-red-300 pl-2 mt-1.5">
                  Watch out: {s.watchOut}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-green-300 bg-green-50 p-3">
          <div className="font-black text-xs uppercase tracking-widest text-green-800 mb-2">Do</div>
          <ul className="space-y-1.5">
            {DOS.map((d) => (
              <li key={d} className="text-xs text-green-900 flex items-start gap-2">
                <span className="flex-shrink-0">✓</span><span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-300 bg-red-50 p-3">
          <div className="font-black text-xs uppercase tracking-widest text-red-800 mb-2">Don&apos;t</div>
          <ul className="space-y-1.5">
            {DONTS.map((d) => (
              <li key={d} className="text-xs text-red-900 flex items-start gap-2">
                <span className="flex-shrink-0">✕</span><span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Reference example</h4>
        <LoomSlot
          slotKey="s06_approval_video_example"
          title="Approval video — gold-standard example"
          subtitle="A reference recording you can copy structure from"
          recordedBy="Cole or Tyler"
          length="~5 min"
        />
      </div>
    </div>
  );
}
