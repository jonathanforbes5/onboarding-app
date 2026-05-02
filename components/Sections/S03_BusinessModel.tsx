'use client';
import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';
import { CycleModel } from '@/components/Diagrams/CycleModel';

const COMP_TIERS = [
  { clients: 20, monthly: '$1,600', annual: '$19,200', ote: '~$105,100 CAD', churn: '5.2%', label: 'Baseline' },
  { clients: 25, monthly: '$2,000', annual: '$24,000', ote: '~$120,000 CAD', churn: '3.5%', label: 'On-Track', highlight: true },
  { clients: 30, monthly: '$2,400', annual: '$28,800', ote: '~$133,700 CAD', churn: '2.5%', label: 'Elite' },
];

const BONUSES = [
  { trigger: 'Client completes Cycle 1 (renews into Cycle 2)', amount: '$150', why: '60% of all churn happens before Cycle 3. Surviving this window is worth money.' },
  { trigger: 'Client completes Cycle 2 (renews into Cycle 3)', amount: '$100', why: 'Client is now stabilized. Churn risk drops dramatically from here.' },
  { trigger: 'Launch within 7 days of close', amount: '$50', why: 'Speed to launch = #1 predictor of retention. Fast launch = protected commission.' },
  { trigger: 'Launch within 14 days of close', amount: '$25', why: 'Every day unlaunched is a day the client loses confidence.' },
  { trigger: 'Onboarding QA score 90%+', amount: '$50', why: 'Strong onboarding re-sells the client on the partnership and prevents early churn.' },
  { trigger: 'Onboarding QA score 80–89%', amount: '$25', why: 'Consistent strong onboardings compound into Cycle 1 + 2 milestone bonuses.' },
  { trigger: 'Client refers a deal that closes', amount: '$500', why: 'Only CSMs with great relationships earn referrals. Cannot be manufactured.' },
  { trigger: 'Client provides a video testimonial', amount: '$250', why: 'Video testimonials require trust. Reflect the value you deliver.' },
];

const PENALTIES = [
  { trigger: 'Client churns in Cycle 1–2 AND onboarding QA < 80%', penalty: '-$200', note: 'Preventable churn from poor onboarding. If QA was 80%+, no penalty.' },
  { trigger: 'Response time SLA miss: > 4 hours, 3+ times in a month', penalty: '-$200/mo', note: 'Clients need to know you are there. Responsiveness is non-negotiable.' },
  { trigger: 'Late launch (not live within 21 days) AND delay was CSM-controlled', penalty: '-$150', note: 'Applies only when CSM fault is clear — not when client went dark despite follow-ups.' },
];

const CYCLE_BARS = [
  { cycle: 1, h: 25 },
  { cycle: 2, h: 35 },
  { cycle: 3, h: 48 },
  { cycle: 4, h: 58 },
  { cycle: 5, h: 68 },
  { cycle: 6, h: 76 },
  { cycle: 10, h: 100 },
];

export function S03_BusinessModel() {
  const [activeTab, setActiveTab] = useState<'model' | 'comp'>('model');

  return (
    <SectionWrapper sectionId={3}>

      {/* Tab toggle */}
      <div className="flex rounded-xl overflow-hidden border border-brand-gray-mid">
        {(['model', 'comp'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-black transition-colors ${
              activeTab === tab
                ? 'bg-brand-black text-brand-yellow'
                : 'bg-white text-brand-gray hover:bg-brand-gray-light'
            }`}
          >
            {tab === 'model' ? '📋 Business Model' : '💰 Compensation'}
          </button>
        ))}
      </div>

      {activeTab === 'model' && (
        <>
          {/* Core Model */}
          <Card dark>
            <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The Core Model</div>
            <h2 className="text-xl font-black text-white mb-3">28-Day Performance Cycle</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Clients pay <strong className="text-white">only when targets are hit</strong> — qualified booked appointments.
              Each cycle is 28 days: we run ads, qualify leads, book appointments, and bill on delivery.
              This performance-based model creates mutual accountability and compounds revenue for both sides.
            </p>
          </Card>

          {/* 28-Day Cycle Diagram */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 28-Day Cycle Model</h3>
            <Card border>
              <CycleModel />
            </Card>
          </div>

          {/* Key numbers */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Numbers — Standard Account</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Standard Retainer', value: '~$4,000/cycle', sub: '+ 10% of monthly ad spend', icon: '💵' },
                { label: 'KRS / Gutter Shutter Rate', value: '$3,300/cycle', sub: '+ 10% of ad spend — always verify', icon: '🏢' },
                { label: 'Setup Fee', value: '$1,500–$5,000', sub: 'One-time upfront, paid before launch', icon: '🔧' },
                { label: 'Billing Threshold (80% Rule)', value: '80% of target', sub: '20 agreed = 16 min to bill', icon: '📊' },
                { label: 'Avg Ad Spend', value: '$100/day', sub: '$2,800/cycle — scales with client', icon: '📢' },
                { label: 'Booking Target', value: '15 bookings', sub: 'At $100/day — scales with spend', icon: '📅' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-brand-gray-mid p-3">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="font-black text-sm text-brand-black">{item.value}</div>
                  <div className="text-[10px] text-brand-gray mt-0.5">{item.label}</div>
                  <div className="text-[10px] text-brand-gray/60 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing outcomes */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Billing Outcomes — 3 Scenarios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Hit 100%+ of Target', icon: '✅', result: 'Bill full retainer + initiate renewal conversation 5–7 days before cycle end', color: 'bg-green-50 border-green-300', text: 'text-green-800' },
                { label: '80–99% (Min Threshold)', icon: '🟡', result: 'Bill retainer — 80% rule met. Optimize going into next cycle.', color: 'bg-yellow-50 border-yellow-300', text: 'text-yellow-800' },
                { label: 'Below 80%', icon: '🔴', result: 'No bill. Extend cycle at no charge. Escalate to Jonathan if 42+ days.', color: 'bg-red-50 border-red-300', text: 'text-red-800' },
              ].map((s) => (
                <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className={`font-black text-sm mb-1 ${s.text}`}>{s.label}</div>
                  <div className={`text-xs ${s.text} opacity-80`}>{s.result}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Setup fee breakdown */}
          <ExpandableCard title="Setup Fee — $1,500 to $5,000" subtitle="One-time upfront — paid before launch" defaultOpen>
            <div className="space-y-3 text-sm">
              <p className="text-brand-gray">Covers all infrastructure before the first cycle begins. Emmanuel leads setup within 5–10 business days.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { item: 'Landing pages', who: 'Emmanuel' },
                  { item: 'Qualification surveys', who: 'Emmanuel' },
                  { item: 'GoHighLevel CRM + automations', who: 'Emmanuel + Mervin' },
                  { item: 'Meta ad campaigns', who: 'Emmanuel' },
                  { item: 'VA assignment + scripting', who: 'Leila' },
                  { item: 'Calendar integration', who: 'Emmanuel' },
                  { item: 'A2P registration (GHL)', who: 'Emmanuel — A2P Wizard' },
                  { item: 'Domain + Cloudflare setup', who: 'Jonathan / Porkbun' },
                  { item: 'Pixel + CAPI configuration', who: 'Emmanuel' },
                ].map((i) => (
                  <div key={i.item} className="bg-brand-gray-light rounded-lg p-2">
                    <div className="font-bold text-xs">{i.item}</div>
                    <div className="text-[10px] text-brand-gray mt-0.5">{i.who}</div>
                  </div>
                ))}
              </div>
              <InfoBox type="warning">
                <strong>Never submit A2P yourself.</strong> A rejected A2P registration triggers a 2–3 week lockout before you can reapply. Always task Emmanuel via ClickUp.
              </InfoBox>
            </div>
          </ExpandableCard>

          {/* Why model works */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Why This Model Works</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-brand-yellow p-4">
                <div className="font-black text-sm mb-2">For Clients</div>
                <BulletList check items={[
                  'No risk — pay for results only',
                  'Predictable appointment flow',
                  'Fully managed service',
                  'Continuous optimization',
                  'No long-term contract lock-in',
                ]} />
              </div>
              <div className="rounded-xl bg-brand-black p-4">
                <div className="font-black text-sm text-brand-yellow mb-2">For Us</div>
                <BulletList check items={[
                  'Forces accountability',
                  'Creates recurring revenue',
                  'Aligned incentives',
                  'Compounding value per cycle',
                  'Retention = our profit model',
                ]} className="[&_span]:text-white/80 [&_.text-green-500]:text-brand-yellow" />
              </div>
            </div>
          </div>

          {/* Winter program */}
          <ExpandableCard title="Winter Program — November through February" subtitle="Seasonal adaptation for roofing clients">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-brand-yellow">
                  <div className="font-black text-sm mb-1">🌞 Peak Season</div>
                  <div className="text-xs text-brand-black/60 mb-2">Spring / Summer / Fall</div>
                  <BulletList items={['Full service model active', 'Aggressive scaling mode', 'Performance billing every cycle', 'Max VA call volume']} />
                </div>
                <div className="p-4 rounded-xl bg-brand-black text-white">
                  <div className="font-black text-sm text-brand-yellow mb-1">❄️ Winter Program</div>
                  <div className="text-xs text-white/50 mb-2">November – February</div>
                  <BulletList items={['Reduced retainer ~$1,500/cycle', 'Brand awareness only ($10–50/day)', 'Keeps pixel warm', 'Prevents cold start in Spring']} className="[&_span]:text-white/80" />
                </div>
              </div>
              <InfoBox type="info">See the <strong>Winter Retainer Plan SOP</strong> in the Resources tab for the complete transition process and client communication templates.</InfoBox>
            </div>
          </ExpandableCard>

          {/* KRS partners */}
          <ExpandableCard title="KRS & Franchise Partners — Special Rates" subtitle="Klaus Roofing Systems, Gutter Shutter — always verify before billing">
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-brand-gray-light">
                  <div className="font-black text-sm mb-1">Klaus Roofing Systems (KRS)</div>
                  <div className="text-xs text-brand-gray mb-2">Nationwide franchise — 10+ direct partners</div>
                  <div className="font-black text-brand-black">$3,300/cycle + 10% ad spend</div>
                  <div className="text-xs text-brand-gray mt-1">vs $4,000 standard. Always confirm if a client is KRS before every billing.</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-gray-light">
                  <div className="font-black text-sm mb-1">Gutter Shutter</div>
                  <div className="text-xs text-brand-gray mb-2">Gutter protection franchise</div>
                  <div className="font-black text-brand-black">$3,300/cycle + 10% ad spend</div>
                  <div className="text-xs text-brand-gray mt-1">Same discounted rate as KRS. Verify partnership before billing.</div>
                </div>
              </div>
              <InfoBox type="warning">Billing a KRS client at $4,000 when their contract says $3,300 is a direct contractual violation. Always check the closer call notes before billing any franchise client.</InfoBox>
            </div>
          </ExpandableCard>

          <InfoBox type="tip" title="The Compounding Effect">
            Acquiring a client costs thousands in sales overhead. Retaining one costs time and care. Every cycle you preserve multiplies the agency&apos;s revenue — and your commission. <strong>Retention IS the strategy.</strong>
          </InfoBox>
        </>
      )}

      {activeTab === 'comp' && (
        <>
          {/* OTE Overview */}
          <div className="rounded-2xl bg-brand-black overflow-hidden">
            <div className="bg-brand-yellow px-5 py-3">
              <div className="font-black text-brand-black text-base uppercase tracking-wide">Your Compensation Structure</div>
              <div className="text-brand-black/60 text-xs">Version 4.0 — Revenue Share + Milestone Model — Effective Q2 2026</div>
            </div>
            <div className="p-5 space-y-4">
              <div className="text-center py-2">
                <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Base Salary</div>
                <div className="text-4xl font-black text-brand-yellow">$6,000</div>
                <div className="text-white/50 text-xs mt-1">CAD / month ($72,000/year) — direct deposit via Intuit</div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-xs font-black uppercase tracking-widest mb-3">On-Track Earnings (OTE) by Book Size</div>
                <div className="space-y-2">
                  {COMP_TIERS.map((tier) => (
                    <div key={tier.clients} className={`rounded-xl p-3 ${tier.highlight ? 'bg-brand-yellow' : 'bg-white/10'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className={`font-black text-sm ${tier.highlight ? 'text-brand-black' : 'text-white'}`}>
                          {tier.clients} clients — {tier.label}
                        </div>
                        <div className={`font-black text-base ${tier.highlight ? 'text-brand-black' : 'text-brand-yellow'}`}>
                          {tier.ote}
                        </div>
                      </div>
                      <div className={`text-xs ${tier.highlight ? 'text-brand-black/60' : 'text-white/40'}`}>
                        2% commission = {tier.monthly}/mo ({tier.annual}/yr) · Avg churn: {tier.churn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <InfoBox type="info" className="!bg-white/5 !border-white/10 !text-white/60">
                Commission is calculated on <strong className="text-white">collected revenue</strong>, not invoiced revenue. If a client pays late, your commission is deferred — not lost — until payment is received.
              </InfoBox>
            </div>
          </div>

          {/* Commission formula */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Commission Formula</h3>
            <div className="bg-brand-black rounded-2xl p-5 text-center">
              <div className="text-white/50 text-xs mb-3 uppercase tracking-widest">Monthly Commission</div>
              <div className="text-3xl font-black text-brand-yellow mb-2">
                [Book Size] × $4,000 × 2%
              </div>
              <div className="text-white/40 text-xs mb-4">= $80/client/month at standard retainer</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: '20 clients', val: '$1,600/mo' },
                  { n: '25 clients', val: '$2,000/mo' },
                  { n: '30 clients', val: '$2,400/mo' },
                ].map((ex) => (
                  <div key={ex.n} className="bg-white/10 rounded-lg p-2">
                    <div className="text-brand-yellow font-black text-sm">{ex.val}</div>
                    <div className="text-white/40 text-xs mt-0.5">{ex.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compounding bar chart */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">How Earnings Compound With Retention</h3>
            <div className="bg-brand-black rounded-2xl p-5">
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
                {CYCLE_BARS.map((c) => (
                  <div key={c.cycle} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '3px 3px 0 0',
                        height: `${Math.round(c.h * 0.72)}px`,
                        backgroundColor: c.cycle === 10 ? '#F5C800' : `rgba(245,200,0,${0.2 + c.h / 200})`,
                      }}
                    />
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>C{c.cycle}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-white/30 text-center">Each retained cycle multiplies total earnings — retention IS the strategy</div>
              <div className="mt-3 bg-white/5 rounded-xl p-3 text-center">
                <div className="text-white/50 text-xs mb-1">A single client retained through Cycle 10 is worth:</div>
                <div className="text-brand-yellow font-black text-lg">$250 in milestones + $80/mo ongoing = $1,210 in Year 1</div>
              </div>
            </div>
          </div>

          {/* Milestone & performance bonuses */}
          <ExpandableCard title="Milestone + Performance Bonuses" subtitle="Paid monthly on top of 2% commission" defaultOpen>
            <div className="space-y-2">
              {BONUSES.map((b) => (
                <div key={b.trigger} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
                  <div className="font-black text-brand-yellow text-sm flex-shrink-0 min-w-[50px]">{b.amount}</div>
                  <div>
                    <div className="font-bold text-xs text-brand-black">{b.trigger}</div>
                    <div className="text-[11px] text-brand-gray mt-0.5">{b.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </ExpandableCard>

          {/* Ad spend upsell lever */}
          <ExpandableCard title="Ad Spend Upsell Commission" subtitle="Accounts > $200/day = ongoing 10% of management fee">
            <div className="space-y-3 text-sm">
              <p className="text-brand-gray">When a client&apos;s campaigns are performing, push to scale their ad spend. Once an account crosses $200/day, you earn 10% of the full monthly management fee — not just the increment.</p>
              <div className="bg-brand-yellow rounded-xl p-4">
                <div className="font-black text-sm mb-2">Example Calculation</div>
                <BulletList items={[
                  'Client scales from $150/day → $250/day',
                  'Monthly ad spend = $7,500',
                  '10% management fee = $750/month',
                  'Your cut = 10% of $750 = $75/month per client',
                  '9–10 accounts above $200/day = $675–$750/month ongoing',
                ]} />
              </div>
              <InfoBox type="tip">Push qualified clients past $200/day and this becomes a meaningful recurring income line — layered on top of your 2% retainer commission.</InfoBox>
            </div>
          </ExpandableCard>

          {/* LTV protection */}
          <ExpandableCard title="LTV Protection — The Commission Floor" subtitle="Price concessions don't cut your pay for 3 cycles">
            <div className="space-y-3 text-sm">
              <p className="text-brand-gray">Sometimes the smartest move to retain a client is to offer a price concession. A client paying $3,200/month for 10 cycles is worth more than one paying $4,000 for 3. The commission floor protects you when you make the right call.</p>
              <div className="bg-brand-gray-light rounded-xl p-4">
                <div className="font-black text-sm mb-2">How It Works</div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2"><span className="text-brand-yellow font-black">Step 1</span><span className="text-brand-gray">Client at $4,000/month wants to leave. You offer $3,200/month with manager approval.</span></div>
                  <div className="flex gap-2"><span className="text-brand-yellow font-black">Step 2</span><span className="text-brand-gray">Your commission stays calculated on the original $4,000 for the next 3 cycles ($80/mo).</span></div>
                  <div className="flex gap-2"><span className="text-brand-yellow font-black">Step 3</span><span className="text-brand-gray">After 3 cycles, adjusts to actual $3,200 ($64/mo). You kept the client.</span></div>
                </div>
              </div>
              <InfoBox type="info">You kept the client, the company keeps the revenue, and you were not penalized for making the smart long-term decision.</InfoBox>
            </div>
          </ExpandableCard>

          {/* Accountability / disincentives */}
          <ExpandableCard title="Accountability — SLA & Performance Guardrails" subtitle="Max exposure: ~$350 in a worst-case month">
            <div className="space-y-2">
              {PENALTIES.map((p) => (
                <div key={p.trigger} className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <div className="font-black text-red-600 text-sm flex-shrink-0 min-w-[70px]">{p.penalty}</div>
                  <div>
                    <div className="font-bold text-xs text-red-800">{p.trigger}</div>
                    <div className="text-[11px] text-red-600/70 mt-0.5">{p.note}</div>
                  </div>
                </div>
              ))}
              <InfoBox type="info">These are guardrails, not punishments. If you document your follow-ups and do the work, you are protected. The goal is awareness — not fear.</InfoBox>
            </div>
          </ExpandableCard>

          {/* Strong month walkthrough */}
          <ExpandableCard title="Sample Strong Month — 25-Client Book" subtitle="What $10,075/month looks like in practice">
            <div className="space-y-2 text-sm">
              {[
                { source: 'Base salary ($72K ÷ 12)', amount: '$6,000' },
                { source: '2% commission: 25 clients × $4,000', amount: '$2,000' },
                { source: 'Milestone: 3 clients completed Cycle 1 (3 × $150)', amount: '$450' },
                { source: 'Milestone: 2 clients completed Cycle 2 (2 × $100)', amount: '$200' },
                { source: 'Fast launch: 2 within 7 days, 1 within 14 days', amount: '$125' },
                { source: 'Onboarding QA: 2 at 90%+, 1 at 85%', amount: '$125' },
                { source: '1 client referral closed', amount: '$500' },
                { source: 'Ad spend upsell: 9 accounts > $200/day (avg $75)', amount: '$675' },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center p-2 rounded-lg ${i === 7 ? 'bg-brand-yellow' : 'bg-brand-gray-light'}`}>
                  <span className="text-xs text-brand-gray">{row.source}</span>
                  <span className="font-black text-sm text-brand-black">{row.amount}</span>
                </div>
              ))}
              <div className="bg-brand-black rounded-xl p-3 flex justify-between items-center">
                <span className="font-black text-white text-sm">TOTAL MONTHLY</span>
                <span className="font-black text-brand-yellow text-xl">$10,075</span>
              </div>
              <div className="text-xs text-brand-gray text-center">≈ $120,900 annualized — matches the 25-client OTE target</div>
            </div>
          </ExpandableCard>

          {/* Growth pathway */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Growth Pathway</h3>
            <div className="space-y-2">
              {[
                { phase: '20–25 clients', label: 'Building Phase', detail: 'Learning systems, building relationships, hitting 25 clients within 6 months.', color: 'bg-brand-gray-light' },
                { phase: '25–30 clients', label: 'On-Track Phase', detail: 'Strong retention, fast launches, growing commission. You are a reliable operator.', color: 'bg-brand-yellow' },
                { phase: '30+ clients', label: 'Elite / Leadership', detail: 'Elite retention. Book overflows. First in line for senior/team-lead roles with additional comp.', color: 'bg-brand-black text-white' },
              ].map((g) => (
                <div key={g.phase} className={`rounded-xl p-4 ${g.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-black text-sm ${g.color.includes('black') ? 'text-brand-yellow' : 'text-brand-black'}`}>{g.phase}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${g.color.includes('yellow') ? 'bg-brand-black/10 text-brand-black/60' : g.color.includes('black') ? 'bg-white/10 text-white/50' : 'bg-white text-brand-gray'}`}>{g.label}</span>
                  </div>
                  <p className={`text-xs ${g.color.includes('black') ? 'text-white/60' : 'text-brand-gray'}`}>{g.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://docs.google.com/document/d/1H5NYHSFK4PBrSj259_d7ijWuY5Q9SST7DNeFQWqK0Lg/edit?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-brand-yellow rounded-xl px-4 py-3 hover:bg-yellow-400 transition-colors group"
          >
            <span className="text-lg">📄</span>
            <div className="flex-1">
              <div className="font-black text-sm text-brand-black">Full Compensation Document</div>
              <div className="text-xs text-brand-black/60">Complete terms, edge cases, key definitions — Version 4.0</div>
            </div>
            <span className="text-brand-black/40 group-hover:text-brand-black text-sm">↗</span>
          </a>
        </>
      )}

    </SectionWrapper>
  );
}
