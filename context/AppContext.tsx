'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Note {
  text: string;
  updatedAt: string;
}

export interface AppState {
  currentSection: number;
  completedSections: number[];
  bookmarks: number[];
  notes: Record<number, Note>;
  quizScores: Record<number, number>;
  searchQuery: string;
  showSearch: boolean;
  showNotes: boolean;
  sidebarOpen: boolean;
}

interface AppContextType extends AppState {
  setCurrentSection: (id: number) => void;
  markSectionComplete: (id: number) => void;
  toggleBookmark: (id: number) => void;
  saveNote: (sectionId: number, text: string) => void;
  saveQuizScore: (sectionId: number, score: number) => void;
  setSearchQuery: (q: string) => void;
  setShowSearch: (v: boolean) => void;
  setShowNotes: (v: boolean) => void;
  setSidebarOpen: (v: boolean) => void;
  progressPercent: number;
  isBookmarked: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const STORAGE_KEY = 'ri_onboarding_v1';
const TOTAL_SECTIONS = 11;

const defaultState: AppState = {
  currentSection: 1,
  completedSections: [],
  bookmarks: [],
  notes: {},
  quizScores: {},
  searchQuery: '',
  showSearch: false,
  showNotes: false,
  sidebarOpen: true,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed, showSearch: false, showNotes: false }));
      }
    } catch {}
  }, []);

  const persist = useCallback((next: AppState) => {
    try {
      const { showSearch, showNotes, ...toSave } = next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {}
  }, []);

  const update = useCallback((patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      persist(next);
      return next;
    });
  }, [persist]);

  const setCurrentSection = useCallback((id: number) => update({ currentSection: id }), [update]);

  const markSectionComplete = useCallback((id: number) => {
    setState((prev) => {
      if (prev.completedSections.includes(id)) return prev;
      const next = { ...prev, completedSections: [...prev.completedSections, id] };
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleBookmark = useCallback((id: number) => {
    setState((prev) => {
      const next = prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((b) => b !== id)
        : [...prev.bookmarks, id];
      const updated = { ...prev, bookmarks: next };
      persist(updated);
      return updated;
    });
  }, [persist]);

  const saveNote = useCallback((sectionId: number, text: string) => {
    setState((prev) => {
      const notes = { ...prev.notes, [sectionId]: { text, updatedAt: new Date().toISOString() } };
      const next = { ...prev, notes };
      persist(next);
      return next;
    });
  }, [persist]);

  const saveQuizScore = useCallback((sectionId: number, score: number) => {
    setState((prev) => {
      const quizScores = { ...prev.quizScores, [sectionId]: score };
      const next = { ...prev, quizScores };
      persist(next);
      return next;
    });
  }, [persist]);

  const setSearchQuery = useCallback((q: string) => update({ searchQuery: q }), [update]);
  const setShowSearch = useCallback((v: boolean) => update({ showSearch: v }), [update]);
  const setShowNotes = useCallback((v: boolean) => update({ showNotes: v }), [update]);
  const setSidebarOpen = useCallback((v: boolean) => update({ sidebarOpen: v }), [update]);

  const progressPercent = Math.round((state.completedSections.length / TOTAL_SECTIONS) * 100);
  const isBookmarked = (id: number) => state.bookmarks.includes(id);
  const isCompleted = (id: number) => state.completedSections.includes(id);

  return (
    <AppContext.Provider value={{
      ...state,
      setCurrentSection,
      markSectionComplete,
      toggleBookmark,
      saveNote,
      saveQuizScore,
      setSearchQuery,
      setShowSearch,
      setShowNotes,
      setSidebarOpen,
      progressPercent,
      isBookmarked,
      isCompleted,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
