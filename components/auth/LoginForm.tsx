"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormState = "idle" | "submitting" | "success"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<FormState>("idle")
  const [message, setMessage] = useState("")

  const isValid = email.includes("@") && password.trim().length >= 6

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid || status === "submitting") return

    setStatus("submitting")
    setMessage("Centering your ritual...")

    setTimeout(() => {
      setStatus("success")
      setMessage("All set. You are now in a demo session.")
    }, 1200)
  }

  return (
    <Card className="w-full max-w-xl border-emerald-200/70 bg-card/90 shadow-2xl shadow-emerald-100/40 backdrop-blur-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-serif text-emerald-900">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Continue your natural care journey with mindful focus and clarity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="login-email">Email address</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <Label htmlFor="login-password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-primary underline-offset-4 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                className="size-4 rounded border border-input bg-white/80 text-primary"
              />
              Remember ritual
            </label>
            <span>Secure demo environment</span>
          </div>
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={!isValid || status === "submitting"}
            >
              {status === "submitting" ? "Settling in..." : "Enter sanctuary"}
            </Button>
            {message && (
              <p
                className="text-sm text-emerald-800"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground">
        <p>
          New to Homeo? {" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
        <p>Guided support available daily 6am - 10pm IST.</p>
      </CardFooter>
    </Card>
  )
}
