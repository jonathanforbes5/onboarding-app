'use client';
import React from 'react';
import { signOut } from '@/lib/auth';

export function AccessDenied({ email }: { email: string }) {
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
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div
          style={{
            width: 56,
            height: 56,
            backgroundColor: '#2A0000',
            border: '1.5px solid #EF444444',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: 24,
          }}
        >
          🚫
        </div>
        <h1
          style={{
            color: '#F5F5F5',
            fontSize: 20,
            fontWeight: 900,
            margin: '0 0 0.75rem',
          }}
        >
          Access Denied
        </h1>
        <p style={{ color: '#888', fontSize: 14, margin: '0 0 0.5rem', lineHeight: 1.6 }}>
          <strong style={{ color: '#ccc' }}>{email}</strong> is not authorised to access this platform.
        </p>
        <p style={{ color: '#555', fontSize: 13, margin: '0 0 2rem', lineHeight: 1.5 }}>
          If you think this is a mistake, contact{' '}
          <strong style={{ color: '#888' }}>jonathan@roofignite.com</strong> to request access.
        </p>
        <button
          onClick={() => signOut()}
          style={{
            backgroundColor: '#1C1C1C',
            border: '1.5px solid #2A2A2A',
            borderRadius: 10,
            padding: '11px 24px',
            color: '#F5F5F5',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ← Sign out and try a different account
        </button>
      </div>
    </div>
  );
}
