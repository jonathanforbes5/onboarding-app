'use client';
import React, { useState } from 'react';

const STEPS = [
  {
    step: 1,
    label: 'Meta Ads',
    sublabel: 'Traffic Generation',
    icon: '📢',
    color: 'bg-brand-yellow',
    textColor: 'text-brand-black',
    metrics: ['Impressions', 'Reach', 'CTR', 'CPLC'],
    detail: 'Facebook & Instagram ads drive targeted traffic from homeowners in the client\'s service area. Creative quality, targeting, and offer are the primary performance drivers.',
    owner: 'Emmanuel + Ken (creative)',
  },
  {
    step: 2,
    label: 'Landing Page',
    sublabel: 'Interest Capture',
    icon: '🖥️',
    color: 'bg-amber-400',
    textColor: 'text-black',
    metrics: ['Landing Page CVR', 'Bounce Rate'],
    detail: 'Conversion-optimized landing page captures homeowner interest. Must align with ad messaging for high conversion rates.',
    owner: 'Emmanuel builds',
  },
  {
    step: 3,
    label: 'Survey',
    sublabel: 'Lead Qualification',
    icon: '📋',
    color: 'bg-orange-400',
    textColor: 'text-white',
    metrics: ['Survey Completion Rate', 'Lead Quality Score'],
    detail: 'Multi-step qualification survey filters tire-kickers. Collects address, roof condition, timeline, and budget. Only qualified leads proceed.',
    owner: 'Emmanuel builds',
  },
  {
    step: 4,
    label: 'CRM (GHL)',
    sublabel: 'Lead Centralization',
    icon: '⚙️',
    color: 'bg-red-400',
    textColor: 'text-white',
    metrics: ['Lead Volume', 'Response Time'],
    detail: 'GoHighLevel CRM receives all qualified leads, triggers automations, assigns to VA team, and tracks every lead through the pipeline.',
    owner: 'Emmanuel sets up',
  },
  {
    step: 5,
    label: 'VA Contact',
    sublabel: '< 5 Minute Response',
    icon: '📞',
    color: 'bg-red-600',
    textColor: 'text-white',
    metrics: ['Speed to Lead', 'Contact Rate'],
    detail: 'Virtual assistant team contacts every lead within 5 minutes. They verify qualification, answer questions, and move toward booking.',
    owner: 'Layla / Aika (VA Managers)',
  },
  {
    step: 6,
    label: 'Appointment',
    sublabel: 'Booked & Confirmed',
    icon: '✅',
    color: 'bg-brand-black',
    textColor: 'text-white',
    metrics: ['Booking Rate', 'Show Rate'],
    detail: 'Qualified leads are booked into the client\'s calendar. Automated reminders reduce no-shows. Client\'s sales team closes the job.',
    owner: 'VA team + client',
  },
];

export function FullFunnel() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {STEPS.map((s, i) => {
        const isActive = active === i;
        const widthClass = ['w-full', 'w-11/12', 'w-10/12', 'w-9/12', 'w-8/12', 'w-7/12'][i];

        return (
          <div key={s.step} className="flex flex-col items-center gap-1">
            <button
              onClick={() => setActive(isActive ? null : i)}
              className={`${widthClass} transition-all duration-300 hover:scale-[1.01] active:scale-95`}
            >
              <div className={`${s.color} ${s.textColor} rounded-xl px-4 py-3 flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <div className="text-left">
                    <div className="font-black text-sm">{s.label}</div>
                    <div className="text-xs opacity-70">{s.sublabel}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex gap-1 flex-wrap">
                    {s.metrics.map((m) => (
                      <span key={m} className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'
                      }`}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs opacity-60">{isActive ? '▲' : '▼'}</span>
                </div>
              </div>
            </button>

            {isActive && (
              <div className={`${widthClass} rounded-xl border border-brand-gray-mid bg-white p-4 animate-fade-in text-sm`}>
                <p className="text-brand-black mb-2">{s.detail}</p>
                <div className="flex items-center gap-2 text-xs text-brand-gray">
                  <span className="font-bold text-brand-black">Owner:</span> {s.owner}
                </div>
              </div>
            )}

            {i < STEPS.length - 1 && (
              <div className="text-brand-gray-mid text-sm">▼</div>
            )}
          </div>
        );
      })}
      <p className="text-xs text-brand-gray text-center pt-2">Click any funnel stage for details</p>
    </div>
  );
}
