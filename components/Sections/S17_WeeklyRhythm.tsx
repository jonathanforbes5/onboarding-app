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
          Watch these to see how Cole and Tyler actually structure their day end-to-end. Same job, two different operating styles.
          Both work. Find what fits you.
        </p>
        <div className="space-y-3">
          <LoomSlot
            title="Cole&apos;s typical day"
            subtitle="Morning checks → account triage → specialist coordination"
            recordedBy="Cole"
            length="6:00"
          />
          <LoomSlot
            title="Tyler&apos;s typical day"
            subtitle="How Tyler runs Pod 2 alongside Cole — different angle on the same job"
            recordedBy="Tyler"
            length="6:00"
          />
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
