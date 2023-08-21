"use client";
import { useTranslations } from "next-intl";

import { DUMMY_PROJECTS_AR, DUMMY_PROJECTS_EN } from "./dummydata";
import { BasePageProps } from "@/types";
import { ImageCarousel } from "./components";

export default function Page({ params: { locale } }: BasePageProps) {
  const t = useTranslations("projects");
  return (
    <div className="my-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-950 text-4xl font-bold">{t("title")}</h1>
        <h2 className="text-gray-600 font-medium">{t("description")}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-10">
        {(locale === "en" ? DUMMY_PROJECTS_EN : DUMMY_PROJECTS_AR).map(
          (project) => (
            <div className="flex flex-col gap-1" key={project.id}>
              <ImageCarousel images={project.images} />
              <div className="flex flex-row flex-wrap gap-1">
                {project.availablePropertyTypes.map((propertyType) => (
                  <div
                    key={propertyType.id}
                    className="py-1 px-2 bg-zinc-600 rounded"
                  >
                    <p className="text-white text-xs">{propertyType.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-gray-800 text-2xl font-bold">
                    {project.name}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">
                    {project.city}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">
                    {project.distancePhrase}
                  </p>
                </div>
                <p className="text-gray-800 text-sm font-bold">
                  {Intl.NumberFormat(locale, {
                    style: "currency",
                    currency: project.price.currency,
                    maximumFractionDigits: 0,
                  }).format(project.price.value)}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
