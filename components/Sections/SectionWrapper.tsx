'use client';
import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, ArrowUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';
import { Quiz } from '@/components/Interactive/Quiz';
import { BookmarkButton } from '@/components/Interactive/BookmarkButton';

interface SectionWrapperProps {
  sectionId: number;
  children: React.ReactNode;
}

export function SectionWrapper({ sectionId, children }: SectionWrapperProps) {
  const { setCurrentSection, markSectionComplete, isCompleted } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const handler = () => setShowBackToTop(main.scrollTop > 400);
    main.addEventListener('scroll', handler, { passive: true });
    return () => main.removeEventListener('scroll', handler);
  }, []);
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const completed = isCompleted(sectionId);
  const prevSection = SECTIONS.find((s) => s.id === sectionId - 1);
  const nextSection = SECTIONS.find((s) => s.id === sectionId + 1);

  const handleComplete = () => {
    markSectionComplete(sectionId);
    if (nextSection) {
      setTimeout(() => setCurrentSection(nextSection.id), 300);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-brand-gray uppercase tracking-widest">
              Section {String(sectionId).padStart(2, '0')} of {SECTIONS.length}
            </span>
            {completed && (
              <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                <CheckCircle size={12} /> Complete
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-black leading-tight">{section.title}</h1>
          <p className="text-brand-gray mt-1 text-sm">{section.subtitle}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-brand-gray">
            <Clock size={12} />
            <span>{section.estimatedTime} read</span>
          </div>
        </div>
        <BookmarkButton sectionId={sectionId} className="self-start flex-shrink-0" />
      </div>

      {/* Divider */}
      <div className="h-0.5 bg-brand-yellow" />

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <h2 className="text-lg font-black mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-brand-yellow text-brand-black text-xs font-black flex items-center justify-center">?</span>
          Knowledge Check
        </h2>
        <Quiz
          sectionId={sectionId}
          questions={section.quiz}
          onComplete={handleComplete}
        />
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full bg-brand-black text-white flex items-center justify-center shadow-lg hover:bg-brand-yellow hover:text-brand-black transition-all"
          title="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-gray-mid">
        {prevSection ? (
          <button
            onClick={() => setCurrentSection(prevSection.id)}
            className="flex items-center gap-2 text-sm font-bold text-brand-gray hover:text-brand-black transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Section {prevSection.id}:</span> {prevSection.title}
          </button>
        ) : <div />}

        {!completed && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-yellow text-brand-black font-black text-sm hover:bg-brand-yellow-dark transition-colors"
          >
            Mark Complete <CheckCircle size={15} />
          </button>
        )}

        {nextSection ? (
          <button
            onClick={() => setCurrentSection(nextSection.id)}
            className="flex items-center gap-2 text-sm font-bold text-brand-gray hover:text-brand-black transition-colors"
          >
            <span className="hidden sm:inline">Section {nextSection.id}:</span> {nextSection.title}
            <ChevronRight size={16} />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
