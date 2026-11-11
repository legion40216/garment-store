import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function ViewCollection() {
  return (
    <section className="space-y-5 rounded-lg bg-muted px-4 py-12 text-center">
      <p className="text-3xl font-bold">
        Find something you&apos;ll wear on repeat
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link href="/products" className={buttonVariants({ size: "lg" })}>
          Shop all products
        </Link>
        <Link
          href="/products?new=true"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          New arrivals
        </Link>
        <Link
          href="/products?sale=true"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          Sale
        </Link>
      </div>
    </section>
  );
}
