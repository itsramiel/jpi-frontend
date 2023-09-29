"use client";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export function Partners() {
  const t = useTranslations("homepage");
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div className="flex flex-col gap-4" ref={ref}>
      <h2
        className={classNames(
          "text-gray-900 text-center text-2xl font-medium transition-[transform,opacity] duration-1000",
          inView ? "opacity-100 translate-y-0" : " opacity-0 translate-y-2"
        )}
      >
        {t("partneringTitle")}
      </h2>
      <div
        className={classNames(
          "flex flex-row flex-wrap justify-center gap-4 items-center duration-1000 delay-[400ms]",
          inView ? "opacity-100 translate-y-0" : " opacity-0 translate-y-2"
        )}
      >
        <Image
          src={"/partners/dovec-logo-light.png"}
          alt={t("dovecAlt")}
          width={100}
          height={36}
          className="w-[6.25rem] object-contain"
        />
        <Image
          src={"/partners/noyanlar-logo-light.png"}
          alt={t("noyanlarAlt")}
          width={100}
          height={23}
          className="w-[6.25rem] object-contain"
        />
      </div>
    </div>
  );
}
