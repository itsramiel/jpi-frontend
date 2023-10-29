export type TBlogsResponse = {
  id: number;
  attributes: TBlog & {
    locale: string;
    author: { data: { id: number; attributes: TAuthor } };
  };
}[];

export type TBlog = {
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  imageThumbnail: {
    data: {
      id: number;
      attributes: {
        url: string;
      };
    };
  };
};

export type TAuthor = {
  name: string;
};
