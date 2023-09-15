import { useLocale } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import { Fragment, useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";

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
}
export function ReusableCarousel<T>({
  data,
  renderItem,
  keyExtractor,
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
    <div className="md:flex-1 flex flex-col gap-2 self-start md:self-auto">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden aspect-[3/2] rounded">
        <div className="flex h-full">
          <div className="flex-[0_0_100%]">
            {data.map((item, index) => (
              <Fragment key={keyExtractor(item, index)}>
                {renderItem({ item, index, activeIndex })}
              </Fragment>
            ))}
          </div>
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
