'use client';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LoginScreen } from './LoginScreen';
import { OverviewTab } from '@/components/Overview/OverviewTab';
import { WorksheetTab } from '@/components/Worksheet/WorksheetTab';
import { AdminDashboard } from '@/components/Admin/AdminDashboard';
import { SearchModal } from '@/components/Interactive/SearchModal';
import { NotesPanel } from '@/components/Interactive/NotesPanel';
import { useApp } from '@/context/AppContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, activeTab } = useApp();

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

      {activeTab === 'admin' && currentUser === 'jonathan' && (
        <div className="pt-[42px]">
          <AdminDashboard />
        </div>
      )}

      {activeTab === 'sections' && (
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
