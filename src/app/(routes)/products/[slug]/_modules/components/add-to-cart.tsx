"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";
import type { ProductSize, ProductType } from "@/types/types";
import {
  getCartLineId,
  getSizeOption,
  isSizeInStock,
  toCartProduct,
} from "@/utils/product-helpers";

export default function AddToCart({
  product,
  initialSize,
}: {
  product: ProductType;
  initialSize: ProductSize;
}) {
  const [size, setSize] = useState<ProductSize>(initialSize);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCart((state) => state.addItem);
  const items = useCart((state) => state.items);
  const hydrated = useHydrated();

  const stock = getSizeOption(product, size)?.stock ?? 0;
  const selectedQuantity = Math.min(quantity, Math.max(stock, 1));

  // The cart lives in localStorage, so it is only trusted after hydration.
  const lineId = getCartLineId(product.id, size);
  const inCart = hydrated && items.some((item) => item.id === lineId);

  const handleSizeChange = (nextSize: ProductSize) => {
    setSize(nextSize);
    setQuantity(1);
  };

  const handleAdd = () => {
    addItem(toCartProduct(product, size), selectedQuantity);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => {
            const isSelected = option.size === size;

            return (
              <Button
                key={option.size}
                type="button"
                variant={isSelected ? "default" : "outline"}
                aria-pressed={isSelected}
                disabled={!isSizeInStock(option) && !isSelected}
                onClick={() => handleSizeChange(option.size)}
                className={`min-w-11 ${
                  isSelected
                    ? "bg-brand-primary text-brand-white hover:bg-brand-black"
                    : ""
                } ${isSizeInStock(option) ? "" : "line-through"}`}
              >
                {option.size}
              </Button>
            );
          })}
        </div>

        <p
          className={`text-sm ${stock === 0 ? "text-destructive" : "text-muted-foreground"}`}
        >
          {stock === 0
            ? "This size is sold out."
            : stock <= 3
              ? `Only ${stock} left in this size.`
              : "In stock."}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex w-min items-center rounded-md border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            disabled={selectedQuantity <= 1}
            onClick={() => setQuantity(selectedQuantity - 1)}
          >
            <Minus className="size-4" />
          </Button>

          <span className="w-8 text-center" aria-live="polite">
            {selectedQuantity}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            disabled={selectedQuantity >= stock}
            onClick={() => setQuantity(selectedQuantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Button
          type="button"
          size="lg"
          className="h-12 min-h-12 flex-1 bg-brand-primary text-brand-white text-sm font-semibold uppercase tracking-wide hover:bg-brand-black"
          disabled={stock === 0 || inCart}
          onClick={handleAdd}
        >
          <ShoppingBag className="size-4" />
          {stock === 0
            ? "Sold out"
            : inCart
              ? "Already in cart"
              : "Add to cart"}
        </Button>
      </div>

      {inCart && (
        <p className="text-sm text-muted-foreground">
          Change the quantity from your cart.
        </p>
      )}
    </div>
  );
}
