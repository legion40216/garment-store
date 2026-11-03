// app/collections/[collectionId]/_modules/components/client.tsx
"use client";

import React, { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductList from "@/components/global-ui/product-list";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  new: boolean;
  discount: number;
};

interface ClientProps {
  initialData: Product[];
  categoryName: string;
}

export default function Client({ initialData, categoryName }: ClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "featured";

  // Sort products based on query
  const sortedProducts = useMemo(() => {
    if (sort === "lowToHigh") {
      return [...initialData].sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      return [...initialData].sort((a, b) => b.price - a.price);
    }
    return initialData;
  }, [initialData, sort]);

  // Update query param on selection
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="size-5" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Heading */}
        <h1 className="text-4xl font-bold">{categoryName}</h1>

        {/* Sort dropdown */}
        <div className="flex justify-end">
          <Select onValueChange={handleSortChange} value={sort}>
            <SelectTrigger className="w-full max-w-[250px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="lowToHigh">Price, low to high</SelectItem>
              <SelectItem value="highToLow">Price, high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product List */}
      <ProductList initialData={sortedProducts} />
    </div>
  );
}
