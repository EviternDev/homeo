"use client"

import { motion } from "framer-motion"

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.15),transparent_55%),radial-gradient(circle_at_70%_20%,rgba(52,211,153,0.15),transparent_45%)]" />
      </div>
      <div className="container-shell relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Reset ritual
          </p>
          <h1 className="text-4xl font-serif text-emerald-900 md:text-5xl">
            We will guide you back gently
          </h1>
          <p className="text-base text-muted-foreground">
            Share the email linked to your account and we will send a reset link
            along with mindful support tips.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </motion.section>
  )
}
