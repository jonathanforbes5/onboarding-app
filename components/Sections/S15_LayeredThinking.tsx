'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';
import { LayeredThinking } from '@/components/Diagrams/LayeredThinking';
import { AuditExample } from '@/components/Diagrams/AuditExample';

export function S15_LayeredThinking() {
  return (
    <SectionWrapper sectionId={15}>

      <InfoBox type="tip" title="The single most important mental model in this job">
        Every problem in this business is a layered thinking problem. <strong>Layer 1</strong> is the outcome.
        <strong> Layer 2</strong> is the driver behind a broken Layer 1 metric. <strong>Layer 3</strong> is the actual lever you pull.
        Doctors do this. Engineers do this. The best media buyers do this. You will too.
      </InfoBox>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Layer Model</h3>
        <Card border>
          <LayeredThinking />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Worked Examples — From A Real Audit Report</h3>
        <Card border>
          <AuditExample />
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The 80% Margin Variance Rule</h3>
        <Card border>
          <div className="text-sm space-y-2 text-brand-black">
            <p>
              When evaluating cost-per-appointment vs the contracted goal, give yourself an <strong>80% margin variance</strong> band.
              If the goal is $262/appt, anything between $262 and ~$472 is acceptable. Above that, the cycle is at risk.
            </p>
            <p>
              <strong>Why:</strong> Markets vary. Florida CPMs are higher than Iowa. Insurance markets behave differently than retail.
              The 80% band means you don&apos;t panic at minor variance, but you also don&apos;t let real overruns slide past.
            </p>
            <p>
              <strong>Do the math live during audits:</strong> 20 appts on $4,200 spend = $210 CPA. If contracted at $262, you&apos;re green.
              If contracted at $150, you&apos;re red and the cycle won&apos;t bill.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Layered Thinking Is Not Just KPIs</h3>
        <Card border>
          <div className="text-sm space-y-2 text-brand-black">
            <p>
              The same model applies to <strong>time management</strong>: Layer 1 is "are my accounts on track?"
              Layer 2 is "where am I spending my time?" Layer 3 is "what specific behaviour do I change today?"
            </p>
            <p>
              It applies to your career: Layer 1 is "am I making the money / having the impact I want?" Layer 2 might be
              "do I have the skills?" Layer 3 is "what specific skill do I drill this week?"
            </p>
            <p className="font-bold">
              Once you start seeing layers everywhere, decisions get faster and cleaner. That&apos;s the goal.
            </p>
          </div>
        </Card>
      </div>

      <InfoBox type="success" title="The flow, one more time">
        Check Layer 1 → if green, move on. If red, drill into Layer 2 for that specific metric only. Pick the biggest, easiest-to-solve
        Layer 2 driver. Reach into Layer 3 to pull the actual lever. Verify Layer 1 improves. <strong>Don&apos;t boil the ocean.</strong>
      </InfoBox>

    </SectionWrapper>
  );
}
