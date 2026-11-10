import { SIZES } from "@/data/sizes";
import { getFinalPrice } from "@/utils/product-helpers";
import { categories, type ProductCategorySlug } from "./categories";
import { products } from "./data";

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export const CURRENCY = "USD";

// Flat delivery fee added to every order at checkout (in CURRENCY).
export const SHIPPING_FEE = 5;

// Price slider step (whole currency units)
export const PRICE_STEP = 5;

// Lowest / highest final price (rounded out to PRICE_STEP) for the products in
// a category. Used as the price slider's range.
export function getPriceBounds({
  category,
}: {
  category?: ProductCategorySlug | "all";
}): { min: number; max: number } {
  const matching = products.filter(
    (product) =>
      !category || category === "all" || product.category === category,
  );

  if (matching.length === 0) return { min: 0, max: PRICE_STEP };

  const prices = matching.map(getFinalPrice);

  return {
    min: Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
    max: Math.max(
      PRICE_STEP,
      Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
    ),
  };
}

export const PRICE_BOUNDS = getPriceBounds({});

// Sizes that at least one product comes in, in canonical order.
// Drives the size filter, so unused sizes never show up.
export const availableSizes = SIZES.filter((size) =>
  products.some((product) =>
    product.sizes.some((option) => option.size === size),
  ),
);

// "All" plus every category that has at least one product, so the filters and
// home page never offer a category that would only show an empty page.
export const availableCategories = categories.filter(
  (category) =>
    category.slug === "all" ||
    products.some((product) => product.category === category.slug),
);
