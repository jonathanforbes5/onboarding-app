'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { MetricsHierarchy } from '@/components/Diagrams/MetricsHierarchy';

const LAYER1 = [
  { metric: 'Total Booked Appts', target: 'vs. cycle target', note: 'The primary outcome — are we booking enough?' },
  { metric: 'Target Achievement %', target: '≥ 80%', note: 'At 80% = bill at margin. Below = optimize, extend cycle.' },
  { metric: 'Cost Per Booked Appt', target: '< $250', note: 'Compare vs. client\'s gross margin per job.' },
];

const LAYER2 = [
  { metric: 'CTR', target: '> 0.8%', fix: 'Refresh creative, test new hooks', owner: 'Ken' },
  { metric: 'Cost Per Link Click', target: '< $6', fix: 'Improve CTR or adjust targeting', owner: 'Emmanuel' },
  { metric: 'Survey CVR', target: '> 2.5%', fix: 'Simplify survey, reduce friction', owner: 'Emmanuel' },
  { metric: 'VA Booking Rate', target: '> 30%', fix: 'Retrain VAs, review scripts', owner: 'Leila' },
  { metric: 'Show Rate', target: '> 60%', fix: 'Improve reminder automations', owner: 'Emmanuel' },
  { metric: 'Speed to Lead', target: '< 5 min', fix: 'Escalate to Leila immediately if > 15 min', owner: 'Leila' },
  { metric: 'OSA Rate', target: '< 20%', fix: 'Audit zip codes vs targeting vs ASD', owner: 'Emmanuel' },
];

const HEALTH_COLORS = [
  { color: 'Green', hex: '#22C55E', threshold: '≥ 70% to target by Day 21', meaning: 'On track — celebrate with client, scale what\'s working' },
  { color: 'Yellow', hex: '#F5C800', threshold: '40–70% to target by Day 14', meaning: 'Monitor closely — Layer 2 diagnosis needed, communicate proactively' },
  { color: 'Red', hex: '#EF4444', threshold: '< 40% to target by Day 14', meaning: 'Immediate action — coordinate specialists, flag to Jonathan if unresolved 48hr' },
  { color: 'Black', hex: '#111', threshold: 'Client threatening to cancel', meaning: 'Escalate to Jonathan immediately — before client reaches him first' },
];

export function S08_MetricsHierarchy() {
  return (
    <SectionWrapper sectionId={8}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Metrics Framework</div>
        <h2 className="text-xl font-black text-white mb-2">Think in Layers</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Layer 1 tells you <em className="text-white">if</em> there&apos;s a problem.
          Layer 2 tells you <em className="text-white">why</em>. Always check Layer 1 first — never dive into Layer 2 when Layer 1 looks fine.
        </p>
      </Card>

      {/* Layer 1 vs Layer 2 split */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Two-Layer Framework</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-brand-yellow p-4">
            <div className="font-black text-xs uppercase tracking-widest text-brand-black/60 mb-2">Layer 1 — Outcomes</div>
            <div className="font-black text-base mb-1">Did we book enough?</div>
            <div className="text-xs text-brand-black/60 mb-3">Check these FIRST, every week</div>
            {LAYER1.map((m) => (
              <div key={m.metric} className="bg-black/10 rounded-lg p-2 mb-1">
                <div className="font-black text-xs">{m.metric}</div>
                <div className="text-[10px] text-brand-black/60 mt-0.5">{m.note}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-brand-black p-4">
            <div className="font-black text-xs uppercase tracking-widest text-white/40 mb-2">Layer 2 — Diagnosis</div>
            <div className="font-black text-base text-white mb-1">Where is it breaking?</div>
            <div className="text-xs text-white/40 mb-3">Only check when Layer 1 fails</div>
            {[
              { label: 'CTR < 0.8%', fix: 'Creative problem → Ken' },
              { label: 'CPLC > $6', fix: 'Targeting or creative → Emmanuel' },
              { label: 'Survey CVR < 2.5%', fix: 'Survey friction → Emmanuel' },
              { label: 'Booking rate < 30%', fix: 'VA performance → Leila' },
              { label: 'Show rate < 60%', fix: 'Reminders → Emmanuel' },
            ].map((d) => (
              <div key={d.label} className="flex items-start gap-2 mb-1">
                <span className="text-red-400 text-xs flex-shrink-0 mt-0.5">↳</span>
                <div>
                  <span className="text-xs text-white font-bold">{d.label}</span>
                  <span className="text-xs text-white/40 ml-1">→ {d.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core decision rule */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-brand-black rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🟢</div>
          <div className="font-black text-base text-white mb-1">Layer 1 looks good?</div>
          <div className="text-sm text-white/60">Keep going. Don&apos;t overthink it. Celebrate with the client.</div>
        </div>
        <div className="bg-red-900 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🔴</div>
          <div className="font-black text-base text-white mb-1">Layer 1 looks bad?</div>
          <div className="text-sm text-white/60">Diagnose Layer 2. Find root cause. Prescribe. Coordinate.</div>
        </div>
      </div>

      {/* The hierarchy diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Full Metrics Hierarchy</h3>
        <Card border>
          <MetricsHierarchy />
        </Card>
      </div>

      {/* Health color system */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Account Health Colors</h3>
        <div className="space-y-2">
          {HEALTH_COLORS.map((h) => (
            <div key={h.color} className="flex items-start gap-3 rounded-xl p-3 bg-white border border-brand-gray-mid">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs"
                style={{ backgroundColor: h.hex, color: h.hex === '#F5C800' || h.hex === '#22C55E' ? '#111' : '#fff' }}
              >{h.color}</div>
              <div>
                <div className="font-black text-xs text-brand-black">{h.threshold}</div>
                <div className="text-xs text-brand-gray mt-0.5 leading-relaxed">{h.meaning}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 2 full benchmark table */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Layer 2 Benchmarks — What Good Looks Like</h3>
        <div className="rounded-xl border border-brand-gray-mid overflow-hidden">
          <div className="grid grid-cols-4 bg-brand-black text-white text-[10px] font-black uppercase tracking-widest">
            <div className="p-3 col-span-1">Metric</div>
            <div className="p-3 col-span-1 text-center">Target</div>
            <div className="p-3 col-span-1">Fix if failing</div>
            <div className="p-3 col-span-1 text-center">Owner</div>
          </div>
          {LAYER2.map((m, i) => (
            <div key={m.metric} className={`grid grid-cols-4 text-xs items-center ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-light'}`}>
              <div className="p-3 font-bold">{m.metric}</div>
              <div className="p-3 text-center font-black text-green-600">{m.target}</div>
              <div className="p-3 text-brand-gray">{m.fix}</div>
              <div className="p-3 text-center">
                <span className="bg-brand-black text-brand-yellow text-[10px] font-black px-2 py-0.5 rounded">{m.owner}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-brand-gray/60 mt-2 text-center">Only audit Layer 2 when Layer 1 is failing — healthy outcomes = monthly check-in only</div>
      </div>

      {/* Diagnostic steps */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Diagnostic Flow — 5 Steps</h3>
        <div className="space-y-1">
          {[
            { step: '1', label: 'Check Layer 1', detail: 'Total bookings, Target %, Cost Per Booked Appt — every week' },
            { step: '2', label: 'Good → keep going', detail: 'Communicate wins to the client. Scale what\'s working. Don\'t change things.' },
            { step: '3', label: 'Bad → diagnose Layer 2', detail: 'CTR, CPLC, Survey CVR, Booking Rate, Show Rate, Speed to Lead, OSA' },
            { step: '4', label: 'Identify root cause + task specialist', detail: 'Creative → Ken. Campaign/setup → Emmanuel/Mervin. VA → Leila. 48hr deadline.' },
            { step: '5', label: 'Verify improvement', detail: 'Check Layer 1 again 3–5 days later. Loop until resolved.' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-brand-gray-mid">
              <div className="w-7 h-7 rounded-lg bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                {s.step}
              </div>
              <div>
                <div className="font-black text-sm text-brand-black">{s.label}</div>
                <div className="text-xs text-brand-gray mt-0.5">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="Think in Systems">
        Layer 1 is the outcome. Layer 2 is the diagnosis. <strong>Everything is a data problem with a data solution.</strong> No emotion — just metrics, root causes, and prescriptions.
      </InfoBox>
    </SectionWrapper>
  );
}
