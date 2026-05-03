'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { KPIPlaybook } from '@/components/Diagrams/KPIPlaybook';

const PROBLEMS = [
  {
    problem: 'Survey Conversion < 2%',
    symptoms: 'High landing page traffic, low survey completions',
    diagnosis: 'Survey too long, confusing language, or friction in questions',
    prescription: 'Switch 7-question → 4-question survey. Simplify language. A/B test shorter version.',
    owner: 'Emmanuel',
    via: 'ClickUp task',
  },
  {
    problem: 'Rising CPL / Falling CTR',
    symptoms: 'Spend increasing, fewer leads per dollar, CTR dropping week-over-week',
    diagnosis: 'Ad creative fatigue — frequency climbing, same images dominating',
    prescription: 'Creative refresh. Task Ken with brand, market, reference images. Use Post-Andromeda protocol first.',
    owner: 'Ken + Emmanuel',
    via: 'ClickUp task',
  },
  {
    problem: 'High Out-of-Service-Area Rate (> 20%)',
    symptoms: 'VAs reporting leads outside client\'s service zone',
    diagnosis: 'Radius mismatch: Account Specific Doc vs. Meta targeting vs. actual service area',
    prescription: 'Audit all 3 sources. Add exclusion zip codes. Align GHL service area with Meta targeting.',
    owner: 'Emmanuel / Mervin',
    via: 'ClickUp task',
  },
  {
    problem: 'Low VA Booking Rate',
    symptoms: 'Leads coming in but not converting to appointments',
    diagnosis: 'VAs not calling within 5 min, outdated Account Specific Document, or script issues',
    prescription: 'Flag to Leila/Aica with specific lead examples + call timestamps. Request call recording review.',
    owner: 'Leila / Aica',
    via: 'Direct message',
  },
  {
    problem: 'Ads Not Spending',
    symptoms: 'Zero or minimal spend 3+ days in a row',
    diagnosis: 'Campaign paused (billing fail), ad disapproval, or turned off accidentally',
    prescription: 'Check Meta Ads Manager: campaign status → billing → ad approval status. Then assign fix to Emmanuel.',
    owner: 'You (audit) → Emmanuel',
    via: 'Meta + ClickUp',
  },
  {
    problem: 'Billing Failure / Card Declined',
    symptoms: 'Meta flags billing issue, campaign pauses',
    diagnosis: 'Client card declined, threshold limit hit, or bank blocked Meta',
    prescription: 'CALL the client immediately. Every day paused = delayed cashflow. Get card updated or bank contacted same day.',
    owner: 'You — phone call',
    via: 'Direct client call',
  },
  {
    problem: 'Low Client Close Rate on Appointments',
    symptoms: 'Appointments booked but client says they\'re not converting to jobs',
    diagnosis: 'Could be lead quality OR client-side sales problem — need data to distinguish',
    prescription: 'Get full CRM sales data first. If confirmed lead quality issue → escalate to Mani. If sales issue → client coaching.',
    owner: 'You (data) → Mani',
    via: 'Review call',
  },
  {
    problem: 'Low Show Rate on Appointments',
    symptoms: 'Appointments booked but homeowners not showing up for inspections',
    diagnosis: 'Reminder automation failure, poor qualification, or long gap between booking and appointment',
    prescription: 'Audit SMS/email reminder automations in GHL. Improve confirmation flow. Requalify long-pending leads.',
    owner: 'Emmanuel + Leila/Aica',
    via: 'ClickUp task',
  },
  {
    problem: 'Open Leads Not Getting Called',
    symptoms: 'Logbook has 10+ white (uncalled) leads sitting open',
    diagnosis: 'VA bandwidth issue, calling hours not aligned with leads, or scheduling gap',
    prescription: 'Flag to Leila with Logbook screenshot + timestamps. Request immediate reassignment and escalation.',
    owner: 'Leila / Aica',
    via: 'Direct message + screenshot',
  },
  {
    problem: 'No New Leads for 3+ Days',
    symptoms: 'Form submissions stopped across the board',
    diagnosis: 'Campaign paused, ad disapproval, billing failure, or Andromeda creative fatigue extreme',
    prescription: 'Check Meta: campaign running? Billing active? Ads approved? If all OK → creative refresh.',
    owner: 'You (audit) → Emmanuel',
    via: 'Meta Ads Manager',
  },
];

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

      {/* Layer system reminder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-brand-yellow p-4">
          <div className="font-black text-sm mb-1">Layer 1 — Check First, Always</div>
          <div className="text-xs text-brand-black/70 mb-2">Total Bookings vs Target / Cost Per Booking / Target Achievement %</div>
          <div className="bg-black/10 rounded-lg p-2 text-xs font-black">If Layer 1 is GREEN → stop. Don&apos;t touch Layer 2.</div>
        </div>
        <div className="rounded-xl bg-brand-black p-4">
          <div className="font-black text-sm text-brand-yellow mb-1">Layer 2 — Only When Layer 1 Fails</div>
          <div className="text-xs text-white/60 mb-2">CTR, CPC, CPM, survey conversion, VA pickup rate, out-of-service-area rate</div>
          <div className="bg-white/10 rounded-lg p-2 text-xs font-black text-white">These are diagnostic tools, not reporting metrics.</div>
        </div>
      </div>

      {/* Interactive KPI Playbook */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Interactive Diagnosis Playbook</h3>
        <Card border>
          <KPIPlaybook />
        </Card>
      </div>

      {/* Full problem matrix */}
      <ExpandableCard title="Complete Problem → Diagnosis → Prescription Reference" subtitle="10 common scenarios with root causes and exact fix owners" defaultOpen>
        <div className="space-y-3">
          {PROBLEMS.map((p) => (
            <div key={p.problem} className="bg-brand-gray-light rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-black text-sm text-brand-black">{p.problem}</div>
                <span className="text-[10px] bg-brand-yellow px-2 py-0.5 rounded-full font-black flex-shrink-0">{p.owner}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="font-black text-brand-gray uppercase tracking-widest text-[9px] mb-1">Symptoms</div>
                  <div className="text-brand-gray">{p.symptoms}</div>
                </div>
                <div>
                  <div className="font-black text-brand-gray uppercase tracking-widest text-[9px] mb-1">Root Cause</div>
                  <div className="text-brand-gray">{p.diagnosis}</div>
                </div>
                <div>
                  <div className="font-black text-brand-gray uppercase tracking-widest text-[9px] mb-1">Prescription</div>
                  <div className="text-brand-black font-medium">{p.prescription}</div>
                  <div className="text-[10px] text-brand-gray mt-1">via: {p.via}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Quick problem matrix table */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Quick Reference — Owner by Problem Type</h3>
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
                { problem: 'High OSA Rate', cause: 'Radius mismatch', fix: 'Audit all 3 sources, add exclusions', owner: 'Emmanuel' },
                { problem: 'Low Booking Rate', cause: 'VA speed or script issue', fix: 'VA retrain + script review', owner: 'Leila / Aica' },
                { problem: 'Low Show Rate', cause: 'Reminder failure or bad qual', fix: 'Automations + confirmation flow', owner: 'Emmanuel + You' },
                { problem: 'Ads not spending', cause: 'Billing fail / disapproval', fix: 'Check Meta → call client', owner: 'You → Emmanuel' },
                { problem: 'Low close rate', cause: 'Sales or lead quality issue', fix: 'Get CRM data → escalate to Mani', owner: 'Mani (if needed)' },
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
                { step: 'Before Anything', label: 'Check Context', detail: 'Is there a holiday or local event? Are you inside the first 7 days? If yes — wait. Context explains most performance dips.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Then Check', label: 'Layer 1 Still OK?', detail: 'If bookings are on track — do not touch anything. Tinkering with healthy campaigns kills momentum.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Step 1', label: 'Ad Set Duplicate (Try This First)', detail: 'Sort ads by reach. If top 3–4 ads have 90%+ of spend AND performance is declining: Duplicate the ad set. Turn off top-reach ads. Launch new set. Turn off old set. Wait 48 hours.', color: 'bg-brand-yellow border-brand-yellow' },
                { step: 'Step 2', label: '48-Hour Wait', detail: '50% chance this ad set reset restores performance without needing new creative. Wait the full 48 hours before moving to Step 3.', color: 'bg-brand-gray-light border-brand-gray-mid' },
                { step: 'Step 3', label: 'Full Creative Refresh (Only If Step 1 Failed)', detail: 'New photos only — nothing reused. Task Ken via ClickUp for AI images + Canva trifolds. Every ad set = 5 Singles + 5 Two-Folds + 5 Tri-Folds minimum.', color: 'bg-brand-black border-brand-black' },
              ].map((s) => (
                <div key={s.step} className={`rounded-xl p-3 border-2 ${s.color}`}>
                  <div className={`flex items-center gap-2 mb-1`}>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${s.color.includes('yellow') ? 'bg-brand-black text-white' : s.color.includes('black') ? 'bg-brand-yellow text-brand-black' : 'bg-brand-black text-white'}`}>{s.step}</span>
                    <span className={`font-black text-sm ${s.color.includes('black') && !s.color.includes('bg-brand-gray') ? 'text-white' : ''}`}>{s.label}</span>
                  </div>
                  <p className={`text-xs ${s.color.includes('bg-brand-black') ? 'text-white/70' : 'text-brand-gray'}`}>{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* CAPI / Pixel Conditioning */}
      <ExpandableCard title="CAPI Setup & Pixel Conditioning" subtitle="If CAPI is missing, Meta is spending blind">
        <div className="space-y-3">
          <InfoBox type="warning" title="CAPI is Non-Negotiable">
            CAPI (Conversions API) sends qualified lead data from GHL directly to Meta. Without it, Meta doesn&apos;t know which leads converted — it can&apos;t optimize toward real buyers. Task Emmanuel immediately if CAPI is missing.
          </InfoBox>
          <div className="space-y-2">
            {[
              { label: 'How CAPI works', detail: 'VA applies "Qualified" tag in GHL → fires "Schedule" event to Meta via CAPI → Meta learns which user profiles convert → pixel becomes more targeted over time.' },
              { label: 'Verify CAPI is configured', detail: 'Check GHL automations: when "Qualified" tag is applied, a conversion event should fire to Meta. If not → task Emmanuel with HIGH priority.' },
              { label: 'Backfill historical data', detail: 'If CAPI was missing and just added: apply Qualified tag to all existing booked leads. This sends historical conversion data and accelerates pixel conditioning.' },
              { label: 'B2C naming requirement', detail: 'All campaign names must include "B2C" — required for Account Master Dashboard tracking. Verify after any duplication or new setup.' },
              { label: 'Campaign objective must be Leads', detail: 'Always Leads objective. Never Traffic, Conversions, or Awareness. Verify after Emmanuel sets up or duplicates any campaign.' },
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
      </ExpandableCard>

      {/* The 24-48 hour rule */}
      <div className="rounded-2xl bg-brand-black p-5">
        <div className="text-brand-yellow font-black text-xs uppercase tracking-widest mb-2">The 24–48 Hour Rule</div>
        <h3 className="text-white font-black text-lg mb-3">No blocker sits unresolved.</h3>
        <div className="space-y-2 text-sm">
          {[
            { time: '0–24 hours', action: 'Identify the blocker. Who owns it? What do they need? Message them with specific details.', color: 'bg-white/10 text-white/70' },
            { time: '24–48 hours', action: 'Follow up via a different channel if no response. Phone call if Slack went unanswered.', color: 'bg-brand-yellow/20 text-brand-yellow' },
            { time: '48+ hours', action: 'Escalate to Jonathan with evidence: "I\'ve followed up 3 times via [channels]. Here\'s the paper trail."', color: 'bg-red-900/40 text-red-300' },
          ].map((t) => (
            <div key={t.time} className={`rounded-xl p-3 ${t.color}`}>
              <div className="font-black text-xs uppercase tracking-widest mb-0.5 opacity-90">{t.time}</div>
              <div className="text-xs">{t.action}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/75">&quot;Still waiting&quot; is never an acceptable account status at any point.</div>
      </div>

      <InfoBox type="warning" title="Critical Reminder">
        You are <strong>not the one executing</strong> the fixes — you are prescribing them and coordinating with specialists.
        Keep clear ClickUp records so there&apos;s accountability on every action item. If it&apos;s not in ClickUp, it doesn&apos;t exist.
      </InfoBox>
    </SectionWrapper>
  );
}
