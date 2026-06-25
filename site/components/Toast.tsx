'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

type ToastContextValue = { flash: (msg: string) => void };

const ToastContext = createContext<ToastContextValue>({ flash: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ flash }}>
      {children}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 28,
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'var(--navy)',
            color: '#fff',
            padding: '13px 26px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            boxShadow: '0 16px 40px rgba(11,31,58,.35)',
            animation: 'dcToast .25s ease',
          }}
        >
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  );
}
