"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { CurrencySwitcher } from "@/components/layout/CurrencySwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/cartStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Medicines" },
  { href: "/cart", label: "Cart" },
  { href: "/login", label: "Account" },
];

function useMounted() {
  const [mounted, setMounted] = useState(false);
  // Using microtask to avoid synchronous setState in effect
  if (typeof window !== "undefined" && !mounted) {
    queueMicrotask(() => setMounted(true));
  }
  return mounted;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useMounted();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur"
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] max-w-xs p-0">
              <SheetHeader className="border-b border-border/70 px-5 py-4">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Browse the Homeo storefront.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-end gap-1">
            <span className="text-xl font-semibold tracking-tight">Homeo</span>
            <span className="mb-0.5 rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
              CARE
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CurrencySwitcher />
          <Link
            href="/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white hover:bg-muted"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {mounted && itemCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
