import qs from "qs";

import { BasePageProps } from "@/types";
import { TBlogsResponse } from "./types";
import { Blogs, Header } from "./components";

export default async function BlogPage({ params: { locale } }: BasePageProps) {
  const query = qs.stringify(
    {
      fields: ["title", "publishedAt", "locale", "slug"],
      populate: ["author", "imageThumbnail"],
      locale,
    },
    { encode: false }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?${query}`,
    {
      cache: "no-store",
    }
  );

  const data = (await response.json()) as { data: TBlogsResponse };
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-[var(--navbar-height)] my-8 flex flex-col gap-8">
      <Header />
      <Blogs blogs={data.data} />
    </div>
  );
}
