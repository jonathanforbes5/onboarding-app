'use client';
import React, { useState, useRef } from 'react';
import { signInWithMagicLink, LOCAL_USERS, UserProfile } from '@/lib/auth';
import { isSupabaseEnabled } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const MASTER_PASSWORD = process.env.NEXT_PUBLIC_MASTER_PASSWORD;
const BYPASS_KEY = 'ri_bypass_profile';

export function LoginScreen() {
  const configured = isSupabaseEnabled();

  // Name + optional password bypass (primary flow)
  const [bypassName, setBypassName] = useState('');
  const [bypassPass, setBypassPass] = useState('');
  const [bypassError, setBypassError] = useState('');
  const [pendingBypass, setPendingBypass] = useState<UserProfile | null>(null);

  // Email magic link (secondary flow)
  const [showEmail, setShowEmail]   = useState(false);
  const [email, setEmail]           = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent]   = useState(false);
  const [emailError, setEmailError] = useState('');

  // OTP code entry (after email sent)
  const [code, setCode]             = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying]   = useState(false);
  const [codeError, setCodeError]   = useState('');
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Bypass login ── */
  const handleBypassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBypassError('');
    const nameKey = bypassName.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    if (!nameKey) return;

    if (MASTER_PASSWORD && bypassPass !== MASTER_PASSWORD) {
      setBypassError('Incorrect password — try again.');
      return;
    }

    const user = LOCAL_USERS[nameKey];
    if (!user) {
      setBypassError(`"${nameKey}" not found — check your first name.`);
      return;
    }
    setPendingBypass(user);
  };

  const confirmLogin = () => {
    if (!pendingBypass) return;
    try {
      sessionStorage.setItem(BYPASS_KEY, JSON.stringify(pendingBypass));
      window.location.reload();
    } catch {
      setBypassError('Login failed — please try again.');
      setPendingBypass(null);
    }
  };

  /* ── Email magic link ── */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim().toLowerCase().includes('@')
      ? email.trim().toLowerCase()
      : `${email.trim().toLowerCase()}@roofignite.com`;
    setEmail(val);
    setEmailLoading(true);
    setEmailError('');
    const result = await signInWithMagicLink(val);
    setEmailLoading(false);
    if (result.error) {
      setEmailError(result.error);
    } else {
      setEmailSent(true);
      setTimeout(() => codeRefs.current[0]?.focus(), 100);
    }
  };

  const handleCodeChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[idx] = digit;
    setCode(next);
    setCodeError('');
    if (digit && idx < 5) codeRefs.current[idx + 1]?.focus();
    if (next.every((d) => d)) verifyCode(next.join(''));
  };

  const handleCodeKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) codeRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowLeft'  && idx > 0) codeRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < 5) codeRefs.current[idx + 1]?.focus();
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(''));
      codeRefs.current[5]?.focus();
      verifyCode(pasted);
    }
  };

  const verifyCode = async (otp: string) => {
    if (!supabase) return;
    setVerifying(true);
    setCodeError('');
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
    setVerifying(false);
    if (error) {
      setCodeError('Invalid or expired code — try again.');
      setCode(['', '', '', '', '', '']);
      codeRefs.current[0]?.focus();
    }
  };

  /* ── Shared styles ── */
  const inp: React.CSSProperties = {
    width: '100%', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A',
    borderRadius: 10, padding: '11px 14px', color: '#F5F5F5', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s',
  };
  const focusYellow = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = '#F5C800');
  const blurGray    = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = '#2A2A2A');

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1400 0%, #0A0A0A 70%)',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img src="/logo.png" alt="Roof Ignite" style={{ width: 260, maxWidth: '80vw', display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: '#555', fontSize: 12, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pod Manager Onboarding &amp; Training Hub
        </p>
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: '#111111', border: '1px solid #222222', borderRadius: 20,
        padding: '2rem 2.25rem', width: '100%', maxWidth: 380,
        boxShadow: '0 0 40px rgba(245,200,0,0.04), 0 8px 32px rgba(0,0,0,0.4)',
      }}>

        {/* ── Confirm identity ── */}
        {pendingBypass ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', backgroundColor: '#1A1A00',
                border: '2px solid #F5C80066', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 12px', fontSize: 22, fontWeight: 900, color: '#F5C800',
              }}>{pendingBypass.displayName.charAt(0)}</div>
              <p style={{ color: '#F5F5F5', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>{pendingBypass.displayName}</p>
              <p style={{ color: '#555', fontSize: 12, margin: '0 0 6px' }}>{pendingBypass.email}</p>
              <span style={{
                display: 'inline-block',
                backgroundColor: pendingBypass.role === 'super_admin' ? '#1A1400' : '#0D1F14',
                border: `1px solid ${pendingBypass.role === 'super_admin' ? '#F5C80044' : '#22C55E33'}`,
                color: pendingBypass.role === 'super_admin' ? '#F5C800' : '#22C55E',
                borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{pendingBypass.role === 'super_admin' ? 'Leadership' : 'Pod Manager'}</span>
            </div>
            <p style={{ color: '#888', fontSize: 13, textAlign: 'center', margin: 0 }}>Is this you?</p>
            <button onClick={confirmLogin} style={{
              width: '100%', backgroundColor: '#F5C800', border: 'none', borderRadius: 10,
              padding: '12px', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#000',
              fontFamily: 'inherit',
            }}>Yes, that&apos;s me →</button>
            <button onClick={() => setPendingBypass(null)} style={{
              width: '100%', backgroundColor: 'transparent', border: '1px solid #2A2A2A',
              borderRadius: 10, padding: '10px', cursor: 'pointer', fontSize: 13,
              fontWeight: 600, color: '#666', fontFamily: 'inherit',
            }}>Not me — go back</button>
          </div>

        /* ── Email sent: waiting for link / code ── */
        ) : emailSent ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, backgroundColor: '#0D1F14', border: '1px solid #22C55E33',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: 22,
              }}>✉️</div>
              <h2 style={{ color: '#F5F5F5', fontSize: 17, fontWeight: 800, margin: '0 0 6px' }}>Check your email</h2>
              <p style={{ color: '#666', fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>
                Sent a sign-in link to <strong style={{ color: '#ccc' }}>{email}</strong>.
                Click the link in the email — or enter the code below if one was included.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }} onPaste={handleCodePaste}>
              {code.map((digit, idx) => (
                <input key={idx} ref={(el) => { codeRefs.current[idx] = el; }}
                  type="text" inputMode="numeric" maxLength={1} value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                  style={{
                    width: 44, height: 52, backgroundColor: '#0A0A0A',
                    border: `2px solid ${digit ? '#F5C800' : '#2A2A2A'}`, borderRadius: 10,
                    color: '#F5F5F5', fontSize: 22, fontWeight: 800, textAlign: 'center',
                    outline: 'none', fontFamily: 'monospace', transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = code[idx] ? '#F5C800' : '#2A2A2A')}
                />
              ))}
            </div>
            {verifying && <p style={{ color: '#F5C800', fontSize: 12, textAlign: 'center', margin: '0 0 8px' }}>Verifying…</p>}
            {codeError  && <p style={{ color: '#EF4444', fontSize: 12, textAlign: 'center', margin: '0 0 8px' }}>{codeError}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
              <button onClick={() => { setEmailSent(false); setCode(['','','','','','']); setCodeError(''); }}
                style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>
                Wrong email?
              </button>
              <button onClick={async () => { await signInWithMagicLink(email); }}
                style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>
                Resend link
              </button>
            </div>
          </div>

        /* ── Email form ── */
        ) : showEmail ? (
          <div>
            <button onClick={() => { setShowEmail(false); setEmailError(''); }} style={{
              background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer',
              fontFamily: 'inherit', marginBottom: 16, padding: 0, display: 'flex', alignItems: 'center', gap: 4,
            }}>← Back</button>
            <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 6px' }}>Sign in with email</h2>
            <p style={{ color: '#555', fontSize: 12.5, margin: '0 0 16px', lineHeight: 1.6 }}>
              Enter your @roofignite.com email — we&apos;ll send a sign-in link.
              Note: limited to 2 emails per hour.
            </p>
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="firstname or you@roofignite.com"
                required disabled={emailLoading} style={inp}
                onFocus={focusYellow} onBlur={blurGray} />
              {emailError && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{emailError}</p>}
              <button type="submit" disabled={emailLoading || !email.trim()} style={{
                width: '100%', backgroundColor: emailLoading || !email.trim() ? '#1A1A1A' : '#F5C800',
                border: 'none', borderRadius: 10, padding: '12px', cursor: emailLoading || !email.trim() ? 'not-allowed' : 'pointer',
                fontSize: 14, fontWeight: 700, color: emailLoading || !email.trim() ? '#444' : '#000',
                fontFamily: 'inherit',
              }}>{emailLoading ? 'Sending…' : 'Send sign-in link →'}</button>
            </form>
          </div>

        /* ── Primary login: name (+ optional password) ── */
        ) : (
          <>
            <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 6px', textAlign: 'center' }}>
              Sign in to continue
            </h2>
            <p style={{ color: '#555', fontSize: 13, margin: '0 0 1.5rem', lineHeight: 1.6, textAlign: 'center' }}>
              Enter your first name to access the platform.
            </p>
            <form onSubmit={handleBypassSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <input type="text" value={bypassName}
                  onChange={(e) => { setBypassName(e.target.value); setBypassError(''); }}
                  placeholder="Your first name"
                  required autoComplete="username"
                  style={{ ...inp, borderRadius: '10px 0 0 10px', borderRight: 'none', flex: 1, minWidth: 0 }}
                  onFocus={focusYellow} onBlur={blurGray}
                />
                <div style={{
                  backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: '0 10px 10px 0',
                  padding: '11px 12px', color: '#444', fontSize: 13, whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center',
                }}>@roofignite.com</div>
              </div>

              {MASTER_PASSWORD && (
                <input type="password" value={bypassPass}
                  onChange={(e) => { setBypassPass(e.target.value); setBypassError(''); }}
                  placeholder="Team password"
                  required autoComplete="current-password"
                  style={inp} onFocus={focusYellow} onBlur={blurGray}
                />
              )}

              {bypassError && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{bypassError}</p>}

              <button type="submit"
                disabled={!bypassName.trim() || (!!MASTER_PASSWORD && !bypassPass.trim())}
                style={{
                  width: '100%',
                  backgroundColor: !bypassName.trim() || (!!MASTER_PASSWORD && !bypassPass.trim()) ? '#1A1A1A' : '#F5C800',
                  border: 'none', borderRadius: 10, padding: '12px',
                  cursor: !bypassName.trim() || (!!MASTER_PASSWORD && !bypassPass.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 700,
                  color: !bypassName.trim() || (!!MASTER_PASSWORD && !bypassPass.trim()) ? '#444' : '#000',
                  fontFamily: 'inherit', letterSpacing: '0.02em',
                }}>Sign in →</button>
            </form>

            {/* Email fallback — only shown when Supabase is configured */}
            {configured && (
              <button onClick={() => setShowEmail(true)} style={{
                background: 'none', border: 'none', color: '#444', fontSize: 12,
                cursor: 'pointer', fontFamily: 'inherit', marginTop: 16,
                textDecoration: 'underline', display: 'block', width: '100%', textAlign: 'center',
              }}>Sign in with email link instead</button>
            )}
          </>
        )}
      </div>

      <p style={{ color: '#2A2A2A', fontSize: 11, marginTop: '1rem', letterSpacing: '0.05em' }}>
        roofignite.com · internal use only
      </p>
    </div>
  );
}
