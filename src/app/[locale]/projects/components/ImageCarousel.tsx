"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useLocale } from "next-intl";

interface ImageCarouselProps {
  images: string[];
}
const DOT_SIZE = 8;
const MAX_VISIBLE_DOTS = 5;

const OPACITY_MAP: Record<string, string> = {
  "-1": "opacity-0",
  "0": "opacity-70",
  "1": "opacity-100",
};

interface ImageCarouselProps {
  images: string[];
}
export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: locale === "en" ? "ltr" : "rtl",
  });

  const scrollPrev: CarouselButtonProps["onPress"] = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      emblaApi && emblaApi.scrollPrev();
    },
    [emblaApi]
  );
  const scrollNext: CarouselButtonProps["onPress"] = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      emblaApi && emblaApi.scrollNext();
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const visibleDots = Math.min(images.length, MAX_VISIBLE_DOTS);

  const translation =
    (locale === "en" ? 1 : -1) *
    (-visibleDots +
      0.5 -
      getTranslationUnits(images.length, visibleDots, currentIndex) * 2) *
    DOT_SIZE;

  return (
    <div className="group aspect-[3/2] relative">
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] bg-blue-500">
              <Image
                src={image}
                alt="project image"
                width={358}
                height={240}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
      <CarouselButton
        position="left"
        onPress={scrollPrev}
        disabled={prevBtnDisabled}
      />
      <CarouselButton
        position="right"
        onPress={scrollNext}
        disabled={nextBtnDisabled}
      />
      <div
        className={`absolute pointer-events-none flex flex-row gap-2 bottom-5 start-2/4 transition-transform`}
        style={{ transform: `translatex(${translation}px)` }}
      >
        {images.map((_, index) => (
          <div
            className={`w-2 h-2 rounded-full bg-white ${
              OPACITY_MAP[
                dotVisibilityStatus(
                  index,
                  currentIndex,
                  images.length,
                  visibleDots
                )
              ]
            } transition-opacity`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

function getTranslationUnits(
  length: number,
  visibleLength: number,
  currentIndex: number
) {
  const ref = Math.floor(visibleLength / 2);
  const max = length - ref - 1;
  if (currentIndex <= ref) return 0;
  if (currentIndex >= max) return max - ref;

  return currentIndex - ref;
}

interface CarouselButtonProps {
  position: "left" | "right";
  onPress: NonNullable<React.HTMLProps<HTMLButtonElement>["onClick"]>;
  disabled: boolean;
}

function CarouselButton({ position, onPress, disabled }: CarouselButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`absolute w-8 h-8 rounded-full bg-white top-2/4 translate-y-4 ${
        position === "left" ? "start-2" : "end-2"
      } flex items-center justify-center pointer-events-none group-hover:pointer-events-auto transition-opacity opacity-0 ${
        disabled ? "group-hover:opacity-70" : "group-hover:opacity-100"
      } mirror`}
      onClick={onPress}
    >
      {position === "left" ? (
        <IoChevronBackSharp color={"#020617"} size={16} />
      ) : (
        <IoChevronForwardSharp color={"#020617"} size={16} />
      )}
    </button>
  );
}

function dotVisibilityStatus(
  dotIndex: number,
  activeIndex: number,
  totalDots: number,
  visibleDots: number
): string {
  // Check if dot is active
  if (dotIndex === activeIndex) {
    return "1";
  }

  // When active index is close to the beginning
  if (activeIndex < visibleDots / 2) {
    return 0 <= dotIndex && dotIndex < visibleDots ? "0" : "-1";
  }

  // When active index is close to the end
  if (activeIndex >= totalDots - visibleDots / 2) {
    return totalDots - visibleDots <= dotIndex && dotIndex < totalDots
      ? "0"
      : "-1";
  }

  // When active index is somewhere in the middle
  const leftBoundary = activeIndex - Math.floor((visibleDots - 1) / 2);
  const rightBoundary = activeIndex + Math.floor((visibleDots - 1) / 2);

  return leftBoundary <= dotIndex && dotIndex <= rightBoundary ? "0" : "-1";
}
