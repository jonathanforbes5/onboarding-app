'use client';
import React from 'react';
import { useApp, UserName } from '@/context/AppContext';

const USERS: { id: UserName; name: string; role: string; accent: string; textOnAccent: string; initial: string }[] = [
  {
    id: 'sam',
    name: 'Sam',
    role: 'Pod 4 Manager',
    accent: '#F5C800',
    textOnAccent: '#000000',
    initial: 'S',
  },
  {
    id: 'patrick',
    name: 'Patrick',
    role: 'Pod 4 Manager',
    accent: '#E07B39',
    textOnAccent: '#FFFFFF',
    initial: 'P',
  },
  {
    id: 'jonathan',
    name: 'Jonathan',
    role: 'Head of Pod Operations',
    accent: '#4A90D9',
    textOnAccent: '#FFFFFF',
    initial: 'J',
  },
];

export function LoginScreen() {
  const { login } = useApp();

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
      {/* Logo / Brand */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#F5C800',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontWeight: 900,
            fontSize: 22,
            color: '#000',
            letterSpacing: '-0.5px',
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
          Pod Manager Onboarding — Select your profile to continue
        </p>
      </div>

      {/* User cards */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 700,
          width: '100%',
        }}
      >
        {USERS.map((user) => (
          <button
            key={user.id}
            onClick={() => login(user.id)}
            style={{
              background: '#141414',
              border: '1.5px solid #2A2A2A',
              borderRadius: 16,
              padding: '1.75rem 2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              flex: '1 1 180px',
              maxWidth: 210,
              transition: 'all 0.15s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = user.accent;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${user.accent}22`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#2A2A2A';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: user.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 22,
                color: user.textOnAccent,
                flexShrink: 0,
              }}
            >
              {user.initial}
            </div>
            {/* Name & role */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#F5F5F5', fontWeight: 800, fontSize: 16, marginBottom: 3 }}>
                {user.name}
              </div>
              <div style={{ color: '#888', fontSize: 12 }}>{user.role}</div>
            </div>
            {/* CTA */}
            <div
              style={{
                marginTop: 4,
                padding: '6px 16px',
                borderRadius: 8,
                backgroundColor: user.accent,
                color: user.textOnAccent,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Continue →
            </div>
          </button>
        ))}
      </div>

      {/* Footer note */}
      <p style={{ color: '#444', fontSize: 12, marginTop: '2.5rem', textAlign: 'center' }}>
        Progress is saved per profile · April 2026 Cohort · Pod 4
      </p>
    </div>
  );
}
