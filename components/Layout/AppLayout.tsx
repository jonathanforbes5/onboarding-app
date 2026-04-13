'use client';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { LoginScreen } from './LoginScreen';
import { WorksheetTab } from '@/components/Worksheet/WorksheetTab';
import { SearchModal } from '@/components/Interactive/SearchModal';
import { NotesPanel } from '@/components/Interactive/NotesPanel';
import { useApp } from '@/context/AppContext';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, activeTab } = useApp();

  // Show login screen if no user selected
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-brand-gray-light font-sans">
      <Header />

      {activeTab === 'worksheet' ? (
        /* Worksheet tab — dark full-screen layout */
        <div className="pt-12 min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
          <WorksheetTab />
        </div>
      ) : (
        /* Training / Sections tab — existing light layout */
        <>
          <Sidebar />
          <main className="pt-12 lg:pl-64 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              {children}
            </div>
          </main>
        </>
      )}

      {/* Modals — always rendered so keyboard shortcuts work */}
      <SearchModal />
      <NotesPanel />
    </div>
  );
}
