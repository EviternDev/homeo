"use client"

import { motion } from "framer-motion"

import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate overflow-hidden py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-background to-white" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <div className="container-shell relative z-10 flex flex-col items-center gap-10 text-center">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Members space
          </p>
          <h1 className="text-4xl font-serif text-emerald-900 md:text-5xl">
            Return to your sanctuary
          </h1>
          <p className="text-base text-muted-foreground">
            Track rituals, replenish favourites, and keep your natural practice
            in rhythm with mindful reminders tailored to your pace.
          </p>
        </div>
        <LoginForm />
      </div>
    </motion.section>
  )
}
