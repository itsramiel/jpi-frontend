"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";

interface CarouselProps {
  images: Array<{ name: string; alt: string }>;
}
export function Carousel({ images }: CarouselProps) {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: locale === "en" ? "ltr" : "rtl",
    },
    [Autoplay({ stopOnInteraction: false })]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="md:flex-1 flex flex-col gap-2 self-start md:self-auto">
      <div ref={emblaRef} className="overflow-hidden aspect-[3/2] rounded">
        <div className="flex h-full">
          {images.map((image, index) => (
            <div className="flex-[0_0_100%]" key={index}>
              <Image
                width={600}
                height={600}
                src={image.name}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {images.map((_, index) => (
          <div
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1 flex-1 rounded-[1px] transition-colors cursor-pointer duration-500 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-800/30"
            }`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}
