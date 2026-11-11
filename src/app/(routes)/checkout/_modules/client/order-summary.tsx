import { Button } from "@/components/ui/button";
import type { CartItemType } from "@/types/cart";
import { formatter } from "@/utils/formatters";
import { CHECKOUT_FORM_ID } from "./checkout-form";
import CheckoutItem from "./checkout-item";

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
}: {
  items: CartItemType[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="space-y-6 rounded-lg bg-muted p-4 sm:p-6">
      <h2 className="text-lg font-medium">Order summary</h2>

      <ul className="space-y-5">
        {items.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </ul>

      <dl className="space-y-2 border-t pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatter.format(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd>{formatter.format(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatter.format(total)}</dd>
        </div>
      </dl>

      {/* The button sits here, but submits the form in the left column. */}
      <Button
        type="submit"
        form={CHECKOUT_FORM_ID}
        size="lg"
        className="w-full"
      >
        Place order
      </Button>
    </div>
  );
}
