'use client';
import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LoginScreen } from './LoginScreen';
import { AccessDenied } from './AccessDenied';
import { OverviewTab } from '@/components/Overview/OverviewTab';
import { WorksheetTab } from '@/components/Worksheet/WorksheetTab';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
import { SOPsTab } from '@/components/SOPs/SOPsTab';
import { RecordingsTab } from '@/components/Recordings/RecordingsTab';
import { CompanyCurriculum } from '@/components/Sections/CompanyCurriculum';
import { SearchModal } from '@/components/Interactive/SearchModal';
import { NotesPanel } from '@/components/Interactive/NotesPanel';
import { ChatWidget } from '@/components/Chat/ChatWidget';
import { ProfileSetupModal } from '@/components/Profile/ProfileSetupModal';
import { ToastProvider } from '@/components/UI/Toast';
import { useApp } from '@/context/AppContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, authLoading, accessDenied, deniedEmail, activeTab, showCurriculumMap, syncStatus, showCompletionCelebration, setShowCompletionCelebration, setActiveTab, profileEditOpen, openProfileEdit, closeProfileEdit } = useApp();

  // Auto-show profile setup once if the user has no profile data saved yet
  useEffect(() => {
    if (!currentUser) return;
    const seen = localStorage.getItem(`ri_${currentUser.userKey}_profile_setup_seen`);
    const hasProfile = !!(currentUser.bio || currentUser.goal || currentUser.avatarEmoji || currentUser.avatarUrl);
    if (!seen && !hasProfile) {
      const t = setTimeout(() => openProfileEdit(), 1500);
      return () => clearTimeout(t);
    }
  }, [currentUser?.userKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProfileClose = () => {
    closeProfileEdit();
    if (currentUser) {
      try { localStorage.setItem(`ri_${currentUser.userKey}_profile_setup_seen`, '1'); } catch {}
    }
  };

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid #2A2A2A',
            borderTopColor: '#F5C800',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }} />
          <p style={{ color: '#555', fontSize: 13 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (accessDenied) {
    return <ToastProvider><AccessDenied email={deniedEmail} /></ToastProvider>;
  }

  if (!currentUser) {
    return <ToastProvider><LoginScreen /></ToastProvider>;
  }

  const isDark = activeTab !== 'sections';

  return (
    <ToastProvider>
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5' }}
    >
      <Header />

      {/* Offline banner */}
      {syncStatus === 'offline' && currentUser && (
        <div style={{
          position: 'fixed',
          top: 42,
          left: 0,
          right: 0,
          zIndex: 39,
          backgroundColor: '#7C2D12',
          borderBottom: '1px solid #9A3412',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: 12,
          color: '#FED7AA',
          fontWeight: 600,
        }}>
          <span>⚠️</span>
          <span>Offline — progress is saving locally and will sync when you reconnect.</span>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="pt-[42px]">
          <OverviewTab />
        </div>
      )}

      {activeTab === 'worksheet' && (
        <div className="pt-[42px]">
          <WorksheetTab />
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="pt-[42px]">
          <SOPsTab />
        </div>
      )}

      {activeTab === 'recordings' && (
        <div className="pt-[42px]">
          <RecordingsTab />
        </div>
      )}

      {activeTab === 'admin' && currentUser.role === 'super_admin' && (
        <div className="pt-[42px]">
          <AdminDashboard />
        </div>
      )}

      {activeTab === 'sections' && showCurriculumMap && (
        <div className="pt-[42px]">
          <CompanyCurriculum />
        </div>
      )}

      {activeTab === 'sections' && !showCurriculumMap && (
        <>
          <Sidebar />
          <main className="pt-[42px] lg:pl-64 min-h-screen bg-brand-gray-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              {children}
            </div>
          </main>
        </>
      )}

      <SearchModal />
      <NotesPanel />
      {profileEditOpen && <ProfileSetupModal onClose={handleProfileClose} />}
      <ChatWidget userName={currentUser?.userKey ?? 'anonymous'} />

      {/* Completion celebration modal */}
      {showCompletionCelebration && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
          onClick={() => setShowCompletionCelebration(false)}
        >
          <div
            style={{
              backgroundColor: '#111', border: '1px solid #F5C80066', borderRadius: 20,
              padding: '40px 36px', maxWidth: 480, width: '100%', textAlign: 'center',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>🏆</div>
            <div style={{ color: '#F5C800', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              Training Complete
            </div>
            <h2 style={{ color: '#F5F5F5', fontSize: 26, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              All 13 Sections Done.
            </h2>
            <p style={{ color: '#888', fontSize: 13, lineHeight: 1.7, margin: '0 0 24px' }}>
              You&apos;ve completed every section and passed all knowledge checks.
              You now have the foundation to operate as a pod manager at Roof Ignite.
              The real learning starts on live accounts — use this portal daily as your reference.
            </p>
            <div style={{ backgroundColor: '#1A1400', border: '1px solid #F5C80033', borderRadius: 12, padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
              <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>What&apos;s next:</div>
              {[
                'Complete your 10-day Worksheet — use it daily',
                'Ask Leila for Logbook access if you haven\'t already',
                'Shadow this Friday\'s review call',
                'Check the Resources tab daily for SOPs',
                'Bookmark sections you\'ll reference often',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5C800', flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#aaa', fontSize: 12 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => { setShowCompletionCelebration(false); setActiveTab('worksheet'); }}
                style={{
                  backgroundColor: '#F5C800', color: '#000', fontWeight: 800, fontSize: 13,
                  padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
                }}
              >
                Go to Worksheet →
              </button>
              <button
                onClick={() => setShowCompletionCelebration(false)}
                style={{
                  backgroundColor: 'transparent', color: '#666', fontWeight: 600, fontSize: 13,
                  padding: '10px 16px', borderRadius: 10, border: '1px solid #333', cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ToastProvider>
  );
}
