'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { LayeredThinking } from '@/components/Diagrams/LayeredThinking';
import { MarketDifficulty } from '@/components/Diagrams/MarketDifficulty';
import { useApp } from '@/context/AppContext';

const LAYER1 = [
  {
    metric: 'Total Booked Appointments vs goal',
    target: 'Within 80% of contracted goal',
    note: '80% margin variance is the bar. Below = optimise, extend cycle, or re-baseline.',
  },
  {
    metric: 'Cost Per Booked Appointment',
    target: '$225–$250 in default markets — varies by market',
    note: 'Easy markets (NY, most Midwest, San Diego, most FL, AL, Atlanta) routinely hit at or under. Hard markets carry an elevated goal baked into the contract. Always reference the market difficulty list before promising.',
  },
  {
    metric: 'Compare CPA vs client gross margin per job',
    target: 'CPA must be sustainable for THEM',
    note: 'A $400 CPA is fine for a roofer doing $25K jobs. Lethal for a gutter shop doing $1.5K jobs. Their math is the actual constraint.',
  },
];

// Order is the one Oscar specified. "CTR" (without "Link") was removed — we only track Link CTR.
const LAYER2 = [
  { metric: 'CPM',                    note: 'Cost to reach the audience. High CPM = expensive market or poor ad strength score.' },
  { metric: 'Link CPC',               note: 'Cost per actual click to landing page. The cleanest cost signal.' },
  { metric: 'Link CTR',               note: 'Driven by creative + copy + hook. The lever for fixing high CPC.' },
  { metric: 'CPC (all)',              note: 'Cost per click including post engagement. Compare to Link CPC to see if eng-heavy creative is masking the truth.' },
  { metric: 'CPA (all)',              note: 'Front-end Meta CPA — cost per Schedule event Meta sees, not contracted CPA.' },
  { metric: 'Survey conversion rate', note: 'Driven by survey length + landing page + offer clarity. Test 7q vs 4q.' },
  { metric: 'VA lead-to-book rate',   note: 'Driven by VA speed + script + lead quality. Owner: Leila.' },
  { metric: 'OSA rate',               note: 'Out-of-Service-Area. Keep < 15%. Above = audit zip exclusions, ASD targeting, app placements.' },
  { metric: 'Show rate',              note: 'Reminders + qualification + client-side follow-up. Often a sales-side problem, not a media one.' },
];

const LAYER3 = [
  { lever: 'Creative refresh',          appliesTo: 'CPM / Link CPC / Link CTR fatigue',         detail: 'Source organic from client first. Then public assets (FB, IG, GMB, Yelp, website). Ken last as gap-filler.' },
  { lever: 'Survey question count',     appliesTo: 'Survey conversion rate',                    detail: '7q vs 4q changes conversion materially. Test it.' },
  { lever: 'Landing page headline',     appliesTo: 'Survey conversion rate',                    detail: 'Match-message between ad hook and LP hero.' },
  { lever: 'Audience exclusions',       appliesTo: 'OSA rate',                                  detail: 'Out-of-area zips, app placements, broad vs lookalike.' },
  { lever: 'Speed to lead < 5 min',     appliesTo: 'VA lead-to-book rate (under OSA umbrella)', detail: 'Non-negotiable. > 15min = escalate to Leila immediately. Treat as a Layer 3 OSA-adjacent lever.' },
  { lever: 'Phone number trust',        appliesTo: 'VA lead-to-book rate',                      detail: 'CNAME / SHAKEN-STIR / double-call policy. Affects whether leads pick up at all.' },
  { lever: 'Reminder cadence',          appliesTo: 'Show rate',                                 detail: 'SMS + email at 24h, 1h, day-of. Layer the reminders.' },
  { lever: 'Pixel + CAPI conditioning', appliesTo: 'Front-end CPA (all)',                       detail: 'Advanced conditioning. Confirm Schedule events fire when VAs apply Qualified tag.' },
];

export function S08_MetricsHierarchy() {
  const { setCurrentSection } = useApp();
  return (
    <SectionWrapper sectionId={8}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Metrics Framework</div>
        <h2 className="text-xl font-black text-white mb-2">Think Like A Doctor</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          <strong className="text-white">Layer 1</strong> tells you <em>if</em> there&apos;s a problem.
          <strong className="text-white"> Layer 2</strong> tells you <em>why</em>.
          <strong className="text-white"> Layer 3</strong> is the actual lever you pull.
          Always check Layer 1 first — if it&apos;s green, stop. Don&apos;t boil the ocean.
        </p>
      </Card>

      {/* Layered thinking visual (shared with Section 15) */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Layered Model — Click Each Level</h3>
        <Card border>
          <LayeredThinking />
        </Card>
        <div className="mt-2 text-xs text-brand-gray">
          See <button onClick={() => setCurrentSection(15)} className="underline font-bold text-brand-black">Section 15: Layered Thinking</button> for worked examples and the 80% margin variance rule.
        </div>
      </div>

      {/* Layer 1 */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Layer 1 — Outcomes (check first, every audit)</h3>
        <div className="space-y-2">
          {LAYER1.map((m) => (
            <div key={m.metric} className="rounded-xl bg-brand-yellow p-3">
              <div className="font-black text-sm text-brand-black">{m.metric}</div>
              <div className="text-xs font-bold text-brand-black/70 mt-0.5">Target: {m.target}</div>
              <div className="text-xs text-brand-black/70 mt-1.5 leading-relaxed">{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market difficulty (drives the CPA target) */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Market Difficulty — Adjusts The CPA Bar</h3>
        <Card border>
          <MarketDifficulty />
        </Card>
        <div className="mt-2 text-xs text-brand-gray">
          Layer 1 CPA targets shift by market. Always check this before promising a number on a sales call or onboarding setup. The Client Map (Section 7) shades states by tier so you can see the picture at a glance.
        </div>
      </div>

      {/* Layer 2 */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Layer 2 — Drivers (only when Layer 1 is red)</h3>
        <div className="rounded-xl border border-brand-gray-mid overflow-hidden">
          <div className="grid grid-cols-12 bg-brand-black text-white text-[10px] font-black uppercase tracking-widest">
            <div className="p-3 col-span-1 text-center">#</div>
            <div className="p-3 col-span-3">Metric</div>
            <div className="p-3 col-span-8">Why it matters / what drives it</div>
          </div>
          {LAYER2.map((m, i) => (
            <div key={m.metric} className={`grid grid-cols-12 text-xs items-start ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray-light'}`}>
              <div className="p-3 col-span-1 text-center font-black text-brand-yellow bg-brand-black">{i + 1}</div>
              <div className="p-3 col-span-3 font-black text-brand-black">{m.metric}</div>
              <div className="p-3 col-span-8 text-brand-gray leading-relaxed">{m.note}</div>
            </div>
          ))}
        </div>
        <div className="text-[11px] text-brand-gray mt-2">
          Order matters — work top to bottom. CPM and Link CPC are upstream of everything else. Survey CVR / book rate / show rate are funnel-side.
        </div>
      </div>

      {/* Layer 3 */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Layer 3 — Levers You Actually Pull</h3>
        <div className="space-y-1.5">
          {LAYER3.map((l) => (
            <div key={l.lever} className="rounded-xl bg-white border border-brand-gray-mid px-3 py-2">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="font-black text-sm text-brand-black">{l.lever}</span>
                <span className="text-[10px] font-bold bg-brand-black text-brand-yellow px-2 py-0.5 rounded">{l.appliesTo}</span>
              </div>
              <div className="text-xs text-brand-gray mt-1">{l.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="The flow">
        Layer 1 green → stop, monitor only. Layer 1 red → drill into Layer 2 for THAT specific metric (top-down: CPM first). Pick the biggest, easiest-to-solve Layer 2 driver. Reach into Layer 3 to pull the lever. Verify Layer 1 improves. Repeat. <strong>Don&apos;t boil the ocean.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
