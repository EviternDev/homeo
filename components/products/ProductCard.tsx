"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrencyStore } from "@/lib/store/currencyStore";
import { useCartStore } from "@/lib/store/cartStore";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22 }}
      className="group rounded-3xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="mb-4 rounded-2xl bg-gradient-to-br from-secondary via-background to-accent/30 p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.category}</div>
        <h3 className="mt-2 text-lg leading-snug">{product.name}</h3>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Badge variant="secondary">{product.subcategory}</Badge>
        {!product.inStock ? <Badge variant="destructive">Out of stock</Badge> : null}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
        <p className="text-xs text-muted-foreground">{product.rating} / 5</p>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/products/${product.slug}`} className="inline-flex flex-1">
          <Button variant="outline" className="w-full rounded-full">
            View
          </Button>
        </Link>
        <Button
          className="flex-1 rounded-full"
          disabled={!product.inStock}
          onClick={() => addItem(product, product.potency[0], 1)}
        >
          Add to cart
        </Button>
      </div>
    </motion.article>
  );
}
