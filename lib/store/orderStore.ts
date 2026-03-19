"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderCreatePayload } from "@/types";

type OrderStore = {
  orders: Record<string, Order>;
  lastOrderId: string | null;
  createOrder: (payload: OrderCreatePayload) => Order;
  saveOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  clearOrders: () => void;
};

const generateOrderId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `order_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
};

const createOrderFromPayload = (payload: OrderCreatePayload): Order => {
  const createdAt = new Date();
  const id = generateOrderId();
  const uniqueSuffix = id.split("-").at(-1)?.slice(0, 6).toUpperCase() ?? id.slice(0, 6).toUpperCase();
  const orderNumber = `HM-${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, "0")}-${uniqueSuffix}`;
  const estimatedDelivery = payload.estimatedDelivery ?? new Date(createdAt.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString();

  return {
    id,
    orderNumber,
    items: payload.items,
    subtotal: payload.subtotal,
    shipping: payload.shipping,
    total: payload.total,
    shippingAddress: payload.shippingAddress,
    paymentMethod: payload.paymentMethod,
    status: payload.status ?? "pending",
    createdAt: createdAt.toISOString(),
    estimatedDelivery,
  };
};

const sanitizeOrders = (value: unknown): Record<string, Order> => {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value as Record<string, Order>).reduce<Record<string, Order>>(
    (acc, [id, order]) => {
      if (order && typeof order === "object" && typeof id === "string" && "id" in order) {
        acc[id] = order;
      }
      return acc;
    },
    {}
  );
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: {},
      lastOrderId: null,
      createOrder: (payload) => {
        const order = createOrderFromPayload(payload);
        set((state) => ({
          orders: {
            ...state.orders,
            [order.id]: order,
          },
          lastOrderId: order.id,
        }));
        return order;
      },
      saveOrder: (order) =>
        set((state) => ({
          orders: {
            ...state.orders,
            [order.id]: order,
          },
          lastOrderId: order.id,
        })),
      getOrderById: (id) => get().orders[id],
      clearOrders: () => set({ orders: {}, lastOrderId: null }),
    }),
    {
      name: "homeo-orders",
      partialize: (state) => ({ orders: state.orders, lastOrderId: state.lastOrderId }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<OrderStore> | undefined;
        const orders = sanitizeOrders(persisted?.orders);
        const lastOrderId = typeof persisted?.lastOrderId === "string" ? persisted?.lastOrderId : null;
        return {
          ...currentState,
          orders,
          lastOrderId,
        };
      },
    }
  )
);
