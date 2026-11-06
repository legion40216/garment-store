import type { ProductCategorySlug } from "@/data/categories";
import type { ProductSize } from "@/data/sizes";

export type { ProductSize };

// One row per size the product is made in.
export type ProductSizeOption = {
  size: ProductSize;
  stock: number; // units in stock; 0 = sold out in this size
};

export type ProductType = {
  id: string;
  slug: string; // used in the URL: /products/<slug>
  name: string;
  description: string;
  category: ProductCategorySlug;
  image: string; // path under /public, e.g. "/assets/products/red-jacket.jpeg"
  price: number; // list price in CURRENCY
  discount: number; // percent off `price` (0-100); 0 for no discount
  sizes: ProductSizeOption[];
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string; // ISO date string, used for "newest" / "oldest" sort
};

export type ProductsType = ProductType[];
