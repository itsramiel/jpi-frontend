"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { ImageCarousel } from "./ImageCarousel";
import { TProject, TProperty } from "../../types";

interface ProjectsProps {
  projects: TProject[];
}
export const Projects = ({ projects }: ProjectsProps) => {
  const router = useRouter();
  const t = useTranslations("projects.labels");
  return projects.map(({ id, attributes }) => {
    const propertyTypes = Array.from(
      new Set(
        attributes.properties.data.map((property) => property.attributes.name)
      )
    );

    const cheapestProperty = getCheapestProperty(attributes.properties.data);

    if (!cheapestProperty) {
      throw Error("cannot determine cheapest property from project");
    }

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
        <ImageCarousel
          images={attributes.images.data.map(
            (item) =>
              `${process.env.NEXT_PUBLIC_SERVER_URL}${item.attributes.url}`
          )}
        />
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
              currency:
                cheapestProperty.attributes.currency.data.attributes.code,
              maximumFractionDigits: 0,
            }).format(cheapestProperty.attributes.price)}
          </p>
        </div>
      </div>
    );
  });
};

function getCheapestProperty(properties: Array<TProperty>) {
  if (properties.length === 0) return null;
  let minIndex = 0;
  let minPrice = properties[0].attributes.price;
  properties.forEach((property, index) => {
    if (property.attributes.price < minPrice) {
      minIndex = index;
      minPrice = property.attributes.price;
    }
  });
  return properties[minIndex];
}
