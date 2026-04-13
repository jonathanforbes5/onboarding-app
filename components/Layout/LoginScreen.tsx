'use client';
import React, { useState } from 'react';
import { signInWithMagicLink } from '@/lib/auth';
import { isSupabaseEnabled } from '@/lib/supabase';

export function LoginScreen() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');
  const configured = isSupabaseEnabled();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    const result = await signInWithMagicLink(email.trim());
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        {/* Logo mark */}
        <div style={{ margin: '0 auto 1.25rem', display: 'inline-block' }}>
          {/* ROOF */}
          <div style={{ color: '#F5F5F5', fontWeight: 900, fontSize: 22, letterSpacing: '0.25em', lineHeight: 1 }}>
            ROOF
          </div>
          {/* Flame + IGNITE row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <div style={{ flex: 1, height: 1.5, backgroundColor: '#F5C800', borderRadius: 2 }} />
            <svg width="14" height="18" viewBox="0 0 24 28" fill="none">
              <path d="M12 2C12 2 7 8 7 14C7 16.5 8.5 18.5 8.5 18.5C8.5 15.5 10 13 12 11C14 13 15.5 15.5 15.5 18.5C15.5 18.5 17 16.5 17 14C17 8 12 2 12 2Z" fill="#F5C800"/>
              <path d="M9 18C9 21.3 10.3 24 12 24C13.7 24 15 21.3 15 18C15 16 14 14.5 13 14C13 16 12.5 17.5 12 18C11.5 17.5 11 16 11 14C10 14.5 9 16 9 18Z" fill="#F97316"/>
            </svg>
            <div style={{ color: '#F5C800', fontWeight: 900, fontSize: 16, letterSpacing: '0.3em', lineHeight: 1 }}>
              IGNITE
            </div>
            <div style={{ flex: 1, height: 1.5, backgroundColor: '#F5C800', borderRadius: 2 }} />
          </div>
        </div>
        <p style={{ color: '#666', fontSize: 14, margin: 0 }}>
          Pod Manager Onboarding & Training Hub
        </p>
      </div>

      {/* Login card */}
      <div
        style={{
          backgroundColor: '#141414',
          border: '1.5px solid #2A2A2A',
          borderRadius: 18,
          padding: '2rem 2.5rem',
          width: '100%',
          maxWidth: 380,
          textAlign: 'center',
        }}
      >
        {sent ? (
          /* ── Success state ── */
          <>
            <div
              style={{
                width: 48,
                height: 48,
                backgroundColor: '#0D2A1A',
                border: '1.5px solid #22C55E44',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: 22,
              }}
            >
              ✉️
            </div>
            <h2 style={{ color: '#F5F5F5', fontSize: 17, fontWeight: 800, margin: '0 0 0.5rem' }}>
              Check your email
            </h2>
            <p style={{ color: '#888', fontSize: 13, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
              We sent a login link to{' '}
              <strong style={{ color: '#ccc' }}>{email}</strong>.
              Click it and you&apos;ll be signed in instantly.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#666',
                fontSize: 12,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              Use a different email
            </button>
          </>
        ) : (
          /* ── Email form ── */
          <>
            <h2
              style={{
                color: '#F5F5F5',
                fontSize: 17,
                fontWeight: 800,
                margin: '0 0 0.5rem',
              }}
            >
              Sign in to continue
            </h2>
            <p style={{ color: '#666', fontSize: 13, margin: '0 0 1.75rem', lineHeight: 1.5 }}>
              Enter your{' '}
              <strong style={{ color: '#aaa' }}>@roofignite.com</strong> email
              and we&apos;ll send you a login link — no password needed.
            </p>

            {configured ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@roofignite.com"
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: '#1C1C1C',
                    border: '1.5px solid #2A2A2A',
                    borderRadius: 10,
                    padding: '11px 14px',
                    color: '#F5F5F5',
                    fontSize: 14,
                    outline: 'none',
                    marginBottom: 10,
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                />

                {error && (
                  <p style={{ color: '#EF4444', fontSize: 12, marginBottom: 10, textAlign: 'left' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  style={{
                    width: '100%',
                    backgroundColor: loading || !email.trim() ? '#1C1C1C' : '#F5C800',
                    border: '1.5px solid transparent',
                    borderRadius: 10,
                    padding: '12px 20px',
                    cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    fontWeight: 700,
                    color: loading || !email.trim() ? '#555' : '#000',
                    transition: 'all 0.15s ease',
                    fontFamily: 'inherit',
                  }}
                >
                  {loading ? 'Sending…' : 'Send login link →'}
                </button>
              </form>
            ) : (
              <div
                style={{
                  backgroundColor: '#2A1A00',
                  border: '1px solid #F59E0B44',
                  borderRadius: 10,
                  padding: '14px 16px',
                  color: '#F59E0B',
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                ⚠️ Supabase is not configured. Add your{' '}
                <code style={{ backgroundColor: '#1A1000', padding: '1px 4px', borderRadius: 3 }}>
                  .env.local
                </code>{' '}
                file to enable login.
              </div>
            )}
          </>
        )}
      </div>

      <p style={{ color: '#333', fontSize: 11, marginTop: '1.75rem', textAlign: 'center' }}>
        roofignite.com · Internal use only
      </p>
    </div>
  );
}
