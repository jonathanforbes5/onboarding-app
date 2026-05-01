'use client';
import React from 'react';
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
import { useApp } from '@/context/AppContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, authLoading, accessDenied, deniedEmail, activeTab, showCurriculumMap } = useApp();

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
    return <AccessDenied email={deniedEmail} />;
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  const isDark = activeTab !== 'sections';

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: isDark ? '#0A0A0A' : '#F5F5F5' }}
    >
      <Header />

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
    </div>
  );
}
