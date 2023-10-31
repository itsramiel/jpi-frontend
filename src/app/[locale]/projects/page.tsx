import qs from "qs";
import { BasePageProps, TPaginationMeta } from "@/types";

import { TProject, TPropertyType } from "../types";
import { Header, Pagination, Projects, Search } from "./components";
import { Metadata } from "next";
import { getTranslator } from "next-intl/server";

type TResponse = [
  {
    data: Array<TProject>;
    meta: TPaginationMeta;
  },
  { data: Array<TPropertyType> },
  Array<number>
];

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const t = await getTranslator(params.locale, "projects");
  const searchParamsString = new URLSearchParams(searchParams).toString();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/projects${
        searchParamsString.length > 0 ? "?" + searchParamsString : ""
      }`,
    },
  };
}

interface PageProps extends BasePageProps {}

export default async function Page({
  params: { locale },
  searchParams,
}: PageProps) {
  const filters = createProjectsFilter(searchParams);
  let page = Number(searchParams?.page);
  if (isNaN(page) || page < 0) page = 1;

  const query = qs.stringify(
    {
      ...(filters
        ? {
            filters: filters,
          }
        : undefined),
      populate: {
        coordinates: true,
        amenities: true,
        nearbyPOI: true,
        images: true,
        properties: {
          populate: {
            property_type: true,
          },
        },
      },
      pagination: {
        pageSize: 6,
        page,
      },
      locale,
    },
    { encode: false }
  );

  const localeQuery = qs.stringify({
    locale,
  });

  const [projects, propertyTypes, bedroomCounts] = (await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?${query}`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/property-types?${localeQuery}`
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/bedroomCounts?${localeQuery}`
    ),
  ]).then((results) =>
    Promise.all(results.map((result) => result.json()))
  )) as TResponse;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-[var(--navbar-height)] my-8 flex flex-col gap-8">
      <Header />
      <Search
        propertyTypes={propertyTypes.data}
        bedroomCounts={bedroomCounts}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <Projects projects={projects.data} />
      </div>
      <Pagination searchParams={searchParams ?? {}} info={projects.meta} />
    </div>
  );
}

function createProjectsFilter(searchParams: PageProps["searchParams"]) {
  const filters: Record<string, any> = {};

  if (searchParams?.search) {
    filters.name = {
      $contains: searchParams.search,
    };
  }

  if (
    searchParams?.propertyType !== undefined ||
    searchParams?.bedroomCount !== undefined
  ) {
    filters.properties = {
      ...(searchParams?.bedroomCount !== undefined
        ? { bedroomCount: { $eq: searchParams.bedroomCount } }
        : undefined),
      ...(searchParams?.propertyType !== undefined
        ? { property_type: { id: { $eq: searchParams.propertyType } } }
        : undefined),
    };
  }

  return Object.values(filters).length > 0 ? filters : null;
}
