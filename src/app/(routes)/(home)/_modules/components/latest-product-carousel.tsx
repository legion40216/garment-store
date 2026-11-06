import ProductCard from "@/components/global-ui/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ProductsType } from "@/types/types";

export default function LatestProductCarousel({
  data,
}: {
  data: ProductsType;
}) {
  if (data.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No products found in this category.
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: "auto",
        containScroll: "trimSnaps",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {data.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-[75%] pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <ProductCard
              product={product}
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 75vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 left-2 hidden -translate-y-1/2 sm:flex" />
      <CarouselNext className="absolute top-1/2 right-2 hidden -translate-y-1/2 sm:flex" />
    </Carousel>
  );
}
