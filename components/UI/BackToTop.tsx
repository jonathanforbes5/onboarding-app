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
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .back-to-top {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 88px);
          right: 20px;
          z-index: 43;
          width: 38px; height: 38px;
          border-radius: 50%;
          background-color: #1A1A1A;
          border: 1px solid #333;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          animation: fadeInUp 0.2s ease;
          transition: background-color 0.15s, border-color 0.15s, transform 0.15s;
        }
        .back-to-top:hover {
          background-color: #2A2A2A;
          border-color: rgba(245,200,0,0.4);
          transform: translateY(-2px);
        }
        /* On mobile, shift to left so it doesn't clash with right-side FABs */
        @media (max-width: 640px) {
          .back-to-top {
            right: auto;
            left: 16px;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 96px);
          }
        }
      `}</style>
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        <ChevronUp size={16} color="#888" />
      </button>
    </>
  );
}
