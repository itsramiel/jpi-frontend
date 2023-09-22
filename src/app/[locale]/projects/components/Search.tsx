"use client";
/*eslint i18next/no-literal-string: 0*/

import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { Select, SelectItem, SelectSeparator } from "./Select";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathName = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [bedroomCount, setBedroomCount] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [debouncedSearch] = useDebounce(search, 750);

  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    if (debouncedSearch !== urlSearch) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      router.push(`${pathName}${params ? `?${params}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const onBedroomCountChange = (value: string) => {
    setBedroomCount(value === "_clear" ? "" : value);
  };

  const onPropertyTypeChange = (value: string) => {
    setPropertyType(value === "_clear" ? "" : value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex py-3 px-2 gap-8 bg-zinc-100 items-center rounded">
        <IoSearchOutline className="w-6 h-6 text-gray-700" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by project name"
          className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-gray-500 placeholder:font-regular"
        />
      </div>
      <div className="flex gap-2">
        <Select
          display={`No. of Bedrooms: ${bedroomCount}`}
          placeholder="No. of Bedrooms"
          onValueChange={onBedroomCountChange}
          value={bedroomCount}
        >
          {bedroomCount !== "" ? (
            <>
              <SelectItem value="_clear">clear</SelectItem>
              <SelectSeparator />
            </>
          ) : null}
          {["0", "1", "2", "3", "4"].map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
        <Select
          display={propertyType}
          placeholder="Property Type"
          onValueChange={onPropertyTypeChange}
          value={propertyType}
        >
          {propertyType !== "" ? (
            <>
              <SelectItem value="_clear">clear</SelectItem>
              <SelectSeparator />
            </>
          ) : null}
          {["Apartment", "Villa"].map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
