/**
 * Sync service — bridges the app's localStorage state with Supabase.
 * All writes are fire-and-forget (async, non-blocking).
 * On login, we pull the latest from Supabase and merge into local state.
 */

import { supabase } from './supabase';

export type UserName = 'sam' | 'patrick' | 'jonathan';

// ── Types returned by fetchUserData ──────────────────────────

export interface RemoteUserData {
  checklistItems: Record<string, boolean>; // keyed `${group_id}_${item_index}`
  currentDay: number;
  completedSections: number[];
  quizScores: Record<number, number>;
}

export interface AllUsersProgress {
  [userName: string]: RemoteUserData & { lastSeen?: string };
}

// ── Fetch one user's full progress from Supabase ─────────────

export async function fetchUserData(userName: UserName): Promise<RemoteUserData | null> {
  if (!supabase) return null;
  try {
    const [checklistRes, dayRes, sectionsRes, quizRes] = await Promise.all([
      supabase
        .from('checklist_items')
        .select('group_id, item_index, completed')
        .eq('user_name', userName),
      supabase
        .from('worksheet_state')
        .select('current_day')
        .eq('user_name', userName)
        .maybeSingle(),
      supabase
        .from('section_completions')
        .select('section_id')
        .eq('user_name', userName),
      supabase
        .from('quiz_scores')
        .select('section_id, score')
        .eq('user_name', userName),
    ]);

    const checklistItems: Record<string, boolean> = {};
    (checklistRes.data ?? []).forEach((row: any) => {
      checklistItems[`${row.group_id}_${row.item_index}`] = row.completed;
    });

    const completedSections = (sectionsRes.data ?? []).map((r: any) => r.section_id as number);

    const quizScores: Record<number, number> = {};
    (quizRes.data ?? []).forEach((r: any) => { quizScores[r.section_id] = r.score; });

    return {
      checklistItems,
      currentDay: dayRes.data?.current_day ?? 1,
      completedSections,
      quizScores,
    };
  } catch (err) {
    console.warn('[sync] fetchUserData failed:', err);
    return null;
  }
}

// ── Fetch all users' progress (admin only) ───────────────────

export async function fetchAllUsersProgress(): Promise<AllUsersProgress> {
  if (!supabase) return {};
  try {
    const [checklistRes, dayRes, sectionsRes, quizRes] = await Promise.all([
      supabase.from('checklist_items').select('user_name, group_id, item_index, completed, updated_at'),
      supabase.from('worksheet_state').select('user_name, current_day, updated_at'),
      supabase.from('section_completions').select('user_name, section_id, completed_at'),
      supabase.from('quiz_scores').select('user_name, section_id, score, updated_at'),
    ]);

    const result: AllUsersProgress = {};

    const ensure = (u: string) => {
      if (!result[u]) {
        result[u] = { checklistItems: {}, currentDay: 1, completedSections: [], quizScores: {} };
      }
    };

    (checklistRes.data ?? []).forEach((r: any) => {
      ensure(r.user_name);
      result[r.user_name].checklistItems[`${r.group_id}_${r.item_index}`] = r.completed;
      // Track last seen via checklist updated_at
      if (r.updated_at) {
        const current = (result[r.user_name] as any).lastSeen ?? '';
        if (r.updated_at > current) (result[r.user_name] as any).lastSeen = r.updated_at;
      }
    });

    (dayRes.data ?? []).forEach((r: any) => {
      ensure(r.user_name);
      result[r.user_name].currentDay = r.current_day;
      if (r.updated_at) {
        const current = (result[r.user_name] as any).lastSeen ?? '';
        if (r.updated_at > current) (result[r.user_name] as any).lastSeen = r.updated_at;
      }
    });

    (sectionsRes.data ?? []).forEach((r: any) => {
      ensure(r.user_name);
      if (!result[r.user_name].completedSections.includes(r.section_id)) {
        result[r.user_name].completedSections.push(r.section_id);
      }
    });

    (quizRes.data ?? []).forEach((r: any) => {
      ensure(r.user_name);
      result[r.user_name].quizScores[r.section_id] = r.score;
    });

    return result;
  } catch (err) {
    console.warn('[sync] fetchAllUsersProgress failed:', err);
    return {};
  }
}

// ── Push a single checklist toggle ──────────────────────────

export function pushChecklistItem(
  userName: UserName,
  groupId: string,
  itemIndex: number,
  completed: boolean,
): void {
  if (!supabase) return;
  supabase
    .from('checklist_items')
    .upsert(
      { user_name: userName, group_id: groupId, item_index: itemIndex, completed, updated_at: new Date().toISOString() },
      { onConflict: 'user_name,group_id,item_index' },
    )
    .then(({ error }) => { if (error) console.warn('[sync] checklist push failed:', error.message); });
}

// ── Push current worksheet day ───────────────────────────────

export function pushCurrentDay(userName: UserName, day: number): void {
  if (!supabase) return;
  supabase
    .from('worksheet_state')
    .upsert(
      { user_name: userName, current_day: day, updated_at: new Date().toISOString() },
      { onConflict: 'user_name' },
    )
    .then(({ error }) => { if (error) console.warn('[sync] day push failed:', error.message); });
}

// ── Push section completion ──────────────────────────────────

export function pushSectionComplete(userName: UserName, sectionId: number): void {
  if (!supabase) return;
  supabase
    .from('section_completions')
    .upsert(
      { user_name: userName, section_id: sectionId, completed_at: new Date().toISOString() },
      { onConflict: 'user_name,section_id' },
    )
    .then(({ error }) => { if (error) console.warn('[sync] section push failed:', error.message); });
}

// ── Push quiz score ──────────────────────────────────────────

export function pushQuizScore(userName: UserName, sectionId: number, score: number): void {
  if (!supabase) return;
  supabase
    .from('quiz_scores')
    .upsert(
      { user_name: userName, section_id: sectionId, score, updated_at: new Date().toISOString() },
      { onConflict: 'user_name,section_id' },
    )
    .then(({ error }) => { if (error) console.warn('[sync] quiz push failed:', error.message); });
}
