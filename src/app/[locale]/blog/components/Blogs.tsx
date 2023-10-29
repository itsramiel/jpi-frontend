"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { formatDate } from "@/utils";

import { TBlogsResponse } from "../types";
import { Link } from "@/components";

interface BlogsProps {
  blogs: TBlogsResponse;
}

export function Blogs({ blogs }: BlogsProps) {
  const t = useTranslations("blogs.labels");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 px-3 gap-10">
      {blogs.map((blog) => {
        return (
          <Link
            key={blog.id}
            className="group flex flex-col gap-2 border-2 border-white p-3 rounded transition duration-300 hover:border-yellow-500 hover:-translate-y-2 cursor-pointer"
            href={`/blog/${blog.attributes.slug}`}
          >
            <div className="aspect-video overflow-hidden relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${blog.attributes.imageThumbnail.data.attributes.url}`}
                alt="blog thumbnail"
                className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                fill
                quality={100}
              />
            </div>
            <p className="text-gray-950 text-xl font-semibold">
              {blog.attributes.title}
            </p>
            <div className="flex justify-between text-gray-600 text-xs font-semibold">
              <p>
                {`${t("by")} `}
                <span className="text-blue-600">
                  {blog.attributes.author.data.attributes.name}
                </span>
              </p>
              <p>
                {formatDate(
                  new Date(blog.attributes.publishedAt),
                  blog.attributes.locale
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
