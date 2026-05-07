'use client';
import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        right: 20,
        zIndex: 48,
        width: 38,
        height: 38,
        borderRadius: '50%',
        backgroundColor: '#1A1A1A',
        border: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'opacity 0.2s, transform 0.2s',
        animation: 'fadeInUp 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2A2A2A';
        e.currentTarget.style.borderColor = '#F5C80066';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1A1A1A';
        e.currentTarget.style.borderColor = '#333';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <ChevronUp size={16} color="#888" />
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </button>
  );
}
