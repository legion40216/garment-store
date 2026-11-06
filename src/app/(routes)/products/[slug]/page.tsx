import { Home } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/data/categories";
import { products } from "@/data/data";
import type { ProductType } from "@/types/types";
import { formatter } from "@/utils/formatters";
import { getProductBySlug } from "@/utils/get-product-by-slug";
import {
  getDefaultSize,
  getFinalPrice,
  hasDiscount,
} from "@/utils/product-helpers";
import { firstParam } from "@/utils/product-url";
import AddToCart from "./_modules/components/add-to-cart";

// Every product page is built ahead of time. Slugs that aren't listed here
// still work: they render on demand and show "not found" if there is no match.
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return product
    ? { title: product.name, description: product.description }
    : { title: "Product not found" };
}

// ?size=M (from the cart or a filtered listing) pre-selects that size. Reading
// it needs the request, so it sits in Suspense and the rest of the page stays
// static.
async function Purchase({
  product,
  searchParams,
}: {
  product: ProductType;
  searchParams: PageProps<"/products/[slug]">["searchParams"];
}) {
  const { size } = await searchParams;

  return (
    <AddToCart
      product={product}
      initialSize={getDefaultSize(product, firstParam(size))}
    />
  );
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const categoryName =
    categories.find((category) => category.slug === product.category)?.name ??
    product.category;

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" aria-label="Home">
              <Home className="size-5" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`}>
              {categoryName}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />

          {hasDiscount(product) && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 z-10 px-2 py-1 text-xs"
            >
              -{product.discount}%
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-2 right-2 z-10 bg-blue-600 px-3 py-1 text-xs text-white">
              NEW
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase">
              {categoryName}
            </p>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <p className="flex items-baseline gap-3">
            <span className="text-2xl font-bold">
              {formatter.format(getFinalPrice(product))}
            </span>
            {hasDiscount(product) && (
              <span className="text-sm text-muted-foreground line-through">
                {formatter.format(product.price)}
              </span>
            )}
          </p>

          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <Purchase product={product} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
