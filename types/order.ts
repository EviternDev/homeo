import type { CartItem } from "@/types";

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

export interface OrderCreatePayload {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status?: OrderStatus;
  estimatedDelivery?: string;
}
