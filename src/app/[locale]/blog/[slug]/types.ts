import { TAuthor, TBlog } from "../types";

export type TBlogResponse = {
  data: Array<{
    id: number;
    attributes: TBlog & {
      author: {
        data: {
          id: number;
          attributes: TAuthor;
        };
      };
    };
  }>;
};
