'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, FileText, Bookmark, Menu, X, LogOut, ChevronDown, Eye, EyeOff, ChevronRight } from 'lucide-react';
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
  const effectiveAdmin = isSuperAdmin && !previewMode;

  const isPod5User      = currentUser?.userKey === 'ksenia' || currentUser?.userKey === 'adeen';
  const canSeeWorksheet = isPod5User || (isSuperAdmin && previewMode);

  const [bookmarksOpen,       setBookmarksOpen]       = useState(false);
  const [mobileMenuOpen,      setMobileMenuOpen]      = useState(false);
  const [mobileBookmarksOpen, setMobileBookmarksOpen] = useState(false);
  const bookmarkRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!bookmarkRef.current?.contains(e.target as Node)) setBookmarksOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileMenuOpen]);

  // Close mobile menu on navigation
  const navigate = (tab: Parameters<typeof setActiveTab>[0]) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const allTabs = [
    { id: 'overview',   label: 'Overview',    icon: '🏠' },
    ...(canSeeWorksheet ? [{ id: 'worksheet', label: 'Worksheet', icon: '📋' }] : []),
    { id: 'sections',   label: 'Company',     icon: '📚' },
    { id: 'resources',  label: 'Resources',   icon: '📁' },
    { id: 'recordings', label: 'Recordings',  icon: '🎬' },
    ...(effectiveAdmin  ? [{ id: 'admin',     label: 'Admin',       icon: '📊' }] : []),
  ] as const;

  // Desktop tabs (no admin — goes in More dropdown on desktop)
  const primaryTabs = allTabs.filter(t => t.id !== 'admin') as typeof allTabs[number][];
  const adminTab    = effectiveAdmin ? { id: 'admin' as const, label: 'Admin', icon: '📊' } : null;

  return (
  <>
    <style>{`
      .hdr-mobile-menu {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 50;
        background: #0D0D0D;
        border-bottom: 1px solid #1E1E1E;
        transform: translateY(-100%);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        max-height: 100dvh;
        overflow-y: auto;
        padding-top: 52px; /* below the header bar */
        font-family: Inter, system-ui, sans-serif;
      }
      .hdr-mobile-menu.open { transform: translateY(0); }
      .hdr-mobile-backdrop {
        position: fixed; inset: 0; z-index: 49;
        background: rgba(0,0,0,0.6);
        opacity: 0; pointer-events: none;
        transition: opacity 0.25s;
      }
      .hdr-mobile-backdrop.open { opacity: 1; pointer-events: auto; }
      .hdr-nav-item {
        display: flex; align-items: center; gap: 14px;
        width: 100%; padding: 14px 20px;
        background: none; border: none; cursor: pointer;
        text-align: left; transition: background 0.1s;
        font-family: inherit;
      }
      .hdr-nav-item:active { background: rgba(255,255,255,0.06); }
      .hdr-nav-item.active { background: rgba(245,200,0,0.08); }
    `}</style>

    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-black text-white shadow-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
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
          backgroundColor: '#1A0E00', borderBottom: '1px solid #F5C80033',
          padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#F5C800',
          textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Eye size={12} />
          Previewing as Pod 5 manager (Ksenia / Adeen) —
          <button onClick={() => setPreviewMode(false)}
            style={{ color: '#F5C800', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
            exit preview
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 relative">

        {/* ── Left: sidebar toggle (mobile) + logo (desktop-left / mobile-absolute-center) ── */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Sidebar toggle — only on sections/desktop */}
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
        </div>

        {/* Logo centered absolutely on mobile only */}
        <button
          onClick={() => navigate('overview')}
          className="sm:hidden absolute left-1/2 -translate-x-1/2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        >
          <img src="/logo.png" alt="Roof Ignite" className="h-7 w-auto" />
        </button>

        {/* ── Center: primary tabs — desktop only ── */}
        <div className="flex-1 hidden sm:flex items-center justify-center min-w-0">
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
            {primaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id as Parameters<typeof setActiveTab>[0])}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                <span className="text-[13px]">{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}

            {/* Admin tab — desktop More dropdown */}
            {adminTab && (
              <button
                onClick={() => navigate('admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'admin'
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                <span className="text-[13px]">{adminTab.icon}</span>
                <span className="hidden md:inline">{adminTab.label}</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Right: tools + user — desktop; search + hamburger — mobile ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0 ml-auto sm:ml-0">
          {/* Search — always visible */}
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Search (⌘K)"
          >
            <Search size={16} />
          </button>

          {/* Section tools — desktop only */}
          {activeTab === 'sections' && (
            <div className="hidden sm:flex items-center gap-0.5">
              {bookmarks.length > 0 && (
                <div className="relative" ref={bookmarkRef}>
                  <button
                    onClick={() => setBookmarksOpen((o) => !o)}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
                    title="Bookmarks"
                  >
                    <Bookmark size={15} fill="currentColor" className="text-brand-yellow" />
                    <span className="text-xs text-brand-yellow font-bold hidden md:inline">{bookmarks.length}</span>
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
              <button onClick={() => setShowNotes(true)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="My Notes">
                <FileText size={15} />
              </button>
              <span className="text-xs font-black text-brand-yellow hidden md:inline ml-1">{progressPercent}%</span>
            </div>
          )}

          {/* User pill — desktop only */}
          {currentUser && userColor && (
            <div className="hidden sm:flex items-center gap-1.5 ml-1 pl-1.5 border-l border-white/10">
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
              <button onClick={openProfileEdit}
                className="text-xs font-semibold text-white/75 hidden lg:inline hover:text-white/100 transition-colors bg-transparent border-none cursor-pointer p-0"
                title="Edit profile"
              >{currentUser.displayName}</button>

              {isSuperAdmin && (
                <button onClick={() => setPreviewMode(!previewMode)} className="p-1 rounded hover:bg-white/10 transition-colors"
                  title={previewMode ? 'Exit Pod 5 preview' : 'Preview as Pod 5 manager (Ksenia / Adeen)'}>
                  {previewMode ? <EyeOff size={13} className="text-brand-yellow" /> : <Eye size={13} className="text-white/35 hover:text-white/80" />}
                </button>
              )}
              <button onClick={logout} className="p-1 rounded hover:bg-white/10 transition-colors" title="Sign out">
                <LogOut size={13} className="text-white/35 hover:text-white/80" />
              </button>
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors ml-1"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile backdrop */}
    <div
      className={`hdr-mobile-backdrop${mobileMenuOpen ? ' open' : ''} sm:hidden`}
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Mobile slide-down menu */}
    <div className={`hdr-mobile-menu${mobileMenuOpen ? ' open' : ''} sm:hidden`}>

      {/* Close bar at the very top of the drawer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        padding: '10px 16px 6px',
        borderBottom: '1px solid #1A1A1A',
      }}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#1C1C1C', border: '1px solid #2A2A2A',
            borderRadius: 20, padding: '6px 14px',
            color: '#888', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <X size={14} /> Close
        </button>
      </div>

      {/* User row */}
      {currentUser && userColor && (
        <button
          onClick={() => { openProfileEdit(); setMobileMenuOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', padding: '16px 20px 14px',
            borderBottom: '1px solid #1C1C1C',
            background: 'none', border: 'none', cursor: 'pointer',
            borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1C1C1C',
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: '50%',
              backgroundColor: currentUser.avatarUrl || currentUser.avatarEmoji ? 'transparent' : userColor.bg,
              color: userColor.text,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: currentUser.avatarEmoji ? 22 : 15,
              fontWeight: 900, flexShrink: 0, overflow: 'hidden',
            }}
          >
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (currentUser.avatarEmoji ?? currentUser.displayName[0])}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ color: '#F0F0F0', fontSize: 15, fontWeight: 700 }}>{currentUser.displayName}</div>
            {activeTab === 'sections' && (
              <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{progressPercent}% complete</div>
            )}
          </div>
          <ChevronRight size={14} color="#444" />
        </button>
      )}

      {/* Navigation tabs */}
      <div style={{ padding: '8px 0' }}>
        {allTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`hdr-nav-item${isActive ? ' active' : ''}`}
              onClick={() => navigate(tab.id as Parameters<typeof setActiveTab>[0])}
            >
              <span style={{ fontSize: 20, width: 28, textAlign: 'center', flexShrink: 0 }}>{tab.icon}</span>
              <span style={{ color: isActive ? '#F5C800' : '#CCC', fontSize: 15, fontWeight: isActive ? 700 : 500, flex: 1 }}>
                {tab.label}
              </span>
              {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#F5C800', flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Section tools — only on Company tab */}
      {activeTab === 'sections' && (bookmarks.length > 0 || true) && (
        <div style={{ borderTop: '1px solid #1C1C1C', padding: '8px 0' }}>
          <div style={{ padding: '6px 20px 4px', color: '#555', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Section tools
          </div>
          {bookmarks.length > 0 && (
            <>
              <button className="hdr-nav-item" onClick={() => setMobileBookmarksOpen(v => !v)}>
                <Bookmark size={18} color="#F5C800" fill="#F5C800" style={{ flexShrink: 0 }} />
                <span style={{ color: '#CCC', fontSize: 15, fontWeight: 500 }}>Bookmarks</span>
                <span style={{ color: '#F5C800', fontSize: 13, fontWeight: 700, marginLeft: 'auto' }}>{bookmarks.length}</span>
                <ChevronDown size={14} color="#555" style={{ transform: mobileBookmarksOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }} />
              </button>
              {mobileBookmarksOpen && (
                <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 6 }}>
                  {bookmarks.map((id) => {
                    const sec = SECTIONS.find((s) => s.id === id);
                    return (
                      <button
                        key={id}
                        onClick={() => { setCurrentSection(id); navigate('sections'); setMobileBookmarksOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%', padding: '10px 14px',
                          backgroundColor: '#161616', border: '1px solid #1E1E1E',
                          borderRadius: 10, marginBottom: 6, cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: 13, color: '#888' }}>§{sec?.id}</span>
                        <span style={{ color: '#DDD', fontSize: 13, fontWeight: 600 }}>{sec?.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
          <button className="hdr-nav-item" onClick={() => { setShowNotes(true); setMobileMenuOpen(false); }}>
            <FileText size={18} color="#888" style={{ flexShrink: 0 }} />
            <span style={{ color: '#CCC', fontSize: 15, fontWeight: 500 }}>My Notes</span>
          </button>
        </div>
      )}

      {/* Admin tools */}
      {isSuperAdmin && (
        <div style={{ borderTop: '1px solid #1C1C1C', padding: '8px 0' }}>
          <div style={{ padding: '6px 20px 4px', color: '#555', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Admin
          </div>
          <button className="hdr-nav-item" onClick={() => { setPreviewMode(!previewMode); setMobileMenuOpen(false); }}>
            {previewMode ? <EyeOff size={18} color="#F5C800" style={{ flexShrink: 0 }} /> : <Eye size={18} color="#888" style={{ flexShrink: 0 }} />}
            <span style={{ color: previewMode ? '#F5C800' : '#CCC', fontSize: 15, fontWeight: 500 }}>
              {previewMode ? 'Exit Pod 5 preview' : 'Preview as Pod 5 manager'}
            </span>
          </button>
        </div>
      )}

      {/* Logout */}
      <div style={{ borderTop: '1px solid #1C1C1C', padding: '8px 0 calc(env(safe-area-inset-bottom, 0px) + 16px)' }}>
        <button className="hdr-nav-item" onClick={() => { logout(); setMobileMenuOpen(false); }}>
          <LogOut size={18} color="#555" style={{ flexShrink: 0 }} />
          <span style={{ color: '#666', fontSize: 15, fontWeight: 500 }}>Sign out</span>
        </button>
      </div>
    </div>
  </>
  );
}
