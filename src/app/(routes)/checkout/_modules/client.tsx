"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import EmptyState from "@/components/global-ui/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { SHIPPING_FEE } from "@/data/constants";
import useCart from "@/hooks/useCartStore";
import useHydrated from "@/hooks/useHydrated";

import CheckoutForm from "./client/checkout-form";
import OrderSummary from "./client/order-summary";

// There is no backend, so the order number is made in the browser.
function createOrderNumber() {
  return `GS-${Date.now().toString(36).toUpperCase()}`;
}

export default function Client() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // The cart lives in localStorage, so wait for the browser before using it.
  // While the order is being placed the cart is emptied, so show nothing
  // rather than flashing the empty-cart message during the redirect.
  if (!hydrated || isPlacingOrder) return null;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        subtitle="Add something to your cart before checking out."
      >
        <Link
          href="/products"
          className={buttonVariants({ className: "mx-auto flex w-fit" })}
        >
          Continue shopping
        </Link>
      </EmptyState>
    );
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    // To take real orders, send the form details and `items` to your backend
    // here before clearing the cart.
    router.push(`/checkout/success?order=${createOrderNumber()}`);

    // Empty the cart directly so the "Cart cleared." toast doesn't show.
    useCart.setState({ items: [] });
    toast.add({ title: "Order placed.", type: "success" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <CheckoutForm onValid={handlePlaceOrder} />
      </div>

      <div className="lg:col-span-5">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shipping={SHIPPING_FEE}
          total={subtotal + SHIPPING_FEE}
        />
      </div>
    </div>
  );
}
