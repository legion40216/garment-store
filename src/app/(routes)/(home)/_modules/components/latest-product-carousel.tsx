import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "@/components/global-ui/product-card";

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

interface LatestProductCarsoselProps {
  data: Product[];
}

export default function LatestProductCarsosel({
  data,
}: LatestProductCarsoselProps) {
  return (
    <div className="w-full">
      {data.length > 0 ? (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: "auto",
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    inStock={item.inStock}
                    new={item.new}
                    discount={item.discount}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <>
              <CarouselPrevious className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2" />
              <CarouselNext className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2" />
            </>
          </Carousel>
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          No products found in this category.
        </div>
      )}
    </div>
  );
}
