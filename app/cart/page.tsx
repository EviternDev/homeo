"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const isEmpty = items.length === 0;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Your cart</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Remedies bag</h1>
          </div>
          {isEmpty ? null : (
            <Button variant="ghost" className="rounded-full" onClick={clearCart}>
              Clear cart
            </Button>
          )}
        </header>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-dashed border-primary/30 bg-gradient-to-br from-card via-background to-muted/40 p-10 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Empty aura</p>
            <h2 className="mt-4 text-2xl font-semibold">Your apothecary is clear</h2>
            <p className="mt-2 text-muted-foreground">
              Explore handcrafted remedies and add your favorite potencies to begin your healing ritual.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/products"
                className={cn(buttonVariants({ className: "rounded-full px-8" }))}
              >
                Browse products
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <motion.ul layout className="space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    layout
                    key={`${item.product.id}-${item.selectedPotency}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CartItem item={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            <CartSummary />
          </div>
        )}
      </div>
    </section>
  );
}
