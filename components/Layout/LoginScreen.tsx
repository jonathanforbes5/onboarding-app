'use client';
import React, { useState, useRef } from 'react';
import { signInWithMagicLink, LOCAL_USERS, UserProfile } from '@/lib/auth';
import { isSupabaseEnabled } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const MASTER_PASSWORD = process.env.NEXT_PUBLIC_MASTER_PASSWORD;
const BYPASS_KEY = 'ri_bypass_profile';

export function LoginScreen() {
  const [email, setEmail]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [error, setError]         = useState('');

  // Staging bypass (no Supabase)
  const [bypassName, setBypassName] = useState('');
  const [bypassPass, setBypassPass] = useState('');
  const [bypassError, setBypassError] = useState('');
  const [pendingBypass, setPendingBypass] = useState<UserProfile | null>(null);

  // Legacy bottom quick-access (configured + MASTER_PASSWORD set)
  const [devPass, setDevPass]     = useState('');
  const [devError, setDevError]   = useState(false);

  // OTP code entry
  const [code, setCode]           = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const configured = isSupabaseEnabled();

  // Normalize email: if user typed just "jonathan", expand to "jonathan@roofignite.com"
  function normalizeEmail(raw: string) {
    const v = raw.trim().toLowerCase();
    return v.includes('@') ? v : `${v}@roofignite.com`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = normalizeEmail(email);
    if (!val) return;

    setEmail(val); // keep state in sync with normalized value

    setLoading(true);
    setError('');
    const result = await signInWithMagicLink(val);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    }
  };

  // Bypass login for staging (no Supabase)
  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBypassError('');
    const nameKey = bypassName.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    if (!nameKey) return;

    // If MASTER_PASSWORD is set, require it. If not set, open bypass (pure dev environment).
    if (MASTER_PASSWORD && bypassPass !== MASTER_PASSWORD) {
      setBypassError('Incorrect password — try again.');
      return;
    }

    const user = LOCAL_USERS[nameKey];
    if (!user) {
      setBypassError(`"${nameKey}" not found — check your first name.`);
      return;
    }

    // Show confirmation before committing session
    setPendingBypass(user);
  };

  const confirmBypassLogin = () => {
    if (!pendingBypass) return;
    try {
      sessionStorage.setItem(BYPASS_KEY, JSON.stringify(pendingBypass));
      window.location.reload();
    } catch {
      setBypassError('Login failed. Please try again.');
      setPendingBypass(null);
    }
  };

  const handleCodeChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    setCodeError('');

    if (digit && idx < 5) {
      codeRefs.current[idx + 1]?.focus();
    }
    if (next.every((d) => d) && next.join('').length === 6) {
      verifyCode(next.join(''));
    }
  };

  const handleCodeKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      codeRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) codeRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 5) codeRefs.current[idx + 1]?.focus();
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const next = pasted.split('');
      setCode(next);
      codeRefs.current[5]?.focus();
      verifyCode(pasted);
    }
  };

  const verifyCode = async (otp: string) => {
    if (!supabase) return;
    setVerifying(true);
    setCodeError('');
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otp,
      type: 'email',
    });
    setVerifying(false);
    if (error) {
      setCodeError('Invalid or expired code. Try again or click the link in your email.');
      setCode(['', '', '', '', '', '']);
      codeRefs.current[0]?.focus();
    }
    // On success, Supabase fires onAuthStateChange which AppContext handles
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#0A0A0A',
    border: '1px solid #2A2A2A',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#F5F5F5',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1400 0%, #0A0A0A 70%)',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img src="/logo.png" alt="Roof Ignite" style={{ width: 260, maxWidth: '80vw', display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: '#555', fontSize: 12, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pod Manager Onboarding & Training Hub
        </p>
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
        borderRadius: 20,
        padding: '2rem 2.25rem',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 0 40px rgba(245, 200, 0, 0.04), 0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {sent ? (
          /* ── OTP code entry ── */
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, backgroundColor: '#0D1F14', border: '1px solid #22C55E33',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: 22,
              }}>✉️</div>
              <h2 style={{ color: '#F5F5F5', fontSize: 17, fontWeight: 800, margin: '0 0 6px' }}>
                Check your email
              </h2>
              <p style={{ color: '#666', fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>
                We sent a 6-digit code to{' '}
                <strong style={{ color: '#ccc' }}>{email}</strong>.
                Enter it below or click the link in the email.
              </p>
            </div>

            {/* 6-digit code boxes */}
            <div
              style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}
              onPaste={handleCodePaste}
            >
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { codeRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                  style={{
                    width: 44, height: 52,
                    backgroundColor: '#0A0A0A',
                    border: `2px solid ${digit ? '#F5C800' : '#2A2A2A'}`,
                    borderRadius: 10,
                    color: '#F5F5F5',
                    fontSize: 22,
                    fontWeight: 800,
                    textAlign: 'center',
                    outline: 'none',
                    fontFamily: 'monospace',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = code[idx] ? '#F5C800' : '#2A2A2A')}
                />
              ))}
            </div>

            {verifying && (
              <p style={{ color: '#F5C800', fontSize: 12, textAlign: 'center', margin: '0 0 8px' }}>Verifying…</p>
            )}
            {codeError && (
              <p style={{ color: '#EF4444', fontSize: 12, textAlign: 'center', margin: '0 0 8px', lineHeight: 1.5 }}>{codeError}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
              <button
                onClick={() => { setSent(false); setCode(['', '', '', '', '', '']); setCodeError(''); }}
                style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
              >
                Wrong email?
              </button>
              <button
                onClick={async () => { await signInWithMagicLink(email); }}
                style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
              >
                Resend code
              </button>
            </div>
          </div>
        ) : (
          /* ── Email form ── */
          <>
            <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 6px', textAlign: 'center' }}>
              Sign in to continue
            </h2>
            <p style={{ color: '#555', fontSize: 13, margin: '0 0 1.5rem', lineHeight: 1.6, textAlign: 'center' }}>
              Enter your <strong style={{ color: '#888' }}>@roofignite.com</strong> email — we&apos;ll send a 6-digit code.
            </p>

            {configured ? (
              /* ── Supabase OTP flow ── */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firstname or you@roofignite.com"
                  required
                  disabled={loading}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = '#2A2A2A')}
                />
                {error && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  style={{
                    width: '100%',
                    backgroundColor: loading || !email.trim() ? '#1A1A1A' : '#F5C800',
                    border: 'none', borderRadius: 10, padding: '12px',
                    cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                    fontSize: 14, fontWeight: 700,
                    color: loading || !email.trim() ? '#444' : '#000',
                    transition: 'all 0.15s ease', fontFamily: 'inherit', letterSpacing: '0.02em',
                  }}
                >
                  {loading ? 'Sending…' : 'Send code →'}
                </button>
              </form>
            ) : pendingBypass ? (
              /* ── Confirmation step ── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    backgroundColor: '#1A1A00', border: '2px solid #F5C80066',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontSize: 22, fontWeight: 900, color: '#F5C800',
                  }}>
                    {pendingBypass.displayName.charAt(0)}
                  </div>
                  <p style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>
                    {pendingBypass.displayName}
                  </p>
                  <p style={{ color: '#555', fontSize: 12, margin: '0 0 4px' }}>
                    {pendingBypass.email}
                  </p>
                  <span style={{
                    display: 'inline-block', backgroundColor: pendingBypass.role === 'super_admin' ? '#1A1400' : '#0D1F14',
                    border: `1px solid ${pendingBypass.role === 'super_admin' ? '#F5C80044' : '#22C55E33'}`,
                    color: pendingBypass.role === 'super_admin' ? '#F5C800' : '#22C55E',
                    borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {pendingBypass.role === 'super_admin' ? 'Leadership' : 'Pod Manager'}
                  </span>
                </div>
                <p style={{ color: '#888', fontSize: 13, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                  Is this you?
                </p>
                <button
                  onClick={confirmBypassLogin}
                  style={{
                    width: '100%', backgroundColor: '#F5C800',
                    border: 'none', borderRadius: 10, padding: '12px',
                    cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#000',
                    transition: 'all 0.15s ease', fontFamily: 'inherit',
                  }}
                >
                  Yes, that&apos;s me →
                </button>
                <button
                  onClick={() => setPendingBypass(null)}
                  style={{
                    width: '100%', backgroundColor: 'transparent',
                    border: '1px solid #2A2A2A', borderRadius: 10, padding: '10px',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#666',
                    fontFamily: 'inherit',
                  }}
                >
                  Not me — go back
                </button>
              </div>
            ) : (
              /* ── Staging bypass (no Supabase) ── */
              <form onSubmit={handleBypassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ color: '#555', fontSize: 12, margin: '0 0 4px', lineHeight: 1.5 }}>
                  Enter your <strong style={{ color: '#888' }}>first name</strong>{MASTER_PASSWORD ? ' and the preview password' : ''} to access this site.
                </p>

                {/* Split input: [firstname] @roofignite.com */}
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <input
                    type="text"
                    value={bypassName}
                    onChange={(e) => { setBypassName(e.target.value); setBypassError(''); }}
                    placeholder="firstname"
                    required
                    autoComplete="username"
                    style={{
                      ...inputStyle,
                      borderRadius: '10px 0 0 10px',
                      borderRight: 'none',
                      flex: 1,
                      minWidth: 0,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  />
                  <div style={{
                    backgroundColor: '#161616',
                    border: '1px solid #2A2A2A',
                    borderRadius: '0 10px 10px 0',
                    padding: '11px 12px',
                    color: '#444',
                    fontSize: 13,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    @roofignite.com
                  </div>
                </div>

                {MASTER_PASSWORD && (
                  <input
                    type="password"
                    value={bypassPass}
                    onChange={(e) => { setBypassPass(e.target.value); setBypassError(''); }}
                    placeholder="Preview password"
                    required
                    autoComplete="current-password"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  />
                )}

                {bypassError && (
                  <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{bypassError}</p>
                )}

                <button
                  type="submit"
                  disabled={!bypassName.trim() || (!!MASTER_PASSWORD && !bypassPass.trim())}
                  style={{
                    width: '100%',
                    backgroundColor: !bypassName.trim() ? '#1A1A1A' : '#F5C800',
                    border: 'none', borderRadius: 10, padding: '12px',
                    cursor: !bypassName.trim() ? 'not-allowed' : 'pointer',
                    fontSize: 14, fontWeight: 700,
                    color: !bypassName.trim() ? '#444' : '#000',
                    transition: 'all 0.15s ease', fontFamily: 'inherit', letterSpacing: '0.02em',
                  }}
                >
                  Sign in →
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {/* Quick access — only shown on configured (production) sites with master password */}
      {configured && MASTER_PASSWORD && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (devPass !== MASTER_PASSWORD) {
              setDevError(true);
              setTimeout(() => setDevError(false), 1500);
              return;
            }
            // Log in as Jonathan (admin quick-access)
            try {
              sessionStorage.setItem(BYPASS_KEY, JSON.stringify(LOCAL_USERS.jonathan));
              window.location.reload();
            } catch {}
          }}
          style={{ marginTop: '1.5rem', display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <input
            type="password"
            value={devPass}
            onChange={(e) => setDevPass(e.target.value)}
            placeholder="Quick access password"
            style={{
              backgroundColor: '#111', border: `1px solid ${devError ? '#EF4444' : '#1E1E1E'}`,
              borderRadius: 8, padding: '8px 12px', color: '#555', fontSize: 12,
              outline: 'none', fontFamily: 'inherit', width: 180, transition: 'border-color 0.15s',
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#111', border: '1px solid #1E1E1E', borderRadius: 8,
            padding: '8px 14px', color: '#444', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Quick access →
          </button>
        </form>
      )}

      <p style={{ color: '#2A2A2A', fontSize: 11, marginTop: '1rem', letterSpacing: '0.05em' }}>
        roofignite.com · internal use only
      </p>
    </div>
  );
}
