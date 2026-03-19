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

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<FormState>("idle")
  const [message, setMessage] = useState("")

  const isValid = email.includes("@")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid || status === "submitting") return

    setStatus("submitting")
    setMessage("Sending gentle reset link...")

    setTimeout(() => {
      setStatus("success")
      setMessage("Check your inbox. We also saved the note in case you return.")
    }, 1100)
  }

  return (
    <Card className="w-full max-w-lg border-emerald-200/70 bg-card/90 shadow-lg shadow-emerald-100/40 backdrop-blur-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-serif text-emerald-900">
          Reset access
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          We will send a one-time link and optional SMS check-in to help you return.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="forgot-email">Email address</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="forgot-phone">
              SMS number (optional)
            </Label>
            <Input
              id="forgot-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 90000 00000"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={!isValid || status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Email reset link"}
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
          Remembered now? {" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Return to sign in
          </Link>
        </p>
        <p>
          Need a fresh start? {" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create a new account
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
