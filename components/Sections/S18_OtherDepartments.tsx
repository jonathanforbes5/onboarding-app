'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

interface Dept {
  id: string;
  name: string;
  lead: string;
  oneLiner: string;
  whatTheyDo: string[];
  howYouInteract: string;
  recordedBy: string;
}

const DEPTS: Dept[] = [
  {
    id: 'sales',
    name: 'Sales',
    lead: 'Mani (Director / CRO)',
    oneLiner: 'Acquires the clients you onboard.',
    whatTheyDo: [
      'Setters (AJ Asif, etc.) book qualified sales calls with potential clients.',
      'Closers (Bronson, Krisz, John Kutac) convert sales calls into paying clients.',
      'Michael runs B2B Meta ads to generate the agency\'s own leads.',
      'Mani manages the sales team end-to-end and owns the new-client flow into your pod.',
    ],
    howYouInteract: 'Almost never directly during sales — but constantly after handoff. The closer who closed the deal is your first call when a client claims "I was promised X". Mani is the escalation when the closer can\'t resolve. Spell his name "Mani" — never "Manny".',
    recordedBy: 'Mani',
  },
  {
    id: 'media-buying',
    name: 'Media Buying',
    lead: 'Emmanuel (lead) + Mervin + Bren',
    oneLiner: 'Builds and runs every Meta ad account, GHL setup, and campaign in our system.',
    whatTheyDo: [
      'GHL full setup — A2P registration, sub-account, automations, calendars.',
      'Meta ad account structure, campaigns, ad sets, ads.',
      'Landing pages and qualification surveys.',
      'Ongoing campaign optimisation, creative iteration, audience tuning.',
      'Pixel + CAPI conditioning to train Meta on real buyers.',
    ],
    howYouInteract: 'You delegate ALL setup and ongoing media work to them via ClickUp tasks (never Slack DMs). Emmanuel is lead — your first call. Mervin handles overflow at the same tier. Bren is Pod 2-specific. Always include client name + GHL link + 48hr deadline in the task.',
    recordedBy: 'Emmanuel',
  },
  {
    id: 'creative',
    name: 'Creative & AI Specialist',
    lead: 'Ken',
    oneLiner: 'Last-resort creative gap-filler when organic content is unavailable.',
    whatTheyDo: [
      'AI-generated ad creatives (images, occasionally video).',
      'Graphic design / asset edits when Canva alone won\'t do it.',
      'Standardised creative iterations during refresh cycles.',
    ],
    howYouInteract: 'Ken is a SUBSTITUTE — not a default. ALWAYS try organic content first: ask the client (be persistent and specific in what you request), check their FB / IG / GMB / Yelp / Yellow Pages / website. Only after exhausting organic do you task Ken to fill gaps. Ken is in the Philippines (UTC+8) with 24-hour turnaround — plan ahead.',
    recordedBy: 'Ken (or Tyler / Cole on his behalf)',
  },
  {
    id: 'va',
    name: 'VA Team — Speed-to-Lead',
    lead: 'Leila (Head) + Aica + Pamela',
    oneLiner: 'Calls every lead within 5 minutes. Qualifies, books, reminds.',
    whatTheyDo: [
      'Speed-to-lead calling — non-negotiable < 5 minutes from lead submission.',
      'Qualification survey follow-up and lead validation.',
      'Booking appointments into the client\'s calendar.',
      'Reminder calls (24h, 1h, day-of) to drive show rate.',
      'Documenting every lead with status + notes in the Logbook.',
    ],
    howYouInteract: 'NEVER ping individual VAs. All quality / speed / qualification issues route through Leila. She also controls Logbook access. Use #manager-discussion for VA-related coordination.',
    recordedBy: 'Leila',
  },
  {
    id: 'finance',
    name: 'Finance & Billing',
    lead: 'Oscar (CEO + finance lead)',
    oneLiner: 'Owns billing, collections, and the agency\'s P&L.',
    whatTheyDo: [
      'Stripe customer setup, subscription management, dispute handling.',
      'Cycle-end billing workflow — converting hit-target into invoice.',
      'QuickBooks accounting + reconciliation.',
      'Setup-fee collection automation (Mac Mini intake pipeline).',
    ],
    howYouInteract: 'Bring billing problems with data attached: cycle dates, target vs actual, signed contract clause. Don\'t bring the problem — bring the proposed action. Jonathan is the first stop; Oscar steps in for finance-specific decisions.',
    recordedBy: 'Oscar',
  },
  {
    id: 'ops',
    name: 'Operations & Onboarding',
    lead: 'Jonathan (COO / Director of Operations)',
    oneLiner: 'Owns pod scaling, onboarding QA, and your day-to-day mentorship.',
    whatTheyDo: [
      'Runs Tuesday/Friday pod review meetings.',
      'Owns the onboarding-call QA bot output (Sonnet 4.5 scorecards).',
      'Triages cracks (clients slipping through the cracks) every morning at 7:30 AM.',
      'Coaches you on hard accounts, escalation calls, narrative-collapse situations.',
      'Hires and onboards new pod managers.',
    ],
    howYouInteract: 'Jon is your direct manager. Mon/Thu KPI updates go to him via #ops-manager-discussion. Escalate red accounts BEFORE the client calls him. He\'d rather hear it from you than be surprised.',
    recordedBy: 'Jonathan',
  },
];

export function S18_OtherDepartments() {
  return (
    <SectionWrapper sectionId={18}>

      <InfoBox type="tip" title="Why this exists">
        Most new MOMs only see the slice of the agency that touches their pod. That blindspot causes friction — wrong asks
        to wrong people, misread escalations, missed context. This section is a tour of every other department so you
        actually know <strong>wtf is going on</strong> across the company.
      </InfoBox>

      <div className="space-y-4">
        {DEPTS.map((d) => (
          <div key={d.id} className="space-y-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="font-black text-base text-brand-black">{d.name}</h3>
              <span className="text-xs font-bold text-brand-gray">— led by {d.lead}</span>
            </div>
            <Card border>
              <div className="space-y-2">
                <div className="text-xs italic text-brand-gray">{d.oneLiner}</div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray mb-1">What they do</div>
                  <ul className="space-y-1">
                    {d.whatTheyDo.map((item, i) => (
                      <li key={i} className="text-xs text-brand-black flex items-start gap-2">
                        <span className="text-brand-yellow flex-shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-brand-yellow-light border-l-4 border-brand-yellow px-2.5 py-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60">How you interact</div>
                  <div className="text-xs text-brand-black mt-0.5">{d.howYouInteract}</div>
                </div>
              </div>
            </Card>
            <LoomSlot
              slotKey={`s18_${d.id}`}
              title={`${d.name} — Day-in-the-life`}
              subtitle={`Recorded by ${d.recordedBy}`}
              recordedBy={d.recordedBy}
              length="5:00"
            />
          </div>
        ))}
      </div>

      <InfoBox type="info" title="Use this as a reference, not a one-time read">
        Re-read the section relevant to whoever you&apos;re about to ask something of. Knowing what they actually
        do → makes your asks faster, more targeted, and less likely to bounce.
      </InfoBox>

    </SectionWrapper>
  );
}
