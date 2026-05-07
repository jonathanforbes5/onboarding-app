'use client';
import React, { useState } from 'react';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

interface VideoSection {
  num: string;
  duration: string;
  title: string;
  show: string;
  explain: string[];
  watchOut: string;
}

// Explicit "show this → explain this → watch out for that" framework. Drawn
// from the 3 reference Looms (Oscar / Cole / Tyler) — they all hit the same
// beats with their own delivery. The pattern: SHOW the artefact, EXPLAIN it
// while showing, then move on. Don't ask. Don't hedge.
const SECTIONS: VideoSection[] = [
  {
    num: '1',
    duration: '~10–15 sec',
    title: 'Hook + Intro',
    show: 'Yourself, on camera, energy on.',
    explain: [
      'Greet by first name. Use the business name.',
      'State what they\'re about to see (photos → ads → landing page → survey → booking → CRM).',
      'State the deadline + launch date explicitly. "Reply with approval or changes by Friday — we launch Monday."',
    ],
    watchOut: 'Don\'t hedge. No "hopefully" or "we think this might work." You built this. Stand behind it.',
  },
  {
    num: '2',
    duration: '~30–45 sec',
    title: 'Show the Photos / Creatives',
    show: 'Cycle through every approved image / video used in the ad set.',
    explain: [
      'Mix of real (their assets, public photos from FB/IG/GMB/Yelp) + AI-generated (Ken). Name the sources.',
      'Branded trucks / completed projects / homeowner shots — name what each photo accomplishes.',
      'If you\'re scaling spend, ask the client for MORE photos so creatives don\'t fatigue ("we\'re spending a lot, we don\'t want our ads to fatigue").',
    ],
    watchOut: 'NEVER use the deprecated "New Roof Starting at $9,999" headline. We stopped using it — confirm removed. If a media buyer auto-added it, strip it and re-verify before recording.',
  },
  {
    num: '3',
    duration: '~1 min',
    title: 'Show the Ad Copy Variants',
    show: 'Each ad copy in the campaign — read or summarise. Tell them to pause if they want to read in full.',
    explain: [
      'Storytelling angle: positions the client as the best of three options, addresses shady industry practices, explains why prices differ drastically.',
      'Engagement angle (e.g. the $10K-roof hook): explicitly frame as an ENGAGEMENT ad that LIFTS the other ads. It\'s a "one-two punch" — the engagement ad creates the impressions, the storytelling ad converts.',
      'Insurance angle (if running): how you handle the insurance process so they "just pay the deductible".',
      'Why we don\'t change proven copy — "this is tested across our client base, we don\'t recommend changing anything about these".',
    ],
    watchOut: 'Don\'t reuse copy that\'s saturated in nearby clients. 4+ active clients in same metro on same copy = swap to another proven angle (US Shingles Specific, Thousands Less, etc.) before recording.',
  },
  {
    num: '4',
    duration: '~1 min',
    title: 'Show the Landing Page + Survey',
    show: 'Click an actual ad → land on the page → scroll down through every survey question.',
    explain: [
      'READ EACH SURVEY QUESTION OUT LOUD as you scroll. Clients on phones can\'t always read the screen — speaking it guides them mentally.',
      'WHY each question is there ("filters out renters", "disqualifies out-of-area", etc.).',
      'OSA logic if you\'re excluding zips.',
      'Mobile-first framing — "most of your traffic is on mobile, so I\'m showing you the mobile view".',
    ],
    watchOut: 'Confirm the phone number on the LP is YOUR tracking number bought on behalf of their business — NOT their main line. Phone-number issues are the #1 launch-day surprise.',
  },
  {
    num: '5',
    duration: '~30 sec',
    title: 'Show the Booking Page + Scroll-Down Trust',
    show: 'Pick a time → answer the last 2 qualifying questions → request appointment. Then scroll back up to show what they see if they don\'t book immediately.',
    explain: [
      'NOT auto-booked into their calendar — VA still has to call and qualify before it lands in their calendar.',
      'The 24h / 1h / day-of reminder cadence on confirmation.',
      'Trust elements on the page: real Google reviews you pulled from their page, business blurb, completed-work photos. "If they don\'t book up top, this might convert them on the way down."',
    ],
    watchOut: 'Service-area callout: name SPECIFIC CITIES, not vague regions. "Tucson & Douglas homeowners" — not "Southern Arizona." Validate via ChatGPT before recording if unsure.',
  },
  {
    num: '6',
    duration: '~15 sec',
    title: 'Show the Thank-You Page',
    show: 'The thank-you page after booking submission.',
    explain: [
      'The phone number on the page is the tracking number we bought on behalf of their business.',
      'Caller ID is set so leads see the company name when our team calls.',
      'A team photo / recap of social proof reinforces the booking decision.',
    ],
    watchOut: 'Confirm the GHL sub-account time zone is set correctly (Settings → Business Profile). A wrong time zone makes the calendar embed look broken.',
  },
  {
    num: '7',
    duration: '~1 min',
    title: 'Show the CRM — With a Real Lead Example',
    show: 'Open a real client\'s GHL pipeline OR a recent live lead from another client. Walk through the timeline.',
    explain: [
      'Lead arrives → confirmation email + text fire instantly (show the timestamps).',
      'VA calls within 5 minutes (show the actual call timestamp).',
      'THE 3 QUALIFYING QUESTIONS the VA asks every lead: (1) How old is your roof? (2) Any leaks or damage? (3) Looking to get it done before the next season (e.g. summer)?',
      'Once qualified → VA confirms appointment on the phone, texts the time/date to the homeowner, and books into the client\'s calendar.',
      'If the client has their own CRM (Zapier hookup): explain what flows where — leads sync into their system, appointment notifications go via SMS to their phone.',
    ],
    watchOut: 'If they don\'t have GHL access yet, send the invite IMMEDIATELY after the video. Never tell them "I\'ll set you up later" — that becomes a chase.',
  },
  {
    num: '8',
    duration: '~10–15 sec',
    title: 'Outro — The Ask',
    show: 'Yourself, one last time.',
    explain: [
      'Restate the deadline + launch date.',
      'Make the ask BINARY: "Reply with the word APPROVED, or list any changes you want."',
      'Tell them what happens next ("Once you approve, ads go live by [time/date].").',
    ],
    watchOut: 'Don\'t end with "let me know what you think". That invites unstructured feedback. Force a binary: approve, or specific changes.',
  },
];

const DOS = [
  'State the deadline + launch date out loud',
  'Read every survey question ALOUD as you scroll through it',
  'Confirm phone number is the tracking number, not their main line',
  'Frame the engagement ad as engagement — not a promise of $10K roofs',
  'Tell them the 3 VA qualifying questions explicitly',
  'Show the pipeline + invite them in',
  'End with a binary ask: approve or list changes',
];

const DONTS = [
  'Use the deprecated "$9,999 new roof" headline',
  'Hedge ("hopefully", "we think", "this might work")',
  'Skip the survey because "they won\'t care"',
  'Ask for "thoughts" — that invites scope-creep feedback',
  'Use service-area callouts that are too broad ("Southern Arizona") — name specific cities',
  'Reuse copy that\'s saturated in nearby clients (4+ clients in same area = swap copy)',
  'Promise a launch date you haven\'t confirmed with the media buyer',
  'Talk for more than 5 minutes (they will skip)',
];

const PRECHECK = [
  'GHL setup is COMPLETE (A2P approved, calendar connected, automations live)',
  'GoHighLevel sub-account time zone is set correctly (Settings → Business Profile)',
  'Ad creatives are uploaded and approved internally',
  'Deprecated "$9,999 new roof" headline is REMOVED from every ad',
  'Media-buyer auto-enhancements are turned OFF (Advantage+ Placements + Audience)',
  'Landing page is on the right pixel + tracking number',
  'Survey is the agreed length (4q vs 7q per the cycle plan)',
  'Service-area callout is specific cities, not a vague region (use ChatGPT to validate the callout phrasing if unsure)',
  'Copy is not duplicated from another active client in the same metro',
  'You\'ve confirmed the launch date with Emmanuel/Mervin',
  'Loom is set to ≤5 min — script the bullets above before recording',
];

interface CaseStudy {
  id: string;
  client: string;
  manager: string;
  origSlot: string;
  feedbackSlot?: string;
  feedbackText?: string;
  patterns: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'gregory',
    client: 'Castillo Builders',
    manager: 'Gregory',
    origSlot: 's06_approval_case_gregory_orig',
    feedbackText:
      'Overall great structure — 95% of clients would approve a video like this. Specific tweaks for next time:\n\n' +
      '• REMOVE the "$9,999 new roof" headline before launch — that copy is deprecated. Whichever media buyer is auto-adding it needs to be told to strip it.\n\n' +
      '• When walking the $10K engagement ad, explain it explicitly: it\'s an engagement ad designed to make the others perform better. It positions you as the best of three options vs the shady industry practices.\n\n' +
      '• In the survey section, READ THE QUESTIONS ALOUD as you scroll — clients on phones can\'t always read the screen. Speaking guides them mentally.\n\n' +
      '• In the CRM section, tell them the three VA qualifying questions: (1) How old is your roof? (2) Any leaks or damage? (3) Looking to get it done before next season?',
    patterns: [
      'Deprecated headline still appearing in ads',
      'Engagement ad framing not explained',
      'Survey questions shown but not read aloud',
      'VA qualifying questions not surfaced',
    ],
  },
  {
    id: 'sam',
    client: 'Vertical Roofing',
    manager: 'Sam',
    origSlot: 's06_approval_case_sam_orig',
    feedbackText:
      'Rated 95/100. Things to lock in next time + two changes required before launch:\n\n' +
      '• Reaffirm what Tyler and Cole say in their videos: this is an engagement ad that makes the OTHER ad perform better. It addresses shady market practices, explains why prices differ drastically, and explains why you\'re the best choice.\n\n' +
      '• In the CRM section, tell them the 3 VA questions. If they have a CRM we\'re linking into, explain that — but only if applicable.\n\n' +
      '• REQUIRED CHANGES: copy is saturated. We already have 4 clients in this market with the same copy. Swap to "US shingles specific" or "Thousands less" copy from the B2C ads buildout doc — make sure to scrub the old client details out.',
    patterns: [
      'Copy saturation in same metro (4+ clients with same copy = swap)',
      'Engagement-ad framing missing',
      'CRM walkthrough missing the 3 VA questions',
    ],
  },
  {
    id: 'abdullah',
    client: 'Sunridge Home Solutions',
    manager: 'Abdullah',
    origSlot: 's06_approval_case_abdullah_orig',
    feedbackSlot: 's06_approval_case_abdullah_feedback',
    feedbackText:
      'Loom feedback covers: (1) ad copy review and where each angle fits the proven formula, (2) confirmation of placements + timing, (3) reminder to clearly communicate what the homeowner is reading, (4) deprecated "$9,999 new roof" headline must be removed, (5) media-buyer auto-enhancements must be off, (6) GHL sub-account time zone needs to be checked in Settings → Business Profile, (7) example of a good lead called within 5 minutes + qualification flow.\n\n' +
      'Service-area: "Southern Arizona" is too broad — like saying "Southern Ontario." Name the specific cities. For Sunridge: "Tucson & Douglas homeowners." Always validate the callout phrasing against ChatGPT for what resonates with homeowners in those zip codes / cities / radius.',
    patterns: [
      'Service area too broad ("Southern Arizona" → "Tucson & Douglas")',
      'Deprecated headline still in ads',
      'Media-buyer auto-enhancements left on',
      'GHL time zone not verified',
      'Validate service-area callout via ChatGPT before recording',
    ],
  },
  {
    id: 'kyle',
    client: 'Horizon Building Corp',
    manager: 'Kyle',
    origSlot: 's06_approval_case_kyle_orig',
    feedbackText:
      'Extensive feedback Loom from Oscar (link inline). Watch the original first, then the feedback Loom. The notes here are aggregated from across all the case studies — the same patterns recur:',
    patterns: [
      'Watch the original Loom + Oscar\'s feedback Loom in sequence',
      'Apply the patterns surfaced in the other case studies (deprecated headline, engagement-ad framing, survey aloud, 3 VA questions, copy uniqueness, service-area specificity)',
    ],
  },
];

export function ApprovalVideoSOP() {
  const [openCase, setOpenCase] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-brand-yellow p-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60 mb-1">Why this video matters</div>
        <div className="text-sm text-brand-black leading-relaxed">
          Half the &quot;your leads suck&quot; conversations mid-cycle are pre-handle-able right here. Clients who saw the survey, the LP, and the funnel BEFORE launch don&apos;t get to claim surprise later. Skip this video and you&apos;re booking yourself a save call in 14 days.
        </div>
      </div>

      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Reference examples — three different styles, same framework</h4>
        <p className="text-xs text-brand-gray mb-2">
          Three of us delivering the same approval-video framework. Different vertical, different style, same beats. Each Loom has a transcript below the embed (📝 toggle) so you can scan it instead of watching if you&apos;re short on time. <strong>Cole&apos;s example is HVAC — the framework is identical regardless of vertical.</strong>
        </p>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">#1 — Oscar (roofing)</div>
            <LoomSlot slotKey="s06_approval_example_1" title="Oscar — Roof Ignite" subtitle="Florida, 2 ad angles, Zapier-into-client-CRM example" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">#2 — Cole (HVAC — same framework, different vertical)</div>
            <LoomSlot slotKey="s06_approval_example_2" title="Cole — Emergency HVAC" subtitle="15 ads w/ same wording, scheduling-page caveat, real client CRM" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">#3 — Tyler (roofing)</div>
            <LoomSlot slotKey="s06_approval_example_3" title="Tyler — AG Exterior Solutions" subtitle="Nashville, 3 ad angles incl insurance + engagement, real call timestamps" />
          </div>
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
              <div className="px-3 py-2 space-y-2">
                <div className="rounded-lg bg-brand-gray-light px-2.5 py-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Show: </span>
                  <span className="text-xs text-brand-black font-bold">{s.show}</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">Make sure to explain:</div>
                  <ul className="space-y-1">
                    {s.explain.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-black">
                        <span className="text-brand-yellow flex-shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-[11px] text-red-700 italic border-l-2 border-red-300 pl-2">
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
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Case studies — real feedback from past reviews</h4>
        <p className="text-xs text-brand-gray mb-2">
          Watch the original, then read Oscar&apos;s feedback. Every case here surfaced patterns now baked into the SOP above. The point: your eye for these issues sharpens fast once you&apos;ve seen the reps.
        </p>
        <div className="space-y-2">
          {CASE_STUDIES.map((c) => {
            const isOpen = openCase === c.id;
            return (
              <div key={c.id} className="rounded-xl border border-brand-gray-mid bg-white overflow-hidden">
                <button
                  onClick={() => setOpenCase(isOpen ? null : c.id)}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-brand-gray-light transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm text-brand-black">{c.client}</div>
                    <div className="text-[11px] text-brand-gray">Recorded by {c.manager} · {c.patterns.length} patterns surfaced</div>
                  </div>
                  <span className="text-xs text-brand-gray flex-shrink-0">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div className="px-3 py-3 border-t border-brand-gray-mid space-y-3 bg-brand-gray-light">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">Original</div>
                        <LoomSlot slotKey={c.origSlot} title={`${c.manager}'s submitted Loom`} />
                      </div>
                      {c.feedbackSlot && (
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">Oscar&apos;s feedback Loom</div>
                          <LoomSlot slotKey={c.feedbackSlot} title="Oscar's video feedback" />
                        </div>
                      )}
                    </div>
                    {c.feedbackText && (
                      <div className="rounded-lg bg-white border border-brand-gray-mid p-3">
                        <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1.5">Oscar&apos;s notes (verbatim)</div>
                        <div className="text-xs text-brand-black whitespace-pre-line leading-relaxed">{c.feedbackText}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1.5">Patterns to internalise</div>
                      <ul className="space-y-1">
                        {c.patterns.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-brand-black">
                            <span className="text-brand-yellow flex-shrink-0">▸</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">Companion deep-dive — Creative Construction Mastery</h4>
        <p className="text-xs text-brand-gray mb-2">
          Once your eye for the approval video is dialled in, spend 30 min on this Loom for the next layer: how to construct the creative SET that goes into the ads in the first place. This is the upstream skill — get this right and the approval video becomes much easier to sell.
        </p>
        <LoomSlot slotKey="s06_creative_construction_mastery" title="Creative Construction Mastery" subtitle="Full walkthrough" recordedBy="Oscar" />
      </div>
    </div>
  );
}
