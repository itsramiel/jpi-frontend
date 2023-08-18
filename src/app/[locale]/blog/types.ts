export type TBlogsResponse = {
  id: number;
  attributes: TBlog & {
    locale: string;
    author: { data: { id: number; attributes: TAuthor } };
  };
}[];

export type TBlog = {
  title: string;
  content: string;
  publishedAt: string;
  imageThumbnail: string;
};

export type TAuthor = {
  name: string;
};
