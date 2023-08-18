import { BasePageProps } from "@/types";
import { TBlogsResponse } from "./types";
import { Blogs, Header } from "./components";

export default async function BlogPage({ params: { locale } }: BasePageProps) {
  const response = await fetch(
    `http://127.0.0.1:1337/api/blogs?locale=${locale}&populate=author`
  );

  const data = (await response.json()) as { data: TBlogsResponse };
  return (
    <div className="my-8 flex flex-col gap-8">
      <Header />
      <Blogs blogs={data.data} />
    </div>
  );
}
