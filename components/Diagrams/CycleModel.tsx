'use client';
import React, { useState } from 'react';

const WEEKS = [
  {
    week: 1,
    label: 'Launch',
    color: 'bg-brand-yellow',
    textColor: 'text-brand-black',
    days: 'Days 1–7',
    title: 'Launch & Generate',
    activities: [
      'Campaigns go live',
      'Initial lead generation begins',
      'VAs start contacting leads (< 5 min)',
      'Monitor early metrics closely',
      'Identify quick wins to scale',
    ],
    kpi: 'CPL, CTR',
  },
  {
    week: 2,
    label: 'Qualify',
    color: 'bg-brand-black',
    textColor: 'text-white',
    days: 'Days 8–14',
    title: 'Qualify & Book',
    activities: [
      'VAs qualifying inbound leads',
      'Appointments being booked',
      'Survey performance tracked',
      'Early optimization based on data',
      'Client receiving first appointments',
    ],
    kpi: 'Booking Rate, Lead Quality',
  },
  {
    week: 3,
    label: 'Optimize',
    color: 'bg-brand-yellow',
    textColor: 'text-brand-black',
    days: 'Days 15–21',
    title: 'Optimize & Scale',
    activities: [
      'Scale winning ad sets',
      'Kill under-performers',
      'Creative refresh if needed',
      'VA script refinements',
      'Mid-cycle client update',
    ],
    kpi: 'CPBA, Show Rate',
  },
  {
    week: 4,
    label: 'Review',
    color: 'bg-brand-black',
    textColor: 'text-white',
    days: 'Days 22–28',
    title: 'Review & Renew',
    activities: [
      'Final performance review',
      'Target achievement verified',
      'Billing prepared',
      'Renewal conversation with client',
      'Plan next cycle strategy',
    ],
    kpi: 'Total Bookings vs Target',
  },
];

export function CycleModel() {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Timeline bar */}
      <div className="grid grid-cols-4 gap-1.5">
        {WEEKS.map((w) => (
          <button
            key={w.week}
            onClick={() => setActiveWeek(activeWeek === w.week ? null : w.week)}
            className={`rounded-xl p-4 text-left transition-all hover:scale-[1.02] active:scale-95 ${w.color} ${w.textColor} ${
              activeWeek === w.week ? 'ring-2 ring-offset-2 ring-brand-yellow' : ''
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Week {w.week}</div>
            <div className="font-black text-base leading-tight">{w.label}</div>
            <div className="text-xs mt-2 opacity-60">{w.days}</div>
          </button>
        ))}
      </div>

      {/* Connector arrows */}
      <div className="flex items-center px-2">
        {WEEKS.map((w, i) => (
          <React.Fragment key={w.week}>
            <div className="flex-1 h-0.5 bg-brand-gray-mid" />
            {i < WEEKS.length - 1 && (
              <div className="text-brand-gray-mid text-xs mx-1">▶</div>
            )}
          </React.Fragment>
        ))}
        <div className="text-brand-gray-mid text-xs ml-1">🔁</div>
      </div>

      {/* Expanded detail */}
      {activeWeek && (() => {
        const w = WEEKS[activeWeek - 1];
        return (
          <div className={`rounded-xl p-5 ${w.color} ${w.textColor} animate-fade-in`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-70">Week {w.week} · {w.days}</div>
                <div className="text-xl font-black">{w.title}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                w.textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'
              }`}>
                Focus KPI: {w.kpi}
              </div>
            </div>
            <ul className="space-y-1.5">
              {w.activities.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="opacity-60 flex-shrink-0 mt-0.5">▸</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })()}

      <p className="text-xs text-brand-gray text-center">Click any week to see activities and KPIs</p>
    </div>
  );
}
