'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { AskAQuestion } from '@/components/Diagrams/AskAQuestion';
import { EscalationMatrix } from '@/components/Diagrams/EscalationMatrix';
import { WhoToGoTo } from '@/components/Diagrams/WhoToGoTo';

export function S14_Mindset() {
  return (
    <SectionWrapper sectionId={14}>

      <InfoBox type="tip" title="Why this section exists">
        Most of the questions Oscar and Jon get re-asked in week 12 are week-1 questions. The fix isn&apos;t more answers — it&apos;s
        better instincts on <strong>how to ask</strong>, <strong>who to ask</strong>, and <strong>when to escalate</strong>.
        Get this section right and you become 10x easier to work with.
      </InfoBox>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">How To Ask A Question</h3>
        <Card border>
          <AskAQuestion />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Who To Go To For What</h3>
        <Card border>
          <WhoToGoTo />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Escalation Matrix</h3>
        <Card border>
          <EscalationMatrix />
        </Card>
      </div>

      <InfoBox type="warning" title="When in doubt — group chat it">
        For anything truly urgent, skip the waterfall. Open a group chat with you, Jon, Oscar, the previous AM (if relevant), and the specialist whose work is involved. Speed matters more than process.
      </InfoBox>

    </SectionWrapper>
  );
}
