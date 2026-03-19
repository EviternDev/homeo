import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Benefits } from "@/components/home/Benefits";
import { OrderSuccessToastHandler } from "@/components/layout/OrderSuccessToastHandler";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <OrderSuccessToastHandler />
      </Suspense>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Benefits />
    </>
  );
}
