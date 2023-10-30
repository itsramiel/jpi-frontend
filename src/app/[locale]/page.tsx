import qs from "qs";

import { BasePageProps } from "@/types";

import { TProject } from "./types";
import {
  ExploreCountry,
  InvestInProjects,
  Partners,
  SellingPoints,
} from "./components";

type TResponse = {
  data: Array<TProject>;
};

export default async function Page({ params: { locale } }: BasePageProps) {
  const query = qs.stringify(
    {
      populate: "images",
      fields: ["name", "city", "slug"],
      pagination: {
        start: 0,
        limit: 5,
      },
      locale,
    },
    { encode: false }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?${query}`,
    { cache: "no-store" }
  );

  const { data } = (await response.json()) as TResponse;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-16">
      <div className="w-full max-w-6xl mx-auto pt-16 px-4 my-9 md:my-24 xl:my-36 flex flex-col gap-9 md:gap-16 xl:gap-24">
        <InvestInProjects data={data} />
        <ExploreCountry />
        <SellingPoints />
        <Partners />
      </div>
    </div>
  );
}
