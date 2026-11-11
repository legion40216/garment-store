import type { CategorySlug, SizeFilter } from "@/schema";
import type { ProductType } from "@/types/types";
import {
  getFinalPrice,
  hasDiscount,
  isProductInStock,
  isSizeInStock,
} from "@/utils/product-helpers";

export interface ProductFilters {
  categoryParam: CategorySlug;
  sizeParam: SizeFilter;
  minPrice: number;
  maxPrice: number;
  featuredParam: boolean;
  newParam: boolean;
  saleParam: boolean;
  inStockParam: boolean;
}

export function filterProducts(
  products: ProductType[],
  {
    categoryParam,
    sizeParam,
    minPrice,
    maxPrice,
    featuredParam,
    newParam,
    saleParam,
    inStockParam,
  }: ProductFilters,
): ProductType[] {
  return products.filter((product) => {
    if (categoryParam !== "all" && product.category !== categoryParam) {
      return false;
    }

    if (featuredParam && !product.isFeatured) return false;
    if (newParam && !product.isNew) return false;
    if (saleParam && !hasDiscount(product)) return false;

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
