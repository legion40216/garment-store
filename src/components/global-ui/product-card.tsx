import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ProductSize, ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import {
  getFinalPrice,
  getSizeOption,
  hasDiscount,
  isProductInStock,
  isSizeInStock,
} from "@/utils/product-helpers";
import { getProductPath } from "@/utils/product-url";

type ProductCardProps = {
  product: ProductType;
  // When a size filter is active the card links to that size and judges
  // "sold out" for that size only.
  selectedSize?: ProductSize;
  // Passed to next/image so the browser downloads a size that fits the grid.
  sizes?: string;
};

export default function ProductCard({
  product,
  selectedSize,
  sizes = "(min-width: 768px) 25vw, 50vw",
}: ProductCardProps) {
  const selectedOption = getSizeOption(product, selectedSize);
  const inStock = selectedOption
    ? isSizeInStock(selectedOption)
    : isProductInStock(product);

  return (
    <Link
      href={getProductPath(product.slug, selectedSize)}
      className="group block overflow-hidden rounded-lg border transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative aspect-2/3 overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            inStock ? "" : "opacity-60"
          }`}
        />

        {hasDiscount(product) && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 z-10 px-2 py-1 text-xs"
          >
            -{product.discount}%
          </Badge>
        )}

        {product.isNew && (
          <Badge className="absolute top-2 right-2 z-10 bg-blue-600 px-3 py-1 text-xs text-white">
            NEW
          </Badge>
        )}

        {!inStock && (
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 z-10 px-2 py-1 text-xs"
          >
            Sold out
          </Badge>
        )}
      </div>

      <div className="space-y-1 p-2 text-center">
        <p className="truncate text-sm font-medium">{product.name}</p>

        <p className="flex items-baseline justify-center gap-2">
          <span className="text-base font-bold">
            {formatter.format(getFinalPrice(product))}
          </span>
          {hasDiscount(product) && (
            <span className="text-xs text-muted-foreground line-through">
              {formatter.format(product.price)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
