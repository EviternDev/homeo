import {
  PRODUCT_CATEGORIES,
  SUPPORTED_CURRENCY_CODES,
  CurrencyCode,
  ProductCategory,
} from "@/types";

const PRODUCT_CATEGORY_SET = new Set<ProductCategory>(PRODUCT_CATEGORIES);
const CURRENCY_CODE_SET = new Set<CurrencyCode>(SUPPORTED_CURRENCY_CODES);

export function isProductCategory(value: unknown): value is ProductCategory {
  return (
    typeof value === "string" &&
    PRODUCT_CATEGORY_SET.has(value as ProductCategory)
  );
}

export function parseProductCategory(
  value: unknown
): ProductCategory | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const normalized = value.trim().toLowerCase();
  return PRODUCT_CATEGORY_SET.has(normalized as ProductCategory)
    ? (normalized as ProductCategory)
    : undefined;
}

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return (
    typeof value === "string" &&
    CURRENCY_CODE_SET.has(value as CurrencyCode)
  );
}

export function parseCurrencyCode(
  value: unknown
): CurrencyCode | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const normalized = value.trim().toUpperCase();
  return CURRENCY_CODE_SET.has(normalized as CurrencyCode)
    ? (normalized as CurrencyCode)
    : undefined;
}
