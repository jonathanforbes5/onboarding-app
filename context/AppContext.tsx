'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, signOut as authSignOut, getUserProfileByEmail } from '@/lib/auth';
import {
  fetchUserData,
  pushChecklistItem,
  pushCurrentDay,
  pushSectionComplete,
  pushQuizScore,
} from '@/lib/syncService';

export type { UserProfile };
export type ActiveTab = 'overview' | 'worksheet' | 'sections' | 'resources' | 'recordings' | 'admin';

const TAB_TO_PATH: Record<ActiveTab, string> = {
  overview: '/',
  worksheet: '/worksheet',
  sections: '/company',
  resources: '/resources',
  recordings: '/recordings',
  admin: '/admin',
};

function pathToTab(pathname: string): ActiveTab | null {
  const slug = pathname.replace(/^\//, '').split('/')[0];
  const map: Record<string, ActiveTab> = {
    '': 'overview',
    worksheet: 'worksheet',
    company: 'sections',
    resources: 'resources',
    recordings: 'recordings',
    admin: 'admin',
  };
  return map[slug] ?? null;
}

export interface Note {
  text: string;
  updatedAt: string;
}

export interface AppState {
  // Auth
  currentUser: UserProfile | null;
  authLoading: boolean;       // true while checking initial session
  accessDenied: boolean;      // true when email not in allowed_users
  deniedEmail: string;        // email that was denied
  syncStatus: 'idle' | 'syncing' | 'synced' | 'offline';

  // Navigation
  activeTab: ActiveTab;
  currentSection: number;
  sidebarOpen: boolean;

  // Worksheet
  currentDay: number;
  checklistItems: Record<string, boolean>;

  // Training sections
  completedSections: number[];
  quizScores: Record<number, number>;
  bookmarks: number[];
  notes: Record<number, Note>;

  // UI overlays
  searchQuery: string;
  showSearch: boolean;
  showNotes: boolean;
  showCurriculumMap: boolean;
  showCompletionCelebration: boolean;
  profileEditOpen: boolean;
}

interface AppContextType extends AppState {
  logout: () => void;
  devLogin: () => void;
  updateUserProfile: (fields: { bio?: string; goal?: string; avatarEmoji?: string; avatarUrl?: string }) => Promise<void>;
  setActiveTab: (tab: ActiveTab) => void;
  setCurrentSection: (id: number) => void;
  setSidebarOpen: (v: boolean) => void;
  setCurrentDay: (day: number) => void;
  toggleChecklistItem: (groupId: string, index: number) => void;
  markSectionComplete: (id: number) => void;
  toggleBookmark: (id: number) => void;
  saveNote: (sectionId: number, text: string) => void;
  saveQuizScore: (sectionId: number, score: number) => void;
  setSearchQuery: (q: string) => void;
  setShowSearch: (v: boolean) => void;
  setShowNotes: (v: boolean) => void;
  setShowCurriculumMap: (v: boolean) => void;
  setShowCompletionCelebration: (v: boolean) => void;
  openProfileEdit: () => void;
  closeProfileEdit: () => void;
  progressPercent: number;
  isBookmarked: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const SECTIONS_STORAGE_KEY = 'ri_onboarding_v1';
const TOTAL_SECTIONS = 16;
const BYPASS_KEY = 'ri_bypass_profile';

const defaultState: AppState = {
  currentUser: null,
  authLoading: true,
  accessDenied: false,
  deniedEmail: '',
  syncStatus: 'idle',
  activeTab: 'overview',
  currentSection: 1,
  sidebarOpen: true,
  currentDay: 1,
  checklistItems: {},
  completedSections: [],
  quizScores: {},
  bookmarks: [],
  notes: {},
  searchQuery: '',
  showSearch: false,
  showNotes: false,
  showCurriculumMap: true,
  showCompletionCelebration: false,
  profileEditOpen: false,
};

const AppContext = createContext<AppContextType | null>(null);

// ── localStorage helpers ──────────────────────────────────────

function loadChecklistLocal(userKey: string): Record<string, boolean> {
  const items: Record<string, boolean> = {};
  try {
    const prefix = `ri_${userKey}_`;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix) && !key.endsWith('_day')) {
        items[key.slice(prefix.length)] = localStorage.getItem(key) === '1';
      }
    }
  } catch {}
  return items;
}

function loadSectionsLocal(): Partial<AppState> {
  try {
    const saved = localStorage.getItem(SECTIONS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
}

function persistSectionsLocal(state: AppState) {
  try {
    const { completedSections, bookmarks, notes, quizScores, currentSection } = state;
    localStorage.setItem(SECTIONS_STORAGE_KEY, JSON.stringify({ completedSections, bookmarks, notes, quizScores, currentSection }));
  } catch {}
}

function persistChecklistLocal(userKey: string, items: Record<string, boolean>) {
  try {
    Object.entries(items).forEach(([k, v]) => {
      localStorage.setItem(`ri_${userKey}_${k}`, v ? '1' : '0');
    });
  } catch {}
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  // ── Load sections state from localStorage on boot ────────
  useEffect(() => {
    const saved = loadSectionsLocal();
    setState((prev) => ({ ...prev, ...saved }));
  }, []);

  // ── Supabase Auth listener ────────────────────────────────
  useEffect(() => {
    // Check for master-password bypass profile (staging preview)
    try {
      const bypass = localStorage.getItem(BYPASS_KEY);
      if (bypass) {
        const profile = JSON.parse(bypass) as UserProfile;
        const rawSavedTab = localStorage.getItem(`ri_${profile.userKey}_activeTab`);
        const savedTab = (rawSavedTab === 'chat' ? null : rawSavedTab) as ActiveTab | null;
        setState((prev) => ({
          ...prev,
          currentUser: profile,
          authLoading: false,
          activeTab: savedTab ?? 'overview',
          syncStatus: 'synced',
        }));
        return;
      }
    } catch {}

    if (!supabase) {
      setState((prev) => ({ ...prev, authLoading: false }));
      return;
    }

    // Check existing session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        handleAuthUser(session.user.email);
      } else {
        setState((prev) => ({ ...prev, authLoading: false }));
      }
    });

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email) {
        handleAuthUser(session.user.email);
      } else if (event === 'SIGNED_OUT') {
        setState((prev) => ({
          ...defaultState,
          ...loadSectionsLocal(),
          authLoading: false,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleAuthUser(email: string) {
    setState((prev) => ({ ...prev, authLoading: true, syncStatus: 'syncing' }));

    const profile = await getUserProfileByEmail(email);

    if (!profile) {
      // Email not in allowed_users
      setState((prev) => ({
        ...prev,
        authLoading: false,
        accessDenied: true,
        deniedEmail: email,
        syncStatus: 'offline',
      }));
      return;
    }

    const userKey = profile.userKey;

    // Load local checklist immediately
    const localChecklist = loadChecklistLocal(userKey);
    const localDay = parseInt(localStorage.getItem(`ri_${userKey}_day`) || '1', 10);

    // Restore last active tab; fall back to role-based default only on first visit
    // 'chat' was removed as a tab — if saved, fall back to default
    const rawSavedTab = localStorage.getItem(`ri_${userKey}_activeTab`);
    const savedTab = (rawSavedTab === 'chat' ? null : rawSavedTab) as ActiveTab | null;
    const defaultTab: ActiveTab = savedTab ?? 'overview';

    setState((prev) => ({
      ...prev,
      currentUser: profile,
      authLoading: false,
      accessDenied: false,
      activeTab: defaultTab,
      currentDay: isNaN(localDay) ? 1 : localDay,
      checklistItems: localChecklist,
      syncStatus: 'syncing',
    }));

    // Background-merge from Supabase
    const remote = await fetchUserData(userKey);
    if (!remote) {
      setState((prev) => ({ ...prev, syncStatus: 'offline' }));
      return;
    }

    setState((prev) => {
      const merged: AppState = {
        ...prev,
        currentDay: remote.currentDay,
        completedSections: Array.from(new Set([...prev.completedSections, ...remote.completedSections])),
        quizScores: { ...prev.quizScores, ...remote.quizScores },
        checklistItems: { ...prev.checklistItems, ...remote.checklistItems },
        syncStatus: 'synced',
      };
      persistChecklistLocal(userKey, merged.checklistItems);
      return merged;
    });
  }

  // ── Auth actions ──────────────────────────────────────────
  const updateUserProfile = useCallback(async (fields: { bio?: string; goal?: string; avatarEmoji?: string; avatarUrl?: string }) => {
    const email = state.currentUser?.email;
    if (!email) throw new Error('Not logged in');

    const res = await fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        bio: fields.bio,
        goal: fields.goal,
        avatar_emoji: fields.avatarEmoji,
        avatar_url: fields.avatarUrl,
      }),
    });
    // Silently ignore API failures when Supabase isn't configured (bypass/staging mode)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.error !== 'Supabase not configured') {
        throw new Error(data.error ?? 'Failed to save profile');
      }
    }
    setState((prev) => {
      const updated = prev.currentUser ? {
        ...prev.currentUser,
        bio: fields.bio ?? prev.currentUser.bio,
        goal: fields.goal ?? prev.currentUser.goal,
        avatarEmoji: fields.avatarEmoji ?? prev.currentUser.avatarEmoji,
        avatarUrl: fields.avatarUrl ?? prev.currentUser.avatarUrl,
      } : prev.currentUser;
      // Persist to sessionStorage for bypass mode
      try {
        const bypass = localStorage.getItem('ri_bypass_profile');
        if (bypass && updated) localStorage.setItem('ri_bypass_profile', JSON.stringify(updated));
      } catch {}
      return { ...prev, currentUser: updated };
    });
  }, [state.currentUser?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = useCallback(() => {
    try { localStorage.removeItem(BYPASS_KEY); } catch {}
    authSignOut();
    setState((prev) => ({ ...defaultState, authLoading: false }));
  }, []);

  const devLogin = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentUser: {
        email: 'jonathan@roofignite.com',
        displayName: 'Jonathan',
        userKey: 'jonathan',
        role: 'super_admin',
      },
      authLoading: false,
      accessDenied: false,
      activeTab: 'overview',
      syncStatus: 'synced',
    }));
  }, []);

  // ── URL sync: read path on mount to set initial tab ─────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tab = pathToTab(window.location.pathname);
    if (tab) setState((prev) => ({ ...prev, activeTab: tab }));

    const onPop = () => {
      const t = pathToTab(window.location.pathname);
      if (t) setState((prev) => ({ ...prev, activeTab: t }));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // ── Navigation ────────────────────────────────────────────
  const setActiveTab = useCallback((tab: ActiveTab) => {
    if (typeof window !== 'undefined') {
      const path = TAB_TO_PATH[tab];
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
    }
    setState((prev) => {
      if (prev.currentUser) {
        try { localStorage.setItem(`ri_${prev.currentUser.userKey}_activeTab`, tab); } catch {}
      }
      return { ...prev, activeTab: tab, showCurriculumMap: tab === 'sections' ? true : prev.showCurriculumMap };
    });
  }, []);

  const setCurrentSection = useCallback((id: number) => {
    setState((prev) => {
      const next = { ...prev, currentSection: id, showCurriculumMap: false };
      persistSectionsLocal(next);
      return next;
    });
  }, []);

  const setSidebarOpen = useCallback((v: boolean) => {
    setState((prev) => ({ ...prev, sidebarOpen: v }));
  }, []);

  // ── Worksheet ─────────────────────────────────────────────
  const setCurrentDay = useCallback((day: number) => {
    setState((prev) => {
      if (prev.currentUser) {
        try { localStorage.setItem(`ri_${prev.currentUser.userKey}_day`, String(day)); } catch {}
        pushCurrentDay(prev.currentUser.userKey, day);
      }
      return { ...prev, currentDay: day };
    });
  }, []);

  const toggleChecklistItem = useCallback((groupId: string, index: number) => {
    setState((prev) => {
      const key = `${groupId}_${index}`;
      const newVal = !prev.checklistItems[key];
      const updated = { ...prev.checklistItems, [key]: newVal };
      if (prev.currentUser) {
        try { localStorage.setItem(`ri_${prev.currentUser.userKey}_${key}`, newVal ? '1' : '0'); } catch {}
        pushChecklistItem(prev.currentUser.userKey, groupId, index, newVal);
      }
      return { ...prev, checklistItems: updated };
    });
  }, []);

  // ── Training sections ─────────────────────────────────────
  const markSectionComplete = useCallback((id: number) => {
    setState((prev) => {
      if (prev.completedSections.includes(id)) return prev;
      const newCompleted = [...prev.completedSections, id];
      const allDone = newCompleted.length === TOTAL_SECTIONS;
      const next = {
        ...prev,
        completedSections: newCompleted,
        showCompletionCelebration: allDone ? true : prev.showCompletionCelebration,
      };
      persistSectionsLocal(next);
      if (prev.currentUser) pushSectionComplete(prev.currentUser.userKey, id);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((id: number) => {
    setState((prev) => {
      const next = prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((b) => b !== id)
        : [...prev.bookmarks, id];
      const updated = { ...prev, bookmarks: next };
      persistSectionsLocal(updated);
      return updated;
    });
  }, []);

  const saveNote = useCallback((sectionId: number, text: string) => {
    setState((prev) => {
      const notes = { ...prev.notes, [sectionId]: { text, updatedAt: new Date().toISOString() } };
      const next = { ...prev, notes };
      persistSectionsLocal(next);
      return next;
    });
  }, []);

  const saveQuizScore = useCallback((sectionId: number, score: number) => {
    setState((prev) => {
      const quizScores = { ...prev.quizScores, [sectionId]: score };
      const next = { ...prev, quizScores };
      persistSectionsLocal(next);
      if (prev.currentUser) pushQuizScore(prev.currentUser.userKey, sectionId, score);
      return next;
    });
  }, []);

  // ── UI overlays ───────────────────────────────────────────
  const setSearchQuery       = useCallback((q: string)  => setState((p) => ({ ...p, searchQuery: q })), []);
  const setShowSearch        = useCallback((v: boolean)  => setState((p) => ({ ...p, showSearch: v })), []);
  const setShowNotes         = useCallback((v: boolean)  => setState((p) => ({ ...p, showNotes: v })), []);
  const setShowCurriculumMap        = useCallback((v: boolean) => setState((p) => ({ ...p, showCurriculumMap: v })), []);
  const setShowCompletionCelebration = useCallback((v: boolean) => setState((p) => ({ ...p, showCompletionCelebration: v })), []);
  const openProfileEdit  = useCallback(() => setState((p) => ({ ...p, profileEditOpen: true })), []);
  const closeProfileEdit = useCallback(() => setState((p) => ({ ...p, profileEditOpen: false })), []);

  const progressPercent = Math.round((state.completedSections.length / TOTAL_SECTIONS) * 100);
  const isBookmarked    = (id: number) => state.bookmarks.includes(id);
  const isCompleted     = (id: number) => state.completedSections.includes(id);

  return (
    <AppContext.Provider value={{
      ...state,
      logout,
      devLogin,
      updateUserProfile,
      setActiveTab,
      setCurrentSection,
      setSidebarOpen,
      setCurrentDay,
      toggleChecklistItem,
      markSectionComplete,
      toggleBookmark,
      saveNote,
      saveQuizScore,
      setSearchQuery,
      setShowSearch,
      setShowNotes,
      setShowCurriculumMap,
      setShowCompletionCelebration,
      openProfileEdit,
      closeProfileEdit,
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
