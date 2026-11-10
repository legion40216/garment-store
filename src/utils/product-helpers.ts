import type { CartProduct } from "@/types/cart";
import type {
  ProductSize,
  ProductSizeOption,
  ProductType,
} from "@/types/types";

type WithSizes = Pick<ProductType, "sizes">;

// Price after the percentage discount, rounded to cents.
export function getFinalPrice(
  product: Pick<ProductType, "price" | "discount">,
): number {
  const percent = Math.min(Math.max(product.discount, 0), 100);
  return Math.round(product.price * (1 - percent / 100) * 100) / 100;
}

export function hasDiscount(product: Pick<ProductType, "discount">): boolean {
  return product.discount > 0;
}

export function getSizeOption(
  { sizes }: WithSizes,
  size: ProductSize | undefined,
): ProductSizeOption | undefined {
  return size ? sizes.find((option) => option.size === size) : undefined;
}

export function isSizeInStock(option: ProductSizeOption): boolean {
  return option.stock > 0;
}

export function isProductInStock({ sizes }: WithSizes): boolean {
  return sizes.some(isSizeInStock);
}

// Which size is selected when nothing is picked yet. A requested size (e.g.
// from ?size=M) is kept even when sold out, so the page can say so. Unknown
// sizes fall back to the first size that has stock.
export function getDefaultSize(
  product: WithSizes,
  requested?: string,
): ProductSize {
  const option =
    product.sizes.find((o) => o.size === requested) ??
    product.sizes.find(isSizeInStock) ??
    product.sizes[0];

  return option.size;
}

// One cart line per product + size, e.g. "5-M"
export function getCartLineId(productId: string, size: ProductSize): string {
  return `${productId}-${size}`;
}

export function toCartProduct(
  product: Pick<
    ProductType,
    "id" | "slug" | "name" | "image" | "price" | "discount" | "sizes"
  >,
  size: ProductSize,
): CartProduct {
  const option = getSizeOption(product, size) ?? product.sizes[0];

  return {
    id: getCartLineId(product.id, option.size),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    size: option.size,
    price: getFinalPrice(product),
    stock: option.stock,
  };
}
