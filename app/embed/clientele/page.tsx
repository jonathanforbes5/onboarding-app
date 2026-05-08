'use client';
// Stripped-down embed of the ClientMap for use inside an iframe (Cole's
// dashboard.roofignite.com → /clientele.html). NO header, sidebar, or
// portal chrome — just the map and a thin auth gate so the embed only
// renders for a logged-in @roofignite.com super_admin (matches the
// security model of the rest of the portal).
import React from 'react';
import { useApp } from '@/context/AppContext';
import { ClientMap } from '@/components/Diagrams/ClientMap';

export default function EmbedClientelePage() {
  const { currentUser, authLoading } = useApp();

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13 }}>
        Loading…
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, fontFamily: 'Inter, system-ui, sans-serif', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Sign in required</div>
        <div style={{ fontSize: 12, color: '#aaa', maxWidth: 460, lineHeight: 1.6 }}>
          You must be signed in at <strong>onboarding.roofignite.com</strong> with your @roofignite.com account before this map will load.
        </div>
        <a
          href="https://onboarding.roofignite.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 4, padding: '8px 16px', borderRadius: 8, backgroundColor: '#F5C800', color: '#000', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}
        >
          Open the portal to sign in →
        </a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', padding: 'clamp(8px, 1.5vw, 16px)', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <ClientMap />
    </div>
  );
}
