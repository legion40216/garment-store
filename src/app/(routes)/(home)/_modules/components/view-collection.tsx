import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function ViewCollection() {
  return (
    <section className="space-y-5 rounded-lg bg-muted py-12 text-center">
      <p className="text-3xl font-bold">
        Find something you&apos;ll wear on repeat
      </p>
      <Link href="/products" className={buttonVariants({ size: "lg" })}>
        Shop all products
      </Link>
    </section>
  );
}
