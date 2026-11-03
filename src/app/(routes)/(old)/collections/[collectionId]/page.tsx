// app/collections/[collectionId]/page.tsx (server component)

import React from "react";
import { categories } from "@/data/categories";
import products from "@/data/product";
import Client from "./_modules/components/client";
import EmptyState from "@/components/global-ui/empty-state";

interface PageProps {
  params: Promise<{ collectionId: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: PageProps) {
  const { collectionId } = await params;
  const categoryName = categories.find(
    (category) => category.id === Number(collectionId)
  )?.title ?? "Unknown";

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  if (filteredProducts.length === 0) {
    return (
      <EmptyState 
        title="No products found"
        subtitle="This category has no products"
      />
    );
  }

  return (
    <Client
      initialData={filteredProducts}
      categoryName={categoryName}
    />
  );
}