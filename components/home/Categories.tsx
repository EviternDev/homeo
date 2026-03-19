"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Bottled Medicines",
    description: "Mother tinctures, dilutions, and combination drops in sealed bottles.",
    href: "/products?category=bottled",
    icon: "B",
  },
  {
    title: "Pill Medicines",
    description: "Globules, tablets, and bio-combinations with popular potencies.",
    href: "/products?category=pills",
    icon: "P",
  },
];

export function Categories() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl">Shop by medicine format</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {card.icon}
              </div>
              <h3 className="text-2xl">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
              <Link href={card.href} className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                Explore now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
