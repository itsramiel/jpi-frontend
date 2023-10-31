"use client";

import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useRouter } from "@/hooks";
import { usePathname } from "@/navigation";
import { formatDecimalNumber } from "@/utils";

import { TPropertyType } from "../../types";
import { Select, SelectItem, SelectSeparator } from "./Select";

interface SearchProps {
  bedroomCounts: Array<number>;
  propertyTypes: Array<TPropertyType>;
}

export function Search({ bedroomCounts, propertyTypes }: SearchProps) {
  const locale = useLocale();
  const filters = useTranslations("projects.filters");
  const labels = useTranslations("labels");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    search: searchParams.get("search") ?? "",
    bedroomCount: searchParams.get("bedroomCount") ?? "",
    propertyType: searchParams.get("propertyType") ?? "",
  });
  const [debouncedForm] = useDebounce(form, 750);

  const pathName = usePathname();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const didChange = Object.entries(debouncedForm).reduce(
      (acc, [key, value]) => {
        const existing = params.get(key) ?? "";
        if (existing !== value) {
          acc = true;
          value ? params.set(key, value) : params.delete(key);
        }
        return acc;
      },
      false
    );

    if (didChange) {
      router.push(`${pathName}${params ? `?${params}` : ""}`);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedForm]);

  const onSearchChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      search: value === "_clear" ? "" : value,
    }));
  };

  const onBedroomCountChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      bedroomCount: value === "_clear" ? "" : value,
    }));
  };

  const onPropertyTypeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      propertyType: value === "_clear" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex py-3 px-2 gap-8 bg-zinc-100 items-center rounded">
        <IoSearchOutline className="w-6 h-6 text-gray-700 mirror" />
        <input
          value={form.search}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder={filters("search")}
          className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-gray-500 placeholder:font-regular"
        />
      </div>
      <div className="flex gap-2">
        <Select
          display={`${filters("noOfBedrooms")}: ${form.bedroomCount &&
            formatDecimalNumber(Number(form.bedroomCount), locale)
            }`}
          placeholder={filters("noOfBedrooms")}
          onValueChange={onBedroomCountChange}
          value={form.bedroomCount}
        >
          {form.bedroomCount !== "" ? (
            <>
              <SelectItem value="_clear">{labels("clear")}</SelectItem>
              <SelectSeparator />
            </>
          ) : null}
          {bedroomCounts
            .map((bedroomCount) => ({
              count: formatDecimalNumber(bedroomCount, locale),
              id: String(bedroomCount),
            }))
            .map((item) => (
              <SelectItem value={item.id} key={item.id}>
                {item.count}
              </SelectItem>
            ))}
        </Select>
        <Select
          display={
            propertyTypes.find((x) => String(x.id) === form.propertyType)
              ?.attributes.displayName
          }
          placeholder={filters("propertyType")}
          onValueChange={onPropertyTypeChange}
          value={form.propertyType}
        >
          {form.propertyType !== "" ? (
            <>
              <SelectItem value="_clear">{labels("clear")}</SelectItem>
              <SelectSeparator />
            </>
          ) : null}
          {propertyTypes.map((item) => (
            <SelectItem value={String(item.id)} key={item.id}>
              {item.attributes.displayName}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
