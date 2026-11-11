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
  // sold-out status for that size only.
  selectedSize?: ProductSize;
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
      className="group relative block min-w-0 overflow-hidden rounded-lg bg-muted"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            inStock ? "" : "opacity-60"
          }`}
        />

        {hasDiscount(product) && (
          <Badge
            variant="destructive"
            className="absolute left-3 top-3 z-10 rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-wide"
          >
            -{product.discount}%
          </Badge>
        )}

        {product.isNew && (
          <Badge className="absolute right-3 top-3 z-10 rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            New
          </Badge>
        )}

        {!inStock && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-white/45">
            <span className="border border-primary/20 bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
              Sold out
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 z-20 bg-white/90 px-3 py-3 text-center backdrop-blur-[2px]">
          <p className="truncate text-xs font-normal text-neutral-800 sm:text-sm">
            {product.name}
          </p>
          <p className="mt-1 flex items-baseline justify-center gap-2 text-sm font-semibold text-primary">
            <span>{formatter.format(getFinalPrice(product))}</span>
            {hasDiscount(product) && (
              <span className="text-xs font-normal text-neutral-500 line-through">
                {formatter.format(product.price)}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
