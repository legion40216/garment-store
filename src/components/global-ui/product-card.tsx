import React from "react";
import Link from "next/link";
import { formatter } from "@/utils/formatters";

import { Badge } from "@/components/ui/badge";

type ProductCardTypes = {
  id: number;
  title: string;
  price: number;
  image: string;
  discount: number;
  new: boolean;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  discount,
  new: isNew,
}: ProductCardTypes) {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg 
      transition-shadow duration-200"
      >
        <div className="relative aspect-[2/3]">
          {/* Discount Badge */}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 z-20 text-xs px-2 py-1"
            >
              -{discount}%
            </Badge>
          )}
          {/* New Badge */}
          {isNew && (
            <Badge className="absolute top-2 right-2 z-20 bg-blue-600 text-white text-xs px-3 py-1">
              NEW
            </Badge>
          )}

          {/* Product Image */}
          <img
            src={image}
            alt={title}
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-2 text-center space-y-1">
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
          <p className="text-base font-bold text-gray-900">
            {formatter.format(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
