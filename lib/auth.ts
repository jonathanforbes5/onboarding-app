import { supabase } from './supabase';

export interface UserProfile {
  email: string;
  displayName: string;
  userKey: string;
  role: 'super_admin' | 'user';
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
};

export function getUserColor(userKey: string) {
  return USER_COLORS[userKey] ?? { bg: '#666', text: '#fff' };
}

/** Trigger Google OAuth login — redirects browser to Google */
export async function signInWithGoogle(): Promise<void> {
  if (!supabase) {
    console.error('Supabase not configured');
    return;
  }
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined' ? window.location.origin : '',
      queryParams: {
        // Restrict to roofignite.com Google Workspace accounts
        hd: 'roofignite.com',
      },
    },
  });
}

/** Sign the current user out */
export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Look up a UserProfile by email from the allowed_users table */
export async function getUserProfileByEmail(email: string): Promise<UserProfile | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('allowed_users')
      .select('email, display_name, role, user_key')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error || !data) return null;

    return {
      email: data.email,
      displayName: data.display_name,
      role: data.role as 'super_admin' | 'user',
      userKey: data.user_key,
    };
  } catch {
    return null;
  }
}
