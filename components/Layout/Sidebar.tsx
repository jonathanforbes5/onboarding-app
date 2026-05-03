'use client';
import React from 'react';
import {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings, Target, Phone,
  CheckCircle, Circle, Trophy, X, Clock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

const ICONS: Record<string, React.ElementType> = {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings, Target, Phone,
};

const PHASES = [
  { label: 'Foundation',  sections: [1, 2, 3],          color: '#F5C800' },
  { label: 'Delivery',    sections: [4, 5, 6],           color: '#22C55E' },
  { label: 'Operations',  sections: [7, 8, 9],           color: '#4A90D9' },
  { label: 'Mastery',     sections: [10, 11, 12, 13],   color: '#A78BFA' },
  { label: 'Mindset',     sections: [14, 15, 16],        color: '#F97316' },
  { label: 'Context',     sections: [17, 18, 19],        color: '#06B6D4' },
];

function formatMins(mins: number) {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function Sidebar() {
  const { currentSection, setCurrentSection, isCompleted, quizScores, sidebarOpen, setSidebarOpen, completedSections, setShowCurriculumMap, ...state } = useApp();
  const pct = Math.round((completedSections.length / SECTIONS.length) * 100);

  const remainingMins = SECTIONS
    .filter((s) => !isCompleted(s.id))
    .reduce((acc, s) => acc + parseInt(s.estimatedTime), 0);

  const currentPhase = PHASES.find((p) => p.sections.includes(currentSection));

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-12 left-0 bottom-0 z-30 w-64 bg-white border-r border-brand-gray-mid flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Mobile close */}
        <button
          className="lg:hidden absolute top-2 right-2 p-1 rounded-lg hover:bg-brand-gray-light"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={16} className="text-brand-gray" />
        </button>

        {/* Progress summary */}
        <div className="px-4 py-3 border-b border-brand-gray-mid flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gray">Progress</span>
            <span className="text-xs font-black text-brand-black">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-brand-gray-light overflow-hidden">
            <div
              className="h-full bg-brand-yellow rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-brand-gray">
              {completedSections.length}/{SECTIONS.length} done
            </span>
            {remainingMins > 0 && (
              <span className="text-xs text-brand-gray flex items-center gap-1">
                <Clock size={10} />
                {formatMins(remainingMins)} left
              </span>
            )}
          </div>

          {/* Current phase indicator */}
          {currentPhase && (
            <div
              className="mt-2 px-2 py-1 rounded-lg text-[10px] font-bold"
              style={{
                backgroundColor: currentPhase.color + '18',
                color: currentPhase.color,
                border: `1px solid ${currentPhase.color}33`,
              }}
            >
              Phase: {currentPhase.label}
            </div>
          )}
        </div>

        {/* Section list grouped by phase */}
        <nav className="flex-1 overflow-y-auto py-2">
          {PHASES.map((phase) => {
            const phaseSections = SECTIONS.filter((s) => phase.sections.includes(s.id));
            const phaseCompleted = phaseSections.filter((s) => isCompleted(s.id)).length;
            const isCurrentPhase = phase.sections.includes(currentSection);

            return (
              <div key={phase.label}>
                {/* Phase header */}
                <div
                  className="flex items-center justify-between px-4 py-1.5"
                  style={{ borderLeft: `3px solid ${isCurrentPhase ? phase.color : 'transparent'}` }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-wider"
                    style={{ color: isCurrentPhase ? phase.color : '#AAA' }}
                  >
                    {phase.label}
                  </span>
                  <span className="text-[10px] text-brand-gray">
                    {phaseCompleted}/{phaseSections.length}
                  </span>
                </div>

                {/* Sections in this phase */}
                {phaseSections.map((section) => {
                  const completed = isCompleted(section.id);
                  const active = currentSection === section.id;
                  const score = quizScores[section.id];
                  const hasNote = !!(state as any).notes?.[section.id]?.text;
                  const Icon = ICONS[section.icon] || Circle;

                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setCurrentSection(section.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group ${
                        active
                          ? 'bg-brand-yellow border-r-4 border-brand-black'
                          : 'hover:bg-brand-gray-light border-r-4 border-transparent'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {completed ? (
                          <CheckCircle size={14} className="text-green-500" />
                        ) : (
                          <Circle
                            size={14}
                            className={active ? 'text-brand-black' : 'text-brand-gray-mid group-hover:text-brand-gray'}
                          />
                        )}
                      </div>

                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                          active
                            ? 'bg-brand-black text-white'
                            : completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-brand-gray-light text-brand-gray group-hover:bg-brand-gray-mid'
                        }`}
                      >
                        <Icon size={11} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold leading-tight truncate text-brand-black">
                          {section.title}
                        </div>
                        <div className="text-[10px] text-brand-gray mt-0.5 flex items-center gap-1.5">
                          <span>{section.estimatedTime}</span>
                          {score !== undefined && (
                            <>
                              <span>·</span>
                              <span className={`font-bold ${score >= 80 ? 'text-green-600' : 'text-red-500'}`}>
                                {score}%
                              </span>
                            </>
                          )}
                          {hasNote && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" title="You have notes on this section" />}
                        </div>
                      </div>

                      <div className={`text-[10px] font-black flex-shrink-0 ${active ? 'text-brand-black' : 'text-brand-gray-mid'}`}>
                        {String(section.id).padStart(2, '0')}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-brand-gray-mid flex-shrink-0">
          {completedSections.length === SECTIONS.length ? (
            <div className="flex items-center gap-2 py-1 bg-brand-yellow rounded-lg px-3">
              <Trophy size={14} className="text-brand-black" />
              <span className="text-xs font-black text-brand-black">Training Complete!</span>
            </div>
          ) : (
            <button
              onClick={() => setShowCurriculumMap(true)}
              className="w-full text-left text-[11px] text-brand-gray hover:text-brand-black font-semibold py-1 transition-colors"
            >
              ← Back to curriculum overview
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
