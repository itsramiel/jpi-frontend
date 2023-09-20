"use client";

import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDebounce } from "use-debounce";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathName = usePathname();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
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
  }, [debouncedSearch]);

  return (
    <div className="flex py-3 px-2 gap-8 bg-black/5 items-center rounded">
      <IoSearchOutline className="w-6 h-6 text-gray-700" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search by project name"
        className="flex-1 bg-transparent text-gray-800 focus:outline-none placeholder:text-gray-500 placeholder:font-regular"
      />
    </div>
  );
}
