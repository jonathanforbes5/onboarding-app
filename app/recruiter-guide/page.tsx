'use client';
import { useApp } from '@/context/AppContext';
import { RECRUITER_GUIDE_HTML } from '@/lib/recruiter-guide-html';

export default function RecruiterGuidePage() {
  const { currentUser, authLoading } = useApp();

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0A0A0A', color: '#888', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
        Loading…
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'super_admin') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0A0A0A', fontFamily: 'Inter, sans-serif', gap: 12 }}>
        <div style={{ fontSize: 32 }}>🔒</div>
        <div style={{ color: '#F0F0F0', fontSize: 15, fontWeight: 700 }}>Access Restricted</div>
        <div style={{ color: '#666', fontSize: 12 }}>This document is only available to RoofIgnite admins.</div>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={RECRUITER_GUIDE_HTML}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="Pod Manager Hiring Criteria Guide"
    />
  );
}
