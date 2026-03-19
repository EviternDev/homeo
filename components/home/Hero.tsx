"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-5"
        >
          <p className="inline-flex rounded-full border border-primary/20 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Homeopathic Essentials
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Fresh wellness store for bottled remedies and pill medicines.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Discover curated homeopathic medicines, clean product details, and effortless cart flow with
            premium modern UI.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="inline-flex">
              <Button size="lg" className="rounded-full px-7">
                Shop Medicines
              </Button>
            </Link>
            <Link href="/products?category=bottled" className="inline-flex">
              <Button variant="outline" size="lg" className="rounded-full px-7">
                Explore Bottled
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-4xl border border-border/80 bg-white/75 p-6 shadow-[0_14px_45px_-22px_rgba(31,60,40,0.35)] backdrop-blur"
        >
          <div className="hero-orb absolute -right-14 -top-16 h-44 w-44" />
          <div className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-secondary via-background to-accent/35 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Featured Bundle</p>
              <h3 className="mt-2 text-2xl">Daily Family Care Kit</h3>
              <p className="mt-2 text-sm text-muted-foreground">Includes 3 bottled tinctures + 2 pill remedies</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Fast Dispatch</p>
                <p className="mt-1 text-xl font-semibold">24 hrs</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Trusted Products</p>
                <p className="mt-1 text-xl font-semibold">12+ SKUs</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
