import { BasePageProps } from "@/types";
import { TBlogResponse } from "./types";
import { formatDate } from "@/utils";
import Image from "next/image";
import Markdown from "markdown-to-jsx";

interface PageProps {
  params: {
    blogId: string;
  };
}

export default async function Page({
  params: { blogId, locale },
}: PageProps & BasePageProps) {
  const response = await fetch(
    `http://127.0.0.1:1337/api/blogs/${blogId}?populate[0]=author&locale=${locale}`
  );

  const { data } = (await response.json()) as TBlogResponse;
  const blog = data.attributes;
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
      <div className="h-44 min-[440px]:h-52 min-[540px]:h-60">
        <Image
          src={blog.imageThumbnail}
          alt="blog image"
          width={300}
          height={176}
          className="h-full w-full object-cover"
        />
      </div>
      <article className="prose">
        <Markdown>{blog.content}</Markdown>
      </article>
    </div>
  );
}
