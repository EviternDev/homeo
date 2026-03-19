"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", title: "Card", subtitle: "Visa, Mastercard, RuPay" },
  { id: "upi", title: "UPI", subtitle: "PhonePe, GPay, BHIM" },
  { id: "cod", title: "Cash on delivery", subtitle: "Pay at doorstep" },
];

const shippingFields = [
  { id: "fullName", label: "Full name", autoComplete: "name", type: "text" },
  { id: "email", label: "Email", autoComplete: "email", type: "email" },
  { id: "phone", label: "Phone", autoComplete: "tel", type: "tel" },
  { id: "address", label: "Street address", autoComplete: "street-address", type: "text" },
  { id: "city", label: "City", autoComplete: "address-level2", type: "text" },
  { id: "state", label: "State", autoComplete: "address-level1", type: "text" },
  { id: "postalCode", label: "Postal code", autoComplete: "postal-code", type: "text" },
  { id: "notes", label: "Delivery notes (optional)", autoComplete: "off", type: "text" },
];

type FormState = Record<(typeof shippingFields)[number]["id"], string>;

const initialFormState = shippingFields.reduce<FormState>((acc, field) => {
  acc[field.id as keyof FormState] = "";
  return acc;
}, {} as FormState);

export function CheckoutForm() {
  const isCartEmpty = useCartStore((state) => state.items.length === 0);

  const [formValues, setFormValues] = useState<FormState>(initialFormState);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimer.current) {
        clearTimeout(submitTimer.current);
      }
    };
  }, []);

  const isFormComplete = useMemo(() => {
    const requiredFields = shippingFields
      .filter((field) => field.id !== "notes")
      .map((field) => field.id);
    return requiredFields.every((field) => formValues[field as keyof FormState].trim().length > 2);
  }, [formValues]);

  const isDisabled = isCartEmpty || !isFormComplete || !paymentMethod || isSubmitting;

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }
    setIsSubmitting(true);
    submitTimer.current = setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <section className="rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm">
        <header className="mb-6 space-y-1">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Shipping</p>
          <h3 className="text-2xl font-semibold text-emerald-950">Send to</h3>
          <p className="text-sm text-muted-foreground">We currently ship pan India with carbon-neutral packaging.</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {shippingFields.map((field) => (
            <div key={field.id} className={field.id === "address" ? "sm:col-span-2" : field.id === "notes" ? "sm:col-span-2" : undefined}>
              <Label htmlFor={field.id} className="text-emerald-900">
                {field.label}
              </Label>
              <Input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                value={formValues[field.id as keyof FormState]}
                onChange={handleChange(field.id as keyof FormState)}
                className="mt-1 rounded-2xl border-emerald-100 bg-white/70 focus-visible:border-emerald-400 focus-visible:ring-emerald-200"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-500">Payment</p>
          <h3 className="text-2xl font-semibold text-emerald-950">Choose a method</h3>
        </header>
        <div className="grid gap-4 sm:grid-cols-3">
          {paymentMethods.map((method) => (
            <button
              type="button"
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                method.id === paymentMethod
                  ? "border-emerald-500 bg-white text-emerald-900 shadow"
                  : "border-emerald-100/80 bg-white/70 text-muted-foreground hover:border-emerald-300"
              )}
            >
              <p className="text-sm font-semibold">{method.title}</p>
              <p className="text-xs text-muted-foreground">{method.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-card/50 p-6 shadow-sm">
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full bg-emerald-600 text-white hover:bg-emerald-600/90"
          disabled={isDisabled}
        >
          {isSubmitting ? "Processing order..." : "Place order"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          No payment will be captured. This flow validates layout only.
        </p>
        {isCartEmpty ? (
          <p className="text-center text-xs font-medium text-amber-600">
            Add at least one remedy to continue.
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}
