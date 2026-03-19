"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/layout/ToastProvider";
import { useOrderStore } from "@/lib/store/orderStore";

export function OrderSuccessToastHandler() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const getOrderById = useOrderStore((state) => state.getOrderById);

  useEffect(() => {
    const orderSuccess = searchParams.get("orderSuccess");
    const orderId = searchParams.get("orderId");

    if (orderSuccess === "true" && orderId) {
      const order = getOrderById(orderId);
      if (order) {
        showToast(`Order placed successfully! Order #${order.orderNumber}`, "success", {
          label: "View Order",
          href: `/order-success?id=${orderId}`,
        });
      }
    }
  }, [searchParams, showToast, getOrderById]);

  return null;
}
