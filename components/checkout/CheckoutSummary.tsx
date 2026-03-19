"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { useCurrencyStore } from "@/lib/store/currencyStore";

const container = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function CheckoutSummary() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotalInInr());
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const visibleItems = items.slice(0, 3);
  const remaining = Math.max(0, items.length - visibleItems.length);

  return (
    <motion.aside
      variants={container}
      initial="hidden"
      animate="visible"
      className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-lg shadow-emerald-100/60 backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Order</p>
          <h2 className="text-xl font-semibold text-emerald-950">Summary</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          {items.length} items
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {visibleItems.map((entry) => (
          <li
            key={`${entry.product.id}-${entry.selectedPotency}`}
            className="flex items-start justify-between rounded-2xl border border-emerald-50/80 bg-muted/40 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-emerald-900">{entry.product.name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {entry.selectedPotency} &bull; Qty {entry.quantity}
              </p>
            </div>
            <span className="text-sm font-semibold text-emerald-600">
              {formatPrice(entry.product.price * entry.quantity)}
            </span>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/40 px-4 py-3 text-sm text-emerald-700">
            Your apothecary basket is empty.
          </li>
        ) : null}
        {remaining > 0 ? (
          <li className="text-xs text-muted-foreground">+{remaining} more remedies</li>
        ) : null}
      </ul>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-foreground">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium text-emerald-600">
            {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-base">
          <dt className="font-semibold text-emerald-950">Total</dt>
          <dd className="font-semibold text-primary">{formatPrice(total)}</dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-muted-foreground">
        Payments are processed securely. Prices adapt to your active currency selection.
      </p>
    </motion.aside>
  );
}
