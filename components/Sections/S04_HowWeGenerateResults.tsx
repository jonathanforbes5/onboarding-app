'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox, BulletList } from '@/components/UI/Card';
import { FullFunnel } from '@/components/Diagrams/FullFunnel';

export function S04_HowWeGenerateResults() {
  return (
    <SectionWrapper sectionId={4}>

      {/* Intro */}
      <Card dark>
        <div className="text-brand-yellow text-xs font-black uppercase tracking-widest mb-2">The System</div>
        <h2 className="text-xl font-black text-white mb-2">Meta Ads → Appointment</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          We build a complete lead generation machine for every client. From the first ad impression to a booked appointment in their calendar — we own the entire process.
        </p>
      </Card>

      {/* Full funnel diagram */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">The Full Funnel</h3>
        <Card border>
          <FullFunnel />
        </Card>
      </div>

      {/* What we build */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">What We Build for Every Client</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Meta Ads Campaigns', desc: 'Targeting, creative, bidding strategy, and ongoing optimization', icon: '📢' },
            { title: 'Landing Pages', desc: 'Conversion-optimized pages aligned to ad messaging', icon: '🖥️' },
            { title: 'Qualification Survey', desc: 'Multi-step survey to filter tire-kickers and capture intent', icon: '📋' },
            { title: 'GoHighLevel CRM', desc: 'Complete automation hub: pipelines, workflows, calendar booking', icon: '⚙️' },
            { title: 'VA Team', desc: 'Speed-to-lead response within 5 minutes, 7 days a week', icon: '📞' },
            { title: 'Weekly Reporting', desc: 'Performance updates and optimization recommendations', icon: '📊' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-brand-gray-mid">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-xs text-brand-gray mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 80/20 Rule */}
      <Card yellow>
        <h3 className="font-black text-base mb-1">The 80/20 of Performance</h3>
        <p className="text-sm text-brand-black/70 mb-4">20% of inputs drive 80% of results. Know where to focus.</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { factor: 'Creative', desc: 'The ad itself — image, video, copy, hook. The #1 lever.', icon: '🎨' },
            { factor: 'Offer', desc: 'What we\'re promising — free estimate, no obligation, urgency.', icon: '🎁' },
            { factor: 'Targeting', desc: 'Who sees the ad — demographics, location, interests, behavior.', icon: '🎯' },
          ].map((f) => (
            <div key={f.factor} className="bg-black/10 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-black text-sm">{f.factor}</div>
              <div className="text-xs text-brand-black/60 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Critical success factors */}
      <div>
        <h3 className="font-black text-sm uppercase tracking-widest text-brand-gray mb-3">5 Critical Success Factors</h3>
        <div className="space-y-2">
          {[
            { num: '01', factor: 'Ad Creative Quality', impact: 'Drives Cost Per Lead' },
            { num: '02', factor: 'Survey Conversion Rate', impact: 'Filters lead quality' },
            { num: '03', factor: 'Speed to Lead', impact: 'Drives booking rate' },
            { num: '04', factor: 'VA Script Quality', impact: 'Impacts qualification' },
            { num: '05', factor: 'Client Follow-Up', impact: 'Influences show rate' },
          ].map((f) => (
            <div key={f.num} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-brand-gray-mid">
              <div className="w-8 h-8 rounded-lg bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center flex-shrink-0">
                {f.num}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">{f.factor}</div>
              </div>
              <div className="text-xs text-brand-gray bg-brand-gray-light px-2 py-1 rounded-full">
                → {f.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="tip" title="Your Role in the Funnel">
        You are accountable for everything that happens in this funnel — <strong>full ownership, no exceptions</strong>.
        Emmanuel and Mervin handle the technical build, Ken handles creatives, the VA team handles speed-to-lead — but the outcome is on you.
        Diagnose underperformance, prescribe the fix, coordinate the right specialist, and follow through. Think like a doctor: you direct the team, you own the result.
      </InfoBox>
    </SectionWrapper>
  );
}
