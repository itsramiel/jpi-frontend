import Image from "next/image";
import { BLOG_DATA } from "./dummyData";

export default function BlogPage() {
  return (
    <div className="my-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-950 text-4xl font-bold">Blog</h1>
        <h2 className="text-gray-600 font-medium">
          Browse from our list of blogs which spans different wide variety of
          topic in the field of property investment
        </h2>
      </div>
      <Blogs />
    </div>
  );
}

function Blogs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 px-3 gap-10">
      {BLOG_DATA.map((blog) => (
        <div
          key={blog.id}
          className="group flex flex-col gap-2 border-2 border-white p-3 rounded transition duration-300 hover:border-yellow-500 hover:-translate-y-2"
        >
          <div className="h-44 overflow-hidden">
            <Image
              src={blog.image}
              alt="blog thumbnail"
              width={200}
              height={176}
              className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-gray-950 text-xl font-semibold">{blog.title}</p>
          <div className="flex justify-between text-gray-600 text-xs font-semibold">
            <p>
              by <span className="text-blue-600">{blog.author}</span>
            </p>
            <p>{blog.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
