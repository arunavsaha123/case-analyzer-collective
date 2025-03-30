
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

// Types
export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

type ToasterProps = {
  toasts: ToastProps[];
};

type ToastContextType = {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, 'id'>) => void;
  dismiss: (id: string) => void;
};

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
};

// Toast component
export const Toast: React.FC<ToastProps & { onDismiss: () => void }> = ({
  title,
  description,
  action,
  variant = 'default',
  onDismiss
}) => {
  return (
    <div 
      className={`relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
        variant === 'destructive' 
          ? 'border-red-600 bg-red-600 text-white' 
          : 'border-gray-200 bg-white text-gray-900'
      }`}
    >
      <div className="grid gap-1">
        {title && <h5 className="text-sm font-semibold">{title}</h5>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      {action}
      <button 
        onClick={onDismiss} 
        className="absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-70 transition-opacity hover:opacity-100 hover:text-gray-900"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
};

// Toaster component
export const Toaster: React.FC<ToasterProps> = ({ toasts }) => {
  const { dismiss } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <div key={toast.id} className="mb-2">
          <Toast {...toast} onDismiss={() => dismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
};
