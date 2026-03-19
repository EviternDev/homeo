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

export function SignupForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [focus, setFocus] = useState("")
  const [status, setStatus] = useState<FormState>("idle")
  const [message, setMessage] = useState("")

  const isValid =
    fullName.trim().length > 1 &&
    email.includes("@") &&
    password.trim().length >= 8 &&
    focus.trim().length > 2

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid || status === "submitting") return

    setStatus("submitting")
    setMessage("Blending your profile...")

    setTimeout(() => {
      setStatus("success")
      setMessage("Account prepared. Explore the ritual at your pace.")
    }, 1400)
  }

  return (
    <Card className="w-full max-w-2xl border-emerald-200/70 bg-card/95 shadow-xl shadow-emerald-100/50 backdrop-blur-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-serif text-emerald-900">
          Begin your practice
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Tell us a little about yourself so we can tailor reminders and blends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full name</Label>
              <Input
                id="signup-name"
                name="name"
                placeholder="Asha Vaidya"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-focus">Primary intention</Label>
              <Input
                id="signup-focus"
                name="focus"
                placeholder="Sleep support"
                value={focus}
                onChange={(event) => setFocus(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email address</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Create password</Label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <label className="flex items-start gap-3 rounded-lg border border-emerald-100/70 bg-emerald-50/60 p-4 text-sm text-emerald-900">
            <input type="checkbox" required className="mt-1 size-4 rounded border border-emerald-300" />
            I agree to ritual reminders and natural wellness tips in my inbox.
          </label>
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={!isValid || status === "submitting"}
            >
              {status === "submitting" ? "Preparing..." : "Create account"}
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
      <CardFooter className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          Already with us? {" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
        <p>Need help? Our herbal guides are a DM away.</p>
      </CardFooter>
    </Card>
  )
}
