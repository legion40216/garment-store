"use client";

import { useState } from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Button } from "@/components/ui/button";
import type { ProductsType } from "@/types/types";
import LatestProductCarousel from "../components/latest-product-carousel";

type CategoryTab = { name: string; slug: string };

export default function LatestProductSection({
  categories,
  products,
}: {
  categories: CategoryTab[];
  products: ProductsType;
}) {
  const [selected, setSelected] = useState("all");

  const visibleProducts =
    selected === "all"
      ? products
      : products.filter((product) => product.category === selected);

  return (
    <section className="space-y-4">
      <HeadingState
        title="Latest arrivals"
        subtitle="Fresh pieces for the season."
      />

      <div className="flex flex-wrap items-center gap-1">
        {categories.map((category) => (
          <Button
            key={category.slug}
            variant={selected === category.slug ? "default" : "ghost"}
            aria-pressed={selected === category.slug}
            onClick={() => setSelected(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <LatestProductCarousel data={visibleProducts} />
    </section>
  );
}
