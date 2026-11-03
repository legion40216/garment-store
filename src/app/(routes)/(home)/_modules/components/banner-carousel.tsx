"use client";
import banner1 from "/public/images/banners/Web_Banne2.png";
import banner2 from "/public/images/banners/Web_Banner1.png";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";

export function BannerCarousel() {
  const banners = [{ img: banner1 }, { img: banner2 }];
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;
    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;
    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;

    onSelect();
    setScrollSnaps(carouselAPI.scrollSnapList());
    carouselAPI.on("select", onSelect);
  }, [carouselAPI, onSelect]);

  return (
    <div className="relative">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true, align: "center" }}
        setApi={setCarouselAPI}
        className="relative"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center"
              onMouseEnter={() => autoplay.current.stop()}
              onMouseLeave={() => autoplay.current.play()}
            >
              {/* Option 1: Add rounded corners to the container */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={banner.img.src}
                  alt="banner"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Option 2: Add rounded corners directly to the image */}
              {/* <div>
                <img
                  src={banner.img.src}
                  alt="banner"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div> */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <>
          <CarouselPrevious className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2" />
        </>
      </Carousel>
      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            onClick={() => scrollTo(index)}
            size="icon"
            className={`w-2 h-2 rounded-full ${
              selectedIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}