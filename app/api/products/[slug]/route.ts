import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/api/products";
import {
  NotFoundResponse,
  ProductDetailResponse,
} from "@/lib/api/contracts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const payload: NotFoundResponse = {
      error: {
        code: "NOT_FOUND",
        message: "Product not found",
      },
    };
    return NextResponse.json(payload, { status: 404 });
  }

  const payload: ProductDetailResponse = { data: product };
  return NextResponse.json(payload);
}
