'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

const PRE_CALL_STEPS = [
  {
    step: '48 hrs before',
    action: 'Pull closer call recording from #closer-call-recordings Slack channel — read every deal note carefully',
    why: 'You need to know their exact setup fee, retainer rate, ad spend commitment, and any promises the closer made. Arriving uninformed is a fast way to destroy authority on the first call.',
  },
  {
    step: '48 hrs before',
    action: 'Google the business, check Facebook page, read Google reviews — understand their market',
    why: 'You need to speak their language from minute one. Commenting on something specific about their business ("I saw you do a lot of hail repair work in Colorado Springs") signals competence.',
  },
  {
    step: '24 hrs before',
    action: 'Send pre-onboarding checklist email (template in SOPs)',
    why: 'Assets on Day 1 = faster launch = faster cashflow. Chasing assets post-call adds 1–2 weeks of delay to every account.',
  },
  {
    step: '24 hrs before',
    action: 'Send follow-up GHL text to confirm time and share a 1-sentence expectation-setter',
    why: '"Looking forward to our call tomorrow at 2pm — I\'ve already reviewed your account and have a few questions ready for you." Sets tone as prepared and professional.',
  },
  {
    step: 'Day of call',
    action: 'Verify client is NOT a KRS or Gutter Shutter franchise client — check billing rate before call',
    why: 'KRS/franchise rate = $3,300/cycle, not $4,000. Billing the wrong rate is a contractual violation. Always verify before the call, not after.',
  },
  {
    step: 'Day of call',
    action: 'Pre-fill the ClickUp task for Emmanuel — client name, sub-account placeholder, asset slots ready to complete right after',
    why: 'Post-call momentum is critical. The task needs to go to Emmanuel within 1 hour — not "when I get a chance later."',
  },
];

const CONFIRM_ON_CALL = [
  {
    item: 'Daily ad spend',
    detail: 'Confirm the exact dollar amount matches the signed contract. "$200/day?" Not "$6,000/month?" — specificity avoids launch errors. If there\'s any discrepancy, contact the closer the same day.',
  },
  {
    item: 'Service area — zip codes or city + radius',
    detail: 'Get precise zip codes or a defined radius in miles. This goes directly into the Account Specific Document AND Meta targeting. Vague service areas are the #1 cause of high OSA rates.',
  },
  {
    item: 'Communication channel',
    detail: 'WhatsApp, GHL text sub-account, or Slack? Pick one, confirm it clearly. "I\'ll reach you via text on this number for all updates — does that work?" Mixed channels cause missed messages.',
  },
  {
    item: 'Notification preference',
    detail: 'Does the client want every lead, every appointment request, or confirmed bookings only? Set this expectation now — over-notifying frustrated clients will ask you to stop, under-notifying creates anxiety.',
  },
  {
    item: 'Appointment availability',
    detail: 'What days and hours can they take inspection calls? What advance notice before booking? This goes into the VA script so VAs aren\'t booking appointments the client can\'t actually attend.',
  },
  {
    item: 'CRM integration needs',
    detail: 'ServiceTitan, Jobber, Acculynx, or none? If they have an existing CRM, Emmanuel will need to set up a Zapier integration. Confirm now so Emmanuel has the right setup scope.',
  },
  {
    item: 'Primary day-to-day contact',
    detail: 'Is it the owner or an office manager? Sometimes the owner signs but a manager handles daily ops. Confirm who you text/call for urgent matters so you\'re not pinging the wrong person.',
  },
];

const ASSET_CHECKLIST = [
  'Facebook Business Manager — admin or partner access (never create one yourself)',
  'Facebook Page access — admin or individual "Run Ads" role if no BM',
  'Company logo — PNG or SVG with clean/transparent background',
  '5–10 high-quality photos: team, branded trucks, job sites, completed work',
  'Google Business Profile link — for reviews on landing page social proof',
  'Before/after photos — roofing and HVAC clients benefit enormously from these',
  'Service area — exact zip codes or city + radius in miles',
  'Daily ad spend confirmed — exact dollar amount matching the contract',
  'Appointment calendar access or booking link for VA use',
  'Primary phone number for VA calls (business line, not personal)',
];

const POST_CALL_STEPS = [
  {
    time: 'Within 15 min',
    action: 'Open Fathom → copy full transcript → paste into Custom GPT → get structured onboarding summary',
    detail: 'Custom GPT organizes the raw transcript into: client info, assets gathered, assets still needed, setup requirements, key notes, and open items. This becomes your source of truth for the setup.',
  },
  {
    time: 'Within 30 min',
    action: 'Post Custom GPT output to #post-onboarding-discussion in Slack',
    detail: 'Jonathan and the team see every new client immediately. This is how setups get coordinated and how Jonathan tracks your onboarding quality. Do not summarize manually — paste the GPT output.',
  },
  {
    time: 'Within 1 hour',
    action: 'Assign ClickUp task to Emmanuel — client name, GHL sub-account link, all assets received, 48hr deadline label',
    detail: 'Never task Emmanuel via Slack DM. ClickUp only — paper trail, deadline, and accountability. Include every asset link and flag what is still pending so Emmanuel knows what to wait for.',
  },
  {
    time: 'Within 1 hour',
    action: 'Text client confirming next steps and your contact number',
    detail: '"Great meeting you today. Your setup will be ready in [X] business days. I\'ll send a Loom walkthrough before anything goes live. Reach me here anytime with questions."',
  },
  {
    time: 'Same day',
    action: 'Add client to Client Check-In Sheet with launch target date',
    detail: 'Jonathan and Oscar track every account in the launch pipeline. A client not on the sheet is invisible to leadership.',
  },
  {
    time: 'Same day',
    action: 'Verify ad spend confirmed — if any ambiguity, call the closer today',
    detail: 'If you launch at the wrong ad spend, you either underbill (revenue loss to agency) or overbill (trust damage with client). Get it right before setup starts — not after.',
  },
];

export function S13_OnboardingCallMastery() {
  return (
    <SectionWrapper sectionId={13}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Onboarding Call Mastery</div>
        <h2 className="text-xl font-black text-white mb-3">You Are the Authority — Act Like It</h2>
        <p className="text-white/70 text-sm leading-relaxed mb-2">
          The onboarding call is where clients decide whether they trust you. It re-sells the client on the partnership,
          sets expectations, gathers the assets needed to launch, and builds the relationship foundation that prevents
          early churn.
        </p>
        <p className="text-white/70 text-sm leading-relaxed">
          <strong className="text-white">You are not the student here.</strong> You are the expert guiding them into
          a system that generates appointments. Come prepared, run it with confidence, end with crystal-clear next steps.
        </p>
      </Card>

      {/* KRS franchise warning — critical, shown up top */}
      <div className="rounded-2xl border-2 border-red-400 bg-red-50 p-4">
        <div className="text-red-700 font-black text-xs uppercase tracking-widest mb-1">Check Before Every Call</div>
        <h3 className="font-black text-base text-red-900 mb-2">KRS / Gutter Shutter Franchise — $3,300/cycle, Not $4,000</h3>
        <p className="text-red-800 text-sm">
          Klaus Roofing Systems (KRS) and Gutter Shutter franchise clients have a contractually different rate:
          <strong> $3,300/cycle</strong>, not the standard $4,000. Always verify against the closer call notes before
          the onboarding call. Billing a franchise client at the wrong rate is a contractual violation —
          and fixing it after the fact is an embarrassing conversation you do not want to have.
        </p>
      </div>

      {/* Pre-call prep */}
      <ExpandableCard title="Pre-Call Prep — Required Without Exception" subtitle="Arriving unprepared is a failure before the call starts" defaultOpen>
        <div className="space-y-3">
          <div className="space-y-2">
            {PRE_CALL_STEPS.map((s) => (
              <div key={s.action} className="bg-brand-gray-light rounded-xl p-3">
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="text-[10px] bg-brand-black text-brand-yellow font-black px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap">{s.step}</span>
                  <div className="font-bold text-xs text-brand-black">{s.action}</div>
                </div>
                <div className="text-xs text-brand-gray">{s.why}</div>
              </div>
            ))}
          </div>
          <InfoBox type="tip">
            Pre-call prep takes 30–45 minutes. Jonathan reviews onboarding call recordings and will notice immediately
            if you arrived without reviewing the closer notes. Prep is not optional — it is part of the job.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Fathom must be on */}
      <div className="rounded-2xl bg-brand-black p-5">
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">Non-Negotiable Before Every Call</div>
        <div className="text-white font-black text-lg mb-2">Fathom must be recording before the call starts.</div>
        <div className="text-white/60 text-sm mb-3">
          No Fathom = no transcript = no Custom GPT summary = no structured setup notes = delays and a weaker
          onboarding record. Join every call 2 minutes early to confirm Fathom is running.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Team Visibility ON', detail: 'Enable in Fathom settings so Jonathan can access all call recordings at any time.' },
            { label: 'Call name format', detail: 'Always name calls with client name + date so recordings are searchable later.' },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-xl p-3 text-xs">
              <div className="font-black text-white mb-0.5">{item.label}</div>
              <div className="text-white/50">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm on call */}
      <ExpandableCard title="During the Call — 7 Things to Confirm" subtitle="Missing any one of these causes a setup delay or billing error" defaultOpen>
        <div className="space-y-2">
          {CONFIRM_ON_CALL.map((item) => (
            <div key={item.item} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
              <span className="text-green-500 flex-shrink-0 mt-0.5 font-black">✓</span>
              <div>
                <div className="font-black text-xs text-brand-black">{item.item}</div>
                <div className="text-xs text-brand-gray mt-0.5">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Asset gathering */}
      <ExpandableCard title="Asset Gathering Checklist" subtitle="Get all of these on the call — chasing assets post-call costs 1–2 weeks">
        <div className="space-y-3">
          <div className="space-y-1.5">
            {ASSET_CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-2 p-2.5 bg-brand-gray-light rounded-lg text-xs">
                <span className="text-brand-yellow flex-shrink-0 mt-0.5 font-black">▸</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-4">
            <div className="font-black text-sm text-red-900 mb-2">NEVER Create a Facebook Business Manager for a Client</div>
            <p className="text-xs text-red-800 mb-2">
              This is a legal liability rule — Business Managers must be owned by the client. The agency must never
              own a client&apos;s BM. There are no exceptions.
            </p>
            <div className="text-xs text-red-700">
              <strong>If they have no BM:</strong> Guide them to create one themselves at business.facebook.com.
              Walk them through it on the call if needed — it takes 5 minutes.
            </div>
            <div className="text-xs text-red-700 mt-2">
              <strong>If their page is not in a BM:</strong> Client → Page Settings → Page Access → add you
              individually with &quot;Run Ads&quot; permission. This requires a Facebook friend request first.
              Once accepted, you can run ads without a BM.
            </div>
          </div>
        </div>
      </ExpandableCard>

      {/* Post-call flow */}
      <ExpandableCard title="Post-Call Flow — Within 1 Hour, Every Time" subtitle="Momentum after the call is as critical as the call itself" defaultOpen>
        <div className="space-y-2">
          {POST_CALL_STEPS.map((s) => (
            <div key={s.action} className="bg-brand-gray-light rounded-xl p-3">
              <div className="flex items-start gap-2 mb-1.5">
                <span className="text-[10px] bg-brand-yellow text-brand-black font-black px-2 py-0.5 rounded flex-shrink-0 whitespace-nowrap">{s.time}</span>
                <div className="font-black text-xs text-brand-black">{s.action}</div>
              </div>
              <div className="text-xs text-brand-gray">{s.detail}</div>
            </div>
          ))}
        </div>
        <InfoBox type="info" className="mt-3">
          The &quot;within 1 hour&quot; standard is not a suggestion. Jonathan can see when #post-onboarding-discussion updates come in.
          A 4-hour lag after a call signals disorganization and will be addressed directly.
        </InfoBox>
      </ExpandableCard>

      {/* Account Specific Document */}
      <ExpandableCard title="The Account Specific Document — Your VA's Bible" subtitle="VAs use this on every call — it must be complete and accurate">
        <div className="space-y-3">
          <p className="text-sm text-brand-gray">
            The Account Specific Document is created right after onboarding and handed to Leila for all VAs on the account.
            It is the single source of truth for everything VAs need to sound professional and screen leads accurately.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { item: 'Company name + owner name + primary contact', why: 'VAs address people correctly and reference the company by name on calls' },
              { item: 'Service area — exact zip codes and radius', why: 'VAs screen out-of-area leads immediately — reduces OSA rate and wasted appointments' },
              { item: 'Business hours + appointment availability', why: 'Homeowners ask when they can get an inspection — VAs need a direct answer' },
              { item: 'Services offered — complete list with details', why: 'Full roof replacement? Repairs only? Storm damage? HVAC install vs repair?' },
              { item: 'Pricing range (if client authorized sharing)', why: 'Prevents homeowner surprise on inspection day that causes no-shows' },
              { item: 'Calendar login or booking link', why: 'VAs book directly into the client\'s system — no relay delays' },
              { item: 'Common Q&A — 12–15 questions with exact answers', why: 'Covers top homeowner questions so VAs handle them confidently, not improvise' },
              { item: 'Communication and escalation notes', why: 'Any client-specific instructions, language preferences, or flags' },
            ].map((f) => (
              <div key={f.item} className="p-2.5 bg-brand-gray-light rounded-lg">
                <div className="font-bold text-xs">{f.item}</div>
                <div className="text-[10px] text-brand-gray mt-0.5">{f.why}</div>
              </div>
            ))}
          </div>
          <InfoBox type="warning">
            An outdated Account Specific Document is as bad as none. When service areas, hours, pricing,
            or availability change — update it immediately and notify Leila so VAs are rebriefed.
            An out-of-date doc is the #1 cause of preventable VA booking errors.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* How to close the call */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">How to End Every Onboarding Call</h3>
        <div className="bg-brand-black rounded-2xl p-5">
          <div className="text-brand-yellow font-black text-xs uppercase tracking-widest mb-3">The Closing Script</div>
          <div className="font-mono text-xs text-white/80 space-y-2 leading-relaxed">
            <div>&quot;Alright — we have everything we need to get you started. Here&apos;s exactly what happens next:&quot;</div>
            <div className="text-white/60 pl-3">1. &quot;We&apos;ll have your full setup built out over the next [5–10] business days.&quot;</div>
            <div className="text-white/60 pl-3">2. &quot;Before anything goes live, I&apos;ll send you a Loom walkthrough for your review and sign-off.&quot;</div>
            <div className="text-white/60 pl-3">3. &quot;Once you approve it, we launch — and your 28-day cycle clock starts from that day.&quot;</div>
            <div className="text-white/60 pl-3">4. &quot;My number is [X]. I&apos;m your direct point of contact — text me anytime.&quot;</div>
            <div className="mt-2">&quot;Any questions before we wrap up?&quot;</div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/40">
            Never end with &quot;I&apos;ll be in touch.&quot; Always give a specific timeline, a specific next step, and a specific contact method.
          </div>
        </div>
      </div>

      {/* Jonathan shadows */}
      <InfoBox type="info" title="Jonathan Shadows Your First Two Calls">
        Jonathan will join your first 2 onboarding calls silently to observe your prep, control of the call,
        asset gathering, and post-call execution. He won&apos;t speak unless you invite him to.
        Run the call as if he&apos;s not there. After each call, expect direct feedback.
        After your 2nd call, you go solo — and you are fully responsible for every onboarding from that point forward.
      </InfoBox>

      {/* Quality benchmarks */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Onboarding Quality Benchmarks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { metric: 'Post-call summary', target: 'Within 1 hour', detail: '#post-onboarding-discussion Slack post with Custom GPT output' },
            { metric: 'Emmanuel tasked', target: 'Within 1 hour', detail: 'ClickUp task with full details and 48hr deadline label' },
            { metric: 'Client confirmation', target: 'Within 1 hour', detail: 'Text confirming next steps and your contact number' },
          ].map((b) => (
            <div key={b.metric} className="bg-brand-gray-light rounded-xl p-3 text-center">
              <div className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">{b.metric}</div>
              <div className="font-black text-brand-yellow text-base">{b.target}</div>
              <div className="text-xs text-brand-gray mt-1">{b.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <Card yellow>
        <div className="text-center">
          <div className="font-black text-xl mb-2">First impression = everything.</div>
          <div className="text-sm text-brand-black/70">
            A strong onboarding call lowers churn risk, speeds up launch, and builds the relationship foundation
            that generates testimonials and referrals. Every call you run is a direct investment in your LTV
            and your commission. Own it.
          </div>
        </div>
      </Card>

    </SectionWrapper>
  );
}
