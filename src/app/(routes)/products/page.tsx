import type { Metadata } from "next";
import { Suspense } from "react";

import ProductSection from "@/features/product-listing/product-section";
import ProductsSkeleton from "@/features/product-listing/products-skeleton";
import { resolveListingParams } from "@/utils/resolve-listing-params";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products, filter by season, size and price.",
};

// Filters live in the URL (?category=winter&size=M&...), so this has to be
// read at request time, inside Suspense, to keep the rest of the page static.
async function Listing({
  searchParams,
}: {
  searchParams: PageProps<"/products">["searchParams"];
}) {
  const params = await resolveListingParams(searchParams, "/products");

  // Linking to ?new=true or ?sale=true on its own gives a matching page title,
  // like a dedicated "New arrivals" or "Sale" collection.
  const headingTitle =
    params.new && !params.sale
      ? "New arrivals"
      : params.sale && !params.new
        ? "Sale"
        : "Products";

  return (
    <ProductSection
      categoryParam={params.category}
      filterParam={params.filter}
      sizeParam={params.size}
      minPrice={params.minPrice}
      maxPrice={params.maxPrice}
      featuredParam={params.featured}
      newParam={params.new}
      saleParam={params.sale}
      inStockParam={params.inStock}
      headingTitle={headingTitle}
    />
  );
}

export default function ProductsPage(props: PageProps<"/products">) {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <Listing searchParams={props.searchParams} />
    </Suspense>
  );
}
