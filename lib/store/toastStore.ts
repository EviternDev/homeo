"use client";

import { create } from "zustand";

export type ToastType = "success" | "error";

export type ToastAction = {
  label: string;
  href: string;
};

export type ToastRecord = {
  id: string;
  message: string;
  type: ToastType;
  action?: ToastAction;
  createdAt: number;
};

export type ToastInput = Omit<ToastRecord, "id" | "createdAt">;

type ToastStore = {
  toasts: ToastRecord[];
  addToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
};

const AUTO_DISMISS_MS = 5000;
const toastTimers = new Map<string, number>();

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = crypto.randomUUID();
    const entry: ToastRecord = {
      ...toast,
      id,
      createdAt: Date.now(),
    };

    set((state) => ({
      toasts: [...state.toasts, entry],
    }));

    const timeoutId = window.setTimeout(() => {
      toastTimers.delete(id);
      get().removeToast(id);
    }, AUTO_DISMISS_MS);
    toastTimers.set(id, timeoutId);

    return id;
  },
  removeToast: (id) => {
    const timeoutId = toastTimers.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      toastTimers.delete(id);
    }

    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
