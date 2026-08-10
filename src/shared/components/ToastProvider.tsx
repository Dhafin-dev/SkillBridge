import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
};

type ToastContextType = {
  toast: (type: Toast['type'], message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 min-w-[250px] max-w-xs p-3 rounded-xl shadow-lg text-sm transition-opacity 
              ${t.type === 'success' ? 'bg-emerald-100 text-emerald-900' : ''}
              ${t.type === 'error' ? 'bg-red-100 text-red-900' : ''}
              ${t.type === 'info' ? 'bg-blue-100 text-blue-900' : ''}`}
          >
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
              className="p-1 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
