'use client';
import React from 'react';
import { Search, FileText, Bookmark, Menu, X, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getUserColor } from '@/lib/auth';
import { SECTIONS } from '@/data/sections';

// Sync indicator dot
function SyncDot({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; title: string }> = {
    syncing: { bg: '#F59E0B', title: 'Syncing…' },
    synced:  { bg: '#22C55E', title: 'Synced'   },
    offline: { bg: '#EF4444', title: 'Offline — using local data' },
    idle:    { bg: '#444',    title: 'Not syncing' },
  };
  const c = cfg[status] ?? cfg.idle;
  return (
    <div
      title={c.title}
      style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        backgroundColor: c.bg,
        animation: status === 'syncing' ? 'pulse 1s infinite' : 'none',
      }}
    />
  );
}

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
    syncStatus,
  } = useApp();

  const userColor     = currentUser ? getUserColor(currentUser.userKey) : null;
  const isSuperAdmin  = currentUser?.role === 'super_admin';

  // Tabs visible to all users
  const baseTabs = [
    { id: 'overview',    label: 'Overview',    icon: '🏠' },
    { id: 'worksheet',   label: 'Worksheet',   icon: '📋' },
    { id: 'sections',    label: 'Training',    icon: '📚' },
    { id: 'resources',   label: 'Resources',   icon: '📁' },
    { id: 'recordings',  label: 'Recordings',  icon: '🎬' },
  ] as const;

  // Super admins get an extra Admin tab
  const adminTab = { id: 'admin', label: 'Admin', icon: '📊' } as const;
  const tabs = isSuperAdmin ? [...baseTabs, adminTab] : baseTabs;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-black text-white shadow-lg">
      {/* Progress line */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-brand-yellow transition-all duration-500"
          style={{ width: activeTab === 'sections' ? `${progressPercent}%` : '0%' }}
        />
      </div>

      <div className="flex items-center gap-2 px-3 py-2">
        {/* ── Left: Logo ── */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          {activeTab === 'sections' && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          )}
          {/* Roof Ignite logo */}
          <img src="/logo.png" alt="Roof Ignite" className="h-7 w-auto" />
        </div>

        {/* ── Center: Tabs ── */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
            {tabs.map((tab) => (
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

          {/* User pill + sync dot */}
          {currentUser && userColor && (
            <div className="flex items-center gap-1.5 ml-1 pl-1.5 border-l border-white/10">
              <SyncDot status={syncStatus} />
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                style={{ backgroundColor: userColor.bg, color: userColor.text }}
              >
                {currentUser.displayName[0]}
              </div>
              <span className="text-xs font-semibold text-white/75 hidden sm:inline">{currentUser.displayName}</span>
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
