import type { ProductSize } from "@/types/types";

// "/products/red-puffer-coat" or "/products/red-puffer-coat?size=M"
export function getProductPath(slug: string, size?: ProductSize): string {
  return size ? `/products/${slug}?size=${size}` : `/products/${slug}`;
}

export function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
