import type { ProductSize } from "@/types/types";

// One line in the cart = one product in one size
export type CartProduct = {
  id: string; // line id: product + size (see getCartLineId)
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: ProductSize;
  price: number; // final unit price (discount already applied)
  stock: number; // stock of this size
};

export type CartItemType = CartProduct & {
  count: number;
};
