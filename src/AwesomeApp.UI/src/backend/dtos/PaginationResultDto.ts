export interface PaginationResultDto<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
