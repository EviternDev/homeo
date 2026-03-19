"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { useCurrencyStore } from "@/lib/store/currencyStore";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotalInInr());
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  const shipping = 0;
  const total = subtotal + shipping;
  const isEmpty = items.length === 0;

  return (
    <aside className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-base">
          <dt className="font-semibold">Total</dt>
          <dd className="font-semibold text-primary">{formatPrice(total)}</dd>
        </div>
      </dl>

      <Button className="mt-6 w-full rounded-full" size="lg" disabled={isEmpty}>
        Proceed to checkout
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Secure checkout powered by Homeo.
      </p>
    </aside>
  );
}
