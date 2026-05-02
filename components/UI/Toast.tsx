'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle size={15} className="text-green-400 flex-shrink-0" />,
    error:   <XCircle    size={15} className="text-red-400 flex-shrink-0"   />,
    info:    <Info       size={15} className="text-blue-400 flex-shrink-0"  />,
  };

  const borders: Record<ToastType, string> = {
    success: '#22C55E33',
    error:   '#EF444433',
    info:    '#4A90D933',
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#1A1A1A',
              border: `1px solid ${borders[t.type]}`,
              borderRadius: 12,
              padding: '10px 14px',
              minWidth: 220,
              maxWidth: 380,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              pointerEvents: 'all',
              animation: 'toast-in 0.2s ease-out',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {icons[t.type]}
            <span style={{ color: '#E5E5E5', fontSize: 13, flex: 1, lineHeight: 1.4 }}>{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: '#555', flexShrink: 0 }}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
