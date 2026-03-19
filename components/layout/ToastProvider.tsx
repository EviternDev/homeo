"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import {
  type ToastAction,
  type ToastType,
  useToastStore,
} from "@/lib/store/toastStore";

type ToastContextValue = {
  showToast: (message: string, type: ToastType, action?: ToastAction) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const addToast = useToastStore((state) => state.addToast);

  const showToast = useCallback(
    (message: string, type: ToastType, action?: ToastAction) => {
      addToast({ message, type, action });
    },
    [addToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
