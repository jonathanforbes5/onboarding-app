'use client';
import React from 'react';

interface Channel {
  name: string;
  purpose: string;
  whenToPost: string;
  whenNotTo: string;
  audience: string;
}

const CHANNELS: Channel[] = [
  {
    name: '#manager-discussion',
    purpose: 'Coordination with the VA management team — Leila, Aica, Pamela.',
    whenToPost: 'VA quality issues, speed-to-lead complaints, qualification problems, lead-script tweaks. Anything that needs Leila\'s eyes.',
    whenNotTo: 'Don\'t ping individual VAs here. Don\'t use it for media-buyer requests — that goes via ClickUp tasks to Emmanuel/Mervin/Bren.',
    audience: 'Pod managers + VA managers (Leila, Aica, Pamela).',
  },
  {
    name: '#onboarding-feedback-channel',
    purpose: 'Post-onboarding-call feedback loop — what worked, what didn\'t, what to improve.',
    whenToPost: 'After every onboarding call. Brief debrief: client tone, asset gaps, expectations set, anything Jon should know before service delivery starts.',
    whenNotTo: 'Don\'t use it as a substitute for the QA bot or as a replacement for documentation in the Logbook / Asana.',
    audience: 'All pod managers + Jon. The bot also posts QA scorecards here.',
  },
  {
    name: '#onboarding-cracks',
    purpose: 'Daily flag of clients who are slipping through the cracks — late onboardings, ghost clients, missed handoffs.',
    whenToPost: 'When the cracks bot flags one of YOUR clients — respond in-thread with status + action. If you spot a crack the bot missed, post it.',
    whenNotTo: 'Don\'t use it for general "this client is slow" complaints — those belong in your pod review with Jon.',
    audience: 'Jon + pod managers. Mark Handled buttons close the row in Airtable + ClickUp automatically.',
  },
  {
    name: '#post-onboarding-discussion',
    purpose: 'Where the QA bot posts post-onboarding-call summaries (Sonnet 4.5 scorecards). Also where the team discusses recurring themes from new client calls.',
    whenToPost: 'React/comment on the bot\'s posts when something stands out. Add context the bot didn\'t catch.',
    whenNotTo: 'Don\'t treat it as a noisy channel — keep signal high. Don\'t paste full transcripts here, the bot already summarises them.',
    audience: 'Jon, Oscar, pod managers.',
  },
  {
    name: 'Per-client channels',
    purpose: 'One private channel per client — your daily working space with that account.',
    whenToPost: 'Daily client communication during active cycles. Cycle updates, creative reviews, mid-cycle adjustments, scheduling. Drop the Monday/Thursday status note here in addition to your pod update.',
    whenNotTo: 'Don\'t share internal-only conversations here — the client may be in the channel. Don\'t post negative-tone messages about other internal team members in client channels.',
    audience: 'You + the client + relevant specialists. Naming convention varies — search for the client business name.',
  },
];

export function SlackChannels() {
  return (
    <div className="space-y-2">
      {CHANNELS.map((c) => (
        <div key={c.name} className="rounded-xl border border-brand-gray-mid bg-white overflow-hidden">
          <div className="bg-brand-black text-white px-3 py-2 flex items-center gap-2">
            <span className="font-black text-sm" style={{ color: '#F5C800' }}>{c.name}</span>
            <span className="text-[10px] text-white/60">— {c.audience}</span>
          </div>
          <div className="px-3 py-2 space-y-1.5 text-xs">
            <div>
              <span className="font-black uppercase tracking-widest text-[10px] text-brand-gray">Purpose: </span>
              <span className="text-brand-black">{c.purpose}</span>
            </div>
            <div>
              <span className="font-black uppercase tracking-widest text-[10px] text-green-700">Post when: </span>
              <span className="text-brand-black">{c.whenToPost}</span>
            </div>
            <div>
              <span className="font-black uppercase tracking-widest text-[10px] text-red-700">Don&apos;t: </span>
              <span className="text-brand-gray">{c.whenNotTo}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
