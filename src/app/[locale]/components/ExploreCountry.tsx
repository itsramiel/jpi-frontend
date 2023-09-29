"use client";
import Image from "next/image";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

import { ReusableCarousel, TCarouselRenderItem } from "./ReusableCarousel";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { Seperator } from "./Seperator";

export function ExploreCountry() {
  const t = useTranslations("homepage");
  let images = [
    {
      name: "datingscout-KKsG0nU7e4E-unsplash.jpg",
      alt: t("discover.imagesAlts.famagustaCoast"),
    },
    {
      name: "katerina-bot-2ezMjZRw_tI-unsplash.jpg",
      alt: t("discover.imagesAlts.harbor"),
    },
    {
      name: "emediong-umoh-FDAP2v2u3CA-unsplash.jpg",
      alt: t("discover.imagesAlts.girneHighway"),
    },
    {
      name: "emediong-umoh-TSnBLv1VpM0-unsplash.jpg",
      alt: t("discover.imagesAlts.aerialLake"),
    },
    {
      name: "emediong-umoh-LktLUKQ6YqY-unsplash.jpg",
      alt: t("discover.imagesAlts.sportCourts"),
    },
    {
      name: "emediong-umoh-XH-fivqZp3w-unsplash.jpg",
      alt: t("discover.imagesAlts.colorFestival"),
    },
    {
      name: "emediong-umoh-wVvO_31f1O4-unsplash.jpg",
      alt: t("discover.imagesAlts.aerialFamagusta"),
    },
  ];

  images = images.map((image) => {
    image.name = `/explore/${image.name}`;
    return image;
  });

  const { inView, ref } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <>
      <div
        className="flex flex-col md:flex-row-reverse items-center gap-9 md:gap-24"
        ref={ref}
      >
        <div className="md:flex-1 flex flex-col gap-4">
          <h2
            className={classNames(
              "text-gray-900 text-center text-4xl font-semibold transition-[transform,opacity] duration-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {t("discoverTitle")}
          </h2>
          <p
            className={classNames(
              "text-gray-600 text-center text-base font-medium transition-[transform,opacity] duration-1000 delay-[400ms]",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {t("discoverDescription")}
          </p>
        </div>
        <DiscoverCarousel
          className={classNames(
            "transition-[transform,opacity] duration-1000 delay-[750ms]",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
          images={images}
        />
      </div>
      <Seperator
        className={classNames(
          "transition-opacity delay-[950ms] duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      />
    </>
  );
}

interface DiscoverCarouselProps {
  images: Array<{ name: string; alt: string }>;
  className?: string;
}

export function DiscoverCarousel({ images, className }: DiscoverCarouselProps) {
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
      className={className}
      data={images}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderItem}
    />
  );
}
