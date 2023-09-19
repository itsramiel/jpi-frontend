"use client";

import { IoHomeOutline } from "react-icons/io5";
import { SectionHeader } from "./SectionHeader";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { SectionItems } from "./SectionItems";
import { TProject } from "@/app/[locale]/types";

interface PropertyTypesViewProps {
  propertyTypes: TProject["attributes"]["properties"];
}
export const PropertyTypesView = ({
  propertyTypes,
}: PropertyTypesViewProps) => {
  const t = useTranslations("projects");
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader Icon={IoHomeOutline} title={t("propertyTypes")} />
      <div className="flex flex-col gap-2">
        <PropertyTypesPicker
          activeIndex={activePropertyIndex}
          propertyTypes={propertyTypes}
          onPropertyClick={(index) => setActivePropertyIndex(index)}
        />
        <SectionItems
          items={propertyTypes.data[activePropertyIndex].attributes.features}
        />
      </div>
    </div>
  );
};

interface PropertyTypesPickerProps {
  activeIndex: number;
  propertyTypes: TProject["attributes"]["properties"];
  onPropertyClick: (propertyIndex: number) => void;
}

function PropertyTypesPicker({
  activeIndex,
  propertyTypes,
  onPropertyClick,
}: PropertyTypesPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const handlePropertyClick = (index: number) => {
    onPropertyClick(index);

    const container = containerRef.current;
    const item = itemRefs.current[index];

    if (!container || !item) return;

    const containerWidth = container.offsetWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;

    container.scrollTo({
      left: itemLeft - containerWidth / 2 + itemWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-scroll scrollbar-hide relative"
    >
      {propertyTypes.data.map((item, index) => {
        const active = index === activeIndex;
        return (
          <div
            ref={(el) => (itemRefs.current[index] = el)}
            key={item.id}
            className={`border-b-[0.1875rem] cursor-pointer ${
              active ? "border-b-yellow-600" : "border-b-transparent"
            }`}
            onClick={() => handlePropertyClick(index)}
          >
            <p
              className={` whitespace-nowrap ${
                active ? "text-yellow-600" : "text-gray-600"
              } text-lg font-medium`}
            >
              {item.attributes.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyTypesPicker;
