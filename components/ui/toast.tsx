"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ToastAction, ToastType } from "@/lib/store/toastStore";

type ToastProps = {
  message: string;
  type: ToastType;
  onClose: () => void;
  action?: ToastAction;
};

const palette: Record<ToastType, { wrapper: string; badge: string }> = {
  success: {
    wrapper:
      "bg-emerald-600/95 text-emerald-50 shadow-[0_20px_45px_-25px_rgba(16,185,129,0.65)] ring-1 ring-emerald-400/40",
    badge: "text-emerald-100",
  },
  error: {
    wrapper:
      "bg-rose-600/95 text-rose-50 shadow-[0_20px_45px_-25px_rgba(244,63,94,0.65)] ring-1 ring-rose-400/40",
    badge: "text-rose-100",
  },
};

const motionConfig = {
  initial: { y: -24, opacity: 0, scale: 0.97 },
  animate: { y: 0, opacity: 1, scale: 1 },
  exit: { y: -24, opacity: 0, scale: 0.95 },
};

export function Toast({ message, type, onClose, action }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const colors = palette[type];

  return (
    <motion.article
      layout
      {...motionConfig}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      className={cn(
        "pointer-events-auto w-[min(92vw,420px)] rounded-2xl border px-5 py-4 font-medium backdrop-blur",
        "flex flex-col gap-3",
        colors.wrapper
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("text-sm uppercase tracking-wide", colors.badge)}>
          {type === "success" ? "Order Placed" : "Something Went Wrong"}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10"
          aria-label="Dismiss toast"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="text-base leading-relaxed text-white/95">{message}</p>
      {action ? (
        <div>
          <Link
            href={action.href}
            className="text-sm font-semibold tracking-wide text-white/95 underline decoration-white/40 underline-offset-4"
          >
            {action.label}
          </Link>
        </div>
      ) : null}
    </motion.article>
  );
}
