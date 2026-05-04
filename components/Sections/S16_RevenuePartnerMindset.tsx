'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { RevenuePartnerScenarios } from '@/components/Diagrams/RevenuePartnerScenarios';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

const REVENUE_TIERS = [
  {
    range: '$5M+ / year',
    label: 'High self-awareness',
    bg: '#16A34A',
    description: 'They have been through more difficulty, seen more people, run real teams. They read situations well. They will hold YOU to a high bar — but they will also accept a clean diagnosis when you bring data. The relationship is partnership-shaped.',
    style: 'Be precise. Be on time. Bring data and a recommendation. Do not waste their time.',
  },
  {
    range: '$2.5M – $5M / year',
    label: 'Mostly self-aware, some narrative risk',
    bg: '#F59E0B',
    description: 'Have systems and a team but still close to the work. Generally rational but vulnerable to a "little birdie" — a sales rep, a partner, a friend running another agency — whispering doubts. Pre-handle objections before the birdie does.',
    style: 'Get verbal commitments on expectations early. Repeat them every cycle. Anchor on YOUR data, not what someone else promised them.',
  },
  {
    range: '$1M – $2.5M / year',
    label: 'Variable — depends on the operator',
    bg: '#EA580C',
    description: 'Wide range. Some are scaling fast and self-aware; others are a one-person show wearing CEO hat that they have not earned. Read THEM, not the revenue. Watch for the narrative collapse signals.',
    style: 'Set expectations harder. Document everything. Communicate proactively. Check in even when there is nothing to report.',
  },
  {
    range: '< $1M / year',
    label: 'Highest narrative risk',
    bg: '#7F1D1D',
    description: 'Often emotional buyers. Can be desperate. The marketing spend feels existential to them — every dollar is a gut decision. Most likely to externalise blame, ghost, or refuse to pay. Most need pre-handling.',
    style: 'Set very firm expectations on the onboarding call. Document everything. Daily-ish communication when results are choppy. Escalate to Jon at the first sign of narrative collapse.',
  },
];

export function S16_RevenuePartnerMindset() {
  return (
    <SectionWrapper sectionId={16}>

      <InfoBox type="tip" title="Why this section exists">
        Half the job is delivering results. <strong>The other half is keeping the narrative intact.</strong> Some of our best-delivering accounts have churned because the narrative collapsed. Some of our worst-delivering accounts have stayed because the narrative held. Owning the narrative IS the job.
      </InfoBox>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 50 / 50 Framing</h3>
        <Card dark>
          <div className="grid sm:grid-cols-2 gap-3 text-white">
            <div className="rounded-lg bg-white/5 p-3 border border-white/10">
              <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-1">50% — Results</div>
              <div className="text-sm leading-relaxed">
                Bookings, CPA, show rate, sales conversion (theirs). The Layer 1 / Layer 2 / Layer 3 work. The diagnosis-and-prescription side of the job. This is what most new MOMs think the entire job is. It is half.
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-3 border border-white/10">
              <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-1">50% — Narrative</div>
              <div className="text-sm leading-relaxed">
                Pre-handling objections. Reading the client&apos;s mental state. Inoculating against the &quot;little birdie&quot; who is whispering that the leads suck. Keeping their story about us aligned with reality. This is the side that prevents churn.
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">We Are The Experts They Hired</h3>
        <Card border>
          <div className="space-y-2 text-sm text-brand-black leading-relaxed">
            <p>
              Some clients think they are smarter than us. Some are open and easy. Some genuinely need help with their sales process and are coachable. Most fall somewhere in between.
            </p>
            <p>
              <strong>The frame:</strong> they hired us because they could not solve this themselves. That is the literal definition of a consulting relationship. When they push back on a recommendation, the right move is not to capitulate — it is to bring more data and re-make the case. If they want to override us anyway, that is their right as the buyer — but document it so when the cycle goes sideways the conversation is honest.
            </p>
            <p>
              <strong>What this is not:</strong> arrogance. We are not always right. We are obligated to update our thinking when new data arrives. But the default stance is &quot;I am the expert here, here is the recommendation, here is the reasoning&quot; — not &quot;what do you think we should do?&quot;
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Revenue Tier Psychology</h3>
        <p className="text-xs text-brand-gray mb-2">
          The size of the business tells you how to communicate. Not a hard rule — read the operator — but a strong default.
        </p>
        <div className="space-y-2">
          {REVENUE_TIERS.map((t) => (
            <div key={t.range} className="rounded-xl overflow-hidden border" style={{ borderColor: t.bg + '55' }}>
              <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: t.bg, color: '#fff' }}>
                <span className="font-black text-sm">{t.range}</span>
                <span className="text-xs opacity-90">— {t.label}</span>
              </div>
              <div className="px-3 py-2 bg-white">
                <div className="text-xs text-brand-black leading-relaxed mb-1.5">{t.description}</div>
                <div className="text-xs text-brand-gray">
                  <span className="font-black uppercase tracking-widest text-[10px] text-brand-black">Your style:</span> {t.style}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The &quot;Little Birdie&quot; — How Narratives Collapse</h3>
        <Card border>
          <div className="text-sm text-brand-black space-y-2 leading-relaxed">
            <p>
              Almost every churn we have seen at &quot;hit appt goals but client unhappy&quot; traces back to <strong>somebody whispering in the client&apos;s ear</strong>. A salesperson protecting themselves from accountability. A partner who is jealous of the spend. A friend who runs another agency. A YouTube guru telling them Facebook ads do not work.
            </p>
            <p>
              <strong>You will never be in that conversation.</strong> The birdie wins by default — unless you have already inoculated the client.
            </p>
            <p>
              <strong>The inoculation:</strong> on the onboarding call, name the birdie out loud. &quot;Within the first 30 days, somebody — a sales rep, a partner, a friend — is going to tell you the leads suck. When that happens, before you change anything, send me their exact wording so I can show you the data. Cool?&quot; Get verbal yes. The birdie loses 80% of its power the moment the client has agreed to bring it to you first.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Pre-Handle &gt; Handle</h3>
        <Card border>
          <div className="text-sm text-brand-black leading-relaxed">
            Almost every objection that comes up mid-cycle could have been pre-handled in the onboarding call. The cost of pre-handling is awkwardness for 30 seconds in a low-stakes setup conversation. The cost of NOT pre-handling is a high-stakes save call mid-cycle that you will probably lose. <strong>Always trade awkwardness now for ease later.</strong>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">High-Likelihood Churn Scenarios — Practice With A Teammate</h3>
        <p className="text-xs text-brand-gray mb-2">
          Sourced from analysing our 81 actual churn cases in Airtable. The six below cover ~90% of churn patterns. Read each, then pair with another MOM and act them out — one plays the client, one plays you. Then swap.
        </p>
        <Card border>
          <RevenuePartnerScenarios />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Loom — How To Approach A Client Call</h3>
        <LoomSlot
          slotKey="s16_approaching_client_calls"
          title="Approaching client calls"
          subtitle="Tone, framing, what to bring — the difference between a defensive call and a partner call"
          recordedBy="Oscar"
          length="—"
        />
      </div>

      <InfoBox type="warning" title="The bar">
        You are not just a marketing operator. You are <strong>the relationship owner</strong> and the <strong>narrative custodian</strong> for 20–30 client accounts. The agency lives or dies on whether you can hold both halves of the job at once. Most new MOMs over-index on results and under-index on narrative. Catch yourself if you are doing it.
      </InfoBox>

    </SectionWrapper>
  );
}
