'use client';
import React, { useState } from 'react';

interface Problem {
  id: string;
  symptom: string;
  diagnosis: string;
  icon: string;
  prescriptions: string[];
  coordinate: { who: string; what: string }[];
  severity: 'high' | 'medium' | 'low';
}

const PROBLEMS: Problem[] = [
  {
    id: 'low-survey',
    symptom: 'Low Survey Conversion Rate',
    diagnosis: 'High landing page traffic but low survey completions — too much friction in the funnel',
    icon: '📋',
    severity: 'high',
    prescriptions: [
      'Shorten survey (remove non-essential questions)',
      'Simplify language — use plain English',
      'Reduce steps in the multi-step form',
      'A/B test different question orders',
      'Improve landing page headline alignment with ad',
    ],
    coordinate: [
      { who: 'Emmanuel', what: 'Rebuild or A/B test survey + landing page' },
    ],
  },
  {
    id: 'high-cpl',
    symptom: 'High Cost Per Lead (CPL)',
    diagnosis: 'Spending too much per lead — likely creative fatigue, poor targeting, or weak offer',
    icon: '💸',
    severity: 'high',
    prescriptions: [
      'Refresh ad creative (new images, video, hooks)',
      'Test new offer angles (free estimate, no obligation)',
      'Narrow or adjust targeting parameters',
      'Kill low-performing ad sets',
      'Optimize landing page for conversion',
    ],
    coordinate: [
      { who: 'Ken', what: 'New creative assets and ad visuals' },
      { who: 'Emmanuel', what: 'Campaign adjustments and targeting' },
    ],
  },
  {
    id: 'low-quality',
    symptom: 'Low Quality Leads',
    diagnosis: 'Leads come in but VAs report they\'re unqualified — OSA rate high, pixel unseasoned, or targeting mismatch',
    icon: '⚠️',
    severity: 'medium',
    prescriptions: [
      'Audit all 3 sources: Meta targeting, Account Specific Doc, and actual service area — must all match',
      'Check OSA (out-of-service-area) rate in Logbook — if >20%, there\'s a zip code/radius issue',
      'Verify CAPI is set up: Qualified tag in GHL → fires Schedule event to Meta',
      'Backfill CAPI: apply Qualified tag to all existing booked leads to send historical data to Meta',
      'Add exclusion zip codes to campaign targeting',
      'Allow pixel to season — needs 50+ quality events before optimizing well',
    ],
    coordinate: [
      { who: 'Emmanuel / Mervin', what: 'Targeting refinement, CAPI setup, exclusion zip codes' },
      { who: 'Leila / Aica', what: 'Flag specific unqualified lead examples from Logbook' },
    ],
  },
  {
    id: 'low-booking',
    symptom: 'Low Booking Rate',
    diagnosis: 'Leads come in but don\'t convert to appointments — VA speed, script, or response process issue',
    icon: '📞',
    severity: 'high',
    prescriptions: [
      'Audit VA response time — must be <5 min for HVAC, <15 min for roofing',
      'Flag specific lead examples to Leila with context: what happened to this lead?',
      'Request call recording review from Leila',
      'Check CRM automations — is the lead notification firing correctly?',
      'Improve SMS/email nurture sequence for leads that don\'t answer',
    ],
    coordinate: [
      { who: 'Leila / Aica', what: 'VA retraining, script review, call recording audit' },
      { who: 'Emmanuel / Mervin', what: 'CRM automation audit and lead routing check' },
    ],
  },
  {
    id: 'low-show',
    symptom: 'Low Show Rate',
    diagnosis: 'Appointments booked but clients don\'t show up — confirmation process or qualification problem',
    icon: '🚫',
    severity: 'medium',
    prescriptions: [
      'Improve reminder automation (SMS day before + day of)',
      'Add confirmation steps (reply YES to confirm)',
      'Coach client\'s team on appointment confirmation',
      'Review pre-qualification — are leads serious buyers?',
      'Optimize appointment scheduling timing',
    ],
    coordinate: [
      { who: 'Emmanuel', what: 'Reminder automation improvements' },
      { who: 'You', what: 'Coach client on their follow-up process' },
    ],
  },
];

const SEVERITY_STYLE = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  low: 'bg-green-50 text-green-700 border-green-200',
};

export function KPIPlaybook() {
  const [selected, setSelected] = useState<Problem | null>(null);

  return (
    <div className="space-y-4">
      {!selected ? (
        <>
          <p className="text-sm text-brand-gray">Select a performance problem to see the diagnosis and prescription:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="text-left p-4 rounded-xl border-2 border-brand-gray-mid bg-white hover:border-brand-black hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border mb-1 ${SEVERITY_STYLE[p.severity]}`}>
                      {p.severity} priority
                    </div>
                    <div className="font-bold text-sm group-hover:text-brand-black">{p.symptom}</div>
                    <div className="text-xs text-brand-gray mt-0.5 line-clamp-2">{p.diagnosis}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-fade-in space-y-4">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 text-xs text-brand-gray hover:text-brand-black font-bold"
          >
            ← Back to all problems
          </button>

          {/* Problem header */}
          <div className="bg-brand-black text-white rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border mb-1 ${SEVERITY_STYLE[selected.severity]}`}>
                  {selected.severity} priority
                </div>
                <div className="font-black text-lg">{selected.symptom}</div>
              </div>
            </div>
            <div className="text-sm text-white/70">{selected.diagnosis}</div>
          </div>

          {/* Prescriptions */}
          <div className="bg-brand-yellow rounded-xl p-4">
            <div className="font-black text-sm uppercase tracking-widest mb-3 text-brand-black">Rx — Prescriptions</div>
            <ul className="space-y-2">
              {selected.prescriptions.map((rx, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-black">
                  <span className="font-black mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span>{rx}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinate */}
          <div className="border border-brand-gray-mid rounded-xl p-4">
            <div className="font-black text-sm uppercase tracking-widest mb-3 text-brand-gray">Coordinate With</div>
            <div className="space-y-2">
              {selected.coordinate.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-24 flex-shrink-0">
                    <span className="bg-brand-black text-white text-xs font-bold px-2 py-1 rounded">{c.who}</span>
                  </div>
                  <span className="text-sm text-brand-gray">{c.what}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelected(null)}
            className="w-full py-2.5 rounded-lg border border-brand-gray-mid text-sm font-bold text-brand-gray hover:text-brand-black hover:border-brand-black transition-colors"
          >
            View another problem
          </button>
        </div>
      )}
    </div>
  );
}
