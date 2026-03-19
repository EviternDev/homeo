import { products } from "@/data/products";
import { Product } from "@/types";
import { parseProductCategory } from "@/lib/guards";

type GetProductsFilters = {
  category?: unknown;
};

export function getProducts(filters?: GetProductsFilters): Product[] {
  if (!filters?.category) {
    return products;
  }

  const category = parseProductCategory(filters.category);
  if (!category) {
    return products;
  }

  return products.filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.trim().toLowerCase();
  return products.find((product) => product.slug.toLowerCase() === normalized);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const peers = products.filter(
    (candidate) =>
      candidate.category === product.category && candidate.id !== product.id
  );
  return peers.slice(0, limit);
}
