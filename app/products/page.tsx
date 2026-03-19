"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCategory, Product, SortOption } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";

function sortProducts(list: Product[], sortBy: SortOption) {
  const clone = [...list];
  switch (sortBy) {
    case "price-low":
      return clone.sort((a, b) => a.price - b.price);
    case "price-high":
      return clone.sort((a, b) => b.price - a.price);
    case "rating":
      return clone.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return clone.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return clone.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return clone;
  }
}

export default function ProductsPage() {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const visible = products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.subcategory.toLowerCase().includes(normalized);
      return categoryMatch && searchMatch;
    });

    return sortProducts(visible, sortBy);
  }, [category, search, sortBy]);

  return (
    <section className="py-8 sm:py-12">
      <div className="container-shell">
        <h1 className="mb-2 text-4xl">Medicines</h1>
        <p className="mb-6 text-muted-foreground">Browse bottled medicines and pills with modern filtering.</p>

        <ProductFilters
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
