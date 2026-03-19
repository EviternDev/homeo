"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { useCurrencyStore } from "@/lib/store/currencyStore";

type ProductActionsPanelProps = {
  product: Product;
};

export function ProductActionsPanel({ product }: ProductActionsPanelProps) {
  const [selectedPotency, setSelectedPotency] = useState(product.potency[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  const handleAddToCart = () => {
    if (!product.inStock) {
      return;
    }
    addItem(product, selectedPotency, quantity);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    if (Number.isNaN(next) || next < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(next);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="uppercase tracking-[0.2em]">{product.category}</span>
        <span>
          {product.rating.toFixed(1)} / 5 - {product.reviews} reviews
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-semibold leading-tight">{product.name}</h1>
      <p className="mt-4 text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.inStock ? "Ships in 24h" : "Currently unavailable"}
      </p>

      <div className="mt-6">
        <p className="text-sm font-medium text-foreground">Potency</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.potency.map((option) => {
            const isActive = option === selectedPotency;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedPotency(option)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="quantity" className="text-sm font-medium text-foreground">
          Quantity
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className="h-11 w-full rounded-full border border-border bg-background px-4 text-center text-base sm:w-24"
          />
          <div className={product.inStock ? "text-sm text-emerald-600" : "text-sm text-destructive"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full rounded-full"
        disabled={!product.inStock}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </motion.section>
  );
}
