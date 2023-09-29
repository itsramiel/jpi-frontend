"use client";
import { Button } from "@/components";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { IconType } from "react-icons";
import {
  IoArrowForwardSharp,
  IoBarChartOutline,
  IoBulbOutline,
  IoMapOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { Seperator } from "./Seperator";

export function SellingPoints() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const t = useTranslations("homepage");
  return (
    <>
      <div
        className="flex flex-col gap-9 md:gap-16 xl:gap-24 items-center"
        ref={ref}
      >
        <div className="flex flex-col items-center gap-4">
          <h2
            className={classNames(
              "text-gray-900 text-center text-4xl font-semibold transition-[transform,opacity] duration-1000",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {t("chooseTitle")}
          </h2>
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex gap-2">
              <SellingPoint
                className={classNames(
                  "transition-[transform,opacity] duration-1000 delay-[400ms]",
                  inView
                    ? "opacity-100 transform-none"
                    : "-translate-x-2 -translate-y-2 opacity-0"
                )}
                icon={IoBarChartOutline}
                title={t("insightsTitle")}
                subtitle={t("insightsDescription")}
              />
              <SellingPoint
                className={classNames(
                  "transition-[transform,opacity] duration-1000 delay-[400ms]",
                  inView
                    ? "opacity-100 transform-none"
                    : "translate-x-2 -translate-y-2 opacity-0"
                )}
                icon={IoMapOutline}
                title={t("expertiseTitle")}
                subtitle={t("expertiseDescription")}
              />
            </div>
            <div className="flex gap-2">
              <SellingPoint
                className={classNames(
                  "transition-[transform,opacity] duration-1000 delay-[400ms]",
                  inView
                    ? "opacity-100 transform-none"
                    : "-translate-x-2 translate-y-2 opacity-0"
                )}
                icon={IoBulbOutline}
                title={t("guidanceTitle")}
                subtitle={t("guidanceDescription")}
              />
              <SellingPoint
                className={classNames(
                  "transition-[transform,opacity] duration-1000 delay-[400ms]",
                  inView
                    ? "opacity-100 transform-none"
                    : "translate-x-2 translate-y-2 opacity-0"
                )}
                icon={IoSearchOutline}
                title={t("transparencyTitle")}
                subtitle={t("transparencyDescription")}
              />
            </div>
          </div>
        </div>
        <Button
          trailingIcon={IoArrowForwardSharp}
          href="/contact"
          className={classNames(
            "transition-[transform,opacity] duration-1000 delay-[750ms]",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          {t("consultationButton")}
        </Button>
      </div>
      <Seperator
        className={classNames(
          "transition-[transform,opacity] duration-1000 delay-[950ms]",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      />
    </>
  );
}

interface SellingPointProps {
  icon: IconType;
  title: string;
  subtitle: string;
  className?: string;
}
function SellingPoint({
  icon: Icon,
  title,
  subtitle,
  className,
}: SellingPointProps) {
  return (
    <div className={classNames("flex-1 flex flex-col gap-2", className)}>
      <Icon className="text-gray-700 mirror" />
      <p className="text-gray-600 font-medium">
        <span className="text-gray-700 font-semibold">{title}</span>
        {subtitle}
      </p>
    </div>
  );
}
