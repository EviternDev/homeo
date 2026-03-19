"use client"

import { motion } from "framer-motion"

import { SignupForm } from "@/components/auth/SignupForm"

export default function SignupPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50 to-emerald-100" />
        <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_20%_20%,rgba(132,204,156,0.22),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(236,252,203,0.4),transparent_50%)]" />
      </div>
      <div className="container-shell relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Create account
          </p>
          <h1 className="text-4xl font-serif text-emerald-900 md:text-5xl">
            Grow a holistic routine that feels personal
          </h1>
          <p className="text-base text-muted-foreground">
            Build a profile that keeps your favourite blends, replenishment
            schedule, and practitioner notes close so you can focus on feeling
            grounded.
          </p>
        </div>
        <SignupForm />
      </div>
    </motion.section>
  )
}
