"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="py-10 sm:py-14">
      <div className="container-shell">
        <h2 className="mb-6 text-3xl">Featured medicines</h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
