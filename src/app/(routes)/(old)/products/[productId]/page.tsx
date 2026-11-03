import React from "react";
import products from "@/data/product";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProductDetials from "./_modules/components/product-details";
import EmptyState from "@/components/global-ui/empty-state";
import ProductImage from "./_modules/components/product-image";

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { productId } = await params;
  const productInfo = products.find((item) => item.id === Number(productId));

  // Handle case where product is not found
  if (!productInfo) {
    return (
      <EmptyState
        title="Product not found"
        subtitle="This product does not exist"
      />
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="size-5" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbLink href={`/collections/${productInfo.category}`}>
            <BreadcrumbPage>{productInfo.category}</BreadcrumbPage>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{productInfo.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div
        className="grid sm:grid-cols-[30%_1fr] items-center 
          gap-8"
      >
        <ProductImage
          discount={productInfo.discount}
          isNew={productInfo.new}
          image={productInfo.image}
          title={productInfo.title}
        />

        <div>
          <ProductDetials intialData={productInfo} />
        </div>
      </div>
    </div>
  );
}
