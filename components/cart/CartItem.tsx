"use client";

import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { useCurrencyStore } from "@/lib/store/currencyStore";
import { useCartStore } from "@/lib/store/cartStore";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const decrease = () =>
    updateQuantity(item.product.id, item.selectedPotency, item.quantity - 1);
  const increase = () =>
    updateQuantity(item.product.id, item.selectedPotency, item.quantity + 1);
  const remove = () => removeItem(item.product.id, item.selectedPotency);

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">{item.selectedPotency}</p>
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">
            Unit price {formatPrice(item.product.price)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</p>
          <p className="text-xl font-semibold text-primary">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-border p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={decrease}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[2ch] text-center font-semibold">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={increase}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          className="text-sm text-muted-foreground"
          onClick={remove}
          aria-label="Remove item"
        >
          <X className="mr-2 h-4 w-4" /> Remove
        </Button>
      </div>
    </article>
  );
}
