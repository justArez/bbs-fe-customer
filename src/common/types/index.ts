export interface IPagination<T> {
  page: number;
  size: number;
  total: number;
  data: T[];
}

export interface IPaginationReq {
  page: number;
  pageSize: number;
  searchKeyword?: string;
}

export interface EditRes {
  message: string;
  status: boolean;
}
