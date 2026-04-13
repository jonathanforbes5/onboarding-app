'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { ExpandableCard } from '@/components/Interactive/ExpandableCard';

export function S10_CulturePerformance() {
  return (
    <SectionWrapper sectionId={10}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The Standard</div>
        <h2 className="text-xl font-black text-white mb-2">High Performance Culture</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          Contractors Ignite is a results-driven, fast-paced environment. We hire slow and fire fast.
          <strong className="text-white"> Hit your numbers → growth. Miss your numbers → you&apos;re not meeting the standard.</strong>
        </p>
      </Card>

      {/* Weekly operating rhythm */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Weekly Operating Rhythm</h3>
        <div className="space-y-2">
          {[
            {
              days: 'Monday & Thursday',
              action: 'Post KPI Updates in Slack',
              detail: 'Clear, concise, data-driven updates for your pod. Celebrate wins. Flag problems.',
              color: 'bg-brand-yellow text-brand-black',
              yours: true,
            },
            {
              days: 'Tuesday & Friday',
              action: 'Review Calls with Jonathan',
              detail: 'All pods present. Discuss performance, coordinate action steps, learn from other pods.',
              color: 'bg-brand-black text-white',
              yours: true,
            },
            {
              days: 'Daily',
              action: 'Client Communication + Action Steps',
              detail: 'Stay responsive, execute action items same day, coordinate with specialists.',
              color: 'bg-brand-gray-light text-brand-black',
              yours: false,
            },
            {
              days: 'Saturday',
              action: 'Work Day (No Meetings)',
              detail: 'No scheduled meetings — stay responsive to Slack and handle any urgent items.',
              color: 'bg-brand-gray-light text-brand-black',
              yours: false,
            },
          ].map((r) => (
            <div key={r.days} className={`rounded-xl p-4 ${r.color}`}>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="font-black text-sm">{r.days}</div>
                {r.yours && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                    r.color.includes('yellow') ? 'bg-black/10' : 'bg-brand-yellow text-brand-black'
                  }`}>YOURS</span>
                )}
              </div>
              <div className={`font-bold text-xs ${r.color.includes('black') && r.color.includes('text-white') ? 'text-brand-yellow' : ''}`}>{r.action}</div>
              <div className={`text-xs mt-1 ${r.color.includes('text-white') ? 'text-white/60' : 'text-brand-gray'}`}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily rhythm */}
      <ExpandableCard title="Daily Communication Standard" subtitle="Morning → Throughout Day → Evening">
        <div className="space-y-3">
          {[
            { time: 'Morning', items: ['"Good morning" in Slack — show up mentally', 'Review overnight client messages', 'Plan daily priorities'], color: 'bg-brand-yellow-light' },
            { time: 'Throughout Day', items: ['5–30 min Slack response time', 'Proactive client communication', 'Action steps executed same day', 'Problems flagged immediately'], color: 'bg-white border border-brand-gray-mid' },
            { time: 'Evening', items: ['"Good night" in Slack', 'Ensure nothing critical is unresolved', 'Set priorities for tomorrow'], color: 'bg-brand-gray-light' },
          ].map((d) => (
            <div key={d.time} className={`p-3 rounded-xl ${d.color}`}>
              <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">{d.time}</div>
              <BulletList items={d.items} />
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* A-player standard */}
      <Card yellow>
        <h3 className="font-black text-base mb-3">The A-Player Standard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BulletList check items={[
            'Extreme ownership of your pod',
            'Proactive, not reactive',
            'Solutions-oriented (bring options, not just problems)',
            'Fast learner — absorb and apply',
          ]} />
          <BulletList check items={[
            'High standards for self AND team',
            'Coachable & hungry to improve',
            'No excuses — results focus',
            'Feedback is a gift, not criticism',
          ]} />
        </div>
      </Card>

      {/* Retention math */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-3">The Retention Math</div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-white font-black text-2xl">$X</div>
            <div className="text-white/50 text-xs mt-1">Client — Cycle 1</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white/30 text-2xl">→</div>
          </div>
          <div className="bg-brand-yellow rounded-xl p-3 text-center">
            <div className="text-brand-black font-black text-2xl">10X</div>
            <div className="text-brand-black/70 text-xs mt-1">Client — Cycle 10</div>
          </div>
        </div>
        <div className="text-white/70 text-sm">
          Acquiring a client costs thousands. Retaining one costs time and care.
          <strong className="text-white"> Every cycle you preserve = compounding revenue.</strong>
        </div>
      </Card>

      {/* Performance philosophy */}
      <ExpandableCard title="Performance Philosophy & Feedback Culture" subtitle="No ego. Only results.">
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Hit your numbers', result: 'Incentives, bonuses, growth opportunities', icon: '🏆' },
              { label: 'Miss your numbers', result: 'You\'re not meeting our standard — expect direct feedback', icon: '📉' },
            ].map((p) => (
              <div key={p.label} className="flex items-start gap-2 p-3 bg-brand-gray-light rounded-xl">
                <span className="text-xl">{p.icon}</span>
                <div>
                  <div className="font-bold">{p.label}</div>
                  <div className="text-xs text-brand-gray mt-0.5">{p.result}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="info">
            Feedback at Contractors Ignite is direct and immediate. It&apos;s never personal — it&apos;s always about results and improvement.
            The right response is: <strong>&quot;Understood. Here&apos;s my plan.&quot;</strong>
          </InfoBox>
        </div>
      </ExpandableCard>

      <InfoBox type="tip" title="Radical Ownership">
        Your pod is your business. Own every outcome — wins AND losses. Don&apos;t wait to be told. Don&apos;t make excuses.
        <strong> Proactively surface problems and bring solutions.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
