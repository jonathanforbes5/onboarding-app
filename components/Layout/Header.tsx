'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, FileText, Bookmark, Menu, X, LogOut, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getUserColor } from '@/lib/auth';
import { SECTIONS } from '@/data/sections';

export function Header() {
  const {
    progressPercent,
    setShowSearch,
    setShowNotes,
    sidebarOpen,
    setSidebarOpen,
    bookmarks,
    setCurrentSection,
    currentUser,
    activeTab,
    setActiveTab,
    showCurriculumMap,
    setShowCurriculumMap,
    logout,
    previewMode,
    setPreviewMode,
    openProfileEdit,
  } = useApp();

  const userColor    = currentUser ? getUserColor(currentUser.userKey) : null;
  const isSuperAdmin = currentUser?.role === 'super_admin';
  // In preview mode, pretend we're a regular user
  const effectiveAdmin = isSuperAdmin && !previewMode;

  const [bookmarksOpen,  setBookmarksOpen]  = useState(false);
  const [communityOpen,  setCommunityOpen]  = useState(false);
  const bookmarkRef  = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!bookmarkRef.current?.contains(e.target as Node))  setBookmarksOpen(false);
      if (!communityRef.current?.contains(e.target as Node)) setCommunityOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isPod5User     = currentUser?.userKey === 'ksenia' || currentUser?.userKey === 'adeen';
  // Worksheet only for pod 5 users, or super_admin when actively previewing as pod 5
  const canSeeWorksheet = isPod5User || (isSuperAdmin && previewMode);

  // Primary tabs — always in the bar
  const primaryTabs = [
    { id: 'overview',   label: 'Overview',   icon: '🏠' },
    ...(canSeeWorksheet ? [{ id: 'worksheet', label: 'Worksheet', icon: '📋' }] : []),
    { id: 'sections',   label: 'Company',    icon: '📚' },
    { id: 'resources',  label: 'Resources',  icon: '📁' },
    { id: 'recordings', label: 'Recordings', icon: '🎬' },
  ] as const;

  // More dropdown — only admin when applicable
  const communityTabs = [
    ...(effectiveAdmin ? [{ id: 'admin', label: 'Admin', icon: '📊' }] : []),
  ] as const;

  const communityActive = ['admin'].includes(activeTab);

  return (
  <>
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-black text-white shadow-lg">
      {/* Training progress line */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-brand-yellow transition-all duration-500"
          style={{ width: activeTab === 'sections' ? `${progressPercent}%` : '0%' }}
        />
      </div>

      {/* Preview mode banner */}
      {previewMode && (
        <div style={{
          backgroundColor: '#1A0E00',
          borderBottom: '1px solid #F5C80033',
          padding: '4px 12px',
          fontSize: 11,
          fontWeight: 700,
          color: '#F5C800',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <Eye size={12} />
          Previewing as Pod 5 manager (Ksenia / Adeen) —
          <button
            onClick={() => setPreviewMode(false)}
            style={{ color: '#F5C800', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}
          >
            exit preview
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2">

        {/* ── Left: sidebar toggle + logo ── */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {activeTab === 'sections' && !showCurriculumMap && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          )}
          {activeTab === 'sections' && !showCurriculumMap && (
            <button
              onClick={() => setShowCurriculumMap(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors hidden sm:flex items-center gap-1 text-xs text-white/50 hover:text-white"
              title="Back to curriculum"
            >
              <Menu size={15} />
            </button>
          )}
          <img src="/logo.png" alt="Roof Ignite" className="h-7 w-auto" />
        </div>

        {/* ── Center: primary tabs + community dropdown ── */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
            {primaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Parameters<typeof setActiveTab>[0])}
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

            {/* More dropdown — only shown when there are items (i.e. admin) */}
            {communityTabs.length > 0 && <div className="relative" ref={communityRef}>
              <button
                onClick={() => setCommunityOpen((v) => !v)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  communityActive
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                <span className="text-[13px]">
                  {communityActive
                    ? (communityTabs.find((t) => t.id === activeTab)?.icon ?? '✦')
                    : '✦'}
                </span>
                <span className="hidden sm:inline">
                  {communityActive
                    ? (communityTabs.find((t) => t.id === activeTab)?.label ?? 'More')
                    : 'More'}
                </span>
                <ChevronDown size={11} className={`transition-transform ${communityOpen ? 'rotate-180' : ''}`} />
              </button>

              {communityOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #333',
                  borderRadius: 12,
                  overflow: 'hidden',
                  minWidth: 160,
                  zIndex: 100,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}>
                  {communityTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id as Parameters<typeof setActiveTab>[0]); setCommunityOpen(false); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                        padding: '10px 14px',
                        textAlign: 'left',
                        background: activeTab === tab.id ? '#F5C80018' : 'transparent',
                        borderBottom: '1px solid #2A2A2A',
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.backgroundColor = '#2A2A2A'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = activeTab === tab.id ? '#F5C80018' : 'transparent'; }}
                    >
                      <span style={{ fontSize: 14 }}>{tab.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: activeTab === tab.id ? '#F5C800' : '#CCC' }}>
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>}
          </div>
        </div>

        {/* ── Right: search, section tools, user ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={() => setShowSearch(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Search (⌘K)"
          >
            <Search size={15} />
          </button>

          {activeTab === 'sections' && (
            <>
              {bookmarks.length > 0 && (
                <div className="relative" ref={bookmarkRef}>
                  <button
                    onClick={() => setBookmarksOpen((o) => !o)}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
                    title="Bookmarks"
                  >
                    <Bookmark size={15} fill="currentColor" className="text-brand-yellow" />
                    <span className="text-xs text-brand-yellow font-bold hidden sm:inline">{bookmarks.length}</span>
                  </button>
                  {bookmarksOpen && (
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-brand-gray-mid overflow-hidden z-50">
                      <div className="px-3 py-2 bg-brand-gray-light border-b border-brand-gray-mid">
                        <span className="text-xs font-bold text-brand-black uppercase tracking-wide">Bookmarks</span>
                      </div>
                      {bookmarks.map((id) => {
                        const sec = SECTIONS.find((s) => s.id === id);
                        return (
                          <button
                            key={id}
                            onClick={() => { setCurrentSection(id); setActiveTab('sections'); setBookmarksOpen(false); }}
                            className="w-full text-left px-3 py-2.5 hover:bg-brand-yellow/20 transition-colors border-b border-brand-gray-mid last:border-0"
                          >
                            <div className="text-xs font-bold text-brand-black">{sec?.title}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
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
          {currentUser && userColor && (
            <div className="flex items-center gap-1.5 ml-1 pl-1.5 border-l border-white/10">
              <button
                onClick={openProfileEdit}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 overflow-hidden hover:ring-2 hover:ring-brand-yellow/50 transition-all"
                style={{
                  backgroundColor: currentUser.avatarUrl || currentUser.avatarEmoji ? 'transparent' : userColor.bg,
                  color: userColor.text,
                  fontSize: currentUser.avatarEmoji ? 16 : undefined,
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
                title="Edit profile"
              >
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (currentUser.avatarEmoji ?? currentUser.displayName[0])}
              </button>
              <button
                onClick={openProfileEdit}
                className="text-xs font-semibold text-white/75 hidden sm:inline hover:text-white/100 transition-colors bg-transparent border-none cursor-pointer p-0"
                title="Edit profile"
              >{currentUser.displayName}</button>

              {/* Preview toggle — super admins only */}
              {isSuperAdmin && (
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  title={previewMode ? 'Exit Pod 5 preview' : 'Preview as Pod 5 manager (Ksenia / Adeen)'}
                >
                  {previewMode
                    ? <EyeOff size={13} className="text-brand-yellow" />
                    : <Eye size={13} className="text-white/35 hover:text-white/80" />}
                </button>
              )}

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

  </>
  );
}
