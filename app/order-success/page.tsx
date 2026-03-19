import { Suspense } from "react";
import { OrderSuccessContent } from "@/components/order/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-gradient-to-b from-emerald-50/50 via-background to-background px-4 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="animate-pulse rounded-3xl border border-emerald-100 bg-white/70 p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100" />
              <div className="mx-auto mb-2 h-4 w-48 rounded-full bg-emerald-100" />
              <div className="mx-auto h-4 w-32 rounded-full bg-emerald-50" />
            </div>
          </div>
        </section>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
