"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LatestProductCarousel from "../components/latest-product-carousel";

interface Category {
  id: number;
  title: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  new: boolean;
  discount: number;
}

interface LatestProductSectionProps {
  collectionData: Category[];
  products: Product[];
}

export default function LatestProductSection({
  collectionData,
  products,
}: LatestProductSectionProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    const filtered = products.filter((item) => item.category === category);
    setFilteredProducts(filtered);
  };

  const handleAll = () => {
    setSelectedCategory(null);
    setFilteredProducts(products);
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex gap-1 justify-evenly items-center flex-wrap">
        <Button
          variant="ghost"
          onClick={handleAll}
          className={selectedCategory === null ? "bg-primary text-white" : ""}
        >
          All
        </Button>

        {collectionData.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => handleCategory(item.title)}
            className={selectedCategory === item.title ? "bg-primary text-white" : ""}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {/* Carousel */}
      <div className="w-screen max-w-full min-w-[300px]">
        <LatestProductCarousel data={filteredProducts} />
      </div>
    </div>
  );
}
