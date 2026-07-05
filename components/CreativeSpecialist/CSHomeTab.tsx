'use client';
import React from 'react';

const C = {
  bg: '#0A0A0A',
  surf: '#111111',
  surf2: '#161616',
  surf3: '#1C1C1C',
  border: '#1E1E1E',
  border2: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  muted2: '#555555',
  acc: '#A78BFA',   // violet — distinct from MB yellow
  blue: '#4A90D9',
  gold: '#F5C800',
};

function Pill({ children, color = C.acc }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase',
      backgroundColor: color + '18', color, border: `1px solid ${color}44`,
    }}>
      {children}
    </span>
  );
}

interface RespCardProps {
  icon: string;
  title: string;
  items: string[];
  color: string;
}

function RespCard({ icon, title, items, color }: RespCardProps) {
  return (
    <div style={{
      flex: '1 1 220px',
      backgroundColor: C.surf,
      border: `1px solid ${color}33`,
      borderRadius: 14,
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: color }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ color: C.text, fontSize: 13, fontWeight: 800 }}>{title}</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
            <span style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface WorkflowStepProps {
  number: number;
  label: string;
  detail: string;
  isLast?: boolean;
}

function WorkflowStep({ number, label, detail, isLast = false }: WorkflowStepProps) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          backgroundColor: number === 1 ? C.acc + '22' : C.surf3,
          border: `1.5px solid ${number === 1 ? C.acc + '66' : C.border2}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 900, color: number === 1 ? C.acc : C.muted,
        }}>
          {number}
        </div>
        {!isLast && <div style={{ width: 1, flex: 1, minHeight: 18, backgroundColor: C.border2, margin: '4px 0' }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 16, flex: 1 }}>
        <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{label}</div>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{detail}</div>
      </div>
    </div>
  );
}

export function CSHomeTab() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '28px 20px 60px',
      color: C.text,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* ── Page header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0D0A1A 0%, #111111 60%)',
          border: `1px solid ${C.acc}33`,
          borderRadius: 16,
          padding: '28px 28px 24px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${C.acc}, transparent)`,
            borderRadius: '16px 16px 0 0',
          }} />
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180, borderRadius: '50%',
            background: `radial-gradient(circle, ${C.acc}0D 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', position: 'relative' }}>
            <div style={{
              width: 48, height: 48, backgroundColor: C.acc, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 22, color: '#fff', flexShrink: 0,
            }}>
              🎨
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
                  AI Creative Specialist
                </h1>
                <Pill color={C.acc}>Creative</Pill>
              </div>
              <p style={{ color: '#999', fontSize: 13, margin: 0, lineHeight: 1.65, maxWidth: 580 }}>
                You own the look and feel of every RoofIgnite ad. Static creatives, text-based ads, AI video assets,
                and visual strategy all run through you. The media buyers bring the account context — you bring the
                creative intelligence that makes ads convert.
              </p>
            </div>
          </div>
        </div>

        {/* ── Core Responsibilities ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Core Responsibilities
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <RespCard
              icon="🖼️"
              title="Static Creatives"
              color="#FB923C"
              items={[
                'Single-image ads (organic look)',
                'Bi-fold and tri-fold formats',
                'Text-based static ads',
                'Before/after and proof-based layouts',
              ]}
            />
            <RespCard
              icon="🤖"
              title="AI Video Assets"
              color={C.acc}
              items={[
                'RoofIgnite Studio outputs',
                'AI video SOP execution',
                'Talking head scripts (companion doc)',
                'Creative refresh cycles',
              ]}
            />
            <RespCard
              icon="🎯"
              title="Creative Strategy"
              color={C.blue}
              items={[
                'Apply the Andromeda Playbook',
                'Use Creative Construction Mastery SOP',
                'Match formats to client stage',
                'Review exemplars before producing',
              ]}
            />
          </div>
        </div>

        {/* ── Creative Formats We Run ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Creative Formats We Run
            </span>
          </div>
          <div style={{
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: '20px 22px',
          }}>
            <p style={{ color: C.muted, fontSize: 12.5, margin: '0 0 16px', lineHeight: 1.6 }}>
              Every new client launch includes a mix of these formats. Reference the{' '}
              <span style={{ color: C.acc, fontWeight: 700 }}>Creative Formats doc</span> in your SOPs tab for the full breakdown.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: 'Organic Images', color: '#22C55E' },
                { label: 'Single Static', color: '#F5C800' },
                { label: 'Bi-fold Static', color: '#F5C800' },
                { label: 'Tri-fold Static', color: '#F5C800' },
                { label: 'Text-Based Static', color: '#FB923C' },
                { label: 'ArcAds AI Video', color: C.acc },
                { label: 'RoofIgnite Studio', color: C.acc },
                { label: 'Talking Head', color: C.blue },
                { label: 'Testimonial', color: C.blue },
                { label: 'Drone Footage', color: '#06B6D4' },
              ].map(({ label, color }) => (
                <span key={label} style={{
                  backgroundColor: color + '18', border: `1px solid ${color}44`,
                  borderRadius: 20, padding: '4px 12px',
                  fontSize: 12, fontWeight: 700, color,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── How Requests Come In ── */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
          {/* Workflow */}
          <div style={{
            flex: '2 1 300px',
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
              <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                How Creative Requests Work
              </span>
            </div>
            <p style={{ color: C.muted, fontSize: 12, margin: '0 0 16px', lineHeight: 1.5 }}>
              Requests come through Slack from Pod Managers or media buyers. Always confirm format and deadline before starting.
            </p>
            <WorkflowStep
              number={1}
              label="Request lands in Slack"
              detail="Pod Manager or MB pings you in #media-buyers or DM with the client context, format needed, and deadline."
            />
            <WorkflowStep
              number={2}
              label="Check the exemplars"
              detail="Pull the correct exemplars guide (Static or Video) before producing. Quality control is step zero."
            />
            <WorkflowStep
              number={3}
              label="Produce and deliver"
              detail="Upload to the Master Creatives folder and drop the link in Slack. Tag the person who requested it."
            />
            <WorkflowStep
              number={4}
              label="If blocked — escalate"
              detail="Need source assets, unclear brief, or a tool issue? Message Jon or Oscar on Slack. Don't sit stuck."
              isLast
            />
          </div>

          {/* Slack channels */}
          <div style={{
            flex: '1 1 220px',
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
              <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Slack Channels
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: '#media-buyers', desc: 'Main channel — creative requests, updates, blockers. Post EOD reports here.', highlight: true },
                { name: '#internal-team', desc: 'Company-wide announcements.' },
                { name: '#ops-manager-discussion', desc: 'Pod managers + team + leadership.' },
              ].map((ch) => (
                <div key={ch.name} style={{
                  backgroundColor: ch.highlight ? C.acc + '0A' : C.surf2,
                  border: `1px solid ${ch.highlight ? C.acc + '33' : C.border2}`,
                  borderRadius: 8,
                  padding: '10px 12px',
                }}>
                  <div style={{ color: C.acc, fontSize: 13, fontWeight: 800, marginBottom: 3, fontFamily: 'monospace' }}>
                    {ch.name}
                  </div>
                  <div style={{ color: C.muted, fontSize: 11.5, lineHeight: 1.5 }}>{ch.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border2}` }}>
              <div style={{ color: C.muted2, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                EOD Report Format
              </div>
              <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 8, padding: '10px 12px', fontFamily: 'monospace', fontSize: 11, lineHeight: 1.7, color: '#bbb' }}>
                <div style={{ color: C.acc, fontWeight: 800, marginBottom: 4 }}>MM/DD End of Day</div>
                <div><span style={{ color: '#555' }}>✅ Completed:</span> Task (~X hrs)</div>
                <div><span style={{ color: '#555' }}>🔄 In Progress:</span> Task — ETA</div>
                <div><span style={{ color: '#555' }}>🚧 Blocker:</span> [if any]</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Training Links ── */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
            <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Your Training Sessions
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              {
                label: 'Ken × Tyler — Session 1',
                desc: 'First training call — role overview, creative formats, and initial workflow walkthrough.',
                url: 'https://fathom.video/share/5MA3xyFoD4iAi9o4yXzjodHoGXX2rUb4',
                color: '#FB923C',
              },
              {
                label: 'Ken × Tyler — Session 2',
                desc: 'Deep dive into specific creative production workflows and quality standards.',
                url: 'https://fathom.video/share/64Kh2VAkbr2Sj7fEeZLcw5nmSxUUcAN5',
                color: '#FB923C',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: '1 1 260px',
                  backgroundColor: C.surf,
                  border: `1px solid ${item.color}33`,
                  borderRadius: 12,
                  padding: '16px 18px',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>🎬</span>
                  <span style={{ color: item.color, fontSize: 12, fontWeight: 800 }}>Fathom Recording</span>
                </div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
