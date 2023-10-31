export interface BasePageProps {
  params: {
    locale: string;
  };
  searchParams: TSearchParams;
}

export type TPaginationMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type TSearchParams = { [key: string]: string };
