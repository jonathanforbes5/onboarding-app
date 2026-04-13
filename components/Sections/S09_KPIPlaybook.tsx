'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { KPIPlaybook } from '@/components/Diagrams/KPIPlaybook';

export function S09_KPIPlaybook() {
  return (
    <SectionWrapper sectionId={9}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">KPI Diagnosis</div>
        <h2 className="text-xl font-black text-white mb-2">You Are a Performance Doctor</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          When clients have problems, your job is to diagnose the root cause, prescribe the solution,
          and coordinate specialists to execute. <strong className="text-white">Think in systems, not emotions.</strong>
          Everything is a data problem with a data solution.
        </p>
      </Card>

      {/* The doctor framework */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { step: 'Diagnose', icon: '🔍', desc: 'Identify root cause from Layer 2 data' },
          { step: 'Prescribe', icon: '📝', desc: 'Select the right fix from the playbook' },
          { step: 'Coordinate', icon: '📞', desc: 'Task the right specialist to execute' },
          { step: 'Verify', icon: '✅', desc: 'Check Layer 1 again after the fix' },
        ].map((s) => (
          <div key={s.step} className="bg-white rounded-xl border border-brand-gray-mid p-3 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-black text-sm">{s.step}</div>
            <div className="text-xs text-brand-gray mt-1">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Interactive KPI Playbook */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Interactive Diagnosis Playbook</h3>
        <Card border>
          <KPIPlaybook />
        </Card>
      </div>

      {/* Quick problem matrix */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Problem → Cause → Fix → Owner</h3>
        <div className="overflow-x-auto rounded-xl border border-brand-gray-mid">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-brand-black text-white">
                <th className="px-3 py-2 text-left font-black">Problem</th>
                <th className="px-3 py-2 text-left font-black">Root Cause</th>
                <th className="px-3 py-2 text-left font-black">Fix</th>
                <th className="px-3 py-2 text-left font-black">Coordinate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { problem: 'Low Survey CVR', cause: 'Too much friction', fix: 'Shorten + simplify survey', owner: 'Emmanuel' },
                { problem: 'High CPL', cause: 'Creative fatigue / bad targeting', fix: 'New creative + targeting', owner: 'Ken + Emmanuel' },
                { problem: 'Low Lead Quality', cause: 'Pixel unseasoned / broad targeting', fix: 'Pixel seasoning + narrow targeting', owner: 'Emmanuel' },
                { problem: 'Low Booking Rate', cause: 'VA speed or script issue', fix: 'VA retrain + script review', owner: 'Layla / Aika' },
                { problem: 'Low Show Rate', cause: 'Reminder failure or bad qual', fix: 'Automations + confirmation flow', owner: 'Emmanuel + You' },
              ].map((row, i) => (
                <tr key={row.problem} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-light'}>
                  <td className="px-3 py-2.5 font-bold">{row.problem}</td>
                  <td className="px-3 py-2.5 text-brand-gray">{row.cause}</td>
                  <td className="px-3 py-2.5">{row.fix}</td>
                  <td className="px-3 py-2.5"><span className="bg-brand-yellow px-2 py-0.5 rounded text-brand-black font-bold">{row.owner}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InfoBox type="warning" title="Critical Reminder">
        You are <strong>not the one executing</strong> the fixes — you are prescribing them and coordinating with specialists.
        Keep clear records in Asana so there&apos;s accountability on action items.
      </InfoBox>
    </SectionWrapper>
  );
}
