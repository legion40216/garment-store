import React from "react";
import products from "@/data/product";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "./_modules/components/client";

export default function NewProductsPage() {
  const filteredProducts = products.filter((product) => product.new);

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        title="No new products"
        subtitle="There are no new arrivals at the moment."
      />
    );
  }

  return (
    <Client
      initialData={filteredProducts}
      categoryName="New Arrivals"
    />
  );
}
