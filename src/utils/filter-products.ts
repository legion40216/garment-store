import type { CategorySlug, SizeFilter } from "@/schema";
import type { ProductType } from "@/types/types";
import {
  getFinalPrice,
  isProductInStock,
  isSizeInStock,
} from "@/utils/product-helpers";

export interface ProductFilters {
  categoryParam: CategorySlug;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  featuredParam: boolean;
  inStockParam: boolean;
  queryParam?: string;
}

export function filterProducts(
  products: ProductType[],
  {
    categoryParam,
    sizeParam,
    minPrice,
    maxPrice,
    featuredParam,
    inStockParam,
    queryParam = "",
  }: ProductFilters,
): ProductType[] {
  const query = queryParam.toLowerCase().trim();

  return products.filter((product) => {
    if (categoryParam !== "all" && product.category !== categoryParam) {
      return false;
    }

    if (
      query &&
      ![product.name, product.description, product.category].some((value) =>
        value.toLowerCase().includes(query),
      )
    ) {
      return false;
    }

    if (featuredParam && !product.isFeatured) return false;

    const price = getFinalPrice(product);
    if (price < minPrice || price > maxPrice) return false;

    // With a size filter, the product must come in that size (and, with
    // "in stock only", have that size in stock).
    if (sizeParam) {
      const option = product.sizes.find((o) => o.size === sizeParam);
      if (!option) return false;

      return !inStockParam || isSizeInStock(option);
    }

    return !inStockParam || isProductInStock(product);
  });
}
