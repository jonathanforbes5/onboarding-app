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
                { problem: 'Low Booking Rate', cause: 'VA speed or script issue', fix: 'VA retrain + script review', owner: 'Leila / Aica' },
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

      {/* Post-Andromeda Creative Refresh Protocol */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Creative Refresh Protocol (Post-Andromeda)</h3>
        <Card border>
          <div className="space-y-3">
            <p className="text-xs text-brand-gray">Follow this exact sequence before doing a full creative refresh. 50% of the time, Step 1 alone resets performance.</p>
            <div className="space-y-2">
              {[
                { step: 'Before Anything', label: 'Check Context', detail: 'Is there a holiday or local event? Are you inside the first 7 days of a new campaign? If yes — wait. Context explains most performance dips.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Then Check', label: 'Layer 1 Still OK?', detail: 'If bookings are on track — do not touch anything. Tinkering with healthy campaigns kills momentum.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Step 1', label: 'Ad Set Duplicate (Try This First)', detail: 'Sort ads by reach. If top 3–4 ads have 90%+ of spend AND performance is declining: Duplicate the ad set (no changes). Turn off top-reach ads. Launch new set. Turn off old set. Wait 48 hours.', color: 'bg-brand-yellow border-brand-yellow' },
                { step: 'Step 2', label: '48-Hour Wait', detail: 'Give it 48 hours. There\'s a 50% chance this ad set reset restores performance without needing new creative.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Step 3', label: 'Full Creative Refresh (Only If Step 1 Failed)', detail: 'New photos only — nothing reused from any previous set. Task Ken via ClickUp for AI images. Task Emmanuel/Mervin for Canva trifolds. Every ad set = 5 Singles + 5 Two-Folds + 5 Tri-Folds minimum.', color: 'bg-brand-black border-brand-black' },
              ].map((s) => (
                <div key={s.step} className={`rounded-xl p-3 border-2 ${s.color}`}>
                  <div className={`flex items-center gap-2 mb-1 ${s.color.includes('black') ? 'text-white' : ''}`}>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${s.color.includes('yellow') ? 'bg-brand-black text-white' : s.color.includes('black') ? 'bg-brand-yellow text-brand-black' : 'bg-brand-black text-white'}`}>{s.step}</span>
                    <span className="font-black text-sm">{s.label}</span>
                  </div>
                  <p className={`text-xs ${s.color.includes('black') ? 'text-white/70' : 'text-brand-gray'}`}>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* CAPI / Pixel Conditioning */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">CAPI Setup & Pixel Conditioning</h3>
        <Card border>
          <div className="space-y-3">
            <InfoBox type="warning" title="If CAPI is not set up — Meta is spending blind">
              CAPI (Conversions API) sends qualified lead data from GHL directly to Meta. Without it, Meta doesn&apos;t know which leads converted — it can&apos;t optimize. Task Emmanuel immediately if CAPI is missing.
            </InfoBox>
            <div className="space-y-2">
              {[
                { label: 'How CAPI works', detail: 'VA applies the "Qualified" tag in GHL → this fires a Schedule event to Meta via CAPI → Meta learns which user profiles convert → pixel becomes more targeted over time.' },
                { label: 'Verify CAPI is configured', detail: 'Check GHL automations: when "Qualified" tag is applied, a conversion event should fire to Meta. If not — task Emmanuel with high priority.' },
                { label: 'Backfill historical data', detail: 'If CAPI was missing and you just added it: apply the Qualified tag to all existing booked leads. This sends historical conversion data to Meta and accelerates pixel conditioning.' },
                { label: 'B2C naming requirement', detail: 'All campaign names must include "B2C" — this is required for the Account Master Dashboard tracking to work. Verify after any campaign duplication.' },
                { label: 'Campaign objective', detail: 'Always Leads objective — never Traffic, Conversions, or Awareness. Always verify after Emmanuel sets up or duplicates a campaign.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2 p-3 bg-brand-gray-light rounded-lg">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-xs text-brand-gray mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <InfoBox type="warning" title="Critical Reminder">
        You are <strong>not the one executing</strong> the fixes — you are prescribing them and coordinating with specialists.
        Keep clear records in ClickUp so there&apos;s accountability on action items.
      </InfoBox>
    </SectionWrapper>
  );
}
