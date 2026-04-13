'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { MetricsHierarchy } from '@/components/Diagrams/MetricsHierarchy';

export function S08_MetricsHierarchy() {
  return (
    <SectionWrapper sectionId={8}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Metrics Framework</div>
        <h2 className="text-xl font-black text-white mb-2">Think in Layers</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Not all metrics are created equal. Layer 1 tells you <em className="text-white">if</em> there&apos;s a problem.
          Layer 2 tells you <em className="text-white">why</em>. Always start at the top and work your way down.
        </p>
      </Card>

      {/* Core rule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-brand-yellow rounded-xl p-5">
          <div className="text-3xl mb-2">🟢</div>
          <div className="font-black text-xl mb-1">Layer 1 looks good?</div>
          <div className="font-bold text-brand-black/70 text-sm">→ Keep going. Don&apos;t overthink it.</div>
          <div className="text-xs text-brand-black/50 mt-2">Celebrate with the client. Scale what&apos;s working.</div>
        </div>
        <div className="bg-brand-black rounded-xl p-5 text-white">
          <div className="text-3xl mb-2">🔴</div>
          <div className="font-black text-xl mb-1">Layer 1 looks bad?</div>
          <div className="font-bold text-white/70 text-sm">→ Diagnose Layer 2 to find root cause.</div>
          <div className="text-xs text-white/40 mt-2">Then prescribe the fix. Coordinate specialists.</div>
        </div>
      </div>

      {/* The hierarchy diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Metrics Hierarchy</h3>
        <Card border>
          <MetricsHierarchy />
        </Card>
      </div>

      {/* Diagnostic flow */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Diagnostic Decision Flow</h3>
        <div className="space-y-2">
          {[
            { step: '1', label: 'Check Layer 1 first', detail: 'Total bookings, Target Achievement %, Cost Per Booked Appointment' },
            { step: '2', label: 'Ask: Are they good?', detail: 'If YES → communicate wins, keep going. If NO → proceed to Layer 2.' },
            { step: '3', label: 'Diagnose Layer 2', detail: 'CTR, CPLC, Survey CVR, Booking Rate, Show Rate — find the broken link' },
            { step: '4', label: 'Prescribe + Coordinate', detail: 'Identify the root cause. Task the right specialist. Set a timeline.' },
            { step: '5', label: 'Verify improvement', detail: 'Check Layer 1 again after the fix. Loop until resolved.' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-brand-gray-mid">
              <div className="w-8 h-8 rounded-lg bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center flex-shrink-0">
                {s.step}
              </div>
              <div>
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-xs text-brand-gray mt-0.5">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics quick reference */}
      <Card yellow>
        <h3 className="font-black text-sm uppercase tracking-widest mb-3">Quick Reference: What Good Looks Like</h3>
        <div className="space-y-2">
          {[
            { metric: 'CTR', target: '1–3%+', note: 'Below 1% = creative issue' },
            { metric: 'Survey Completion Rate', target: '20–40%', note: 'Below 15% = friction in survey' },
            { metric: 'VA Booking Rate', target: '30–50%', note: 'Below 25% = script/speed issue' },
            { metric: 'Show Rate', target: '60–80%', note: 'Below 50% = reminder/qual issue' },
            { metric: 'Speed to Lead', target: '< 5 min', note: 'Over 15 min = serious problem' },
          ].map((m) => (
            <div key={m.metric} className="flex items-center justify-between bg-black/10 rounded-lg px-3 py-2">
              <span className="font-bold text-sm">{m.metric}</span>
              <div className="text-right">
                <div className="font-black text-sm">{m.target}</div>
                <div className="text-xs text-brand-black/60">{m.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <InfoBox type="tip" title="Think in Systems">
        Layer 1 is the outcome. Layer 2 is the diagnosis. <strong>Everything is a data problem with a data solution.</strong> No emotion — just metrics, root causes, and prescriptions.
      </InfoBox>
    </SectionWrapper>
  );
}
