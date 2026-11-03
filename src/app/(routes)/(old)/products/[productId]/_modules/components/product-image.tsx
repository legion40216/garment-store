import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

type Props = {
  discount: number;
  isNew: boolean;
  image: string;
  title: string;
};

export default function ProductImage({ discount, isNew, image, title }: Props) {
  return (
    <div className="rounded-md relative overflow-hidden w-full aspect-[4/5]">
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

      <Image
        src={image}
        alt={title || "Product image"}
        fill
        className="object-cover"
      />
    </div>
  );
}
