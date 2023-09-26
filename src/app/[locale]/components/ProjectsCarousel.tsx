"use client";
import Image from "next/image";
import { useCallback } from "react";
import classNames from "classnames";

import { useRouter } from "@/hooks";

import { ReusableCarousel, TCarouselRenderItem } from "./ReusableCarousel";
import { TProject } from "../types";

interface ProjectsCarouselProps {
  data: Array<TProject>;
}

export function ProjectsCarousel({ data }: ProjectsCarouselProps) {
  const router = useRouter();

  const renderItem: TCarouselRenderItem<ProjectsCarouselProps["data"][number]> =
    useCallback(
      ({ item, activeIndex, index }) => (
        <div
          className="h-full w-full relative cursor-pointer"
          onClick={() => router.push(`/projects/${item.id}`)}
        >
          <Image
            width={600}
            height={600}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.attributes.images.data[0].attributes.url}`}
            alt={`${item.attributes.name}, ${item.attributes.city}`}
            className="w-full h-full object-cover"
          />
          <div
            className={classNames(
              "absolute left-0 top-0 w-full h-full flex flex-col items-center justify-end pb-6",
              " transition-colors delay-1000 duration-500 ease-out",
              index === activeIndex ? " bg-black/30" : "bg-black/0"
            )}
          >
            <p
              className={classNames(
                "text-white text-4xl",
                "transition-[transform,opacity] ease-in-out delay-[1400ms] duration-300",
                index === activeIndex
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0"
              )}
            >
              {item.attributes.name}
            </p>
          </div>
        </div>
      ),
      [router]
    );

  const keyExtractor = useCallback(
    (_: unknown, index: number) => String(index),
    []
  );

  return (
    <ReusableCarousel
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
