"use client";
import Image from "next/image";
import { ReusableCarousel } from "./ReusableCarousel";

interface ProjectsCarouselProps {
  images: Array<{ name: string; alt: string }>;
}

export function ProjectsCarousel({ images }: ProjectsCarouselProps) {
  return (
    <ReusableCarousel
      data={images}
      keyExtractor={(_, index) => String(index)}
      renderItem={(image) => (
        <Image
          width={600}
          height={600}
          src={image.name}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      )}
    />
  );
}
