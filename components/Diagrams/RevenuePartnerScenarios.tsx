'use client';
import React, { useState } from 'react';

interface Scenario {
  id: string;
  trigger: string;
  realIssue: string;
  whatTheyHear: string[];        // what the client is actually thinking
  preHandle: string;              // what to say BEFORE the cycle, to inoculate
  inTheMoment: string;            // what to say during the call
  whatNotToSay: string;
  churnExamplesCount: number;     // sourced from Airtable churn analysis
}

const SCENARIOS: Scenario[] = [
  {
    id: 'leads-suck',
    trigger: 'Client says "your leads suck" / "all these leads are tire kickers"',
    realIssue: 'Their sales process is the constraint, not lead quality. They are protecting their ego by externalising. We hit appt goals — they could not close — most common pattern.',
    whatTheyHear: [
      'Someone in their world (a salesperson, a partner, a "little birdie") told them the leads were bad.',
      'Their sales rep is protecting themselves from accountability for low close rate.',
      'They have never honestly audited their own intake → quote → close conversion.',
    ],
    preHandle:
      'On the onboarding call: "Our job is to get you qualified booked appointments. Yours is to close them. If we hit appt goals and the closes do not follow, that is a sales-process conversation — not a leads conversation. Cool with you?" Get verbal yes BEFORE the cycle starts.',
    inTheMoment:
      '"Walk me through your last 10 appts — who picked up, who showed, who got a quote, who said no and why." Force them to look at their own conversion data. Often the leak is at THEIR step. Once that lands, propose a sales-process review (not a refund, not a credit).',
    whatNotToSay:
      'Never agree the leads suck before you have data to back it. Never offer a refund or free cycle to defuse. That trains the client AND their sales team that complaining gets results. Charge full rate, defend the work, fix the actual constraint.',
    churnExamplesCount: 4,
  },
  {
    id: 'missed-goals',
    trigger: 'CPA is over the 80% margin band and we are behind pace mid-cycle',
    realIssue: 'Could be market difficulty, creative fatigue, audience too broad, or a real model break. Diagnose Layer 2 before deciding which conversation to have with the client.',
    whatTheyHear: [
      '"Am I getting what I paid for?"',
      '"Is this agency competent?"',
      'Fear of sunk cost — they want to know whether to keep going or kill it.',
    ],
    preHandle:
      'Set the 80% margin variance expectation in the onboarding call. "Some cycles you will hit, some you will be 80%. Below that we extend the cycle on us, optimise, and finish strong. Anything else is fraud — and that is not how we operate."',
    inTheMoment:
      '"Here is what the numbers are showing — Layer 1: behind pace. Layer 2: CPM is high (market dynamic) AND CTR is dropping (creative fatigue). The lever I am pulling is X. We will know within 5 days if this hits." Then act on it. Update them at day 5 even if they did not ask.',
    whatNotToSay:
      '"It is the market" without a Layer 2 diagnosis. "We will figure it out" without a specific lever. Vague reassurance trains them to distrust you. Specifics earn trust — even when the news is bad.',
    churnExamplesCount: 21,
  },
  {
    id: 'payment-refusal',
    trigger: 'Client refuses to pay despite hitting (or nearly hitting) appt goal',
    realIssue: 'Their narrative has already collapsed — could be sales side, financial pressure, or a "little birdie" telling them the pricing is unfair. Often a relationship issue masquerading as a payment issue.',
    whatTheyHear: [
      '"I do not feel like I got value." (Even if data shows they did.)',
      'Their accountant or partner is leaning on them about marketing spend.',
      'They are looking for any narrative to stop paying — pricing, leads, communication, anything.',
    ],
    preHandle:
      'On contract signing: walk them through the exact billing trigger ("at 80% of goal, you are billed for the cycle. We will show you the math live every cycle close.") Have them initial it. Then EVERY cycle close: send the data + signed contract clause + invoice in one message.',
    inTheMoment:
      '"Per the signed contract, here is the data, here is the threshold, here is the invoice." Stay neutral, factual, not defensive. If they argue terms: "Happy to walk you through the contract live — what specific clause are you referencing?" Force them to argue the document, not the relationship.',
    whatNotToSay:
      'Never capitulate to "I will pay if you give me X for free next cycle." That trains them to negotiate every cycle. Charge per signed contract. If they refuse, escalate to Jonathan — and Oscar for finance.',
    churnExamplesCount: 11,
  },
  {
    id: 'ghost',
    trigger: 'Client stops responding mid-cycle / never followed through with onboarding',
    realIssue: 'Often financial distress, ownership change, or genuine "checked out" — but sometimes just disorganisation. Pre-handle this in the onboarding call, not after.',
    whatTheyHear: [
      'Overwhelm. They have too much going on and you are not their #1 priority.',
      'Buyer\'s remorse setting in.',
      'They are afraid of an honest conversation about results.',
    ],
    preHandle:
      'In the onboarding call: "Communication is part of the deal. If you go silent for more than 48 hours during a cycle, I will assume something is wrong and escalate to Jonathan. Cool with you?" Set the contract.',
    inTheMoment:
      'Day 1 silent: text + Slack ping. Day 2: call. Day 3: email Jon CC\'d on the message. Day 5: assume churn risk and book a save call. Document every attempt.',
    whatNotToSay:
      'Do not chase quietly forever. Silence is data — escalate it. Do not make excuses for them ("they\'re probably just busy"). Treat ghosting as a red signal, every time.',
    churnExamplesCount: 11,
  },
  {
    id: 'exploring-other-avenues',
    trigger: 'Client says "we want to explore other marketing avenues" — even when results are good',
    realIssue: 'Usually a "little birdie" — another agency pitching them, a partner suggesting alternatives, or shiny-object syndrome. Or genuinely scaling and wanting omni-channel.',
    whatTheyHear: [
      '"What if I am leaving money on the table?"',
      '"My friend uses XYZ agency and gets..."',
      'Sometimes legit: they\'ve hit a ceiling and want to layer.',
    ],
    preHandle:
      'During every cycle review, anchor on YOUR results vs market benchmarks. Do not let them compare to fantasy numbers from another agency\'s pitch deck. Build a moat with data.',
    inTheMoment:
      '"Walk me through what you are looking to layer in. Most clients who go multi-channel keep us as the primary lead engine — what does that look like in your case?" Reframe from "leaving us" to "what does scale look like." Often they are not actually planning to leave — they are testing your reaction.',
    whatNotToSay:
      'Do not compete on price. Do not bash the other agency. Do not get insecure. The moment you act threatened, you confirm their suspicion that you are replaceable.',
    churnExamplesCount: 3,
  },
  {
    id: 'communication-breakdown',
    trigger: 'Client gets terse, hostile, or starts CC\'ing their lawyer',
    realIssue: 'Trust has eroded — usually a chain of small misses (slow response, missed update, vague answer) that compounded. Sometimes a single big miss (creative fail, ad rejection, billing error).',
    whatTheyHear: [
      '"This agency does not respect my time."',
      '"I am not getting straight answers."',
      'Building a paper trail — they may already be planning to leave.',
    ],
    preHandle:
      'Set communication SLA on the onboarding call: < 30 min during business hours, < 4 hours outside, < 24 hours weekends. Hold the bar. Send the Monday/Thursday update without fail — even when there is nothing dramatic to say.',
    inTheMoment:
      'IMMEDIATELY shift to over-communication mode. Daily updates. Loom walkthroughs. Phone calls instead of Slack. Loop Jonathan in BEFORE the client does. The fix for trust erosion is not one big gesture — it is sustained over-delivery on the small things.',
    whatNotToSay:
      'Defensive responses. Long explanations of why you were silent. Blaming the client for being unreasonable. Get curious about THEIR experience. Apologise for the gaps without grovelling.',
    churnExamplesCount: 4,
  },
];

export function RevenuePartnerScenarios() {
  const [active, setActive] = useState<string>(SCENARIOS[0].id);
  const s = SCENARIOS.find(x => x.id === active)!;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SCENARIOS.map(sc => (
          <button
            key={sc.id}
            onClick={() => setActive(sc.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              sc.id === active ? 'bg-brand-black text-brand-yellow' : 'bg-brand-gray-light text-brand-gray hover:bg-brand-gray-mid'
            }`}
          >
            {sc.id === active ? '● ' : ''}{sc.trigger.split('—')[0].split('/')[0].replace(/Client says |"/g, '').trim().slice(0, 28)}…
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-brand-black text-white p-4 space-y-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">Trigger</div>
          <div className="text-sm font-black">{s.trigger}</div>
        </div>

        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">The real issue</div>
          <div className="text-sm text-white/85">{s.realIssue}</div>
        </div>

        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-1">What they&apos;re actually hearing in their head</div>
          <ul className="space-y-1">
            {s.whatTheyHear.map((w, i) => (
              <li key={i} className="text-sm text-white/85 flex items-start gap-2">
                <span className="text-brand-yellow flex-shrink-0">▸</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-2">
          <div className="rounded-lg bg-green-900/40 border border-green-700/40 p-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-1">Pre-handle (in onboarding call)</div>
            <div className="text-xs text-white/90 leading-relaxed">{s.preHandle}</div>
          </div>
          <div className="rounded-lg bg-blue-900/40 border border-blue-700/40 p-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">In the moment</div>
            <div className="text-xs text-white/90 leading-relaxed">{s.inTheMoment}</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-900/40 border border-red-700/40 p-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-red-300 mb-1">What NOT to say</div>
          <div className="text-xs text-white/90 leading-relaxed">{s.whatNotToSay}</div>
        </div>

        <div className="text-[11px] text-white/50 italic">
          Drawn from {s.churnExamplesCount} actual churn case{s.churnExamplesCount === 1 ? '' : 's'} in our Airtable.
        </div>
      </div>

      <div className="rounded-xl bg-brand-yellow p-3">
        <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60 mb-1">How to use this</div>
        <div className="text-xs text-brand-black leading-relaxed">
          Pair up with another MOM and act it out. One of you plays the client, the other plays the MOM. Run all six scenarios. Then swap. Pre-handling beats handling — every scenario you rehearse here is one you will not panic on live.
        </div>
      </div>
    </div>
  );
}
