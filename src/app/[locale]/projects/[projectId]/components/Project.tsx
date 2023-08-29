import Image from "next/image";
import { TProject } from "../../types";
import { IoLocationOutline, IoMapOutline, IoPinOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { SectionItems } from "./SectionItems";
import { PropertyTypesView } from "./PropertyTypesView";
import { formatCurrency } from "@/utils";
import { Contact } from "./Contact";

interface ProjectProps {
  project: TProject;
}
export const Project = ({ project }: ProjectProps) => {
  const t = useTranslations("projects");
  const locale = useLocale();
  const { pricing } = project.attributes;
  return (
    <div className="my-8 mx-auto max-w-6xl flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-gray-950 text-4xl font-bold">
            {project.attributes.name}
          </p>
          <p className="text-gray-600 text-xl font-medium">
            {project.attributes.city}
          </p>
        </div>
        <div className="aspect-video rounded overflow-hidden">
          <Image
            src={project.attributes.images[0]}
            alt="project image"
            width={358}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-900 text-2xl font-semibold">{`${t(
          "labels.aboutProject",
          { projectName: project.attributes.name }
        )}`}</p>
        <p className="text-gray-700 text-base font-medium">
          {project.attributes.description}
        </p>
      </div>
      <div className=" my-4 border-[1px] border-gray-400"></div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 relative">
        <div className="flex flex-col gap-4 flex-[2_2_0%]">
          <div className="flex flex-col gap-3">
            <SectionHeader Icon={IoPinOutline} title={t("onSiteAmenities")} />
            <SectionItems
              items={project.attributes.amenities.data.map(
                (item) => item.attributes.name
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <SectionHeader Icon={IoMapOutline} title={t("nearbyPOI")} />
            <SectionItems
              items={project.attributes.nearbyPOI.map(
                (item) =>
                  `${item.name} ~ ${new Intl.NumberFormat(locale, {
                    style: "unit",
                    unit: item.unit,
                  }).format(item.distance)}`
              )}
            />
          </div>
          <div className=" my-4 border-[1px] border-gray-400"></div>
          <PropertyTypesView propertyTypes={project.attributes.propertyTypes} />
          <div className="flex flex-col gap-3">
            <SectionHeader Icon={TbMoneybag} title={t("pricing")} />
            <SectionItems
              items={[
                t("startingPrice", {
                  price: formatCurrency({
                    value: pricing.startingPrice,
                    currency: pricing.currency,
                    locale,
                  }),
                }),
                t("downPayment", { percentage: pricing.downPayment }),
                ...(pricing.fullPaymentDiscount
                  ? [t("fullPaymentDiscount")]
                  : []),
              ]}
            />
          </div>
          <div className=" my-4 border-[1px] border-gray-400"></div>
          <div className="flex flex-col gap-3">
            <SectionHeader
              Icon={IoLocationOutline}
              title={t("locationOnMap")}
            />
            <p className="text-gray-700 text-base font-semibold">
              {project.attributes.city}
            </p>
            <div className="aspect-video rounded border-2 border-gray-500 bg-red-400"></div>
          </div>
        </div>
        <Contact />
      </div>
    </div>
  );
};
