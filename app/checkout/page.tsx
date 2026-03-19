"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-b from-background via-emerald-50/10 to-background px-4 py-12 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Checkout</p>
            <h1 className="text-3xl font-semibold text-emerald-950 sm:text-4xl">Calm & deliberate ritual</h1>
            <p className="text-sm text-muted-foreground">
              Provide your delivery details and settle the payment preference to complete the order.
            </p>
          </div>
          <Link
            href="/cart"
            className={cn(buttonVariants({ variant: "ghost", className: "rounded-full" }), "border border-emerald-100/60 bg-white/60 shadow-sm")}
          >
            Back to cart
          </Link>
        </header>

        <CheckoutProgress currentStep={2} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <CheckoutForm />
          <CheckoutSummary />
        </div>
      </div>
    </motion.section>
  );
}
