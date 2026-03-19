"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Cart", description: "Review bag" },
  { id: 2, title: "Details", description: "Shipping info" },
  { id: 3, title: "Payment", description: "Confirm & pay" },
];

type CheckoutProgressProps = {
  currentStep?: number;
};

export function CheckoutProgress({ currentStep = 2 }: CheckoutProgressProps) {
  return (
    <div className="rounded-3xl border border-emerald-100/70 bg-emerald-50/30 p-6 shadow-inner">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-600/70">
            Checkout flow
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-emerald-950">Complete your ritual</h2>
          <p className="mt-1 text-sm text-emerald-900/70">
            Follow the steps below to confirm your remedies shipment.
          </p>
        </div>

        <ol className="flex flex-1 flex-col gap-4 sm:flex-row">
          {steps.map((step, index) => {
            const status =
              step.id === currentStep ? "active" : step.id < currentStep ? "complete" : "upcoming";

            return (
              <li key={step.id} className="flex flex-1 items-center gap-3">
                <div className="flex h-full flex-col items-center">
                  <motion.span
                    layout
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",
                      status === "active" && "border-emerald-500 bg-white text-emerald-600 shadow",
                      status === "complete" && "border-emerald-400 bg-emerald-500/10 text-emerald-600",
                      status === "upcoming" && "border-emerald-100 text-emerald-400"
                    )}
                  >
                    {step.id}
                  </motion.span>
                  {index < steps.length - 1 ? (
                    <span className="mx-auto mt-2 hidden h-12 w-px rounded-full bg-emerald-100 sm:block" />
                  ) : null}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-500/80">Step {step.id}</p>
                  <p className="text-base font-medium text-emerald-950">{step.title}</p>
                  <p className="text-sm text-emerald-900/70">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
