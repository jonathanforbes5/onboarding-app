'use client';
import React, { useState } from 'react';

interface Day {
  day: string;
  short: string;
  intensity: 'light' | 'medium' | 'heavy' | 'flex';
  tagline: string;
  agenda: string[];
  watchOutFor: string;
}

const DAYS: Day[] = [
  {
    day: 'Sunday',
    short: 'Sun',
    intensity: 'light',
    tagline: 'Optional prep — for your sanity, not the job',
    agenda: [
      'Glance at your calendar — what does the week look like?',
      'Skim weekend Slack messages so Monday isn\'t a surprise',
      'NOT expected. The team does not work Sundays. But a 15-min look-ahead makes Monday 10x calmer.',
    ],
    watchOutFor: 'Don\'t blur the line — keep the rest of the day off. Burnout shows up first as resentful Mondays.',
  },
  {
    day: 'Monday',
    short: 'Mon',
    intensity: 'heavy',
    tagline: 'Re-engage + prep. Strong week starts with a strong Monday.',
    agenda: [
      'Process the weekend backlog — every client message gets a response or a "I see this, replying by EOD" placeholder.',
      'Proactively reach out to clients before they reach out to you.',
      'Finish anything left over from Saturday.',
      'Prep your data + reports for the Tuesday pod meeting.',
      'Set yourself up for the week — block time for action items.',
    ],
    watchOutFor: 'Reactive Monday = reactive week. If you spend Monday firefighting Slack, your Tuesday meeting will be unprepared.',
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    intensity: 'heavy',
    tagline: 'Pod meeting. Lock in the next 48 hours of action items.',
    agenda: [
      'Pod meeting with Jonathan — bring data, leave with action items.',
      'Organize the next 2 days of work — prioritise high-impact items.',
      'Take action on items from the meeting — don\'t let them sit.',
      'Daily morning routine still applies before the meeting.',
    ],
    watchOutFor: 'Things will come up — client call requests, urgent issues. Triage them but DON\'T let them displace your meeting action items entirely.',
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    intensity: 'medium',
    tagline: 'Execute. Solve. Communicate proactively.',
    agenda: [
      'Action items from Tuesday\'s pod meeting.',
      'Specialist coordination — ClickUp tasks for Emmanuel/Mervin/Ken/Bren.',
      'Client check-ins on accounts that need eyes.',
      'Prep for any onboarding calls or client calls scheduled.',
    ],
    watchOutFor: 'The "quiet middle" of the week is when accounts can drift if you\'re not actively monitoring the Command Center.',
  },
  {
    day: 'Thursday',
    short: 'Thu',
    intensity: 'medium',
    tagline: 'Mon/Thu account update day. Check in with Jon before he asks.',
    agenda: [
      'Post your Mon/Thu KPI updates in #ops-manager-discussion (and per-client channels).',
      'Continue executing on action items.',
      'Identify anything that needs to be on Friday\'s pod meeting agenda.',
    ],
    watchOutFor: 'Don\'t skip the update. "Nothing to report" is itself a signal Jon needs to see.',
  },
  {
    day: 'Friday',
    short: 'Fri',
    intensity: 'heavy',
    tagline: 'Pod meeting + close out the week.',
    agenda: [
      'Pod meeting (afternoon) — review the week, plan next.',
      'Take action on Friday\'s action items SAME DAY — don\'t let them roll into the weekend backlog.',
      'Send proactive client updates going into the weekend (many of them work Saturdays).',
    ],
    watchOutFor: 'Weekend silence after a Friday meeting trains clients to assume nothing happens. A Friday afternoon update keeps the relationship warm.',
  },
  {
    day: 'Saturday',
    short: 'Sat',
    intensity: 'flex',
    tagline: 'Wrap-up + light prep. Quieter day overall.',
    agenda: [
      'Finish anything from the week that genuinely needs to ship.',
      'Light prep for the upcoming week — not a full work day.',
      'Some smaller-company clients DO work Saturdays — be responsive but don\'t initiate big asks.',
      'Ask questions that you saved up during the week.',
    ],
    watchOutFor: 'Don\'t leak Saturday work into Sunday — protect the recovery window. Burnout is a real risk in this role.',
  },
];

const INTENSITY_COLOR: Record<Day['intensity'], string> = {
  light:  '#A3E635',
  medium: '#F5C800',
  heavy:  '#EA580C',
  flex:   '#94A3B8',
};

export function WeeklySchedule() {
  const [active, setActive] = useState(1); // Monday by default

  const d = DAYS[active];

  return (
    <div className="space-y-3">
      {/* Day strip */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day, i) => (
          <button
            key={day.day}
            onClick={() => setActive(i)}
            className="rounded-lg p-2 text-center transition-all"
            style={{
              backgroundColor: i === active ? INTENSITY_COLOR[day.intensity] : '#fff',
              color: i === active ? '#000' : '#111',
              border: `2px solid ${INTENSITY_COLOR[day.intensity]}`,
              outline: i === active ? '2px solid #000' : 'none',
              outlineOffset: -1,
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80">{day.short}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">{day.intensity}</div>
          </button>
        ))}
      </div>

      {/* Active day detail */}
      <div className="rounded-xl bg-white border border-brand-gray-mid overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: INTENSITY_COLOR[d.intensity] }}>
          <div className="font-black text-base text-black">{d.day}</div>
          <div className="text-xs font-bold text-black/70">{d.tagline}</div>
        </div>
        <div className="px-3 py-2 space-y-2">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">Agenda</div>
            <ul className="space-y-1">
              {d.agenda.map((item, i) => (
                <li key={i} className="text-xs text-brand-black flex items-start gap-2">
                  <span className="text-brand-yellow flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 px-2.5 py-1.5">
            <div className="text-[10px] font-black uppercase tracking-widest text-red-700">Watch out for</div>
            <div className="text-xs text-red-900 mt-0.5">{d.watchOutFor}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
