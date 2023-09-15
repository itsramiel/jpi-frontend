/*eslint i18next/no-literal-string: 0*/

"use client";
import Image from "next/image";
import { ReusableCarousel, TCarouselRenderItem } from "./ReusableCarousel";
import { useCallback } from "react";
import classNames from "classnames";

interface ProjectsCarouselProps {
  images: Array<{ name: string; alt: string }>;
}

export function ProjectsCarousel({ images }: ProjectsCarouselProps) {
  const renderItem: TCarouselRenderItem<
    ProjectsCarouselProps["images"][number]
  > = useCallback(
    ({ item: image, activeIndex, index }) => (
      <div className="h-full w-full relative">
        <Image
          width={600}
          height={600}
          src={image.name}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        <div
          className={classNames(
            "absolute left-0 top-0 w-full h-full flex flex-col items-center justify-end pb-6 transition-colors ease-in-out",
            index === activeIndex ? "bg-black/0" : "bg-black/30"
          )}
        >
          <p
            className={classNames(
              "text-white text-4xl transition-[transform,opacity] ease-in-out",
              index === activeIndex
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            )}
          >
            hello there
          </p>
        </div>
      </div>
    ),
    []
  );

  const keyExtractor = useCallback(
    (_: unknown, index: number) => String(index),
    []
  );

  return (
    <ReusableCarousel
      data={images}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
