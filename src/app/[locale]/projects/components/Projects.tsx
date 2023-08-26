"use client";
import { useTranslations } from "next-intl";
import { ImageCarousel } from "./ImageCarousel";
import { TProject } from "../types";
import { useRouter } from "next-intl/client";

interface ProjectsProps {
  projects: TProject[];
}
export const Projects = ({ projects }: ProjectsProps) => {
  const router = useRouter();
  const t = useTranslations("projects.labels");
  return projects.map(({ id, attributes }) => {
    const propertyTypes = Array.from(
      new Set(
        attributes.propertyTypes.map(
          (propertyType) => propertyType.property.category
        )
      )
    );

    const firstNearbyPOI = attributes.nearbyPOI[0];
    const formatter = new Intl.NumberFormat(attributes.locale, {
      style: "unit",
      unit: firstNearbyPOI.unit,
    });
    const distancePhrase = t("distancePhrase", {
      distance: formatter.format(firstNearbyPOI.distance),
      place: firstNearbyPOI.name,
    });
    return (
      <div
        className="flex flex-col gap-1 p-3 rounded transition duration-300 border-2 border-white hover:border-yellow-500 hover:-translate-y-2 cursor-pointer"
        key={id}
        onClick={() => router.push(`/projects/${id}`)}
      >
        <ImageCarousel images={attributes.images} />
        <div className="flex flex-row flex-wrap gap-1">
          {propertyTypes.map((propertyType) => (
            <div key={propertyType} className="py-1 px-2 bg-zinc-600 rounded">
              <p className="text-white text-xs">{propertyType}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-gray-800 text-2xl font-bold">
              {attributes.name}
            </p>
            <p className="text-gray-600 text-sm font-medium">
              {attributes.city}
            </p>
            <p className="text-gray-500 text-xs font-medium">
              {distancePhrase}
            </p>
          </div>
          <p className="text-gray-800 text-sm font-bold">
            {Intl.NumberFormat(attributes.locale, {
              style: "currency",
              currency: attributes.pricing.currency,
              maximumFractionDigits: 0,
            }).format(attributes.pricing.startingPrice)}
          </p>
        </div>
      </div>
    );
  });
};