import { TAuthor, TBlog } from "../types";

export type TBlogResponse = {
  data: {
    id: number;
    attributes: TBlog & {
      author: {
        data: {
          id: number;
          attributes: TAuthor;
        };
      };
    };
  };
};
