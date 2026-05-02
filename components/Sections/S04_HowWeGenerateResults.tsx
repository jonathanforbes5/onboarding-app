'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { FullFunnel } from '@/components/Diagrams/FullFunnel';

const META_RULES = [
  { setting: 'Placements', rule: 'ONLY 6: FB Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels', alert: true },
  { setting: 'Targeting', rule: 'Broad only — no interest targeting, no lookalikes. Exception: income targeting (top 25–50%) if leads are consistently unqualified.', alert: false },
  { setting: 'Ad Count', rule: '6–8 ads maximum at $100/day spend. More = budget too thin, algorithm can\'t learn.', alert: false },
  { setting: 'Copy Variants', rule: 'Main copy + No copy are the core. Insurance variant for storm/hail markets (CO, FL during hurricane season) only.', alert: false },
  { setting: 'Campaign Name', rule: 'Must include "B2C" — Account Master Dashboard only tracks campaigns with this keyword.', alert: true },
  { setting: 'Business Managers', rule: 'NEVER create a BM for a client. Legal liability. Guide them to create their own.', alert: true },
];

const CREATIVE_TYPES = [
  { type: 'Trust', desc: 'Real team photos, job site photos, before/afters, reviews', best: 'Single ads', icon: '🤝' },
  { type: 'Service', desc: 'In-progress work, equipment, trucks, crews on rooftops', best: 'Single + Two-fold top', icon: '🔨' },
  { type: 'Brand', desc: 'Logo, van wraps, company colors, office — used sparingly', best: 'Two-fold bottom, Tri-fold', icon: '🏢' },
];

const AD_SET_STANDARD = [
  { format: 'Single', count: 5, rule: 'Trust or Service photos only — no Brand in Singles', icon: '1️⃣' },
  { format: 'Two-Fold', count: 5, rule: 'Trust on top (required) + Trust/Service/Brand below', icon: '2️⃣' },
  { format: 'Tri-Fold', count: 5, rule: 'Trust top-left + any top-right + any bottom', icon: '3️⃣' },
];

export function S04_HowWeGenerateResults() {
  return (
    <SectionWrapper sectionId={4}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The System</div>
        <h2 className="text-xl font-black text-white mb-2">Meta Ads → Booked Appointment</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          We build a complete lead generation machine for every client — from the first ad impression to a confirmed appointment in their calendar.
          Every step is measurable. Every step is optimizable. Your job is to know which lever to pull when results drop.
        </p>
      </Card>

      {/* Full funnel diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Full Funnel</h3>
        <Card border>
          <FullFunnel />
        </Card>
      </div>

      {/* Funnel step details */}
      <ExpandableCard title="Funnel Step-by-Step Breakdown" subtitle="What happens at each stage and what can go wrong" defaultOpen>
        <div className="space-y-3">
          {[
            {
              step: '1. Meta Ads', owner: 'Emmanuel / Mervin', metric: 'CTR target: 1–3%',
              desc: 'Facebook and Instagram ads drive homeowner traffic. Native-looking creatives (real photos, not polished drone footage) outperform every time. Broad targeting — algorithm finds the buyers.',
              fail: 'Low CTR = creative fatigue or wrong audience. High CTR + low surveys = landing page mismatch.',
            },
            {
              step: '2. Landing Page', owner: 'Emmanuel', metric: 'Survey start rate: >15%',
              desc: 'Conversion-optimized page aligned to the ad promise. Short, direct, mobile-first. The headline must match what the ad offered — any mismatch kills conversion.',
              fail: 'Low start rate = headline mismatch, too many distractions, slow load time.',
            },
            {
              step: '3. Qualification Survey', owner: 'Emmanuel', metric: 'Completion rate: >2.5%',
              desc: '4–7 questions that filter tire-kickers and confirm budget/intent. Must be simple and match the offer. Standard: property type, zip code, homeowner status, contact info.',
              fail: 'Low completion = too many questions, confusing language, or friction. Switch to 4-question if below 1.5%.',
            },
            {
              step: '4. GoHighLevel CRM', owner: 'Emmanuel', metric: 'Lead visibility: 100%',
              desc: 'GHL centralizes all leads with automations: instant SMS, email sequences, pipeline stages. CAPI fires "Schedule" event to Meta when a lead is qualified — trains the algorithm.',
              fail: 'Leads not showing up = CAPI misconfigured, pixel not firing, or webhook broken.',
            },
            {
              step: '5. VA Call (< 5 min)', owner: 'Leila / Aica', metric: 'Speed: < 5 minutes',
              desc: 'VA team contacts every lead within 5 minutes, 7 days/week. First-to-call wins in home services — especially HVAC. Uses Account Specific Document for accurate answers.',
              fail: 'Low booking rate = slow response, outdated Account Specific Doc, or weak VA script.',
            },
            {
              step: '6. Booked Appointment', owner: 'YOU (outcome)', metric: 'Target: varies by spend',
              desc: 'VA books the appointment directly into the client\'s calendar. Confirmation SMS sent. This is your Layer 1 metric — bookings vs target. Everything else is a diagnostic tool.',
              fail: 'Low bookings = start at Layer 1, then work backwards through the funnel to find the break.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-brand-gray-light rounded-xl p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="font-black text-sm text-brand-black">{item.step}</div>
                <div className="text-[10px] bg-brand-yellow px-2 py-0.5 rounded-full font-black flex-shrink-0">{item.metric}</div>
              </div>
              <div className="text-xs text-brand-gray mb-1">{item.desc}</div>
              <div className="text-[11px] text-red-600"><strong>If failing:</strong> {item.fail}</div>
              <div className="text-[10px] text-brand-gray/60 mt-1">Owner: {item.owner}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* What we build */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">What We Build for Every Client</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Meta Ads Campaigns', desc: 'Lead campaigns with B2C naming. 6 approved placements only. 6–8 ads at $100/day.', icon: '📢' },
            { title: 'Landing Pages', desc: 'Conversion-optimized, mobile-first, aligned to ad promise. Hosted on Cloudflare.', icon: '🖥️' },
            { title: 'Qualification Survey', desc: '4–7 questions filtering intent, budget, and service area. No tire-kickers.', icon: '📋' },
            { title: 'GoHighLevel CRM', desc: 'Pipelines, workflows, SMS/email automations, calendar booking, CAPI integration.', icon: '⚙️' },
            { title: 'A2P Registration', desc: 'GHL phone registration via A2P Wizard — always Emmanuel. Rejection = 2–3 week lockout.', icon: '📱' },
            { title: 'VA Assignment + Scripting', desc: 'VAs assigned by Leila with Account Specific Document. <5 min response SLA.', icon: '📞' },
            { title: 'CAPI Configuration', desc: 'Sends booked appointment data back to Meta pixel — trains algorithm on real buyers.', icon: '🔄' },
            { title: 'Account Specific Document', desc: 'VA cheat sheet: hours, zip codes, pricing, calendar access, common Q&A.', icon: '📄' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-brand-gray-mid">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-xs text-brand-gray mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta non-negotiables */}
      <ExpandableCard title="Meta Ads — Non-Negotiables" subtitle="Hard rules you must know to QA setups and diagnose problems">
        <div className="space-y-2">
          {META_RULES.map((rule) => (
            <div key={rule.setting} className={`flex items-start gap-3 p-3 rounded-xl ${rule.alert ? 'bg-red-50 border border-red-200' : 'bg-brand-gray-light'}`}>
              <div className={`font-black text-xs flex-shrink-0 min-w-[80px] ${rule.alert ? 'text-red-600' : 'text-brand-yellow bg-brand-black px-2 py-0.5 rounded text-center'}`}>
                {rule.alert ? '⛔ ' : ''}{rule.setting}
              </div>
              <div className={`text-xs ${rule.alert ? 'text-red-800' : 'text-brand-gray'}`}>{rule.rule}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Creative standards */}
      <ExpandableCard title="Creative Standards — Ad Set 101" subtitle="3 photo types × 3 formats = 15 creatives minimum per set">
        <div className="space-y-4">
          <div>
            <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">3 Creative Photo Types</div>
            <div className="grid grid-cols-3 gap-2">
              {CREATIVE_TYPES.map((c) => (
                <div key={c.type} className="bg-brand-gray-light rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{c.icon}</div>
                  <div className="font-black text-xs text-brand-black">{c.type}</div>
                  <div className="text-[10px] text-brand-gray mt-1">{c.desc}</div>
                  <div className="text-[10px] text-brand-yellow font-black mt-1">{c.best}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">3 Ad Formats — 5 Each = 15 Total</div>
            <div className="space-y-2">
              {AD_SET_STANDARD.map((f) => (
                <div key={f.format} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
                  <div className="text-xl flex-shrink-0">{f.icon}</div>
                  <div>
                    <div className="font-black text-sm">{f.format} × {f.count}</div>
                    <div className="text-xs text-brand-gray mt-0.5">{f.rule}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InfoBox type="warning">
            <strong>AI Images (Ken&apos;s work):</strong> Logos must be perfect. No jumbled text. No &quot;twins&quot; (same person twice). Don&apos;t spam the logo. Likeness must be consistent across images. A set that violates these gets rejected.
          </InfoBox>

          <div className="bg-brand-black rounded-xl p-4">
            <div className="font-black text-xs text-brand-yellow uppercase tracking-widest mb-2">Post-Andromeda Creative Refresh Protocol</div>
            <div className="text-xs text-white/70 space-y-1">
              <p>Meta&apos;s Andromeda update concentrates spend on top 3–4 ads. When those fatigue:</p>
              <div className="space-y-1 mt-2">
                {['Turn off top-reach ads (not the campaign)', 'Duplicate the ad set', 'Launch the new ad set', 'Turn off the old ad set', '50/50 outcome — if it flops, do a full Ken creative refresh'].map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-brand-yellow font-black flex-shrink-0">{i + 1}.</span>
                    <span className="text-white/60">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ExpandableCard>

      {/* Facebook page access scenarios */}
      <ExpandableCard title="Facebook Page Access — Common Scenarios" subtitle="Know these cold — you will hit all of them">
        <div className="space-y-2">
          {[
            { scenario: 'Page is in a BM you can\'t access (locked by former agency)', solution: 'Client: FB page → Settings → Page Access → add you as individual with "Run Ads" permission. Requires Facebook friend request first.' },
            { scenario: 'Client has no Facebook page at all', solution: 'Help client create a new page from their BM. Warning: new pages look sparse — they need photos, reviews, and 200+ followers before launch. Boost manually.' },
            { scenario: 'Client lost page access (ex-employee removed them)', solution: 'Client contacts Meta support for account recovery. Explore running from a fresh connected page temporarily while recovering.' },
            { scenario: 'New Facebook page with < 200 followers', solution: 'Boost the page using your own accounts and other pages we manage to get it to 200+ before running ads. An empty page = poor ad delivery.' },
          ].map((item) => (
            <div key={item.scenario} className="p-3 bg-brand-gray-light rounded-xl">
              <div className="font-black text-xs text-brand-black mb-1">Scenario: {item.scenario}</div>
              <div className="text-xs text-brand-gray"><strong>Solution:</strong> {item.solution}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* 80/20 rule */}
      <Card yellow>
        <h3 className="font-black text-base mb-1">The 80/20 of Performance</h3>
        <p className="text-sm text-brand-black/70 mb-4">20% of inputs drive 80% of results. Know where to focus first.</p>
        <div className="space-y-2">
          {[
            { num: '01', factor: 'Ad Creative Quality', impact: 'Drives cost per lead — #1 lever', detail: 'Raw client photos consistently outperform polished drone footage. Looks like an ad = performs worse.' },
            { num: '02', factor: 'Survey Conversion Rate', impact: 'Filters lead quality', detail: 'Target >2.5%. Below 1.5% = immediate fix. Shorten questions, simplify language.' },
            { num: '03', factor: 'Speed to Lead (< 5 min)', impact: 'Drives booking rate — critical for HVAC', detail: 'Every minute past 5 drops booking rate. HVAC emergencies = competition is calling too.' },
            { num: '04', factor: 'VA Script Quality', impact: 'Drives appointment quality + show rate', detail: 'VAs must use Account Specific Document. Outdated info = wrong answers = cancelled appointments.' },
            { num: '05', factor: 'Client Follow-Up Reminders', impact: 'Drives show rate', detail: 'SMS confirmation + day-before reminder reduces no-shows significantly. Monitor reminder automations.' },
          ].map((f) => (
            <div key={f.num} className="flex items-start gap-3 p-3 bg-black/10 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center flex-shrink-0">{f.num}</div>
              <div>
                <div className="font-black text-sm">{f.factor}</div>
                <div className="text-xs text-brand-black/60">→ {f.impact}</div>
                <div className="text-xs text-brand-black/50 mt-0.5">{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Real insight from Pod 1 */}
      <ExpandableCard title="Real Lessons from Pod 1 (Live Accounts)" subtitle="Hard-won nuance from actual account review calls">
        <div className="space-y-3">
          {[
            {
              title: 'Cost Per Booking ≠ Cost Per Lead',
              detail: 'Pod 1 was dividing spend by leads and calling it Cost per Booking. It\'s ad spend ÷ booked appointments. CPL is a Layer 2 diagnostic only. Always report Cost per Booking.',
            },
            {
              title: 'Check for Holidays Before Diagnosing Ads',
              detail: 'Easter weekend killed results across multiple accounts. Before changing anything, check: was there a holiday or local event? A 7-day window including 3 dead days looks terrible — but the 4 days post-holiday may show normal results.',
            },
            {
              title: 'Open Leads Are Revenue Waiting to Happen',
              detail: 'Before assuming a performance problem, check the Logbook for open/unbooked leads. If 17 unbooked leads are sitting there, that\'s a VA calling problem — not a media problem. Flag to Leila immediately.',
            },
            {
              title: 'Layer 1 Green = Don\'t Touch Layer 2',
              detail: 'An account had terrible CPC and CTR on 7-day view. Oscar was about to suggest pausing ads. Jonathan pulled the logbook: 14 leads, all crushing it. Easter dead days skewed the 7-day window. L1 was fine → no action needed.',
            },
          ].map((lesson) => (
            <div key={lesson.title} className="p-3 bg-brand-gray-light rounded-xl">
              <div className="font-black text-sm mb-1">💡 {lesson.title}</div>
              <div className="text-xs text-brand-gray">{lesson.detail}</div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      <InfoBox type="tip" title="Your Role in the Funnel">
        You own the outcome — not the execution. Emmanuel handles the build, Ken handles creatives, Leila manages VAs. But when something breaks, you identify it, prescribe the fix, coordinate the right person, and verify improvement.
        <strong> Think like a doctor: diagnose → prescribe → coordinate → verify.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
