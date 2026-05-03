'use client';
import React from 'react';
import {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings, Target, Phone,
  CheckCircle, Trophy, ChevronRight, Clock, Play,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

const ICONS: Record<string, React.ElementType> = {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings, Target, Phone,
};

const SECTION_THEMES: Record<number, { accent: string; bg: string }> = {
  1:  { accent: '#F5C800', bg: '#1A1400' },
  2:  { accent: '#4A90D9', bg: '#0D1520' },
  3:  { accent: '#22C55E', bg: '#0D1A0D' },
  4:  { accent: '#F59E0B', bg: '#1A1200' },
  5:  { accent: '#A78BFA', bg: '#120D1A' },
  6:  { accent: '#34D399', bg: '#0D1A14' },
  7:  { accent: '#60A5FA', bg: '#0D1220' },
  8:  { accent: '#F87171', bg: '#1A0D0D' },
  9:  { accent: '#FBBF24', bg: '#1A1400' },
  10: { accent: '#C084FC', bg: '#150D1A' },
  11: { accent: '#94A3B8', bg: '#111418' },
  12: { accent: '#EF4444', bg: '#1A0D0D' },
  13: { accent: '#22D3EE', bg: '#0D181A' },
};

const LEARNING_PHASES = [
  { label: 'Foundation', sections: [1, 2, 3],        color: '#F5C800', desc: 'Company, industry, and business model' },
  { label: 'Delivery',   sections: [4, 5, 6],         color: '#22C55E', desc: 'How we generate results and manage clients' },
  { label: 'Operations', sections: [7, 8, 9],         color: '#4A90D9', desc: 'Team structure, metrics, and diagnosis' },
  { label: 'Mastery',    sections: [10, 11, 12, 13], color: '#A78BFA', desc: 'Culture, performance standards, tools, and mastery' },
];

export function CompanyCurriculum() {
  const { setCurrentSection, isCompleted, quizScores, completedSections, progressPercent } = useApp();
  const totalTime = SECTIONS.reduce((acc, s) => acc + parseInt(s.estimatedTime), 0);
  const lastIncomplete = SECTIONS.find((s) => !isCompleted(s.id));

  return (
    <div style={{
      minHeight: 'calc(100vh - 48px)',
      backgroundColor: '#F5F5F0',
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: 80,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px' }}>

        {/* ── Hero ── */}
        <div style={{
          background: 'linear-gradient(135deg, #111111 0%, #1A1400 100%)',
          border: '1px solid #F5C80033',
          borderRadius: 20,
          padding: 'clamp(20px, 5vw, 32px) clamp(16px, 4vw, 32px) clamp(18px, 4vw, 28px)',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #F5C80015 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                  Company Training Curriculum
                </div>
                <h1 style={{ color: '#F5F5F5', fontSize: 28, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.5px' }}>
                  11 Sections · {totalTime} min total
                </h1>
                <p style={{ color: '#888', fontSize: 13, margin: 0, lineHeight: 1.6, maxWidth: 500 }}>
                  Everything you need to operate as a pod manager — business model, performance metrics,
                  client management, org structure, and tools. Complete each section and pass the knowledge check to mark it done.
                </p>
              </div>

              {/* Progress ring area */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '4px solid #2A2A2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  background: progressPercent === 100
                    ? 'conic-gradient(#F5C800 360deg, #2A2A2A 0deg)'
                    : `conic-gradient(#F5C800 ${progressPercent * 3.6}deg, #2A2A2A 0deg)`,
                  position: 'relative',
                }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}>
                    <span style={{ color: '#F5C800', fontSize: 18, fontWeight: 900 }}>{progressPercent}%</span>
                  </div>
                </div>
                <div style={{ color: '#555', fontSize: 11, marginTop: 8 }}>
                  {completedSections.length} / {SECTIONS.length} done
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 20 }}>
              <div style={{ height: 6, backgroundColor: '#2A2A2A', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  backgroundColor: '#F5C800',
                  borderRadius: 3,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ color: '#444', fontSize: 11 }}>Start</span>
                <span style={{ color: '#444', fontSize: 11 }}>Complete</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 20 }}>
              {lastIncomplete ? (
                <button
                  onClick={() => setCurrentSection(lastIncomplete.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    backgroundColor: '#F5C800',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: 13,
                    padding: '10px 20px',
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Play size={14} fill="currentColor" />
                  {completedSections.length === 0 ? 'Start Section 1' : `Continue — Section ${lastIncomplete.id}: ${lastIncomplete.title}`}
                </button>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#22C55E', fontSize: 13, fontWeight: 800 }}>
                  <Trophy size={16} />
                  All sections complete — excellent work!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Learning Phases ── */}
        {LEARNING_PHASES.map((phase, phaseIdx) => (
          <div key={phase.label} style={{ marginBottom: 28 }}>
            {/* Phase header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: phase.color + '22',
                border: `1.5px solid ${phase.color}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 900,
                color: phase.color,
              }}>
                {phaseIdx + 1}
              </div>
              <div>
                <span style={{ color: phase.color, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Phase: {phase.label}
                </span>
                <span style={{ color: '#888', fontSize: 11, marginLeft: 8 }}>— {phase.desc}</span>
              </div>
              <div style={{ flex: 1, height: 1, backgroundColor: '#E8E8E0', marginLeft: 4 }} />
              <div style={{ color: '#AAA', fontSize: 11 }}>
                {phase.sections.filter((id) => isCompleted(id)).length}/{phase.sections.length} complete
              </div>
            </div>

            {/* Section cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 10 }}>
              {phase.sections.map((id) => {
                const section = SECTIONS.find((s) => s.id === id)!;
                const completed = isCompleted(id);
                const score = quizScores[id];
                const Icon = ICONS[section.icon] || Rocket;
                const theme = SECTION_THEMES[id] ?? { accent: '#F5C800', bg: '#1A1400' };

                return (
                  <button
                    key={id}
                    onClick={() => setCurrentSection(id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      backgroundColor: '#FFFFFF',
                      border: completed ? `2px solid #22C55E44` : `2px solid #E8E8E0`,
                      borderRadius: 14,
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      overflow: 'hidden',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = theme.accent + '88';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = completed ? '#22C55E44' : '#E8E8E0';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* Card top accent */}
                    <div style={{
                      height: 3,
                      backgroundColor: completed ? '#22C55E' : theme.accent + '55',
                    }} />

                    <div style={{ padding: '14px 16px' }}>
                      {/* Header row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: theme.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: theme.accent,
                        }}>
                          <Icon size={16} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#888', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                            Section {String(id).padStart(2, '0')}
                          </div>
                          <div style={{ color: '#111', fontSize: 13, fontWeight: 800, lineHeight: 1.3 }}>
                            {section.title}
                          </div>
                        </div>
                        {completed ? (
                          <CheckCircle size={16} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
                        ) : (
                          <ChevronRight size={16} color="#CCC" style={{ flexShrink: 0, marginTop: 2 }} />
                        )}
                      </div>

                      <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
                        {section.subtitle}
                      </div>

                      {/* Footer row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#AAA', fontSize: 11 }}>
                          <Clock size={11} />
                          <span>{section.estimatedTime}</span>
                        </div>
                        {score !== undefined && (
                          <div style={{
                            fontSize: 10,
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 20,
                            backgroundColor: score >= 80 ? '#F0FDF4' : '#FEF2F2',
                            color: score >= 80 ? '#16A34A' : '#DC2626',
                            border: `1px solid ${score >= 80 ? '#BBF7D0' : '#FECACA'}`,
                          }}>
                            Quiz: {score}%
                          </div>
                        )}
                        {!completed && !score && (
                          <div style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 20,
                            backgroundColor: '#F5F5F5',
                            color: '#AAA',
                            border: '1px solid #E8E8E8',
                          }}>
                            Not started
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── Tips ── */}
        <div style={{
          backgroundColor: '#1A1400',
          border: '1px solid #F5C80022',
          borderRadius: 14,
          padding: '18px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 16,
        }}>
          {[
            { icon: '📖', tip: 'Read each section fully before attempting the quiz — context matters.' },
            { icon: '✅', tip: 'Score 80%+ to mark a section complete and unlock the next CTA.' },
            { icon: '🔖', tip: 'Use the bookmark icon in each section to save key content for quick review.' },
            { icon: '📝', tip: 'Use the Notes panel to capture anything you want to remember or ask about.' },
          ].map((item) => (
            <div key={item.tip} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <p style={{ color: '#888', fontSize: 12, margin: 0, lineHeight: 1.55 }}>{item.tip}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
