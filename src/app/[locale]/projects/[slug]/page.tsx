import qs from "qs";

import { TProject } from "../../types";
import { Project } from "./components";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

type TResponse = {
  data: Array<TProject>;
};

export default async function Page({ params: { slug } }: PageProps) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
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
      locale: "en",
    },
    { encode: false }
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects/?&${query}`,
    {
      cache: "no-store",
    }
  );

  const { data: projects } = (await response.json()) as TResponse;
  if (projects.length !== 1) notFound();
  return <Project project={projects[0]} />;
}
