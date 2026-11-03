import React, { useEffect, useState } from "react";

import Link from "next/link";
import { formatter } from "@/utils/formatters";
import useCart from "@/hooks/useCartStore";

import { ShoppingBasket, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import CartItem from "./cart/cart-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, getTotalCount, getTotalPrice } = useCart();
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTotalCount(getTotalCount());
  }, [getTotalCount, items]);

  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="relative" variant="outline" size={"icon"}>
          <Badge className="absolute -top-2 -right-2">{totalCount}</Badge>
          <ShoppingBasket className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="[&>button]:hidden">
        <SheetTitle className="hidden">Cart</SheetTitle>

        <SheetDescription className="hidden">
          Shopping cart items and checkout
        </SheetDescription>

        <div className="flex flex-col justify-between h-full">
          <div className="grid grid-rows-[min-content_1fr_min-content] h-full">
            <div className="flex items-center justify-between p-3">
              <p className="font-semibold text-lg uppercase">Cart</p>
              <SheetTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <X className="size-5" />
                </Button>
              </SheetTrigger>
            </div>

            {/* Cart Items or Empty State */}
            {items.length === 0 ? (
              <div className="h-full grid place-items-center place-content-center bg-secondary">
                <div>
                  <ShoppingBasket className="size-6" />
                </div>
                <h3 className="text-lg uppercase">Your cart is empty</h3>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-3">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    discount={item.discount}
                    quantity={item.quantity}
                    count={item.count}
                    id={item.id}
                    setOpen={setIsOpen}
                  />
                ))}
              </div>
            )}

            <div className="space-y-4 p-3">
              <div className="flex justify-between">
                <span className="font-semibold text-lg uppercase">total</span>
                <span className="font-semibold text-lg">
                  {formatter.format(totalPrice)}
                </span>
              </div>

              <Button asChild className="w-full" disabled={items.length === 0}>
                <Link href="/checkout">
                  <ShoppingBasket className="size-6" />
                  <span className="uppercase">checkout</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
