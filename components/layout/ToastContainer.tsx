"use client";

import { AnimatePresence } from "framer-motion";

import { Toast } from "@/components/ui/toast";
import { useToastStore } from "@/lib/store/toastStore";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            action={toast.action}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
