import { useLocale } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import classNames from "classnames";

export type TCarouselRenderItem<T> = (
  info: TCarouselRenderItemInfo<T>
) => React.ReactNode;
type TCarouselRenderItemInfo<T> = {
  item: T;
  index: number;
  activeIndex: number;
};

interface ReusableCarouselProps<T> {
  data: T[];
  renderItem: TCarouselRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
}
export function ReusableCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  className,
}: ReusableCarouselProps<T>) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: locale === "en" ? "ltr" : "rtl",
    },
    process.env.NODE_ENV === "development"
      ? undefined
      : [Autoplay({ stopOnInteraction: false })]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div
      className={classNames(
        "md:flex-1 flex flex-col gap-2 aspect-[3/2] overflow-hidden",
        className
      )}
    >
      {/* Carousel */}
      <div ref={emblaRef} className="flex-1 rounded overflow-hidden">
        <div className="flex h-full">
          {data.map((item, index) => (
            <div
              className="flex-[0_0_100%] relative"
              key={keyExtractor(item, index)}
            >
              {renderItem({ item, index, activeIndex })}
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex gap-2">
        {data.map((item, index) => (
          <div
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1 flex-1 rounded-[1px] transition-colors cursor-pointer duration-500 ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-800/30"
            }`}
            key={keyExtractor(item, index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
