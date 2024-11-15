"use client";

import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useLocale } from "next-intl";

import { FilledImage } from "@/components";

interface ImageCarouselProps {
  images: string[];
}

interface ImageCarouselProps {
  images: string[];
}
export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: locale === "en" ? "ltr" : "rtl",
    },
    [Autoplay({ stopOnInteraction: true })]
  );

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

  return (
    <div className="group aspect-video relative">
      <div ref={emblaRef} className="overflow-hidden h-full rounded">
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] relative">
              <FilledImage src={image} alt="project image" />
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
      <div className="absolute py-1 px-3 rounded bottom-4 bg-gray-900 opacity-80 left-1/2 -translate-x-2/4">
        <p className="text-gray-100 text-sm">{`${currentIndex + 1} / ${
          images.length
        }`}</p>
      </div>
    </div>
  );
};

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
      } flex items-center justify-center transition-opacity ${
        disabled ? "opacity-70" : "opacity-100"
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
