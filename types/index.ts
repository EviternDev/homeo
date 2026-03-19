// Product Types
export const PRODUCT_CATEGORY_MAP = {
  bottled: ["mother-tinctures", "dilutions", "liquid-combinations"],
  pills: ["globules", "tablets", "bio-combinations"],
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORY_MAP;
export type ProductSubcategory =
  (typeof PRODUCT_CATEGORY_MAP)[ProductCategory][number];

export const PRODUCT_CATEGORIES: ProductCategory[] = Object.keys(
  PRODUCT_CATEGORY_MAP
) as ProductCategory[];

export const PRODUCT_SUBCATEGORIES: ProductSubcategory[] = Object.values(
  PRODUCT_CATEGORY_MAP
).reduce<ProductSubcategory[]>(
  (acc, subcategories) => acc.concat(subcategories),
  []
);

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  potency: string[];
  price: number; // Base price in INR
  images: string[];
  description: string;
  benefits: string[];
  dosage: string;
  ingredients: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedPotency: string;
}

// Currency Types
export const SUPPORTED_CURRENCY_CODES = [
  "INR",
  "USD",
  "EUR",
  "GBP",
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCY_CODES)[number];

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Rate relative to INR
}

// User Types (for future auth)
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: ProductSubcategory;
  priceRange?: [number, number];
  potency?: string;
  inStock?: boolean;
  search?: string;
}

// Sort Types
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-asc' | 'name-desc';
