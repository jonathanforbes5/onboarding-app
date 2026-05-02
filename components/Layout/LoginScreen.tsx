'use client';
import React, { useState, useRef, useEffect } from 'react';
import { signInWithMagicLink } from '@/lib/auth';
import { isSupabaseEnabled } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';

const MASTER_PASSWORD = process.env.NEXT_PUBLIC_MASTER_PASSWORD;
const BYPASS_KEY = 'ri_bypass_profile';

export function LoginScreen() {
  const { devLogin } = useApp();
  const [email, setEmail]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [error, setError]         = useState('');
  const [devPass, setDevPass]     = useState('');
  const [devError, setDevError]   = useState(false);

  // OTP code entry
  const [code, setCode]           = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const configured = isSupabaseEnabled();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = email.trim();
    if (!val) return;

    // Master password bypass
    if (MASTER_PASSWORD && val === MASTER_PASSWORD) {
      try {
        sessionStorage.setItem(BYPASS_KEY, JSON.stringify({
          email: 'jonathan@roofignite.com',
          displayName: 'Jonathan Forbes',
          userKey: 'jonathan',
          role: 'super_admin',
        }));
        window.location.reload();
      } catch {
        setError('Bypass failed.');
      }
      return;
    }

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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@roofignite.com"
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
            ) : (
              <div style={{
                backgroundColor: '#1A1200', border: '1px solid #F59E0B33',
                borderRadius: 10, padding: '14px 16px', color: '#F59E0B', fontSize: 12, lineHeight: 1.5,
              }}>
                ⚠️ Supabase is not configured. Add your <code style={{ backgroundColor: '#110E00', padding: '1px 4px', borderRadius: 3 }}>.env.local</code> to enable login.
              </div>
            )}
          </>
        )}
      </div>

      {/* Master password dev access */}
      {MASTER_PASSWORD && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (devPass === MASTER_PASSWORD) devLogin();
            else { setDevError(true); setTimeout(() => setDevError(false), 1500); }
          }}
          style={{ marginTop: '1.5rem', display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <input
            type="password"
            value={devPass}
            onChange={(e) => setDevPass(e.target.value)}
            placeholder="Master password"
            style={{
              backgroundColor: '#111', border: `1px solid ${devError ? '#EF4444' : '#1E1E1E'}`,
              borderRadius: 8, padding: '8px 12px', color: '#555', fontSize: 12,
              outline: 'none', fontFamily: 'inherit', width: 160, transition: 'border-color 0.15s',
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
