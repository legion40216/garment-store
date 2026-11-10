import type { FilterValue } from "@/schema";
import type { ProductType } from "@/types/types";
import { getFinalPrice } from "@/utils/product-helpers";

export function sortProducts(
  products: ProductType[],
  filter: FilterValue,
): ProductType[] {
  const sorted = [...products];
  const time = (product: ProductType) => new Date(product.createdAt).getTime();

  switch (filter) {
    case "newest":
      return sorted.sort((a, b) => time(b) - time(a));
    case "oldest":
      return sorted.sort((a, b) => time(a) - time(b));
    case "price_low_high":
      return sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    case "price_high_low":
      return sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    default:
      return sorted;
  }
}
