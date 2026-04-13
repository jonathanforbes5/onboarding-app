'use client';
import React from 'react';
import {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings,
  CheckCircle, Circle, Trophy, X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

const ICONS: Record<string, React.ElementType> = {
  Rocket, Building2, RefreshCw, TrendingUp, Users, Workflow,
  Network, BarChart3, Stethoscope, Zap, Settings,
};

export function Sidebar() {
  const { currentSection, setCurrentSection, isCompleted, quizScores, sidebarOpen, setSidebarOpen, completedSections } = useApp();
  const pct = Math.round((completedSections.length / SECTIONS.length) * 100);

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
          <div className="text-xs text-brand-gray mt-1">
            {completedSections.length} of {SECTIONS.length} sections complete
          </div>
        </div>

        {/* Section list */}
        <nav className="flex-1 overflow-y-auto py-2">
          {SECTIONS.map((section) => {
            const completed = isCompleted(section.id);
            const active = currentSection === section.id;
            const score = quizScores[section.id];
            const Icon = ICONS[section.icon] || Circle;

            return (
              <button
                key={section.id}
                onClick={() => {
                  setCurrentSection(section.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group ${
                  active
                    ? 'bg-brand-yellow border-r-4 border-brand-black'
                    : 'hover:bg-brand-gray-light border-r-4 border-transparent'
                }`}
              >
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {completed ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <Circle
                      size={16}
                      className={active ? 'text-brand-black' : 'text-brand-gray-mid group-hover:text-brand-gray'}
                    />
                  )}
                </div>

                {/* Section icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    active
                      ? 'bg-brand-black text-white'
                      : completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-brand-gray-light text-brand-gray group-hover:bg-brand-gray-mid'
                  }`}
                >
                  <Icon size={13} />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-bold leading-tight truncate ${active ? 'text-brand-black' : 'text-brand-black'}`}>
                    {section.title}
                  </div>
                  <div className="text-[10px] text-brand-gray mt-0.5 flex items-center gap-1.5">
                    <span>{section.estimatedTime}</span>
                    {score !== undefined && (
                      <>
                        <span>·</span>
                        <span className={`font-bold ${score >= 60 ? 'text-green-600' : 'text-red-500'}`}>
                          Quiz {score}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Section number */}
                <div className={`text-[10px] font-black flex-shrink-0 ${active ? 'text-brand-black' : 'text-brand-gray-mid'}`}>
                  {String(section.id).padStart(2, '0')}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {completedSections.length === SECTIONS.length && (
          <div className="px-4 py-3 border-t border-brand-gray-mid bg-brand-yellow flex-shrink-0">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-brand-black" />
              <span className="text-xs font-black text-brand-black">Onboarding Complete!</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
