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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      // Subtle radial glow behind the card
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a1400 0%, #0A0A0A 70%)',
    }}>

      {/* Logo */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <img
          src="/logo.png"
          alt="Roof Ignite"
          style={{
            width: 260,
            maxWidth: '80vw',
            display: 'block',
            margin: '0 auto 12px',
          }}
        />
        <p style={{
          color: '#555',
          fontSize: 12,
          margin: 0,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
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
        maxWidth: 360,
        boxShadow: '0 0 40px rgba(245, 200, 0, 0.04), 0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {sent ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 52,
              height: 52,
              backgroundColor: '#0D1F14',
              border: '1px solid #22C55E33',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: 24,
            }}>
              ✉️
            </div>
            <h2 style={{ color: '#F5F5F5', fontSize: 17, fontWeight: 800, margin: '0 0 8px' }}>
              Check your email
            </h2>
            <p style={{ color: '#666', fontSize: 13, margin: '0 0 1.5rem', lineHeight: 1.65 }}>
              We sent a login link to{' '}
              <strong style={{ color: '#ccc' }}>{email}</strong>.
              Click it to sign in instantly.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#444',
                fontSize: 12,
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'inherit',
              }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <h2 style={{
              color: '#F5F5F5',
              fontSize: 16,
              fontWeight: 800,
              margin: '0 0 6px',
              textAlign: 'center',
            }}>
              Sign in to continue
            </h2>
            <p style={{
              color: '#555',
              fontSize: 13,
              margin: '0 0 1.5rem',
              lineHeight: 1.6,
              textAlign: 'center',
            }}>
              Enter your <strong style={{ color: '#888' }}>@roofignite.com</strong> email — we&apos;ll send a link, no password needed.
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
                  style={{
                    width: '100%',
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #2A2A2A',
                    borderRadius: 10,
                    padding: '11px 14px',
                    color: '#F5F5F5',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = '#2A2A2A')}
                />

                {error && (
                  <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  style={{
                    width: '100%',
                    backgroundColor: loading || !email.trim() ? '#1A1A1A' : '#F5C800',
                    border: 'none',
                    borderRadius: 10,
                    padding: '12px',
                    cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    fontWeight: 700,
                    color: loading || !email.trim() ? '#444' : '#000',
                    transition: 'all 0.15s ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.02em',
                  }}
                >
                  {loading ? 'Sending…' : 'Send login link →'}
                </button>
              </form>
            ) : (
              <div style={{
                backgroundColor: '#1A1200',
                border: '1px solid #F59E0B33',
                borderRadius: 10,
                padding: '14px 16px',
                color: '#F59E0B',
                fontSize: 12,
                lineHeight: 1.5,
              }}>
                ⚠️ Supabase is not configured. Add your{' '}
                <code style={{ backgroundColor: '#110E00', padding: '1px 4px', borderRadius: 3 }}>
                  .env.local
                </code>{' '}
                to enable login.
              </div>
            )}
          </>
        )}
      </div>

      <p style={{ color: '#2A2A2A', fontSize: 11, marginTop: '2rem', letterSpacing: '0.05em' }}>
        roofignite.com · internal use only
      </p>
    </div>
  );
}
