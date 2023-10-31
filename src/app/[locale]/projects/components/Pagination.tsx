import classNames from "classnames";
import { useLocale } from "next-intl";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { Link } from "@/components";
import { formatNumber } from "@/utils";
import { TPaginationMeta, TSearchParams } from "@/types";

interface PaginationProps {
  info: TPaginationMeta;
  searchParams: TSearchParams;
}
export function Pagination({
  info: { pagination },
  searchParams,
}: PaginationProps) {
  const locale = useLocale();
  const pageNumbers = getPageNumbers(pagination);

  if (pageNumbers.length <= 1) return;

  const prevDisabled = pagination.page === 1;
  const nextDsiabled = pagination.page === pagination.pageCount;
  return (
    <div className="flex justify-center gap-3">
      <Link
        href={pageHrefFromSearchParams(searchParams, pagination.page - 1)}
        className={prevDisabled ? "pointer-events-none" : ""}
      >
        <IoArrowBack
          className={`w-6 h-6 mirror ${
            prevDisabled ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </Link>
      <div className="flex items-center gap-6">
        {pageNumbers.map((num) => (
          <Link
            href={pageHrefFromSearchParams(searchParams, num)}
            className={classNames(
              "font-medium",
              num === pagination.page ? "text-yellow-600" : ""
            )}
            key={num}
          >
            {formatNumber({ value: num, locale })}
          </Link>
        ))}
      </div>
      <Link
        href={pageHrefFromSearchParams(searchParams, pagination.page + 1)}
        className={nextDsiabled ? "pointer-events-none" : ""}
      >
        <IoArrowForward
          className={`w-6 h-6 mirror ${
            nextDsiabled ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </Link>
    </div>
  );
}

function getPageNumbers({ page, pageCount }: TPaginationMeta["pagination"]) {
  const start = Math.max(1, page - 1);
  const end = Math.min(start + 2, pageCount);

  const list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
}

function pageHrefFromSearchParams(
  searchParams: TSearchParams,
  pageNumber: number
) {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("page", String(pageNumber));

  return `/projects?${newSearchParams}`;
}
