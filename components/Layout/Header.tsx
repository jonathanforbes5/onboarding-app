'use client';
import React from 'react';
import { Search, FileText, Bookmark, Menu, X, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';

const USER_META: Record<string, { name: string; color: string; textColor: string }> = {
  sam:      { name: 'Sam',      color: '#F5C800', textColor: '#000' },
  patrick:  { name: 'Patrick',  color: '#E07B39', textColor: '#fff' },
  jonathan: { name: 'Jonathan', color: '#4A90D9', textColor: '#fff' },
};

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: '🏠' },
  { id: 'worksheet', label: 'Worksheet', icon: '📋' },
  { id: 'sections',  label: 'Training',  icon: '📚' },
] as const;

export function Header() {
  const {
    progressPercent,
    completedSections,
    setShowSearch,
    setShowNotes,
    sidebarOpen,
    setSidebarOpen,
    bookmarks,
    setCurrentSection,
    currentUser,
    activeTab,
    setActiveTab,
    logout,
  } = useApp();

  const userMeta = currentUser ? USER_META[currentUser] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-black text-white shadow-lg">
      {/* Thin progress bar — sections tab only */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-brand-yellow transition-all duration-500"
          style={{ width: activeTab === 'sections' ? `${progressPercent}%` : '0%' }}
        />
      </div>

      <div className="flex items-center gap-2 px-3 py-2">
        {/* ── Left: Logo + burger (sections only) ── */}
        <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
          {activeTab === 'sections' && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          )}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-brand-yellow flex items-center justify-center flex-shrink-0">
              <span className="font-black text-brand-black text-[10px]">CI</span>
            </div>
            <span className="font-black text-sm hidden sm:inline truncate">Contractors Ignite</span>
          </div>
        </div>

        {/* ── Center: Tab switcher ── */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                <span className="text-[13px]">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Actions + user ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {/* Sections-specific tools */}
          {activeTab === 'sections' && (
            <>
              {bookmarks.length > 0 && (
                <div className="relative group">
                  <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1">
                    <Bookmark size={15} fill="currentColor" className="text-brand-yellow" />
                    <span className="text-xs text-brand-yellow font-bold hidden sm:inline">{bookmarks.length}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-brand-gray-mid overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
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
              <button
                onClick={() => setShowSearch(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
                title="Search (⌘K)"
              >
                <Search size={15} />
                <span className="hidden md:inline text-xs text-white/40">⌘K</span>
              </button>
              <button
                onClick={() => setShowNotes(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="My Notes"
              >
                <FileText size={15} />
              </button>
              <span className="text-xs font-black text-brand-yellow hidden md:inline ml-1">
                {progressPercent}%
              </span>
            </>
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
              <span className="text-xs font-semibold text-white/75 hidden sm:inline">{userMeta.name}</span>
              <button
                onClick={logout}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Sign out"
              >
                <LogOut size={13} className="text-white/35 hover:text-white/80" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
