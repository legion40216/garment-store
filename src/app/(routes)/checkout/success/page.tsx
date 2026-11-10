import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { firstParam } from "@/utils/product-url";

export const metadata: Metadata = {
  title: "Order placed",
};

// Order numbers look like "GS-MABC123". Anything else in ?order= is ignored,
// so the page can't be made to display arbitrary text.
const ORDER_NUMBER = /^GS-[0-9A-Z]{4,16}$/;

// ?order= is read from the request, so it sits in Suspense and the rest of the
// page stays static.
async function Success({
  searchParams,
}: {
  searchParams: PageProps<"/checkout/success">["searchParams"];
}) {
  const order = firstParam((await searchParams).order);
  const orderNumber = order && ORDER_NUMBER.test(order) ? order : undefined;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <CircleCheck className="size-14 text-green-600" aria-hidden="true" />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Your order has been placed. You&apos;ll pay in cash when it arrives.
        </p>
      </div>

      {orderNumber && (
        <p className="rounded-md bg-muted px-4 py-2 text-sm">
          Order number: <span className="font-semibold">{orderNumber}</span>
        </p>
      )}

      <Link href="/products" className={buttonVariants()}>
        Continue shopping
      </Link>
    </div>
  );
}

export default function SuccessPage(props: PageProps<"/checkout/success">) {
  return (
    <Suspense fallback={<Skeleton className="mx-auto my-16 h-64 max-w-md" />}>
      <Success searchParams={props.searchParams} />
    </Suspense>
  );
}
