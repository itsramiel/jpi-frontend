import qs from "qs";
import { BasePageProps } from "@/types";

import { Header, Projects, Search } from "./components";
import { TProject, TPropertyType } from "../types";

type TResponse = [
  {
    data: Array<TProject>;
  },
  { data: Array<TPropertyType> },
  Array<number>
];

interface PageProps extends BasePageProps {
  searchParams?: {
    search?: string;
    bedroomCount?: string;
    propertyType?: string;
  };
}

export default async function Page({
  params: { locale },
  searchParams,
}: PageProps) {
  const filters = createProjectsFilter(searchParams);

  const query = qs.stringify({
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
    locale,
  });

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-10">
        <Projects projects={projects.data} />
      </div>
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
