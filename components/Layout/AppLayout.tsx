'use client';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SearchModal } from '@/components/Interactive/SearchModal';
import { NotesPanel } from '@/components/Interactive/NotesPanel';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-gray-light font-sans">
      <Header />
      <Sidebar />
      <main className="pt-12 lg:pl-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
      <SearchModal />
      <NotesPanel />
    </div>
  );
}
