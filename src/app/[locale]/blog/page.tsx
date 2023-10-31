import qs from "qs";
import { Metadata } from "next";
import { getTranslator } from "next-intl/server";

import { Pagination } from "@/components";
import { getPageNumberFromSearchParams } from "@/utils";
import { BasePageProps, TPaginationMeta } from "@/types";

import { TBlogsResponse } from "./types";
import { Blogs, Header } from "./components";

export async function generateMetadata({
  params,
  searchParams,
}: BasePageProps): Promise<Metadata> {
  const t = await getTranslator(params.locale, "blogs");
  const searchParamsString = new URLSearchParams(searchParams).toString();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${params.locale}/blog${
        searchParamsString.length > 0 ? "?" + searchParamsString : ""
      }`,
    },
  };
}

export default async function BlogPage({
  params: { locale },
  searchParams,
}: BasePageProps) {
  const page = getPageNumberFromSearchParams(searchParams);
  const query = qs.stringify(
    {
      fields: ["title", "publishedAt", "locale", "slug"],
      populate: ["author", "imageThumbnail"],
      pagination: {
        pageSize: 6,
        page,
      },
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

  const data = (await response.json()) as {
    data: TBlogsResponse;
    meta: TPaginationMeta;
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-[var(--navbar-height)] my-8 flex flex-col gap-8">
      <Header />
      <Blogs blogs={data.data} />
      <Pagination searchParams={searchParams} info={data.meta} path="/blog" />
    </div>
  );
}
