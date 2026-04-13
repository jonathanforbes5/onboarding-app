'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type UserName = 'sam' | 'patrick' | 'jonathan';
export type ActiveTab = 'overview' | 'worksheet' | 'sections';

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
  // User & tab
  currentUser: UserName | null;
  activeTab: ActiveTab;
  currentDay: number;
  checklistItems: Record<string, boolean>; // keyed by `${groupId}_${index}`
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
  // User & tab
  login: (user: UserName) => void;
  logout: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  setCurrentDay: (day: number) => void;
  toggleChecklistItem: (groupId: string, index: number) => void;
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
  currentUser: null,
  activeTab: 'overview',
  currentDay: 1,
  checklistItems: {},
};

const AppContext = createContext<AppContextType | null>(null);

function loadChecklistForUser(user: UserName): Record<string, boolean> {
  const items: Record<string, boolean> = {};
  try {
    const prefix = `ri_${user}_`;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const subKey = key.slice(prefix.length);
        items[subKey] = localStorage.getItem(key) === '1';
      }
    }
  } catch {}
  return items;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    try {
      // Load saved user
      const savedUser = localStorage.getItem('ri_user') as UserName | null;
      const savedDay = savedUser ? parseInt(localStorage.getItem(`ri_${savedUser}_day`) || '1', 10) : 1;

      // Load sections state
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsedSections = saved ? JSON.parse(saved) : {};

      // Load checklist for user if exists
      const checklist = savedUser ? loadChecklistForUser(savedUser) : {};

      setState((prev) => ({
        ...prev,
        ...parsedSections,
        showSearch: false,
        showNotes: false,
        currentUser: savedUser,
        activeTab: 'overview',
        currentDay: isNaN(savedDay) ? 1 : savedDay,
        checklistItems: checklist,
      }));
    } catch {}
  }, []);

  const persistSections = useCallback((next: AppState) => {
    try {
      const { showSearch, showNotes, currentUser, activeTab, currentDay, checklistItems, ...toSave } = next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {}
  }, []);

  const update = useCallback((patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      persistSections(next);
      return next;
    });
  }, [persistSections]);

  const setCurrentSection = useCallback((id: number) => update({ currentSection: id }), [update]);

  const markSectionComplete = useCallback((id: number) => {
    setState((prev) => {
      if (prev.completedSections.includes(id)) return prev;
      const next = { ...prev, completedSections: [...prev.completedSections, id] };
      persistSections(next);
      return next;
    });
  }, [persistSections]);

  const toggleBookmark = useCallback((id: number) => {
    setState((prev) => {
      const next = prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((b) => b !== id)
        : [...prev.bookmarks, id];
      const updated = { ...prev, bookmarks: next };
      persistSections(updated);
      return updated;
    });
  }, [persistSections]);

  const saveNote = useCallback((sectionId: number, text: string) => {
    setState((prev) => {
      const notes = { ...prev.notes, [sectionId]: { text, updatedAt: new Date().toISOString() } };
      const next = { ...prev, notes };
      persistSections(next);
      return next;
    });
  }, [persistSections]);

  const saveQuizScore = useCallback((sectionId: number, score: number) => {
    setState((prev) => {
      const quizScores = { ...prev.quizScores, [sectionId]: score };
      const next = { ...prev, quizScores };
      persistSections(next);
      return next;
    });
  }, [persistSections]);

  const setSearchQuery = useCallback((q: string) => update({ searchQuery: q }), [update]);
  const setShowSearch = useCallback((v: boolean) => update({ showSearch: v }), [update]);
  const setShowNotes = useCallback((v: boolean) => update({ showNotes: v }), [update]);
  const setSidebarOpen = useCallback((v: boolean) => update({ sidebarOpen: v }), [update]);

  const login = useCallback((user: UserName) => {
    try {
      localStorage.setItem('ri_user', user);
    } catch {}
    const savedDay = parseInt(localStorage.getItem(`ri_${user}_day`) || '1', 10);
    const checklist = loadChecklistForUser(user);
    setState((prev) => ({
      ...prev,
      currentUser: user,
      activeTab: 'overview',
      currentDay: isNaN(savedDay) ? 1 : savedDay,
      checklistItems: checklist,
    }));
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('ri_user');
    } catch {}
    setState((prev) => ({
      ...prev,
      currentUser: null,
      activeTab: 'worksheet',
      currentDay: 1,
      checklistItems: {},
    }));
  }, []);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const setCurrentDay = useCallback((day: number) => {
    setState((prev) => {
      try {
        if (prev.currentUser) {
          localStorage.setItem(`ri_${prev.currentUser}_day`, String(day));
        }
      } catch {}
      return { ...prev, currentDay: day };
    });
  }, []);

  const toggleChecklistItem = useCallback((groupId: string, index: number) => {
    setState((prev) => {
      const itemKey = `${groupId}_${index}`;
      const newVal = !prev.checklistItems[itemKey];
      const updated = { ...prev.checklistItems, [itemKey]: newVal };
      try {
        if (prev.currentUser) {
          localStorage.setItem(`ri_${prev.currentUser}_${itemKey}`, newVal ? '1' : '0');
        }
      } catch {}
      return { ...prev, checklistItems: updated };
    });
  }, []);

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
      login,
      logout,
      setActiveTab,
      setCurrentDay,
      toggleChecklistItem,
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
