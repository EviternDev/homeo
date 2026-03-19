import { Product, ProductCategory } from "@/types";

export type ProductListResponse = {
  data: Product[];
  meta: {
    count: number;
    filters: {
      category?: ProductCategory;
      search?: string;
    };
  };
};

export type ProductDetailResponse = {
  data: Product;
};

export type NotFoundResponse = {
  error: {
    code: "NOT_FOUND";
    message: string;
  };
};
