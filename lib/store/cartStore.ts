"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

type CartState = {
  items: CartItem[];
  subtotalInInr: number;
  itemCount: number;
  addItem: (product: Product, selectedPotency: string, quantity?: number) => void;
  removeItem: (productId: string, selectedPotency: string) => void;
  updateQuantity: (productId: string, selectedPotency: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotalInInr: () => number;
  getItemCount: () => number;
};

type PersistedCartState = Pick<CartState, "items">;

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

const clampQuantity = (value?: number): number => {
  if (!Number.isFinite(value ?? NaN)) {
    return MIN_QUANTITY;
  }
  const rounded = Math.trunc(value as number);
  if (rounded <= MIN_QUANTITY) {
    return MIN_QUANTITY;
  }
  if (rounded >= MAX_QUANTITY) {
    return MAX_QUANTITY;
  }
  return rounded;
};

const isValidProduct = (product: unknown): product is Product => {
  if (!product || typeof product !== "object") {
    return false;
  }
  const candidate = product as Product;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price)
  );
};

const sanitizeCartItems = (items: unknown): CartItem[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item): item is CartItem => {
      if (!item || typeof item !== "object") {
        return false;
      }
      const candidate = item as CartItem;
      if (!isValidProduct(candidate.product)) {
        return false;
      }
      return typeof candidate.selectedPotency === "string";
    })
    .map((item) => ({
      product: item.product,
      selectedPotency: item.selectedPotency,
      quantity: clampQuantity(item.quantity),
    }));
};

const computeDerivedTotals = (items: CartItem[]) => ({
  subtotalInInr: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  itemCount: items.reduce((count, item) => count + item.quantity, 0),
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotalInInr: 0,
      itemCount: 0,
      addItem: (product, selectedPotency, quantity = 1) => {
        const safeQuantity = clampQuantity(quantity);
        set((state) => {
          const found = state.items.find(
            (item) => item.product.id === product.id && item.selectedPotency === selectedPotency
          );

          if (found) {
            const nextItems = state.items.map((item) => {
              if (item.product.id === product.id && item.selectedPotency === selectedPotency) {
                return {
                  ...item,
                  quantity: clampQuantity(item.quantity + safeQuantity),
                };
              }
              return item;
            });
            return {
              items: nextItems,
              ...computeDerivedTotals(nextItems),
            };
          }

          const nextItems = [
            ...state.items,
            { product, selectedPotency, quantity: safeQuantity },
          ];
          return {
            items: nextItems,
            ...computeDerivedTotals(nextItems),
          };
        });
      },
      removeItem: (productId, selectedPotency) => {
        set((state) => {
          const nextItems = state.items.filter(
            (item) => !(item.product.id === productId && item.selectedPotency === selectedPotency)
          );
          return {
            items: nextItems,
            ...computeDerivedTotals(nextItems),
          };
        });
      },
      updateQuantity: (productId, selectedPotency, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedPotency);
          return;
        }

        const safeQuantity = clampQuantity(quantity);
        set((state) => {
          const nextItems = state.items.map((item) =>
            item.product.id === productId && item.selectedPotency === selectedPotency
              ? { ...item, quantity: safeQuantity }
              : item
          );
          return {
            items: nextItems,
            ...computeDerivedTotals(nextItems),
          };
        });
      },
      clearCart: () => set({ items: [], subtotalInInr: 0, itemCount: 0 }),
      getSubtotalInInr: () => get().subtotalInInr,
      getItemCount: () => get().itemCount,
    }),
    {
      name: "homeo-cart",
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => {
        const persistedItems = sanitizeCartItems(
          (persistedState as PersistedCartState | undefined)?.items
        );
        return {
          ...currentState,
          items: persistedItems,
          ...computeDerivedTotals(persistedItems),
        };
      },
    }
  )
);
