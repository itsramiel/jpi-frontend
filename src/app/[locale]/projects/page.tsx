import { BasePageProps } from "@/types";
import { Header, Projects } from "./components";
import { TProject } from "./types";

type TResponse = {
  data: Array<TProject>;
};

export default async function Page({ params: { locale } }: BasePageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?locale=${locale}&populate[0]=coordinates&populate[1]=amenities&populate[2]=propertyTypes&populate[3]=nearbyPOI&populate[4]=pricing&populate[5]=images`
  );

  const { data } = (await response.json()) as TResponse;
  return (
    <div className="my-8 flex flex-col gap-8">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-10">
        <Projects projects={data} />
      </div>
    </div>
  );
}
