import { TSearchParams } from "@/types";

export function getPageNumberFromSearchParams(
  searchParams: Readonly<TSearchParams>
) {
  let pageNumber: number;
  if ("page" in searchParams) {
    pageNumber = Number(searchParams.page);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      pageNumber = 1;
    }
  } else {
    pageNumber = 1;
  }

  return pageNumber;
}
