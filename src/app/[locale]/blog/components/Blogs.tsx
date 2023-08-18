"use client";

import Image from "next/image";
import { TBlogsResponse } from "../types";
import { useTranslations } from "next-intl";

interface BlogsProps {
  blogs: TBlogsResponse;
}

export function Blogs({ blogs }: BlogsProps) {
  const t = useTranslations("blogs.labels");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 px-3 gap-10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="group flex flex-col gap-2 border-2 border-white p-3 rounded transition duration-300 hover:border-yellow-500 hover:-translate-y-2"
        >
          <div className="h-44 overflow-hidden">
            <Image
              src={blog.attributes.imageThumbnail}
              alt="blog thumbnail"
              width={200}
              height={176}
              className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
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
              {Intl.DateTimeFormat(blog.attributes.locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date(blog.attributes.publishedAt))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
