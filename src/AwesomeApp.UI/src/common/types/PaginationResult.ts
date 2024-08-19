export interface PaginationResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
