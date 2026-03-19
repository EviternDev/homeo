"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cartStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { cn } from "@/lib/utils";
import { validateForm } from "@/lib/utils/validation";
import type { ShippingAddress } from "@/types";

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

type FormState = ShippingAddress & { notes: string };

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  notes: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const isCartEmpty = cartItems.length === 0;
  const createOrder = useOrderStore((state) => state.createOrder);

  const [formValues, setFormValues] = useState<FormState>(initialFormState);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentMethods[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const isFormComplete = useMemo(() => {
    const requiredFields = shippingFields
      .filter((field) => field.id !== "notes")
      .map((field) => field.id);
    return requiredFields.every((field) => formValues[field as keyof FormState].trim().length > 2);
  }, [formValues]);

  const isDisabled = isCartEmpty || !isFormComplete || !paymentMethod || isSubmitting;

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field as string]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const scrollToField = (fieldId: string) => {
    const element = fieldRefs.current[fieldId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus({ preventScroll: true });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }

    const errors = validateForm(formValues as unknown as Record<string, string>);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = shippingFields.find((field) => errors[field.id]);
      if (firstErrorField) {
        scrollToField(firstErrorField.id);
      }
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + shipping;

    try {
      const shippingAddress: ShippingAddress = {
        ...formValues,
        notes: formValues.notes.trim() ? formValues.notes.trim() : undefined,
      };
      const order = createOrder({
        items: cartItems,
        subtotal,
        shipping,
        total,
        shippingAddress,
        paymentMethod,
      });
      clearCart();
      setFormValues(initialFormState);
      setPaymentMethod(paymentMethods[0].id);
      router.push(`/?orderSuccess=true&orderId=${order.id}`);
    } catch (error) {
      console.error("Failed to submit order", error);
    } finally {
      setIsSubmitting(false);
    }
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
            <div
              key={field.id}
              className={
                field.id === "address"
                  ? "sm:col-span-2"
                  : field.id === "notes"
                  ? "sm:col-span-2"
                  : undefined
              }
            >
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
                ref={(node) => {
                  fieldRefs.current[field.id] = node;
                }}
                className={cn(
                  "mt-1 rounded-2xl border-emerald-100 bg-white/70 focus-visible:ring-emerald-200",
                  fieldErrors[field.id]
                    ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200"
                    : "focus-visible:border-emerald-400"
                )}
              />
              {fieldErrors[field.id] ? (
                <p className="mt-1 text-xs font-medium text-red-600">{fieldErrors[field.id]}</p>
              ) : null}
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
