import { BasePageProps } from "@/types";
import { TBlogsResponse } from "./types";
import { Blogs, Header } from "./components";

export default async function BlogPage({ params: { locale } }: BasePageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?locale=${locale}&populate[0]=author&populate[1]=imageThumbnail`,
    {
      cache: "no-store",
    }
  );

  const data = (await response.json()) as { data: TBlogsResponse };
  return (
    <div className="my-8 flex flex-col gap-8">
      <Header />
      <Blogs blogs={data.data} />
    </div>
  );
}
