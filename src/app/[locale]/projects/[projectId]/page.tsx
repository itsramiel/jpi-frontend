import qs from "qs";

import { TProject } from "../../types";
import { Project } from "./components";

interface PageProps {
  params: { projectId: string };
}

type TResponse = {
  data: TProject;
};

export default async function Page({ params: { projectId } }: PageProps) {
  const query = qs.stringify(
    {
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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects/${projectId}?&${query}`,
    {
      cache: "no-store",
    }
  );

  const { data: project } = (await response.json()) as TResponse;
  return <Project project={project} />;
}
