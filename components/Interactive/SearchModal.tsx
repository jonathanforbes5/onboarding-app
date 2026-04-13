'use client';
import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

export function SearchModal() {
  const { showSearch, searchQuery, setShowSearch, setSearchQuery, setCurrentSection } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [showSearch, setSearchQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setShowSearch]);

  if (!showSearch) return null;

  const q = searchQuery.toLowerCase().trim();
  const results = q
    ? SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q) ||
          s.quiz.some((quiz) => quiz.question.toLowerCase().includes(q))
      )
    : SECTIONS;

  const navigate = (id: number) => {
    setCurrentSection(id);
    setShowSearch(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20 px-4"
      onClick={() => setShowSearch(false)}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-gray-mid">
          <Search size={18} className="text-brand-gray flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search sections, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
          <button onClick={() => setShowSearch(false)}>
            <X size={18} className="text-brand-gray hover:text-brand-black" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-brand-gray text-sm">No results found</div>
          ) : (
            <ul>
              {results.map((s) => (
                <li key={s.id}>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-yellow/20 text-left transition-colors"
                    onClick={() => navigate(s.id)}
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-black text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                      {s.id}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{s.title}</div>
                      <div className="text-xs text-brand-gray">{s.subtitle}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-4 py-2 border-t border-brand-gray-mid bg-brand-gray-light">
          <span className="text-xs text-brand-gray">Press ESC to close · ⌘K to open</span>
        </div>
      </div>
    </div>
  );
}
