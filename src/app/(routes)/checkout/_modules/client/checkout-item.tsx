"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCartStore";
import type { CartItemType } from "@/types/cart";
import { formatter } from "@/utils/formatters";
import { getProductPath } from "@/utils/product-url";

export default function CheckoutItem({ item }: { item: CartItemType }) {
  const removeItem = useCart((state) => state.removeItem);
  const updateItemCount = useCart((state) => state.updateItemCount);

  const href = getProductPath(item.slug, item.size);

  return (
    <li className="flex gap-3">
      <Link
        href={href}
        className="relative block aspect-4/5 w-20 shrink-0 overflow-hidden rounded-md border bg-muted"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={href} className="block truncate font-medium underline">
              {item.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              Size {item.size} · {formatter.format(item.price)} each
            </p>
          </div>

          <Badge variant="secondary" className="shrink-0 font-semibold">
            {formatter.format(item.price * item.count)}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center rounded-md border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Decrease quantity of ${item.name}`}
              disabled={item.count <= 1}
              onClick={() => updateItemCount(item.id, item.count - 1)}
            >
              <Minus className="size-4" />
            </Button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {item.count}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Increase quantity of ${item.name}`}
              disabled={item.count >= item.stock}
              onClick={() => updateItemCount(item.id, item.count + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 />
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
