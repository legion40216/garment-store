// Canonical size list, in display order. Add a size here (e.g. "XXL") before
// using it on a product; the type, URL schema and filters all follow.
export const SIZES = ["S", "M", "L", "XL"] as const;

export type ProductSize = (typeof SIZES)[number];
