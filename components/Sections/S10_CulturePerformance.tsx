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
          ContractorsIgnite is a results-driven, fast-paced environment. We hire slow and fire fast.
          <strong className="text-white"> Hit your numbers → growth, bonuses, advancement. Miss consistently → you&apos;re not meeting the standard.</strong>
          Radical ownership is not a suggestion — it&apos;s the operating mode.
        </p>
      </Card>

      {/* Weekly operating rhythm */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">Weekly Operating Rhythm — Non-Negotiable</h3>
        <div className="space-y-2">
          {[
            {
              days: 'Monday & Thursday',
              action: 'Post KPI Updates in #ops-manager-discussion',
              detail: 'Per account: Client Name | Cycle # | Day X of 28 | Bookings: X / XX target | Status 🟢🟡🟠🔴 | Notes + specific action step with date. Every account. Every time.',
              color: 'bg-brand-yellow text-brand-black',
              yours: true,
            },
            {
              days: 'Tuesday & Friday',
              action: 'Review Calls with Jonathan',
              detail: 'Present accounts, Layer 1 first — bookings vs target, cost per booking, health status. Come with action steps already prepared. Implement feedback same day.',
              color: 'bg-brand-black text-white',
              yours: true,
            },
            {
              days: 'Daily (Business Hours)',
              action: '5–30 min Slack response time',
              detail: 'If on a call: post "In a call, back in 30 min." Proactive over reactive — update clients before they wonder. Never let a message sit unanswered past 30 minutes.',
              color: 'bg-brand-gray-light text-brand-black',
              yours: false,
            },
            {
              days: 'Saturday',
              action: 'No meetings — stay responsive',
              detail: 'No scheduled meetings. Stay responsive on Slack. Check accounts. Handle any emergencies. Weekend responsiveness matters.',
              color: 'bg-brand-gray-light text-brand-black',
              yours: false,
            },
            {
              days: 'Sunday',
              action: 'Nothing required',
              detail: 'True day off. But stay reachable if something urgent breaks.',
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
                  }`}>REQUIRED</span>
                )}
              </div>
              <div className={`font-bold text-xs ${r.color.includes('bg-brand-black') ? 'text-brand-yellow' : ''}`}>{r.action}</div>
              <div className={`text-xs mt-1 ${r.color.includes('text-white') ? 'text-white/60' : 'text-brand-gray'}`}>{r.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status update format */}
      <ExpandableCard title="Monday/Thursday Status Update — Exact Format" subtitle="Vague updates get called out in review calls" defaultOpen>
        <div className="space-y-3">
          <div className="bg-brand-black rounded-xl p-4 font-mono text-xs">
            <div className="text-brand-yellow font-black text-sm mb-3">📊 [Your Name] — Pod 4 Update — [Day, Date]</div>
            <div className="text-white space-y-3">
              <div>
                <div className="text-brand-yellow">CLIENT NAME</div>
                <div className="text-white/70">Cycle: #X | Day X of 28 | Bookings: X / XX target | Health: 🟢🟡🟠🔴</div>
                <div className="text-white/70">Status: [What&apos;s happening — 1-2 sentences]</div>
                <div className="text-white/70">Action: [Specific step + due date — &quot;I will call [name] by Thursday&quot;]</div>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="text-brand-yellow">CLIENT NAME #2</div>
                <div className="text-white/70">Cycle: #X | Day X of 28 | Bookings: X / XX | Health: 🟢</div>
                <div className="text-white/70">Status: On track. Launched Day 3, averaging 1.2 bookings/day.</div>
                <div className="text-white/70">Action: Check-in scheduled for Day 14. No action needed.</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="font-black text-xs text-green-800 mb-2">✅ Strong Update Has:</div>
              <BulletList items={[
                'Every account listed (no skipping)',
                'Specific day count (Day 14 of 28)',
                'Exact bookings vs target numbers',
                'Named action steps with dates',
                'Problems flagged proactively',
              ]} />
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="font-black text-xs text-red-800 mb-2">❌ Weak Update Has:</div>
              <BulletList items={[
                '"All accounts doing well"',
                'Missing action step dates',
                'No bookings vs target numbers',
                'Vague status like "monitoring"',
                '"Following up" with no specifics',
              ]} />
            </div>
          </div>
          <InfoBox type="info">
            Jonathan and Oscar read updates before review calls. A strong update = a short call where you discuss strategy. A weak update = the entire call is spent on basics.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Daily rhythm */}
      <ExpandableCard title="Daily Communication Standard" subtitle="Morning → Throughout Day → Evening">
        <div className="space-y-3">
          {[
            { time: '8–9 AM', items: ['"Good morning" in #internal-team Slack — shows up for the team', 'Review overnight client messages before the day starts', 'Triage: what needs action today? Prioritize red and orange accounts.'], color: 'bg-brand-yellow-light' },
            { time: 'Business Hours', items: ['5–30 min Slack response. If on a call: post a note.', 'Proactive client updates — they shouldn\'t have to ask what\'s happening', 'All action items executed same day, not tomorrow', 'Problems surfaced immediately, not buried in your next update'], color: 'bg-white border border-brand-gray-mid' },
            { time: 'Evening', items: ['"Good night" in #internal-team Slack', 'Nothing critical left unresolved overnight', 'Set tomorrow\'s priorities before logging off'], color: 'bg-brand-gray-light' },
          ].map((d) => (
            <div key={d.time} className={`p-3 rounded-xl ${d.color}`}>
              <div className="font-black text-xs uppercase tracking-widest text-brand-gray mb-2">{d.time}</div>
              <BulletList items={d.items} />
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* Revenue activities */}
      <ExpandableCard title="Revenue Activities — Always Be Doing These" subtitle="Every cycle is a revenue and relationship opportunity">
        <div className="space-y-2">
          {[
            { action: 'Video testimonial request', when: 'After every successful cycle', detail: 'Use the Testimonial Request SOP. Video testimonials require genuine trust — can\'t be manufactured.', bonus: '+$250' },
            { action: 'Referral ask', when: 'After every successful cycle', detail: '"Do you know any other contractors who could use more booked appointments?" Warm referrals close 3–5× faster.', bonus: '+$500 if closes' },
            { action: 'Upsell proposal', when: 'When Layer 1 is green', detail: 'Client doing well on roofing? Propose a gutter or HVAC campaign. Two niches = two income streams for them (and you).', bonus: 'Commission + upsell' },
            { action: 'Cycle renewal confirmation', when: '5–7 days before cycle end', detail: 'Never let a cycle expire without the next one confirmed. Proactive = feels like a win. Reactive = friction and churn risk.', bonus: 'Protected commission' },
            { action: 'Ad spend scale proposal', when: 'When accounts are consistently hitting targets', detail: 'Push qualified clients past $200/day. You earn 10% of the monthly management fee — plus the retained 2% stays strong.', bonus: 'Ongoing ad-spend upsell' },
          ].map((item) => (
            <div key={item.action} className="flex items-start gap-3 p-3 bg-brand-gray-light rounded-xl">
              <div className="text-brand-yellow font-black text-xs min-w-[60px] flex-shrink-0">{item.bonus}</div>
              <div>
                <div className="font-black text-xs text-brand-black">{item.action} <span className="font-normal text-brand-gray">— {item.when}</span></div>
                <div className="text-xs text-brand-gray mt-0.5">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </ExpandableCard>

      {/* A-player standard */}
      <Card yellow>
        <h3 className="font-black text-base mb-3">The A-Player Standard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <BulletList check items={[
            'Extreme ownership of your pod — wins AND losses',
            'Proactive, not reactive — never wait to be told',
            'Solutions-oriented — bring options, not just problems',
            'Fast learner — absorb and apply immediately',
          ]} />
          <BulletList check items={[
            'High standards for self AND your specialists',
            'Coachable and hungry to improve constantly',
            'No excuses — results focus, always',
            'Feedback is a gift, not criticism',
          ]} />
        </div>
        <InfoBox type="info" className="!bg-black/10 !border-black/20">
          The right response to any feedback: <strong>&quot;Understood. Here&apos;s my plan.&quot;</strong> — not a defense, not an explanation of why it happened.
        </InfoBox>
      </Card>

      {/* Retention math */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-3">The Retention Math — Why It Matters</div>
        <div className="grid grid-cols-5 gap-1 mb-4">
          {[1, 2, 3, 5, 10].map((cycle) => (
            <div key={cycle} className={`rounded-lg p-2 text-center ${cycle === 10 ? 'bg-brand-yellow' : cycle >= 5 ? 'bg-white/20' : 'bg-white/10'}`}>
              <div className={`font-black text-xs ${cycle === 10 ? 'text-brand-black' : 'text-white'}`}>C{cycle}</div>
              <div className={`font-black text-sm mt-0.5 ${cycle === 10 ? 'text-brand-black' : 'text-brand-yellow'}`}>{cycle}x</div>
            </div>
          ))}
        </div>
        <div className="text-white/70 text-sm mb-3">
          Acquiring a client costs thousands in sales overhead. Retaining one costs time and care.
          <strong className="text-white"> Every cycle you preserve = compounding revenue for the agency AND for you.</strong>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-xs text-white/50">
          Average client LTV (launched clients): $11,344. A client you keep through Cycle 10 is worth roughly $1,210 in Year 1 commissions alone — plus ongoing $80/month after that.
        </div>
      </Card>

      {/* Performance philosophy */}
      <ExpandableCard title="Performance Philosophy & Feedback Culture" subtitle="Direct, immediate, and never personal">
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Hit your numbers', result: 'Incentives, bonuses, comp growth, advancement opportunities', icon: '🏆' },
              { label: 'Miss your numbers', result: 'Direct feedback immediately. Not passive aggressive — specific and actionable.', icon: '📉' },
              { label: 'Coachable, shows improvement', result: 'Trust grows. Autonomy grows. Ceiling lifts.', icon: '📈' },
              { label: 'Defensive, makes excuses', result: 'Trust erodes. Closer management. Not the culture here.', icon: '🚫' },
            ].map((p) => (
              <div key={p.label} className="flex items-start gap-2 p-3 bg-brand-gray-light rounded-xl">
                <span className="text-xl flex-shrink-0">{p.icon}</span>
                <div>
                  <div className="font-bold text-sm">{p.label}</div>
                  <div className="text-xs text-brand-gray mt-0.5">{p.result}</div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox type="info">
            Feedback at ContractorsIgnite is direct and immediate. It&apos;s never personal — it&apos;s always about results and improvement. The culture expects you to take feedback, apply it, and move forward quickly.
          </InfoBox>
        </div>
      </ExpandableCard>

      {/* Escalation protocol */}
      <ExpandableCard title="Escalation Protocol — When and How" subtitle="Don't escalate too early or too late">
        <div className="space-y-3">
          <div className="space-y-2">
            {[
              {
                who: 'Jonathan (Director of Operations)',
                when: 'Day-to-day guidance, account issues, KPI reviews, onboarding approvals, any major client problem after you\'ve tried to resolve',
                how: 'Slack DM or #ops-manager-discussion',
                color: 'bg-brand-yellow',
              },
              {
                who: 'Oscar (CEO)',
                when: 'Financial decisions, large contract changes, client threats to sue, anything requiring final business authority',
                how: 'Slack DM — only after looping in Jonathan first',
                color: 'bg-brand-black text-white',
              },
              {
                who: 'Mani (Director of Sales)',
                when: 'Client close rate issues (confirmed lead quality is fine), sales coaching requests, new deal questions',
                how: 'Slack DM',
                color: 'bg-brand-gray-light',
              },
              {
                who: 'Leila / Aica (VA Managers)',
                when: 'VA performance issues, booking rate problems, Logbook access, VA scheduling',
                how: 'Direct Slack message with specific lead examples + call timestamps',
                color: 'bg-brand-gray-light',
              },
            ].map((item) => (
              <div key={item.who} className={`rounded-xl p-3 ${item.color}`}>
                <div className={`font-black text-sm mb-1 ${item.color.includes('text-white') ? 'text-brand-yellow' : ''}`}>{item.who}</div>
                <div className={`text-xs mb-1 ${item.color.includes('text-white') ? 'text-white/60' : 'text-brand-gray'}`}><strong className={item.color.includes('text-white') ? 'text-white' : ''}>When:</strong> {item.when}</div>
                <div className={`text-xs ${item.color.includes('text-white') ? 'text-white/60' : 'text-brand-gray'}`}><strong className={item.color.includes('text-white') ? 'text-white' : ''}>Via:</strong> {item.how}</div>
              </div>
            ))}
          </div>
          <InfoBox type="tip">
            The formula when escalating: <strong>&quot;Hey [name], quick question: [restate the issue briefly]. I&apos;ve already tried [X]. Can you help?&quot;</strong> Showing your work = faster, better answers.
          </InfoBox>
        </div>
      </ExpandableCard>

      <InfoBox type="tip" title="Radical Ownership">
        Your pod is your business. Own every outcome — wins AND losses. Don&apos;t wait to be told. Don&apos;t make excuses.
        Surface problems proactively and bring solutions.
        <strong> The fastest way to earn trust and grow here is to be the person who always has a handle on their pod.</strong>
      </InfoBox>
    </SectionWrapper>
  );
}
