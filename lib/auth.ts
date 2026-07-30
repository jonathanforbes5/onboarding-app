import { supabase } from './supabase';

export interface UserProfile {
  email: string;
  displayName: string;
  userKey: string;
  role: 'super_admin' | 'user' | 'media_buyer' | 'creative_specialist';
  bio?: string;
  goal?: string;
  avatarEmoji?: string;
  avatarUrl?: string;
}

// Avatar colour per user key
export const USER_COLORS: Record<string, { bg: string; text: string }> = {
  sam:      { bg: '#F5C800', text: '#000' },
  patrick:  { bg: '#E07B39', text: '#fff' },
  jonathan: { bg: '#4A90D9', text: '#fff' },
  mani:     { bg: '#22C55E', text: '#fff' },
  oscar:    { bg: '#A78BFA', text: '#fff' },
  info:     { bg: '#F97316', text: '#fff' },
  cole:     { bg: '#06B6D4', text: '#fff' },
  tyler:    { bg: '#10B981', text: '#fff' },
  ksenia:    { bg: '#EC4899', text: '#fff' },
  adeen:     { bg: '#8B5CF6', text: '#fff' },
  li:        { bg: '#14B8A6', text: '#fff' },
  dakota:    { bg: '#F43F5E', text: '#fff' },
  emmanuel:  { bg: '#F59E0B', text: '#000' },
  bren:      { bg: '#818CF8', text: '#fff' },
  mervin:    { bg: '#2DD4BF', text: '#000' },
  ken:       { bg: '#FB923C', text: '#fff' },
  jc:        { bg: '#EF4444', text: '#fff' },
  james:     { bg: '#6366F1', text: '#fff' },
  trevor:    { bg: '#D946EF', text: '#fff' },
  jorge:     { bg: '#0EA5E9', text: '#fff' },
};

// Static user list used for staging bypass (when Supabase is not configured).
// Leadership roles: jonathan, oscar, mani. All others are pod managers (user).
export const LOCAL_USERS: Record<string, UserProfile> = {
  jonathan:  { email: 'jonathan@roofignite.com',  displayName: 'Jonathan',  userKey: 'jonathan',  role: 'super_admin' },
  oscar:     { email: 'oscar@roofignite.com',     displayName: 'Oscar',     userKey: 'oscar',     role: 'super_admin' },
  mani:      { email: 'mani@roofignite.com',      displayName: 'Mani',      userKey: 'mani',      role: 'super_admin' },
  cole:      { email: 'cole@roofignite.com',      displayName: 'Cole',      userKey: 'cole',      role: 'super_admin' },
  sam:       { email: 'sam@roofignite.com',       displayName: 'Sam',       userKey: 'sam',       role: 'user' },
  tyler:     { email: 'tyler@roofignite.com',     displayName: 'Tyler',     userKey: 'tyler',     role: 'user' },
  ksenia:    { email: 'ksenia@roofignite.com',    displayName: 'Ksenia',    userKey: 'ksenia',    role: 'user' },
  adeen:     { email: 'adeen@roofignite.com',     displayName: 'Adeen',     userKey: 'adeen',     role: 'user' },
  patrick:   { email: 'patrick@roofignite.com',   displayName: 'Patrick',   userKey: 'patrick',   role: 'user' },
  li:        { email: 'li@roofignite.com',         displayName: 'Li',        userKey: 'li',        role: 'user' },
  dakota:    { email: 'dakota@roofignite.com',     displayName: 'Dakota',    userKey: 'dakota',    role: 'user' },
  gregory:   { email: 'gregory@roofignite.com',   displayName: 'Gregory',   userKey: 'gregory',   role: 'user' },
  kyle:      { email: 'kyle@roofignite.com',      displayName: 'Kyle',      userKey: 'kyle',      role: 'user' },
  abdullah:  { email: 'abdullah@roofignite.com',  displayName: 'Abdullah',  userKey: 'abdullah',  role: 'user' },
  emmanuel:  { email: 'emmanuel@roofignite.com',  displayName: 'Emmanuel',  userKey: 'emmanuel',  role: 'media_buyer' },
  bren:      { email: 'bren@roofignite.com',      displayName: 'Bren',      userKey: 'bren',      role: 'media_buyer' },
  mervin:    { email: 'mervin@roofignite.com',    displayName: 'Mervin',    userKey: 'mervin',    role: 'media_buyer' },
  jc:        { email: 'jc@roofignite.com',        displayName: 'JC',        userKey: 'jc',        role: 'media_buyer' },
  james:     { email: 'james@roofignite.com',     displayName: 'James',     userKey: 'james',     role: 'media_buyer' },
  jorge:     { email: 'jorge@roofignite.com',     displayName: 'Jorge',     userKey: 'jorge',     role: 'media_buyer' },
  ken:       { email: 'ken@roofignite.com',       displayName: 'Ken',       userKey: 'ken',       role: 'creative_specialist' },
  trevor:    { email: 'trevor@roofignite.com',    displayName: 'Trevor',    userKey: 'trevor',    role: 'creative_specialist' },
};

export function getUserColor(userKey: string) {
  return USER_COLORS[userKey] ?? { bg: '#666', text: '#fff' };
}

/** Send a magic link / OTP email to the given address */
export async function signInWithMagicLink(email: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase not configured' };
  const { error } = await supabase.auth.signInWithOtp({
    email: email.toLowerCase().trim(),
    options: {
      emailRedirectTo: 'https://onboarding.roofignite.com',
      shouldCreateUser: true,
    },
  });
  return { error: error?.message ?? null };
}

/** Sign the current user out */
export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Look up a UserProfile by email — Supabase first, LOCAL_USERS as fallback */
export async function getUserProfileByEmail(email: string): Promise<UserProfile | null> {
  const normalised = email.toLowerCase().trim();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('allowed_users')
        .select('email, display_name, role, user_key, bio, goal, avatar_emoji, avatar_url')
        .eq('email', normalised)
        .maybeSingle();

      if (!error && data) {
        return {
          email: data.email,
          displayName: data.display_name,
          role: data.role as 'super_admin' | 'user' | 'media_buyer' | 'creative_specialist',
          userKey: data.user_key,
          bio: data.bio ?? undefined,
          goal: data.goal ?? undefined,
          avatarEmoji: data.avatar_emoji ?? undefined,
          avatarUrl: data.avatar_url ?? undefined,
        };
      }

      // Profile columns may not exist yet — retry with base fields only.
      const { data: base, error: baseErr } = await supabase
        .from('allowed_users')
        .select('email, display_name, role, user_key')
        .eq('email', normalised)
        .maybeSingle();

      if (!baseErr && base) {
        return {
          email: base.email,
          displayName: base.display_name,
          role: base.role as 'super_admin' | 'user' | 'media_buyer' | 'creative_specialist',
          userKey: base.user_key,
        };
      }
    } catch {
      // Supabase unavailable — fall through to local list
    }
  }

  // Fall back to LOCAL_USERS so logins work even when the DB is missing the row.
  const local = Object.values(LOCAL_USERS).find((u) => u.email === normalised);
  return local ?? null;
}
