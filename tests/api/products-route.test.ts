import { describe, expect, it } from "vitest";
import { GET as listRoute } from "@/app/api/products/route";
import { GET as detailRoute } from "@/app/api/products/[slug]/route";
import { products } from "@/data/products";
import {
  NotFoundResponse,
  ProductDetailResponse,
  ProductListResponse,
} from "@/lib/api/contracts";

const baseUrl = "https://homeo.local";

function createRequest(path: string) {
  return new Request(`${baseUrl}${path}`);
}

describe("products list route", () => {
  it("filters products by valid category and search", async () => {
    const response = await listRoute(
      createRequest("/api/products?category=bottled&search=calendula")
    );
    const payload = (await response.json()) as ProductListResponse;

    expect(response.status).toBe(200);
    expect(payload.data).not.toHaveLength(0);
    payload.data.forEach((product) => {
      expect(product.category).toBe("bottled");
      expect(
        product.name.toLowerCase().includes("calendula") ||
          product.description.toLowerCase().includes("calendula") ||
          product.subcategory.toLowerCase().includes("calendula")
      ).toBe(true);
    });
    expect(payload.meta.filters.category).toBe("bottled");
    expect(payload.meta.filters.search).toBe("calendula");
  });

  it("ignores invalid categories and returns full list", async () => {
    const response = await listRoute(
      createRequest("/api/products?category=unknown-category")
    );
    const payload = (await response.json()) as ProductListResponse;

    expect(payload.data).toHaveLength(products.length);
    expect(payload.meta.filters.category).toBeUndefined();
  });

  it("trims and caps search filters before applying", async () => {
    const longSearch = `   ${"X".repeat(100)}   `;
    const response = await listRoute(
      createRequest(`/api/products?search=${encodeURIComponent(longSearch)}`)
    );
    const payload = (await response.json()) as ProductListResponse;

    const expectedSearch = "x".repeat(80);
    expect(payload.meta.filters.search).toBe(expectedSearch);
    expect(payload.meta.filters.search?.length).toBe(80);
    expect(payload.meta.filters.category).toBeUndefined();
  });
});

describe("products slug route", () => {
  it("returns the product detail payload for a valid slug", async () => {
    const slug = "nux-vomica-30c";
    const response = await detailRoute(createRequest(`/api/products/${slug}`), {
      params: Promise.resolve({ slug }),
    });
    const payload = (await response.json()) as ProductDetailResponse;

    expect(response.status).toBe(200);
    expect(payload.data.slug).toBe(slug);
    expect(payload.data).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      category: expect.any(String),
    });
  });

  it("returns not-found payload and 404 status for unknown slugs", async () => {
    const response = await detailRoute(createRequest(`/api/products/missing`), {
      params: Promise.resolve({ slug: "missing" }),
    });
    const payload = (await response.json()) as NotFoundResponse;

    expect(response.status).toBe(404);
    expect(payload.error).toMatchObject({
      code: "NOT_FOUND",
      message: "Product not found",
    });
  });
});
