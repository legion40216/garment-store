import React from "react";
import products from "@/data/product";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "./_modules/components/client";

export default function Page() {
  const discountedProducts = products.filter((product) => product.discount > 0);

  if (discountedProducts.length === 0) {
    return (
      <EmptyState
        title="No discounts available"
        subtitle="Check back later for discounted products."
      />
    );
  }

  return (
    <Client
      initialData={discountedProducts}
      categoryName="Sale"
    />
  );
}
