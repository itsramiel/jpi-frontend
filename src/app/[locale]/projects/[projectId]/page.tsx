import { TProject } from "../types";
import { Project } from "./components";

interface PageProps {
  params: { projectId: string };
}

type TResponse = {
  data: TProject;
};

export default async function Page({ params: { projectId } }: PageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects/${projectId}?&populate[0]=coordinates&populate[1]=amenities&populate[2]=propertyTypes&populate[3]=nearbyPOI&populate[4]=pricing&populate[5]=images`,
    {
      cache: "no-store",
    }
  );

  const { data: project } = (await response.json()) as TResponse;
  return <Project project={project} />;
}
