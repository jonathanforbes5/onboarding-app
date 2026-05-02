'use client';
import React, { useState, useRef } from 'react';
import { LOCAL_USERS, UserProfile } from '@/lib/auth';

const BYPASS_KEY = 'ri_bypass_profile';

type Stage =
  | 'name'           // enter first name
  | 'set-password'   // first time — create a password
  | 'enter-password' // returning — enter password
  | 'force-reset'    // admin reset — must set new password
  | 'confirm'        // confirm identity before committing
  | 'forgot';        // forgot password instructions

interface UserStatus {
  exists: boolean;
  hasPassword: boolean;
  forceReset: boolean;
  displayName: string;
  role: string;
  userKey?: string;
  email?: string;
  serviceKeyAvailable?: boolean;
}

export function LoginScreen() {
  const [stage, setStage]           = useState<Stage>('name');
  const [name, setName]             = useState('');
  const [password, setPassword]     = useState('');
  const [confirmPw, setConfirmPw]   = useState('');
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const inp: React.CSSProperties = {
    width: '100%', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A',
    borderRadius: 10, padding: '11px 14px', color: '#F5F5F5', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s',
  };
  const focusY = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = '#F5C800');
  const blurG  = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = '#2A2A2A');

  const primaryBtn = (active: boolean): React.CSSProperties => ({
    width: '100%', backgroundColor: active ? '#F5C800' : '#1A1A1A', border: 'none',
    borderRadius: 10, padding: '12px', cursor: active ? 'pointer' : 'not-allowed',
    fontSize: 14, fontWeight: 700, color: active ? '#000' : '#444',
    fontFamily: 'inherit', letterSpacing: '0.02em', transition: 'all 0.15s',
  });

  const ghostBtn: React.CSSProperties = {
    background: 'none', border: '1px solid #2A2A2A', borderRadius: 10, padding: '10px',
    cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#666', fontFamily: 'inherit',
    width: '100%',
  };

  const linkBtn: React.CSSProperties = {
    background: 'none', border: 'none', color: '#555', fontSize: 12,
    cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit',
  };

  /* ── Step 1: Check name ── */
  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = name.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    if (!key) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/auth/user-status?name=${encodeURIComponent(key)}`);
      const data = await res.json() as UserStatus & { error?: string };
      if (!data.exists) {
        setError(`"${key}" not found — use your first name exactly as registered.`);
        setLoading(false);
        return;
      }
      setUserStatus(data);
      if (!data.serviceKeyAvailable) {
        // No service key in env — skip password stage, go straight to confirm
        const profile: import('@/lib/auth').UserProfile = LOCAL_USERS[key] ?? {
          email: data.email ?? `${key}@roofignite.com`,
          displayName: data.displayName,
          userKey: data.userKey ?? key,
          role: data.role as 'super_admin' | 'user',
        };
        setPendingProfile(profile);
        setStage('confirm');
      } else if (data.forceReset) {
        setStage('force-reset');
      } else if (data.hasPassword) {
        setStage('enter-password');
      } else {
        setStage('set-password');
      }
    } catch {
      // Fallback: check LOCAL_USERS when API is unavailable
      const user = LOCAL_USERS[key];
      if (!user) {
        setError(`"${key}" not found — use your first name exactly as registered.`);
      } else {
        setPendingProfile(user);
        setStage('confirm');
      }
    }
    setLoading(false);
  };

  /* ── Step 2a: First-time — set a password ── */
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPw) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim().toLowerCase().replace(/@roofignite\.com$/i, ''), password }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? 'Failed to set password.');
        setLoading(false);
        return;
      }
      // Auto-login after setting password
      await loginWithPassword();
    } catch {
      fallbackLogin();
    }
    setLoading(false);
  };

  /* ── Step 2b: Returning — verify password ── */
  const handleEnterPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithPassword();
    } catch {
      fallbackLogin();
    }
    setLoading(false);
  };

  const loginWithPassword = async () => {
    const key = name.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    const res = await fetch('/api/auth/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: key, password }),
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? 'Incorrect password.');
      return;
    }
    const { profile } = await res.json();
    setPendingProfile(profile);
    setStage('confirm');
  };

  const fallbackLogin = () => {
    const key = name.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    const user = LOCAL_USERS[key];
    if (user) { setPendingProfile(user); setStage('confirm'); }
    else setError('Login failed — please try again.');
  };

  const confirmLogin = () => {
    if (!pendingProfile) return;
    try {
      localStorage.setItem(BYPASS_KEY, JSON.stringify(pendingProfile));
      window.location.reload();
    } catch {
      setError('Login failed — please try again.');
    }
  };

  const reset = () => {
    setStage('name'); setError(''); setPassword(''); setConfirmPw('');
    setUserStatus(null); setPendingProfile(null);
  };

  /* ── Render ── */
  const roleLabel = (role: string) => role === 'super_admin' ? 'Leadership' : 'Pod Manager';
  const roleColor = (role: string) => role === 'super_admin' ? '#F5C800' : '#22C55E';

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1400 0%, #0A0A0A 70%)',
    }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img src="/logo.png" alt="Roof Ignite" style={{ width: 260, maxWidth: '80vw', display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: '#555', fontSize: 12, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pod Manager Onboarding &amp; Training Hub
        </p>
      </div>

      <div style={{
        backgroundColor: '#111111', border: '1px solid #222222', borderRadius: 20,
        padding: '2rem 2.25rem', width: '100%', maxWidth: 380,
        boxShadow: '0 0 40px rgba(245,200,0,0.04), 0 8px 32px rgba(0,0,0,0.4)',
      }}>

        {/* ── Enter name ── */}
        {stage === 'name' && (
          <>
            <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 6px', textAlign: 'center' }}>Sign in</h2>
            <p style={{ color: '#555', fontSize: 13, margin: '0 0 1.5rem', textAlign: 'center', lineHeight: 1.6 }}>
              Enter your first name to continue.
            </p>
            <form onSubmit={handleNameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                <input type="text" value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="firstname" required autoComplete="username" autoFocus
                  style={{ ...inp, borderRadius: '10px 0 0 10px', borderRight: 'none', flex: 1, minWidth: 0 }}
                  onFocus={focusY} onBlur={blurG} />
                <div style={{
                  backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: '0 10px 10px 0',
                  padding: '11px 12px', color: '#444', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center',
                }}>@roofignite.com</div>
              </div>
              {error && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading || !name.trim()} style={primaryBtn(!loading && !!name.trim())}>
                {loading ? 'Checking…' : 'Continue →'}
              </button>
            </form>
          </>
        )}

        {/* ── First time: set password ── */}
        {(stage === 'set-password' || stage === 'force-reset') && userStatus && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👋</div>
              <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 4px' }}>
                {stage === 'force-reset' ? 'Set a new password' : `Welcome, ${userStatus.displayName}!`}
              </h2>
              <p style={{ color: '#555', fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>
                {stage === 'force-reset'
                  ? 'Your password was reset by an admin. Create a new one to continue.'
                  : 'Create a password to secure your account. You\'ll use this every time you sign in.'}
              </p>
            </div>
            <form onSubmit={handleSetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Create a password (min 8 chars)" required autoFocus
                style={inp} onFocus={focusY} onBlur={blurG} />
              <input type="password" value={confirmPw}
                onChange={(e) => { setConfirmPw(e.target.value); setError(''); }}
                placeholder="Confirm password" required
                style={inp} onFocus={focusY} onBlur={blurG} />
              {error && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading || !password || !confirmPw} style={primaryBtn(!loading && !!password && !!confirmPw)}>
                {loading ? 'Setting password…' : 'Set password & sign in →'}
              </button>
              <button type="button" onClick={reset} style={ghostBtn}>← Back</button>
            </form>
          </>
        )}

        {/* ── Returning: enter password ── */}
        {stage === 'enter-password' && userStatus && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔑</div>
              <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 4px' }}>
                Welcome back, {userStatus.displayName}
              </h2>
              <p style={{ color: '#555', fontSize: 12.5, margin: 0 }}>Enter your password to continue.</p>
            </div>
            <form onSubmit={handleEnterPassword} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Your password" required autoFocus
                style={inp} onFocus={focusY} onBlur={blurG} />
              {error && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading || !password} style={primaryBtn(!loading && !!password)}>
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <button type="button" onClick={reset} style={linkBtn}>← Back</button>
                <button type="button" onClick={() => setStage('forgot')} style={linkBtn}>Forgot password?</button>
              </div>
            </form>
          </>
        )}

        {/* ── Confirm identity ── */}
        {stage === 'confirm' && pendingProfile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', backgroundColor: '#1A1A00',
                border: '2px solid #F5C80066', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 12px', fontSize: 22, fontWeight: 900, color: '#F5C800',
              }}>{pendingProfile.displayName.charAt(0)}</div>
              <p style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>{pendingProfile.displayName}</p>
              <p style={{ color: '#555', fontSize: 12, margin: '0 0 6px' }}>{pendingProfile.email}</p>
              <span style={{
                display: 'inline-block', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                backgroundColor: pendingProfile.role === 'super_admin' ? '#1A1400' : '#0D1F14',
                border: `1px solid ${roleColor(pendingProfile.role)}44`,
                color: roleColor(pendingProfile.role),
              }}>{roleLabel(pendingProfile.role)}</span>
            </div>
            <button onClick={confirmLogin} style={primaryBtn(true)}>Sign in →</button>
            <button onClick={reset} style={ghostBtn}>Not me — go back</button>
          </div>
        )}

        {/* ── Forgot password ── */}
        {stage === 'forgot' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 8px' }}>Forgot your password?</h2>
            <p style={{ color: '#888', fontSize: 13, lineHeight: 1.7, margin: '0 0 20px' }}>
              Message <strong style={{ color: '#F5C800' }}>Jonathan</strong> on Slack and ask him to reset your password.
              Once he does, come back here and sign in with your name — you&apos;ll be prompted to create a new one.
            </p>
            <button onClick={() => { setStage('enter-password'); setError(''); }} style={primaryBtn(true)}>
              ← Back to sign in
            </button>
          </div>
        )}
      </div>

      <p style={{ color: '#2A2A2A', fontSize: 11, marginTop: '1rem', letterSpacing: '0.05em' }}>
        roofignite.com · internal use only
      </p>
    </div>
  );
}
