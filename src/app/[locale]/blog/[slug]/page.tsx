import qs from "qs";
import Image from "next/image";
import Markdown from "markdown-to-jsx";

import { formatDate } from "@/utils";
import { BasePageProps } from "@/types";

import { TBlogResponse } from "./types";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({
  params: { slug, locale },
}: PageProps & BasePageProps) {
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
  if (data.length !== 1) notFound();
  const blog = data[0].attributes;
  const author = blog.author.data.attributes;
  return (
    <div className="my-8 mx-auto max-w-2xl">
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
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${blog.imageThumbnail.data.attributes.url}`}
          alt="blog image"
          className="object-cover"
          fill
          quality={100}
        />
      </div>
      <article className="prose">
        <Markdown>{blog.content}</Markdown>
      </article>
    </div>
  );
}
