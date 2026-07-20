'use client';
import React, { useState } from 'react';

const C = {
  bg: '#0A0A0A',
  surf: '#111111',
  surf2: '#161616',
  surf3: '#1C1C1C',
  border: '#1E1E1E',
  border2: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  acc: '#F5C800',
  blue: '#4A90D9',
  green: '#22C55E',
  purple: '#A78BFA',
  orange: '#F97316',
};

interface Slide {
  id: number;
  label: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  color: string;
}

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
      <div style={{ width: 3, height: 14, backgroundColor: color, borderRadius: 2 }} />
      <span style={{ color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
    </div>
  );
}

function Bullet({ text, color = C.acc }: { text: string; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
      <span style={{ color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
      <span style={{ color: '#bbb', fontSize: 13.5, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

function Callout({ text, color = C.acc, label }: { text: string; color?: string; label?: string }) {
  return (
    <div style={{
      backgroundColor: color + '0D',
      border: `1px solid ${color}33`,
      borderLeft: `3px solid ${color}`,
      borderRadius: '0 10px 10px 0',
      padding: '12px 16px',
      marginTop: 16,
    }}>
      {label && <div style={{ color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>}
      <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>{text}</div>
    </div>
  );
}

function TBDBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      backgroundColor: '#F9731618', border: '1px solid #F9731644',
      color: '#F97316', fontSize: 10, fontWeight: 800,
      padding: '2px 8px', borderRadius: 20,
      textTransform: 'uppercase', letterSpacing: '0.05em',
      marginLeft: 8,
    }}>TBD</span>
  );
}

const SLIDES: Slide[] = [
  {
    id: 1,
    label: 'The Change',
    title: 'Why We\'re Doing This',
    subtitle: 'The pod model is retiring. Here\'s what\'s replacing it and why.',
    color: C.acc,
    content: (
      <div>
        <SectionHeader label="What\'s Changing" color={C.acc} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: '1 1 200px', backgroundColor: C.surf2, border: `1px solid #EF444433`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ color: '#EF4444', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Old Model</div>
            <Bullet text="Pod managers own everything: media buying, CSM, client relationship" color="#EF4444" />
            <Bullet text="Media buyers execute tasks handed down by pod managers" color="#EF4444" />
            <Bullet text="No clear department ownership or specialization" color="#EF4444" />
            <Bullet text="Hard to scale — one person as the bottleneck for everything" color="#EF4444" />
          </div>
          <div style={{ flex: '1 1 200px', backgroundColor: C.surf2, border: `1px solid ${C.green}33`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ color: C.green, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>New Model</div>
            <Bullet text="Specialized departments: Sales/CSM, Media Buying, Creative, Tech, VA/Call Center" color={C.green} />
            <Bullet text="Media buyers own account performance end-to-end" color={C.green} />
            <Bullet text="Clear ownership at every stage of the client funnel" color={C.green} />
            <Bullet text="Built to scale — specialists improve faster in their lane" color={C.green} />
          </div>
        </div>
        <Callout
          label="The Core Shift"
          text="Media buyers move from button-clickers executing instructions to full account owners diagnosing problems and driving performance decisions. That's a significant upgrade in responsibility — and in growth potential."
          color={C.acc}
        />
      </div>
    ),
  },
  {
    id: 2,
    label: 'Org Structure',
    title: 'The New Department Structure',
    subtitle: 'Who owns what, and how the departments interact.',
    color: C.blue,
    content: (
      <div>
        <SectionHeader label="Department Breakdown" color={C.blue} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            {
              name: 'Sales / CSM',
              owns: 'Client relationship, onboarding communication, renewals, performance reporting to clients',
              color: C.acc,
              note: 'All client-facing activity. Media buyers never interact with clients directly.',
            },
            {
              name: 'Media Buying',
              owns: 'Ad performance — campaign strategy, budget management, creative direction, KPI ownership',
              color: C.blue,
              note: 'You. 15–25 accounts. Own the lead generation number.',
            },
            {
              name: 'Creative Department',
              owns: 'Ad assets — images, videos, copy — produced based on media buyer direction and performance data',
              color: C.purple,
              note: 'Feedback loop: MB requests based on data → Creative builds → MB runs and reports results.',
            },
            {
              name: 'Tech / Automations',
              owns: 'GHL setup, integrations, Zapier, technical configurations',
              color: C.orange,
              note: 'Escalate technical blockers here. They handle the infrastructure.',
            },
            {
              name: 'VA / Call Center',
              owns: 'Calling leads, booking appointments, follow-up sequences',
              color: C.green,
              note: 'Shared accountability with MB for booked appointments during this phase. Full handoff to VA dept coming.',
            },
          ].map((dept) => (
            <div key={dept.name} style={{
              backgroundColor: C.surf,
              border: `1px solid ${dept.color}22`,
              borderLeft: `3px solid ${dept.color}`,
              borderRadius: '0 10px 10px 0',
              padding: '14px 16px',
              display: 'flex', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: '1 1 140px' }}>
                <div style={{ color: dept.color, fontSize: 12, fontWeight: 800, marginBottom: 4 }}>{dept.name}</div>
                <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.5 }}>{dept.owns}</div>
              </div>
              <div style={{ flex: '1 1 160px', backgroundColor: dept.color + '0A', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ color: '#777', fontSize: 11.5, lineHeight: 1.55 }}>{dept.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Your Role',
    title: 'What You Own Now',
    subtitle: 'The full scope of the Full-Cycle Media Buyer role.',
    color: C.purple,
    content: (
      <div>
        <SectionHeader label="Core Responsibilities" color={C.purple} />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: '1 1 200px', backgroundColor: C.surf, border: `1px solid ${C.purple}22`, borderRadius: 10, padding: '18px 18px' }}>
            <div style={{ color: C.purple, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Lead Generation & Ads</div>
            <Bullet text="Full ownership of ad performance: launching, monitoring, refreshing, and killing underperformers" color={C.purple} />
            <Bullet text="Monitoring KPIs on the ads that generate leads the VA team calls and books" color={C.purple} />
            <Bullet text="Keeping CPL and cost per booked appointment inside scalable range" color={C.purple} />
          </div>
          <div style={{ flex: '1 1 200px', backgroundColor: C.surf, border: `1px solid ${C.blue}22`, borderRadius: 10, padding: '18px 18px' }}>
            <div style={{ color: C.blue, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>Account Ownership</div>
            <Bullet text="Manages 15–25 accounts" color={C.blue} />
            <Bullet text="Owns the full ad lifecycle: setup coordination, creative refreshes, turning off underperformers" color={C.blue} />
            <Bullet text="End-to-end accountable for leads and booked appointments at scalable cost" color={C.blue} />
          </div>
        </div>

        <div style={{
          backgroundColor: '#EF44440A',
          border: '1px solid #EF444433',
          borderLeft: '3px solid #EF4444',
          borderRadius: '0 10px 10px 0',
          padding: '14px 16px',
          marginBottom: 16,
        }}>
          <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 800, marginBottom: 6 }}>❌ What You Never Do</div>
          <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
            Media buyers have <strong style={{ color: C.text }}>zero client-facing responsibilities</strong>. No client emails, calls, messages, or performance updates — ever.
            All client communication goes through Sales/CSM. This is a hard line with no exceptions.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 180px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Booked Appointments (Current Phase)</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>
              Shared accountability with the VA team for now. As the VA/Call Center department matures, this responsibility
              shifts fully to them.
            </div>
          </div>
          <div style={{ flex: '1 1 180px', backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, marginBottom: 8 }}>Creative Direction</div>
            <div style={{ color: '#888', fontSize: 12.5, lineHeight: 1.55 }}>
              You don&apos;t build creative — but you drive what gets made, when, and why, based on account performance data.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    label: 'The Mindset',
    title: 'From Task Executor to Account Owner',
    subtitle: 'This is the core shift this role requires.',
    color: C.orange,
    content: (
      <div>
        <SectionHeader label="The Shift" color={C.orange} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: '1 1 200px' }}>
            <div style={{
              backgroundColor: C.surf, border: `1px solid #EF444422`, borderRadius: 10,
              padding: '18px 18px', marginBottom: 12,
            }}>
              <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 800, marginBottom: 10 }}>Task Executor (Old)</div>
              {[
                'Waits to be told what to fix',
                'Executes actions, doesn\'t diagnose causes',
                'Accountability ends when the task is done',
                'Performance problems belong to someone else',
                '"That wasn\'t in my instructions"',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                  <span style={{ color: '#EF4444', fontSize: 11, marginTop: 3, flexShrink: 0 }}>✗</span>
                  <span style={{ color: '#888', fontSize: 12.5, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <div style={{
              backgroundColor: C.surf, border: `1px solid ${C.green}22`, borderRadius: 10,
              padding: '18px 18px', marginBottom: 12,
            }}>
              <div style={{ color: C.green, fontSize: 12, fontWeight: 800, marginBottom: 10 }}>Account Owner (New)</div>
              {[
                'Proactively audits and finds problems before being flagged',
                'Diagnoses root cause before acting',
                'Owns the outcome, not just the task',
                'Performance problems on my accounts are my problems',
                '"Here\'s what I found, what I\'ve already done, and what\'s next"',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                  <span style={{ color: C.green, fontSize: 11, marginTop: 3, flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Callout
          label="The Standard"
          text="If a client account is underperforming and leadership flags it to you before you flagged it to them — that's a process failure. Your system should catch problems before they escalate. That's what ownership means."
          color={C.orange}
        />
        <div style={{ marginTop: 16, backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>What "Owning the Number" Means</div>
          <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.65 }}>
            Leads and booked appointments at scalable cost — that&apos;s the number you own. Not "I ran the ads." Not "I did my tasks."
            The outcome. If the outcome isn&apos;t there, you find out why, fix it, and document what you did.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    label: 'How We Support You',
    title: 'Setup, Tools & Collaboration',
    subtitle: 'How the hybrid model and department structure actually works in practice.',
    color: C.green,
    content: (
      <div>
        <SectionHeader label="Hybrid Setup Model" color={C.green} />
        <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 180px' }}>
              <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>Manual Media Buyer</div>
              <Bullet text="Handles initial setup for new accounts across the board" color={C.acc} />
              <Bullet text="GHL snapshot, landing page, domain, pixel, initial ad structure" color={C.acc} />
              <Bullet text="Gets accounts from zero to live" color={C.acc} />
              <div style={{ marginTop: 12 }}>
                <span style={{ color: C.muted, fontSize: 11 }}>Exact handoff point</span>
                <TBDBadge />
              </div>
            </div>
            <div style={{ flex: 1, color: '#333', fontSize: 24, textAlign: 'center', marginTop: 16 }}>→</div>
            <div style={{ flex: '1 1 180px' }}>
              <div style={{ color: C.blue, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>Assigned Media Buyer (You)</div>
              <Bullet text="Takes over once the account is live and running" color={C.blue} />
              <Bullet text="Owns ongoing performance: KPIs, creative refreshes, budget management" color={C.blue} />
              <Bullet text="Manages the account through every cycle thereafter" color={C.blue} />
            </div>
          </div>
        </div>

        <SectionHeader label="Working with Creative" color={C.purple} />
        <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { step: 'You identify', desc: 'A specific creative need based on account performance data', color: C.acc },
              { step: 'You request', desc: 'Specific asset — format, angle, market, reference — with context', color: C.blue },
              { step: 'Creative builds', desc: 'Asset delivered based on your direction', color: C.purple },
              { step: 'You run & report', desc: 'Performance data fed back to Creative to improve the next iteration', color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ flex: '1 1 130px', textAlign: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  backgroundColor: s.color + '22', border: `1.5px solid ${s.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900, color: s.color,
                  margin: '0 auto 8px',
                }}>{i + 1}</div>
                <div style={{ color: s.color, fontSize: 11, fontWeight: 800, marginBottom: 4 }}>{s.step}</div>
                <div style={{ color: C.muted, fontSize: 11.5, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <SectionHeader label="Working with VAs" color={C.blue} />
        <Bullet text="Shared accountability for booked appointments — you bring leads, they convert" color={C.blue} />
        <Bullet text="When flagging a booking issue: always verify call data first, then flag with specifics" color={C.blue} />
        <Bullet text="Long-term: full booked-appointment accountability shifts to VA/Call Center" color={C.blue} />
        <div style={{ marginTop: 6 }}>
          <span style={{ color: C.muted, fontSize: 11 }}>Timeline for full handoff</span>
          <TBDBadge />
        </div>
      </div>
    ),
  },
  {
    id: 6,
    label: 'Meeting Structure',
    title: 'Cadence & Reporting',
    subtitle: 'How reviews and reporting work as you take ownership of your accounts.',
    color: C.blue,
    content: (
      <div>
        <SectionHeader label="Current State" color={C.muted} />
        <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px', marginBottom: 18 }}>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65 }}>
            Right now, media buyers sit in on account review meetings and observe while pod managers run them.
            That&apos;s the transition period. As you build ownership, you get a real seat.
          </div>
        </div>

        <SectionHeader label="Future State (Likely Structure)" color={C.blue} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          {[
            { day: 'Monday', type: 'Report', desc: 'Document account status, KPIs, findings from previous week. Report submitted before call.', color: C.acc },
            { day: 'Tuesday', type: 'Team Call', desc: 'Present your own account status. Not observed — presenting. Own the narrative.', color: C.blue },
            { day: 'Thursday', type: 'Report', desc: 'Mid-week check-in report. Flag anything that\'s shifted since Monday.', color: C.acc },
            { day: 'Friday', type: 'Team Call', desc: 'Week close. Final account actions, escalations, creative requests for next week.', color: C.blue },
          ].map((s) => (
            <div key={s.day} style={{ flex: '1 1 150px', backgroundColor: C.surf, border: `1px solid ${s.color}22`, borderLeft: `3px solid ${s.color}`, borderRadius: '0 10px 10px 0', padding: '14px 16px' }}>
              <div style={{ color: s.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{s.day}</div>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{s.type}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
        <Callout
          label="Still Evolving"
          color={C.orange}
          text="The exact meeting structure and report format are still being finalized. Treat the above as the likely direction — not the locked spec. Details will be confirmed before full rollout."
        />
        <div style={{ marginTop: 14, backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ color: C.acc, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>What Presenting Looks Like</div>
          <Bullet text="Current performance vs. target — the number, not just a description" color={C.acc} />
          <Bullet text="Root cause of any gap — your diagnosis, not a guess" color={C.acc} />
          <Bullet text="Specific action steps already taken or planned with expected outcomes" color={C.acc} />
          <Bullet text="Anything you need from another department (Creative, VA, Tech) to close the gap" color={C.acc} />
        </div>
      </div>
    ),
  },
  {
    id: 7,
    label: 'Open Items',
    title: 'What\'s Still Being Finalized',
    subtitle: 'Honest status on what\'s TBD before full rollout.',
    color: C.orange,
    content: (
      <div>
        <SectionHeader label="Open Items" color={C.orange} />
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
          The structure above is the direction. A few things are still being finalized before the full rollout.
          These are real open items — not placeholders. You&apos;ll be informed as each gets resolved.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              item: 'Compensation & Bonus Structure',
              detail: 'Performance-based pay tied to hitting cost/scalability targets on your accounts. Structure is still being designed. Will be communicated before training rollout.',
              priority: 'High',
            },
            {
              item: 'Setup Handoff Point',
              detail: 'Exactly what "setup" includes (and what the assigned buyer inherits) is still being defined. The manual vs. assigned split will be specified clearly before accounts start moving.',
              priority: 'High',
            },
            {
              item: 'VA Accountability Transfer Timeline',
              detail: 'When booked-appointment responsibility shifts fully from shared MB/VA accountability to the VA/Call Center department exclusively. Currently: shared. Direction: full handoff to VA.',
              priority: 'Medium',
            },
            {
              item: 'Final Meeting Structure & Report Format',
              detail: 'Tuesday/Friday call cadence and Monday/Thursday report cadence is the direction. Exact format of reports and how accounts are presented are still being locked in.',
              priority: 'Medium',
            },
          ].map((item) => (
            <div key={item.item} style={{
              backgroundColor: C.surf,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.orange}`,
              borderRadius: '0 10px 10px 0',
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                <div style={{ color: C.text, fontSize: 13.5, fontWeight: 800 }}>{item.item}</div>
                <span style={{
                  backgroundColor: C.orange + '18', border: `1px solid ${C.orange}44`,
                  color: C.orange, fontSize: 10, fontWeight: 800,
                  padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', flexShrink: 0,
                }}>TBD</span>
              </div>
              <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 24,
          backgroundColor: C.acc + '0A',
          border: `1px solid ${C.acc}22`,
          borderRadius: 10,
          padding: '18px 20px',
        }}>
          <div style={{ color: C.acc, fontSize: 13, fontWeight: 800, marginBottom: 8 }}>What This Means for You Right Now</div>
          <div style={{ color: '#aaa', fontSize: 13, lineHeight: 1.7 }}>
            Complete your 5-day training program. The framework and principles are locked — only the operational
            details above are pending. By the time you finish training, most of these will be resolved.
            If you have questions, flag them to your manager — don&apos;t guess.
          </div>
        </div>
      </div>
    ),
  },
];

export function MBPresentationTab() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      color: C.text,
    }}>
      {/* Top nav */}
      <div style={{
        position: 'sticky',
        top: 42,
        zIndex: 20,
        backgroundColor: C.surf,
        borderBottom: `1px solid ${C.border}`,
        padding: '0 20px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', gap: 0, maxWidth: 860, margin: '0 auto' }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              style={{
                padding: '11px 14px',
                border: 'none',
                borderBottom: `2px solid ${current === i ? s.color : 'transparent'}`,
                background: 'transparent',
                color: current === i ? s.color : C.muted,
                fontSize: 11.5,
                fontWeight: current === i ? 800 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '36px 20px 80px' }}>
        {/* Slide header */}
        <div style={{
          background: `linear-gradient(135deg, ${slide.color}10 0%, #111111 60%)`,
          border: `1px solid ${slide.color}33`,
          borderRadius: 16,
          padding: '32px 30px 28px',
          marginBottom: 28,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: slide.color, borderRadius: '16px 16px 0 0' }} />
          <div style={{ color: slide.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            {String(slide.id).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')} — {slide.label}
          </div>
          <h1 style={{ color: C.text, fontSize: 26, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p style={{ color: '#888', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{slide.subtitle}</p>
          )}
        </div>

        {/* Slide body */}
        <div>{slide.content}</div>

        {/* Navigation */}
        <div style={{
          marginTop: 36,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${C.border}`,
          paddingTop: 20,
        }}>
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            style={{
              padding: '10px 20px', borderRadius: 10,
              border: `1px solid ${C.border2}`,
              background: 'transparent',
              color: current === 0 ? '#333' : C.muted,
              fontWeight: 700, fontSize: 13, cursor: current === 0 ? 'default' : 'pointer',
            }}
          >
            ← Previous
          </button>

          <div style={{ display: 'flex', gap: 6 }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: 'none',
                  backgroundColor: i === current ? slide.color : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(Math.min(SLIDES.length - 1, current + 1))}
            disabled={current === SLIDES.length - 1}
            style={{
              padding: '10px 20px', borderRadius: 10,
              border: 'none',
              background: current === SLIDES.length - 1 ? '#1a1a1a' : slide.color,
              color: current === SLIDES.length - 1 ? '#333' : '#000',
              fontWeight: 800, fontSize: 13, cursor: current === SLIDES.length - 1 ? 'default' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
