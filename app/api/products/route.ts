import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api/products";
import { ProductListResponse } from "@/lib/api/contracts";
import { ProductCategory } from "@/types";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCategory = searchParams.get("category")?.toLowerCase() ?? null;
  const allowedCategories: ProductCategory[] = ["bottled", "pills"];
  const category =
    rawCategory &&
    allowedCategories.includes(rawCategory as ProductCategory)
      ? (rawCategory as ProductCategory)
      : undefined;

  const rawSearch = searchParams.get("search");
  const search = rawSearch ? rawSearch.trim().slice(0, 80).toLowerCase() : "";

  const filtered = getProducts().filter((product) => {
    const categoryMatch = !category || product.category === category;
    const searchMatch =
      search.length === 0 ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.subcategory.toLowerCase().includes(search);
    return categoryMatch && searchMatch;
  });

  const filters: ProductListResponse["meta"]["filters"] = {};
  if (category) {
    filters.category = category;
  }
  if (search) {
    filters.search = search;
  }

  const payload: ProductListResponse = {
    data: filtered,
    meta: {
      count: filtered.length,
      filters,
    },
  };

  return NextResponse.json(payload);
}
