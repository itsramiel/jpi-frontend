"use client";
import Image from "next/image";
import { ReusableCarousel, TCarouselRenderItem } from "./ReusableCarousel";
import { useCallback } from "react";

interface DiscoverCarouselProps {
  images: Array<{ name: string; alt: string }>;
}

export function DiscoverCarousel({ images }: DiscoverCarouselProps) {
  const renderItem: TCarouselRenderItem<
    DiscoverCarouselProps["images"][number]
  > = useCallback(
    ({ item: image }) => (
      <div className="h-full w-full">
        <Image
          width={600}
          height={600}
          src={image.name}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    ),
    []
  );
  return (
    <ReusableCarousel
      data={images}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderItem}
    />
  );
}
