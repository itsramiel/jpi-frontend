import qs from "qs";
import { BasePageProps } from "@/types";

import { Header, Projects, Search } from "./components";
import { TProject } from "../types";

type TResponse = {
  data: Array<TProject>;
};

interface PageProps extends BasePageProps {
  searchParams?: { search: string };
}

export default async function Page({
  params: { locale },
  searchParams,
}: PageProps) {
  const search = searchParams?.search;

  const query = qs.stringify({
    ...(search
      ? {
          filters: {
            name: {
              $contains: search,
            },
          },
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
          currency: true,
        },
      },
    },
    locale,
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?${query}`,
    { cache: "no-store" }
  );

  const { data } = (await response.json()) as TResponse;
  return (
    <div className="my-8 flex flex-col gap-8">
      <Header />
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-10">
        <Projects projects={data} />
      </div>
    </div>
  );
}
