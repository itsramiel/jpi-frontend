import qs from "qs";
import { Metadata } from "next";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";

import { formatDate } from "@/utils";
import { BasePageProps } from "@/types";
import { FilledImage } from "@/components";

import { TBlogResponse } from "./types";

export async function generateMetadata({
  params: { locale, slug },
}: PageProps): Promise<Metadata> {
  const blog = await getBlog({ slug, locale });
  return {
    title: blog.attributes.title,
    description: blog.attributes.content.substring(
      0,
      Math.min(100, blog.attributes.content.length)
    ),
    alternates: {
      canonical: `${locale}/blog/${slug}`,
    },
  };
}

type PageProps = {
  params: {
    slug: string;
  };
} & BasePageProps;

export default async function Page({ params: { slug, locale } }: PageProps) {
  const blog = (await getBlog({ slug, locale })).attributes;
  const author = blog.author.data.attributes;
  return (
    <div className="w-full px-4 pt-[var(--navbar-height)] my-8 mx-auto max-w-2xl">
      <div className="flex flex-col gap-2 pb-4">
        <p className="text-gray-950 text-3xl font-bold">{blog.title}</p>
        <div className="flex flex-row justify-between">
          <p className="text-gray-700 text-sm font-bold">{author.name}</p>
          <p className="text-gray-600 text-sm font-semibold">
            {formatDate(new Date(blog.publishedAt), locale)}
          </p>
        </div>
      </div>
      <div className="aspect-video relative rounded overflow-hidden">
        <FilledImage
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${blog.imageThumbnail.data.attributes.url}`}
          alt="blog image"
        />
      </div>
      <article className="prose">
        <Markdown>{blog.content}</Markdown>
      </article>
    </div>
  );
}

async function getBlog({ locale, slug }: { locale: string; slug: string }) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: ["title", "publishedAt", "content", "locale"],
      populate: ["author", "imageThumbnail"],
      locale,
    },
    { encode: false }
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?${query}`,
    { cache: "no-store" }
  );

  const { data } = (await response.json()) as TBlogResponse;
  if (data.length < 1) notFound();
  return data[0];
}
