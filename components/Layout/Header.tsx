'use client';
import React from 'react';
import { Search, FileText, Bookmark, Menu, X, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

const USER_LABELS: Record<string, { name: string; color: string; textColor: string }> = {
  sam: { name: 'Sam', color: '#F5C800', textColor: '#000' },
  patrick: { name: 'Patrick', color: '#E07B39', textColor: '#fff' },
  jonathan: { name: 'Jonathan', color: '#4A90D9', textColor: '#fff' },
};

export function Header() {
  const {
    progressPercent,
    completedSections,
    setShowSearch,
    setShowNotes,
    sidebarOpen,
    setSidebarOpen,
    bookmarks,
    currentSection,
    setCurrentSection,
    currentUser,
    activeTab,
    setActiveTab,
    logout,
  } = useApp();

  const userMeta = currentUser ? USER_LABELS[currentUser] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-black text-white shadow-lg">
      {/* Progress bar — only shown on sections tab */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-brand-yellow transition-all duration-500"
          style={{ width: activeTab === 'sections' ? `${progressPercent}%` : '0%' }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 gap-3">
        {/* Left: logo + burger */}
        <div className="flex items-center gap-3 min-w-0">
          {activeTab === 'sections' && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 lg:hidden"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-brand-yellow flex items-center justify-center flex-shrink-0">
              <span className="font-black text-brand-black text-xs">CI</span>
            </div>
            <div className="hidden sm:block min-w-0">
              <div className="font-black text-sm leading-tight truncate">Contractors Ignite</div>
              <div className="text-[10px] text-white/50 leading-tight">Pod Manager Onboarding</div>
            </div>
          </div>
        </div>

        {/* Center: tab switcher */}
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 flex-shrink-0">
          <button
            onClick={() => setActiveTab('worksheet')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'worksheet'
                ? 'bg-brand-yellow text-brand-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            📋 Worksheet
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'sections'
                ? 'bg-brand-yellow text-brand-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            📚 Training
          </button>
        </div>

        {/* Right: user + actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Sections-specific: bookmarks */}
          {activeTab === 'sections' && bookmarks.length > 0 && (
            <div className="relative group">
              <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1">
                <Bookmark size={16} fill="currentColor" className="text-brand-yellow" />
                <span className="text-xs text-brand-yellow font-bold hidden sm:inline">{bookmarks.length}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-brand-gray-mid overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                <div className="px-3 py-2 bg-brand-gray-light border-b border-brand-gray-mid">
                  <span className="text-xs font-bold text-brand-black uppercase tracking-wide">Bookmarks</span>
                </div>
                {bookmarks.map((id) => {
                  const sec = SECTIONS.find((s) => s.id === id);
                  return (
                    <button
                      key={id}
                      onClick={() => { setCurrentSection(id); setActiveTab('sections'); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-brand-yellow/20 transition-colors border-b border-brand-gray-mid last:border-0"
                    >
                      <div className="text-xs font-bold text-brand-black">{sec?.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search + Notes (sections only) */}
          {activeTab === 'sections' && (
            <>
              <button
                onClick={() => setShowSearch(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5"
                title="Search (⌘K)"
              >
                <Search size={16} />
                <span className="hidden sm:inline text-xs text-white/50">⌘K</span>
              </button>
              <button
                onClick={() => setShowNotes(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="My Notes"
              >
                <FileText size={16} />
              </button>
            </>
          )}

          {/* Sections progress (sections tab only) */}
          {activeTab === 'sections' && (
            <div className="hidden md:flex items-center gap-1.5 ml-1">
              <span className="text-xs text-white/50">{completedSections.length}/{SECTIONS.length}</span>
              <span className="text-sm font-black text-brand-yellow">{progressPercent}%</span>
            </div>
          )}

          {/* User pill */}
          {userMeta && (
            <div className="flex items-center gap-1.5 ml-1 pl-1.5 border-l border-white/10">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                style={{ backgroundColor: userMeta.color, color: userMeta.textColor }}
              >
                {userMeta.name[0]}
              </div>
              <span className="text-xs font-bold text-white/80 hidden sm:inline">{userMeta.name}</span>
              <button
                onClick={logout}
                className="p-1 rounded hover:bg-white/10 transition-colors ml-0.5"
                title="Sign out"
              >
                <LogOut size={13} className="text-white/40 hover:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
