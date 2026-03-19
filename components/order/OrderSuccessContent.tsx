"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrencyStore } from "@/lib/store/currencyStore";
import { useOrderStore } from "@/lib/store/orderStore";
import type { OrderStatus } from "@/types";

const statusSteps: { id: OrderStatus; label: string; description: string }[] = [
  { id: "pending", label: "Order placed", description: "We've received your ritual." },
  { id: "confirmed", label: "Confirmed", description: "Apothecaries prepare remedies." },
  { id: "processing", label: "Crafting", description: "Dilutions bottled mindfully." },
  { id: "shipped", label: "On the way", description: "Packages travel carbon-neutral." },
  { id: "delivered", label: "Delivered", description: "Remedies reach your doorstep." },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const formatDeliveryDate = (value?: string | null) => {
  if (!value) {
    return "TBD";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(parsed);
};

const subscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const hasHydrated = useMounted();

  const orderId = searchParams.get("id");
  const order = useOrderStore((state) => (orderId ? state.getOrderById(orderId) : undefined));

  if (!hasHydrated) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-gradient-to-b from-emerald-50/50 via-background to-background px-4 py-16 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-3xl">
          <div className="animate-pulse rounded-3xl border border-emerald-100 bg-white/70 p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100" />
            <div className="mx-auto mb-2 h-4 w-48 rounded-full bg-emerald-100" />
            <div className="mx-auto h-4 w-32 rounded-full bg-emerald-50" />
          </div>
        </div>
      </motion.section>
    );
  }

  if (!order) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-gradient-to-b from-background via-emerald-50/10 to-background px-4 py-20 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-emerald-200 bg-white text-2xl text-emerald-600"
          >
            !
          </motion.div>
          <h1 className="text-3xl font-semibold text-emerald-950">Order not found</h1>
          <p className="text-base text-muted-foreground">
            We could not find an order with the provided reference. Please return home and try again.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="rounded-full border border-emerald-200 bg-white px-8 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:border-emerald-400"
            >
              Return home
            </Link>
          </div>
        </div>
      </motion.section>
    );
  }

  const estimatedDelivery = formatDeliveryDate(order.estimatedDelivery);
  const progressIndex = Math.max(
    statusSteps.findIndex((step) => step.id === order.status),
    0
  );
  const progressPercent = (progressIndex / (statusSteps.length - 1)) * 100;
  const address = order.shippingAddress;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-emerald-50/60 via-white to-background px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <motion.header
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-emerald-100 bg-white/80 p-8 text-center shadow-lg shadow-emerald-100/60"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
          >
            <motion.svg
              viewBox="0 0 48 48"
              className="h-10 w-10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.path
                d="M12 24l8 8 16-18"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-500">Success</p>
          <h1 className="mt-2 text-4xl font-semibold text-emerald-950">
            Order #{order.orderNumber}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Estimated delivery <span className="font-semibold text-emerald-700">{estimatedDelivery}</span>
          </p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.05 }}>
              <Card className="rounded-3xl border border-emerald-100/80 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Items in this order</CardTitle>
                  <CardDescription className="text-sm">
                    {order.items.length} {order.items.length === 1 ? "remedy" : "remedies"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {order.items.map((item) => (
                      <motion.li
                        key={`${item.product.id}-${item.selectedPotency}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start justify-between rounded-2xl border border-emerald-50 bg-emerald-50/40 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-emerald-900">{item.product.name}</p>
                          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                            {item.selectedPotency} &bull; Qty {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-emerald-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <Card className="rounded-3xl border border-emerald-100/80 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Shipping address</CardTitle>
                  <CardDescription>Carefully packed and shipped with carbon-neutral carriers.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="text-base font-semibold text-emerald-900">{address.fullName}</p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.email}</p>
                  <p>{address.phone}</p>
                  {address.notes ? <p className="text-xs text-emerald-600">Notes: {address.notes}</p> : null}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
              <Card className="rounded-3xl border border-emerald-100/80 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Status</CardTitle>
                  <CardDescription>Track progress from preparation to delivery.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-2 w-full rounded-full bg-emerald-100">
                    <motion.div
                      className="absolute left-0 top-0 h-full rounded-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-5">
                    {statusSteps.map((step, index) => {
                      const isActive = index <= progressIndex;
                      return (
                        <div key={step.id} className="space-y-1 text-center sm:text-left">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                              isActive ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <p className="text-sm font-medium text-emerald-900">{step.label}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.08 }}>
              <Card className="rounded-3xl border border-emerald-100/80 bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-emerald-950">Order summary</CardTitle>
                  <CardDescription>All amounts reflect your selected currency.</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Subtotal</dt>
                      <dd className="font-medium text-emerald-900">{formatPrice(order.subtotal)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Shipping</dt>
                      <dd className="font-medium text-emerald-900">
                        {order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/70 pt-4 text-base">
                      <dt className="font-semibold text-emerald-950">Total</dt>
                      <dd className="font-semibold text-emerald-600">{formatPrice(order.total)}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 rounded-2xl bg-emerald-50/70 p-4 text-sm text-emerald-700">
                    Paid with <span className="font-semibold text-emerald-900">{order.paymentMethod}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.18 }}>
              <Card className="rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-white to-emerald-50 shadow-sm">
                <CardContent className="space-y-4 pt-6">
                  <p className="text-sm text-muted-foreground">
                    Need help with this order? Our care team can assist with address tweaks, potion guidance, or delivery checks.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      className="w-full rounded-full bg-emerald-600 text-white hover:bg-emerald-500"
                      onClick={() => router.push("/products")}
                    >
                      Continue shopping
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full rounded-full border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                      onClick={() => router.push("/")}
                    >
                      View all orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
