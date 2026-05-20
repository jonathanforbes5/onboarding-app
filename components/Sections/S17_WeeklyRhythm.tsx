'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { WeeklySchedule } from '@/components/Diagrams/WeeklySchedule';
import { DailyRoutine } from '@/components/Diagrams/DailyRoutine';
import { LoomSlot } from '@/components/Diagrams/LoomSlot';

export function S17_WeeklyRhythm() {
  return (
    <SectionWrapper sectionId={17}>

      <InfoBox type="tip" title="Why this section exists">
        Most pod managers fail not because they can&apos;t do the work — but because they don&apos;t have a rhythm. Without
        a weekly cadence, urgent always crowds out important. This section is the default cadence Oscar runs on, refined
        through 2+ years of pod-manager iterations. Personalise it, but start here.
      </InfoBox>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Week — Click Each Day</h3>
        <Card border>
          <WeeklySchedule />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Your Daily Morning Routine — Mon Through Sat</h3>
        <Card border>
          <DailyRoutine />
        </Card>
        <div className="text-xs text-brand-gray mt-2">
          The first 30 min of every day are the same regardless of what&apos;s on the calendar. Communication triage → dashboard → ClickUp.
          Then the day shape changes based on whether you have meetings.
        </div>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">How The Most Effective MOMs Run Their Day</h3>
        <p className="text-xs text-brand-gray mb-3">
          Each operator has two videos. <strong>Part 1</strong> is the day structure — how they actually move from
          dashboard → triage → specialist coordination → close-out. Model your day after this.
          <strong> Part 2</strong> is how they <em>think</em> about creative for client results — the specificity
          that turns generic ads into appointment-generating ones. Same job, two different operating styles.
          Both work. Find what fits you.
        </p>

        {/* Cole */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-2">
            <div className="font-black text-xs uppercase tracking-widest" style={{ color: '#F5C800' }}>Cole — Pod 1</div>
            <div className="text-[10px] text-brand-gray">2 videos · recorded together</div>
          </div>
          <div className="space-y-3">
            <LoomSlot
              slotKey="s17_cole_day"
              title="Part 1 — Cole's day, end to end"
              subtitle="The day structure to model after: morning checks → account triage → specialist coordination → action steps for 15 accounts"
              recordedBy="Cole"
            />
            <LoomSlot
              slotKey="s17_cole_thinking"
              title="Part 2 — Cole on creative-thinking for client results"
              subtitle="How he thinks through creative specificity to drive client outcomes — the why behind every brief"
              recordedBy="Cole"
            />
          </div>
        </div>

        {/* Tyler — pending recording */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div className="font-black text-xs uppercase tracking-widest" style={{ color: '#F5C800' }}>Tyler — Pod 2</div>
            <div className="text-[10px] text-brand-gray">Coming soon — same two-part format</div>
          </div>
          <div className="space-y-3">
            <LoomSlot
              slotKey="s17_tyler_day"
              title="Part 1 — Tyler's day, end to end"
              subtitle="How Tyler runs Pod 2 — different angle on the same job"
              recordedBy="Tyler"
            />
            <LoomSlot
              slotKey="s17_tyler_thinking"
              title="Part 2 — Tyler on creative-thinking for client results"
              subtitle="Tyler's approach to creative specificity for client outcomes"
              recordedBy="Tyler"
            />
          </div>
        </div>
      </div>

      <InfoBox type="warning" title="The non-negotiable">
        Communication triage and Command Centre check happen in the first 30 minutes of EVERY working day. No exceptions.
        You will be tempted to skip them when you&apos;re &quot;too busy&quot;. That&apos;s exactly when skipping them costs you the most —
        because that&apos;s when an account is silently going red without you noticing.
      </InfoBox>

    </SectionWrapper>
  );
}
