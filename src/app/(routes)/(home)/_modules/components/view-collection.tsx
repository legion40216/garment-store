import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function ViewCollection() {
  return (
    <section className="space-y-5 bg-[#f1f1f1] px-5 py-12 text-center sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Discover your next favourite
      </p>
      <h2 className="text-xl font-medium uppercase tracking-wide text-neutral-900 sm:text-2xl">
        Find something you will wear on repeat
      </h2>
      <p className="mx-auto max-w-xl text-sm leading-6 text-neutral-600">
        Explore seasonal pieces, fresh arrivals and selected styles from the collection.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/products" className={buttonVariants({ size: "lg" })}>
          Shop all products
        </Link>
        <Link
          href="/products?new=true"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          New arrivals
        </Link>
      </div>
    </section>
  );
}
