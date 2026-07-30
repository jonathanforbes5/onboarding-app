'use client';
import React, { useState } from 'react';
import { LOCAL_USERS } from '@/lib/auth';

const BYPASS_KEY = 'ri_bypass_profile';

export function LoginScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const inp: React.CSSProperties = {
    width: '100%', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A',
    borderRadius: 10, padding: '11px 14px', color: '#F5F5F5', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const key = name.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
    const user = LOCAL_USERS[key];
    if (!user) {
      setError(`"${key}" not found — use your first name (e.g. jorge, emmanuel, jc).`);
      return;
    }
    localStorage.setItem(BYPASS_KEY, JSON.stringify(user));
    window.location.reload();
  }

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
          Internal Training Hub
        </p>
      </div>

      <div style={{
        backgroundColor: '#111111', border: '1px solid #222222', borderRadius: 20,
        padding: '2rem 2.25rem', width: '100%', maxWidth: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <h2 style={{ color: '#F5F5F5', fontSize: 16, fontWeight: 800, margin: '0 0 6px', textAlign: 'center' }}>Sign in</h2>
        <p style={{ color: '#555', fontSize: 13, margin: '0 0 1.5rem', textAlign: 'center', lineHeight: 1.6 }}>
          Enter your first name to continue.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="firstname"
              required
              autoFocus
              autoComplete="off"
              style={{ ...inp, borderRadius: '10px 0 0 10px', borderRight: 'none', flex: 1, minWidth: 0 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#F5C800')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
            />
            <div style={{
              backgroundColor: '#161616', border: '1px solid #2A2A2A', borderRadius: '0 10px 10px 0',
              padding: '11px 12px', color: '#444', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center',
            }}>@roofignite.com</div>
          </div>
          {error && <p style={{ color: '#EF4444', fontSize: 12, margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={!name.trim()}
            style={{
              width: '100%', border: 'none', borderRadius: 10, padding: '12px',
              fontSize: 14, fontWeight: 700, fontFamily: 'inherit', letterSpacing: '0.02em',
              backgroundColor: name.trim() ? '#F5C800' : '#1A1A1A',
              color: name.trim() ? '#000' : '#444',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            Sign in →
          </button>
        </form>
      </div>

      <p style={{ color: '#2A2A2A', fontSize: 11, marginTop: '1rem', letterSpacing: '0.05em' }}>
        roofignite.com · internal use only
      </p>
    </div>
  );
}
