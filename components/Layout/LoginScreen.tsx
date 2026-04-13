'use client';
import React, { useState } from 'react';
import { signInWithGoogle } from '@/lib/auth';
import { isSupabaseEnabled } from '@/lib/supabase';

export function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseEnabled();

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
    // Browser redirects to Google — loading state stays until redirect
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
        <div
          style={{
            width: 64,
            height: 64,
            backgroundColor: '#F5C800',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontWeight: 900,
            fontSize: 24,
            color: '#000',
          }}
        >
          CI
        </div>
        <h1
          style={{
            color: '#F5F5F5',
            fontSize: 26,
            fontWeight: 900,
            margin: '0 0 0.4rem',
            letterSpacing: '-0.5px',
          }}
        >
          Contractors Ignite
        </h1>
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
          Use your <strong style={{ color: '#aaa' }}>@roofignite.com</strong> Google account.
          Access is restricted to authorised team members only.
        </p>

        {configured ? (
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              backgroundColor: loading ? '#1C1C1C' : '#fff',
              border: '1.5px solid #2A2A2A',
              borderRadius: 10,
              padding: '12px 20px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
              fontSize: 14,
              fontWeight: 700,
              color: loading ? '#666' : '#000',
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#fff';
            }}
          >
            {/* Google G icon */}
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
            )}
            {loading ? 'Redirecting to Google…' : 'Continue with Google'}
          </button>
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
      </div>

      <p style={{ color: '#333', fontSize: 11, marginTop: '1.75rem', textAlign: 'center' }}>
        roofignite.com · Internal use only
      </p>
    </div>
  );
}
