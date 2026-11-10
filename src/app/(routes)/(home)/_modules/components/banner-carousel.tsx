"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Both banners are 1880x720.
const banners = [
  {
    src: "/assets/banners/Web_Banner1.png",
    alt: "Summer clearance sale, up to 50% off",
  },
  {
    src: "/assets/banners/Web_Banne2.png",
    alt: "The Fall Collection, autumn arrivals now available",
  },
];

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setSlideCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section aria-label="Promotions">
      <Carousel
        plugins={[autoplay]}
        opts={{ loop: true }}
        setApi={setApi}
        className="relative"
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: hover only pauses the autoplay, it is not a control */}
        <div
          onMouseEnter={() => autoplay.stop()}
          onMouseLeave={() => autoplay.play()}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.src}>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    width={1880}
                    height={720}
                    sizes="(min-width: 1200px) 1200px, 100vw"
                    priority={index === 0}
                    className="h-auto w-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <CarouselPrevious className="absolute top-1/2 left-2 hidden -translate-y-1/2 sm:flex" />
        <CarouselNext className="absolute top-1/2 right-2 hidden -translate-y-1/2 sm:flex" />
      </Carousel>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional and never reorder
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selectedIndex === index}
            onClick={() => api?.scrollTo(index)}
            className={`size-2 rounded-full transition-colors ${
              selectedIndex === index ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
