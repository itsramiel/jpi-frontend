"use client";

import Image from "next/image";
import classNames from "classnames";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

import { useRouter } from "@/hooks";
import { Button, Link } from "@/components";

import { TProject } from "../types";
import { ReusableCarousel, TCarouselRenderItem } from "./ReusableCarousel";
import { Seperator } from "./Seperator";

interface InvestInProjectsProps {
  data: Array<TProject>;
}
export function InvestInProjects({ data }: InvestInProjectsProps) {
  const t = useTranslations("homepage");
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <>
      <div
        className="flex flex-col md:flex-row gap-9 md:gap-24 items-center"
        ref={ref}
      >
        <div className="md:flex-1 flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-4">
            <h2
              className={classNames(
                "text-gray-900 text-center text-4xl font-semibold transition-[transform,opacity] duration-1000",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {t("investTitle")}
            </h2>
            <p
              className={classNames(
                "text-gray-600 text-center text-base font-medium transition-[transform,opacity] delay-[400ms] duration-1000",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {t("investDescription")}
            </p>
          </div>
          <Link
            href="/projects"
            className={classNames(
              "transition-[transform,opacity] delay-[700ms] duration-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <Button trailingIcon={IoArrowForwardSharp}>
              {t("premiumPropertyButton")}
            </Button>
          </Link>
        </div>
        <ProjectsCarousel
          className={classNames(
            "self-stretch transition-[transform,opacity] delay-1000 duration-1000",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
          data={data}
        />
      </div>
      <Seperator
        className={classNames(
          "transition-opacity delay-[1200ms] duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      />
    </>
  );
}

export function ProjectsCarousel({
  data,
  className,
}: InvestInProjectsProps & { className?: string }) {
  const router = useRouter();

  const renderItem: TCarouselRenderItem<InvestInProjectsProps["data"][number]> =
    useCallback(
      ({ item, activeIndex, index }) => (
        <div
          className="h-full w-full relative cursor-pointer"
          onClick={() => router.push(`/projects/${item.id}`)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.attributes.images.data[0].attributes.url}`}
            alt={`${item.attributes.name}, ${item.attributes.city}`}
            fill
            sizes="50vw"
            quality={100}
            className="object-cover"
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
                "text-white text-4xl text-center",
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
      className={className}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}
