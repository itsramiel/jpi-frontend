export interface BasePageProps {
  params: {
    locale: string;
  };
}

export type TPaginationMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
